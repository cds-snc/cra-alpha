const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../../utils.js')

const Checkbox = require('../Checkbox.js')

describe('<Checkbox>', () => {
  test('renders as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Checkbox} id="yes">Check me<//>
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
          <${Checkbox} id="marryMe" name="marryMe-checkbox" value="y" checked
            >I do<//
          >
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
