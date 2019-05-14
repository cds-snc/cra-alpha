const { css } = require('emotion')
const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')
const polyglot = require('../i18n.js')

const inlineH2 = css`
  display: inline-block;
  margin-top: 0;
`

const aboutYouRows = ({ name, address, maritalStatus, children, SIN }) => {
  return [
    { key: 'Name', value: name, id: 'name' },
    { key: 'Mailing address', value: address, id: 'address' },
    { key: 'Marital status', value: maritalStatus, id: 'maritalStatus' },
    { key: 'Number of children', value: children, id: 'children' },
    { key: 'Social Insurance Number (SIN)', value: SIN, id: 'sin' },
  ]
}

const t4Data = ({ employerName, year, box12, box14, box22 } = {}) => {
  return [
    { key: 'Employer name', value: employerName },
    { key: 'Year', value: year },
    { key: 'Social Insurance Number', value: box12 },
    { key: 'Employment income', value: box14 },
    { key: 'Income tax deducted', value: box22 },
  ]
}

const Checklist = ({ user = {}, locale }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>${polyglot.t(`${locale}.checklist.title`)}</h1>
        <p>
        ${polyglot.t(`${locale}.checklist.intro`)}
          
        </p>

        <h2>1. ${polyglot.t(`${locale}.checklist.personalInformation`)}</h1>
        <${SummaryTable} rows=${aboutYouRows(user.personal)} />

        <h2>2. ${polyglot.t(`${locale}.checklist.financialInformation`)}</h1>
        <${SummaryTable} rows=${t4Data(user.return)} />

       <h2 class=${inlineH2}>3.</h2> <${ButtonLink} href="/confirmation">${polyglot.t(
    `${locale}.checklist.file`,
  )}<//>
      </div>
    <//>
  `

module.exports = Checklist
