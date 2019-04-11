const { css } = require('emotion')
const { theme } = require('../../styles.js')
const { html } = require('../../utils.js')

const validationError = css`
  display: inline-block;
  margin-bottom: 10px;
  color: ${theme.color.error};
`

const ValidationError = ({ param, msg }) => html`
  <span id=${`${param}-error`} class="${validationError}">
    ${msg}
  </span>
`

module.exports = ValidationError
