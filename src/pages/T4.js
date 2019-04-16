const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const ErrorList = require('../components/ErrorList.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')
const ValidationError = require('../components/forms/ValidationError.js')
const Checkbox = require('../components/forms/Checkbox.js')
const Button = require('../components/forms/Button.js')

const t4CSS = css`
  position: relative;

  > div {
    margin-bottom: ${theme.space.xl};
  }
`

const submitButtonCSS = css`
  width: 200px;
`
//todo How to get t4 info? Where does it get injected from? user object passed with an array of t4s?
//is this passed in to the Dashbord object which then passes it to summary table?
const t4Data = ({
  employerName,
  year,
  socialInsuranceNumber,
  employmentIncome,
  incomeTaxDeducted,
}) => {
  return [
    { key: 'Employer Name', value: 'Acme' },
    { key: 'Year', value: 2019 },
    { key: 'Box12', value: '123456789' },
    { key: 'Box14', value: 50000 },
    { key: 'Box22', value: 5000 },
  ]
}

const T4 = ({ data = {}, errors = {} }) =>
  html`
    <${Layout}>

      ${Object.keys(errors).length > 0 &&
        html`
          <${ErrorList} errors=${errors} //>
        `}

      <div class=${t4CSS}>
        <${LogoutLink} />
        <h1>Income</h1>
        <div>
        <img src='/t4.png' />
        </div>
<${SummaryTable} title="Income Data" rows=${t4Data(data)} ifEditable=${false} //>
<${ButtonLink} href="/confirmation" style=${submitButtonCSS}>Consent<//>
<${ButtonLink} href="/confirmation" style=${submitButtonCSS}>Make Changes<//>
      </div>
    </${Layout}>
  `

module.exports = T4
