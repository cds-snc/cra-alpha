const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../../utils.js')

const ValidationError = require('../ValidationError.js')

describe('<ValidationError>', () => {
  test('renders as expected', () => {
    const error = { param: 'name', msg: 'Please provide a name' }

    const $ = cheerio.load(
      render(
        html`
          <${ValidationError} ...${error} />
        `,
      ),
    )
    expect($('span').length).toBe(1)
    expect($('span').attr('id')).toEqual('name-error')
    expect($('span').text()).toEqual('Please provide a name')
  })
})
