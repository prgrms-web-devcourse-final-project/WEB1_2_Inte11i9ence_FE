import { planArray } from '../mockData'
import ScheduleBox from './ScheduleBox'

const SchedulePlan = () => {
  // 날짜별 중복 제거 및 정렬
  const sortedPlans = planArray
    .slice()
    .sort(
      (a, b) => new Date(a.planDate).getTime() - new Date(b.planDate).getTime(),
    )

  const uniqueDates = Array.from(
    new Set(sortedPlans.map((plan) => plan.planDate)),
  )
  return (
    <div className='p-4'>
      {uniqueDates.map((date) => (
        <div key={date}>
          <div className='flex rounded-lg my-2 bg-[#ecf4f9] w-fit'>
            <p className='p-1 font-bold'>{date}</p>
          </div>
          <div className='ml-4 '>
            {sortedPlans
              .filter((plan) => plan.planDate === date)
              .map((plan, idx) => (
                <ScheduleBox
                  key={idx}
                  regionName={plan.regionName}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SchedulePlan
