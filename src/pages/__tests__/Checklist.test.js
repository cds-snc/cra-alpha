const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')
const Checklist = require('../Checklist.js')

describe('<CheckList>', () => {
  const _john = {
    _matches: ['john', 'j'],
    personal: {
      name: 'John Caldwell Abbott',
      address: '21275 Lakeshore Dr\nSainte-Anne-de-Bellevue\nQuébec\nH9X 3L9',
      maritalStatus: 'Widowed',
      children: '8',
      SIN: '123-456-789',
    },
    return: {
      // Income
      line101: 12000, //Employment income (All t4s Box 14 added up)
      line113: 1000, //Old Age Security Pension (OAS)
      line146: 500, // Guaranteed income supplement (GIS)
      line150: 12000, // total income
      line236: 11000, // Net income
      line260: 10000, // Taxable income
      //Non-Refundable Tax Credits (NRTCs)
      line350: 1200, //Total Federal NRTCs
      line6150: 1000, //Total Provincial NRTCs
      line300: 12500, //Basic Personal Amount
      line303: 5000, //Spouce Common-Law Amount
      line305: 0, // Amount for Eligible Dependants
      line316: 0, //Disability (self)
      line330: 0, // Medical for Spouse
      line331: 0, //Medical for other dependants
      line367: 0, // Caregiver for Infirm Children Amount
      //Taxes
      line420: 250, //Net Federal Tax
      line428: 50, // Net Provincial Tax
      line435: 300, // Total Payable
      line437: 500, //Total Deducted (Calculated)
      line482: 200, //Total Credits (Calculated)
      line484: 200, //Refund (Calculated)
      line485: 0, //Balance Owing (Calculated)
    },
    t4s: [
      {
        employerName: 'BRAVO Corp',
        year: 2019,
        box14: 10000, //Employment income
        box22: 1000, // Income Tax Deducted
        box10: 'ON', //Province of employment
        box16: 100, //Employee CPP Contributions
        box24: 10000, //EI Insurable earnings
        box26: 10000, //CPP pensionable earnings
      },
    ],
  }

  const expectedStringspersonal = Object.values(user.personal)
  const expectedStringsReturn = Object.values(user.return)

  test('renders h1 as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Checklist} data=${_john} />
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
            <${Checklist} data=${_john} />
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
            <${Checklist} data=${_john} />
          `,
        ),
      )
      expect($('h1').text()).toEqual('About you')
      expect($('dl').text()).toContain(str)
    })
  })
})
