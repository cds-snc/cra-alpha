const { renderStylesToString } = require('emotion-server')
const { metaIfSHA } = require('../utils.js')

const document = ({ title, locale, content }) => {
  return `
    <!DOCTYPE html>
    <html lang="${locale}">
      <head>
        ${metaIfSHA() || ''}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
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
            margin: 20px;
            font-size: 1.4em;
            font-family: sans-serif;
            line-height: 1.33;
          }

          h1 {
            margin-top: 35px;
            margin-bottom: 25px;
          }

          @media (max-width: 640px) {
            body { font-size: 1.1em; }
          }

          .visuallyHidden {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            clip: rect(0 0 0 0) !important;
            -webkit-clip-path: inset(50%) !important;
            clip-path: inset(50%) !important;
            border: 0 !important;
            white-space: nowrap !important;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
}

const renderPage = ({ title, locale, content }) => {
  return document({ title, locale, content: renderStylesToString(content) })
}

module.exports = renderPage
