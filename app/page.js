'use client'

import { useState } from 'react'
import Link from 'next/link'


export default function Home() {
  return (
    <main>
      <h1>This is the Home page</h1>
      <div>
        <Link href="/gameDataBase">
          <p>DB</p>
        </Link>
        <Link href="/userDashBoard">
          <p>UD</p>
        </Link>
      </div>
    </main>
  )
}
