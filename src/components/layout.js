import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import { normalize } from "styled-normalize"
import Header from '../components/header'
import Cursor from '../components/customCursor'
import Navigation from '../components/navigation'
import { useGlobalStateContext, useGlobalDispatchContext } from '../context/globalContext'

const GlobalStyle = createGlobalStyle`
${normalize}
*{
       box-sizing: border-box;
       margin: 0;
       padding: 0;
       text-decoration: none;
       cursor: none
   }
   html{
       -webkit-font-smoothing: antialiased;
       font-size: 16px; 
   }

   body{
       font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
       overscroll-behavior: none;
       overflow-x: hidden;
       background: ${props => props.theme.background};
       color: ${props => props.theme.text}
   }
`
const darkTheme = {
  background: "#000",
  text: "#fff",
  red: "#ea291e",
}

const lightTheme = {
  background: "#fff",
  text: "#000",
  red: "#ea291e",
}

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `) 

  const {currentTheme, cursorStyles} = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  //设置指针样式  当移到标题上时() => onCursor(hovered) 移出() => onCursor()
  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType)
    dispatch({type:'CURSOR_TYPE', cursorType: cursorType})
  }
  
  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
       <GlobalStyle />
       <Cursor toggleMenu={toggleMenu} />
       <Header onCursor={onCursor} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
       <Navigation toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} onCursor={onCursor} />
      {children}
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
