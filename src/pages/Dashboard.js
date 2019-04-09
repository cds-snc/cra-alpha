const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const Button = require('../components/forms/Button.js')

const dashboard = css`
  position: relative;

  > div {
    margin-bottom: ${theme.space.lg};
  }
`

const submitButton = css`
  width: 200px;
`

const makeRows = ({ sin, dobDay, dobMonth, dobYear, name, address }) => {
  return [
    { key: 'Name', value: name },
    { key: 'Social Insurance Number', value: sin },
    { key: 'Date of Birth', value: [dobDay, dobMonth, dobYear].join('-') },
    { key: 'Mailing address', value: address },
  ]
}

const Dashboard = ({ data = {}, test = false }) =>
  html`
    <${Layout}>
      <div class=${dashboard}>
        ${!test &&
          html`
            <${LogoutLink} />
          `}
        <h1>Dashboard</h1>
        <div>
          <${SummaryTable} rows=${makeRows(data)} //>
        </div>

        <br />

        <form method="get" action="/confirmation">
        ${!test &&
          html`
            <${Button} style=${submitButton}>Submit taxes<//>
          `}
        </form>
      </div>
    </${Layout}>
  `

module.exports = Dashboard
