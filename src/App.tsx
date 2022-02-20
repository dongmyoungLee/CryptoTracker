import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Router from './Router';
import { ReactQueryDevtools } from 'react-query/devtools'
import { darkTheme, lightTheme } from './theme';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isDartAtom } from './atoms';


// document 의 head로 찾아가서 주입시켜줌, 렌더링될때 전역스코프에 스타일들을 올려준다.
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  font-family: 'Source Sans Pro', sans-serif;
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
      display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`

function App() {
  // const [isDark, setIsDark] = useState(true)
  // const toggleDark = () => setIsDark((current) => !current)
  // App 에서 생성 -> 라우터로 보냄 -> 라우터에서 받을준비(props & interface) -> coins로보냄  -> coins 에서 받을준비(props & interface) -> onclick 사용

  const isDark = useRecoilValue(isDartAtom)
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle/>
        <Router/>
        <ReactQueryDevtools initialIsOpen={true}/>
      </ThemeProvider>
    </>
  )
}

/*

App (isDark, modifierFn)

-> Router -> Coins (modifierFn)
-> Router -> Coin -> Chart (isDark)

현재의 global state 정의 -> 어플리케이션이 특정 value 에 접근해야할때 사용함. component가
어디있던 간에. 이렇게 하면 불편하기 때문에 state management 사용

 */

export default App;