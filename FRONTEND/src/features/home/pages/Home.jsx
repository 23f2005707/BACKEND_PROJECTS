// import React from 'react'
// import FaceExpression from "../../Expression/components/FaceExpression"
// import Player from '../components/Player'
// import Sidebar from '../components/Sidebar'
// import { useSong } from '../hooks/useSong'

// const Home = () => {

//   const {handleGetSong, handleGetSongsByMood} = useSong()

//   const handleMoodChange = (expression) => {
//     handleGetSong({mood: expression})
//     handleGetSongsByMood({mood: expression})
//   }

//   return (
//     <div style={{ display: 'flex', height: '100vh' }}>
//         <Sidebar />
//         <div style={{ 
//           flex: 1, 
//           display: 'flex', 
//           flexDirection: 'column', 
//           alignItems: 'center', 
//           justifyContent: 'center',
//           padding: '20px',
//           boxSizing: 'border-box'
//         }}>
//             <FaceExpression onClick={handleMoodChange} />
//             <Player />
//         </div>
//     </div>
//   )
// }

// export default Home





import React from 'react'
import FaceExpression from "../../Expression/components/FaceExpression"
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'
import { useSong } from '../hooks/useSong.js'
import "./home.scss"

const Home = () => {

  const { handleGetSongsByMood, loading, song } = useSong()

  const handleMoodChange = (expression) => {
    console.log("Detected mood:", expression)
    handleGetSongsByMood({ mood: expression })
  }

  return (
    <div className="home-page">

      {/* Sidebar */}
      <div className="home-sidebar">
        <Sidebar />
      </div>

      {/* Main Section */}
      <div className="home-main">

        {/* Header */}
        <div className="home-header">
          <h1>🎧 MoodTunes</h1>

          {song && (
            <div className="mood-badge">
              Mood: {song.mood}
            </div>
          )}
        </div>

        {/* Face Detection */}
        <div className="home-face">
          <FaceExpression onClick={handleMoodChange} />
        </div>

        {/* Loading */}
        {loading && <p className="loading">Fetching songs...</p>}

        {/* Player */}
        <div className="home-player">
          <Player />
        </div>

      </div>

    </div>
  )
}

export default Home