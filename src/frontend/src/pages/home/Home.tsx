import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../../services/Api';
import NewsItem from '../../dto/NewsItem';
import NewsItemComponent from '../../components/news-item/NewsItem';
import './Home.css';

const Home: React.FC = () => {
    const [items, setItems] = useState<NewsItem[]>([]);
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page') || '1', 10);
    const currentLimut = queryParams.get('limit');

    useEffect(() => {
        async function fetchNews() {
            try {
                const data = await Api.getNewsList();
                setItems(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchNews();
    }, [location.key, currentPage, currentLimut]); // Добавляем currentPage в зависимости

    const handleLimitChange = (limit: number) => {
        // Изменяем параметр URL и обновляем страницу
        navigate(`?limit=${limit}&page=${currentPage}`, { replace: true });
    };

    const handlePageChange = (change: number) => {
        const newPage = currentPage + change;
        if (newPage >= 1) {
            navigate(`?limit=${currentLimut}&page=${newPage}`, { replace: true });
        }
    };

    return (
        <>
            <h1>Home</h1>
            <button onClick={() => handlePageChange(-1)}>Previous Page</button>

            {/* Добавляем кнопки с вызовом handleLimitChange при нажатии */}
            <button onClick={() => handleLimitChange(15)}>Limit 15</button>
            <button onClick={() => handleLimitChange(25)}>Limit 25</button>
            <button onClick={() => handleLimitChange(30)}>Limit 30</button>
            <button onClick={() => handleLimitChange(50)}>Limit 50</button>
            <button onClick={() => handleLimitChange(100)}>Limit 100</button>

            {/* Добавляем кнопки с вызовом handlePageChange при нажатии */}
            <button onClick={() => handlePageChange(1)}>Next Page</button>

            {items.map((item, index) => (
                <NewsItemComponent key={index} item={item} />
            ))}
        </>
    );
};

export default Home;
