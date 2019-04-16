const { Component } = require('preact')
const { buttonStyles } = require('../styles.js')
const { html } = require('../utils.js')

class ButtonLink extends Component {
  render({ children, href, style = '', ...props }) {
    return html`
      <span>
        <a
          href=${href}
          class=${`${buttonStyles} ${style} buttonLink`}
          role="button"
          draggable="false"
          ...${props}
        >
          ${children}
        </a>
        <script>
          document.querySelector('.buttonLink').addEventListener('keydown', function(e) {
            if (e.keyCode == 32) {
              e.target.click()
            }
          })
        </script>
      </span>
    `
  }
}

module.exports = ButtonLink
