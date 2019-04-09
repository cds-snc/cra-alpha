const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const { validationResult, checkSchema } = require('express-validator/check')
const {
  cookieSessionConfig,
  dashboardSchema,
  errorArray2ErrorObject,
} = require('./utils.js')
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

const getSessionData = (session = {}, enforceExists = false) => {
  const { sin, dobDay, dobMonth, dobYear } = session

  if (enforceExists && (!sin || !dobDay || !dobMonth || !dobYear)) {
    return false
  }

  return { sin, dobDay, dobMonth, dobYear }
}

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

app.post('/login', (req, res) => {
  req.session = getSessionData(req.body)

  if (!getSessionData(req.session, true)) {
    return res.redirect(302, '/login')
  }

  res.redirect(302, '/dashboard')
})

app.get('/dashboard', (req, res) => {
  const data = getSessionData(req.session, true)

  if (!data) {
    return res.redirect(302, '/login')
  }

  const name = 'Matthew Morris'
  const address = '380 Lewis St\nOttawa\nOntario\nK2P 2P6'

  res.send(
    renderPage({
      locale,
      pageComponent: 'Dashboard',
      props: { data: { ...data, name, address } },
    }),
  )
})

app.post('/dashboard', checkSchema(dashboardSchema), (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const name = 'Matthew Morris'
    const address = '380 Lewis St\nOttawa\nOntario\nK2P 2P6'

    return res.status(422).send(
      renderPage({
        locale,
        pageComponent: 'Dashboard',
        title: 'Error: Dashboard',
        props: {
          data: { ...getSessionData(req.session), name, address },
          errors: errorArray2ErrorObject(errors),
        },
      }),
    )
  }

  return res.redirect(302, '/confirmation')
})

app.get('/edit', (req, res) => {
  const content = `
    <h1>Editing coming soon</h1>
    <p>Editing isn’t working yet, so for now you have to print out this website, change your info, and then mail it to Nancy McKenna.</p>
    <a href="/dashboard">← Go back</a>
    `

  res.send(_renderDocument({ title: '[WIP] Edit', locale, content }))
})

app.get('/confirmation', (req, res) => {
  const data = getSessionData(req.session, true)

  if (!data) {
    return res.redirect(302, '/login')
  }

  res.send(
    renderPage({
      locale,
      pageComponent: 'Confirmation',
    }),
  )
})

app.get('/logout', (req, res) => {
  req.session = null
  res.redirect(302, '/login')
})

/* TODO: delete this by Monday, April 15th */
app.get('/alpha', (req, res) => {
  const content =
    '<h1>Alpha</h1> \
    <p>This site will be changing often as we learn from folks like you.</p> \
    <p>[Full name]</p>'

  res.send(_renderDocument({ title: 'Alpha', locale, content }))
})

/* TODO: delete this by Wednesday, April 17th */
app.get('/user', (req, res) => {
  const data = {
    name: 'Matthew Morris',
    address: '380 Lewis St\nOttawa\nOntario\nK2P 2P6',
    sin: '123-456-789',
    dobDay: '28',
    dobMonth: '02',
    dobYear: '1992',
  }

  res.send(
    renderPage({
      locale,
      pageComponent: 'Dashboard',
      props: { data, test: true },
    }),
  )
})

module.exports = app
