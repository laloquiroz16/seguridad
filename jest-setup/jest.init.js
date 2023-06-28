import "jest-canvas-mock";
import "@testing-library/jest-dom";
const dotenv = require("dotenv");
dotenv.config();
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const jQuery = require("jquery");
Object.defineProperty(window, "jQuery", { value: jQuery });
Object.defineProperty(window, "$", { value: jQuery });

// eslint-disable-next-line no-undef
jest.mock("react-i18next", () => ({
  withTranslation: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: () => "" };
    return Component;
  },
  // eslint-disable-next-line no-undef
  initReactI18next: { type: "3rdParty", init: jest.fn() },
  useTranslation: () => ({
    t: key => key
  })
}));

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}
Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock()
});

window.localStorage.setItem(
  "current_user",
  '{ "id": 1, "name": "Pepe", "enterprise": { "id": 1 , "name": "rankmi" }}'
);

Object.defineProperty(document, "currentScript", {
  value: document.createElement("script")
});

window.localStorage.setItem(
  "$uiRouterParams",
  JSON.stringify({ process_id: 0, survey_id: 0 })
);

import { module as NgModule, noop as NgNoop } from "angular";

NgModule("firebase", []);
NgModule("firebase", []);
NgModule("angular-ladda", []);
NgModule("google-signin", []).provider("GoogleSignin", [
  function () {
    this.init = () => NgNoop();
    this.$get = [() => ({})];
  }
]);

import { AppModule } from "../app/app";
NgModule(AppModule)
  .service("AsyncTranslateLoaderService", function ($q) {
    "ngInject";
    return () => {
      return $q.resolve();
    };
  })
  .service("loginService", function ($q) {
    "ngInject";
    return () => {
      return $q.resolve();
    };
  });

NgModule("tmh.dynamicLocale", []).provider("tmhDynamicLocale", function () {
  this.set = () => {
    return Promise.resolve();
  };
  this.$get = [() => ({})];
});

import "angular-mocks";
// import './app/mock/utils';
