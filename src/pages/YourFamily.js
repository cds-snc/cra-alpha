const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')

const yourFamilyRows = ({ maritalStatus, children }) => {
  return [
    { key: 'Marital status', value: maritalStatus, id: 'maritalStatus' },
    { key: 'Number of children', value: children, id: 'children' },
  ]
}

const YourFamily = ({ data = {} }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>You and your family</h1>
        <p>
          This is the current marital status and number of dependent children we have on file for
          you. Please update any out-of-date information and then continue to the next section.
        </p>

        <${SummaryTable} rows=${yourFamilyRows(data)} />
        <p>
          There is <strong>1 section</strong> remaining, which should take ${' '}<strong
            >1 minute</strong
          >
          ${' '}to complete.
        </p>

        <${ButtonLink} href="/T4">Continue<//>
      </div>
    <//>
  `

module.exports = YourFamily
