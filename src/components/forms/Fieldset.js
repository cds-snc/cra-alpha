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

const Fieldset = ({ children, id }) =>
  html`
    <fieldset id=${id} class=${fieldsetStyles}>
      <legend>
        ${children}
      </legend>
      <div>
        <${Radio} id=${`${id}-1`} name=${id} value="england">England<//>
        <${Radio} id=${`${id}-2`} name=${id} value="scotland">Scotland<//>
        <${Radio} id=${`${id}-3`} name=${id} value="wales">Wales<//>
        <${Radio} id=${`${id}-4`} name=${id} value="northern-ireland">Northern Ireland<//>
      </div>
    </fieldset>
  `

module.exports = Fieldset
