const { css } = require('emotion')
const { theme } = require('../../styles.js')
const { html } = require('../../utils.js')

const validationError = css`
  display: inline-block;
  border-left: 3px solid ${theme.color.error};
  padding-left: 10px;
  margin-bottom: 10px;
  color: ${theme.color.error};
`

const ValidationError = ({ param, msg }) => html`
  <span id=${`${param}-error`} class="${validationError}">
    ${msg}
  </span>
`

module.exports = ValidationError
