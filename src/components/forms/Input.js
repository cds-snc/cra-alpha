const { css } = require('emotion')
const { theme } = require('../../styles.js')
const { html } = require('../../utils.js')
const ValidationError = require('./ValidationError')

const input = css`
  label {
    display: block;
    margin-bottom: ${theme.space.xs};
  }

  input,
  textarea {
    font: 400 1em sans-serif;
    border: 2px solid ${theme.color.black};
    width: 100%;
    margin-top: 0;
    padding: 5px;
    border-radius: 0;
    -webkit-appearance: none;
    vertical-align: top;
  }

  input {
    height: 40px;

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

const errorStyles = css`
  margin-left: -${theme.space.sm};
  /* theme spacing minus border width */
  padding-left: calc(${theme.space.sm} - 3px);
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
    id=${id}
    name=${name || id}
    type=${type}
    style=${{ ...style }}
    aria-describedby="${error ? `${error.param}-error` : false}}"
    ...${props}
  />
`

const TextArea = ({
  id,
  name = '',
  style = {},
  value = '',
  error = undefined,
  rows = 5,
  ...props
}) => html`
  <textarea
    id=${id}
    name=${name || id}
    rows=${rows}
    style=${{ ...style }}
    aria-describedby="${error ? `${error.param}-error` : false}}"
    ...${props}
  >
${value}</textarea
  >
`

const renderInput = ({ type, ...props }) =>
  type === 'textarea'
    ? html`
        <${TextArea} ...${props} />
      `
    : html`
        <${TextInput} type=${type} ...${props} />
      `

const Input = ({ id, children, type = 'text', bold = true, error = undefined, ...props }) =>
  html`
    <div
      class=${css`
        ${input} ${error && errorStyles}
      `}
    >
      <label style=${{ fontWeight: !bold || bold === 'false' ? 400 : 700 }} for=${id}>
        ${children}
      </label>
      ${error &&
        html`
          <${ValidationError} param=${error.param} msg=${error.msg} />
        `}
      ${renderInput({ type, id, error, ...props })}
    </div>
  `

module.exports = Input
