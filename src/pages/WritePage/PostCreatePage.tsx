import React, { useState } from 'react';
import Out from '@/assets/png/Out.png';
import DropdownSelector from '@/components/DropdownSelector';
import RegionDropdown from '@/components/RegionDropdown';

type Category = '자유' | '지역' | '리뷰';

const PostCreatePage: React.FC = () => {
  // const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  // const [selectedRegion, setSelectedRegion] = useState<string | ''>('');
  const [rating, setRating] = useState<number | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [firstCategory, setFirstCategory] = useState('전체')
  const [secondCategory, setSecondCategory] = useState('지역 전체')
  const [isSecondCategoryOpen, setIsSecondCategoryOpen] = useState(false)

  // 지역 카테고리 목록
  // const regionOptions = ['서울', '부산', '대구', '광주'];

  // // 카테고리 선택 핸들러
  // const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCategory(e.target.value as Category);
  //   setSelectedRegion(''); // 지역 초기화
  //   setRating(null); // 별점 초기화
  // };

  // // 지역 선택 핸들러
  // const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedRegion(e.target.value);
  // };

  // 1번 드롭다운 change 이벤트 핸들러
  const handleCategory = (selected: string) => {
    setFirstCategory(selected);
    if(selected === '지역'){
      setIsSecondCategoryOpen(true);
    }
    if(selected !== '지역'){
      setIsSecondCategoryOpen(false);
    }
  }
  // 2번 드롭다운 change 이벤트 핸들러
  const handleRegionCategory = (selected: string) => {
    setSecondCategory(selected);
  }

  // 별점 클릭 핸들러
  const handleRatingClick = (newRating: number) => {
    setRating(newRating);
  };

  // 이미지 선택 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
    }
  };

  // 태그 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      if (!tags.includes(inputValue.trim())) {
        setTags((prevTags) => [...prevTags, inputValue.trim()]);
      }
      setInputValue(''); // 입력 초기화
    }
  };

  const removeTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const options = [
    { value: '전체', label: '전체' },
    // { value: '공지', label: '공지' },
    { value: '자유', label: '자유' },
    { value: '지역', label: '지역' },
    { value: '리뷰', label: '리뷰' },
]

const regionOptions = [
    { value: '지역 전체', label: '지역 전체' },
    { value: '강원도', label: '강원도' },
    { value: '경기도', label: '경기도' },
    { value: '경상남도', label: '경상남도' },
    { value: '경상북도', label: '경상북도' },
    { value: '광주', label: '광주' },
    { value: '대구', label: '대구' },
    { value: '대전', label: '대전' },
    { value: '부산', label: '부산' },
    { value: '서울', label: '서울' },
    { value: '세종', label: '세종' },
    { value: '울산', label: '울산' },
    { value: '인천', label: '인천' },
    { value: '전라남도', label: '전라남도' },
    { value: '전라북도', label: '전라북도' },
    { value: '제주도', label: '제주도' },
    { value: '충청남도', label: '충청남도' },
    { value: '충청북도', label: '충청북도' },
]

  return (
    <div className="p-4 w-[90%] mx-auto">
      {/* <h1 className="text-2xl font-bold mb-6">게시글 작성하기</h1> */}

      {/* 조건부 렌더링: 별점 에디터 */}
      {firstCategory === '리뷰' && (
        <div className="mb-4">
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= (rating || 0) ? 'text-yellow-500' : 'text-gray-400'
                }`}
                onClick={() => handleRatingClick(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 상단 드롭다운 섹션 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center">
        <div className='flex'>
                <div className='h-[40px] relative z-1000 mr-4'>
                    <DropdownSelector
                    options={options}
                    defaultValue={firstCategory}
                    onChange={handleCategory}
                    />
                </div>
                {/* 지역 카테고리 선택 시 상세 지역 선택 드롭다운 */}
                {isSecondCategoryOpen &&(
                    <RegionDropdown
                            options={regionOptions}
                            defaultValue={secondCategory}
                            onChange={handleRegionCategory}
                />)}
                </div>
          {/* <select
            id="category"
            className="border rounded px-3 py-2"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">카테고리</option>
            <option value="자유">자유</option>
            <option value="지역">지역</option>
            <option value="리뷰">리뷰</option>
          </select> */}
        </div>

        {/* {selectedCategory === '지역' && (
          <div className="flex items-center">
            <select
              id="region"
              className="border rounded px-3 py-2"
              value={selectedRegion}
              onChange={handleRegionChange}
            >
              <option value="">지역을 선택하세요</option>
              {regionOptions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        )} */}
      </div>

      <div className="mb-6">
        <input
          type="text"
          id="title"
          placeholder="제목"
          className="w-full text-3xl font-bold border-none focus:outline-none placeholder-gray-400"
        />
        <div className="border-b border-gray-400 mt-2"></div>
      </div>

      <div className="mb-2">
        <textarea
          id="content"
          className="w-full border rounded-lg px-3 py-2 h-96 shadow-lg resize-none"
          placeholder="내용을 입력하세요"
        />

        <div className="mt-10">
          <label htmlFor="image-upload" className="cursor-pointer bg-darkBlue font-bold shadow-md text-white px-4 py-2 rounded-lg">
            이미지 업로드
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />
{/* 1.버튼만들기 2. 버튼클릭시 메서드 연결3.메서드 생성 4.메서드 구현내용 presignedurl을 발급하는 api호출5.리스폰스 받아오기6.axios.put 5번의 리스폰스받아온 url로 s3에 업로드해보기*/}
        </div>

        {image && (
  <div className="relative mt-4 inline-block">
    <img
      src={URL.createObjectURL(image)}
      alt="Selected"
      className="max-w-xs border rounded-md border-0"
    />
    <button
      className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full "
      onClick={() => setImage(null)}
    >
      &times;
    </button>
  </div>
)}

        <div className="mt-10">
          <div className="my-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block text-gray-500 bg-blue-100 px-3 py-1 rounded-full text-sm mr-2 my-2 "
              >
                #{tag}
                <button onClick={() => removeTag(index)} className="ml-2 text-red-400">
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            id="tags"
            type="text"
            placeholder="# 태그를 입력하세요"
            className="w-full border rounded px-3 py-2 text-gray-600 focus:outline-none border-0"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>

      <div className="flex justify-between border-t-2 pt-6">
        <button className="hover:underline flex items-center">
          <img src={Out} alt="나가기버튼" className="w-5 h-5 mr-2" /> 나가기
        </button>
        <button
          className="bg-darkBlue font-bold shadow-md text-white px-4 py-2 rounded-lg"
          disabled={!firstCategory || (firstCategory === '지역' && !secondCategory)}
        >
          발행하기
        </button>
      </div>
    </div>
  );
};

export default PostCreatePage;
