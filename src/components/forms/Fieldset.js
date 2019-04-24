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

const makeRadio = ({ id, index, row: { key, value } = {} }) =>
  html`
    <${Radio} id=${`${id}-${index}`} name=${id} value=${value}>${key}<//>
  `

const Fieldset = ({ children, id, rows = [] }) =>
  html`
    <fieldset id=${id} class=${fieldsetStyles}>
      <legend>
        ${children}
      </legend>
      <div>
        ${rows.map((row, index) => makeRadio({ id, index, row }))}
      </div>
    </fieldset>
  `

module.exports = Fieldset
