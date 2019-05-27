const { accordionStyles } = require('../styles.js')
const { html } = require('../utils.js')

const Accordion = ({ children, header, checked }) =>
  html`
    <div class=${accordionStyles}>
      <ul>
        <li>
        ${checked ? html`<input type="checkbox" checked/>` : html`<input type="checkbox" unchecked/>`}
          <i></i>
          ${header ? html`<h2>${header}</h2>` : html`<p id="show-hide"></p>`} 

          <div name="accordion">
            ${children}
          </div>
        </li>
      </ul>
    </div>
  `

module.exports = Accordion
