import React from 'react'

function Dashboard() {
  return (
    <>
     <div className="flex mt-6 justify-end items-center">
        <img
          className="object-cover md:hidden  w-full h-60"
          src=""
          alt="background"
        />
        <img
          className="hidden md:block object-cover  w-full h-56 lg:h-52"
          src="/images/yes.jpeg"
          alt="background"
        />
      </div>

    <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
        {/* Remove class [ h-24 ] when adding a card block */}
        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
        <div className="rounded border-gray-300  dark:border-gray-700 border-dashed border-2 h-24" />
        {/* Remove class [ h-24 ] when adding a card block */}
        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
        <div className="rounded border-gray-300  dark:border-gray-700 border-dashed border-2 h-24" />
        {/* Remove class [ h-24 ] when adding a card block */}
        {/* Remove class [ border-gray-300  dark:border-gray-700 border-dashed border-2 ] to remove dotted border */}
        <div className="rounded border-gray-300  dark:border-gray-700 border-dashed border-2 h-24" />
    </div>
</>
  )
}

export default Dashboard
