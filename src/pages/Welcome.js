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
        <h1>Claim online benefits ready access (COBRA)</h1>
        <p>
          ${polyglot.t(`${locale}.welcome`)}. This is an invite-only service: you can use if if you
          have received <strong>an invitation letter</strong> in the mail.
        </p>

        <p>You will need to know:</p>
        <ul>
          <li>Your first name</li>
          <li>Your super secret access code</li>
          <li>Your mother’s maiden name</li>
        </ul>

        <p>
          Then, you will see the information CRA has on file about you. If it is up to date, you
          will be able to file your return immediately.
        </p>

        <a href="/login">Get started <span aria-hidden="true">→</span></a>
      </div>
    <//>
  `

module.exports = Welcome
