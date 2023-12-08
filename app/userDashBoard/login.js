'use client';

import { useUserAuth } from './_utils/auth-context';

import React from 'react';

export default function UserDashBoard() {

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    async function handleSignIn() {
        await gitHubSignIn();
    }

    async function handleSignOut() {
        await firebaseSignOut();
    }

    return (
        <main>
            <div className='flex justify-end'>
                {user && user && <p className="text-xl m-28 text-white">You are currently signed in as {user?.email}</p>}
                {!user && <button className="block mr-8 bg-orange-400 w-60 h-20 hover:bg-orange-600 text-center" onClick={handleSignIn}>Sign in with GitHub</button>}
                {user && <button className="block m-28 bg-orange-400 w-60 hover:bg-orange-600 text-center" onClick={handleSignOut}>Sign out</button>}
            </div>
        </main>
    )
}
