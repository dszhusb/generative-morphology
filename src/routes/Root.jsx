import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import Topbar from '../components/navbar/Topbar'

export default function Root() {
  return (
    <div className="App relative overflow-hidden h-screen bg-gradient-to-b from-stone-100 to-stone-300 text-stone-800">
      <Topbar />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
}
