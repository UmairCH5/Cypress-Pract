const { defineConfig } = require("cypress");
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {downloadFile})
    },
    specPattern:'cypress/intigration/examples/*.js',
    chromeWebSecurity: false,
    baseUrl: 'https://demo.codenbox.com/',

      env: {
      // Environment-specific variables
      QA: {
        baseUrl: 'https://www.codenboxautomationlab.com',
        practiceUrl: 'https://www.codenboxautomationlab.com/practice/',
      },
      production: {
        baseUrl: 'https://demo.codenbox.com/',
        apiUrl: 'https://api.demo.codenbox.com/',
      },
      development: {
        baseUrl: 'https://dev.codenboxautomationlab.com',
        apiUrl: 'https://dev-api.codenboxautomationlab.com',
      },

    //Test data: global variables
    defaultEmail: 'demo@codenbox.com',
    defaultPassword: 'Hello123',
    timeoutThreshold: 8000,
    invalidEmail: 'test@codenbox.com',
    invalidPassword: '1234',

    }
    
 
  },
});
