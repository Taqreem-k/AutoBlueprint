import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBlueprint } from '../hooks/useBlueprint';

const Home = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    
    const { handleGenerate, handleGetAll, blueprints, loading } = useBlueprint();
    const navigate = useNavigate();
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionRef = useRef(null);

    useEffect(() => {
        handleGetAll();
    }, []);

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
        <main style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {/* --- TOP SECTION: GENERATION --- */}
            <section style={{ marginBottom: '50px' }}>
                <h1>AutoBlueprint Synthesizer</h1>
                <p>Describe your app idea, business goals, and preferred tech stack.</p>
                
                <button 
                    onClick={toggleListening} 
                    style={{ backgroundColor: isListening ? '#dc2626' : '#2563eb', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    {isListening ? '🛑 Stop Recording' : '🎤 Start Recording'}
                </button>

                <textarea 
                    rows="8" 
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Or manually type your app requirements here..."
                    style={{ width: '100%', marginTop: '20px', padding: '15px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                />

                <button 
                    onClick={onSubmit} 
                    style={{ marginTop: '20px', padding: '12px 24px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', fontSize: '1.1rem' }}
                >
                    Generate System Architecture
                </button>
            </section>

            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '30px' }} />

            {/* --- BOTTOM SECTION: HISTORY DASHBOARD --- */}
            <section>
                <h2>Recent Blueprints</h2>
                {blueprints.length === 0 ? (
                    <p style={{ color: '#6b7280' }}>No blueprints generated yet. Start talking to build your first one!</p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px', marginTop: '20px' }}>
                        {blueprints.map((bp) => (
                            <div 
                                key={bp._id} 
                                onClick={() => navigate(`/blueprint/${bp._id}`)}
                                style={{ border: '1px solid #e5e7eb', padding: '15px', borderRadius: '8px', cursor: 'pointer', transition: 'box-shadow 0.2s', backgroundColor: '#f9fafb' }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                            >
                                <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '0 0 5px 0' }}>
                                    {new Date(bp.createdAt).toLocaleDateString()}
                                </p>
                                {/* We slice the transcript so the card doesn't get massive */}
                                <h3 style={{ fontSize: '1rem', margin: '0', color: '#111827' }}>
                                    {bp.transcript.slice(0, 40)}...
                                </h3>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Home;