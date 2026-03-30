import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong, getSongsByMood } from "../service/song.api";


export const useSong = () => {

    // create context and get states of song 
    const context =  useContext(SongContext)

    const { loading, setLoading, song, setSong, songsList, setSongsList } = context 


    // handle get song function 
    async function handleGetSong({ mood }) {
        setLoading(true)
        const data = await getSong({mood}); // get data of song 
        setSong(data.song)
        setLoading(false)
    } 

    // handle get songs by mood for sidebar
    async function handleGetSongsByMood({ mood }) {
        const data = await getSongsByMood({mood});
        setSongsList(data.songs)
    }


    return ({ loading, song, handleGetSong, songsList, handleGetSongsByMood })
}