require('babel-core/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  port: process.env.PORT || 3000,
  tweeterBaseProxyUrl: 'http://localhost:7890/1.1/statuses/user_timeline.json?screen_name',

  defaultViewConfigurations: {
    tweetPerColumnCount: 30,
    websiteTheme: 'Blue'
  },
  tweeterStorageKey: 'twitterConfigs'

}, environment);
