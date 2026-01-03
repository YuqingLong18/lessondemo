import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import catImage from '../../assets/cute_cat.png';
import dogImage from '../../assets/cute_dog.png';
import { AnimalFace, MeterBar, PillButton, StageCard } from './shared';

const samples = [
    {
        input: 'cat',
        confidence: 0.88,
        outputs: [
            { catness: 0.9, energy: 0.4 },
            { catness: 0.75, energy: 0.6 },
            { catness: 0.6, energy: 0.3 },
            { catness: 0.85, energy: 0.7 },
        ],
    },
    {
        input: 'dog',
        confidence: 0.83,
        outputs: [
            { catness: 0.2, energy: 0.7 },
            { catness: 0.35, energy: 0.5 },
            { catness: 0.1, energy: 0.4 },
            { catness: 0.4, energy: 0.6 },
        ],
    },
    {
        input: 'cat',
        confidence: 0.64,
        outputs: [
            { catness: 0.55, energy: 0.4 },
            { catness: 0.45, energy: 0.6 },
            { catness: 0.6, energy: 0.7 },
            { catness: 0.5, energy: 0.5 },
        ],
    },
];

const copy = {
    en: {
        title: '1. Learning Can Predict or Create',
        bullets: [
            'Prediction uses input to guess a label or next step.',
            'Generation starts from a seed and creates new examples.',
            'Toggle the task to see how the goal changes.',
        ],
        inputLabel: 'Input',
        outputLabel: 'Output',
        predict: 'Predict',
        generate: 'Generate',
        nextSample: 'Next sample',
        noInput: 'No input needed',
        predictionLabel: 'confidence',
        generatedLabel: 'Generated samples',
        catLabel: 'Cat',
        dogLabel: 'Dog',
    },
    zh: {
        title: '1. 学习可以预测或生成',
        bullets: [
            '预测使用输入来猜测标签或下一步。',
            '生成从一个种子开始，创造新的例子。',
            '切换任务，看目标如何变化。',
        ],
        inputLabel: '输入',
        outputLabel: '输出',
        predict: '预测',
        generate: '生成',
        nextSample: '下一个样本',
        noInput: '无需输入',
        predictionLabel: '置信度',
        generatedLabel: '生成样本',
        catLabel: '猫',
        dogLabel: '狗',
    },
};

export const Slide1_FromLearningToGenerating: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [mode, setMode] = useState<'predict' | 'generate'>('predict');
    const [sampleIndex, setSampleIndex] = useState(0);
    const explain = `**${t.title}**\n\n${t.bullets.map((bullet) => `- ${bullet}`).join('\n')}`;

    const sample = samples[sampleIndex];
    const sampleLabel = sample.input === 'cat' ? t.catLabel : t.dogLabel;
    const inputImage = sample.input === 'cat' ? catImage : dogImage;

    return (
        <>
            <ConceptStage>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', flex: 1 }}>
                        <StageCard title={t.inputLabel} tone="input">
                            {mode === 'predict' ? (
                                <img
                                    src={inputImage}
                                    alt={sample.input}
                                    style={{ maxWidth: '100%', maxHeight: '180px', objectFit: 'contain' }}
                                />
                            ) : (
                                <div style={{ color: '#6b7280', fontWeight: 600 }}>{t.noInput}</div>
                            )}
                        </StageCard>
                        <StageCard title={t.outputLabel} tone="output">
                            {mode === 'predict' ? (
                                <div style={{ width: '100%' }}>
                                    <div style={{ fontWeight: 700, marginBottom: '0.6rem' }}>{sampleLabel}</div>
                                    <MeterBar
                                        label={`${sampleLabel} ${t.predictionLabel}`}
                                        value={sample.confidence}
                                        color="#60a5fa"
                                    />
                                </div>
                            ) : (
                                <div style={{ width: '100%' }}>
                                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.6rem' }}>
                                        {t.generatedLabel}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
                                        {sample.outputs.map((output, index) => (
                                            <div key={`gen-${index}`} style={{ display: 'flex', justifyContent: 'center' }}>
                                                <AnimalFace
                                                    catness={output.catness}
                                                    energy={output.energy}
                                                    size={70}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </StageCard>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <PillButton label={t.predict} active={mode === 'predict'} onClick={() => setMode('predict')} />
                        <PillButton label={t.generate} active={mode === 'generate'} onClick={() => setMode('generate')} />
                        <button
                            type="button"
                            onClick={() => setSampleIndex((prev) => (prev + 1) % samples.length)}
                            style={{
                                padding: '0.45rem 1.1rem',
                                borderRadius: '999px',
                                border: '1px solid #cbd5f5',
                                backgroundColor: '#ffffff',
                                color: '#1f2933',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                            }}
                        >
                            {t.nextSample}
                        </button>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{explain}</ExplainPanel>
        </>
    );
};
