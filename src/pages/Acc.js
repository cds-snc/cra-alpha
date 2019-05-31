const { css } = require('emotion')
const { loggedInStyles, theme, visuallyHidden } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const { SummaryTable } = require('../components/SummaryTable.js')
const polyglot = require('../i18n.js')

const accordionStyles = css`
  h2 {
    font-weight: 700;
    letter-spacing: 1px;
    display: block;
    background-color: white;
    margin: 0;
    cursor: pointer;
    @extend .no-select;
  }

  p {
    margin: 0;
    font-size: 18px;
  }

  div[name='accordion'] {
    position: relative;
    overflow: hidden;
    max-height: 800px;
    opacity: 1;
    transform: translate(0, 0);
    margin-top: 14px;
    z-index: 2;
  }

  ul {
    list-style: none;
    perspective: 900;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    padding: 0;
    margin: 0;
    padding-bottom: 4px;
    padding-top: 18px;
    border-top: 1px dotted grey;

    i {
      position: absolute;
      transform: translate(-6px, 0);
      margin-top: 16px;
      right: 0;

      &:before,
      &:after {
        content: '';
        position: absolute;
        background-color: black;
        width: 3px;
        height: 9px;
      }

      &:before {
        transform: translate(-2px, 0) rotate(45deg);
      }

      &:after {
        transform: translate(2px, 0) rotate(-45deg);
      }
    }

    input[type='checkbox'] {
      position: absolute;
      cursor: pointer;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;

      &:checked {
        & ~ div[name='accordion'] {
          margin-top: 0;
          max-height: 0;
          opacity: 0;
          transform: translate(0, 50%);
        }

        & ~ i {
          &:before {
            transform: translate(2px, 0) rotate(45deg);
          }
          &:after {
            transform: translate(-2px, 0) rotate(-45deg);
          }
        }
      }
    }
  }
`

const Accordion = ({ children, header, checked }) =>
  html`
    <div class=${accordionStyles}>
      <ul>
        <li>
          <input type="checkbox" ${checked ? 'checked' : null} /><i></i>
          <h2>${header}</h2>

          <div name="accordion">
            ${children}
          </div>
        </li>
      </ul>
    </div>
  `

const accordion2styles = css`
  .Accordion {
    border-top: 1px dashed ${theme.color.black};
    border-bottom: 1px dashed ${theme.color.black};
  }

  .Accordion-trigger {
    font-size: 1em;
    margin: 0;
    position: relative;
    text-align: left;
    width: 100%;
  }

  button {
    background: none;
    border-style: none;
    cursor: pointer;
    padding: 0;
  }

  button::-moz-focus-inner {
    border: 0;
  }

  button h2 {
    margin-right: ${theme.space.xxl};
  }

  .Accordion-title {
    display: block;
    pointer-events: none;
  }

  .Accordion-trigger-label {
    position: absolute;
    top: 40%;
    right: ${theme.space.xl};
    color: ${theme.color.link};
  }

  .Accordion-icon {
    border: solid ${theme.color.link};
    border-width: 0 3px 3px 0;
    pointer-events: none;
    position: absolute;
    right: ${theme.space.sm};
    top: 50%;
    transform: translateY(-60%) rotate(45deg);
    height: 0.6rem;
    width: 0.6rem;
  }

  .Accordion-trigger[aria-expanded='true'] .Accordion-icon {
    transform: translateY(-50%) rotate(-135deg);
  }

  .Accordion-panel {
    margin: 0;
  }

  /* For Edge bug https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4806035/ */
  .Accordion-panel[hidden] {
    display: none;
  }

  /* Focus styles */
  .Accordion-trigger:focus,
  .Accordion-trigger:hover {
    background: aliceblue;

    & .Accordion-trigger-label {
      text-decoration: underline;
    }

    & .Accordion-icon {
      border-color: blue;
      text-decoration: underline;
    }
  }
`

const Accordion2 = ({ children, header, open = false }) =>
  html`
    <div class=${accordion2styles}>
      <div id="accordionGroup" class="Accordion">
        <button
          aria-expanded=${open === (false || 'false') ? 'false' : 'true'}
          class="Accordion-trigger"
          aria-controls="sect1"
          id="accordion1id"
        >
          <span class="Accordion-title">
            <h2>
              ${header}
            </h2>
            <span class="Accordion-trigger-label"
              >${open === (false || 'false') ? 'Show' : 'Hide'}
              <span class=${visuallyHidden}>${header}</span></span
            >
            <span class="Accordion-icon"></span>
          </span>
        </button>
        <div id="sect1" role="region" aria-labelledby="accordion1id" class="Accordion-panel">
          <div>
            ${children}
          </div>
        </div>
      </div>
    </div>
  `

const aboutYouRows = ({ name, address, maritalStatus, children, SIN }) => {
  return [
    { key: 'Name', value: name, id: 'name' },
    { key: 'Mailing address', value: address, id: 'address' },
    { key: 'Marital status', value: maritalStatus, id: 'maritalStatus' },
    { key: 'Number of children', value: children, id: 'children' },
    { key: 'Social Insurance Number (SIN)', value: SIN, id: 'sin' },
  ]
}

const Acc = ({ user = {}, locale }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>${polyglot.t(`${locale}.checklist.title`)}</h1>
        <p>
          ${polyglot.t(`${locale}.checklist.intro`)}
        </p>

        <${Accordion} header="${polyglot.t(`${locale}.checklist.personalInformation`)}">
          <${SummaryTable} rows=${aboutYouRows(user.personal)} />
        <//>

        <${Accordion2} header="${polyglot.t(`${locale}.checklist.personalInformation`)}">
          <${SummaryTable} rows=${aboutYouRows(user.personal)} />
        <//>
      </div>
    <//>
  `

module.exports = Acc
