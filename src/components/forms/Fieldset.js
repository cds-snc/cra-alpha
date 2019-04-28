const { html } = require('../../utils.js')
const { css } = require('emotion')
const { theme, visuallyHidden } = require('../../styles.js')
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

const hideLegendStyles = css`
  legend {
    ${visuallyHidden};
  }
`

const makeRadio = ({ id, index, label, checked = false }) =>
  html`
    <${Radio} id=${`${id}-${index}`} name=${id} value=${label} checked=${checked}>${label}<//>
  `
const Fieldset = ({ children, id, options = [], value = '', hideLegend = true }) =>
  html`
    <fieldset
      id=${id}
      class=${hideLegend ? `${fieldsetStyles} ${hideLegendStyles}` : fieldsetStyles}
    >
      <legend>
        ${children}
      </legend>
      <div>
        ${options.map((label, index) => makeRadio({ id, index, label, checked: value === label }))}
      </div>
    </fieldset>
  `

module.exports = Fieldset
