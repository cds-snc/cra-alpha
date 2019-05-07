const { html } = require('../utils.js')
const { css } = require('emotion')
const { theme } = require('../styles.js')
const Layout = require('../components/Layout.js')
const ErrorList = require('../components/ErrorList.js')
const Input = require('../components/forms/Input.js')
const Button = require('../components/forms/Button.js')
const polyglot = require('../i18n.js')

const form = css`
  width: 100%;
  max-width: 450px;
  padding: ${theme.space.lg};
  margin-top: ${theme.space.xl};
  border: 2px solid ${theme.color.greyLight};

  > div {
    margin-bottom: ${theme.space.xl};
  }

  button {
    max-width: 150px;
  }
`

/* eslint-disable no-irregular-whitespace */

const Login = ({ locale, data: { name = '' } = {}, errors = {} }) =>
  html`
    <${Layout}>
      ${Object.keys(errors).length > 0 &&
        html`
          <${ErrorList} errors=${errors} //>
        `}
      <h1>${polyglot.t(`${locale}.login.title`)}</h1>
      <p>${polyglot.t(`${locale}.login.enter_firstname`)}</p>

      <form class=${form} method="post">
        <div>
          <${Input} id="name" value=${name} error=${errors.name}>${polyglot.t(`${locale}.login.firstname`)}<//>
        </div>

        <${Button}>${polyglot.t(`${locale}.login.login`)}<//>
      </form>
    <//>
  `

module.exports = Login
