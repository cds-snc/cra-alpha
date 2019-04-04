const { css } = require('emotion')
const { html } = require('../utils.js')
const AlphaBanner = require('../components/AlphaBanner.js')

const main = css`
  max-width: 900px;
`

const Layout = ({ children }) =>
  html`
    <main class=${main}>
      <${AlphaBanner} />
      ${children}
    </main>
  `

module.exports = Layout
