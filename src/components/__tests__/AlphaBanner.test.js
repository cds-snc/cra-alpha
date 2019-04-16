const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const AlphaBanner = require('../AlphaBanner.js')

test('<AlphaBanner> renders as expected', () => {
  const $ = cheerio.load(
    render(
      html`
        <${AlphaBanner} />
      `,
    ),
  )
  expect($('p strong').length).toBe(1)
  expect($('p span').length).toBe(1)
  expect($('p').text()).toEqual(
    'alphaThis site will be changing often as we learn from folks like you.',
  )
})
