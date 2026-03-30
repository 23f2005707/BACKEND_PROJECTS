const songModel = require("../models/song.model")
const id3 = require("node-id3") // require id3 
const storageService = require("../services/storage.service") // require imagekit

const { uploadFile } = require("../services/storage.service")


// upload Songs 
async function uploadSong(req, res) {

    const songBuffer = req.file.buffer 
    const tags = id3.read(songBuffer) // extract details of song from buffer
    
    const {mood} = req.body // mood types 


    // song and poster file upload on imagekit
    const [songFile, posterFile] = await Promise.all([
        storageService.uploadFile({
            buffer: songBuffer,
            fileName: tags.title + ".mp3",
            folder: "/cohort-2/moodify/songs"
        }),

        storageService.uploadFile({
            buffer: tags.image.imageBuffer,
            fileName: tags.title + ".jpeg",
            folder: "/cohort-2/moodify/posters"
        })
    ])


    // create song 
    const song = await songModel.create({
        title: tags.title, 
        url: songFile.url,
        posterUrl: posterFile.url, 
        mood 
    })


    // return response 
    res.status(201).json({
        message: "song created successfully",
        song
    })


}


// get Song on basis of mood 
async function getSong(req, res) {

    const { mood } = req.query

    const song = await songModel.findOne({
        mood 
    })

    res.status(200).json({
        message: "song fetched successfully.",
        song,
    })
}

// get all Songs on basis of mood 
async function getSongsByMood(req, res) {

    const { mood } = req.query

    const songs = await songModel.find({
        mood 
    })

    res.status(200).json({
        message: "songs fetched successfully.",
        songs,
    })
}


module.exports = {uploadSong, getSong, getSongsByMood}