const { html } = require('../../utils.js')
const { css } = require('emotion')
const { theme } = require('../../styles.js')
const Radio = require('./Radio')

const fieldsetStyles = css`
  margin: 0;
  padding: 0;
  border: 0;

  legend {
    box-sizing: border-box;
    display: table;
    max-width: 100%;
    margin-bottom: ${theme.space.sm};
    padding: 0;
    overflow: hidden;
    white-space: normal;

    * {
      margin: 0;
    }
  }
`

const makeRadio = ({ id, index, row: { key, value } = {}, checked = false }) =>
  html`
    <${Radio} id=${`${id}-${index}`} name=${id} value=${value} checked=${checked}>${key}<//>
  `

const Fieldset = ({ children, id, rows = [], value = '' }) =>
  html`
    <fieldset id=${id} class=${fieldsetStyles}>
      <legend>
        ${children}
      </legend>
      <div>
        ${rows.map((row, index) => makeRadio({ id, index, row, checked: value === row.value }))}
      </div>
    </fieldset>
  `

module.exports = Fieldset
