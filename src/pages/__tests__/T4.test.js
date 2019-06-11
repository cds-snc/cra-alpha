const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const T4 = require('../T4.js')

describe('<T4>', () => {
  const data = {
    income: {
      employerName: 'Blorb Corp',
      year: 2019,
      box12: '321987645',
      box14: '$10,000.00',
      box22: '$1,000.00',
    },
  }

  const expectedStrings = Object.values(data.income)

  test('renders h1 as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${T4} data=${data} />
        `,
      ),
    )
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('Your income')

    expect($('#consentButton').length).toBe(1)
    expect($('#consentButton').text()).toEqual('Continue')

    expect($('a[href="/logout"]').length).toBe(1)
    expect($('a[href="/logout"]').text()).toEqual('Log out')
  })

  expectedStrings.map(str => {
    test(`renders ${str} on page`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${T4} data=${data} />
          `,
        ),
      )
      expect($('h1').text()).toEqual('Your income')
      expect($('dl').text()).toContain(str)
    })
  })
})
