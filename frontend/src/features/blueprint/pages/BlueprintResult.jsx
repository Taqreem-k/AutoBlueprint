import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBlueprint } from '../hooks/useBlueprint';

const BlueprintResult = () => {
    const { id } = useParams();
    const { handleGetById, currentBlueprint, loading } = useBlueprint();

    useEffect(() => {
        if (id) {
            handleGetById(id);
        }
    }, [id]);

    if (loading || !currentBlueprint) return <h1>Loading Blueprint Data...</h1>;

    return (
        <main style={{ padding: '20px' }}>
            <h1>System Architecture Blueprint</h1>
            
            <section>
                <h2>System Overview</h2>
                <p>{currentBlueprint.systemOverview}</p>
            </section>

            <section style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                <div style={{ border: '1px solid gray', padding: '10px', flex: 1 }}>
                    <h3>Frontend</h3>
                    <ul>{currentBlueprint.techStack.frontend.map(t => <li key={t}>{t}</li>)}</ul>
                </div>
                <div style={{ border: '1px solid gray', padding: '10px', flex: 1 }}>
                    <h3>Backend</h3>
                    <ul>{currentBlueprint.techStack.backend.map(t => <li key={t}>{t}</li>)}</ul>
                </div>
                <div style={{ border: '1px solid gray', padding: '10px', flex: 1 }}>
                    <h3>Database</h3>
                    <ul>{currentBlueprint.techStack.database.map(t => <li key={t}>{t}</li>)}</ul>
                </div>
            </section>

            <section style={{ marginTop: '30px' }}>
                <h2>Required Imports & Installations</h2>
                {currentBlueprint.requiredImports.map((pkg, idx) => (
                    <div key={idx} style={{ marginBottom: '15px', background: '#f4f4f4', padding: '10px' }}>
                        <strong>{pkg.technology}</strong>
                        <pre><code>{pkg.installCommand}</code></pre>
                        <pre><code>{pkg.importStatement}</code></pre>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default BlueprintResult;