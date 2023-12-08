'use client';
import { useState, useEffect } from 'react';
import React from 'react';
import { addGame, gameExists } from "../_services/gameDBServer.js";

export default function SearchYourGame({ userId }) {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [ordering, setOrdering] = useState("");
    const [platform, setPlatform] = useState("");
    const [searchName, setSearchName] = useState("");
    const [page, setPage] = useState("&page=1");
    const [releaseDateFrom, setReleaseDateFrom] = useState("");
    const [releaseDateTo, setReleaseDateTo] = useState("");


    async function fetchGames() {
        let queryUrl = `https://api.rawg.io/api/games?key=9a1696f1e3c64d7d97ee72af929867dc&page_size=12${searchName}${ordering}${platform}${page}`;

        if (releaseDateFrom && releaseDateTo) {
            queryUrl += `&dates=${releaseDateFrom},${releaseDateTo}`;
        }

        const response = await fetch(queryUrl);
        const data = await response.json();
        return data;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (new Date(releaseDateFrom) > new Date(releaseDateTo)) {
            alert("'Release Date To' cannot be earlier than 'Release Date From'.");
            return;
        }

        setSearchName("&search=" + name);
        setPage("&page=1");
        loadGames();
    };

    async function loadGames() {
        setLoading(true);
        const games = await fetchGames();
        setGames(games.results);
        setLoading(false);
    }

    const handlePrevPage = () => {
        if (page === "&page=1") {
            alert("You are on the first page");
            return;
        }
        const currentPage = page.substring(6);
        const newPage = parseInt(currentPage) - 1;
        setPage("&page=" + newPage);
        loadGames();
    };

    const handleNextPage = () => {
        const currentPage = page.substring(6);
        if (games.length < 12) {
            alert("You are on the last page");
            return;
        }
        const newPage = parseInt(currentPage) + 1;
        setPage("&page=" + newPage);
        loadGames();
    };

    async function handleAddGame(game) {
        const isConfirmed = window.confirm(`Are you sure you want to add ${game.name} to your list?`);
        if (!isConfirmed) return;

        try {
            const exists = await gameExists(userId, game.id);
            if (exists) {
                alert("This game is already in your list.");
                return;
            }

            const newGame = {
                name: game.name,
                released: game.released,
                background_image: game.background_image,
                platforms: game.platforms.map(p => p.platform.name),
                rating: game.rating,
                slug: game.slug,
                id: game.id,
            };

            const docId = await addGame(userId, newGame);
            alert(`Game ${game.name} added with ID: ${docId}`);
        } catch (error) {
            console.error("Error adding game:", error);
            alert("Error checking game. Check console for details.");
        }
    }

    useEffect(() => {
        loadGames();
    }, [searchName, page]);

    if (loading) return <p>Loading...</p>;
    if (!games) return (
        <p>No games found.</p>);

    return (
        <main>
            <div className=" text-black justify-center flex w-screen">
                <form onSubmit={handleSubmit}
                    className=" p-2 m-4 mt-0 bg-slate-900 max-w-lg w-full">
                    <div className=" mb-2">
                        <label>
                            <input className=" p-2 rounded-md border-2 border-gray-500 w-full"
                                type="text"
                                placeholder="Name of the Game"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            >
                            </input>
                        </label>
                    </div>
                    <div className=" mb-2 flex-1">
                        <label>
                            <span className="text-white">Platform:</span>
                            <select className=" p-2 rounded-md border-2 border-gray-500 w-full"
                                value={platform}
                                onChange={(event) => setPlatform(event.target.value)}
                                required>
                                <optgroup label="Platform">
                                    <option value="">ALL</option>
                                    <option value="&parent_platforms=1">PC</option>
                                    <option value="&parent_platforms=2">PlayStation</option>
                                    <option value="&parent_platforms=3">Xbox</option>
                                    <option value="&parent_platforms=7">Nintendo</option>
                                </optgroup>
                            </select>
                        </label>
                        <div className=" flex-1"></div>
                        <label>
                            <span className="text-white">Ordering:</span>
                            <select className=" p-2 rounded-md border-2 border-gray-500 w-full"
                                value={ordering}
                                onChange={(event) => setOrdering(event.target.value)}
                                required>
                                <optgroup label="Ordering">
                                    <option value="">Default</option>
                                    <option value="&ordering=name">Name Ascending</option>
                                    <option value="&ordering=-name">Name Descending</option>
                                    <option value="&ordering=released">Release Date Ascending</option>
                                    <option value="&ordering=-released">Release Date Descending</option>
                                    <option value="&ordering=-rating">Rating</option>
                                </optgroup>
                            </select>
                        </label>
                    </div>
                    <div className="mb-2">
                        <label>
                            <span className="text-white">Release Date From:</span>
                            <input
                                type="date"
                                className="p-2 rounded-md border-2 border-gray-500 w-full"
                                value={releaseDateFrom}
                                onChange={(event) => setReleaseDateFrom(event.target.value)}
                                required={releaseDateTo ? true : false}
                            />
                        </label>
                    </div>
                    <div className="mb-2">
                        <label>
                            <span className="text-white">To:</span>
                            <input
                                type="date"
                                className="p-2 rounded-md border-2 border-gray-500 w-full"
                                value={releaseDateTo}
                                onChange={(event) => setReleaseDateTo(event.target.value)}
                                required={releaseDateFrom ? true : false}
                            />
                        </label>
                    </div>
                    <div>
                        <button className=" bg-orange-400 hover:bg-orange-600 w-full p-2 rounded-md text-white"
                            type="submit">
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className=''>
                <ul className=''>
                    <div className='grid grid-cols-3 gap-8 px-12'>
                        {games.map((game, index) => (
                            <div key={index} className=' hover:scale-105 duration-200 cursor-pointer' onClick={() => handleAddGame(game)}>
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
            <div className="flex justify-center mt-8">
                <button className="bg-orange-400 hover:bg-orange-600 w-40 p-2 rounded-md text-white"
                    onClick={() => handlePrevPage()}>
                    Prev Page
                </button>
                <div>
                    <p className=" w-40 p-2 rounded-md text-white text-center">Page: {page.substring(6)}</p>
                </div>
                <button className="bg-orange-400 hover:bg-orange-600 w-40 p-2 rounded-md text-white"
                    onClick={() => handleNextPage()}>
                    Next Page
                </button>
            </div>
        </main>
    );
}
