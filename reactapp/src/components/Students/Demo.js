import React, { useState, useRef, useEffect } from 'react';
import '../../assets/style/StudentCss/Demo.css';
import MetricsChart from '../Students/MetricsChart';

const mockQuestions = [
    "Tell me about yourself.",
    "Why do you want this job?",
    "What are your strengths and weaknesses?",
    "Describe a challenge you faced and how you handled it.",
    "Where do you see yourself in 5 years?"
];

const questionKeywords = {
    "Tell me about yourself.": ["experience", "background", "skills", "education"],
    "Why do you want this job?": ["interest", "company", "role", "contribution"],
    "What are your strengths and weaknesses?": ["strengths", "weaknesses", "improvement", "skills"],
    "Describe a challenge you faced and how you handled it.": ["challenge", "problem", "solution", "result"],
    "Where do you see yourself in 5 years?": ["future", "goals", "career", "progress"]
};

const analyzeText = (text, question) => {
    const keywords = questionKeywords[question] || [];
    const answerKeywords = text.toLowerCase().split(' ');

    let relevance = 0;
    let accuracy = 0;
    let efficiency = 0;

    const keywordMatch = keywords.filter(keyword => answerKeywords.includes(keyword)).length;
    const totalKeywords = keywords.length;

    relevance = (keywordMatch / totalKeywords) * 100;
    accuracy = Math.min(100, Math.max(0, relevance));
    efficiency = Math.min(100, Math.max(0, keywordMatch));

    return {
        relevance,
        accuracy,
        efficiency
    };
};

function Demo() {
    const [recording, setRecording] = useState(false);
    const [videoURL, setVideoURL] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [recordingCompleted, setRecordingCompleted] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [feedback, setFeedback] = useState('');
    const [relevance, setRelevance] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [efficiency, setEfficiency] = useState(0);
    const [tabSwitches, setTabSwitches] = useState(0);

    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const questionIndex = useRef(0);
    const speechRecognitionRef = useRef(null);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && recording) {
                setTabSwitches(prev => {
                    const newCount = prev + 1;
                    if (newCount >= 3) {
                        alert("Final tab switch count reached. The interview has ended.");
                        stopRecording();
                    } else {
                        alert(`Tab switches: ${newCount}`);
                    }
                    return newCount;
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [recording]);

    useEffect(() => {
        if (recording) {
            const questionInterval = setInterval(() => {
                questionIndex.current = (questionIndex.current + 1) % mockQuestions.length;
                setCurrentQuestion(mockQuestions[questionIndex.current]);
            }, 10000);
            return () => clearInterval(questionInterval);
        }
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

    useEffect(() => {
        if (transcription) {
            analyzeTranscription(transcription);
        }
    }, [transcription]);

    const analyzeTranscription = (transcription) => {
        const question = mockQuestions[questionIndex.current];
        const answer = transcription.trim();

        const analysisResults = analyzeText(answer, question);

        let feedbackMessage = '';
        if (analysisResults.relevance > 50) {
            feedbackMessage = 'Your answer is relevant to the question.';
        } else {
            feedbackMessage = 'Your answer may not be directly related to the question.';
        }

        setFeedback(feedbackMessage);
        setRelevance(analysisResults.relevance);
        setAccuracy(analysisResults.accuracy);
        setEfficiency(analysisResults.efficiency);
    };

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
            speechRecognitionRef.current.start();
        }).catch(error => {
            console.error('Error accessing media devices.', error);
        });
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
        if (videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }
        setRecording(false);
        setRecordingCompleted(true);
        speechRecognitionRef.current.stop();
    };

    return (
        <div className="demo-container">
            <h1>Mock Interview</h1>
            {!recordingCompleted ? (
                <>
                    <div className={`video-container ${currentQuestion ? 'large' : ''}`}>
                        <video 
                            ref={videoRef} 
                            className="video-frame" 
                            muted
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
                    {feedback && (
                        <div className="feedback-container">
                            <h2>Feedback:</h2>
                            <p>{feedback}</p>
                        </div>
                    )}
                    <div className="chart-container">
                        <MetricsChart 
                            relevance={relevance} 
                            accuracy={accuracy} 
                            efficiency={efficiency}
                        />
                    </div>
                </div>
            )}
            <div className="tab-switches-count">
                <h2>Tab Switches Count:</h2>
                <p>{tabSwitches}</p>
            </div>
        </div>
    );
}

export default Demo;
