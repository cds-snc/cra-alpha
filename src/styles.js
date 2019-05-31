const { css } = require('emotion')

/* Utilities */

const theme = {
  color: {
    grey: '#595959',
    gray: '#595959',
    greyLight: '#bfc1c3',
    grayLight: '#bfc1c3',
    white: '#ffffff',
    black: '#000000',
    focus: '#ffbf47',
    green: 'aquamarine',
    error: '#b10e1e',
    link: '#0645ad',
  },
  space: {
    xxs: '5px',
    xs: '10px',
    sm: '15px',
    md: '20px',
    lg: '30px',
    xl: '40px',
    xxl: '60px',
  },
  mq: {
    sm: 'max-width: 640px',
    lg: 'min-width: 640px',
  },
}

/* Reused styles */

const pageMargin = css`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${theme.space.md};
`

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

const buttonStyles = css`
  font: 400 1em sans-serif;
  line-height: 1.1875;
  display: inline-block;
  position: relative;
  width: 100%;
  margin-top: 0;
  padding: 7px 10px;
  border-radius: 0;
  color: ${theme.color.black};
  background-color: ${theme.color.green};
  border: 2px solid ${theme.color.grey};
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  -webkit-appearance: none;
  text-decoration: none;
`

const loggedInStyles = css`
  position: relative;

  > div {
    margin-bottom: ${theme.space.sm};
  }

  dl {
    margin-bottom: 0;
  }

  button,
  a.buttonLink {
    width: 200px;
  }

  @media (${theme.mq.sm}) {
    h1 {
      margin-right: ${theme.space.xxl};
    }
  }
`

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
    font-style: italic;
  }

  div[name='accordion'] {
    position: relative;
    overflow: hidden;
    opacity: 1;
    transform: translate(0, 0);
    margin-top: 14px;
    z-index: 2;

    #line367 dt,
    #line331 dt,
    #line260 dt,
    #line428 dt,
    #line482 dt,
    #currentBalance dt {
      padding-bottom: ${theme.space.xl};
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    padding: 0;
    margin: 0;
    padding-bottom: ${theme.space.sm};
    padding-top: ${theme.space.xs};
    border-bottom: 1px dotted grey;

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

module.exports = {
  theme,
  visuallyHidden,
  buttonStyles,
  loggedInStyles,
  pageMargin,
  accordionStyles,
}
