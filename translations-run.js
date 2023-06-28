const dotenv = require("dotenv");
const npm = require("npm");
dotenv.config();

/**
 * Run TranslationsUpload for NON-Productives environments
 * -> Sandbox / Internal / Performance
 */
npm.load(() => {
  if (process.env.DEFAULT_SUBDOMAIN !== "app") {
    npm.run("translations:upload");
  }
});
