import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const TOKENS = {
    en: ['I', 'like', 'music', 'and', 'math'],
    zh: ['我', '喜欢', '音乐', '和', '数学'],
};

const copy = {
    en: {
        title: '6. RNNs: Repeating One Cell Over Time',
        bullets: [
            'An RNN reuses the same cell for each step in the sequence.',
            'The hidden state carries information forward like a short memory.',
            'Limits: long sequences can fade, training is slow, and parallelism is limited.',
        ],
        stepLabel: 'Time step',
        memoryLabel: 'Memory strength',
        memoryTitle: 'Hidden state memory (recent words stay stronger)',
        stageTitle: 'Shared RNN cell applied to each step',
        sharedLabel: 'shared',
    },
    zh: {
        title: '6. RNN：随时间重复的同一个单元',
        bullets: [
            'RNN 在每个时间步重复使用同一个单元。',
            '隐藏状态像短期记忆一样向前传递信息。',
            '局限：长序列信息易衰减，训练慢，难以并行。',
        ],
        stepLabel: '时间步',
        memoryLabel: '记忆强度',
        memoryTitle: '隐藏状态记忆（越近越强）',
        stageTitle: '共享的 RNN 单元逐步应用',
        sharedLabel: '共享',
    },
};

export const Slide6_RNNStructure: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const tokens = TOKENS[language];
    const [step, setStep] = useState(2);
    const [memoryStrength, setMemoryStrength] = useState(0.6);

    const memoryTokens = useMemo(() => {
        return tokens.slice(0, step + 1).map((token, index) => {
            const distance = step - index;
            const opacity = Math.max(0.15, Math.pow(memoryStrength, distance));
            return { token, opacity };
        });
    }, [memoryStrength, step, tokens]);

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', width: '100%', padding: '0 2rem' }}>
                    <div style={{ textAlign: 'center', fontWeight: 600 }}>{t.stageTitle}</div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {tokens.map((token, index) => {
                            const isActive = index === step;
                            return (
                                <div
                                    key={`${token}-${index}`}
                                    style={{
                                        padding: '0.5rem 0.8rem',
                                        borderRadius: '8px',
                                        backgroundColor: isActive ? '#74b9ff' : '#f1f2f6',
                                        color: isActive ? '#ffffff' : '#2d3436',
                                        border: isActive ? '2px solid #0984e3' : '1px solid #dfe6e9',
                                        fontWeight: 600,
                                    }}
                                >
                                    {token}
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                        {tokens.map((_, index) => {
                            const isSeen = index <= step;
                            return (
                                <React.Fragment key={`cell-${index}`}>
                                    <div
                                        style={{
                                            width: '90px',
                                            height: '90px',
                                            borderRadius: '12px',
                                            border: `2px solid ${isSeen ? '#0984e3' : '#dfe6e9'}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0.3rem',
                                            backgroundColor: isSeen ? '#ffffff' : '#f8f9fa',
                                            }}
                                        >
                                            <div style={{ fontSize: '0.7rem', color: '#636e72' }}>{`x${index + 1}`}</div>
                                            <div
                                            style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '999px',
                                                backgroundColor: isSeen ? '#74b9ff' : '#dfe6e9',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#2d3436',
                                                fontWeight: 700,
                                            }}
                                        >
                                                h
                                            </div>
                                        <div style={{ fontSize: '0.7rem', color: '#636e72' }}>{t.sharedLabel}</div>
                                    </div>
                                    {index < tokens.length - 1 && (
                                        <div style={{ color: '#636e72', fontWeight: 700, margin: '0 0.4rem' }}>{'->'}</div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <div style={{ textAlign: 'center', fontWeight: 600 }}>{t.memoryTitle}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {memoryTokens.map((token, index) => (
                            <div
                                key={`memory-${index}`}
                                style={{
                                    padding: '0.4rem 0.7rem',
                                    borderRadius: '999px',
                                    backgroundColor: '#ffeaa7',
                                    opacity: token.opacity,
                                    fontWeight: 600,
                                }}
                            >
                                {token.token}
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                            {t.stepLabel}
                            <input
                                type="range"
                                min={0}
                                max={tokens.length - 1}
                                value={step}
                                onChange={(event) => setStep(Number(event.target.value))}
                            />
                            <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                                {step + 1}/{tokens.length}
                            </span>
                        </label>

                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                            {t.memoryLabel}
                            <input
                                type="range"
                                min={0.2}
                                max={1}
                                step={0.1}
                                value={memoryStrength}
                                onChange={(event) => setMemoryStrength(Number(event.target.value))}
                            />
                            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{memoryStrength.toFixed(1)}</span>
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
