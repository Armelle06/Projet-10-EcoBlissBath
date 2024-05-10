const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ygzwv8",
  env: {
    apiUrl: "http://localhost:8081",
    username: "test2@test.fr",
    password: "testtest",
  },
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:8080",
  },
});
