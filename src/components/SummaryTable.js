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
const SummaryRow = ({ row: { key, value } = {} }) => {
  return html`
    <div class=${summaryRow}>
      <dt class="key">
        ${key}
      </dt>
      <dd class="value">
        ${value}
      </dd>
      <dd class="action">
        <a href="/edit">
          Change
          <span class="${visuallyHidden}"
            >${` ${key && key.toLowerCase()}`}</span
          >
        </a>
      </dd>
    </div>
  `
}

const renderSummaryRow = row =>
  html`
    <${SummaryRow} row=${row} //>
  `

const summaryTable = css`
  margin: 0;

  /* on larger screens */
  @media (min-width: 640px) {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
`

const SummaryTable = ({ rows }) =>
  html`
    <dl class=${summaryTable}>
      ${rows.map(renderSummaryRow)}
    </dl>
  `

module.exports = SummaryTable
