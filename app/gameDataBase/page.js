'use client';

import React, { useEffect, useState } from 'react';

const Home = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch('/api/games');
            const data = await response.json();
            setGames(data);
        };

        fetchGames();
    }, []);

    return (
        <div>
            <h1>Games</h1>
            <ul>
                {games.map((game) => (
                    <li key={game.id}>{game.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
