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

const Fieldset = ({ children }) =>
  html`
    <fieldset class=${fieldsetStyles}>
      <legend>
        ${children}
      </legend>
      <div>
        <${Radio} id="where-do-you-live-1" name="where-do-you-live" value="england">England<//>
        <${Radio} id="where-do-you-live-2" name="where-do-you-live" value="scotland">Scotland<//>
        <${Radio} id="where-do-you-live-3" name="where-do-you-live" value="wales">Wales<//>
        <${Radio} id="where-do-you-live-4" name="where-do-you-live" value="northern-ireland"
          >Northern Ireland<//
        >
      </div>
    </fieldset>
  `

module.exports = Fieldset
