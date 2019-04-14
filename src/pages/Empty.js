const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const SummaryTable = require('../components/SummaryTable.js')

const Empty = props =>
  html`
    <${Layout}>
      <div style=${{ marginTop: 30 }}></div>
      <${SummaryTable} ...${props} />
    <//>
  `

module.exports = Empty
