import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { AnimalFace, MeterBar, StageCard } from './shared';

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const copy = {
    en: {
        title: '6. GANs Need Balance',
        bullets: [
            'If the discriminator is too weak, fakes stay noisy.',
            'If it is too strong, the generator collapses to one idea.',
            'Balanced competition improves both quality and diversity.',
        ],
        strength: 'Discriminator strength',
        quality: 'Sample quality',
        diversity: 'Sample diversity',
        samples: 'Sample grid',
        statusBalanced: 'Balanced learning',
        statusNoisy: 'Noisy samples',
        statusCollapse: 'Mode collapse',
    },
    zh: {
        title: '6. GAN 需要平衡',
        bullets: [
            '判别器太弱时，生成样本会很嘈杂。',
            '判别器太强时，生成器会坍缩成单一模式。',
            '平衡对抗能提升质量与多样性。',
        ],
        strength: '判别器强度',
        quality: '样本质量',
        diversity: '样本多样性',
        samples: '样本网格',
        statusBalanced: '平衡学习',
        statusNoisy: '噪声样本',
        statusCollapse: '模式崩塌',
    },
};

export const Slide6_TrainingBalance: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [strength, setStrength] = useState(0.5);
    const explain = `**${t.title}**\n\n${t.bullets.map((bullet) => `- ${bullet}`).join('\n')}`;

    const quality = clamp(1 - Math.abs(strength - 0.6) * 1.4, 0.2, 1);
    const diversity = clamp(1 - Math.abs(strength - 0.5) * 2.0, 0.2, 1);

    const stateLabel = strength < 0.25 ? t.statusNoisy : strength > 0.75 ? t.statusCollapse : t.statusBalanced;
    const isNoisy = strength < 0.25;
    const isCollapse = strength > 0.75;

    const samples = useMemo(() => {
        if (isCollapse) {
            return [
                { catness: 0.85, energy: 0.5 },
                { catness: 0.85, energy: 0.5 },
                { catness: 0.85, energy: 0.5 },
                { catness: 0.85, energy: 0.5 },
            ];
        }
        if (isNoisy) {
            return [
                { catness: 0.2, energy: 0.7 },
                { catness: 0.6, energy: 0.3 },
                { catness: 0.4, energy: 0.8 },
                { catness: 0.7, energy: 0.5 },
            ];
        }
        return [
            { catness: 0.2, energy: 0.6 },
            { catness: 0.5, energy: 0.7 },
            { catness: 0.75, energy: 0.4 },
            { catness: 0.35, energy: 0.5 },
        ];
    }, [isCollapse, isNoisy]);

    return (
        <>
            <ConceptStage>
                <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
                    <StageCard title={t.strength} tone="process">
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                                {t.strength}
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    value={strength}
                                    onChange={(event) => setStrength(Number(event.target.value))}
                                />
                                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{strength.toFixed(2)}</span>
                            </label>
                            <MeterBar label={t.quality} value={quality} color="#34d399" />
                            <MeterBar label={t.diversity} value={diversity} color="#60a5fa" />
                            <div style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>{stateLabel}</div>
                        </div>
                    </StageCard>

                    <StageCard title={t.samples} tone="output">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
                            {samples.map((sample, index) => (
                                <div key={`sample-${index}`} style={{ filter: isNoisy ? 'blur(1.6px)' : 'none' }}>
                                    <AnimalFace catness={sample.catness} energy={sample.energy} size={75} />
                                </div>
                            ))}
                        </div>
                    </StageCard>
                </div>
            </ConceptStage>
            <ExplainPanel>{explain}</ExplainPanel>
        </>
    );
};
