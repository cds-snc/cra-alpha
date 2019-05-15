const { css } = require('emotion')
const { theme, visuallyHidden } = require('../styles.js')
const { html } = require('../utils.js')

const summaryRow = css`
  @media (${theme.mq.lg}) {
    display: table-row;
  }

  @media (${theme.mq.sm}) {
    margin-bottom: ${theme.space.sm};
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

  @media (${theme.mq.lg}) {
    .key,
    .value,
    .action {
      display: table-cell;
      padding-right: ${theme.space.lg};
      padding-top: ${theme.space.xs};
      padding-bottom: ${theme.space.xs};
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

  @media (${theme.mq.sm}) {
    .key {
      font-weight: 700;
    }

    .value {
      margin-bottom: ${theme.space.sm};
    }
  }
`
const SummaryRow = ({ row: { key, value, id = false } = {} }) => {
  return html`
    <div class=${summaryRow}>
      <dt class="key">
        ${key}
      </dt>
      <dd class="value">
        ${value}
      </dd>
      ${id &&
        html`
          <dd class="action">
            <a href=${`/edit/${id}`}>
              Change
              <span class="${visuallyHidden}">${` ${key && key.toLowerCase()}`}</span>
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
    margin-bottom: ${theme.space.xl};
  }

  h2 {
    font-size: 1.3em;
    margin: ${theme.space.lg} 0 ${theme.space.xs} 0;
    padding-bottom: ${theme.space.xxs};
    border-bottom: 1px solid black;
  }

  /* on larger screens */
  @media (min-width: 640px) {
    dl {
      display: table;
      width: 100%;
      table-layout: fixed;
    }

    h2 {
      margin-bottom: 0;
      padding-bottom: ${theme.space.xs};
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

module.exports = { SummaryTable, summaryRow }
