import { useState } from 'react'
import DropdownSelector from '@/components/DropdownSelector'

const PhotoAdd = () => {
  const [selectedView, setSelectedView] = useState('서울')
  const [selectedType, setSelectedType] = useState('인물')

  const options = [
    { value: '서울', label: '서울' },
    { value: '오사카', label: '오사카' },
  ]

  const typeOptions = [
    { value: '인물', label: '인물' },
    { value: '배경', label: '배경' },
  ]

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col flex-[4] relative gap-4'>
        <div>
          <div className='flex flex-col w-full mx-20 pr-10 gap-7 items-start'>
            <div className='flex gap-4'>
              <div className='h-[40px]  relative z-1000'>
                <DropdownSelector
                  options={options}
                  defaultValue='서울'
                  onChange={(selected) => setSelectedView(selected)}
                />
              </div>
              <div className='h-[40px]  relative z-1000'>
                <DropdownSelector
                  options={typeOptions}
                  defaultValue='인물'
                  onChange={(selected) => setSelectedType(selected)}
                />
              </div>
            </div>
            <p className='font-bold text-lg'>사진 2장을 선택해주세요</p>
            <div className='flex gap-8 justify-center w-[90%] h-[30vh] '>
              <div className='flex  align-center justify-center bg-lightGray w-[80%] rounded-lg '>
                <button className=' '>썸네일 사진 추가</button>
              </div>
              <div className='flex align-center justify-center bg-lightGray w-[80%] rounded-lg '>
                <button className=' '>썸네일 사진 추가</button>
              </div>
            </div>
            <p className='font-bold text-lg'>내용을 입력하세요</p>

            <textarea className='rounded-lg border w-[92%] py-3 focus:outline-none'></textarea>
          </div>
        </div>
      </div>
      <div className='flex gap-4 justify-center'>
        <button className='bg-darkBlue text-white text-sm py-2 px-2 rounded-lg '>
          나가기
        </button>
        <button className='bg-darkBlue text-white  text-sm py-2 px-2 rounded-lg '>
          발행하기
        </button>
      </div>
    </div>
  )
}
export default PhotoAdd
