const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const AboutYou = require('../AboutYou.js')

describe('<AboutYou>', () => {
  const data = {
    name: 'Fred Smith',
    address: 'Mississauga',
  }

  const expectedStrings = Object.values(data)

  test('renders h1 as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${AboutYou} data=${data} />
        `,
      ),
    )
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('About you')

    expect($('a.buttonLink').length).toBe(1)
    expect($('a.buttonLink').text()).toEqual('Continue')

    expect($('a[href="/logout"]').length).toBe(1)
    expect($('a[href="/logout"]').text()).toEqual('Log out')
  })

  expectedStrings.map(str => {
    test(`renders ${str} on page`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${AboutYou} data=${data} />
          `,
        ),
      )
      expect($('h1').text()).toEqual('About you')
      expect($('dl').text()).toContain(str)
    })
  })
})
