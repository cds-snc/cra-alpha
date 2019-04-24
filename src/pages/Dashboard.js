const { dashboardStyles } = require('../styles.js')
const { html } = require('../utils.js')
const { getFirstName } = require('../api.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')

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

const Dashboard = ({ data = {} }) =>
  html`
    <${Layout}>
      <div class=${dashboardStyles}>
        <${LogoutLink} />
        <h1>Hi, ${getFirstName(data.name)}</h1>
        <p>
          Here’s what we know about you based on your previous tax returns and information from your
          employer, ${data.income.employerName}.
        </p>
        <p>If any of this information is wrong, you’ll have a chance to update it.</p>

        <${SummaryTable} title="About you" rows=${aboutYouRows(data)} ifEditable=${false} //>
        <${SummaryTable} title="Your family" rows=${yourFamilyRows(data)} ifEditable=${false} //>
        <${SummaryTable} title="Your income" rows=${yourIncomeRows(data)} ifEditable=${false} //>

        <p>
          On the following pages, you can review each section and correct any outdated information.
          Once your information is up-to-date, you will be ready to submit your tax return.
        </p>
        <p>
          There are <strong>3 sections</strong> in total, and it should take approximately
          ${' '}<strong>10 minutes</strong>
          ${' '}to complete.
        </p>

        <${ButtonLink} href="/about-you">Get started<//>
      </div>
    <//>
  `

module.exports = Dashboard
