import { css, createGlobalStyle } from 'styled-components'
import { reset } from 'styled-reset'

const customReset = css`
  ul,
  li {
    list-style: none;
    padding-left: 0px;
  }

  button {
    background: none;
    background-color: transparent;
    border: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  img {
    -webkit-user-drag: none;
  }
`

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${customReset}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body{
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    font-display: fallback;
  }

`

export default GlobalStyle
