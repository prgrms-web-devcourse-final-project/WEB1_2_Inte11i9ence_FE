import { Message } from '@/typings/chat'

export const formatTime = (createdAt: string) => {
  const date = new Date(createdAt)
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export const groupMessagesByDate = (messages: Message[]) => {
  const grouped: { [key: string]: Message[] } = {}
  messages.forEach((msg) => {
    const date = new Date(msg.createdAt)
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    if (!grouped[dateStr]) {
      grouped[dateStr] = []
    }
    grouped[dateStr].push(msg)
  })
  return grouped
}
