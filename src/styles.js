const { css } = require('emotion')

const theme = {
  color: {
    grey: '#595959',
    gray: '#595959',
    greyLight: '#bfc1c3',
    grayLight: '#bfc1c3',
    white: '#ffffff',
    black: '#000000',
    focus: '#FFBF47',
    green: 'aquamarine',
  },
}

const visuallyHidden = css`
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
`

module.exports = {
  theme,
  visuallyHidden,
}
