import React, { useState, useEffect } from "react"
import { Cursor } from "../styles/globalStyles"

import { useGlobalStateContext } from "../context/globalContext"

const CustomCursor = ({ toggleMenu }) => {
  const { cursorType } = useGlobalStateContext()
  const [mousePosition, setMousePosition] = useState({
    x: 400,
    y: 400,
  })
  //x ,y 为 元素绝对位置的left top值
  const onMouseMove = e => {
    const { pageX: x, pageY: y } = e
    setMousePosition({ x, y })
  }
  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    return () => document.removeEventListener("mousemove", onMouseMove)
  }, [])
  return (
    <>
      <Cursor
        className={`${!!cursorType ? "hovered" : ""} ${cursorType} ${toggleMenu ? 'nav-open' : ''}`}
        style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
      />
    </>
  )
}

export default CustomCursor
