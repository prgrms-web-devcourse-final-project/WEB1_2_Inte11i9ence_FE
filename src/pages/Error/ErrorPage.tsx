import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center mt-64">
      <div className="text-center p-10 bg-white  rounded-lg w-full ">
        <h1 className="text-6xl font-bold text-blue-900">404</h1>
        <p className="text-2xl mt-4 text-blue-800">페이지를 찾을 수 없습니다.</p>
        <p className="text-blue-800 mt-2">죄송합니다. 더 이상 존재하지 않는 페이지입니다.</p>
        <button
          onClick={goToHome}
          className="mt-6 px-6 py-3 text-lg bg-blue-900 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
