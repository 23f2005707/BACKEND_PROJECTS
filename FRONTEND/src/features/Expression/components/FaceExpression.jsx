import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";


export default function FaceExpression({ onClick = () => { } }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [ expression, setExpression ] = useState("Detecting...");

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
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
        onClick(expression)
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
            <button style = {{ paddingInline : "6rem", backgroundColor : "lightseagreen", border : "none", position: "absolute", left: "42%", top: "50%"}} onClick={handleClick} >Detect expression</button>
        </div>
    );
}