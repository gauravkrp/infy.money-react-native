const _Environments = {
  production: { BASE_URL: '', API_KEY: '' },
  staging: { BASE_URL: '', API_KEY: '' },
  development: { BASE_URL: '', API_KEY: '' },
}

function getEnvironment() {
  // Insert logic here to get the current platform (e.g. staging, production, etc)
  var platform = getPlatform()

  // ...now return the correct environment
  return _Environments[platform]
}

var Environment = getEnvironment()
module.exports = Environment
