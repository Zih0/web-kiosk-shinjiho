import { createGlobalStyle, css } from 'styled-components'
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
    color: ${({ theme }) => theme.color.black};
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

  body{
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    max-width: 1080px;
    width: 100%;
    height: 1920px;
    margin: 0 auto;

    letter-spacing: -0.41px;
  }

  #root {
    height: 100%
  }

`

export default GlobalStyle
