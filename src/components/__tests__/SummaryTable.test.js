const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const SummaryTable = require('../SummaryTable.js')

const getCell = ({ cheerio, rowNum = 0, find }) =>
  cheerio('dl div')
    .eq(rowNum)
    .find(find)

describe('<SummaryTable>', () => {
  test('renders <dl> element and 1 row', () => {
    const rows = [{ key: 'Full name', value: 'Fred Smith' }]

    const $ = cheerio.load(
      render(
        html`
          <${SummaryTable} rows=${rows} />
        `,
      ),
    )
    expect($('dl').length).toBe(1)
    expect($('dl div').length).toBe(1)
  })

  test('renders correct cells with 1 row', () => {
    const rows = [{ key: 'Full name', value: 'Fred Smith' }]

    const $ = cheerio.load(
      render(
        html`
          <${SummaryTable} rows=${rows} />
        `,
      ),
    )

    // first row
    expect(getCell({ cheerio: $, rowNum: 0, find: '.key' }).text()).toEqual(
      'Full name',
    )
    expect(getCell({ cheerio: $, rowNum: 0, find: '.value' }).text()).toEqual(
      'Fred Smith',
    )
    expect(getCell({ cheerio: $, rowNum: 0, find: '.action' }).text()).toEqual(
      'Change full name',
    )
    expect(
      getCell({ cheerio: $, rowNum: 0, find: '.action a' }).attr('href'),
    ).toEqual('/edit')
  })

  test('renders correct cells with 2 rows', () => {
    const rows = [
      { key: 'Full name', value: 'Fred Smith' },
      { key: 'Date of birth', value: '18-06-1971' },
    ]

    const $ = cheerio.load(
      render(
        html`
          <${SummaryTable} rows=${rows} />
        `,
      ),
    )

    // second row
    expect(getCell({ cheerio: $, rowNum: 1, find: '.key' }).text()).toEqual(
      'Date of birth',
    )
    expect(getCell({ cheerio: $, rowNum: 1, find: '.value' }).text()).toEqual(
      '18-06-1971',
    )
    expect(getCell({ cheerio: $, rowNum: 1, find: '.action' }).text()).toEqual(
      'Change date of birth',
    )
    expect(
      getCell({ cheerio: $, rowNum: 1, find: '.action a' }).attr('href'),
    ).toEqual('/edit')
  })

  test('renders without change links', () => {
    const rows = [
      { key: 'Full name', value: 'Fred Smith' },
      { key: 'Date of birth', value: '18-06-1971' },
    ]

    const $ = cheerio.load(
      render(
        html`
          <${SummaryTable} rows=${rows} ifEditable=${false} />
        `,
      ),
    )

    expect($('.action').length).toBe(0)
    expect($.html()).not.toContain('Change date of birth')
    expect($.html()).not.toContain('Change full name')
  })
})
