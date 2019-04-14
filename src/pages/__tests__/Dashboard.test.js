const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const Dashboard = require('../Dashboard.js')

describe('<Dashboard>', () => {
  const data = {
    name: 'Fred Smith',
    address: 'Mississauga',
    maritalStatus: 'Married',
    children: 5,
    income: '$10000',
  }

  const expectedStrings = Object.values(data)

  const expectedH2s = ['About you', 'Your family', 'Your income']

  test('renders h1 as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Dashboard} data=${data} />
        `,
      ),
    )
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('Hi, Fred')

    expect($('button').length).toBe(1)
    expect($('button').text()).toEqual('Submit taxes')

    expect($('a[href="/logout"]').length).toBe(1)
    expect($('a[href="/logout"]').text()).toEqual('Log out')
  })

  expectedStrings.map(str => {
    test(`renders ${str} on page`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Dashboard} data=${data} />
          `,
        ),
      )
      expect($('h1').text()).toEqual('Hi, Fred')

      expect($('dl').text()).toContain(str)
    })
  })

  expectedH2s.map((str, i) => {
    test(`renders h2 with "${str}"`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Dashboard} data=${data} />
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
})
