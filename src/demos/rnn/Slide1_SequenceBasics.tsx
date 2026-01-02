import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const SEQUENCES = {
    en: {
        ordered: ['Wake', 'Eat', 'Learn', 'Sleep'],
        scrambled: ['Sleep', 'Learn', 'Eat', 'Wake'],
    },
    zh: {
        ordered: ['起床', '吃饭', '学习', '睡觉'],
        scrambled: ['睡觉', '学习', '吃饭', '起床'],
    },
};

const copy = {
    en: {
        title: '1. A Sequence Has Order',
        bullets: [
            'A sequence is information plus order.',
            'Move the time cursor to see one step at a time.',
            'Scrambling the order keeps the same items but changes the meaning.',
        ],
        stageTitle: 'Daily Routine',
        orderLabel: 'Order:',
        ordered: 'Ordered',
        scrambled: 'Scrambled',
        timeStep: 'Time step',
        meaningClear: 'Meaning: Coherent story',
        meaningConfusing: 'Meaning: Confusing story',
    },
    zh: {
        title: '1. 序列有顺序',
        bullets: [
            '序列 = 信息 + 顺序。',
            '移动时间滑块，一步步查看。',
            '打乱顺序会保留同样的元素，但意思会改变。',
        ],
        stageTitle: '日常作息',
        orderLabel: '顺序：',
        ordered: '有序',
        scrambled: '打乱',
        timeStep: '时间步',
        meaningClear: '含义：连贯故事',
        meaningConfusing: '含义：混乱故事',
    },
};

export const Slide1_SequenceBasics: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [isScrambled, setIsScrambled] = useState(false);
    const [step, setStep] = useState(0);

    const sequenceSet = SEQUENCES[language];
    const sequence = isScrambled ? sequenceSet.scrambled : sequenceSet.ordered;
    const meaningLabel = isScrambled ? t.meaningConfusing : t.meaningClear;

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', padding: '0 2rem' }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 600, textAlign: 'center' }}>{t.stageTitle}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem' }}>
                        {sequence.map((item, index) => {
                            const isActive = index === step;
                            const isPast = index < step;
                            return (
                                <React.Fragment key={`${item}-${index}`}>
                                    <div
                                        style={{
                                            padding: '0.8rem 1.1rem',
                                            borderRadius: '10px',
                                            backgroundColor: isActive ? '#74b9ff' : isPast ? '#dfe6e9' : '#ffffff',
                                            border: '2px solid',
                                            borderColor: isActive ? '#0984e3' : '#dfe6e9',
                                            color: isActive ? '#fff' : '#2d3436',
                                            fontWeight: 600,
                                            minWidth: '80px',
                                            textAlign: 'center',
                                        }}
                                    >
                                        {item}
                                    </div>
                                    {index < sequence.length - 1 && (
                                        <div style={{ fontSize: '1.2rem', color: '#636e72', fontWeight: 700 }}>{'>'}</div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <div
                        style={{
                            textAlign: 'center',
                            fontWeight: 600,
                            color: isScrambled ? '#d63031' : '#00b894',
                            fontSize: '1.05rem',
                        }}
                    >
                        {meaningLabel}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontWeight: 600 }}>{t.orderLabel}</span>
                            <button
                                type="button"
                                onClick={() => setIsScrambled(false)}
                                aria-pressed={!isScrambled}
                                style={{
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '999px',
                                    border: '1px solid #b2bec3',
                                    backgroundColor: !isScrambled ? '#0984e3' : '#ffffff',
                                    color: !isScrambled ? '#ffffff' : '#2d3436',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                }}
                            >
                                {t.ordered}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsScrambled(true)}
                                aria-pressed={isScrambled}
                                style={{
                                    padding: '0.4rem 0.8rem',
                                    borderRadius: '999px',
                                    border: '1px solid #b2bec3',
                                    backgroundColor: isScrambled ? '#0984e3' : '#ffffff',
                                    color: isScrambled ? '#ffffff' : '#2d3436',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                }}
                            >
                                {t.scrambled}
                            </button>
                        </div>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                            {t.timeStep}
                            <input
                                type="range"
                                min={0}
                                max={sequence.length - 1}
                                value={step}
                                onChange={(event) => setStep(Number(event.target.value))}
                            />
                            <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                                {step + 1}/{sequence.length}
                            </span>
                        </label>
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
