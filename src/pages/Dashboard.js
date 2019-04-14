const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const { getFirstName } = require('../api.js')
const Layout = require('../components/Layout.js')
const ErrorList = require('../components/ErrorList.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ValidationError = require('../components/forms/ValidationError.js')
const Checkbox = require('../components/forms/Checkbox.js')
const Button = require('../components/forms/Button.js')

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

        <${SummaryTable} title="About you" rows=${aboutYouRows(data)} ifEditable=${false} //>
        <${SummaryTable} title="Your family" rows=${yourFamilyRows(data)} ifEditable=${false} //>
        <${SummaryTable} title="Your income" rows=${yourIncomeRows(data)} ifEditable=${false} //>

        <p>
          Once you have provided your consent, go ahead and submit. (<a
            href="/consent"
            target="_blank"
            >Read more about consent.</a
          >)
        </p>
        <form method="post">
          ${errors.consent &&
            html`
              <${ValidationError} ...${errors.consent} />
            `}
          <${Checkbox} id="consent">I totally consent to this<//>
          <${Button} style=${submitButton}>Submit taxes<//>
        </form>

      </div>
    </${Layout}>
  `

module.exports = Dashboard
