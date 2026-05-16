import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlueprint } from '../hooks/useBlueprint';
import '../styles/blueprint.scss'; // IMPORTANT: Importing the new styles!

const BlueprintResult = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleGetById, currentBlueprint, loading } = useBlueprint();

    useEffect(() => {
        if (id) {
            handleGetById(id);
        }
    }, [id]);

    if (loading || !currentBlueprint) {
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <h2>Loading Architecture Blueprint...</h2>
            </div>
        );
    }

    return (
        <main className="blueprint-container">
            <button 
                onClick={() => navigate('/')}
                style={{ marginBottom: '20px', padding: '8px 16px', cursor: 'pointer', background: '#e5e7eb', border: 'none', borderRadius: '5px' }}
            >
                ← Back to Dashboard
            </button>

            <h1 className="page-title">System Architecture Blueprint</h1>
            
            <section className="overview-card">
                <h2>System Overview</h2>
                <p>{currentBlueprint.systemOverview}</p>
            </section>

            <h2 className="section-header">Core Tech Stack</h2>
            <section className="tech-grid">
                <div className="tech-column">
                    <h3>Frontend</h3>
                    <ul>
                        {currentBlueprint.techStack.frontend.map(t => <li key={t}>{t}</li>)}
                    </ul>
                </div>
                
                <div className="tech-column">
                    <h3>Backend</h3>
                    <ul>
                        {currentBlueprint.techStack.backend.map(t => <li key={t}>{t}</li>)}
                    </ul>
                </div>
                
                <div className="tech-column">
                    <h3>Database & Cache</h3>
                    <ul>
                        {currentBlueprint.techStack.database.map(t => <li key={t}>{t}</li>)}
                    </ul>
                </div>

                <div className="tech-column">
                    <h3>Infrastructure</h3>
                    <ul>
                        {currentBlueprint.techStack.infrastructure?.map(t => <li key={t}>{t}</li>)}
                    </ul>
                </div>
            </section>

            <h2 className="section-header">Required Packages & Imports</h2>
            <section className="imports-list">
                {currentBlueprint.requiredImports.map((pkg, idx) => (
                    <div className="import-item" key={idx}>
                        <h4>{pkg.technology}</h4>
                        
                        <div className="code-block-wrapper">
                            <span className="cmd-label">Installation</span>
                            <pre><code>{pkg.installCommand}</code></pre>
                        </div>

                        <div className="code-block-wrapper">
                            <span className="cmd-label">Usage / Import</span>
                            <pre><code>{pkg.importStatement}</code></pre>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default BlueprintResult;