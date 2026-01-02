import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import catImage from '../../assets/cute_cat.png';
import dogImage from '../../assets/cute_dog.png';
import { PillButton, StageCard } from './shared';

const codeValues = [0.9, 0.4, 0.7, 0.5, 0.6, 0.35, 0.8, 0.45];

const copy = {
    en: {
        title: '2. Autoencoders Compress and Rebuild',
        bullets: [
            'The encoder squeezes the input into a small code.',
            'The decoder rebuilds the image from that code.',
            'Smaller bottlenecks lose detail.',
        ],
        inputLabel: 'Input image',
        codeLabel: 'Latent code',
        outputLabel: 'Reconstruction',
        bottleneckLabel: 'Bottleneck size',
        cat: 'Cat',
        dog: 'Dog',
    },
    zh: {
        title: '2. Autoencoders Compress and Rebuild',
        bullets: [
            'The encoder squeezes the input into a small code.',
            'The decoder rebuilds the image from that code.',
            'Smaller bottlenecks lose detail.',
        ],
        inputLabel: 'Input image',
        codeLabel: 'Latent code',
        outputLabel: 'Reconstruction',
        bottleneckLabel: 'Bottleneck size',
        cat: 'Cat',
        dog: 'Dog',
    },
};

export const Slide2_AutoencoderCompression: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [bottleneck, setBottleneck] = useState(4);
    const [animal, setAnimal] = useState<'cat' | 'dog'>('cat');

    const blurAmount = (8 - bottleneck) * 0.7;
    const imageSource = animal === 'cat' ? catImage : dogImage;

    return (
        <>
            <ConceptStage>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <StageCard title={t.inputLabel} tone="input">
                            <img src={imageSource} alt={animal} style={{ maxWidth: '100%', maxHeight: '160px' }} />
                        </StageCard>

                        <div style={{ fontSize: '1.5rem', color: '#94a3b8', fontWeight: 700 }}>-&gt;</div>

                        <StageCard title={t.codeLabel} tone="process">
                            <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'flex-end' }}>
                                {codeValues.map((value, index) => {
                                    const isActive = index < bottleneck;
                                    return (
                                        <div
                                            key={`code-${index}`}
                                            style={{
                                                width: '14px',
                                                height: `${28 + value * 50}px`,
                                                backgroundColor: isActive ? '#fbbf24' : '#e5e7eb',
                                                borderRadius: '6px',
                                                transition: 'background-color 0.2s',
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </StageCard>

                        <div style={{ fontSize: '1.5rem', color: '#94a3b8', fontWeight: 700 }}>-&gt;</div>

                        <StageCard title={t.outputLabel} tone="output">
                            <img
                                src={imageSource}
                                alt={`${animal} reconstruction`}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '160px',
                                    filter: `blur(${blurAmount}px)`,
                                }}
                            />
                        </StageCard>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                            {t.bottleneckLabel}
                            <input
                                type="range"
                                min={2}
                                max={8}
                                value={bottleneck}
                                onChange={(event) => setBottleneck(Number(event.target.value))}
                            />
                            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{bottleneck}</span>
                        </label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <PillButton label={t.cat} active={animal === 'cat'} onClick={() => setAnimal('cat')} />
                            <PillButton label={t.dog} active={animal === 'dog'} onClick={() => setAnimal('dog')} />
                        </div>
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
