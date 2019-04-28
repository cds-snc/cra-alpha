const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../../utils.js')

const MultipleChoice = require('../MultipleChoice.js')

describe('<Checkbox>', () => {
  test('renders as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${MultipleChoice} id="yes">Check me<//>
        `,
      ),
    )
    expect($('input').length).toBe(1)
    expect($('input').attr('type')).toEqual('checkbox')
    expect($('input').attr('id')).toEqual('yes')
    expect($('input').attr('name')).toEqual('yes')
    expect($('input').attr('value')).toEqual('yes')
    expect($('input').attr('checked')).toBeUndefined()

    expect($('label').text()).toEqual('Check me')
  })

  test('renders with passed-in attributes', () => {
    const $ = cheerio.load(
      render(
        html`
          <${MultipleChoice} id="marryMe" name="marryMe-checkbox" value="y" checked>I do<//>
        `,
      ),
    )
    expect($('input').length).toBe(1)
    expect($('input').attr('type')).toEqual('checkbox')
    expect($('input').attr('id')).toEqual('marryMe')
    expect($('input').attr('name')).toEqual('marryMe-checkbox')
    expect($('input').attr('value')).toEqual('y')
    expect($('input').attr('checked')).toBeDefined()

    expect($('label').text()).toEqual('I do')
  })
})

describe('<Radio>', () => {
  test('renders as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${MultipleChoice} type="radio" id="one">Pick option 1<//>
        `,
      ),
    )
    expect($('input').length).toBe(1)
    expect($('input').attr('type')).toEqual('radio')
    expect($('input').attr('id')).toEqual('one')
    expect($('input').attr('name')).toEqual('one')
    expect($('input').attr('value')).toEqual('one')
    expect($('input').attr('checked')).toBeUndefined()

    expect($('label').text()).toEqual('Pick option 1')
  })

  test('renders with passed-in attributes', () => {
    const $ = cheerio.load(
      render(
        html`
          <${MultipleChoice} type="radio" id="menu-item-1" name="menu-1" value="falafel" checked
            >Falafel wrap with chili sauce and garlic sauce<//
          >
        `,
      ),
    )
    expect($('input').length).toBe(1)
    expect($('input').attr('type')).toEqual('radio')
    expect($('input').attr('id')).toEqual('menu-item-1')
    expect($('input').attr('name')).toEqual('menu-1')
    expect($('input').attr('value')).toEqual('falafel')
    expect($('input').attr('checked')).toBeDefined()

    expect($('label').text()).toEqual('Falafel wrap with chili sauce and garlic sauce')
  })
})
