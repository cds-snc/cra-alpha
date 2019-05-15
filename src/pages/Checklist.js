const { css } = require('emotion')
const { loggedInStyles, accordionStyles, theme } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const { SummaryTable, summaryRow } = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')
const polyglot = require('../i18n.js')

const inlineH2 = css`
  display: inline-block;
  margin-top: 0;
`

const financialSummaryStyles = css`
  ${summaryRow};
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

const t4Data = ({ employerName, year, box14, box22, box10, box16, box24, box26 } = {}) => {
  return [
    { key: 'Employer name', value: employerName, id: 'employerName' },
    { key: 'Year', value: year, id: 'year' },
    { key: 'Box14', value: box14, id: 'box14' },
    { key: 'Box22', value: box22, id: 'box22' },
    { key: 'Box10', value: box10, id: 'box10' },
    { key: 'Box16', value: box16, id: 'box16' },
    { key: 'Box24', value: box24, id: 'box24' },
    { key: 'Box26', value: box26, id: 'box26' },
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
        <div class=${accordionStyles}>
          <ul>
            <li>
              <input type="checkbox" unchecked />
              <i></i>
              <h2>1. ${polyglot.t(`${locale}.checklist.personalInformation`)}</h2>
              <div name="accordion">
                <${SummaryTable} rows=${aboutYouRows(user.personal)} />
              </div>
            </li>
          </ul>
        </div>

        <h2>2. ${polyglot.t(`${locale}.checklist.financialInformation`)}</h2>

        <div class=${financialSummaryStyles}>
          <dt class="key">Total income:</dt>
          <dd class="value">$43,561.00</dd>
        </div>

        <div class=${financialSummaryStyles}>
          <dt class="key">Taxable income:</dt>
          <dd class="value">$24,245.00</dd>
        </div>

        <div class=${financialSummaryStyles}>
          <dt class="key">Total tax credits:</dt>
          <dd class="value">$1,130.00</dd>
        </div>

        <div class=${accordionStyles}>
          <ul>
            <li>
              <input type="checkbox" checked />
              <i></i>
              <p>Show Details</p>
              <div name="accordion">
                <${SummaryTable} rows=${t4Data(user.t4s[0])} />
              </div>
            </li>
          </ul>
        </div>

        <h2 class=${inlineH2}>3.</h2>
        <${ButtonLink} href="/confirmation">
          ${polyglot.t(`${locale}.checklist.file`)}
        <//>
      </div>
    <//>
  `

module.exports = Checklist
