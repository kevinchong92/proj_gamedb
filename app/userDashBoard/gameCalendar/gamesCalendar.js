'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';

const GamesCalendar = ({ games }) => {
    const [value, onChange] = useState(new Date());

    const getGamesOnDate = (date) => {
        return games.filter(game =>
            new Date(game.data.released).toDateString() === date.toDateString()
        );
    };

    return (
        <div>
            <Calendar
                onChange={onChange}
                value={value}
                locale="en-US"
                tileContent={({ date, view }) => {
                    if (view === 'month') {
                        const gamesOnDate = getGamesOnDate(date);
                        return (
                            <div>
                                {gamesOnDate.map((game, index) => (
                                    <p key={index}>{game.data.name}</p>
                                ))}
                            </div>
                        );
                    }
                }}
            />
        </div>
    );
};

export default GamesCalendar;
