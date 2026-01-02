import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { AnimalFace, StageCard } from './shared';

const seedVectors = [
    [0.2, 0.8, 0.4, 0.6, 0.3, 0.7],
    [0.6, 0.3, 0.7, 0.2, 0.5, 0.4],
    [0.9, 0.6, 0.2, 0.8, 0.4, 0.5],
    [0.4, 0.2, 0.9, 0.5, 0.8, 0.3],
    [0.7, 0.5, 0.3, 0.6, 0.2, 0.9],
];

const seedOutputs = [
    [
        { catness: 0.8, energy: 0.3 },
        { catness: 0.6, energy: 0.5 },
        { catness: 0.45, energy: 0.4 },
        { catness: 0.7, energy: 0.6 },
    ],
    [
        { catness: 0.2, energy: 0.6 },
        { catness: 0.35, energy: 0.5 },
        { catness: 0.4, energy: 0.7 },
        { catness: 0.25, energy: 0.4 },
    ],
    [
        { catness: 0.65, energy: 0.4 },
        { catness: 0.55, energy: 0.7 },
        { catness: 0.75, energy: 0.6 },
        { catness: 0.5, energy: 0.5 },
    ],
    [
        { catness: 0.3, energy: 0.3 },
        { catness: 0.45, energy: 0.4 },
        { catness: 0.2, energy: 0.5 },
        { catness: 0.35, energy: 0.6 },
    ],
    [
        { catness: 0.9, energy: 0.5 },
        { catness: 0.75, energy: 0.4 },
        { catness: 0.6, energy: 0.6 },
        { catness: 0.85, energy: 0.7 },
    ],
];

const copy = {
    en: {
        title: '4. Sampling Turns Codes Into New Animals',
        bullets: [
            'Once we can decode, we can sample new codes.',
            'Each seed creates a different batch of animals.',
            'Generation means exploring the learned space.',
        ],
        seedLabel: 'Latent seed',
        outputLabel: 'Decoded batch',
        sliderLabel: 'Seed',
    },
    zh: {
        title: '4. Sampling Turns Codes Into New Animals',
        bullets: [
            'Once we can decode, we can sample new codes.',
            'Each seed creates a different batch of animals.',
            'Generation means exploring the learned space.',
        ],
        seedLabel: 'Latent seed',
        outputLabel: 'Decoded batch',
        sliderLabel: 'Seed',
    },
};

export const Slide4_SamplingLatent: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [seedIndex, setSeedIndex] = useState(0);

    const vector = seedVectors[seedIndex];
    const outputs = seedOutputs[seedIndex];

    return (
        <>
            <ConceptStage>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <StageCard title={t.seedLabel} tone="process">
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                                {vector.map((value, index) => (
                                    <div
                                        key={`latent-${index}`}
                                        style={{
                                            width: '16px',
                                            height: `${20 + value * 60}px`,
                                            backgroundColor: '#a5b4fc',
                                            borderRadius: '6px',
                                        }}
                                    />
                                ))}
                            </div>
                        </StageCard>

                        <div style={{ fontSize: '1.5rem', color: '#94a3b8', fontWeight: 700 }}>-&gt;</div>

                        <StageCard title={t.outputLabel} tone="output">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                                {outputs.map((output, index) => (
                                    <AnimalFace
                                        key={`out-${index}`}
                                        catness={output.catness}
                                        energy={output.energy}
                                        size={70}
                                    />
                                ))}
                            </div>
                        </StageCard>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontWeight: 600 }}>
                        {t.sliderLabel}
                        <input
                            type="range"
                            min={0}
                            max={seedVectors.length - 1}
                            value={seedIndex}
                            onChange={(event) => setSeedIndex(Number(event.target.value))}
                        />
                        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{seedIndex + 1}</span>
                    </label>
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
        </>
    );
};
