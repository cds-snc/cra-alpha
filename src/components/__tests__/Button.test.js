const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const Button = require('../Button.js')

describe('<Button>', () => {
  test('renders as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Button}>Submit<//>
        `,
      ),
    )
    expect($('button').length).toBe(1)
    expect($('button').text()).toEqual('Submit')
    expect($('button').attr('type')).toEqual('submit')
  })

  test('renders with passed-in attributes', () => {
    const $ = cheerio.load(
      render(
        html`
          <${Button} type="reset" style="orange" whizz="bang" disabled>Reset<//>
        `,
      ),
    )
    expect($('button').length).toBe(1)
    expect($('button').text()).toEqual('Reset')
    expect($('button').attr('type')).toEqual('reset')
    expect($('button').attr('whizz')).toEqual('bang')
    expect($('button').attr('class')).toContain('orange')
    expect($('button').attr('disabled')).toBeDefined()
  })
})
