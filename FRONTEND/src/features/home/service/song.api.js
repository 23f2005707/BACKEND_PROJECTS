//// API LAYER for song by mood  

import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true 
})


export async function getSong({ mood }){
    const response = await api.get("/api/songs?mood=" + mood)
    console.log(response)
    return response.data
}

export async function getSongsByMood({ mood }){
    const response = await api.get("/api/songs/mood?mood=" + mood)
    console.log(response)
    return response.data
}

