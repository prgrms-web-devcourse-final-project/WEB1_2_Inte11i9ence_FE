import React from 'react';
import { postData } from '@/temporaryData/allPostData';
import BestCardItem from '@/components/BestCardItem';
import { useEffect, useState } from 'react';
import { AllPostData } from '@/typings/post';
import axios from 'axios';

const BestPage = () => {

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
        'https://83c7c11d-0a32-4b7b-9db8-6f828abf0474.mock.pstmn.io/api/v1/posts')
  
      if(!response.data) {
          throw new Error('데이터 형식이 올바르지 않습니다.')
        }
        if (mounted) {
          const sortedPosts = response.data.posts
            .sort((a: AllPostData, b: AllPostData) => b.likes - a.likes)
            .slice(0, 20);
          setBestPostsInAPI(sortedPosts);
        }

      }catch (error) {
        if (mounted) {
        console.log("bestPostsInAPI:", bestPostsInAPI)
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

    // const bestPosts = postData.sort((a,b) => b.likes - a.likes).slice(0, 20);
    return (
        <div className='flex flex-col items-center'>
            <div className='w-[55rem]'> 
                <div className='flex mb-20'> 
                    <span className='text-[1.5rem] font-bold mr-1'>금주의 인기 포스트</span>
                    <span className='text-[1.5rem] font-bold text-lightBlue'>TOP 20</span>
                </div>
                <div className='space-y-10'>
                {bestPostsInAPI.map((post) => (
                    <BestCardItem key={post.id} post={post} />))}
           </div>
        </div>
        </div>
    );
};

export default BestPage;