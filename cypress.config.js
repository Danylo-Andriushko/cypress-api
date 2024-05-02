const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 25000,
    baseUrl: "https://api.demoblaze.com",
    setupNodeEvents(on, config) {
    },
    env: {
      ...process.env,
  },
  },
});