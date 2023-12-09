"use client";

import { useUserAuth } from "../_utils/auth-context.js";
import NavBar from "@/app/mainNavi/navBar.js";
import Link from 'next/link';
import React from "react";
import SearchYourGame from "./searchYourGame.js";
import Login from '../login';
import Footer from '@/app/mainNavi/footer';

export default function SearchGame() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

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

    return (
        <main>
            <NavBar />
            <Login />
            <div className='pb-8 h-full w-full bg-gradient-to-b from-black to-gray-600'>
                <h1 className="text-3xl mb-8 text-center underline underline-offset-8">Search for your Games</h1>
                <SearchYourGame userId={user.uid} />
            </div>
            <Footer />
        </main>
    )
}