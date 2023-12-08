'use client';
import { useState, useEffect } from 'react';

async function fetchGames() {
    const today = new Date().toISOString().split('T')[0];
    const endDate = new Date().setMonth(new Date().getMonth() + 2);
    const targetDate = new Date(endDate).toISOString().split('T')[0];
    const response = await fetch(`https://api.rawg.io/api/games?key=9a1696f1e3c64d7d97ee72af929867dc&dates=${today},${targetDate}&ordering=released&page_size=12&platforms=1,7,186,187`);
    const data = await response.json();
    console.log('Games:', data);
    return data;
}

export default function UpcomingGames() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadGames() {
        const games = await fetchGames();
        setGames(games.results);
        setLoading(false);
    }

    useEffect(() => {
        loadGames();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!games.length) return (
        <p>No games found.</p>);

    return (
        <div className=''>
            <ul className=''>
                <div className='grid grid-cols-3 gap-8 px-12'>
                    {games.map((game, index) => (
                        <div key={index} className=''>
                            <li className=" shadow-orange-700 shadow-lg h-full rounded-xl">
                                <img className=' w-full rounded-t-xl' src={game.background_image} alt={game.name} />
                                <h2 className="text-2xl font-bold ml-1">{game.name}</h2>
                                <p className=' ml-1'>Release Date: {game.released}</p>
                                <div>
                                    {game.platforms && game.platforms.map((platform) => (
                                        <span className=' m-4 ml-1' key={platform.platform.id}>{platform.platform.name}</span>
                                    ))}
                                </div>
                            </li>
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    );
}
