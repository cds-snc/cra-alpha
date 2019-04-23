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
    income: {
      employerName: 'Blorb Corp',
      year: 2019,
      box12: '321987645',
      box14: 10000,
      box22: 1000,
    },
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

    expect($('a.buttonLink').length).toBe(1)
    expect($('a.buttonLink').text()).toEqual('Get started')

    expect($('a[href="/logout"]').length).toBe(1)
    expect($('a[href="/logout"]').text()).toEqual('Log out')
  })

  expectedStrings.map(str => {
    //If we have an object inside our data object (for example income info) we need to loop thru it and not just process the top most value
    if (typeof str === 'object') {
      const second_str = Object.values(str)
      second_str.map(second_str => {
        test(`renders ${second_str} on page`, () => {
          const $ = cheerio.load(
            render(
              html`
                <${Dashboard} data=${data} />
              `,
            ),
          )
          expect($('dl').text()).toContain(second_str)
        })
      })
    } else {
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
    }
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
