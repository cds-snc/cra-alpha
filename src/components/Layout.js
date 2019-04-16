const { css } = require('emotion')
const { theme, pageMargin } = require('../styles.js')
const { html } = require('../utils.js')
const AlphaBanner = require('../components/AlphaBanner.js')
const Footer = require('../components/Footer.js')

const layout = css`
  position: relative;
  min-height: 100vh;

  main {
    ${pageMargin};

    /* footer height (50px) + xxl spacing */
    padding-bottom: calc(50px + ${theme.space.xxl});
  }
`

const blackBar = css`
  width: 100%;
  background-color: black;
  height: ${theme.space.sm};
`

const Layout = ({ children }) =>
  html`
    <div class=${layout}>
      <div class=${blackBar}></div>
      <main>
        <${AlphaBanner} />
        ${children}
      </main>
      <${Footer} />
    </div>
  `

module.exports = Layout
