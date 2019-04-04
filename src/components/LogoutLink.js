const { css } = require('emotion')
const { html } = require('../utils.js')

const logout = css`
  position: absolute;
  top: 20px;
  right: 0;
`

const LogoutLink = () =>
  html`
    <a class=${logout} href="/logout">Log out</a>
  `

module.exports = LogoutLink
