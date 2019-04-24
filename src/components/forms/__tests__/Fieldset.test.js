const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../../utils.js')

const Fieldset = require('../Fieldset.js')

describe('<Fieldset>', () => {
  test('renders with children', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Fieldset}><h1>Where do you live?</h1><//>
        `,
      ),
    )
    expect($('fieldset').length).toBe(1)
    expect($('fieldset legend h1').length).toBe(1)
    expect($('fieldset legend h1').text()).toEqual('Where do you live?')
  })

  test('renders with passed-in attributes', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Fieldset} id="location"><h1>Where do you live?</h1><//>
        `,
      ),
    )
    expect($('fieldset').length).toBe(1)
    expect($('fieldset legend h1').length).toBe(1)

    expect($('fieldset').attr('id')).toEqual('location')
    expect(
      $('fieldset input')
        .first()
        .attr('id'),
    ).toEqual('location-1')
  })
})
