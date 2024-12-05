import { CSSProperties, ReactNode, forwardRef, useState } from 'react'

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
  overflowY: 'hidden', // 기본적으로 스크롤 숨김
  height: '100%',
  width: '100%',
  scrollbarWidth: 'none', // Firefox에서 스크롤 숨김
  paddingRight: '10px', // 스크롤바 공간 예약
}

// hover 시 스타일
const hoverStyle: CSSProperties = {
  overflowY: 'auto', // hover 시 스크롤이 보이도록 설정
}

// forwardRef로 ScrollableContainer 컴포넌트 정의
const ScrollableContainer = forwardRef<
  HTMLDivElement,
  ScrollableContainerProps
>(({ children, style }, ref) => {
  const [isHovered, setIsHovered] = useState(false)

  // 스타일 병합
  const combinedStyle: CSSProperties = {
    ...defaultStyle,
    ...style,
    ...(isHovered ? hoverStyle : {}), // hover 시 스타일 덮어쓰기
  }

  return (
    <div
      ref={ref}
      style={combinedStyle}
      onMouseEnter={() => setIsHovered(true)} // 마우스 오버 시
      onMouseLeave={() => setIsHovered(false)} // 마우스 아웃 시
    >
      {children}
    </div>
  )
})

export default ScrollableContainer
