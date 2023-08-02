const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  defaultCommandTimeout:10000,
  projectId: 'awmnzo',
  env: {
    username: 'Test_User1',
    password: 'Test123'
  }, 
  e2e: {
    baseUrl: "https://www.swifttms.com.au",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {

      // implement node event listeners here
    },
  specPattern:'cypress/SwiftTMSAutomationTesting/general-user-account-tests/*-spec.js',
  testIsolation:true,
  experimentalStudio: true
  },

});
