"use client";

import { useUserAuth } from "../_utils/auth-context.js";
import NavBar from "@/app/mainNavi/navBar.js";
import Link from 'next/link';
import React from "react";
import UpcomingGames from "@/app/gameDataBase/upcoming.js";
import NewLaunch from "@/app/gameDataBase/newLaunch.js";

export default function SearchGame() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    if (!user) {
        return (
            <main>
                <NavBar />
                <div>
                    <h1 className="text-3xl mt-28">You have to login</h1>
                    <Link href="/userDashBoard">
                        <p className=' block m-4 p-2 bg-orange-400 w-60 hover:bg-orange-600 text-center'>Go here to Login</p>
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main>
            <NavBar />
            <div className="flex justify-end">
                <button className="block m-28 p-2 bg-orange-400 w-60 hover:bg-orange-600 text-center" onClick={firebaseSignOut}>Sign Out</button>
            </div>
            <div className='  pb-8 h-full w-full bg-gradient-to-b from-black to-gray-600'>
                <h1 className="text-3xl mb-8 text-center underline underline-offset-8">New Launched Games</h1>
                <NewLaunch />
                <h1 className="text-3xl mb-8 mt-8 text-center underline underline-offset-8">Upcoming Games</h1>
                <UpcomingGames />
            </div>
        </main>
    )
}