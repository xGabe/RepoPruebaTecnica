const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--lang=es')
          launchOptions.args.push('--force-language=es')
          launchOptions.args.push('--lang=es_ES')
          launchOptions.args.push('--lang=es_ES.UTF-8')
        }
        return launchOptions
      })
      // implement node event listeners here
    },
    baseUrl: "https://mggp.pythonanywhere.com"
  },
});
