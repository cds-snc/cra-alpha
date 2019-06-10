const { h } = require('preact')
const htm = require('htm')
const API = require('./api')

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

/*
 this function takes a session object and looks for "session.user"

 it will return false if any of those keys have not been set.
*/
const getSessionData = (session = {}) => {
  if (session.user) {
    //we have data
    return session.user
  }
  return false
}

/* Middleware */
const checkLogin = (req, res, next) => {
  if (req.session.populated) {
    // Check that there is a session at all
    return next()
  }

  res.redirect(302, '/login')
}

// define a schema for login field validation: https://express-validator.github.io/docs/schema-validation.html
const loginSchema = {
  login: {
    in: ['body'],
    isEmpty: {
      errorMessage: 'Login can’t be empty',
      negated: true,
    },
    isIn: {
      options: [API.getMatches()],
      errorMessage: 'Can’t find that Login. 🤷 (Try “Avril”)',
    },
  },
}

// define a schema for introduction field validation
const introductionSchema = {
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

const currencyFormatter = new Intl.NumberFormat('en-CAD', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

module.exports = {
  html,
  metaIfSHA,
  cookieSessionConfig,
  getSessionData,
  checkLogin,
  loginSchema,
  introductionSchema,
  errorArray2ErrorObject,
  currencyFormatter,
}
