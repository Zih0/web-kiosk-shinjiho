import React, { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface Props {
  imgList: string[]
  delay?: number
}

const Slider: FC<Props> = ({ imgList, delay = 2500 }) => {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<any>(null)

  const resetTimeout = () => {
    if (!timeoutRef.current) return

    clearTimeout(timeoutRef.current)
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setIndex((prevIndex) => (prevIndex === imgList.length - 1 ? 0 : prevIndex + 1)),
      delay,
    )

    return () => {
      resetTimeout()
    }
  }, [index])

  return (
    <SliderWrapper>
      <SliderShow className="slideshowSlider" index={index}>
        {imgList.map((img, idx) => (
          <Slide key={idx}>
            <img src={img} alt={`slider-${idx}`} />
          </Slide>
        ))}
      </SliderShow>
    </SliderWrapper>
  )
}

export default Slider

const SliderWrapper = styled.div`
  margin: 0 auto;
  overflow: hidden;
  width: 1080px;
`

const SliderShow = styled.div<{ index: number }>`
  white-space: nowrap;
  transition: ease 1s;
  transform: ${({ index }) => `translate3d(${-index * 100}%, 0, 0)`};
`

const Slide = styled.div`
  display: inline-block;
  width: 100%;
  height: 350px;

  img {
    width: 100%;
    height: 100%;
  }
`
