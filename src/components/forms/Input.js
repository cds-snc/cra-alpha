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

const withError = css`
  margin-left: -12px;
  padding-left: 12px;
  border-left: 3px solid ${theme.color.error};
`

const TextInput = ({
  id,
  name = '',
  type = 'text',
  style = {},
  error = undefined,
  ...props
}) => html`
  <input
    style=${{ ...style }}
    id=${id}
    name=${name || id}
    type=${type}
    aria-describedby="${error ? `${error.param}-error` : false}}"
    ...${props}
  />
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
    <div
      class=${css`
        ${input} ${error && withError}
      `}
    >
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
      <${TextInput}
        id=${id}
        style=${style}
        type=${type}
        name=${name}
        error=${error}
        ...${props}
      />
    </div>
  `

module.exports = Input
