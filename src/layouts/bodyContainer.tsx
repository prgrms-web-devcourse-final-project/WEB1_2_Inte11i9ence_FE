import React from 'react'
import '../index.css'

interface ContainerProps {
  children: React.ReactNode
}
const Container = ({ children }: ContainerProps) => {
  return <div className='max-w-screen-mg px-6 py-0 h-screen'>{children}</div>
}
export default Container
