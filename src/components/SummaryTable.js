const { css } = require('emotion')
const { theme, visuallyHidden } = require('../styles.js')
const { html } = require('../utils.js')

const summaryRow = css`
  /* on larger screens */
  @media (min-width: 640px) {
    display: table-row;
  }

  /* on smaller screens */
  @media (max-width: 640px) {
    margin-bottom: ${theme.space.sm};
    border-bottom: 1px solid ${theme.color.grey};
  }

  .key,
  .value {
    margin: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .key {
    margin-bottom: ${theme.space.xxs};
  }

  .value {
    white-space: pre-wrap;
  }

  .action {
    margin: 0;
    margin-bottom: ${theme.space.sm};
  }

  /* on larger screens */
  @media (min-width: 640px) {
    .key,
    .value,
    .action {
      display: table-cell;
      padding-right: ${theme.space.lg};
      padding-top: ${theme.space.xs};
      padding-bottom: ${theme.space.xs};
      border-bottom: 1px solid ${theme.color.black};
    }

    .key {
      width: 30%;
    }

    .value {
      width: 50%;
    }

    .action {
      width: 20%;
      padding-right: 0;
      text-align: right;
    }
  }

  /* on smaller screens */
  @media (max-width: 640px) {
    .key {
      font-weight: 700;
    }

    .value {
      margin-bottom: ${theme.space.sm};
    }
  }
`
const SummaryRow = ({ row: { key, value } = {}, ifEditable = true }) => {
  return html`
    <div class=${summaryRow}>
      <dt class="key">
        ${key}
      </dt>
      <dd class="value">
        ${value}
      </dd>
      ${ifEditable &&
        ifEditable !== 'false' &&
        html`
          <dd class="action">
            <a href="/edit">
              Change
              <span class="${visuallyHidden}"
                >${` ${key && key.toLowerCase()}`}</span
              >
            </a>
          </dd>
        `}
    </div>
  `
}

const renderSummaryRow = (row, props) =>
  html`
    <${SummaryRow} row=${row} ...${props} //>
  `

const summaryTable = css`
  dl {
    margin: 0;
  }

  h2 {
    margin-bottom: ${theme.space.md};
  }

  h2 + dl {
    border-top: 1px solid white;
    padding-top: ${theme.space.sm};
  }

  /* on larger screens */
  @media (min-width: 640px) {
    dl {
      display: table;
      width: 100%;
      table-layout: fixed;
    }

    h2 + dl {
      padding-top: 0;
    }
  }
`

const SummaryTable = ({ rows, title = false, ...props }) =>
  html`
    <div class=${summaryTable}>
      ${title &&
        html`
          <h2>${title}</h2>
        `}
      <dl title=${title}>
        ${rows.map(row => renderSummaryRow(row, props))}
      </dl>
    </div>
  `

module.exports = SummaryTable
