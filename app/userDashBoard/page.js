'use client';

import { useUserAuth } from './_utils/auth-context';
import Link from 'next/link';

export default function UserDashBoard() {

    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    async function handleSignIn() {
        await gitHubSignIn();
    }

    async function handleSignOut() {
        await firebaseSignOut();
    }

    return (
        <>
            <div>
                <h1 className="text-3xl mb-8">This is the UserDashBoard</h1>
                <p className="text-xl">You are currently signed in as {user?.email}</p>
                <button className="block bg-orange-400 m-4 p-2 w-60 hover:bg-orange-600" onClick={handleSignIn}>Sign in with GitHub</button>
                <button className="block bg-orange-400 m-4 p-2 w-60 hover:bg-orange-600" onClick={handleSignOut}>Sign out</button>
            </div>
            {user && <div>
                <h1 className="text-3xl mb-4">Shopping List</h1>
                <Link href="/">
                    <p>Home</p>
                </Link>
            </div>}
        </>
    )
}
