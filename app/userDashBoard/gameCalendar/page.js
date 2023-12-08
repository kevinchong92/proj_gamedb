'use client';

import React, { useState, useEffect } from 'react';
import { getGames, deleteGame } from "../_services/gameDBServer";
import { useUserAuth } from "../_utils/auth-context.js";
import NavBar from "@/app/mainNavi/navBar.js";
import Link from 'next/link';
import GamesCalendar from './gamesCalendar';
import Login from '../login';

const GamesList = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();


    const gameItemContainerStyle = {
        position: 'relative',
    };

    const deleteButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '5px',
    };


    useEffect(() => {
        const fetchGames = async () => {
            if (user) {
                try {
                    setLoading(true);
                    const myGames = await getGames(user.uid);
                    setGames(myGames);
                } catch (error) {
                    console.error("Error fetching games:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchGames();
    }, [user]);

    const handleDeleteGame = async (gameId) => {
        if (window.confirm("Are you sure you want to delete this game?")) {
            try {
                await deleteGame(user.uid, gameId);
                setGames(games.filter(game => game.id !== gameId));
            } catch (error) {
                console.error("Error deleting game:", error);
            }
        }
    }

    if (!user) {
        return (
            <main>
                <NavBar />
                <div>
                    <h1 className="text-3xl mt-28">You have to login</h1>
                    <Login />
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main>
                <NavBar />
                <div className='mt-28'>Loading games...</div>
            </main>
        );
    }

    if (games.length === 0) {
        return (
            <main>
                <NavBar />
                <div className='mt-28'>No games found.</div>
            </main>
        );
    }

    return (
        <main>
            <NavBar />
            <Login />
            <div className='mt-8'>
                <GamesCalendar games={games} />
            </div>
            <h2 className="text-3xl mt-8">My Games</h2>
            <ul className=' mt-20'>
                <div className='grid grid-cols-3 gap-8 px-12'>
                    {games.map((game, index) => (
                        <div key={index} style={gameItemContainerStyle}>
                            <li className="shadow-orange-700 shadow-lg h-full rounded-xl">
                                <img className='w-full rounded-t-xl' src={game.data.background_image} alt={game.data.name} />
                                <h3 className="text-2xl font-bold ml-1">{game.data.name}</h3>
                                <p className='ml-1'>Release Date: {game.data.released}</p>
                                <div>
                                    {game.data.platforms && game.data.platforms.map((platform, idx) => (
                                        <span className='m-4 ml-1' key={idx}>{platform}</span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => handleDeleteGame(game.id)}
                                    style={deleteButtonStyle}
                                >
                                    Delete
                                </button>
                            </li>
                        </div>
                    ))}
                </div>
            </ul>
        </main>
    );
};

export default GamesList;
