const { renderStylesToString } = require('emotion-server')
const render = require('preact-render-to-string')
const { theme } = require('../styles.js')
const { html, metaIfSHA } = require('../utils.js')

const document = ({ title, locale, content }) => {
  return `
    <!DOCTYPE html>
    <html lang="${locale}">
      <head>
        ${metaIfSHA() || ''}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="[WIP] A benefit signup prototype by the Canadian Digital Service">
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" sizes="32x32"  />
        <title>${title}</title>
        <style>
          * {
            box-sizing: border-box;
          }

          *:focus {
            outline: 3px solid #FFBF47;
            outline-offset: 0;
          }

          body {
            margin: 0;
            font-size: 1.3em;
            font-family: sans-serif;
            line-height: 1.33;
          }

          h1 {
            margin-top: 35px;
            margin-bottom: 25px;
          }

          @media (${theme.mq.sm}) {
            body { font-size: 1.05em; }
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
}

const _renderDocument = ({ title, locale, content }) => {
  return document({ title, locale, content: renderStylesToString(content) })
}

const renderPage = ({ locale, pageComponent, title = '', props }) => {
  const Page = require(`./${pageComponent}.js`)

  const content = render(
    html`
      <${Page} ...${props} />
    `,
  )

  // if title is not explicitly passed in, use the name of the page component
  title = title || pageComponent
  return _renderDocument({
    title,
    locale,
    content,
  })
}

module.exports = {
  renderPage,
  _renderDocument,
}
