const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const AlphaBanner = require('../components/AlphaBanner.js')

const main = css`
  max-width: 900px;
  margin: 0 auto;
  margin-bottom: ${theme.space.xl};
  padding: 0 ${theme.space.md};
`

const blackBar = css`
  width: 100%;
  background-color: black;
  height: ${theme.space.sm};
`

const Layout = ({ children }) =>
  html`
    <div>
      <div class=${blackBar}></div>
      <main class=${main}>
        <${AlphaBanner} />
        ${children}
      </main>
    </div>
  `

module.exports = Layout
