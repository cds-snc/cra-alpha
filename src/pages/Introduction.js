const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const { getFirstName } = require('../api.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const ButtonLink = require('../components/ButtonLink.js')

const Introduction = ({ data = {} }) =>
  html`
    <${Layout}>
    ${console.log(data)}
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>Hi, ${getFirstName(data.name)}</h1>
        <p>
          Here’s what we know about you based on your previous tax returns and information from your
          employer.
        </p>
        <p>If any of this information is wrong, you’ll have a chance to update it.</p>

        <p>
          On the following pages, you can review each section and correct any outdated information.
          Once your information is up-to-date, you will be ready to submit your tax return.
        </p>
        <p>
          There are <strong>3 sections</strong> in total, and it should take approximately
          ${' '}<strong>10 minutes</strong>
          ${' '}to complete.
        </p>

        <${ButtonLink} href="/checklist">Get started<//>
      </div>
    <//>
  `

module.exports = Introduction
