import React from 'react'
import Link from 'next/link';
const Oldresult = () => {
  return (
    <div className='min-h-screen bg-gray-500' >
          <div className='bg-gray-500 px-4 py-4 cursor-pointer' >
          <Link href='/fullchart' >
        <div className="text-center  bg-white text-red-400 rounded-lg">
          <h1 className="text-2xl font-bold">👉CHECK FULL CHART</h1>
        </div>
        </Link>
        </div>
    </div>
  )
}

export default Oldresult