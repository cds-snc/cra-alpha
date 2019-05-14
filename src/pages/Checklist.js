const { css } = require('emotion')
const { loggedInStyles } = require('../styles.js')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')
const LogoutLink = require('../components/LogoutLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const ButtonLink = require('../components/ButtonLink.js')
const Input = require('../components/forms/Input.js')

const inlineH2 = css`
  display: inline-block;
  margin-top: 0;
`

const accordionStyles = css`
.transition{
  transition: all 0.25s ease-in-out;
}

.flipIn{
  animation: flipdown 0.5s ease both;
}
  
.no-select{ 
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

h2{
  font-size: 26px;
  line-height: 34px;
  font-weight: 700;
  letter-spacing: 1px;
  display: block;
  background-color: white;
  margin: 0;
  cursor: pointer;
  @extend .no-select;
}

div[name='accordion']{
  position: relative;
  overflow: hidden;
  max-height: 800px;
  @extend .transition;
  opacity: 1;
  transform: translate( 0 , 0 );
  margin-top: 14px;
  z-index: 2;
}

ul{
  list-style: none;
  perspective: 900;
  padding: 0;
  margin: 0;
}

li{
  position: relative;
  padding: 0;
  margin: 0;
  padding-bottom: 4px;
  padding-top: 18px;
  border-top: 1px dotted grey;
  @extend .flipIn;
    
  &:nth-of-type(1){
    animation-delay: 0.5s;
  }
  
  &:nth-of-type(2){
    animation-delay: 0.75s;
  }
      
  &:nth-of-type(3){
    animation-delay: 1.0s;
  }
  
  &:last-of-type{
    padding-bottom: 0;
  }
    
  i{
    position: absolute;
    transform: translate( -6px , 0 );
    margin-top: 16px;
    right: 0;

      &:before , &:after {
      content: "";
      @extend .transition;
      position: absolute;
      background-color: black;
      width: 3px;
      height: 9px;
      }
      
      &:before {
        transform: translate( -2px , 0 ) rotate( 45deg );
      }

      &:after {
        transform: translate( 2px , 0 ) rotate( -45deg );
      }
    }

  
  input[type=checkbox] {
    position: absolute;
    cursor: pointer;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    
    &:checked{
      &~div[name='accordion']{
        margin-top: 0;
        max-height: 0;
        opacity: 0;
        transform: translate( 0 , 50% );
      }
          
      &~i{
        &:before{
          transform: translate( 2px , 0 ) rotate( 45deg );
        }
        &:after{
          transform: translate( -2px , 0 ) rotate( -45deg );
        }
      }
    }
  }
}
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

const t4Data = ({ employerName, year, box12, box14, box22 } = {}) => {
  return [
    { key: 'Employer name', value: employerName },
    { key: 'Year', value: year },
    { key: 'Social Insurance Number', value: box12 },
    { key: 'Employment income', value: box14 },
    { key: 'Income tax deducted', value: box22 },
  ]
}

const Checklist = ({ data = {} }) =>
  html`
    <${Layout}>
      <div class=${loggedInStyles}>
        <${LogoutLink} />
        <h1>About you</h1>
        <p>
          This is the current name and address we have on file for you. Please update any
          out-of-date information and then continue to the next section.
        </p>
        

        <div class=${accordionStyles}>  
        <ul>
          <li>
            <input type="checkbox" checked/>
            <i></i>
            <h2>Personal Information</h2>
            <div name='accordion'>
            <${SummaryTable} rows=${aboutYouRows(data)} />
            </div>
          </li>
        </ul>
      </div>

        <div class=${accordionStyles}>  
        <ul>
          <li>
            <input type="checkbox" checked/>
            <i></i>
            <h2>Financial Information</h2>
            <div name='accordion'>
            <${SummaryTable} rows=${t4Data(data.return)} />
            </div>
          </li>
        </ul>
      </div>
        

       <h2 class=${inlineH2}>3.</h2> <${ButtonLink} href="/confirmation">File my taxes<//>

      </div>
    <//>
  `

module.exports = Checklist

