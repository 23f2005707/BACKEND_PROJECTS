import React from 'react'
import FaceExpression from "../../Expression/components/FaceExpression"
import Player from '../components/Player'
import Sidebar from '../components/Sidebar'
import { useSong } from '../hooks/useSong'

const Home = () => {

  const {handleGetSong, handleGetSongsByMood} = useSong()

  const handleMoodChange = (expression) => {
    handleGetSong({mood: expression})
    handleGetSongsByMood({mood: expression})
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px',
          boxSizing: 'border-box'
        }}>
            <FaceExpression onClick={handleMoodChange} />
            <Player />
        </div>
    </div>
  )
}

export default Home
