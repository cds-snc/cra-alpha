const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const LogoutLink = require('../LogoutLink.js')

test('<LogoutLink> renders as expected', () => {
  const $ = cheerio.load(
    render(
      html`
        <${LogoutLink} />
      `,
    ),
  )
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Log out')
})
