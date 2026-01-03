import React, { useRef, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { AnimalFace, StageCard } from './shared';

const copy = {
    en: {
        title: '3. Latent Space Is a Map',
        bullets: [
            'Nearby codes decode to similar animals.',
            'Moving the point changes traits smoothly.',
            'The map is what the model learned to organize.',
        ],
        mapLabel: 'Drag the point',
        previewLabel: 'Decoded animal',
        cat: 'More cat',
        dog: 'More dog',
        calm: 'Calm',
        energetic: 'Energetic',
        traits: 'Traits',
        catTrait: 'cat',
        energyTrait: 'energy',
    },
    zh: {
        title: '3. 潜在空间是一张地图',
        bullets: [
            '相近的编码会解码出相似的动物。',
            '移动点会平滑地改变特征。',
            '这张地图是模型学到的组织方式。',
        ],
        mapLabel: '拖动点',
        previewLabel: '解码后的动物',
        cat: '更像猫',
        dog: '更像狗',
        calm: '安静',
        energetic: '活力',
        traits: '特征',
        catTrait: '猫度',
        energyTrait: '活力',
    },
};

export const Slide3_LatentMap: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [point, setPoint] = useState({ x: 0.7, y: 0.4 });
    const mapRef = useRef<HTMLDivElement | null>(null);
    const explain = `**${t.title}**\n\n${t.bullets.map((bullet) => `- ${bullet}`).join('\n')}`;

    const updatePoint = (event: React.PointerEvent<HTMLDivElement>) => {
        const bounds = mapRef.current?.getBoundingClientRect();
        if (!bounds) return;
        const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
        const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
        setPoint({ x, y });
    };

    const energy = 1 - point.y;

    return (
        <>
            <ConceptStage>
                <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                    <StageCard title={t.mapLabel} tone="process">
                        <div
                            ref={mapRef}
                            onPointerDown={(event) => {
                                event.currentTarget.setPointerCapture(event.pointerId);
                                updatePoint(event);
                            }}
                            onPointerMove={(event) => {
                                if (event.buttons === 1) {
                                    updatePoint(event);
                                }
                            }}
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                borderRadius: '16px',
                                backgroundImage:
                                    'linear-gradient(90deg, rgba(224,242,254,0.9), rgba(253,226,228,0.9)), linear-gradient(0deg, rgba(255,255,255,0.9), rgba(255,255,255,0.1))',
                                backgroundBlendMode: 'multiply',
                                border: '1px dashed #cbd5f5',
                                overflow: 'hidden',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 12,
                                    left: 12,
                                    fontSize: '0.75rem',
                                    color: '#64748b',
                                    fontWeight: 600,
                                }}
                            >
                                {t.energetic}
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 12,
                                    left: 12,
                                    fontSize: '0.75rem',
                                    color: '#64748b',
                                    fontWeight: 600,
                                }}
                            >
                                {t.calm}
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    left: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontSize: '0.75rem',
                                    color: '#64748b',
                                    fontWeight: 600,
                                }}
                            >
                                {t.dog}
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    right: 12,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontSize: '0.75rem',
                                    color: '#64748b',
                                    fontWeight: 600,
                                }}
                            >
                                {t.cat}
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    left: `${point.x * 100}%`,
                                    top: `${point.y * 100}%`,
                                    transform: 'translate(-50%, -50%)',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    backgroundColor: '#2563eb',
                                    boxShadow: '0 0 0 6px rgba(37, 99, 235, 0.2)',
                                }}
                            />
                        </div>
                    </StageCard>

                    <StageCard title={t.previewLabel} tone="output">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                            <AnimalFace catness={point.x} energy={energy} size={140} />
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', textAlign: 'center' }}>
                                {t.traits}: {point.x.toFixed(2)} {t.catTrait ?? 'cat'}, {energy.toFixed(2)}{' '}
                                {t.energyTrait ?? 'energy'}
                            </div>
                        </div>
                    </StageCard>
                </div>
            </ConceptStage>
            <ExplainPanel>{explain}</ExplainPanel>
        </>
    );
};
