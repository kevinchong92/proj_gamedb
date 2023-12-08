import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
    return (
        <div className=" flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed top-0">
            <div className="flex">
                <h1 className=" text-5xl font-serif ml-2 hover:scale-110 duration-200"><Link href="/">GameDB</Link></h1>
            </div>
            <Image width={100} height={50} src="/assets/Picture1.png" alt="logo" className=" h-full" />
            <div>
                <ul className="flex text-xl">
                    <li className="mr-10 hover:scale-110 duration-200">
                        <Link href="/userDashBoard/searchGame">GAMES</Link>
                    </li>
                    <li className="mr-10 hover:scale-110 duration-200">
                        <Link href="/userDashBoard/gameCalendar">CALENDAR</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default NavBar;