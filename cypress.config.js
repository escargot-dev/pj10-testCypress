const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    apiUrl:"http://localhost:8081/api/doc"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"http://localhost:8080/#/"
  },
});
