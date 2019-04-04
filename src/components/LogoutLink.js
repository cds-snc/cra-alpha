const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')

const logout = css`
  position: absolute;
  top: ${theme.space.md};
  right: 0;

  @media (max-width: 640px) {
    top: ${theme.space.sm};
  }
`

const LogoutLink = () =>
  html`
    <a class=${logout} href="/logout">Log out</a>
  `

module.exports = LogoutLink
