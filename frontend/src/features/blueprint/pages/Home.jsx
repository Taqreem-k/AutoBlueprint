import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlueprint } from '../hooks/useBlueprint';

const Home = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const { handleGenerate, loading } = useBlueprint();
    const navigate = useNavigate();
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionRef = useRef(null);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            if (!SpeechRecognition) {
                alert("Your browser does not support Voice Recognition. Please type your idea.");
                return;
            }
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onresult = (event) => {
                let currentTranscript = '';
                for (let i = 0; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setTranscript(currentTranscript);
            };

            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const onSubmit = async () => {
        if (!transcript.trim()) return;
        const blueprint = await handleGenerate(transcript);
        if (blueprint && blueprint._id) {
            navigate(`/blueprint/${blueprint._id}`);
        }
    };

    if (loading) return <h1>Synthesizing Architecture Blueprint... Please wait.</h1>;

    return (
        <main className="home-container">
            <h1>AutoBlueprint Synthesizer</h1>
            <p>Describe your app idea, business goals, and preferred tech stack.</p>
            
            <button 
                onClick={toggleListening} 
                style={{ backgroundColor: isListening ? 'red' : 'blue', color: 'white', padding: '10px' }}
            >
                {isListening ? '🛑 Stop Recording' : '🎤 Start Recording'}
            </button>

            <textarea 
                rows="8" 
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Or manually type your app requirements here..."
                style={{ width: '100%', marginTop: '20px' }}
            />

            <button onClick={onSubmit} style={{ marginTop: '20px', padding: '10px' }}>
                Generate System Architecture
            </button>
        </main>
    );
};

export default Home;