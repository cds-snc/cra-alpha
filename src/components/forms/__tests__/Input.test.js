const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../../utils.js')

const Input = require('../Input.js')

describe('<Input>', () => {
  test('renders as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Input} id="sin">Social Insurance Number<//>
        `,
      ),
    )
    expect($('input').length).toBe(1)
    expect($('input').attr('id')).toEqual('sin')
    expect($('input').attr('name')).toEqual('sin')
    expect($('input').attr('type')).toEqual('text')
    expect($('input').attr('value')).toBeUndefined()

    expect($('label').length).toBe(1)
    expect($('label').attr('for')).toEqual('sin')
    expect($('label').attr('style')).toEqual('font-weight: 700;')
    expect($('label').text()).toBe('Social Insurance Number')
  })

  test('renders with passed-in attributes', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Input}
            id="year"
            name="dobYear"
            type="number"
            death="freedom"
            value="1870"
            >Year<//
          >
        `,
      ),
    )
    expect($('input').length).toBe(1)
    expect($('input').attr('id')).toEqual('year')
    expect($('input').attr('name')).toEqual('dobYear')
    expect($('input').attr('type')).toEqual('number')
    expect($('input').attr('value')).toEqual('1870')
    expect($('input').attr('death')).toEqual('freedom')

    expect($('label').length).toBe(1)
    expect($('label').attr('for')).toEqual('year')
    expect($('label').text()).toBe('Year')
  })

  const bolds = ['false', false]
  bolds.map(bold => {
    test(`renders a non-bolded label when passed "false" as a ${typeof bold}`, () => {
      const $ = cheerio.load(
        render(
          html`
            <${Input} id="notBold" bold=${bold}>Not bold<//>
          `,
        ),
      )
      expect($('input').length).toBe(1)
      expect($('input').attr('id')).toEqual('notBold')

      expect($('label').length).toBe(1)
      expect($('label').attr('style')).toEqual('font-weight: 400;')
      expect($('label').text()).toBe('Not bold')
    })
  })

  test('renders with a validation error', () => {
    const error = { param: 'city', msg: 'Not a good city' }

    const $ = cheerio.load(
      render(
        html`
          <${Input} id="city" error=${error}>Name of city<//>
        `,
      ),
    )
    expect($('input').length).toBe(1)
    expect($('input').attr('id')).toEqual('city')

    expect($('label').length).toBe(1)
    expect($('label').text()).toBe('Name of city')

    expect($('span#city-error').length).toBe(1)
    expect($('span#city-error').text()).toBe('Error: Not a good city')
    expect($('input').attr('aria-describedby')).toEqual('city-error')

    // expect validation message is after the label
    expect(
      $('label')
        .next()
        .attr('id'),
    ).toEqual('city-error')
    // expect validation message is before the input
    expect(
      $('input')
        .prev()
        .attr('id'),
    ).toEqual('city-error')
  })
})
