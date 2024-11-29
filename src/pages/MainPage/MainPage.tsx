import { useState, useRef, useEffect } from 'react';
import RegionCardList from '@/pages/MainPage/components/RegionCardList';
import BestCardList from '@/pages/MainPage/components/BestCardList';
import SearchIcon from '@/assets/svg/search.svg?react';

const MainPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [storedSearches, setStoredSearches] = useState<string[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // 로컬스토리지에서 검색어 불러오기
    useEffect(() => {
        const savedSearches = localStorage.getItem('storedSearches');
        if (savedSearches) {
            setStoredSearches(JSON.parse(savedSearches));
        }
    }, []);

    // 모달창 외부 클릭 시 모달창 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // 렌더링된 후 모달창 외부를 클릭했을 때 모달창 닫기
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // 검색창 제출 핸들러
    const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            return
        };
        // 중복 검색어 제거 및 최근 검색어 5개로 제한
        const newSearches = [
            searchTerm,
            ...storedSearches.filter((search) => search !== searchTerm)
        ].slice(0, 5);

        // 로컬스토리지에 검색어 저장
        setStoredSearches(newSearches);
        localStorage.setItem('storedSearches', JSON.stringify(newSearches));
        setSearchTerm('');
        // setIsModalOpen(false);
    };

    // 검색어 삭제
    const removeSearchTerm = (termToRemove: string) => {
        const newSearches = storedSearches.filter((term) => term !== termToRemove);
        setStoredSearches(newSearches);
        localStorage.setItem('storedSearches', JSON.stringify(newSearches));
    };

    // 최근 검색어 클릭 시 검색어 입력창에 검색어 입력
    const storedTermSearch = (term: string) => {
        setSearchTerm(term);
        if (searchInputRef.current) {
            searchInputRef.current.value = term;
        }
    };

    // 현재 날짜 반환
    const currentDate = () => {
        const now = new Date();
        return `${now.toLocaleDateString()} ${now.getHours()}시 기준`;
      };

    return (
        <div className="h-full">
            <div className="mx-auto px-4 flex flex-col items-center">
                <form onSubmit={searchHandler} className="w-[55rem]">
                    <div ref={modalRef} className='relative flex items-center'>
                        <input 
                            ref={searchInputRef}
                            type="text" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full h-14 my-12 pl-6 pr-12 border border-darkGray rounded-3xl' 
                            placeholder='검색어를 입력하세요'
                            onClick={() => setIsModalOpen(true)}
                        />
                        <button 
                            type="submit"
                            className='absolute right-4 top-1/2 -translate-y-1/2'
                        >
                            <SearchIcon className='w-7 h-6' />
                        </button>

                        {isModalOpen && (
                            <div className="absolute top-[8rem] w-full bg-white rounded-3xl shadow-2xl p-4 z-50">
                                <div className="flex flex-wrap gap-2">
                                    {storedSearches.map((keyword, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => storedTermSearch(keyword)}
                                            className="flex items-center bg-lightGray rounded-3xl px-4 py-2 cursor-pointer"
                                        >
                                            <span className="mr-2">{keyword}</span>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeSearchTerm(keyword);
                                                }}
                                                className="text-darkGray hover:text-black"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {/* 추천/인기 검색어 헤더 */}
                                <div className="flex justify-around items-center my-8">
                                    <div className='flex flex-col'>
                                    <span className="text-lg font-bold mb-4">추천 여행지</span>
                                    <div className="flex flex-col ">
                                        <div className='my-1'>➡ 추천 여행지 1</div>
                                        <div className='my-1'>➡ 추천 여행지 2</div>
                                        <div className='my-1'>➡ 추천 여행지 3</div>
                                        <div className='my-1'>➡ 추천 여행지 4</div>
                                        <div className='my-1'>➡ 추천 여행지 5</div>
                                    </div>
                                    </div>
                                    <div className='flex flex-col'>
                                    <div className="flex items-center space-x-2 mb-8">
                                        <span className="text-lg font-bold ">인기 검색어</span>
                                        <span className="text-xs text-darkGray">
                                        {currentDate()}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className='my-1'>1 인기 검색어</div>
                                        <div className='my-1'>2 인기 검색어</div>
                                        <div className='my-1'>3 인기 검색어</div>
                                        <div className='my-1'>4 인기 검색어</div>
                                        <div className='my-1'>5 인기 검색어</div>
                                    </div>
                                    </div>
                                </div>
                                {/* 검색 결과 없음 메시지 */}
                                {/* <div className="flex flex-col items-center justify-center">
                                    <span className="text-darkGray">
                                        검색 결과가 없습니다.
                                    </span>
                                </div> */}
                            </div>
                        )}
                    </div>
                </form>
                <RegionCardList />
                <BestCardList/>
            </div>
        </div>
    );
};

export default MainPage;