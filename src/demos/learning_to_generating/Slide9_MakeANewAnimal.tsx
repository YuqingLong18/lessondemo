import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { AnimalFace, StageCard } from './shared';

const copy = {
    en: {
        title: '9. From Learning to Generating',
        bullets: [
            'Representations let us steer what we generate.',
            'Adjust the sliders to guide the output.',
            'This is how models move from learning to creating.',
        ],
        latent: 'Latent controls',
        output: 'Generated animal',
        catness: 'Catness',
        energy: 'Energy',
    },
    zh: {
        title: '9. From Learning to Generating',
        bullets: [
            'Representations let us steer what we generate.',
            'Adjust the sliders to guide the output.',
            'This is how models move from learning to creating.',
        ],
        latent: 'Latent controls',
        output: 'Generated animal',
        catness: 'Catness',
        energy: 'Energy',
    },
};

export const Slide9_MakeANewAnimal: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [catness, setCatness] = useState(0.6);
    const [energy, setEnergy] = useState(0.55);

    const vector = useMemo(() => [catness, energy, 1 - catness, 1 - energy], [catness, energy]);

    return (
        <>
            <ConceptStage>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                        <StageCard title={t.latent} tone="process">
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                                    {t.catness}
                                    <input
                                        type="range"
                                        min={0}
                                        max={1}
                                        step={0.05}
                                        value={catness}
                                        onChange={(event) => setCatness(Number(event.target.value))}
                                    />
                                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{catness.toFixed(2)}</span>
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                                    {t.energy}
                                    <input
                                        type="range"
                                        min={0}
                                        max={1}
                                        step={0.05}
                                        value={energy}
                                        onChange={(event) => setEnergy(Number(event.target.value))}
                                    />
                                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{energy.toFixed(2)}</span>
                                </label>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                                    {vector.map((value, index) => (
                                        <div
                                            key={`latent-${index}`}
                                            style={{
                                                width: '16px',
                                                height: `${22 + value * 60}px`,
                                                backgroundColor: '#93c5fd',
                                                borderRadius: '6px',
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </StageCard>

                        <div style={{ fontSize: '1.5rem', color: '#94a3b8', fontWeight: 700 }}>-&gt;</div>

                        <StageCard title={t.output} tone="output">
                            <AnimalFace catness={catness} energy={energy} size={150} />
                        </StageCard>
                    </div>
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
