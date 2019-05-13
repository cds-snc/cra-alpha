const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')
const Checklist = require('../Checklist.js')

describe('<CheckList>', () => {
  const data = {
    name: 'Fred Smith',
    address: '21275 Lakeshore Dr\nSainte-Anne-de-Bellevue\nQuébec\nH9X 3L9',
    maritalStatus: 'Widowed',
    children: '8',
    income: {
      employerName: 'BRAVO Corp',
      year: 2019,
      box12: '321-987-645',
      box14: 10000,
      box22: 1000,
    },
  }

  const expectedStrings = Object.values(data)
  const expectedStringsIncome = Object.values(data.income)

  test('renders h1 as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Checklist} data=${data} />
        `,
      ),
    )
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('About you')

    expect($('a.buttonLink').length).toBe(1)
    expect($('a.buttonLink').text()).toEqual('File my taxes')

    expect($('a[href="/logout"]').length).toBe(1)
    expect($('a[href="/logout"]').text()).toEqual('Log out')
  })

  expectedStrings.slice(0,4).map(str => {
    test(`renders ${str} on page`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Checklist} data=${data} />
          `,
        ),
      )
      expect($('h1').text()).toEqual('About you')
      expect($('dl').text()).toContain(str)
    })
  })

  expectedStringsIncome.map(str => {
    test(`renders ${str} on page`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Checklist} data=${data} />
          `,
        ),
      )
      expect($('h1').text()).toEqual('About you')
      expect($('dl').text()).toContain(str)
    })
  })
})
