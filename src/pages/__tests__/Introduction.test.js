const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const Introduction = require('../Introduction.js')

describe('<Introduction>', () => {
  const data = {
    name: 'Fred Smith',
    address: 'Mississauga',
    maritalStatus: 'Married',
    children: 5,
    income: {
      employerName: 'BLORB Corp',
      year: 2019,
      box12: '321-987-645',
      box14: 10000,
      box22: 1000,
    },
  }

  const getStringVals = obj => {
    // returns a multi-dimensional array like:
    // [ 'Fred Smith', 'Mississauga', [ 'BLORB Corp', 2019, '321987645' ] ]
    let arr = Object.values(obj).map(val => (typeof val !== 'object' ? val : getStringVals(val)))

    // flatten array: [ 'Fred Smith', 'Mississauga', 'BLORB Corp', 2019, '321987645' ]
    return [].concat.apply([], arr)
  }

  const expectedStrings = getStringVals(data)
  const expectedH2s = ['About you', 'Your family', 'Your income']

  test('renders h1 as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Introduction} data=${data} />
        `,
      ),
    )
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('Hi, Fred')

    expect($('a.buttonLink').length).toBe(1)
    expect($('a.buttonLink').text()).toEqual('Get started')

    expect($('a[href="/logout"]').length).toBe(1)
    expect($('a[href="/logout"]').text()).toEqual('Log out')
  })

  expectedStrings.map(str => {
    test(`renders ${str} on page`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Introduction} data=${data} />
          `,
        ),
      )
      expect($('h1').text()).toEqual('Hi, Fred')
    })
  })
 
/* 

expectedH2s.map((str, i) => {
    test(`renders h2 with "${str}"`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Introduction} data=${data} />
          `,
        ),
      )
      expect(
        $('h2')
          .eq(i)
          .text(),
      ).toEqual(str)
    })
  })
  
*/
}) 