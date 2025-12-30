import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';

const PRESETS = [
    { name: 'Purple', r: 128, g: 0, b: 128 },
    { name: 'Orange', r: 255, g: 165, b: 0 },
    { name: 'Teal', r: 0, g: 128, b: 128 },
];

export const Slide2b_RGBChallenge: React.FC = () => {
    const [presetIndex, setPresetIndex] = useState(0);
    const [userColor, setUserColor] = useState({ r: 0, g: 0, b: 0 });
    const [score, setScore] = useState<number | null>(null);

    const target = PRESETS[presetIndex];

    const handleChange = (channel: 'r' | 'g' | 'b', valStr: string) => {
        const val = Math.min(255, Math.max(0, Number(valStr) || 0));
        setUserColor(prev => ({ ...prev, [channel]: val }));
        setScore(null);
    };

    const nextChallenge = () => {
        setPresetIndex((prev) => (prev + 1) % PRESETS.length);
        setUserColor({ r: 0, g: 0, b: 0 });
        setScore(null);
    };

    const calculateScore = () => {
        const totalDiff =
            Math.abs(userColor.r - target.r) +
            Math.abs(userColor.g - target.g) +
            Math.abs(userColor.b - target.b);

        // Max score 1000. Clamp at 0.
        const finalScore = Math.max(0, 1000 - totalDiff);
        setScore(finalScore);
    };

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>

                    <div style={{ display: 'flex', gap: '5rem', alignItems: 'flex-start' }}>

                        {/* Target */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ color: '#636e72', marginBottom: '1rem' }}>Target Color</h4>
                            <div
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    backgroundColor: `rgb(${target.r}, ${target.g}, ${target.b})`,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    marginBottom: '1rem'
                                }}
                            />
                            <button
                                onClick={nextChallenge}
                                style={{
                                    padding: '0.4rem 0.8rem',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    border: '1px solid #b2bec3',
                                    borderRadius: '4px',
                                }}
                            >
                                🔄 New Color
                            </button>
                        </div>

                        {/* User Input */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ color: '#0984e3', marginBottom: '1rem' }}>Your Mix</h4>
                            <div
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    backgroundColor: `rgb(${userColor.r}, ${userColor.g}, ${userColor.b})`,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    border: '4px solid #dfe6e9',
                                    marginBottom: '1rem',
                                    transition: 'background-color 0.2s'
                                }}
                            />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '200px' }}>
                                <InputRow label="R" val={userColor.r} onChange={(v) => handleChange('r', v)} color="red" />
                                <InputRow label="G" val={userColor.g} onChange={(v) => handleChange('g', v)} color="green" />
                                <InputRow label="B" val={userColor.b} onChange={(v) => handleChange('b', v)} color="blue" />
                            </div>

                            <button
                                onClick={calculateScore}
                                style={{
                                    marginTop: '1.5rem',
                                    padding: '0.6rem 2rem',
                                    backgroundColor: '#00b894',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                }}
                            >
                                Check Score
                            </button>
                        </div>
                    </div>

                    {/* Score Display */}
                    {score !== null && (
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: 'bold',
                            color: score === 1000 ? '#f1c40f' : score > 850 ? '#00b894' : '#d63031',
                            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            Score: {score} / 1000
                        </div>
                    )}

                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>Challenge: Match the Color!</h3>
                <ul>
                    <li>Can you guess the recipe for this color?</li>
                    <li>Drag the <strong>Red</strong>, <strong>Green</strong>, and <strong>Blue</strong> sliders to match the color.</li>
                    <li>The closer your color looks to the target, the higher your score.</li>
                </ul>
            </ExplainPanel>
            <style>{`
                @keyframes popIn {
                from { transform: scale(0.5); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </>
    );
};

const InputRow = ({ label, val, onChange, color }: { label: string, val: number, onChange: (v: string) => void, color: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <strong style={{ width: '20px', color }}>{label}</strong>
        <input
            type="range"
            min="0"
            max="255"
            value={val}
            onChange={(e) => onChange(e.target.value)}
            style={{
                flex: 1,
                cursor: 'pointer'
            }}
        />
        <span style={{ width: '30px', textAlign: 'right', fontSize: '0.9rem', color: '#636e72', fontVariantNumeric: 'tabular-nums' }}>
            {val}
        </span>
    </div>
);
