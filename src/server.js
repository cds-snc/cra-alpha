const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const render = require('preact-render-to-string')
const { html } = require('./utils')
const polyglot = require('./i18n.js')
const renderPage = require('./pages/_document.js')

const app = express()
app
  .use(logger('dev'))
  // set security-minded response headers: https://helmetjs.github.io/
  .use(helmet())
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

const halfAnHour = 1000 * 60 * 30
const sessionName = `az-htm-${process.env.COOKIE_SECRET ||
  Math.floor(new Date().getTime() / halfAnHour)}`

app.use(
  cookieSession({
    name: sessionName,
    secret: sessionName,
    cookie: {
      httpOnly: true,
      maxAge: halfAnHour,
      sameSite: true,
    },
  }),
)

const getSessionData = (session = {}, enforceExists = false) => {
  const { sin, dobDay, dobMonth, dobYear } = session

  if (enforceExists && (!sin || !dobDay || !dobMonth || !dobYear)) {
    return false
  }

  return { sin, dobDay, dobMonth, dobYear }
}

let locale = 'en'

app.get('/', (req, res) => {
  const Welcome = require('./pages/Welcome.js')

  locale = ['en', 'fr'].includes(req.query.locale) ? req.query.locale : locale

  const content = render(
    html`
      <${Welcome} locale=${locale} polyglot=${polyglot} />
    `,
  )

  res.send(renderPage({ title: 'Welcome', locale, content }))
})

app.get('/login', (req, res) => {
  const Login = require('./pages/Login.js')

  const content = render(
    html`
      <${Login} data=${getSessionData(req.session)} />
    `,
  )

  res.send(renderPage({ title: 'Log in', locale, content }))
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

  const Dashboard = require('./pages/Dashboard')

  const content = render(
    html`
      <${Dashboard} data=${data} />
    `,
  )

  res.send(renderPage({ title: 'Dashboard', locale, content }))
})

app.get('/confirmation', (req, res) => {
  const data = getSessionData(req.session, true)

  if (!data) {
    return res.redirect(302, '/login')
  }

  const Confirmation = require('./pages/Confirmation')

  const content = render(
    html`
      <${Confirmation} />
    `,
  )

  res.send(renderPage({ title: 'Confirmation', locale, content }))
})

app.get('/logout', (req, res) => {
  req.session = null
  res.redirect(302, '/login')
})

// basic HTTP server via express
const port = 3000
app.listen(port, err => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`Ready on http://localhost:${port}`)
})
