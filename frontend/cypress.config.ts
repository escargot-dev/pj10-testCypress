import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10000,
  env: {
    apiUrl: "http://localhost:8081"
  },
  e2e: {
    baseUrl: "http://localhost:8080/#/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
