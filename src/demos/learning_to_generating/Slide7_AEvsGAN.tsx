import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import catImage from '../../assets/cute_cat.png';
import { AnimalFace, PillButton, StageCard } from './shared';

const noiseVector = [0.6, 0.3, 0.7, 0.5];

const copy = {
    en: {
        title: '7. Autoencoder vs GAN Objectives',
        bullets: [
            'Autoencoders focus on faithful reconstruction.',
            'GANs focus on realism and variety.',
            'Compare which goal you want the model to optimize.',
        ],
        autoencoder: 'Autoencoder',
        gan: 'GAN',
        input: 'Input',
        reconstruction: 'Reconstruction',
        noise: 'Noise',
        generated: 'Generated',
    },
    zh: {
        title: '7. Autoencoder vs GAN Objectives',
        bullets: [
            'Autoencoders focus on faithful reconstruction.',
            'GANs focus on realism and variety.',
            'Compare which goal you want the model to optimize.',
        ],
        autoencoder: 'Autoencoder',
        gan: 'GAN',
        input: 'Input',
        reconstruction: 'Reconstruction',
        noise: 'Noise',
        generated: 'Generated',
    },
};

export const Slide7_AEvsGAN: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [focus, setFocus] = useState<'autoencoder' | 'gan'>('autoencoder');

    const highlightStyle = (isActive: boolean) => ({
        border: isActive ? '2px solid #60a5fa' : '2px solid transparent',
        borderRadius: '16px',
        padding: '2px',
        opacity: isActive ? 1 : 0.7,
        transition: 'opacity 0.2s',
    });

    return (
        <>
            <ConceptStage>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.4rem', flex: 1 }}>
                        <div style={highlightStyle(focus === 'autoencoder')}>
                            <StageCard title={t.autoencoder} tone="input">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.input}</div>
                                    <img src={catImage} alt="cat input" style={{ maxHeight: '90px' }} />
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.reconstruction}</div>
                                    <img src={catImage} alt="cat reconstruction" style={{ maxHeight: '90px', filter: 'blur(1px)' }} />
                                </div>
                            </StageCard>
                        </div>
                        <div style={highlightStyle(focus === 'gan')}>
                            <StageCard title={t.gan} tone="process">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', alignItems: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.noise}</div>
                                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-end' }}>
                                        {noiseVector.map((value, index) => (
                                            <div
                                                key={`noise-${index}`}
                                                style={{
                                                    width: '14px',
                                                    height: `${20 + value * 50}px`,
                                                    backgroundColor: '#fcd34d',
                                                    borderRadius: '6px',
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.generated}</div>
                                    <AnimalFace catness={0.5} energy={0.6} size={90} />
                                </div>
                            </StageCard>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                        <PillButton label={t.autoencoder} active={focus === 'autoencoder'} onClick={() => setFocus('autoencoder')} />
                        <PillButton label={t.gan} active={focus === 'gan'} onClick={() => setFocus('gan')} />
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
