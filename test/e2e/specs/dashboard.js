// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Test Dashboard page': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    // test default template page (rewrited as doc)
    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.containsText('h1', 'Simulador de hipotecas')
      .assert.elementCount('img', 1)
      .end()
  }
}
