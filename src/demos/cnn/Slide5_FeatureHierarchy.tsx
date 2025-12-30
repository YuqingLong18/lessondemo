import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';

export const Slide5_FeatureHierarchy: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState<string | null>(null);

    const layers = [
        { id: 'objects', label: 'Objects (Face)', color: '#fd79a8', example: '🐶' },
        { id: 'parts', label: 'Parts (Eyes, Ears)', color: '#74b9ff', example: '👁️ 👂' },
        { id: 'edges', label: 'Edges / Curves', color: '#55efc4', example: '— | /' },
        { id: 'pixels', label: 'Pixels', color: '#b2bec3', example: '102, 45, 88' },
    ];

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <h2 style={{ color: '#2d3436' }}>The CNN Hierarchy</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '300px' }}>
                        {layers.map((layer, index) => {
                            const width = 300 - index * 60; // Pyramid shape
                            const isActive = activeLayer === layer.id;

                            return (
                                <div
                                    key={layer.id}
                                    onMouseEnter={() => setActiveLayer(layer.id)}
                                    onMouseLeave={() => setActiveLayer(null)}
                                    style={{
                                        alignSelf: 'center',
                                        width: `${width}px`,
                                        height: '60px',
                                        backgroundColor: layer.color,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s, opacity 0.2s',
                                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                        opacity: activeLayer && !isActive ? 0.6 : 1,
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                        position: 'relative',
                                        color: '#2d3436',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {layer.label}

                                    {isActive && (
                                        <div style={{
                                            position: 'absolute',
                                            right: '-140px',
                                            backgroundColor: 'white',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                            width: '120px',
                                            textAlign: 'center',
                                            fontSize: '1.2rem',
                                        }}>
                                            {layer.example}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>4. Feature Hierarchy</h3>
                <ul>
                    <li>CNNs understand images in <strong>layers</strong>.</li>
                    <li><strong>Bottom:</strong> It sees raw numbers (pixels).</li>
                    <li><strong>Middle:</strong> It finds lines, curves, and blobs.</li>
                    <li><strong>Top:</strong> It combines them into eyes, noses, and finally... a Dog!</li>
                    <li>Hover over the pyramid to see what each layer "sees".</li>
                </ul>
            </ExplainPanel>
        </>
    );
};
