const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../../utils.js')

const Radio = require('../Radio.js')

describe('<Radio>', () => {
  test('renders as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Radio} id="one">Pick option 1<//>
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
          <${Radio} id="menu-item-1" name="menu-1" value="falafel" checked
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
