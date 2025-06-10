"use client"

import { useState } from "react"
import Preloader from "./ui/preloader"

const HeroButton = () => {
  const [showPreloader, setShowPreloader] = useState(false)

  const handleClick = () => {
    setShowPreloader(true)
  }

  return (
    <>
      {showPreloader && <Preloader />}
      {!showPreloader && (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-8 max-w-3xl">
            <button
              onClick={handleClick}
              className="px-10 py-5 mt-6 text-2xl font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 mb-[700px]"
            >
              Explore
            </button>
          </div>
        </main>
      )}
    </>
  )
}

export { HeroButton }
