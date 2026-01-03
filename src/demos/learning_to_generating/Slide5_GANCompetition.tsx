import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import catImage from '../../assets/cute_cat.png';
import { AnimalFace, MeterBar, StageCard } from './shared';

const noiseVector = [0.3, 0.8, 0.5, 0.6, 0.4];

const copy = {
    en: {
        title: '5. GANs Learn by Competing',
        bullets: [
            'The generator creates fakes from noise.',
            'The discriminator tries to spot real vs fake.',
            'Competition pushes the generator to improve.',
        ],
        generator: 'Generator',
        discriminator: 'Discriminator',
        noise: 'Noise seed',
        fakeSample: 'Fake sample',
        realSample: 'Real sample',
        realism: 'Generator realism',
        accuracy: 'Discriminator accuracy',
        train: 'Train one round',
        round: 'Round',
    },
    zh: {
        title: '5. GAN 通过对抗学习',
        bullets: [
            '生成器从噪声中生成“假样本”。',
            '判别器尝试区分真实与生成。',
            '对抗推动生成器不断改进。',
        ],
        generator: '生成器',
        discriminator: '判别器',
        noise: '噪声种子',
        fakeSample: '生成样本',
        realSample: '真实样本',
        realism: '生成器逼真度',
        accuracy: '判别器准确率',
        train: '训练一轮',
        round: '轮次',
    },
};

export const Slide5_GANCompetition: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [round, setRound] = useState(0);
    const explain = `**${t.title}**\n\n${t.bullets.map((bullet) => `- ${bullet}`).join('\n')}`;
    const maxRounds = 6;
    const progress = round / maxRounds;
    const realism = 0.3 + progress * 0.6;
    const accuracy = 0.9 - progress * 0.3;
    const blurAmount = (1 - progress) * 3;

    return (
        <>
            <ConceptStage>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.4rem', flex: 1 }}>
                        <StageCard title={t.generator} tone="process">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.noise}</div>
                                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-end' }}>
                                    {noiseVector.map((value, index) => (
                                        <div
                                            key={`noise-${index}`}
                                            style={{
                                                width: '14px',
                                                height: `${20 + value * 50}px`,
                                                backgroundColor: '#c4b5fd',
                                                borderRadius: '6px',
                                            }}
                                        />
                                    ))}
                                </div>
                                <div style={{ fontSize: '1.2rem', color: '#94a3b8' }}>v</div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.fakeSample}</div>
                                <div style={{ filter: `blur(${blurAmount}px)` }}>
                                    <AnimalFace catness={0.6} energy={0.6} size={90} />
                                </div>
                            </div>
                        </StageCard>

                        <StageCard title={t.discriminator} tone="process">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center' }}>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.realSample}</div>
                                <img src={catImage} alt="real cat" style={{ maxHeight: '90px' }} />
                                <div style={{ fontSize: '1.2rem', color: '#94a3b8' }}>v</div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{t.fakeSample}</div>
                                <div style={{ filter: `blur(${blurAmount}px)` }}>
                                    <AnimalFace catness={0.6} energy={0.6} size={90} />
                                </div>
                            </div>
                        </StageCard>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.4rem' }}>
                        <MeterBar label={t.realism} value={realism} color="#34d399" />
                        <MeterBar label={t.accuracy} value={accuracy} color="#f97316" />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <button
                            type="button"
                            onClick={() => setRound((prev) => (prev + 1) % (maxRounds + 1))}
                            style={{
                                padding: '0.5rem 1.2rem',
                                borderRadius: '999px',
                                border: '1px solid #cbd5f5',
                                backgroundColor: '#ffffff',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            {t.train}
                        </button>
                        <div style={{ fontWeight: 600, color: '#6b7280' }}>
                            {t.round}: {round}/{maxRounds}
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{explain}</ExplainPanel>
        </>
    );
};
