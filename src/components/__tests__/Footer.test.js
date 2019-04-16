const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const Footer = require('../Footer.js')

test('<Footer> renders as expected', () => {
  const $ = cheerio.load(
    render(
      html`
        <${Footer} />
      `,
    ),
  )
  expect($('div').length).toBe(1)
  expect($('div a').length).toBe(1)
  expect($('a').text()).toEqual('Get help')
})
