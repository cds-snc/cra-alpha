const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')
const polyglot = require('../i18n.js')

const aboutYouRows = ({ name, address }) => {
  return [
    { key: 'Name', value: name, id: 'name' },
    { key: 'Mailing address', value: address, id: 'address' },
  ]
}

const AboutYou = ({ data = {}, locale }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>${polyglot.t(`${locale}.about_you.title`)}</h1>
        <p>
          ${polyglot.t(`${locale}.about_you.intro`)}
        </p>

        <${SummaryTable} rows=${aboutYouRows(data)} />
        <p>
          ${polyglot.t(`${locale}.about_you.remaining`)}
        </p>

        <${ButtonLink} href="/your-family">${polyglot.t(`${locale}.continue`)}<//>
      </div>
    <//>
  `

module.exports = AboutYou
