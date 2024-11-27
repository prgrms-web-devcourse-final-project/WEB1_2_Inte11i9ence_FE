import React from 'react'
import AirPlane from '../assets/png/AirPlane.png'
import Google from '../assets/png/Google.png'
import Naver from '../assets/png/Naver.png'

interface MainLoginProps{
  closeModal:()=>void;
}

const MainLogin: React.FC<MainLoginProps> = ({closeModal}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F2F2F',
      }}
    >
      <div
        style={{
          width: '360px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
       
        }}
      >
        {/* 상단 텍스트 */}
        <h2 style={{ fontSize: '25px', fontWeight:  'bold', marginBottom: '10px',color:'#1C2B59' }}>
          나의 여행 기록을 남기고<br />
          경험을 나누는 공간
        </h2>

        {/* 비행기 이미지 */}
        <img
          src={AirPlane}
          alt="Airplane"
          style={{ marginBottom: '-50px' ,height:'150px', marginLeft:'-40px' }}
        />

        {/* 로고  */}
        <h1 style={{ fontSize: '40px', fontWeight: 'bold', color: '#1C2B59', marginBottom: '100px' }}>
          Logo
        </h1>

        {/* 구글 로그인 버튼 */}
        <button
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',  
          }}
        >
          <img
            src={Google} // 구글 아이콘 
            alt="Google Icon"
            style={{ marginRight: '10px',height:'40px' }}
           
          />
          <span style={{}}>Google로 시작하기</span>
        </button>

        {/* 네이버 로그인 버튼 */}
        <button
          style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#03C75A',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            gap:'10px'
          }}
        >
          <img
            src={Naver} // 네이버 아이콘 
            alt="Naver Icon"
            style={{ marginRight: '10px' , height:'40px'}}
          />
          네이버로 시작하기
        </button>

        {/* 하단 텍스트 */}
        <p style={{ fontSize: '12px', color: '#555',cursor:'pointer',textDecoration:'underline' }}
        onClick={closeModal}
        >
          조금 더 둘러보고싶어요
        </p>
      </div>
    </div>
  );
};

export default MainLogin;
