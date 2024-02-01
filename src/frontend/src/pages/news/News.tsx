import React from 'react';
import { useNavigate } from 'react-router-dom';

const News: React.FC = () => {
  const navigate = useNavigate();

  const handleLimitChange = (limit: number) => {
    // Изменяем параметры URL на ?limit=<значение>
    navigate(`?limit=${limit}`);
  };

  return (
    <>
      <h1>News</h1>
      <button>h</button>
      <button onClick={() => handleLimitChange(15)}>15</button>
      <button onClick={() => handleLimitChange(25)}>25</button>
      <button onClick={() => handleLimitChange(30)}>30</button>
      <button onClick={() => handleLimitChange(50)}>50</button>
      <button onClick={() => handleLimitChange(100)}>100</button>
    </>
  );
}

export default News;
