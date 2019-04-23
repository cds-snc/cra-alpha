const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')

const t4CSS = css`
  position: relative;

  > div {
    margin-bottom: ${theme.space.xl};
  }
`

const changesButtonCSS = css`
  width: 200px;
  background-color: pink;
  float: right;
`

const consentButtonCSS = css`
  width: 200px;
`

const t4Data = ({ employerName, year, box12, box14, box22 } = {}) => {
  return [
    { key: 'Employer Name', value: employerName },
    { key: 'Year', value: year },
    { key: 'Box12', value: box12 },
    { key: 'Box14', value: box14 },
    { key: 'Box22', value: box22 },
  ]
}

const T4 = ({ data = {} }) =>
  html`
    <${Layout}>
      <div class=${t4CSS}>
        <${LogoutLink} />
        <h1>Your Income</h1>
        <div>
        <img src='/t4.png' title='Sample T4 form' />
        </div>

<${SummaryTable} title="Income Data" rows=${t4Data(data.income)} ifEditable=${false} //>
<${ButtonLink} href="/confirmation" style=${consentButtonCSS}>This information is accurate<//>
<${ButtonLink} href="/confirmation" style=${changesButtonCSS}>I need to make changes<//>
      </div>
    </${Layout}>
  `

module.exports = T4
