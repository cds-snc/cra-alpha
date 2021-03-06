const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const YourFamily = require('../YourFamily.js')

describe('<YourFamily>', () => {
  const data = {
    maritalStatus: 'Married',
    children: 5,
  }

  const expectedStrings = Object.values(data)

  test('renders h1 as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${YourFamily} data=${data} />
        `,
      ),
    )
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('You and your family')

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
            <${YourFamily} data=${data} />
          `,
        ),
      )
      expect($('h1').text()).toEqual('You and your family')
      expect($('dl').text()).toContain(str)
    })
  })
})
