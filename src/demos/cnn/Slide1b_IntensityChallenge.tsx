import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

// A simple gradient pattern
const PRESETS = [
    // 1. Diagonal Gradient
    [
        [0, 128, 255],
        [50, 150, 200],
        [100, 200, 255],
    ],
    // 2. Random/Hard
    [
        [200, 45, 120],
        [80, 240, 20],
        [15, 160, 210],
    ],
    // 3. Vertical Bars
    [
        [50, 150, 250],
        [50, 150, 250],
        [50, 150, 250],
    ],
];

const copy = {
    en: {
        targetImage: 'Target Image',
        yourReconstruction: 'Your Reconstruction',
        newChallenge: '🔄 New Challenge',
        checkScore: 'Check Score',
        scoreLabel: 'Score:',
        title: 'Challenge: Copy the Image!',
        bullets: [
            <><strong>0 = Black</strong>, <strong>255 = White</strong>.</>,
            <>Look at the Target Image on the left.</>,
            <>Type numbers into the grid on the right to match the brightness.</>,
            <>Get close to the target brightness to maximize your score!</>,
        ],
    },
    zh: {
        targetImage: '目标图像',
        yourReconstruction: '你的重建',
        newChallenge: '🔄 新挑战',
        checkScore: '查看得分',
        scoreLabel: '得分：',
        title: '挑战：临摹图像！',
        bullets: [
            <><strong>0 = 黑色</strong>，<strong>255 = 白色</strong>。</>,
            <>观察左侧的目标图像。</>,
            <>在右侧网格输入数字，匹配亮度。</>,
            <>越接近目标亮度，得分越高！</>,
        ],
    },
};

export const Slide1b_IntensityChallenge: React.FC = () => {
    const [presetIndex, setPresetIndex] = useState(0);
    const [userGrid, setUserGrid] = useState<number[][]>([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]);
    const [score, setScore] = useState<number | null>(null);
    const { language } = useLanguage();
    const t = copy[language];

    const targetGrid = PRESETS[presetIndex];

    const handleInputChange = (r: number, c: number, valStr: string) => {
        const val = Math.min(255, Math.max(0, Number(valStr) || 0));
        const newGrid = userGrid.map((row, rIndex) =>
            row.map((v, cIndex) => (rIndex === r && cIndex === c ? val : v))
        );
        setUserGrid(newGrid);
        setScore(null); // Reset score on change
    };

    const calculateScore = () => {
        let totalDiff = 0;
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                totalDiff += Math.abs(userGrid[r][c] - targetGrid[r][c]);
            }
        }
        // Max score 1000. Clamp at 0.
        const finalScore = Math.max(0, 1000 - totalDiff);
        setScore(finalScore);
    };

    const nextChallenge = () => {
        setPresetIndex((prev) => (prev + 1) % PRESETS.length);
        setUserGrid([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
        setScore(null);
    };

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>

                    <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>

                        {/* Target Block */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ marginBottom: '1rem', color: '#636e72' }}>{t.targetImage}</h4>
                            <div style={gridStyle}>
                                {targetGrid.map((row, r) =>
                                    row.map((val, c) => (
                                        <div
                                            key={`t-${r}-${c}`}
                                            style={{
                                                ...pixelStyle,
                                                backgroundColor: `rgb(${val}, ${val}, ${val})`,
                                            }}
                                        >
                                            {/* Show value on hover or always? Let's hide it to make it a challenge, or simple hover */}
                                        </div>
                                    ))
                                )}
                            </div>
                            <button
                                onClick={nextChallenge}
                                style={{
                                    marginTop: '1rem',
                                    padding: '0.4rem 0.8rem',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    backgroundColor: '#fff',
                                    border: '1px solid #b2bec3',
                                    borderRadius: '4px',
                                }}
                            >
                                {t.newChallenge}
                            </button>
                        </div>

                        {/* Separator */}
                        <div style={{ height: '150px', width: '1px', backgroundColor: '#e0e0e0', alignSelf: 'center' }} />

                        {/* User Block */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h4 style={{ marginBottom: '1rem', color: '#0984e3' }}>{t.yourReconstruction}</h4>
                            <div style={gridStyle}>
                                {userGrid.map((row, r) =>
                                    row.map((val, c) => (
                                        <div
                                            key={`u-${r}-${c}`}
                                            style={{
                                                ...pixelStyle,
                                                backgroundColor: `rgb(${val}, ${val}, ${val})`,
                                                position: 'relative',
                                            }}
                                        >
                                            <input
                                                type="text"
                                                value={val}
                                                onChange={(e) => handleInputChange(r, c, e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    textAlign: 'center',
                                                    color: val > 128 ? '#000' : '#fff', // Contrast text
                                                    fontSize: '1rem',
                                                    fontWeight: 'bold',
                                                }}
                                            />
                                        </div>
                                    ))
                                )}
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
                                {t.checkScore}
                            </button>
                        </div>

                    </div>

                    {/* Score Display */}
                    {score !== null && (
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: score === 1000 ? '#f1c40f' : score > 800 ? '#00b894' : '#d63031',
                            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}>
                            {t.scoreLabel} {score} / 1000
                        </div>
                    )}

                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>{t.title}</h3>
                <ul>
                    {t.bullets.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
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

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 60px)',
    gap: '4px',
    padding: '4px',
    backgroundColor: '#dfe6e9',
    borderRadius: '4px',
};

const pixelStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '2px',
};
