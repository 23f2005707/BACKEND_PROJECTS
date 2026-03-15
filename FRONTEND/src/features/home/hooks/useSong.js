import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong } from "../service/song.api";


export const useSong = () => {

    // create context and get states of song 
    const context =  useContext(SongContext)

    const { loading, setLoading, song, setSong } = context 


    // handle get song function 
    async function handleGetSong({ mood }) {
        setLoading(true)
        const data = await getSong({mood}); // get data of song 
        setSong(data.song)
        setLoading(false)
    } 


    return ({ loading, song, handleGetSong })
}