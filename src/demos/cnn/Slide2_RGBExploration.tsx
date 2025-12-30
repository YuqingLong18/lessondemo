import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';

export const Slide2_RGBExploration: React.FC = () => {
    const [r, setR] = useState(100);
    const [g, setG] = useState(149);
    const [b, setB] = useState(237); // Default: Cornflower Blueish

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    {/* Main Mixed Color */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                            style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: `rgb(${r},${g},${b})`,
                                borderRadius: '50%',
                                marginBottom: '1rem',
                                border: '4px solid #fff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                            }}
                        />
                        <div style={{ fontFamily: 'monospace', fontSize: '1.2rem' }}>
                            rgb({r}, {g}, {b})
                        </div>
                    </div>

                    {/* Matrix Decomposition */}
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <ChannelBox label="Red" val={r} color="#ff7675" />
                        <ChannelBox label="Green" val={g} color="#55efc4" />
                        <ChannelBox label="Blue" val={b} color="#74b9ff" />
                    </div>

                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '300px', marginTop: '1rem' }}>
                        <ColorSlider label="R" val={r} setVal={setR} color="red" />
                        <ColorSlider label="G" val={g} setVal={setG} color="green" />
                        <ColorSlider label="B" val={b} setVal={setB} color="blue" />
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>2. Color = 3 Matrices</h3>
                <ul>
                    <li>Colored images aren't just one grid; they are a stack of <strong>three grids</strong> (Red, Green, Blue).</li>
                    <li>We call these "Channels".</li>
                    <li>For a 10x10 color image, the computer sees a 10x10x3 block of numbers.</li>
                </ul>
            </ExplainPanel>
        </>
    );
};

const ChannelBox = ({ label, val, color }: { label: string; val: number; color: string }) => (
    <div
        style={{
            width: '80px',
            height: '80px',
            backgroundColor: color,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            color: '#2d3436',
            fontWeight: 'bold',
            opacity: val / 255 + 0.2, // Visual feedback for intensity
        }}
    >
        <span>{label}</span>
        <span style={{ fontSize: '1.5rem' }}>{val}</span>
    </div>
);

const ColorSlider = ({
    label,
    val,
    setVal,
    color,
}: {
    label: string;
    val: number;
    setVal: (v: number) => void;
    color: string;
}) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <strong style={{ width: '20px', color }}>{label}</strong>
        <input
            type="range"
            min="0"
            max="255"
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            style={{ flex: 1 }}
        />
    </div>
);
