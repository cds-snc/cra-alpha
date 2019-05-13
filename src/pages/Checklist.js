const { css } = require('emotion')
const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')

const inlineH2 = css`
 display: inline-block;
 margin-top: 0;
`

const aboutYouRows = ({ name, address, maritalStatus, children }) => {
  return [
    { key: 'Name', value: name, id: 'name' },
    { key: 'Mailing address', value: address, id: 'address' },
    { key: 'Marital status', value: maritalStatus, id: 'maritalStatus' },
    { key: 'Number of children', value: children, id: 'children' },
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

const Checklist = ({ data = {} }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>About you</h1>
        <p>
          This is the current name and address we have on file for you. Please update any
          out-of-date information and then continue to the next section.
        </p>

        <h2>1. Personal Information</h1>
        <${SummaryTable} rows=${aboutYouRows(data)} />

        <h2>2. Financial Information</h1>
        <${SummaryTable} rows=${t4Data(data.income)} />

       <h2 class=${inlineH2}>3.</h2> <${ButtonLink} href="/confirmation">File my taxes<//>
      </div>
    <//>
  `

module.exports = Checklist