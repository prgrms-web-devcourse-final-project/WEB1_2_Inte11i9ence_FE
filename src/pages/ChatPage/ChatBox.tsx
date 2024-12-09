import './scroll.css'
const ChatBox = () => {
  const messages = [
    { id: 1, sender: 'user', text: '안녕하세요!', timestamp: '10:00 AM' },
    {
      id: 2,
      sender: 'other',
      text: '안녕하세요! 반갑습니다.',
      timestamp: '10:01 AM',
    },
    {
      id: 3,
      sender: 'user',
      text: '글 너무 잘 봤어요! 궁금한 게 있는데 1박 때 가신 식당 웨이팅이 있나요?',
      timestamp: '10:02 AM',
    },
    {
      id: 4,
      sender: 'other',
      text: '아 저는 3시에 가서 별로 없었는데 식사 시간 때에는 줄이 엄청 길다구 하네요🥲',
      timestamp: '10:03 AM',
    },
    { id: 5, sender: 'user', text: '아 그렇군요!!...', timestamp: '10:03 AM' },
    {
      id: 6,
      sender: 'other',
      text: '넵 근데 매장이 커서 줄이 금방금방 준다고 하니까 가보셔도 좋을 거 같아요 ㅎㅎ',
      timestamp: '10:04 AM',
    },
    {
      id: 7,
      sender: 'user',
      text: '우와 감사합니다! 매장이 넓은 줄은 몰랐네요!',
      timestamp: '10:05 AM',
    },
    {
      id: 8,
      sender: 'other',
      text: '꽤 넓어요! 음식도 맛있습니다 꼭 가보세요 강추합니다☺️',
      timestamp: '10:06 AM',
    },
  ]

  return (
    <div className='flex flex-col h-[78vh] mt-20 w-full mx-auto bg-white border shadow custom-scroll '>
      <div className='flex items-center justify-between bg-lightGrays px-4 py-2 border-b '>
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 rounded-full overflow-hidden '>
            <img
              src={
                'data:image/jpeg;base64,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'
              }
              alt='Profile'
              className='w-full h-full object-cover'
            />
          </div>{' '}
          <div className='flex w-full justify-between '>
            <p className='font-semibold text-black'>miriring</p>
            <p className='font-semibold text-black'>
              | 제주도의 숨은 명소 7곳🍊, 꼭 가봐야 할 여행
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 p-4 gap-4 overflow-y-auto'>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div>
              <div
                className={` px-4 py-2 rounded-lg text-[13px] ${
                  msg.sender === 'user'
                    ? 'bg-darkBlue text-white'
                    : 'bg-gray-200 text-black'
                }`}
              >
                <p>{msg.text}</p>
              </div>
              <span
                className={`text-xs mt-1 block ${
                  msg.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className='flex items-center gap-2 p-4 border-t bg-gray-50'>
        <input
          type='text'
          placeholder='메시지를 입력하세요...'
          className='flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue'
        />
        <button className='px-4 py-2 bg-darkBlue text-white rounded-lg hover:bg-blue-600'>
          전송
        </button>
      </div>
    </div>
  )
}

export default ChatBox
