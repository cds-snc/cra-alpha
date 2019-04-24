const { css } = require('emotion')
const { html } = require('../utils.js')
const { theme } = require('../styles.js')
const Layout = require('../components/Layout.js')
const ErrorList = require('../components/ErrorList.js')
const Input = require('../components/forms/Input.js')
const Button = require('../components/forms/Button.js')

const edit = css`
  margin-top: ${theme.space.lg};

  form {
    max-width: 480px;

    > div {
      margin-bottom: ${theme.space.xl};
    }

    label {
      text-transform: capitalize;
    }

    button {
      max-width: 150px;
    }
  }
`

const Edit = ({ id, label = '', description, type, previous, data, errors = {} }) =>
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
            <${Input} id=${id} type=${type} value=${data[id]} error=${errors[id]}>${label}<//>
          </div>

          <${Button}>Save<//>
        </form>
      </div>
    <//>
  `

module.exports = Edit
