const { css } = require('emotion')
const { theme } = require('../../styles.js')
const { html } = require('../../utils.js')

const radioCircumference = '44px'

const radioStyles = css`
  display: block;
  position: relative;
  min-height: ${theme.space.xl};
  margin-bottom: ${theme.space.xl};
  padding: 0 0 0 ${theme.space.xl};
  clear: left;

  input {
    position: absolute;
    z-index: 1;
    top: -2px;
    left: -2px;
    width: ${radioCircumference};
    height: ${radioCircumference};
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
      width: ${theme.space.xl};
      height: ${theme.space.xl};
      border: 2px solid currentColor;
      background: transparent;
      border-radius: 50%;
    }

    &::after {
      content: '';
      position: absolute;
      top: 10px;
      left: 10px;
      width: 0;
      height: 0;
      border: 10px solid currentColor;
      border-radius: 50%;
      opacity: 0;
      background: currentColor;
    }
  }

  input:focus + label::before {
    outline: 3px solid transparent;
    outline-offset: 3px;
    -webkit-box-shadow: 0 0 0 4px ${theme.color.focus};
    box-shadow: 0 0 0 4px ${theme.color.focus};
  }

  input:checked + label::after {
    opacity: 1;
  }
`

const Radio = ({ children, id, value = '', name = '', checked = false }) =>
  html`
    <div class=${radioStyles}>
      <input id=${id} name=${name || id} type="radio" value=${value || id} checked=${checked} />
      <label for=${id}>
        ${children}
      </label>
    </div>
  `

module.exports = Radio
