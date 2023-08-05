const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  defaultCommandTimeout:10000,
  projectId: 'awmnzo',
  "reporter": "mochawesome",
  "reporterOptions": {
    "reportDir": "cypress/results",
    "overwrite": false,
    "html": true,
    "json": true
  },
  env: {
    username: 'Test_User1',
    password: 'Test123'
  }, 
  e2e: {
    baseUrl: "https://www.swifttms.com.au",
    setupNodeEvents(on, config) {

    },
  specPattern:'cypress/SwiftTMSAutomationTesting/general-user-account-tests/login-spec.js',
  testIsolation:true,
  experimentalStudio: true
  },

});
