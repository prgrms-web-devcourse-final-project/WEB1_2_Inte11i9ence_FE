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
  //  useEffect(() => {
  //   let mounted = true;

  //   const getBestPosts = async () => {
  //     if (!mounted) {return};
  //     setIsLoading(true)
  //     setError(null)
  //     // 목 서버, 실제 서버로 수정 필요
  //     try {
  //     const response = await axios.get(
  //       'api/v1/posts'
  //       // 연결 확인한 목서버 주소, 요청 제한으로 인해 주석 처리
  //       // 'https://189bbcf2-b5c2-4dc4-8590-f889d9ed6579.mock.pstmn.io/api/v1/posts'
  //       )
  
  //     if(!response.data) {
  //         throw new Error('데이터 형식이 올바르지 않습니다.')
  //       }
  //       if (mounted) {
  //         const sortedPosts = response.data
  //           .sort((a: AllPostData, b: AllPostData) => b.likes - a.likes)
  //           .slice(0, 20);
  //         setBestPostsInAPI(sortedPosts);
  //       }

  //     }catch (error) {
  //       if (mounted) {
  //       console.log("bestPostsInAPI:", bestPostsInAPI)
  //       console.error('인기 포스트 조회 실패:', error)
  //       setError('인기 포스트 조회 실패')
  //       }
  //     } finally {
  //       if(mounted) {
  //       setIsLoading(false)
  //       }
  //     }
  //   }
  //   getBestPosts();
  //   return () => { mounted = false;}
  // }, [])

    const bestPosts = postData.sort((a,b) => b.likes - a.likes).slice(0, 20);
    return (
        <div className='flex flex-col items-center'>
            <div className='w-full'> 
                <div className='flex mb-20'> 
                    <span className='text-[1.5rem] font-bold mr-1'>금주의 인기 포스트</span>
                    <span className='text-[1.5rem] font-bold text-lightBlue'>TOP 20</span>
                </div>
                <div className='space-y-10'>
                {bestPosts.map((post) => (
                    <BestCardItem key={post.id} post={post} />))}
           </div>
        </div>
        </div>
    );
};

export default BestPage;