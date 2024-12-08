import { Link } from 'react-router-dom'
import BestCardItem from '../../../components/BestCardItem'
import { postData } from '@/temporaryData/allPostData'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AllPostData } from '@/typings/post'
  
const BestCardList = () => {

  const [bestPostsInAPI, setBestPostsInAPI] = useState<AllPostData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

   // 인기 게시글 표시 위한 게시글 인기순 조회
   useEffect(() => {
    let mounted = true;

    const getBestPosts = async () => {
      if (!mounted) {return};
      setIsLoading(true)
      setError(null)
      // 목 서버, 실제 서버로 수정 필요
      try {
      const response = await axios.get(
        'https://www.skypedia.shop/api/v1/posts'
        // 연결 확인한 목서버 주소, 요청 제한으로 인해 주석 처리
        // 'https://189bbcf2-b5c2-4dc4-8590-f889d9ed6579.mock.pstmn.io/api/v1/posts'
      )
  
      if(!response.data) {
          throw new Error('데이터 형식이 올바르지 않습니다.')
        }
        if (mounted) {
          const sortedPosts = response.data
            .sort((a: AllPostData, b: AllPostData) => b.likes - a.likes)
            .slice(0, 3);
          setBestPostsInAPI(sortedPosts);
        }

      }catch (error) {
        if (mounted) {
        console.error('인기 포스트 조회 실패:', error)
        setError('인기 포스트 조회 실패')
        }
      } finally {
        if(mounted) {
        setIsLoading(false)
        }
      }
    }
    getBestPosts();
    return () => { mounted = false;}
  }, [])

  // const bestPosts = postData.sort((a, b) => b.likes - a.likes).slice(0, 3)
  
  return (
    <div className='flex flex-col w-full px-16'>
      <header className='flex justify-between items-center mb-4 px-10 w-full'>
        <h2 className='text-2xl font-bold'>금주의 인기 포스트</h2>
        <Link
          to='/bestpage'
          className='text-darkGray hover:text-black text-sm'
        >
          더보기
        </Link>
      </header>
      <div className='flex flex-col gap-12 my-8 mx-12 '>
        {bestPostsInAPI.map((post) => (
          <BestCardItem
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  )
}

export default BestCardList
