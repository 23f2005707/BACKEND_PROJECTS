import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [lastMood, setLastMood] = useState(null);
    const[expression, setExpression] = useState(null);

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef,  });

        // Auto-detect mood every 5 seconds
        const interval = setInterval(async () => {
            if (videoRef.current && videoRef.current.videoWidth > 0) {
                const expression = await detect({ landmarkerRef, videoRef, setExpression });
                if (expression && expression !== "Neutral" && expression !== lastMood) {
                    setLastMood(expression);
                    onClick(expression);
                }
            }
        }, 5000);

        return () => {
            clearInterval(interval);
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }

            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach((track) => track.stop());
            }
        };
    }, []);

    async function handleClick() {
        // check video frame 
        if(!videoRef.current || videoRef.current.videoWidth === 0) {
            console.log("Video not ready yet");
            return ;
        }

        const expression = await detect({ landmarkerRef, videoRef, setExpression })
        console.log(expression)
        setLastMood(expression);
        onClick(expression)
    }

    async function handleRandomMood() {
        const moods = ["happy", "surprised", "sad", "neutral"];
        const randomMood = moods[Math.floor(Math.random() * moods.length)];
        setExpression(randomMood);
        setLastMood(randomMood);
        onClick(randomMood);
    }


    return (
        <div style={{ textAlign: "center" }}>
            <video
                ref={videoRef}
                autoPlay
                style={{ width: "400px", borderRadius: "12px" }}
                playsInline
            />
            <h2>{expression}</h2>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button style={{ width: "3rem", paddingInline: "2rem", backgroundColor: "lightseagreen", border: "none" }} onClick={handleClick}>Detect expression</button>
                <button style={{ width: "3rem", paddingInline: "2rem", backgroundColor: "orange", border: "none" }} onClick={handleRandomMood}>Random Mood</button>
            </div>
        </div>
    );
}