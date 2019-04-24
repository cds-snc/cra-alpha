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
          <${Fieldset} id="location" options=${['Option 1']}><h1>Where do you live?</h1><//>
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
    ).toEqual('location-0')
  })

  test('renders rows of radios', () => {
    const options = ['Zurich', 'St. Petersburg', 'Stockholm']

    const $ = cheerio.load(
      render(
        html`
          <${Fieldset} id="location" options=${options}><h1>Where do you live?</h1><//>
        `,
      ),
    )
    expect($('fieldset').length).toBe(1)
    expect($('fieldset legend h1').length).toBe(1)

    expect($('fieldset input').length).toBe(3)

    options.map((label, index) => {
      let input = $('fieldset input').eq(index)

      expect(input.attr('name')).toEqual('location')
      expect(input.attr('id')).toEqual(`location-${index}`)
      expect(input.attr('value')).toEqual(label)
      expect(input.next('label').text()).toEqual(label)
    })
  })

  test('renders with correctly selected radio value', () => {
    const options = ['Zurich', 'St. Petersburg', 'Stockholm']

    const $ = cheerio.load(
      render(
        html`
          <${Fieldset} id="location" options=${options} value="St. Petersburg"
            ><h1>Where do you live?</h1><//
          >
        `,
      ),
    )
    expect($('fieldset').length).toBe(1)
    expect($('fieldset legend h1').length).toBe(1)

    expect($('fieldset input').length).toBe(3)
    const secondInput = $('fieldset input').eq(1)
    expect(secondInput.next('label').text()).toEqual('St. Petersburg')
    expect(secondInput.attr('checked')).toBeDefined()
  })
})
