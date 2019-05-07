const { css } = require('emotion')
const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')
const polyglot = require('../i18n.js')

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

const T4 = ({ locale, data = {}, }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>${polyglot.t(`${locale}.income.title`)}</h1>
        <div>
          <img class=${imgCSS} src="/t4.png" title="${polyglot.t(`${locale}.income.sample_t4`)}" />
        </div>

        <${SummaryTable} title="${polyglot.t(`${locale}.income.income_data`)}" rows=${t4Data(data.income)} />

        <p>
        ${polyglot.t(`${locale}.income.last_section`)}
        </p>

        <${ButtonLink} id="consentButton" href="/confirmation">${polyglot.t(`${locale}.income.accurate`)}<//>
        <${ButtonLink} id="changesReqButton" href="/confirmation" style=${changesButtonCSS}
          >${polyglot.t(`${locale}.income.make_changes`)}<//
        >
      </div>
    <//>
  `

module.exports = T4
