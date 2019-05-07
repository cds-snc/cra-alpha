const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')
const polyglot = require('../i18n.js')

const yourFamilyRows = ({ maritalStatus, children }) => {
  return [
    { key: 'Marital status', value: maritalStatus, id: 'maritalStatus' },
    { key: 'Number of children', value: children, id: 'children' },
  ]
}

const YourFamily = ({ locale, data = {} }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>${polyglot.t(`${locale}.family.title`)}</h1>
        <p>
          ${polyglot.t(`${locale}.family.intro`)}
        </p>

        <${SummaryTable} rows=${yourFamilyRows(data)} />
        <p>
          ${polyglot.t(`${locale}.family.remaining`)}
        </p>

        <${ButtonLink} href="/T4">${polyglot.t(`${locale}.continue`)}<//>
      </div>
    <//>
  `

module.exports = YourFamily
