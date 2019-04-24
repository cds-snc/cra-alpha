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
          <${Fieldset} id="location" rows=${[{ key: 'r1', value: 'r1' }]}
            ><h1>Where do you live?</h1><//
          >
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
    const rows = [
      { key: 'Zurich', value: 'zurich' },
      { key: 'St. Petersberg', value: 'petersburg' },
      { key: 'Stockholm', value: 'stockholm' },
    ]

    const $ = cheerio.load(
      render(
        html`
          <${Fieldset} id="location" rows=${rows}><h1>Where do you live?</h1><//>
        `,
      ),
    )
    expect($('fieldset').length).toBe(1)
    expect($('fieldset legend h1').length).toBe(1)

    expect($('fieldset input').length).toBe(3)

    rows.map((row, index) => {
      let input = $('fieldset input').eq(index)

      expect(input.attr('name')).toEqual('location')
      expect(input.attr('id')).toEqual(`location-${index}`)
      expect(input.attr('value')).toEqual(row.value)
      expect(input.next('label').text()).toEqual(row.key)
    })
  })

  test('renders with correctly selected radio value', () => {
    const rows = [
      { key: 'Zurich', value: 'zurich' },
      { key: 'St. Petersberg', value: 'petersburg' },
      { key: 'Stockholm', value: 'stockholm' },
    ]

    const $ = cheerio.load(
      render(
        html`
          <${Fieldset} id="location" rows=${rows} value="petersburg"><h1>Where do you live?</h1><//>
        `,
      ),
    )
    expect($('fieldset').length).toBe(1)
    expect($('fieldset legend h1').length).toBe(1)

    expect($('fieldset input').length).toBe(3)
    const secondInput = $('fieldset input').eq(1)
    expect(secondInput.next('label').text()).toEqual('St. Petersberg')
    expect(secondInput.attr('checked')).toBeDefined()
  })
})
