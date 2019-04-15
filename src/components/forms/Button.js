const { buttonStyles } = require('../../styles.js')
const { html } = require('../../utils.js')

const Button = ({ children, type = 'submit', style = '', ...props }) =>
  html`
    <button type=${type} class=${`${buttonStyles} ${style}`} ...${props}>
      ${children}
    </button>
  `

module.exports = Button
