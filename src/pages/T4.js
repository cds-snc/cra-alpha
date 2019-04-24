const { css } = require('emotion')
const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')

const imgCSS = css`
  max-width: 100%;
`

const changesButtonCSS = css`
  background-color: pink;
  float: right;
`

const t4Data = ({ employerName, year, box12, box14, box22 } = {}) => {
  return [
    { key: 'Employer name', value: employerName },
    { key: 'Year', value: year },
    { key: 'Social Insurance Number', value: box12 },
    { key: 'Employment income', value: box14 },
    { key: 'Income tax deducted', value: box22 },
  ]
}

const T4 = ({ data = {} }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>Your income</h1>
        <div>
          <img class=${imgCSS} src="/t4.png" title="Sample T4 form" />
        </div>

        <${SummaryTable} title="Income Data" rows=${t4Data(data.income)} ifEditable=${false} //>

        <p>
          This is the <strong>last section</strong>. You will have the oppertunity to review all
          your information, and get an estimate of your return before submitting your taxes.
        </p>

        <${ButtonLink} id="consentButton" href="/confirmation">This information is accurate<//>
        <${ButtonLink} id="changesReqButton" href="/confirmation" style=${changesButtonCSS}
          >I need to make changes<//
        >
      </div>
    <//>
  `

module.exports = T4
