const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../../utils.js')

const Input = require('../Input.js')

describe('TextInput <Input>', () => {
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

describe('Textarea <Input>', () => {
  test('renders as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Input} type="textarea" id="address">Mailing address<//>
        `,
      ),
    )
    expect($('textarea').length).toBe(1)
    expect($('textarea').attr('id')).toEqual('address')
    expect($('textarea').attr('name')).toEqual('address')
    expect($('textarea').attr('type')).toBeUndefined()
    expect($('textarea').attr('value')).toBeUndefined()
    expect($('textarea').text()).toEqual('')

    expect($('label').length).toBe(1)
    expect($('label').attr('for')).toEqual('address')
    expect($('label').text()).toEqual('Mailing address')
  })

  test('renders with passed-in attributes', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Input}
            type="textarea"
            id="thesis"
            name="thesis-1"
            july="days"
            value="In our attitude"
            >Thesis 1<//
          >
        `,
      ),
    )
    expect($('textarea').length).toBe(1)
    expect($('textarea').attr('id')).toEqual('thesis')
    expect($('textarea').attr('name')).toEqual('thesis-1')
    expect($('textarea').attr('type')).toBeUndefined()
    expect($('textarea').attr('value')).toBeUndefined()
    expect($('textarea').attr('july')).toEqual('days')
    expect($('textarea').text()).toEqual('In our attitude')

    expect($('label').length).toBe(1)
    expect($('label').attr('for')).toEqual('thesis')
    expect($('label').text()).toBe('Thesis 1')
  })

  test('renders with a validation error', () => {
    const error = { param: 'platform', msg: 'Not a rousing message' }

    const $ = cheerio.load(
      render(
        html`
          <${Input} type="textarea" id="platform" error=${error}
            >Our platform<//
          >
        `,
      ),
    )
    expect($('textarea').length).toBe(1)
    expect($('textarea').attr('id')).toEqual('platform')

    expect($('label').length).toBe(1)
    expect($('label').text()).toBe('Our platform')

    expect($('span#platform-error').length).toBe(1)
    expect($('span#platform-error').text()).toBe('Error: Not a rousing message')
    expect($('textarea').attr('aria-describedby')).toEqual('platform-error')

    // expect validation message is after the label
    expect(
      $('label')
        .next()
        .attr('id'),
    ).toEqual('platform-error')
    // expect validation message is before the textarea
    expect(
      $('textarea')
        .prev()
        .attr('id'),
    ).toEqual('platform-error')
  })
})
