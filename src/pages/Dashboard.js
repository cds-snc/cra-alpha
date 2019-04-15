const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const { getFirstName } = require('../api.js')
const Layout = require('../components/Layout.js')
const ErrorList = require('../components/ErrorList.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')

const dashboard = css`
  position: relative;

  > div {
    margin-bottom: ${theme.space.xl};
  }
`

const submitButton = css`
  width: 200px;
`
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
  return [{ key: 'Annual income', value: income }]
}

const Dashboard = ({ data = {}, errors = {} }) =>
  html`
    <${Layout}>
      ${Object.keys(errors).length > 0 &&
        html`
          <${ErrorList} errors=${errors} //>
        `}

      <div class=${dashboard}>
        <${LogoutLink} />
        <h1>Hi, ${getFirstName(data.name)}</h1>
        <p>
          Here’s what we know about you based on your previous tax returns and information from your
          employer, BLORB CORP.
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

        <${ButtonLink} href="/confirmation" style=${submitButton}>Get started<//>
      </div>
    <//>
  `

module.exports = Dashboard
