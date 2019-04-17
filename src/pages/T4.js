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
const t4Data = ({ employerName, year, box12, box14, box22 }) => {
  return [
    { key: 'Employer Name', value: employerName },
    { key: 'Year', value: year },
    { key: 'Box12', value: box12 },
    { key: 'Box14', value: box14 },
    { key: 'Box22', value: box22 },
  ]
}

const T4 = ({ data = {}, errors = {} }) =>
  html`
    <${Layout}>
      ${console.log('test1', data)}
      ${console.log('test2', data.income)}
      ${console.log('test3', t4Data(data))}
      ${console.log('test4', t4Data(data.income))}
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
<${SummaryTable} title="Income Data" rows=${t4Data(data.income)} ifEditable=${false} //>
<${ButtonLink} href="/confirmation" style=${submitButtonCSS}>This information is accurate<//>
<${ButtonLink} href="/confirmation" style=${submitButtonCSS}>I need to make changes<//>
      </div>
    </${Layout}>
  `

module.exports = T4
