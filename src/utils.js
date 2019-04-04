const { h } = require('preact')
const htm = require('htm')

// render our components: https://github.com/developit/htm#example
const html = htm.bind(h)

// return a meta tag if a GITHUB_SHA environment variable exists
const metaIfSHA = () =>
  process.env.GITHUB_SHA &&
  `<meta name="keywords" content="GITHUB_SHA=${process.env.GITHUB_SHA}" />`

/*
 configuration for our cookie sessions
  - set a name for the session so that the cookie persists between server reloads
    - if a COOKIE_SECRET environment variable, use that as a secret name
    - else use a timestamp that rotates every 20 minutes
  - also set cookie expiry time to 20 minutes

  more docs here: https://expressjs.com/en/resources/middleware/cookie-session.html
*/
const twentyMinutes = 1000 * 60 * 20
const sessionName = `cra-alpha-${process.env.COOKIE_SECRET ||
  Math.floor(new Date().getTime() / twentyMinutes)}`

const cookieSessionConfig = {
  name: sessionName,
  secret: sessionName,
  cookie: {
    httpOnly: true,
    maxAge: twentyMinutes,
    sameSite: true,
  },
}

module.exports = {
  html,
  metaIfSHA,
  cookieSessionConfig,
}
