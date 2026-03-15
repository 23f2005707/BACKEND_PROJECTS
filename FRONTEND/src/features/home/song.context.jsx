/// state layer for song 

import { createContext } from "react";
import { useState } from "react";


export const SongContext = createContext(); 

export const SongContextProvider = ({ children }) => {

    // use state 
    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/72eziopbl/cohort-2/moodify/songs/Chumma__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.WS__QEMqqsVeC.mp3",
        "posterUrl": "https://ik.imagekit.io/72eziopbl/cohort-2/moodify/posters/Chumma__From__Vicky_Vidya_Ka_Woh_Wala_Video____DownloadMing.WS__M5-Ot98gX.jpeg",
        "title": "Chumma (From \"Vicky Vidya Ka Woh Wala Video\") [DownloadMing.WS]",
        "mood": "surprised",
    })


    // loading
    const [loading, setLoading] = useState(false);

    return (
        <SongContext.Provider
            value = {{ loading, setLoading, song, setSong }}
        >
            {children}
        </SongContext.Provider>
    )
} 
