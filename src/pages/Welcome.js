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
        <h1>${polyglot.t(`${locale}.welcome.title`)}</h1>
        <p>${polyglot.t(`${locale}.welcome.file_taxes`)}.</p>

        <p>${polyglot.t(`${locale}.welcome.need_to_know`)}</p>
        <ul>
          <li>${polyglot.t(`${locale}.welcome.firstname`)}</li>
        </ul>

        <p>
          ${polyglot.t(`${locale}.welcome.cra_info_about_you`)}
        </p>

        <a href="/login">${polyglot.t(`${locale}.get_started`)}<span aria-hidden="true">→</span></a>
      </div>
    <//>
  `

module.exports = Welcome
