import React, { useEffect, useRef } from "react"
import {
  Banner,
  Video,
  Canvas,
  BannerTitle,
  Headline,
} from "../../styles/homeStyles"
import useWindowSize from "../../hooks/useWindowSize"
import { useGlobalStateContext } from "../../context/globalContext"

const HomeBanner = ({onCursor}) => {
  let canvas = useRef(null)
  const size = useWindowSize()
  const { currentTheme } = useGlobalStateContext()

  //创建画布
  useEffect(() => {
    let renderingElement = canvas.current
    let drawingElement = renderingElement.cloneNode()

    let drawingCtx = drawingElement.getContext("2d")
    let renderingCtx = renderingElement.getContext("2d")

    let lastX
    let lastY

    let moving = false

    renderingCtx.globalCompositeOperation = "source-over"
    renderingCtx.fillStyle = currentTheme === 'dark' ? '#000000' : '#ffffff'
    renderingCtx.fillRect(0, 0, size.width, size.height)

    renderingElement.addEventListener('mouseover', e => {
        moving = true
        lastX = e.pageX - renderingElement.offsetLeft
        lastY = e.pageY - renderingElement.offsetTop
    })
    renderingElement.addEventListener("click", ev => {
        moving = true
        lastX = ev.pageX - renderingElement.offsetLeft
        lastY = ev.pageY - renderingElement.offsetTop
      })
    renderingElement.addEventListener('mouseup', e => {
      moving = false
      lastX = e.pageX - renderingElement.offsetLeft
      lastY = e.pageY - renderingElement.offsetTop
  })
  
  renderingElement.addEventListener('mousemove', e => {
      if(moving){
          drawingCtx.globalCompositeOperation = 'source-over'
          renderingCtx.globalCompositeOperation = 'destination-out'
          let currentX = e.pageX - renderingElement.offsetLeft
          let currentY = e.pageY - renderingElement.offsetTop
          drawingCtx.lineJoin = 'round'
          drawingCtx.moveTo(lastX, lastY)
          drawingCtx.lineTo(currentX, currentY)
          drawingCtx.closePath()
          drawingCtx.lineWidth = 120
          drawingCtx.stroke()
          lastX = currentX
          lastY = currentY
          renderingCtx.drawImage(drawingElement, 0, 0)
      }
  })
  }, [currentTheme])

  //字体动画
  const parants = {
      animate: {
          y: 0,
          transition: {
              staggerChildren: 0.2
          }
      }
  }

  const child = {
      initial: {
          y: 800
      },
      animate: {
          y: 0,
          transition: {
              duration: 1,
              ease: [0.6, 0.05, -0.01, 0.9]
          }
      }
  }

  return (
    <Banner onMouseEnter={() => onCursor('hovered')} onMouseLeave={onCursor} >
      <Video>
        <video
          height="100%"
          width="100%"
          loop
          autoPlay
          src={require("../../assets/video/video.mp4")}
        />
      </Video>
      <Canvas ref={canvas} width={size.width} height={size.height} />
      <BannerTitle variants={parants} initial='initial' animate='animate' >
        <Headline variants={child}>DIG</Headline>
        <Headline variants={child}>DEEP</Headline>
      </BannerTitle>
    </Banner>
  )
}

export default HomeBanner
