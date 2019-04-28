const { css } = require('emotion')
const { theme } = require('../../styles.js')
const { html } = require('../../utils.js')

const checkboxWidth = theme.space.xl

const checkboxStyles = css`
  display: block;
  position: relative;
  min-height: ${checkboxWidth};
  margin-bottom: ${theme.space.sm};
  padding: 0 0 0 ${checkboxWidth};
  clear: left;

  input {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: ${checkboxWidth};
    height: ${checkboxWidth};
    cursor: pointer;
    margin: 0;
    opacity: 0;
  }

  label {
    display: inline-block;
    margin-bottom: 0;
    padding: 8px 15px 5px;
    cursor: pointer;
    -ms-touch-action: manipulation;
    touch-action: manipulation;

    &::before {
      content: '';
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      width: ${checkboxWidth};
      height: ${checkboxWidth};
      border: 2px solid currentColor;
      background: transparent;
    }

    &::after {
      content: '';
      position: absolute;
      top: 11px;
      left: 9px;
      width: 18px;
      height: 7px;
      -webkit-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      transform: rotate(-45deg);
      border: solid;
      border-width: 0 0 5px 5px;
      border-top-color: transparent;
      opacity: 0;
      background: transparent;
    }
  }

  input:focus + label::before {
    outline: 3px solid transparent;
    outline-offset: 3px;
    -webkit-box-shadow: 0 0 0 3px ${theme.color.focus};
    box-shadow: 0 0 0 3px ${theme.color.focus};
  }

  input:checked + label::after {
    opacity: 1;
  }
`

const radioCircumference = '44px'

const radioStyles = css`
  input {
    top: 0;
    left: 0;
    width: ${radioCircumference};
    height: ${radioCircumference};
  }

  label {
    &::before {
      border-radius: 50%;
    }

    &::after {
      top: 10px;
      left: 10px;
      width: 0;
      height: 0;
      border: 10px solid currentColor;
      border-radius: 50%;
      background: transparent;
    }
  }

  input:focus + label::before {
    -webkit-box-shadow: 0 0 0 3px ${theme.color.focus};
    box-shadow: 0 0 0 3px ${theme.color.focus};
  }
`

const MultipleChoice = ({
  children,
  id,
  type = 'checkbox',
  value = '',
  name = '',
  checked = false,
}) =>
  html`
    <div
      class=${css`
        ${checkboxStyles} ${type === 'radio' && radioStyles}
      `}
    >
      <input id=${id} name=${name || id} type=${type} value=${value || id} checked=${checked} />
      <label for=${id}>
        ${children}
      </label>
    </div>
  `

module.exports = MultipleChoice
