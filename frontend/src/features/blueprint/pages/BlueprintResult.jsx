import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlueprint } from '../hooks/useBlueprint';
import { downloadPdfProposal } from '../services/blueprint.api'; // Import the API
import '../styles/blueprint.scss';

const BlueprintResult = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { handleGetById, currentBlueprint, loading } = useBlueprint();
    
    // NEW: State to show a loading spinner on the button while Puppeteer works
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (id) handleGetById(id);
    }, [id]);

    // NEW: The function that handles the file download in the browser
    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const blob = await downloadPdfProposal(id);
            // Create a fake invisible link to force the browser to download the file
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Architecture_Proposal.pdf');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            alert("Failed to download PDF. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (loading || !currentBlueprint) {
        return (
            <div style={{ textAlign: 'center', padding: '100px' }}>
                <h2>Loading Architecture Blueprint...</h2>
            </div>
        );
    }

    return (
        <main className="blueprint-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <button 
                    onClick={() => navigate('/')}
                    style={{ padding: '8px 16px', cursor: 'pointer', background: '#e5e7eb', border: 'none', borderRadius: '5px' }}
                >
                    ← Back to Dashboard
                </button>

                {/* NEW: The Download Button */}
                <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    style={{ padding: '10px 20px', cursor: isDownloading ? 'not-allowed' : 'pointer', background: '#dc2626', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
                >
                    {isDownloading ? '🖨️ Generating PDF...' : '📄 Download Formal Proposal'}
                </button>
            </div>

            <h1 className="page-title">System Architecture Blueprint</h1>
            
            {/* ... The rest of your JSX sections (Overview, Tech Grid, Imports) stay exactly the same ... */}
            
            <section className="overview-card">
                <h2>System Overview</h2>
                <p>{currentBlueprint.systemOverview}</p>
            </section>

            {/* ... */}
        </main>
    );
};

export default BlueprintResult;