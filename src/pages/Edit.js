const { css } = require('emotion')
const { html } = require('../utils.js')
const { theme } = require('../styles.js')
const Layout = require('../components/Layout.js')
const ErrorList = require('../components/ErrorList.js')
const Input = require('../components/forms/Input.js')
const Fieldset = require('../components/forms/Fieldset.js')
const Button = require('../components/forms/Button.js')

const edit = css`
  margin-top: ${theme.space.lg};

  form {
    max-width: 480px;

    > div {
      margin-bottom: ${theme.space.xl};
    }

    button {
      max-width: 150px;
    }
  }
`
/* eslint-disable indent */
const getFormField = ({ type, id, label, data, errors, options }) => {
  switch (type) {
    case 'radio':
      return html`
        <${Fieldset} id=${id} options=${options} value=${data[id]}><h1>${label}</h1><//>
      `
    case 'textarea':
    case 'text':
      return html`
        <${Input} id=${id} type=${type} value=${data[id]} error=${errors[id]}>${label}<//>
      `

    default:
      throw new Error(`Error: Question type "${type}" not recognized`)
  }
}
/* eslint-enable indent */

const Edit = ({ label = '', description, type, previous, data, errors = {}, ...props }) =>
  html`
    <${Layout}>
      <div class=${edit}>
        <a href=${previous}><span aria-hidden="true">←</span> Back to previous page</a>
        ${Object.keys(errors).length > 0 &&
          html`
            <${ErrorList} errors=${errors} //>
          `}

        <h1>Edit ${label.toLowerCase()}</h1>
        <p>${description}</p>

        <form method="post">
          <div>
            ${getFormField({ type, label, data, errors, ...props })}
          </div>

          <${Button}>Save<//>
        </form>
      </div>
    <//>
  `

module.exports = Edit
