import RegionData from "@/typings/region";
import seoulImg from '@/assets/png/jpg/regionImg1_temp.jpg';
import busanImg from '@/assets/png/jpg/regionImg2_temp.jpg';
import incheonImg from '@/assets/png/jpg/regionImg3_temp.jpg';
import jejuImg from '@/assets/png/jpg/regionImg4_temp.jpg';

// path와 thumbnail은 임시로 넣어둔 데이터입니다. (현재 API 명세서에 없음)
export const regionData: RegionData[] = [
  { id: 1, name: '서울', path: '/region/seoul', thumbnail: seoulImg },
  { id: 2, name: '부산', path: '/region/busan', thumbnail: busanImg },
  { id: 3, name: '인천', path: '/region/incheon', thumbnail: incheonImg },
  { id: 4, name: '제주', path: '/region/jeju', thumbnail: jejuImg },
  { id: 5, name: '경주', path: '/region/gyeongju', thumbnail: seoulImg },
  { id: 6, name: '대전', path: '/region/daejeon', thumbnail: busanImg },
  { id: 7, name: '수원', path: '/region/suwon', thumbnail: incheonImg },
  { id: 8, name: '울산', path: '/region/Ulsan', thumbnail: jejuImg },
  { id: 9, name: '강릉', path: '/region/gangneung', thumbnail: seoulImg },
  { id: 10, name: '광주', path: '/region/gwangju', thumbnail: busanImg }
];