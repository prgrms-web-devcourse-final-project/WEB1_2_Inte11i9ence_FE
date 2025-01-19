import { AllPostData } from "../typings/post"
import defaultImg from "../assets/png/default-profile-2.png"
import profile from "../assets/png/Profile.png"
import photo1 from "../assets/jpg/photoUrl_1.jpg"
import photo2 from "../assets/jpg/photoUrl_2.jpg"
import photo3 from "../assets/jpg/photoUrl_3.jpg"
import photo4 from "../assets/jpg/photoUrl_4.jpg"
import photo5 from "../assets/jpg/photoUrl_5.jpg"
import photo6 from "../assets/jpg/photoUrl_6.jpg"
import photo7 from "../assets/jpg/photoUrl_7.jpg"
import photo8 from "../assets/jpg/photoUrl_8.jpg"
import defaultProfileImage from '@/assets/png/default-profile-2.png';

export const commentData = [
    {author: {
        username: "Jane Doe",
        profileUrl: defaultProfileImage,
      },
      time: "1시간 전",
      content: "사진이 정말 예뻐서 방문하고 싶어지네요! 다음 여행에 참고해 볼게요 😊",
    },
    {
      author: {
        username: "거북이",
        profileUrl: defaultProfileImage,
      },
      time: "2시간 전",
      content: "행복한 여행을 즐기신 것 같아 기분이 좋네요!",
    },
    
   ]

export
 const postData: AllPostData[] = [

       // "전체 게시글 조회" 데이터
        {
        id: 1,
        title: "제주 여행 후기 🍊",
        content:"제주도 여행 후기입니다. 저는 지난 주에 제주도 여행을 다녀왔어요! 맛있는 음식도 많이 먹고 정말 행복했던 제주여행이었는데요 가본 곳 중 가장 좋았던 곳은 금오름이였습니다 정말 멋진 곳이더라고요! 이번 여행 중 가장 맛있게 메뉴는 흑돼지 같아요! 유명한 이유를 알겠더라고요 ㅎㅎ 다른 분들도 제주도 가면 드셔보세요!",
        photoUrl: photo8,
        likes: 274,
        category: "제주도",
        author: {
        username: "traveler",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2024-12-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 2,
        title: "2박 3일 충청북도 여행 후기",
        content: "충청북도로 여행 다녀왔어요! 충청북도에서 무엇을 기대하게 될지 잘 몰랐는데 알고보니 숨은 보석이더군요! 단양은 도담삼봉의 절경이 가장 아름다웠고, 그곳에서 보트를 타는 것은 너무나 편안했습니다. 충주호는 물놀이하기 딱 좋은 곳인데, 결국은 고요한 분위기만 즐기게 됐어요. 산 속에 자리잡은 구인사는 참으로 차분한 느낌을 주었다. 현지 인삼 요리도 먹어봤는데 놀라울 정도로 맛있었어요!",
        photoUrl: photo1,
        likes: 220,
        category: "충청북도",
        author: {
        username: "수지",
        profileUrl: profile,
        },
        views: 100,
        postedAt: "2024-11-27",
        replies: 2,
        comments: commentData
    },
    {
        id: 3,
        title: "부산 여행 🌊",
        content: "해운대에서 즐거운 시간 보냈어요! 부산 정말 좋았어요~ 해운대 해수욕장은 휴식을 취하기 딱 좋았고, 자갈치시장의 해산물은 정말 환상적이었습니다. 감천문화마을 산책을 좋아했는데, 색감과 벽화가 너무 창의적이었어요. 바다 옆에 있는 해동용궁사는 참 평화로운 느낌을 줍니다. 부산은 해변, 음식, 문화가 어우러져 꼭 방문해야 할 도시입니다.",
        photoUrl: photo8,
        likes: 230,
        category: "부산",
        author: {
        username: "이코딩",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2021-09-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 4,
        title: "여수 밤바다 여행",
        content: "여수 밤바다 다녀왔습니다~! 여수를 중심으로 전라남도 여행을 다녀왔는데 전라남도는 평화로운 탈출구처럼 느껴졌어요. 순천만은 너무 아름다웠고, 특히 해질녘의 습지는 더욱 아름다웠습니다. 보성 녹차밭은 직접 보니 더 예뻤어요. 그곳에서 녹차 아이스크림이 제일 맛있었어요! 여수에서는 바다를 따라 낭만적인 밤 산책을 하고 맛있는 해산물을 맛보았습니다. 이 지역은 여유로운 분위기와 자연의 아름다움을 모두 담고 있습니다.",
        photoUrl: photo8,
        likes: 35,
        category: "리뷰",
        rating: 4,
        author: {
        username: "박코딩",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2023-09-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 5,
        title: "국내에서 여행 갈만한 곳 추천해주세요!",
        content: "유명한 국내 여행지는 대부분 한번씩 가 봤는데, 숨겨진 명소가 있는 여행지가 있을까요 전 아름다운 자연이 있는 지역을 좋아해요! 그런 여행지를 아시는 분이 있다면 추천 부탁드려요! 😊",
        photoUrl: photo1,
        likes: 43,
        category: "자유",
        author: {
            "username": "한코딩",
            "profileUrl": defaultImg
        },
        views: 45,
        postedAt: "2022-04-01",
        replies: 2,

        comments: commentData   
    },
    {
        id: 6,
        title: "충청남도 여행",
        content: "충청남도 여행 후기! 충청남도는 상쾌한 휴양지 같았어요. 태안에 갯벌을 갔는데, 조개잡이가 너무 재밌었어요! 보령의 머드축제는 어찌보면 엉망이었다. 공주의 공산성은 매혹적이었고, 정상에서 바라보는 경치는 하이킹할 가치가 충분했다. 현지 시장에서 공수한 신선한 해산물은 잊을 수 없습니다. 재미와 휴식을 동시에 즐기고 싶다면 이곳이 바로 이곳입니다.",
        photoUrl: photo1,
        likes: 22,
        category: "충청남도",
        author: {
        username: "김코딩",
        profileUrl: defaultImg,
        },
        views: 68,
        postedAt: "2024-09-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 7,
        title: "전라북도 여행",
        content: "전라북도 여행 다녀왔어요! 전라북도 전주한옥마을은 마치 동화책 속에 들어온 듯한 곳이었어요. 저는 전통 가옥을 돌아다니며 그 고향의 비빔밥을 먹어보는 것을 즐겼어요. 너무 맛있었어요! 내장산국립공원의 가을은 온통 붉은색과 황금색으로 물든 단풍으로 아름다웠습니다. 하루의 완벽한 마무리였던 현지 막걸리를 마시며 마지막을 즐겼네요. 이 지역은 정말 아늑하고 환영받는 분위기를 갖고 있습니다.",
        photoUrl: photo1,
        likes: 35,
        category: "전라북도",
        author: {
        username: "박코딩",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2021-09-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 8,
        title: "경상북도 여행",
        content: "경상북도 여행 후기입니다. 경상북도 경주를 방문하면 마치 역사책 속에 사는 듯한 느낌이 들었습니다. 고대 신라 유물이 곳곳에 있었습니다! 불국사와 석굴암은 경이로움을 자아냈습니다. 시간을 거슬러온 듯한 안동 하회마을도 둘러보았습니다. 아 그리고 안동찜닭도 매콤하고 고소해서 만족스럽습니다. 역사와 음식을 좋아한다면 이 지역에는 즐길 거리가 너무 많습니다.",
        photoUrl: photo4,
        likes: 41,
        category: "경상북도",
        author: {
        username: "Sam Kim",
        profileUrl: defaultImg,
        },
        views: 97,
        postedAt: "2023-04-05",
        replies: 2,
        comments: commentData
    },
    {
        id: 9,
        title: "경상남도 여행 ",
        content: "안녕하세요, 이번에는 경상남도 여행 다녀왔어요! 경상남도는 재미와 아름다움이 공존하는 곳이었습니다. 통영의 해안 풍경은 정말 아름다웠다. 한국의 나폴리라고 해도 과언이 아니다. 벚꽃 축제를 위해 진해에도 갔는데 마치 핑크 원더랜드를 걷는 것 같았어요. 신선한 해산물을 맛보지 않고는 떠날 수가 없었어요. 이 지역은 휴식과 문화가 완벽하게 조화를 이루는 곳처럼 느껴졌습니다.",
        photoUrl: photo2,
        likes: 37,
        category: "경상남도",
        author: {
        username: "Mark Lee",
        profileUrl: defaultImg,
        },
        views: 36,
        postedAt: "2021-07-15",    
        replies: 2,
        comments: commentData
    },
    {
        id: 10,
        title: "바다 풍경이 아름다웠던 울산 여행 후기 🌊",
        content: "저번 주 울산으로 여행을 다녀왔습니다. 울산은 단순한 산업 도시 그 이상이었습니다. 숨겨진 보석이 가득했습니다! 대왕암공원은 해안경관이 가장 아름다웠고, 태화강 대나무숲을 걷는 것은 너무나 평화로웠다. 고래박물관은 정말 멋졌고 한국의 해양사에 대해 많은 것을 가르쳐주었습니다. 이곳의 신선한 해산물은 최고 수준이었습니다. 울산은 산업과 자연이 놀라울 정도로 혼합된 곳입니다.",
        photoUrl: photo8,
        likes: 26,
        category: "울산",
        author: {
        username: "김코딩",
        profileUrl: defaultImg,
        },
        views: 48,
        postedAt: "2021-07-15",   
        replies: 2,
        comments: commentData
    },
    {
        id: 11,
        title: "여름 제주도 2박 3일 여행 후기 🍊🌊",
        content: "제주도로 2박 3일 여행을 다녀왔어요. 역시 제주도는 정말 아름다운 곳이네요. 제주도의 자연 풍경은 정말 멋있었고, 특히 한라산은 정말 아름다웠어요. 제주도의 음식은 정말 맛있었어요. 특히 감귤과 흑돼지! 제주도의 바다는 정말 아름다웠고, 현지 사람들도 정말 친절했어요. 제주도는 정말 좋은 곳이었어요. 다음에 또 방문하고 싶은 곳이에요!" ,
        photoUrl: photo8,
        likes: 100,
        category: "제주도",
        author: {
        username: "김코딩",
        profileUrl: defaultImg,
        },
        views: 75,
        postedAt: "2021-07-15",
        replies: 2,
        comments: commentData
    },
    {
        id: 12,
        title: "인천 당일치기 여행 후기 | 센트럴파크 | 차이나타운 | 월미도",
        content: "첫 인천 여행 다녀왔어요! 인천은 완벽한 당일치기 여행이었습니다! 차이나타운에서 시작했는데 그곳의 퓨전음식이 참 독특했어요. 송도의 현대적인 스카이라인과 센트럴파크는 미래지향적이었습니다. 카누도 타보았어요. 월미도는 해산물과 놀이기구를 즐기며 여유로운 저녁을 보내기에 좋은 곳이었습니다. 인천에는 모두를 위한 무언가가 있습니다.",
        photoUrl: photo2,
        likes: 20,
        category: "리뷰",
        rating: 5,
        author: {
        username: "여행러",
        profileUrl: defaultImg,
        },
        views: 99,
        postedAt: "2024-11-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 13,
        title: "세종 갈만한 곳 추천 | 세종호수공원 | 국립도서관 | 농산물 직거래 장터",
        content: "세종은 참 새롭고 달라요! 일반적인 관광지는 아니지만 세종호수공원은 자전거 타기에 너무 평화로웠습니다. 국립도서관은 규모가 크고 현대적이어서 문화 중심지와 같습니다. 동네 농산물 직거래 장터에서 신선한 농산물을 사왔는데 맛있었어요. 세종시는 한국의 미래를 실제로 볼 수 있는 곳임에 틀림없습니다.",
        photoUrl: photo2,
        likes: 50,
        category: "세종",
        author: {
        username: "최코딩",
        profileUrl: defaultImg,
        },
        views: 42,
        postedAt: "2021-09-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 14,
        title: "대전 여행 후기 | Expo Science Park | 유성온천 | 계족산 맨발길",
        content: "대전 다녀왔습니다~! 대전은 과학과 자연이 어우러진 느낌이었습니다. Expo Science Park는 특히 기술 애호가들에게 매우 멋진 곳이었습니다. 유성온천은 긴 하루를 보낸 후 휴식을 취하기에 완벽한 곳이었습니다. 매콤한 닭발구이도 먹어봤는데 약간 톡 쏘는 걸 좋아하시면 너무 좋아요. 다음 날 계족산 맨발길도 다녀왔는데 독특하고 상쾌했어요. 대전은 학습과 재미가 혼합된 곳입니다.",
        photoUrl: photo3,
        likes: 55,
        category: "대전",
        author: {
        username: "김코딩",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2021-09-04",
        replies: 2,
        comments: commentData
    },
    {
        id: 15,
        title: "대전 빵투어 하고 왔어요! 🍞",
        content: "얼마 전에 대전 근처에 갈 일이 있어 출장 겸 대전 여행도 하고 왔어요. 대전의 성심당 유명하잖아요, 안 가볼 수 없죠. 성심당에서 먹는 빵은 정말 맛있었어요. 튀김소보로가 유명하던데 먹어보니 왜 유명한지 알겠더라구요~ 가족들 것도 여러 개 구매해서 집에 가져갔는데 많이 좋아하네요 ㅎㅎ 대전의 유성온천도 방문했는데 정말 편안했어요. 계족산 뷰 숙소에서 묵었는데 정말 아름다웠구요. 대전은 정말 좋은 곳이었어요. 다음에 또 방문하고 싶은 곳이에요! 또 빵 사러 오고 싶네요 ㅎㅎ",
        photoUrl: photo2,
        likes: 101,
        category: "대전",
        author: {
        username: "김코딩",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2021-09-05",
        replies: 2,
        comments: commentData
    },
    {
        id: 16,
        title: "경상남도 여행",
        content: "경상남도는 재미와 아름다움이 공존하는 곳이었습니다. 통영의 해안 풍경은 정말 아름다웠다. 한국의 나폴리라고 해도 과언이 아니다. 벚꽃 축제를 위해 진해에도 갔는데 마치 핑크 원더랜드를 걷는 것 같았어요. 신선한 해산물을 맛보지 않고는 떠날 수가 없었어요. 이 지역은 휴식과 문화가 완벽하게 조화를 이루는 곳처럼 느껴졌습니다.",
        photoUrl: photo3,
        likes: 36,
        category: "경상남도",
        author: {
        username: "edward",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2024-04-23",
        replies: 2,
        comments: commentData
    },
    {
        id: 17,
        title: "광주 여행 다녀왔어요!",
        content: "광주는 예술과 역사의 도시였습니다. 5·18 기념관은 감동적이었고, 한국의 민주화 여정에 감사하게 되었습니다. 국립아시아문화전당에는 놀라운 전시물이 있었고, 현지 음식 장면은 잊을 수 없었습니다. 이곳에서 내 인생 최고의 김치를 맛본 것 같습니다. 무등산 국립공원에서의 하이킹은 여행을 마무리하는 완벽한 방법이었습니다. 광주는 참 활기차고 의미가 깊습니다.",
        photoUrl: photo3,
        likes: 37,
        category: "광주",
        author: {
        username: "Alex Kim",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2024-09-14",
        replies: 2,
        comments: commentData
    },
    {
        id: 18,
        title: "경기도 북부 쪽 갈 것 같은데 추천 좀 해주세요!",
        content: "경기도 북부 쪽 갈 것 같은데 갈 만한 곳 있을까요 근처에 갈 만한 곳이나 볼거리 있으면 추천 좀 해주세요! 맛집도 부탁드려요 ㅎㅎ 감사합니다.",
        photoUrl: photo2,
        likes: 45,
        category: "경기도",
        author: {
        username: "김코딩",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2021-09-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 19,
        title: "경기도에서 즐긴 하루",
        content: "경기도 수원 화성을 둘러봤는데, 유네스코 세계문화유산인 만큼 정말 멋지더라고요. 성벽을 따라 걸으면서 사진도 많이 찍고 역사도 배웠어요. 오후에는 에버랜드에 가서 놀이기구도 타고 퍼레이드를 보며 즐거운 시간을 보냈어요. 경기도는 정말 다양한 즐길 거리가 있는 곳 같아요.",
        photoUrl: photo4,
        likes: 45,
        category: "경기도",
        author: {
            "username": "olivia",
            "profileUrl": defaultImg
        },
        views: 92,
        postedAt: "2024-02-27",
        replies: 5,

comments: commentData    },
    {
        id: 20,
        title: "강릉 여행 🌊",
        content: "첫 한국 여행에서 아름다운 설경을 보기 위해 도착하자마자 강원도로 향했습니다. 강원도는 자연의 아름다움에 매료되었습니다. 설악산 국립공원은 숨이 막힐 정도로 아름다웠습니다. 하이킹을 하면서 사진 촬영을 멈출 수가 없었습니다. 속초해수욕장은 여행 후 휴식을 취하기에 완벽한 장소였습니다. 춘천의 명물 닭갈비도 먹어봤는데, 제가 새롭게 좋아하는 요리라고 말씀드리고 싶습니다. 남이섬은 나무가 늘어선 길이 너무나 평화롭고 낭만적이었습니다. 겨울에 스키장으로 다시 돌아오고 싶어요.",
        photoUrl: photo3,
        likes: 50,
        category: "강원도",
        author: {
        username: "drake",
        profileUrl: defaultImg,
        },
        views: 78,
        postedAt: "2024-01-24",
        replies: 2,
        comments: commentData
    },
    {
        id: 21,
        title: "대구 여행 후기 | 동화사 | 서문시장 | 동성로",
        content: "대구 처음 방문했는데, 대구의 매력에 놀랐습니다. 동화사에서 시작했는데 거대한 불상이 정말 대단했어요. 서문시장에는 맛있는 음식이 가득했어요. 칼국수도 먹을 수가 없었어요! 활기가 넘치는 동성로 패션거리도 탐방해 봤습니다. 대구는 전통과 현대적인 도시 분위기가 잘 조화되어 있습니다. 다음에 또 방문하고 싶어요!",
        photoUrl: photo3,
        likes: 26,
        category: "대구",
        author: {
        username: "김코딩",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2024-08-04",
        replies: 2,
        comments: commentData
    },
    {
        id: 22,
        title: "서울 여행 하고 왔어요!",
        content: "서울 여행 즐기고 왔습니다! 역시 서울은 한국의 심장부네요. 저는 시간을 거슬러 올라간 듯한 기분으로 웅장한 경복궁을 거닐다가 진지한 쇼핑과 내 인생 최고의 떡볶이를 먹기 위해 명동으로 달려갔습니다. 너무 맛있었어요 ㅎㅎ 밤에 N서울타워에 올라갔는데 와~ 도시의 불빛이 환상적이었어요. 밤에는 홍대 에너지와 음악이 너무 많아요! 서울은 옛것과 새것이 완벽하게 혼합되어 있습니다. 다음에 또 방문하고 싶어요!",
        photoUrl: photo7,
        likes: 26,
        category: "서울",
        author: {
        username: "김코딩",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2024-09-22",
        replies: 2,
        comments: commentData
    },
    {
        id: 23,
        title: "부산 바다 또 가고 싶네요",
        content: "부산에서 며칠을 지냈는데 벌써 해변이 그리워지네요. 해운대는 휴식을 취하기에 완벽한 곳이지만, 밤의 광안리 해수욕장은 다리에 불이 모두 켜져서 쇼를 훔친 것 같아요. 감천문화마을은 다채롭고 재미있었고, 자갈치시장에는 가장 신선한 해산물이 있었습니다. 부산은 탐험하기에 정말 차갑고 재미있는 도시입니다.",
        photoUrl: photo8,
        likes: 26,
        category: "부산",
        author: {
        username: "수지",
        profileUrl: profile,
        },
        views: 100,
        postedAt: "2024-10-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 24,
        title: "충청북도 여행 다녀왔는데, 너무 좋았어요!",
        content: "충청북도에 이렇게 볼거리가 많은 줄 누가 알았겠어요 충주호수에서 배를 탔는데, 경치가 정말 환상적이었어요. 단양은 훨씬 더 좋았습니다. 탐험할 수 있는 멋진 동굴이 너무 많고, 강 절벽이 정말 아름답습니다. 현지 식당에서 인삼삼계탕을 먹어봤는데 의외로 맛있었어요. 방문하기에 너무나 평화롭고 과소평가된 지역입니다.",
        photoUrl: photo4,
        likes: 26,
        category: "리뷰",
        rating: 4.5,
        author: {
        username: "김코딩",
        profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2021-09-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 25,
        title: "서울에 크리스마스 시즌에 가면 좋은 곳 있을까요",
        content: "크리스마스 쯤 서울에 방문하는데, 크리스마스 시즌에 가면 좋은 곳 있을까요 크리스마스 분위기를 느낄 수 있는 곳이면 좋겠어요. 추천 부탁드립니다!",
        photoUrl: photo6,
        likes: 26,
        category: "자유",
        author: {
        username: "수지",
        profileUrl: profile,
        },
        views: 100,
        postedAt: "2024-12-01",
        replies: 2,
        comments: commentData
    },
    {
        id: 26,
        title: "인천 송도에서 만난 현대적 도시",
        content: "인천 송도에서 센트럴파크를 산책했는데, 현대적인 건물들과 자연이 어우러져서 정말 인상 깊었어요. 특히 야경이 너무 아름다웠고, 공원에서 배를 타며 여유를 즐겼어요. 송도는 도시적인 매력을 느끼기에 딱 좋은 곳이에요. 기대 이상이였던 도시여서 방문해 보시길 추천드려요!",
        photoUrl: photo4,
        likes: 44,
        category: "인천",
        author: {
            "username": "ethan",
            "profileUrl": defaultImg
        },
        views: 102,
        postedAt: "2024-07-01",
        replies: 4,

comments: commentData    },
    {
        id: 27,
        title: "서울에서 느낀 한국의 매력",
        content: "서울에 도착하자마자 경복궁을 갔는데, 전통 한옥 건축물이 정말 아름다웠어요. 인사동에서 산책하며 전통 찻집에 들렀는데 분위기가 너무 좋더라고요. 저녁에는 남산타워에 올라가 서울 야경을 봤는데 정말 잊을 수 없는 경험이었어요. 다음 날은 홍대에서 맛있는 떡볶이랑 닭강정을 먹었는데, 한국 길거리 음식이 최고예요!",
        photoUrl: photo7,
        likes: 67,
        category: "서울",
        author: {
            "username": "jason",
            "profileUrl": defaultImg
        },
        views: 100,
        postedAt: "2024-11-24",
        replies: 4,

comments: commentData    },
    {
        id: 28,
        title: "부산에서 크리스마스 분위기 느낄 수 있는 곳",
        content: "다음 주에 부산에 가는데, 크리스마스 조명이 예쁘게 꾸며진 곳 있나요 공원이나 카페, 혹은 거리 같은 곳 추천해주시면 감사하겠습니다. 근처에 맛집도 있으면 더 좋아요!",
        photoUrl: photo6,
        likes: 29,
        category: "자유",
        author: {
            username: "수진",
            profileUrl: defaultImg,
        },
        views: 110,
        postedAt: "2024-12-01",
        replies: 3,
        comments: commentData
    },
    {
        id: 29,
        title: "서울 근교로 당일치기 여행 어디가 좋을까요",
        content: "서울 근교로 당일치기 여행을 가고 싶은데, 제가 뚜벅이라 차가 없어도 대중교통으로 쉽게 갈 수 있는 곳 어디 있을까요 너무 힘들지 않고 편안한 장소였으면 좋겠어요.",
        photoUrl: photo4,
        likes: 21,
        category: "자유",
        author: {
            username: "현진",
            profileUrl: defaultImg,
        },
        views: 80,
        postedAt: "2024-12-03",
        replies: 4,
        comments: commentData
    },
    {
        id: 30,
        title: "충남 공주에서 만난 백제 문화",
        content: "충남 공주의 공산성을 둘러봤는데, 옛날 백제 시대의 흔적을 느낄 수 있었어요. 날씨가 좋아서 산책하기 딱 좋았고, 성 위에서 내려다보는 풍경이 정말 멋졌어요. 그리고 근처에서 먹은 알밤막걸리가 너무 맛있어서 집에 돌아오면서 한 병 사왔어요!",
        photoUrl: photo4,
        likes: 48,
        category: "충청남도",
        author: {
            "username": "해린",
            "profileUrl": defaultImg
        },
        views: 95,
        postedAt: "2024-01-29",
        replies: 4,

comments: commentData    },
    {
        id: 31,
        title: "눈 오는 날 가기 좋은 등산 코스",
        content: "겨울철에 등산하기 좋은 곳 있나요 눈 내리면 더 예쁘고, 경치가 좋은 곳이면 좋겠어요. 아직 등산 초보라, 너무 어렵지 않은 코스로 추천해주세요!",
        photoUrl: photo1,
        likes: 30,
        category: "자유",
        author: {
            username: "태현",
            profileUrl: defaultImg,
        },
        views: 98,
        postedAt: "2024-12-01",
        replies: 5,
        comments: commentData
    },
    {
        id: 32,
        title: "크리스마스 느낌 물씬 나는 카페 추천해주세요!",
        content: "저는 아기자기하고 따뜻한 분위기의 카페를 너무 좋아하는데, 크리스마스에 잘 꾸며진 카페가 있을까요 사진 많이 찍고 싶어요!",
        photoUrl: photo6,
        likes: 40,
        category: "자유",
        author: {
            username: "지윤",
            profileUrl: defaultImg,
        },
        views: 85,
        postedAt: "2024-12-03",
        replies: 6,
        comments: commentData
    },
    {
        id: 33,
        title: "서울에서 커플 사진 찍기 좋은 장소",
        content: "연인과 함께 서울에서 커플 사진 찍을 만한 좋은 장소를 찾고 있어요. 크리스마스 분위기 나는 곳이면 더 좋겠어요. 추천해주세요!",
        photoUrl: photo6,
        likes: 36,
        category: "자유",
        author: {
            username: "승민",
            profileUrl: defaultImg,
        },
        views: 90,
        postedAt: "2024-10-02",
        replies: 8,
        comments: commentData
    },
    {
        id: 34,
        title: "커피 좋아하는 사람들에게 추천할 만한 카페 있을까요",
        content: "저는 커피를 너무 좋아하는데, 한국에서 꼭 가봐야 할 독특한 카페가 있을까요 서울 뿐만 아니라 어디든 상관없으니 맛있는 커피가 있는 곳 추천 부탁드려요.",
        photoUrl: photo5,
        likes: 28,
        category: "자유",
        author: {
            username: "하은",
            profileUrl: defaultImg,
        },
        views: 75,
        postedAt: "2024-12-03",
        replies: 4,
        comments: commentData
    },
    {
        id: 35,
        title: "대구에서 먹방 투어",
        content: "대구 동성로에서 하루를 보냈는데 맛있는 먹거리 천국이었어요! 특히 막창은 꼭 먹어봐야 해요. 그리고 대구 근처 팔공산 케이블카를 탔는데, 산 풍경이 정말 멋졌어요. 저녁에는 서문시장 가서 야시장 음식 먹고 쇼핑까지 했어요. 대구는 먹방 여행지로 최고네요!",
        photoUrl: photo2,
        likes: 54,
        category: "대구",
        author: {
            "username": "수진",
            "profileUrl": defaultImg
        },
        views: 89,
        postedAt: "2024-01-26",
        replies: 3,

comments: commentData    },
    {
        id: 36,
        title: "부산에서 인생샷 찍기 좋은 장소 추천!",
        content: "부산 여행 중인데, 인생샷 남길 수 있는 멋진 장소 있을까요 해변도 좋고, 감천마을처럼 예쁜 곳도 좋아요!",
        photoUrl: photo5,
        likes: 48,
        category: "자유",
        author: {
            username: "도영",
            profileUrl: defaultImg,
        },
        views: 115,
        postedAt: "2024-06-04",
        replies: 7,
        comments: commentData
    },
    {
        id: 37,
        title: "인천 차이나타운에서의 하루",
        content: "인천 차이나타운을 둘러봤는데, 이국적인 분위기가 물씬 느껴져서 너무 재밌었어요. 짜장면도 먹고 골목골목 걸으면서 사진도 많이 찍었어요. 근처 송월동 동화마을도 들렀는데 아기자기한 벽화가 너무 귀여웠어요. 인천은 색다른 매력이 있는 도시 같아요.",
        photoUrl: photo5,
        likes: 39,
        category: "인천",
        author: {
            "username": "재현",
            "profileUrl": defaultImg
        },
        views: 90,
        postedAt: "2024-11-27",
        replies: 2,

comments: commentData    },
    {
        id: 38,
        title: "충북 단양의 자연 속 힐링 | 충북 여행 후기 | 단양 여행 후기",
        content: "충북 단양에서 고수동굴을 다녀왔어요. 동굴 속을 탐험하며 자연의 신비를 느낄 수 있었고, 시원해서 여름에도 딱일 것 같더라고요. 그리고 도담삼봉 근처에서 바라본 강 풍경이 너무 아름다웠어요. 단양은 조용히 힐링하기 좋은 곳이에요.",
        photoUrl: photo5,
        likes: 43,
        category: "충청북도",
        author: {
            "username": "emma",
            "profileUrl": defaultImg
        },
        views: 83,
        postedAt: "2024-01-30",
        replies: 3,

comments: commentData    },
    {
        id: 39,
        title: "전남 순천만 여행",
        content: "전남 순천만에 갔는데, 드넓은 갈대밭이 정말 평화롭고 아름다웠어요. 해질녘의 갈대밭 풍경은 정말 잊을 수 없을 만큼 감동적이었어요. 순천만 근처 카페에서 여유롭게 차 한 잔 마시며 힐링했어요. 다음번엔 보성 녹차밭도 가보고 싶네요!",
        photoUrl: photo4,
        likes: 51,
        category: "전라남도",
        author: {
            "username": "lucas",
            "profileUrl": defaultImg
        },
        views: 87,
        postedAt: "2024-01-28",
        replies: 2,

comments: commentData    },
    {
        id: 40,
        title: "전남 여행 중 꼭 가봐야 할 힐링 스팟!",
        content: "전라남도에서 힐링하면서 자연도 즐길 수 있는 여행지가 있을까요 제가 다녀온 곳이 그런 곳이였어요! 나주에 있는 산림자원연구소 메타세콰이어 길이였는데요, 푸릇푸릇한 길이 계속 펼쳐지는데 정말 평화롭고 좋았어요. 근처 들리실 일 있으면 꼭 추천드려요! 또 다른 추천 장소 있으면 알려주세요!",
        photoUrl: photo5,
        likes: 37,
        category: "전라남도",
        author: {
            username: "지민",
            profileUrl: defaultImg,
        },
        views: 128,
        postedAt: "2024-12-03",
        replies: 5,
        comments: commentData
    },
    {
        id: 41,
        title: "전주 한옥마을에서 맛집 추천 좀!",
        content: "전주 한옥마을에 왔는데요, 한복도 대여해서 입고 한옥마을을 걸어다니니까 기분도 좋고 재밌더라고요. 한번 쯤 추천드려요! 이제 저녁을 먹으려고 하는데, 분위기 좋으면서도 맛있는 음식점 어디 없을까요 비빔밥 말고도 추천해주세요!",
        photoUrl: photo5,
        likes: 55,
        category: "전라북도",
        author: {
            username: "수영",
            profileUrl: defaultImg,
        },
        views: 200,
        postedAt: "2024-12-04",
        replies: 9,
        comments: commentData
    },
    {
        id: 42,
        title: "경북에서 전통시장 즐기기",
        content: "지난주 경북 여행 중에 전통시장을 다녀왔는데요, 와 진짜 볼거리 먹거리가 가득하더라고요! 닭강정도 너무 맛있었고, 시장 골목을 걸으며 느껴지는 따뜻한 분위기가 정말 좋았어요. 혹시 경북 지역에서 또 다른 시장을 추천해 주실 분 계신가요 다음번엔 새로운 시장도 가보고 싶네요!",
        photoUrl: photo5,
        likes: 29,
        category: "경상북도",
        author: {
            username: "다영",
            profileUrl: defaultImg,
        },
        views: 90,
        postedAt: "2024-12-02",
        replies: 3,
        comments: commentData
    },
    {
        id: 43,
        title: "세종시 정부청사 야경 산책 후기 | 세종 가볼만한 곳 | 세종 산책로",
        content: "세종시 정부청사 근처 산책로에서 밤에 산책했는데, 조명이 은은해서 너무 좋더라고요. 조용하고 깔끔해서 여유를 즐기기에 딱이에요. 산책 후 근처 카페에서 커피 마셨는데 완벽한 하루였어요!",
        photoUrl: photo3,
        likes: 22,
        category: "세종",
        author: {
            username: "하늘",
            profileUrl: defaultImg,
        },
        views: 92,
        postedAt: "2024-12-04",
        replies: 3,
        comments: commentData
    },
    {
        id: 44,
        title: "강원도 설악산 겨울 등산 후기 ❄",
        content: "강원도 설악산에서 눈 덮인 산을 등산했는데, 정말 그림 같았어요. 올라갈 땐 힘들었지만 정상에서 본 풍경이 모든 걸 보상해주더라고요. 겨울 등산은 처음인데 완전 추천해요!",
        photoUrl: photo1,
        likes: 45,
        category: "강원도",
        author: {
            username: "재훈",
            profileUrl: defaultImg,
        },
        views: 120,
        postedAt: "2024-12-03",
        replies: 5,
        comments: commentData
    },
    {
        id: 45,
        title: "대전 한밭수목원에서 만난 겨울 풍경",
        content: "대전 한밭수목원 다녀왔는데, 겨울에도 산책하기 좋은 곳이에요. 나무들이 겨울 옷을 입은 듯해서 너무 예뻤고, 조용해서 힐링 제대로 하고 왔어요. 다음에는 봄에도 가보고 싶네요!",
        photoUrl: photo1,
        likes: 29,
        category: "대전",
        author: {
            username: "윤아",
            profileUrl: defaultImg,
        },
        views: 98,
        postedAt: "2024-12-02",
        replies: 4,
        comments: commentData
    },
    {
        id: 46,
        title: "제주도 비양도에서 본 노을 ",
        content: "제주도 비양도에서 노을 보면서 하루를 마무리했어요. 작은 섬인데도 정말 조용하고, 노을 질 때 하늘 색이 너무 감동적이었어요. 제주에 가면 꼭 다시 들르고 싶어요.",
        photoUrl: photo7,
        likes: 38,
        category: "제주도",
        author: {
            username: "채영",
            profileUrl: defaultImg,
        },
        views: 118,
        postedAt: "2024-12-01",
        replies: 6,
        comments: commentData
    },
    {
        id: 47,
        title: "울산 태화강 십리대숲 산책 🛤",
        content: "울산 태화강 십리대숲에서 산책했는데 정말 맑고 공기도 좋아서 걷기 너무 좋았어요. 겨울인데도 초록빛 대나무 숲이 살아 있어서 기분까지 맑아지는 느낌이었어요!",
        photoUrl: photo3,
        likes: 34,
        category: "울산",
        author: {
            username: "승호",
            profileUrl: defaultImg,
        },
        views: 105,
        postedAt: "2024-12-03",
        replies: 5,
        comments: commentData
    },
    {
        id: 48,
        title: "광주 무등산 전망대 후기",
        content: "광주 무등산 전망대에서 본 도심 풍경이 너무 멋졌어요. 공기도 좋고, 산책로도 잘 되어 있어서 시간 가는 줄 모르고 걷다 왔네요. 가족이랑 다시 가고 싶어요!",
        photoUrl: photo1,
        likes: 31,
        category: "광주",
        author: {
            username: "은비",
            profileUrl: defaultImg,
        },
        views: 100,
        postedAt: "2024-12-04",
        replies: 4,
        comments: commentData
    },
    {
        id: 49,
        title: "부산 감천문화마을에서 보낸 하루 ✨",
        content: "부산 감천문화마을에서 하루를 보냈는데 알록달록한 집들이 너무 예뻤어요. 골목골목을 걷다 보면 재미있는 아트샵도 많아서 구경하는 재미가 쏠쏠했어요. 부산 가면 꼭 다시 갈 거예요!",
        photoUrl: photo2,
        likes: 48,
        category: "부산",
        author: {
            username: "민호",
            profileUrl: defaultImg,
        },
        views: 145,
        postedAt: "2024-12-02",
        replies: 7,
        comments: commentData
    },

    {
        id: 50,
        title: "(필독) 공지사항",
        content: "안녕하세요. 전체 공지사항 안내 드립니다.",
        photoUrl: photo6,
        likes: 30,
        category: "공지",
        author: {
        username: "관리자",
        profileUrl: defaultImg,
        },
        views: 300,
        postedAt: "2024-11-27",
        replies: 1,
        comments: commentData
    }

];

