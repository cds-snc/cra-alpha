const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')

const summaryRow = css`
  @media (${theme.mq.sm}) {
    margin-bottom: ${theme.space.sm};
  }

  display: table-row;

  .key,
  .value {
    margin: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .key {
    margin-bottom: ${theme.space.xxs};
  }

  .key--bold {
    margin-bottom: ${theme.space.xxs};
    font-weight: 700;
  }

  .value {
    white-space: pre-wrap;
  }

  @media (${theme.mq.lg}) {
    .key,
    .value {
      display: table-cell;
      padding-right: ${theme.space.lg};
      padding-bottom: ${theme.space.sm};
    }

    .key {
      width: 35%;
    }

    .value {
      width: 45%;
    }
  }

  @media (${theme.mq.sm}) {
    .value {
      margin-bottom: ${theme.space.sm};
    }
  }
`
const SummaryRow = ({ keyBold = true, key, value, id = false }) => {
  return html`
    <div id=${id} class=${summaryRow}>
      <dt class=${keyBold === true ? 'key key--bold' : 'key'}>
        ${key}:
      </dt>
      <dd class="value">
        ${value}
      </dd>
    </div>
  `
}

const renderSummaryRow = (keyBold, row, props) =>
  html`
    <${SummaryRow} keyBold=${keyBold} key=${row.key} value=${row.value}
    id=${row.id} ...${props} //>
  `

const summaryTable = css`
  h2 {
    font-size: 1.3em;
    margin: 0;
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

const SummaryTable = ({ keyBold, rows, title = false, ...props }) =>
  html`
    <div class=${summaryTable}>
      ${title &&
        html`
          <h2>${title}</h2>
        `}
      <dl title=${title}>
        ${rows.map(row => renderSummaryRow(keyBold, row, props))}
      </dl>
    </div>
  `

module.exports = { SummaryTable, SummaryRow }
