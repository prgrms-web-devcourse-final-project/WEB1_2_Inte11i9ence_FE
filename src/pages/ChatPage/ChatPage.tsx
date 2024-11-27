import defaultProfileImage from '@assets/png/default-profile-2.png'
import ChatBox from './ChatBox'
const ChatPage = () => {
  const chats = [
    {
      id: 1,
      title: '지역게시판의 어떤 어떤 이거 저거',
      nickname: '닉네임1',
    },
    { id: 2, title: '채팅방2', nickname: '닉네임2' },
    {
      id: 1,
      title: '지역게시판의 어떤 어떤 이거 저거',
      nickname: '닉네임1',
    },
    { id: 2, title: '채팅방2', nickname: '닉네임2' },
    {
      id: 1,
      title: '지역게시판의 어떤 어떤 이거 저거',
      nickname: '닉네임1',
    },
    { id: 2, title: '채팅방2', nickname: '닉네임2' },
    {
      id: 1,
      title: '지역게시판의 어떤 어떤 이거 저거',
      nickname: '닉네임1',
    },
    { id: 2, title: '채팅방2', nickname: '닉네임2' },
    {
      id: 1,
      title: '지역게시판의 어떤 어떤 이거 저거',
      nickname: '닉네임1',
    },
    { id: 2, title: '채팅방2', nickname: '닉네임2' },
    {
      id: 1,
      title: '지역게시판의 어떤 어떤 이거 저거',
      nickname: '닉네임1',
    },
    { id: 2, title: '채팅방2', nickname: '닉네임2' },
  ]
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='flex w-[80vw] h-[70vh] items-center justify-center gap-16'>
        <div className='flex flex-col flex-[4] h-full gap-6 justify-start items-start'>
          <div>
            <p>
              DM <span className='font-bold'>3</span>개
            </p>
          </div>
          <div className='flex flex-col gap-4 overflow-y-auto h-full w-full'>
            {chats.map((chat) => (
              <button
                key={chat.id}
                className='flex border-b pb-3  w-full'
              >
                <div className='w-8 h-8 rounded-full overflow-hidden'>
                  <img
                    src={defaultProfileImage}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                </div>{' '}
                <div className='ml-4'>
                  <p className='flex items-start text-sm font-bold'>
                    {chat.title}
                  </p>
                  <p className=' flex items-start text-xs text-darkGray truncate'>
                    {chat.nickname}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className='w-1 bg-lightGray h-full'></div>
        <div className='flex-[7]'>
          <ChatBox />
        </div>
      </div>
    </div>
  )
}
export default ChatPage
