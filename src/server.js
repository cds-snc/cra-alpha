const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const { validationResult, checkSchema } = require('express-validator/check')
const {
  cookieSessionConfig,
  loginSchema,
  getSessionData,
  checkLogin,
  dashboardSchema,
  errorArray2ErrorObject,
} = require('./utils.js')
const API = require('./api.js')
const { renderPage, _renderDocument } = require('./pages/_document.js')

let locale = 'en'

const app = express()
app
  // set locale using express middleware
  .use(function(req, res, next) {
    locale = ['en', 'fr'].includes(req.query.locale) ? req.query.locale : locale
    next()
  })
  // serve anything in the 'public' directory as a static file
  .use(express.static('public'))
  // set security-minded response headers: https://helmetjs.github.io/
  .use(helmet())
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(cookieSession(cookieSessionConfig))

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send(renderPage({ locale, pageComponent: 'Welcome', props: { locale } }))
})

app.get('/login', (req, res) => {
  res.send(
    renderPage({
      locale,
      title: 'Log in',
      pageComponent: 'Login',
      props: { data: getSessionData(req.session) },
    }),
  )
})

app.post('/login', checkSchema(loginSchema), (req, res) => {
  let { name } = getSessionData(req.body)
  let user = API.getUser(name)
  req.session = user || { name }

  const errors = validationResult(req)
  if (!user && !errors.isEmpty()) {
    return res.status(422).send(
      renderPage({
        locale,
        title: 'Error: Log in',
        pageComponent: 'Login',
        props: {
          data: getSessionData(req.session),
          errors: errorArray2ErrorObject(errors),
        },
      }),
    )
  }

  res.redirect(302, '/dashboard')
})

app.get('/dashboard', checkLogin, (req, res) => {
  const data = getSessionData(req.session)

  res.send(
    renderPage({
      locale,
      pageComponent: 'Dashboard',
      props: { data },
    }),
  )
})

app.post('/dashboard', checkLogin, checkSchema(dashboardSchema), (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).send(
      renderPage({
        locale,
        pageComponent: 'Dashboard',
        title: 'Error: Dashboard',
        props: {
          data: getSessionData(req.session),
          errors: errorArray2ErrorObject(errors),
        },
      }),
    )
  }

  return res.redirect(302, '/confirmation')
})

app.get('/edit', checkLogin, (req, res) => {
  const content = `
    <h1>Editing coming soon</h1>
    <p>Editing isn’t working yet, so for now you have to print out this website, change your info, and then mail it to Nancy McKenna.</p>
    <a href="/dashboard">← Go back</a>
    `

  res.send(_renderDocument({ title: '[WIP] Edit', locale, content }))
})

app.get('/confirmation', checkLogin, (req, res) => {
  const data = getSessionData(req.session)

  res.send(
    renderPage({
      locale,
      pageComponent: 'Confirmation',
      props: { data },
    }),
  )
})

app.get('/logout', (req, res) => {
  req.session = null
  res.redirect(302, '/login')
})

app.get('/consent', (req, res) => {
  const content =
    '<h1>Consent</h1> \
    <p>Permission for something to happen or agreement to do something.</p>'

  res.send(_renderDocument({ title: '[WIP] Consent', locale, content }))
})

app.get('/kim', (req, res) => {
  req.session = API.getUser('kim')
  res.redirect(302, '/dashboard')
})

/* TODO: delete this by Monday, April 15th */
app.get('/alpha', (req, res) => {
  const content =
    '<h1>Alpha</h1> \
    <p>This site will be changing often as we learn from folks like you.</p> \
    <p>[Full name]</p>'

  res.send(_renderDocument({ title: 'Alpha', locale, content }))
})

module.exports = app
