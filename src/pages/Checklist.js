const { css } = require('emotion')
const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const Accordion = require('../components/Accordion.js')
const LogoutLink = require('../components/LogoutLink.js')
const { SummaryTable, summaryRow, SimpleSummaryRow } = require('../components/SummaryTable.js')
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

const t4Data = ({
  line300,
  line303,
  line305,
  line367,
  line316,
  line330,
  line331,
  line482,
} = {}) => {
  return [
    { key: 'Basic personal amount (300):', value: line300, id: 'line300' },
    { key: 'Spousal amount (303):', value: line303, id: 'line303' },
    { key: 'Dependents amount (305):', value: line305, id: 'line305' },
    { key: 'Caregiver amount (367):', value: line367, id: 'line367' },
    { key: 'Disability amount (316):', value: line316, id: 'line316' },
    { key: 'Medical Expenses (330):', value: line330, id: 'line330' },
    { key: 'Medical Expenses (331):', value: line331, id: 'line331' },
    { key: 'Total tax credits:', value: line482, id: 'line482' },
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

        <${Accordion} header="${polyglot.t(`${locale}.checklist.personalInformation`)}">
          <${SummaryTable} rows=${aboutYouRows(user.personal)} />
        <//>

        <h2>${polyglot.t(`${locale}.checklist.financialInformation`)}</h2>

        <${SimpleSummaryRow} value=${user.return.line150} key="Total income:" />
        <${SimpleSummaryRow} value=${user.return.line260} key="Taxable income:" />
        <${SimpleSummaryRow} value=${user.return.line482} key="Total tax credits:" />

        <${Accordion} checked=${true}>
          <${SummaryTable} rows=${t4Data(user.return)} />
        <//>

        <div class=${summaryRow}>
          <dt class="key">Refund</dt>
          <dd class="value">${user.return.line484}</dd>
        </div>

        <${Accordion} checked=${true}>
          <p>Refund Info</p>
        <//>

        <h2 class=${inlineH2}>3.</h2>
        <${ButtonLink} href="/confirmation">
          ${polyglot.t(`${locale}.checklist.file`)}
        <//>
      </div>
    <//>
  `

module.exports = Checklist
