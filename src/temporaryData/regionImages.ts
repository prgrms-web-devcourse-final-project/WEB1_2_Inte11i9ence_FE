import SeoulImg from '@/assets/jpg/서울.jpg';
import BusanImg from '@/assets/jpg/부산.jpg';
import DaeguImg from '@/assets/jpg/대구.jpg';
import IncheonImg from '@/assets/jpg/인천.jpg';
import GwangjuImg from '@/assets/jpg/광주.jpg';
import DaejeonImg from '@/assets/jpg/대전.jpg';
import UlsanImg from '@/assets/jpg/울산.jpg';
import SejongImg from '@/assets/jpg/세종.jpg';
import GeonggiImg from '@/assets/jpg/경기도.jpg';
import ChungbukImg from '@/assets/jpg/충청북도.jpg';
import ChungnamImg from '@/assets/jpg/충청남도.jpg';
import JeonnamImg from '@/assets/jpg/전라남도.jpg';
import GeongbukImg from '@/assets/jpg/경상북도.jpg';
import GeongnamImg from '@/assets/jpg/경상남도.jpg';
import GangwonImg from '@/assets/jpg/강원도.jpg';
import JeonbukImg from '@/assets/jpg/전라북도.jpg';
import JejuImg from '@/assets/jpg/제주도.jpg';
// ... 다른 이미지 import

export const regionImages = {
    '강원도': GangwonImg,
    '경기도': GeonggiImg,
    '경상북도': GeongbukImg,
    '경상남도': GeongnamImg,
    '광주': GwangjuImg,
    '대구': DaeguImg,
    '대전': DaejeonImg,
    '부산': BusanImg,
    '서울': SeoulImg,
    '세종': SejongImg,
    '울산': UlsanImg,
    '인천': IncheonImg,
    '전라북도': JeonbukImg,
    '전라남도': JeonnamImg,
    '제주도': JejuImg,
    '충청북도': ChungbukImg,
    '충청남도': ChungnamImg,
} as const;