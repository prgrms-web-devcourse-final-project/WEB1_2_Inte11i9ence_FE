import React from 'react';
import '../index.css';

interface ContainerProps {
  children: React.ReactNode
  pageName?: string
}
const Container = ({ children }: ContainerProps) => {
  return (
    <div
      className='max-w-screen-mg p-4 h-screen'
    >
      {children}
    </div>
  )
}
export default Container