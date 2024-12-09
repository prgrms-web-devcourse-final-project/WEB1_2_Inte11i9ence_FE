interface VoteBarProps {
  label: string
  percentage: number
  color: string
}
const VoteBar = ({ label, percentage, color }: VoteBarProps) => {
  return (
    <div className='w-full my-2'>
      {/* 항목 레이블 */}
      <div className='flex justify-between items-center mb-1'>
        <span className='text-black text-xs font-bold'>{label}</span>
        <span className='text-gray-500 text-sm'>{percentage}%</span>
      </div>
      {/* Progress Bar */}
      <div className='w-full h-4 bg-gray-200 rounded-full overflow-hidden'>
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
const VoteResults = () => {
  const votes = [
    { label: '첫 번째 사진', percentage: 60, color: 'bg-darkBlue' },
    { label: '두 번째 사진', percentage: 40, color: 'bg-darkBlue' },
  ]

  return (
    <div className='max-w-md mx-auto  bg-white rounded-lg'>
      {votes.map((vote, index) => (
        <VoteBar
          key={index}
          label={vote.label}
          percentage={vote.percentage}
          color={vote.color}
        />
      ))}
    </div>
  )
}

export default VoteResults
