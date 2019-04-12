const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const polyglot = require('../i18n.js')
const Layout = require('../components/Layout.js')

const welcome = css`
  li {
    margin-bottom: ${theme.space.xxs};
  }
`

const Welcome = ({ locale }) =>
  html`
    <${Layout}>
      <div class=${welcome}>
        <h1>Claim tax benefits(CTB)</h1>
        <p>${polyglot.t(`${locale}.welcome`)}.</p>

        <p>You will need to know:</p>
        <ul>
          <li>Your first name</li>
        </ul>

        <p>Hi Mario.</p>
        <p>
          Then, you will see the information CRA has on file about you. If it is
          up to date, you will be able to file your return immediately.
        </p>

        <a href="/login">Get started <span aria-hidden="true">→</span></a>
      </div>
    <//>
  `

module.exports = Welcome
