const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const { getFirstName } = require('../api.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const polyglot = require('../i18n.js')

const confirmation = css`
  position: relative;
`
const confirmationNumber = css`
  border: 2px solid ${theme.color.black};
  padding: ${theme.space.xl} 0;
  width: 100%;
  max-width: 400px;
  text-align: center;

  .confirmationNumber--title {
    margin-bottom: ${theme.space.md};
  }

  .confirmationNumber {
    font: 400 1.8em monospace;
  }
`

const Confirmation = ({ locale, data }) =>
  html`
    <${Layout}>
      <div class=${confirmation}>
        <${LogoutLink} />
        <h1>Success! 🥳🙌</h1>
        <p>${polyglot.t(`${locale}.confirmation.intro`, {strong: '<strong>', name: getFirstName(data.name), strongEnd: '</strong>' })}</p>
        <p>
          ${polyglot.t(`${locale}.confirmation.benefits`, {strong: '<strong>', strongEnd: '</strong>' })}
        </p>

        <div class=${confirmationNumber}>
          <div class="confirmationNumber--title">${polyglot.t(`${locale}.confirmation.confirmation`)}</div>
          <div class="confirmationNumber">5H3P9IO5816</div>
        </div>

        <p>
        ${polyglot.t(`${locale}.confirmation.noa`)}
        </p>

        <br />
      </div>
    <//>
  `

module.exports = Confirmation
