const { css } = require('emotion')
const { html } = require('../utils.js')

const summaryRow = css`
  /* on larger screens */
  @media (min-width: 640px) {
    display: table-row;
  }

  /* on smaller screens */
  @media (max-width: 640px) {
    margin-bottom: 15px;
    border-bottom: 1px solid #bfc1c3;
  }

  .key,
  .value {
    margin: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .key {
    margin-bottom: 5px;
  }

  .value {
    white-space: pre-wrap;
  }

  .action {
    margin: 0;
    margin-bottom: 15px;
  }

  /* on larger screens */
  @media (min-width: 640px) {
    .key,
    .value,
    .action {
      display: table-cell;
      padding-right: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #bfc1c3;
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
    .value {
      margin-bottom: 15px;
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
        <a class="govuk-link" href="#">
          Change
          <span class="visuallyHidden"
            >${` ${value && value.toLowerCase()}`}</span
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
