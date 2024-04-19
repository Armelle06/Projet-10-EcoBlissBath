const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ygzwv8',
  env: {
    apiURL: "http://localhost:8081",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseURL: "http://localhost:8080",
  },
});
