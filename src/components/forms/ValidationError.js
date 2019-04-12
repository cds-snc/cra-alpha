const { css } = require('emotion')
const { theme, visuallyHidden } = require('../../styles.js')
const { html } = require('../../utils.js')

const validationError = css`
  display: inline-block;
  margin-bottom: 10px;
  color: ${theme.color.error};
`

const ValidationError = ({ param, msg }) => html`
  <span id=${`${param}-error`} class="${validationError}">
    <span class=${visuallyHidden}>Error: </span>${msg}
  </span>
`

module.exports = ValidationError
