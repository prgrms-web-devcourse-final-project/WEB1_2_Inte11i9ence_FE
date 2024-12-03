import RegionData from "@/typings/region";
import GangwonImg from '@/assets/jpg/강원도.jpg';
import GeonggiImg from '@/assets/jpg/경기도.jpg';
import GeongbukImg from '@/assets/jpg/경상북도.jpg';
import GeongnamImg from '@/assets/jpg/경상남도.jpg';
import GwangjuImg from '@/assets/jpg/광주.jpg';
import DaeguImg from '@/assets/jpg/대구.jpg';
import DaejeonImg from '@/assets/jpg/대전.jpg';
import BusanImg from '@/assets/jpg/부산.jpg';
import SeoulImg from '@/assets/jpg/서울.jpg';
import SejongImg from '@/assets/jpg/세종.jpg';
import UlsanImg from '@/assets/jpg/울산.jpg';
import IncheonImg from '@/assets/jpg/인천.jpg';
import JeonbukImg from '@/assets/jpg/전라북도.jpg';
import JeonnamImg from '@/assets/jpg/전라남도.jpg';
import JejuImg from '@/assets/jpg/제주도.jpg';
import ChungbukImg from '@/assets/jpg/충청북도.jpg';
import ChungnamImg from '@/assets/jpg/충청남도.jpg';

// path와 thumbnail은 임시로 넣어둔 데이터입니다. (현재 API 명세서에 없음)
export const regionData: RegionData[] = [
  { id: 1, name: '강원도', path: '/region', thumbnail: GangwonImg },
  { id: 2, name: '경기도', path: '/region', thumbnail: GeonggiImg  },
  { id: 3, name: '경상남도', path: '/region', thumbnail: GeongnamImg },
  { id: 4, name: '경상북도', path: '/region', thumbnail:  GeongbukImg },
  { id: 5, name: '광주', path: '/region', thumbnail: GwangjuImg },
  { id: 6, name: '대구', path: '/region', thumbnail: DaeguImg },
  { id: 7, name: '대전', path: '/region', thumbnail: DaejeonImg },
  { id: 8, name: '부산', path: '/region', thumbnail: BusanImg },
  { id: 9, name: '서울', path: '/region', thumbnail: SeoulImg },
  { id: 10, name: '세종', path: '/region', thumbnail: SejongImg },
  { id: 11, name: '울산', path: '/region', thumbnail: UlsanImg },
  { id: 12, name: '인천', path: '/region', thumbnail: IncheonImg },
  { id: 13, name: '전라남도', path: '/region', thumbnail: JeonnamImg },
  { id: 14, name: '전라북도', path: '/region', thumbnail: JeonbukImg },
  { id: 15, name: '제주도', path: '/region', thumbnail: JejuImg },
  { id: 16, name: '충청남도', path: '/region', thumbnail: ChungnamImg },
  { id: 17, name: '충청북도', path: '/region', thumbnail: ChungbukImg },
];