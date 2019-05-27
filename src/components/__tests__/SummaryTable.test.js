const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const { SummaryTable, SummaryRow } = require('../SummaryTable.js')

const getCell = ({ cheerio, rowNum = 0, find }) =>
  cheerio('dl div')
    .eq(rowNum)
    .find(find)

const renderTable = props => {
  return cheerio.load(
    render(
      html`
        <${SummaryTable} ...${props} />
      `,
    ),
  )
}

const rows = [{ key: 'Full name', value: 'Fred Smith' }]
const rowsWithId = [{ key: 'Full name', value: 'Fred Smith', id: 'name' }]

describe('<SummaryTable>', () => {
  test('renders <dl> element and 1 row', () => {
    const $ = renderTable({ rows })

    expect($('dl').length).toBe(1)
    expect($('dl div').length).toBe(1)
  })

  test('renders without a title', () => {
    const $ = renderTable({ rows })

    expect($('dl').length).toBe(1)
    expect($('dl').attr('title')).toBeUndefined()
    expect($('h2').length).toBe(0)
  })

  test('renders with a title', () => {
    const $ = renderTable({ rows, title: 'About you' })

    expect($('dl').length).toBe(1)
    expect($('dl').attr('title')).toEqual('About you')
    expect($('h2').text()).toEqual('About you')
  })

  describe('it renders cells with 1 row', () => {
    test('INCLUDING edit links', () => {
      const $ = renderTable({ rows: rowsWithId })

      // first row
      expect(getCell({ cheerio: $, rowNum: 0, find: '.key' }).text()).toEqual('Full name')
      expect(getCell({ cheerio: $, rowNum: 0, find: '.value' }).text()).toEqual('Fred Smith')
      expect(getCell({ cheerio: $, rowNum: 0, find: '.action' }).text()).toEqual('Change full name')
      expect(getCell({ cheerio: $, rowNum: 0, find: '.action a' }).attr('href')).toEqual(
        '/edit/name',
      )
    })

    test('EXCLUDING edit links', () => {
      let rowsNoId = rows

      const $ = renderTable({ rows: rowsNoId })

      // first row
      expect(getCell({ cheerio: $, rowNum: 0, find: '.key' }).text()).toEqual('Full name')
      expect(getCell({ cheerio: $, rowNum: 0, find: '.value' }).text()).toEqual('Fred Smith')
      expect(getCell({ cheerio: $, rowNum: 0, find: '.action' }).length).toBe(0)
    })
  })

  describe('it renders cells with 2 rows', () => {
    test('INCLUDING edit links', () => {
      let rowsYesId = rowsWithId.concat([{ key: 'Date of birth', value: '18-06-1971', id: 'dob' }])

      const $ = renderTable({ rows: rowsYesId })

      // first row
      expect(getCell({ cheerio: $, rowNum: 0, find: '.key' }).text()).toEqual('Full name')

      // second row
      expect(getCell({ cheerio: $, rowNum: 1, find: '.key' }).text()).toEqual('Date of birth')
      expect(getCell({ cheerio: $, rowNum: 1, find: '.value' }).text()).toEqual('18-06-1971')
      expect(getCell({ cheerio: $, rowNum: 1, find: '.action' }).text()).toEqual(
        'Change date of birth',
      )
      expect(getCell({ cheerio: $, rowNum: 1, find: '.action a' }).attr('href')).toEqual(
        '/edit/dob',
      )
    })

    test('EXCLUDING edit links', () => {
      let rowsNoId = rows.concat([{ key: 'Date of birth', value: '18-06-1971' }])

      const $ = renderTable({ rows: rowsNoId })

      // first row
      expect(getCell({ cheerio: $, rowNum: 0, find: '.key' }).text()).toEqual('Full name')

      // second row
      expect(getCell({ cheerio: $, rowNum: 1, find: '.key' }).text()).toEqual('Date of birth')
      expect(getCell({ cheerio: $, rowNum: 1, find: '.value' }).text()).toEqual('18-06-1971')
      expect(getCell({ cheerio: $, rowNum: 1, find: '.action' }).length).toBe(0)
    })
  })
})

const renderRow = props => {
  return cheerio.load(
    render(
      html`
        <${SummaryRow} ...${props} />
      `,
    ),
  )
}

describe('<SummaryRow>', () => {
  test('renders a row WITHOUT edit links', () => {
    const $ = renderRow(rows[0])

    expect($('dt.key').text()).toEqual('Full name')
    expect($('dd.value').text()).toEqual('Fred Smith')
    expect($('dd.action').length).toBe(0)
  })

  test('renders a row WITH edit links', () => {
    const $ = renderRow(rowsWithId[0])

    expect($('dt.key').text()).toEqual('Full name')
    expect($('dd.value').text()).toEqual('Fred Smith')
    expect($('dd.action').text()).toBe('Change full name')
  })
})
