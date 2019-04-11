const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')

const confirmation = css`
  position: relative;
`
const confirmationNumber = css`
  border: 2px solid ${theme.color.black};
  padding: ${theme.space.xl} 0;
  width: 100%;
  max-width: 400px;
  text-align: center;

  .confirmationNumber--title {
    margin-bottom: ${theme.space.md};
  }

  .confirmationNumber {
    font: 400 1.8em monospace;
  }
`

const Confirmation = ({ data: { name = '' } = {} }) =>
  html`
    <${Layout}>
      <div class=${confirmation}>
        <${LogoutLink} />
        <h1>Success! 🥳🙌</h1>
        <p>🌈 Good job, ${name.split(' ')[0]}! 🌈</p>
        <p>
          Your 2018 taxes have been submitted and${' '}
          <strong>you will receive $1611.87 in benefit payments</strong>.
        </p>

        <div class=${confirmationNumber}>
          <div class="confirmationNumber--title">Confirmation number</div>
          <div class="confirmationNumber">5H3P9IO5816</div>
        </div>

        <p>
          Your Notice of Assessment will arrive in the mail in 4 to 6 weeks.
        </p>

        <br />
      </div>
    <//>
  `

module.exports = Confirmation
