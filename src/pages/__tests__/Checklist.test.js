const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')
const Checklist = require('../Checklist.js')

describe('<CheckList>', () => {
  const data = {
    _matches: ['john', 'j'],
    personal: {
      name: 'John Caldwell Abbott',
      address: '21275 Lakeshore Dr\nSainte-Anne-de-Bellevue\nQuébec\nH9X 3L9',
      maritalStatus: 'Widowed',
      children: '8',
      SIN: '123-456-789',
    },
    return: {
      //Non-Refundable Tax Credits (NRTCs)
      line300: 12500, //Basic Personal Amount
      line303: 5000, //Spouce Common-Law Amount
      line305: 0, // Amount for Eligible Dependants
      line316: 0, //Disability (self)
      line330: 0, // Medical for Spouse
      line331: 0, //Medical for other dependants
      line367: 0, // Caregiver for Infirm Children Amount
      //Taxes
      line482: 200, //Total Credits (Calculated)
      line484: 200, //Refund (Calculated)
    },
  }

  const expectedStringspersonal = Object.values(data.personal)
  const expectedStringsReturn = Object.values(data.return)

  test('renders h1 as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Checklist} user=${data} locale="en" />
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

  expectedStringspersonal.map(str => {
    test(`renders ${str} on page`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Checklist} user=${data} locale="en" />
          `,
        ),
      )
      expect($('h1').text()).toEqual('About you')
      expect($('dl').text()).toContain(str)
    })
  })

  expectedStringsReturn.map(str => {
    test(`renders ${str} on page`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Checklist} user=${data} locale="en" />
          `,
        ),
      )
      expect($('h1').text()).toEqual('About you')
      expect($('dl').text()).toContain(str)
    })
  })
})
