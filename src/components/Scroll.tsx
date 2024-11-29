import { CSSProperties, ReactNode, forwardRef } from 'react'

// ScrollableContainerProps 인터페이스
interface ScrollableContainerProps {
  children: ReactNode
  style?: CSSProperties
}

// 기본 스타일
const defaultStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  overflowY: 'auto',
  height: '100%',
  width: '100%',
  scrollbarWidth: 'none', // 기본: 스크롤 숨김 (Firefox)
  paddingRight: '10px', // 기본적으로 padding-right 0으로 설정
}

// hover 시 스타일
const hoverStyle: CSSProperties = {
  scrollbarWidth: 'thin', // Firefox에서 얇은 스크롤
  scrollbarColor: '#1A2A6C #f0f0f0', // 스크롤 색상
  paddingRight: '10px', // 스크롤바 공간 예약
}

// forwardRef로 ScrollableContainer 컴포넌트 정의
const ScrollableContainer = forwardRef<
  HTMLDivElement,
  ScrollableContainerProps
>(({ children, style }, ref) => {
  const combinedStyle: CSSProperties = { ...defaultStyle, ...style }

  return (
    <div
      ref={ref} // ref 전달
      style={combinedStyle}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle)
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, defaultStyle)
      }}
    >
      {children}
    </div>
  )
})

export default ScrollableContainer
