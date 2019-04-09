const { html } = require('../utils.js')
const { css } = require('emotion')
const { theme } = require('../styles.js')
const Layout = require('../components/Layout.js')
const Input = require('../components/forms/Input.js')
const Button = require('../components/forms/Button.js')

const form = css`
  width: 100%;
  max-width: 450px;
  padding: ${theme.space.lg};
  margin-top: ${theme.space.xl};
  border: 2px solid ${theme.color.greyLight};

  > div {
    margin-bottom: ${theme.space.xl};
  }
`

const loginButton = css`
  max-width: 150px;
`

/* eslint-disable no-irregular-whitespace */

const Login = ({ data: { sin = '' } = {}, errors = {} }) =>
  html`
    <${Layout}>
      <h1>Log in to see your tax-filing information</h1>
      <p>Please enter your Social Insurance Number.</p>

      <form class=${form} method="post">
        <div>
          <${Input} id="sin" value=${sin} error=${errors.sin}
            >SIN (Social Insurance Number)<//
          >
        </div>

        <${Button} style=${loginButton}>Log in<//>
      </form>
    <//>
  `

module.exports = Login
