const { html } = require('../../utils.js')
const { css } = require('emotion')
const { theme, visuallyHidden } = require('../../styles.js')
const MultipleChoice = require('./MultipleChoice.js')
const ValidationError = require('./ValidationError.js')

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

  > div > div:last-of-type {
    margin-bottom: 0;
  }
`

const hideLegendStyles = css`
  legend {
    ${visuallyHidden};
  }
`

const errorStyles = css`
  margin-left: -${theme.space.sm};
  /* theme spacing minus border width */
  padding-left: calc(${theme.space.sm} - 3px);
  border-left: 3px solid ${theme.color.error};

  [id$='-error'] {
    margin-bottom: ${theme.space.md};
  }
`

const makeRadio = ({ id, index, label, checked = false }) =>
  html`
    <${MultipleChoice}
      type="radio"
      id=${`${id}-${index}`}
      name=${id}
      value=${label}
      checked=${checked}
      >${label}<//
    >
  `

const Fieldset = ({ children, id, options = [], value = '', hideLegend = true, error }) =>
  html`
    <fieldset
      id=${id}
      class=${css`
        ${fieldsetStyles} ${hideLegend && hideLegendStyles} ${error && errorStyles}
      `}
      aria-describedby=${error && `${id}-error`}
    >
      <legend>
        ${children}
      </legend>
      ${error &&
        html`
          <${ValidationError} param=${error.param} msg=${error.msg} />
        `}
      <div>
        ${options.map((label, index) => makeRadio({ id, index, label, checked: value === label }))}
      </div>
    </fieldset>
  `

module.exports = Fieldset
