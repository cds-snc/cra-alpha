const { css } = require('emotion')
const { theme, pageMargin } = require('../styles.js')
const { html } = require('../utils.js')

const footer = css`
  padding-top: ${theme.space.xs};
  padding-bottom: ${theme.space.xs};
  border-top: 2px solid ${theme.color.black};
  height: 50px; /* footer height */
  position: absolute;
  bottom: 0;
  width: 100%;

  div {
    ${pageMargin};
  }

  a {
    font-size: 0.85em;
  }
`

const Footer = () =>
  html`
    <footer class=${footer}>
      <div><a href="#">Get help</a></div>
    </footer>
  `

module.exports = Footer
