const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')

const button = css`
  font: 400 1em sans-serif;
  line-height: 1.1875;
  display: inline-block;
  position: relative;
  width: 100%;
  margin-top: 0;
  padding: 7px 10px;
  border-radius: 0;
  color: ${theme.color.black};
  background-color: ${theme.color.green};
  border: 2px solid ${theme.color.grey};
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  -webkit-appearance: none;
`

const Button = ({ children, type = 'submit', style = '', ...props }) =>
  html`
    <button type=${type} class=${`${button} ${style}`} ...${props}>
      ${children}
    </button>
  `

module.exports = Button
