const { css } = require('emotion')
const { html } = require('../utils.js')

const alphaBanner = css`
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: -20px;
  border-bottom: 1px solid #bfc1c3;

  p {
    display: table;
    margin: 0;
    font-size: 0.7em;
    line-height: 1.25;
  }

  strong {
    font-weight: 700;
    display: inline-block;
    padding: 4px 8px;
    padding-bottom: 1px;
    outline: 2px solid #222;
    outline-offset: -2px;
    color: #000;
    background-color: transparent;
    letter-spacing: 1px;
    text-decoration: none;
    text-transform: uppercase;
    margin-right: 10px;
  }

  span {
    display: table-cell;
    vertical-align: baseline;
  }
`

const AlphaBanner = () =>
  html`
    <div class=${alphaBanner}>
      <p>
        <strong>
          alpha
        </strong>
        <span>
          This site will be changing often as we learn from folks like you.
        </span>
      </p>
    </div>
  `

module.exports = AlphaBanner
