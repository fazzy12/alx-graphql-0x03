import { useQuery } from "@apollo/client/react";
import { GET_EPISODES } from "@/graphql/queries";
import { EpisodeProps } from "@/interfaces"
import EpisodeCard from "@/components/common/EpisodeCard"
import { useEffect, useState } from "react"
// --- New Imports for Testing ---
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorProneComponent from '@/components/ErrorProneComponent';


const Home: React.FC = () => {

  const [page, setPage] = useState<number>(1)
  // State to control if the error component should be rendered
  const [showError, setShowError] = useState<boolean>(false); 

  const { loading, error, data, refetch } = useQuery(GET_EPISODES, {
    variables: {
      page: page
    }
  })

  useEffect(() => {
    refetch()
  }, [page, refetch])

  if (loading) return <h1 className="text-center text-2xl py-10">Loading...</h1>
  if (error) return <h1 className="text-center text-2xl py-10 text-red-500">Error fetching data!</h1>

  const results = data?.episodes.results
  const info = data?.episodes.info

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#A3D5E0] to-[#F4F4F4] text-gray-800">
      {/* Header - Should remain visible even if the ErrorProneComponent crashes */}
      <header className="bg-[#4CA1AF] text-white py-6 text-center shadow-md">
        <h1 className="text-4xl font-bold tracking-wide">Rick and Morty Episodes</h1>
        <p className="mt-2 text-lg italic">Explore the multiverse of adventures!</p>
      </header>

      {/* Error Testing Section */}
      <section className="p-6 bg-yellow-100 border-b border-yellow-400">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Error Boundary Test Zone</h2>
        <button 
          onClick={() => setShowError(true)}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition duration-200 transform hover:scale-105"
        >
          Click to Trigger Localized Error
        </button>

        {showError && (
          <div className="mt-4 p-4 border-2 border-red-400 rounded-lg bg-red-50 max-w-sm">
            <ErrorBoundary>
              <ErrorProneComponent /> 
            </ErrorBoundary>
          </div>
        )}
      </section>

 
      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results && results.map(({ id, name, air_date, episode }: EpisodeProps, key: number) => (
            <EpisodeCard
              id={id}
              name={name}
              air_date={air_date}
              episode={episode}
              key={key}
            />
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-6">
          <button 
            onClick={() => setPage(prev => prev > 1 ? prev - 1 : 1)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
            Previous
          </button>
          <button 
            onClick={() => setPage(prev => prev < info.pages ? prev + 1 : prev)}
            className="bg-[#45B69C] text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-[#3D9B80] transition duration-200 transform hover:scale-105">
            Next
          </button>
        </div>
      </main>

      {/* Footer - Should remain visible */}
      <footer className="bg-[#4CA1AF] text-white py-4 text-center shadow-md">
        <p>&copy; 2025 Rick and Morty Fan Page</p>
      </footer>
    </div>
  )
}

export default Home
