const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'awmnzo',
  env: {
    username: 'Test_User1',
    password: 'Test123',
    watchForFileChanges: false
    
  },
  // any key/value you set in the cypress configuration under the `env` key will become an environment variable. 
  //when your tests are running, using the `Cypress.env` fuction to access the values of the environment variable.
  
  e2e: {
    baseUrl: "https://www.swifttms.com.au",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  specPattern:'cypress/SwiftTMS_Automation Testing /General User Account Tests/*_spec.js',
  
  //'cypress/SwiftTMS project/Companies/Company Analytics_spec.js',s
  //'cypress/SwiftTMS project/Companies/Top 200 companies_spec.js',
  //'cypress/SwiftTMS project/Companies/RecommendedCompany_spec.js',
  //'cypress/SwiftTMS project/General User/Edit account_spec.js',
  

  //specPattern: 'cypress/integration/Shopping GreenKart/flightbooking_spec.js'
  // give Cypress test file path so it know which file we want to test. 
  testIsolation:true,
  experimentalStudio: true
    
  },
});
