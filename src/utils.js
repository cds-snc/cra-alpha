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

// define a schema for login field validation: https://express-validator.github.io/docs/schema-validation.html
const loginSchema = {
  sin: {
    in: ['body'],
    isEmpty: {
      errorMessage: 'Social Insurance number can’t be empty',
      negated: true,
    },
    matches: {
      options: /^\d{3}-\d{3}-\d{3}$/,
      errorMessage: 'Social Insurance number needs to look like 111-222-333',
    },
  },
}

// define a schema for dashboard field validation
const dashboardSchema = {
  consent: {
    in: ['body'],
    matches: {
      options: /^consent$/,
      errorMessage: 'You must consent before submitting your taxes',
    },
  },
}

/*
  original format is an array of error objects: https://express-validator.github.io/docs/validation-result-api.html
  convert that to an object where the key is the parameter name and value is the error object
  ie,
  [
    { param: 'name', msg: 'Cannot be empty', ... },
    { param: 'number', msg: 'Cannot be empty', ... }
  ]
  to
  {
    name: { param: 'name', msg: 'Cannot be empty', ... },
    number: { param: 'number', msg: 'Cannot be empty', ... }
  }
*/
const errorArray2ErrorObject = (errors = []) => {
  return errors.array({ onlyFirstError: true }).reduce((map, obj) => {
    map[obj.param] = obj
    return map
  }, {})
}

module.exports = {
  html,
  metaIfSHA,
  cookieSessionConfig,
  loginSchema,
  dashboardSchema,
  errorArray2ErrorObject,
}
