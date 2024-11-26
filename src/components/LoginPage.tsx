import React from 'react';

const LoginMessage: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '300px',
        height: '150px',
        borderRadius: '12px',
        border: '1px solid #e5e5e5',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '50px auto',
        padding: '20px',
      }}
    >
      <h1
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#1C2B59',
          marginBottom: '8px',
        }}
      >
        로그인 후 이용 가능합니다
      </h1>
      <p style={{ fontSize: '12px', color: '#555',cursor:'pointer',textDecoration:'underline' }}>
          조금 더 둘러보고싶어요
          {/* <Link to="" style={{ color: 'inherit', textDecoration: 'none' }}>
    조금 더 둘러보고싶어요
  </Link>   리액트 라우터를 사용할 경우*/}
        </p>
    </div>
  );
};

export default LoginMessage;
