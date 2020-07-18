import React from "react"
import Layout from "../components/layout"
import Banner from "../components/homePage/homeBanner"
import {
  useGlobalStateContext,
  useGlobalDispatchContext,
} from "../context/globalContext"

const IndexPage = props => {
  const { cursorStyles } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const onCursor = cursorType => {
    cursorType = cursorStyles.includes(cursorType) && cursorType
    dispatch({ type: "CURSOR_TYPE", cursorType: cursorType })
  }
  return (
    <Layout>
      <Banner onCursor={onCursor} />
    </Layout>
  )
}

export default IndexPage
