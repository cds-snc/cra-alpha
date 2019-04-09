const { css } = require('emotion')
const { theme } = require('../styles.js')
const { html } = require('../utils.js')

const listItem = css`
  &:not(:last-of-type) {
    margin-bottom: ${theme.space.xxs};
  }

  a {
    color: ${theme.color.error};
  }
`

const ListItem = ({ param, msg }) => html`
  <li class=${listItem}>
    <a href=${`#${param}`}>${msg}</a>
  </li>
`

const errorList = css`
  color: ${theme.color.black};
  padding: ${theme.space.sm};
  margin-bottom: ${theme.space.lg};
  margin-top: ${theme.space.md};
  border: 4px solid ${theme.color.error};

  h2 {
    margin-top: 0;
    margin-bottom: ${theme.space.sm};
  }

  ul {
    margin: 0;
    padding-left: 0;
    list-style-type: none;
  }

  /* on larger screens */
  @media (min-width: 640px) {
    border-width: 5px;
    margin-bottom: ${theme.space.xl};
    padding: ${theme.space.md};

    h2 {
      margin-bottom: ${theme.space.md};
    }
  }
`

const ErrorList = ({ errors }) =>
  html`
    <div
      id="errorList"
      class=${errorList}
      aria-labelledby="errorListTitle"
      role="alert"
      tabindex="-1"
    >
      <h2 id="errorListTitle">
        There is a problem
      </h2>
      <ul>
        ${Object.keys(errors).map(key => errors[key] && ListItem(errors[key]))}
      </ul>
    </div>
  `

module.exports = ErrorList
