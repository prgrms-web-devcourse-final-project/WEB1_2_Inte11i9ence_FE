import axios from 'axios'

export const createScheduleGroup = async (data: {
  memberId: number
  regionId: number | string
  title: string
  groupImgUrl: string
}) => {
  try {
    const response = await axios.post('/plan-group', data, {
      headers: {
        Authorization: `Bearer ACCESS_TOKEN`,
      },
    })
    return response.data
  } catch (error) {
    console.error('API 호출 오류:', error)
  }
}
