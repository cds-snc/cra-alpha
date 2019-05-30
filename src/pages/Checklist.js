const { css } = require('emotion')
const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const Accordion = require('../components/Accordion.js')
const LogoutLink = require('../components/LogoutLink.js')
const { SummaryTable, SummaryRow } = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')
const polyglot = require('../i18n.js')

const inlineH2 = css`
  display: inline-block;
  margin-top: 0;
`

const aboutYouRows = ({ firstName, lastName, address, maritalStatus, children, SIN }) => {
  return [
    { key: 'Name', value: firstName + ' ' + lastName, id: 'name' },
    { key: 'Mailing address', value: address, id: 'address' },
    { key: 'Marital status', value: maritalStatus, id: 'maritalStatus' },
    { key: 'Number of children', value: children, id: 'children' },
    { key: 'Social Insurance Number (SIN)', value: SIN, id: 'sin' },
  ]
}

const totalTaxRows = ({
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

const refundRows = ({
  line150,
  line236,
  line260,
  line420,
  line428,
  line435,
  line437,
  line482,
  line484,
} = {}) => {
  return [
    { key: 'Total Income (150):', value: line150, id: 'line150' },
    { key: 'Net Income (236):', value: line236, id: 'line236' },
    { key: 'Taxable Income (260):', value: line260, id: 'line260' },
    { key: 'Net Federal Tax (420):', value: line420, id: 'line420' },
    { key: 'Net Ontario Tax (428):', value: line428, id: 'line428' },
    { key: 'Total Payable (435):', value: line435, id: 'line435' },
    { key: 'Total Deducted (437):', value: line437, id: 'line437' },
    { key: 'Total Credits (482):', value: line482, id: 'line482' },
    { key: 'Total payable minus credits:', value: '400', id: 'totalPayableMinus' },
    { key: 'Previous balance owed:', value: '0', id: 'previousBalance' },
    { key: 'Current balance owed:', value: '0', id: 'currentBalance' },
    { key: 'Refund (484):', value: line484, id: 'line484' },
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

        <dl>
          <${SummaryRow} value=${user.return.line150} key="Total income:" />
          <${SummaryRow} value=${user.return.line260} key="Taxable income:" />
          <${SummaryRow} value=${user.return.line482} key="Total tax credits:" />
        </dl>

        <${Accordion} checked=${true}>
          <${SummaryTable} rows=${totalTaxRows(user.return)} />
        <//>

        <dl>
          <${SummaryRow} value=${user.return.line484} key="Refund" />
        </dl>

        <${Accordion} checked=${true}>
          <${SummaryTable} rows=${refundRows(user.return)} />
        <//>

        <h2 class=${inlineH2}>3.</h2>
        <${ButtonLink} href="/confirmation">
          ${polyglot.t(`${locale}.checklist.file`)}
        <//>
      </div>
    <//>
  `

module.exports = Checklist
