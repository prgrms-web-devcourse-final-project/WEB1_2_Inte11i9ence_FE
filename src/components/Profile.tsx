import React, { useState } from 'react';
import profiles from '../assets/png/Profiles.png'

const Profile: React.FC = () => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState(false);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNickname(value);
    setError(value === '중복된닉네임'); // 예제: '중복된닉네임' 입력 시 에러 발생
  };

  return (
    <div
      style={{
        width: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '2px solid #1C2B59',
        borderRadius: '15px',
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1C2B59', marginBottom: '20px' }}>
        프로필 생성
      </h1>
      
      {/* 프로필 사진 */}
      <div style={{ marginBottom: '20px' }}>
        <div
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#E5E5E5',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={profiles}
            alt="Profile"
            style={{ width: '100px', height: '100px' }}
          />
        </div>
        <button
          style={{
            marginTop: '10px',
            backgroundColor: '#E5E5E5',
            border: 'none',
            borderRadius: '5px',
            padding: '5px 10px',
            cursor: 'pointer',
          }}
        >
          이미지 선택
        </button>
      </div>
      
      {/* 닉네임 입력 */}
      <div style={{ marginBottom: '20px', textAlign: 'left', width: '100%' }}>
        <label
          htmlFor="nickname"
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: 600,
            color: '#1C2B59',
            marginBottom: '5px',
          }}
        >
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            outline: 'none',
          }}
        />
        {error && (
          <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
            중복된 닉네임입니다.
          </p>
        )}
      </div>
      
      {/* 버튼 */}
      <button
        style={{
          backgroundColor: '#1C2B59',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        수정하기
      </button>
    </div>
  );
};

export default Profile;
