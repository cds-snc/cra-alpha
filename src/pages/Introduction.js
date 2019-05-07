const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const { getFirstName } = require('../api.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')
const polyglot = require('../i18n.js')

const aboutYouRows = ({ name, address }) => {
  return [{ key: 'Name', value: name }, { key: 'Mailing address', value: address }]
}

const yourFamilyRows = ({ maritalStatus, children }) => {
  return [
    { key: 'Marital status', value: maritalStatus },
    { key: 'Number of children', value: children },
  ]
}

const yourIncomeRows = ({ income }) => {
  return [
    { key: 'Employer name', value: income.employerName },
    { key: 'Year', value: income.year },
    { key: 'Social Insurance Number', value: income.box12 },
    { key: 'Employment income', value: income.box14 },
    { key: 'Income tax deducted', value: income.box22 },
  ]
}

const Introduction = ({ locale, data = {} }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>${polyglot.t(`${locale}.intro.hi`, { name: getFirstName(data.name) })}</h1>
        <p>
          ${polyglot.t(`${locale}.intro.info_about_you`, {
    employerName: data.income.employerName,
  })}
        </p>
        <p></p>

        <${SummaryTable}
          title="${polyglot.t(`${locale}.about_you.title`)}"
          rows=${aboutYouRows(data)}
        />
        <${SummaryTable}
          title="${polyglot.t(`${locale}.family.title`)}"
          rows=${yourFamilyRows(data)}
        />
        <${SummaryTable}
          title="${polyglot.t(`${locale}.income.title`)}"
          rows=${yourIncomeRows(data)}
        />

        <p>
          ${polyglot.t(`${locale}.intro.review`)}
        </p>
        <p>
          ${polyglot.t(`${locale}.intro.remaining`)}
        </p>
        <${ButtonLink} href="/about-you">${polyglot.t(`${locale}.get_started`)}<//>
      </div>
    <//>
  `

module.exports = Introduction
