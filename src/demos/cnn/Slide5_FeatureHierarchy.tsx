import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';

const LAYERS = [
    {
        level: 'Input',
        desc: 'Raw Pixels',
        visual: 'Grid of colored numbers',
        detail: 'The computer sees 3 matrices (R, G, B) of numbers. No meaning yet.',
    },
    {
        level: 'Low-Level',
        desc: 'Edges & Lines',
        visual: 'Simple Gradients',
        detail: 'Filters detect simple geometric primitives: vertical lines, diagonals, color gradients.',
    },
    {
        level: 'Mid-Level',
        desc: 'Shapes & Parts',
        visual: 'Circles, Corners, Eyes',
        detail: 'By combining edges, the network finds simple shapes: circles, squares, or specific parts like an eye.',
    },
    {
        level: 'High-Level',
        desc: 'Object Concepts',
        visual: 'Faces, Cars, Cats',
        detail: 'Combining shapes reveals complex objects. This layer "knows" what a face looks like.',
    },
];

export const Slide5_FeatureHierarchy: React.FC = () => {
    const [activeLayer, setActiveLayer] = useState(0);

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
                    {/* Layer Pyramid */}
                    <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '10px' }}>
                        {LAYERS.map((layer, idx) => (
                            <div
                                key={layer.level}
                                onClick={() => setActiveLayer(idx)}
                                style={{
                                    width: `${300 - idx * 40}px`, // Tapering width
                                    height: '60px',
                                    backgroundColor: activeLayer === idx ? '#0984e3' : '#74b9ff',
                                    color: '#fff',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    boxShadow: activeLayer === idx ? '0 0 10px rgba(9, 132, 227, 0.5)' : 'none',
                                    transition: 'all 0.3s',
                                    marginLeft: `${idx * 20}px`, // Centering effect
                                }}
                            >
                                {layer.level}
                            </div>
                        ))}
                    </div>

                    {/* Info Box */}
                    <div
                        style={{
                            width: '300px',
                            height: '300px',
                            border: '2px dashed #b2bec3',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2rem',
                            textAlign: 'center',
                            backgroundColor: '#fdfeff',
                        }}
                    >
                        <h2 style={{ color: '#2d3436', margin: 0, marginBottom: '0.5rem' }}>
                            {LAYERS[activeLayer].desc}
                        </h2>
                        <div style={{ fontSize: '3rem', margin: '1rem' }}>
                            {/* Simple Emoji visualization of complexity */}
                            {activeLayer === 0 && '🔢'}
                            {activeLayer === 1 && '➖'}
                            {activeLayer === 2 && '👁️'}
                            {activeLayer === 3 && '🧑'}
                        </div>
                        <p style={{ color: '#636e72', lineHeight: '1.4' }}>
                            {LAYERS[activeLayer].detail}
                        </p>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>5. Standard Hierarchy</h3>
                <ul>
                    <li>Deep Learning is "Deep" because it stacks these layers.</li>
                    <li><strong>Bottom:</strong> Simple dots and lines.</li>
                    <li><strong>Top:</strong> Complex concepts (Faces, Cars).</li>
                    <li>We go from <em>meaningless numbers</em> to <em>meaningful concepts</em>.</li>
                </ul>
            </ExplainPanel>
        </>
    );
};
