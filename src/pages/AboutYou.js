const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')

const aboutYouRows = ({ name, address }) => {
  return [
    { key: 'Name', value: name, id: 'name' },
    { key: 'Mailing address', value: address, id: 'address' },
  ]
}

const AboutYou = ({ data = {} }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>About you</h1>
        <p>
          This is the current name and address we have on file for you. Please update any
          out-of-date information and then continue to the next section.
        </p>

        <${SummaryTable} rows=${aboutYouRows(data)} />
        <p>
          There are <strong>2 sections</strong> remaining, which should take ${' '}<strong
            >5 minutes</strong
          >
          ${' '}to complete.
        </p>

        <${ButtonLink} href="/your-family">Continue<//>
      </div>
    <//>
  `

module.exports = AboutYou
