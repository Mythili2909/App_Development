import React, { useEffect, useRef, useState } from 'react';
import '../assets/style/VideoRec.css'; // Import the CSS file for styling

const mockQuestions = [
    "Tell me about yourself.",
    "Why do you want this job?",
    "What are your strengths and weaknesses?",
    "Describe a challenge you faced and how you handled it.",
    "Where do you see yourself in 5 years?"
];

function VideoRec() {
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [recordingCompleted, setRecordingCompleted] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [aiValidation, setAiValidation] = useState(''); // For AI validation result
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const questionIndex = useRef(0);
    const speechRecognitionRef = useRef(null);

    useEffect(() => {
        let questionInterval;
        if (recording) {
            setCurrentQuestion(mockQuestions[questionIndex.current]);
            questionInterval = setInterval(() => {
                questionIndex.current = (questionIndex.current + 1) % mockQuestions.length;
                setCurrentQuestion(mockQuestions[questionIndex.current]);
            }, 10000); // Change question every 10 seconds
        } else {
            setCurrentQuestion('');
            questionIndex.current = 0;
        }
        return () => clearInterval(questionInterval);
    }, [recording]);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.webkitSpeechRecognition;
            speechRecognitionRef.current = new SpeechRecognition();
            speechRecognitionRef.current.continuous = true;
            speechRecognitionRef.current.interimResults = true;
            speechRecognitionRef.current.lang = 'en-US';

            speechRecognitionRef.current.onresult = (event) => {
                let interimTranscription = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        setTranscription(prev => prev + event.results[i][0].transcript + ' ');
                    } else {
                        interimTranscription += event.results[i][0].transcript;
                    }
                }
                setTranscription(prev => prev + interimTranscription);
            };

            speechRecognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event);
            };
        } else {
            console.error('Speech Recognition API not supported in this browser.');
        }
    }, []);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            videoRef.current.srcObject = stream;
            videoRef.current.play();

            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                const blob = new Blob([event.data], { type: 'video/webm' });
                setVideoURL(URL.createObjectURL(blob));
            };
            mediaRecorderRef.current.start();
            setRecording(true);
            speechRecognitionRef.current && speechRecognitionRef.current.start();
        });
    };

    const stopRecording = () => {
        mediaRecorderRef.current && mediaRecorderRef.current.stop();
        if (videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setRecording(false);
        setRecordingCompleted(true);
        speechRecognitionRef.current && speechRecognitionRef.current.stop();

        // Process transcription for AI validation
        validateTranscriptionWithAI(transcription).then(validationResult => {
            setAiValidation(validationResult);
        });
    };

    const validateTranscriptionWithAI = async (transcription) => {
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transcription })
            });
            const result = await response.json();
            return result; // Expecting a comprehensive result with analysis details
        } catch (error) {
            console.error('AI validation error', error);
            return { validation: 'Error validating transcription', detailedFeedback: null };
        }
    };
    
    return (
        <div className="video-rec-container">
            <h1>Mock Interview</h1>
            {!recordingCompleted ? (
                <>
                    <div className={`video-container ${currentQuestion ? 'large' : ''}`}>
                        <video 
                            ref={videoRef} 
                            controls 
                            className="video-frame"
                        />
                    </div>
                    <div className="button-container">
                        {!recording ? (
                            <button className="start-button" onClick={startRecording}>Start Recording</button>
                        ) : (
                            <button className="stop-button" onClick={stopRecording}>Stop Recording</button>
                        )}
                    </div>
                    {currentQuestion && (
                        <div className="question-popup">
                            <h2>Current Question:</h2>
                            <p>{currentQuestion}</p>
                        </div>
                    )}
                    {transcription && (
                        <div className="transcription-container">
                            <h2>Transcription:</h2>
                            <p>{transcription}</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="video-preview-container">
                    {videoURL && (
                        <>
                            <h2>Recorded Video:</h2>
                            <video src={videoURL} width="400" controls className="video-preview" />
                        </>
                    )}
                    {transcription && (
                        <div className="transcription-container">
                            <h2>Transcription:</h2>
                            <p>{transcription}</p>
                        </div>
                    )}
                    {aiValidation && (
                        <div className="ai-validation-container">
                            <h2>AI Validation:</h2>
                            <p>{aiValidation}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default VideoRec;
