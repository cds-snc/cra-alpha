const { css } = require('emotion')
const { theme } = require('../../styles.js')
const { html } = require('../../utils.js')
const ValidationError = require('./ValidationError')

const input = css`
  label {
    display: block;
    margin-bottom: ${theme.space.xs};
  }

  input {
    font: 400 1em sans-serif;
    border: 2px solid ${theme.color.black};
    width: 100%;
    height: 40px;
    margin-top: 0;
    padding: 5px;
    border-radius: 0;
    -webkit-appearance: none;

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

const Input = ({
  id,
  children,
  name = '',
  type = 'text',
  bold = true,
  style = {},
  error = undefined,
  ...props
}) =>
  html`
    <span class=${input}>
      <label
        style=${{ fontWeight: !bold || bold === 'false' ? 400 : 700 }}
        for=${id}
      >
        ${children}
      </label>
      ${error &&
        html`
          <${ValidationError} param=${error.param} msg=${error.msg} />
        `}
      <input
        style=${{ ...style }}
        id=${id}
        name=${name || id}
        type=${type}
        aria-describedby="${error ? `${error.param}-error` : false}}"
        ...${props}
      />
    </span>
  `

module.exports = Input
