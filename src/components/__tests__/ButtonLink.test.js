const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const ButtonLink = require('../ButtonLink.js')

describe('<ButtonLink>', () => {
  test('renders as expected', () => {
    const $ = cheerio.load(
      render(
        html`
          <${ButtonLink} href="#">Submit<//>
        `,
      ),
    )
    expect($('a').length).toBe(1)
    expect($('a').text()).toEqual('Submit')
    expect($('a').attr('href')).toEqual('#')
    expect($('a').attr('class')).toContain('buttonLink')
    expect($('a').attr('role')).toEqual('button')
    expect($('a').attr('draggable')).toEqual('false')

    expect($('script').length).toBe(1)
  })

  test('renders with passed-in attributes', () => {
    const $ = cheerio.load(
      render(
        html`
          <${ButtonLink} href="/logout" style="orange" whizz="bang" download>Log out<//>
        `,
      ),
    )
    expect($('a').length).toBe(1)
    expect($('a').text()).toEqual('Log out')
    expect($('a').attr('whizz')).toEqual('bang')
    expect($('a').attr('class')).toContain('orange buttonLink')
    expect($('a').attr('download')).toBeDefined()
  })
})
