const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const { validationResult, checkSchema } = require('express-validator')
const {
  cookieSessionConfig,
  loginSchema,
  getSessionData,
  checkLogin,
  errorArray2ErrorObject,
} = require('./utils.js')
const API = require('./api.js')
const { renderPage } = require('./pages/_document.js')

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
  let user = API.getUser(req.body.login)

  const errors = validationResult(req)
  if (!user && !errors.isEmpty()) {
    return res.status(422).send(
      renderPage({
        locale,
        title: 'Error: Log in',
        pageComponent: 'Login',
        props: {
          data: req.body.login,
          errors: errorArray2ErrorObject(errors),
        },
      }),
    )
  }

  req.session.user = user // add of the user data to the session
  res.redirect(302, '/introduction')
})

app.get('/introduction', checkLogin, (req, res) => {
  const data = getSessionData(req.session)

  res.send(
    renderPage({
      locale,
      title: 'Your information',
      pageComponent: 'Introduction',
      props: { data, locale },
    }),
  )
})

app.get('/about-you', checkLogin, (req, res) => {
  const data = getSessionData(req.session)

  res.send(
    renderPage({
      locale,
      title: 'About you',
      pageComponent: 'AboutYou',
      props: { data, locale },
    }),
  )
})

app.get('/your-family', checkLogin, (req, res) => {
  const data = getSessionData(req.session)

  res.send(
    renderPage({
      locale,
      title: 'You and your family',
      pageComponent: 'YourFamily',
      props: { data, locale },
    }),
  )
})

app.get('/T4', (req, res) => {
  const data = getSessionData(req.session)

  res.send(
    renderPage({
      locale,
      pageComponent: 'T4',
      title: 'Your income',
      props: { data, locale },
    }),
  )
})

// Whitelist only specific routes (eg, https://stackoverflow.com/a/15350845)
app.get('/edit/:id(name|address|maritalStatus|children|sin)?', checkLogin, (req, res) => {
  const question = require(`./questions/${req.params.id}.js`)

  res.send(
    renderPage({
      locale,
      title: `Edit ${question.label.toLowerCase()}`,
      pageComponent: 'Edit',
      props: {
        ...question,
        data: getSessionData(req.session),
      },
    }),
  )
})

const pickEditSchema = (req, res, next) => {
  const question = require(`./questions/${req.params.id}.js`)
  return checkSchema(question.schema)[0](req, res, next)
}

// Whitelist only specific routes (eg, https://stackoverflow.com/a/15350845)
app.post(
  '/edit/:id(name|address|maritalStatus|children|sin)?',
  checkLogin,
  pickEditSchema,
  (req, res) => {
    const question = require(`./questions/${req.params.id}.js`)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).send(
        renderPage({
          locale,
          title: `Error: Edit ${question.label.toLowerCase()}`,
          pageComponent: 'Edit',
          props: {
            ...question,
            data: getSessionData(req.session),
            errors: errorArray2ErrorObject(errors),
          },
        }),
      )
    }

    // update session with new value
    req.session.user[req.params.id] = req.body[req.params.id]
    return res.redirect(302, question.previous)
  },
)

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

app.get('/kim', (req, res) => {
  req.session = API.getUser('kim')
  res.redirect(302, '/introduction')
})

module.exports = app
