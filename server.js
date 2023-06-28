const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const dotenv = require("dotenv");
const serveIndex = require("serve-index");
dotenv.config();

const sixtyDaysInSeconds = 5184000;
const oneHour = 3600000;

const hasWorldWideWeb = host => {
  return !!host.match(/^www./);
};

const removeWorldWideWeb = host => {
  return host.replace(/^www./, "");
};

const getSubdomain = host => host.split(".")[0];

const domain = process.env.APP_HOSTNAME.split(":")[0];

app.set("sslPort", 443);
app.use(
  helmet({
    frameguard: {
      action: "deny"
    },
    hidePoweredBy: true,
    hsts: {
      maxAge: sixtyDaysInSeconds
    },
    noSniff: true,
    referrerPolicy: {
      policy: "same-origin"
    },
    featurePolicy: {
      features: {
        camera: ["'none'"],
        autoplay: ["'self'"],
        microphone: ["'none'"],
        midi: ["'none'"],
        payment: ["'none'"],
        vr: ["'none'"],
        syncXhr: ["'none'"],
        magnetometer: ["'none'"],
        gyroscope: ["'none'"],
        accelerometer: ["'none'"],
        usb: ["'none'"],
        speaker: ["'none'"]
      }
    }
  })
);

app.use(compression());

app.get("*", (req, res, next) => {
  // Checking for secure connection or not
  // If not secure redirect to the secure connection
  let host = req.get("host");
  if (req.headers["x-forwarded-proto"] !== "https" || hasWorldWideWeb(host)) {
    host = removeWorldWideWeb(host);
    host = host.replace(/:\d+$/, `:${app.get("sslPort")}`);
    const destination = ["https://", host, req.url].join("");
    return res.redirect(destination);
  }
  next();
});

app.get("*", (req, res, next) => {
  let host = req.get("host");
  const subdomain = getSubdomain(host);
  if (subdomain !== process.env.DEFAULT_SUBDOMAIN) {
    host = `${process.env.APP_URL}`;
    const destination = [host, req.url].join("");
    res.cookie("rankmi_origins", subdomain, { maxAge: 60000, domain });
    return res.redirect(destination);
  }
  next();
});

app.get("*", (req, res, next) => {
  let host = req.get("host");
  const subdomain = getSubdomain(host);
  if (subdomain !== process.env.DEFAULT_SUBDOMAIN) {
    host = host.replace(/:\d+$/, `:${app.get("sslPort")}`);
    const destination = ["https://", host, req.url].join("");
    res.cookie("rankmi_origins", subdomain, { maxAge: 60000, domain });
    return res.redirect(destination);
  }
  next();
});

app.use(
  express.static(`${__dirname}/dist`, {
    maxAge: oneHour,
    setHeaders: (res, path) => {
      if (path && path.includes(`${__dirname}/dist/index.html`)) {
        res.setHeader(
          "Cache-Control",
          `'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';`
        );
      }
    }
  })
);

app.get("/sso-keycloak", (req, res) => {
  const { session_state, code, et } = req.query;
  let queryParams = `session_state=${session_state}&code=${code}&et=${et}`;
  res.status(301).redirect(`/#/sso-keycloak?${queryParams}`);
});

app.get("/auth/sso/freshdesk", (req, res) => {
  const { client_id, state, redirect_uri, registration_id, nonce } = req.query;
  let queryParams = `client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}&registration_id=${registration_id}&nonce=${nonce}`;
  res.status(301).redirect(`/#/auth/sso/freshdesk?${queryParams}`);
});

app.get("/meetings/signin", (req, res) => {
  const { code, error, state } = req.query;
  let queryParams = error
    ? `&error=${error}&state=${state}`
    : `&code=${code}&state=${state}`;
  res.status(301).redirect(`/#/meetings/signin?${queryParams}`);
});

app.get("/meetings/signup", (req, res) => {
  const { code, error, state } = req.query;
  let queryParams = error
    ? `&error=${error}&state=${state}`
    : `&code=${code}&state=${state}`;
  res.status(301).redirect(`/#/meetings/signup?${queryParams}`);
});

app.get("/v2/home/meetings", (req, res) => {
  const { code, error, state } = req.query;
  let queryParams = error
    ? `&error=${error}&state=${state}`
    : `&code=${code}&state=${state}`;
  res.status(301).redirect(`/#/v2/home/meetings?${queryParams}`);
});

app.use(
  "/.well-known",
  express.static(".well-known", { index: false, extensions: ["json"] }),
  serveIndex(".well-known")
);

app.listen(process.env.PORT || 9000);
