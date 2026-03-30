// import {
//     FaceLandmarker,
//     FilesetResolver
// } from "@mediapipe/tasks-vision";

// // set upthe mediapipe initial setup
// export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
//     const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
//     );

//     landmarkerRef.current = await FaceLandmarker.createFromOptions(
//         vision,
//         {
//             baseOptions: {
//                 modelAssetPath:
//                     "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
//             },
//             outputFaceBlendshapes: true,
//             runningMode: "VIDEO",
//             numFaces: 1
//         }
//     );

//     streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = streamRef.current;
//     await videoRef.current.play();
// };

// // track the face expressions. 
// export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
//     if (!landmarkerRef.current || !videoRef.current) return;

//     const results = landmarkerRef.current.detectForVideo(
//         videoRef.current,
//         performance.now()
//     );

//     if (results.faceBlendshapes?.length > 0) {
//         const blendshapes = results.faceBlendshapes[ 0 ].categories;

//         const getScore = (name) =>
//             blendshapes.find((b) => b.categoryName === name)?.score || 0;

//         const smileLeft = getScore("mouthSmileLeft");
//         const smileRight = getScore("mouthSmileRight");
//         const jawOpen = getScore("jawOpen");
//         const browUp = getScore("browInnerUp");
//         const frownLeft = getScore("mouthFrownLeft");
//         const frownRight = getScore("mouthFrownRight");

//         console.log(getScore("mouthFrownLeft"))

//         let currentExpression = "Neutral";

//         if (smileLeft > 0.5 && smileRight > 0.5) {
//             currentExpression = "happy";
//         } else if (jawOpen > 0.2 && browUp > 0.2) {
//             currentExpression = "surprised";
//         } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
//             currentExpression = "sad";
//         }

//         setExpression(currentExpression);

//         return currentExpression
//     }
// };






import {
    FaceLandmarker,
    FilesetResolver
} from "@mediapipe/tasks-vision";

// 🔥 INIT MEDIAPIPE
export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    try {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        landmarkerRef.current = await FaceLandmarker.createFromOptions(
            vision,
            {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
                },
                outputFaceBlendshapes: true,
                runningMode: "VIDEO",
                numFaces: 1
            }
        );

        // 🎥 Start camera
        streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play();

    } catch (err) {
        console.error("Init error:", err);
    }
};


// 🔍 DETECT EXPRESSION
export const detect = async ({ landmarkerRef, videoRef, setExpression }) => {

    if (!landmarkerRef.current || !videoRef.current) return null;

    try {
        const results = landmarkerRef.current.detectForVideo(
            videoRef.current,
            performance.now()
        );

        if (!results.faceBlendshapes?.length) return null;

        const blendshapes = results.faceBlendshapes[0].categories;

        const getScore = (name) =>
            blendshapes.find((b) => b.categoryName === name)?.score || 0;

        // 😊 HAPPY
        const smileLeft = getScore("mouthSmileLeft");
        const smileRight = getScore("mouthSmileRight");

        // 😲 SURPRISED
        const jawOpen = getScore("jawOpen");
        const browUp = getScore("browInnerUp");

        // 😢 SAD
        const frownLeft = getScore("mouthFrownLeft");
        const frownRight = getScore("mouthFrownRight");

        // 😤 ANGRY (NEW 🔥)
        const browDownLeft = getScore("browDownLeft");
        const browDownRight = getScore("browDownRight");
        const noseSneerLeft = getScore("noseSneerLeft");
        const noseSneerRight = getScore("noseSneerRight");
        const mouthPressLeft = getScore("mouthPressLeft");
        const mouthPressRight = getScore("mouthPressRight");

        const angryScore =
            (browDownLeft + browDownRight) / 2 +
            (noseSneerLeft + noseSneerRight) / 2 +
            (mouthPressLeft + mouthPressRight) / 2;

        let currentExpression = "neutral";

        // 🔥 PRIORITY ORDER (important)
        if (smileLeft > 0.5 && smileRight > 0.5) {
            currentExpression = "happy";
        } else if (jawOpen > 0.2 && browUp > 0.2) {
            currentExpression = "surprised";
        } else if (frownLeft > 0.0001 && frownRight > 0.0001) {
            currentExpression = "sad";
        }

        setExpression(currentExpression);
        
        return currentExpression;

    } catch (err) {
        console.error("Detection error:", err);
        return null;
    }
};