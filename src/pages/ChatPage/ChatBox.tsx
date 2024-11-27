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
      text: '모하세요',
      timestamp: '10:02 AM',
    },
    {
      id: 4,
      sender: 'other',
      text: '그냥있어요',
      timestamp: '10:03 AM',
    },
    { id: 5, sender: 'user', text: '안녕하세요!', timestamp: '10:03 AM' },
    {
      id: 6,
      sender: 'other',
      text: '안녕하세요! 반갑습니다.',
      timestamp: '10:04 AM',
    },
    {
      id: 7,
      sender: 'user',
      text: '모하세요?',
      timestamp: '10:05 AM',
    },
    {
      id: 8,
      sender: 'other',
      text: '그냥있어요!',
      timestamp: '10:06 AM',
    },
  ]

  return (
    <div className='flex flex-col h-[70vh] w-full mx-auto bg-white border shadow'>
      <div className='flex items-center justify-between bg-lightGrays px-4 py-2 border-b'>
        <div className='flex items-center gap-2'>
          <div className='rounded-full bg-gray-300 w-10 h-10'></div>
          <p className='font-semibold text-black'>채팅 상대 이름</p>
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
