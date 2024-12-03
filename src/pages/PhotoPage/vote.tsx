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

interface VoteResultsProps {
  voteResults: {
    photo1Votes: number
    photo2Votes: number
  }
}

const VoteResults = ({ voteResults }: VoteResultsProps) => {
  // 전체 투표 수
  const totalVotes = voteResults.photo1Votes + voteResults.photo2Votes

  // 각 사진의 퍼센트 계산
  const votes = [
    {
      label: '첫 번째 사진',
      percentage:
        totalVotes > 0
          ? Math.round((voteResults.photo1Votes / totalVotes) * 100)
          : 0,
      color: 'bg-darkBlue',
    },
    {
      label: '두 번째 사진',
      percentage:
        totalVotes > 0
          ? Math.round((voteResults.photo2Votes / totalVotes) * 100)
          : 0,
      color: 'bg-blue-600',
    },
  ]

  return (
    <div className='max-w-md mx-auto bg-white rounded-lg p-4'>
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
