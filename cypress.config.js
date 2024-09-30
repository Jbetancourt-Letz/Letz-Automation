const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 800,
  viewportWidth: 1025,
  e2e: {
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('---enable-geolocation');
          launchOptions.prefs = {
            ...launchOptions.prefs,
            'profile.default_content_setting_values.notifications': 2, // 1 = Allow, 2 = Block
          }
        }
      })
    },
  },
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.LETZ_APP_GOOGLE_CLIENTID,
    googleClientSecret: process.env.LETZ_APP_GOOGLE_CLIENT_SECRET,
  },
});
