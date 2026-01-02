import React, { useEffect, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const CHOICES = {
    en: ['glass', 'can', 'book'],
    zh: ['杯子', '罐子', '书'],
};

const CONTEXTS = {
    en: {
        juice: {
            label: 'Context A: juice',
            tokens: ['She', 'poured', 'the', 'juice', 'into', 'the', '___'],
            highlightIndex: 3,
            answer: 'glass',
        },
        paint: {
            label: 'Context B: paint',
            tokens: ['She', 'poured', 'the', 'paint', 'into', 'the', '___'],
            highlightIndex: 3,
            answer: 'can',
        },
    },
    zh: {
        juice: {
            label: '语境 A：果汁',
            tokens: ['她', '把', '果汁', '倒进', '了', '___'],
            highlightIndex: 2,
            answer: '杯子',
        },
        paint: {
            label: '语境 B：油漆',
            tokens: ['她', '把', '油漆', '倒进', '了', '___'],
            highlightIndex: 2,
            answer: '罐子',
        },
    },
};

const copy = {
    en: {
        title: '2. Language Depends on Context',
        bullets: [
            'Earlier words shape what comes next.',
            'Switch the context and choose the best next word.',
            'Same position, different meaning.',
        ],
        prompt: 'Choose the next word:',
        feedbackGood: 'Good fit for this context.',
        feedbackOdd: 'Odd fit for this context.',
    },
    zh: {
        title: '2. 语言依赖上下文',
        bullets: [
            '前面的词会影响后面的词。',
            '切换上下文并选择最合适的下一个词。',
            '同一位置，意义不同。',
        ],
        prompt: '选择下一个词：',
        feedbackGood: '适合这个语境。',
        feedbackOdd: '不太适合这个语境。',
    },
};

type ContextKey = keyof (typeof CONTEXTS)['en'];

export const Slide2_LanguageContext: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [contextKey, setContextKey] = useState<ContextKey>('juice');
    const [choice, setChoice] = useState<string | null>(null);

    const contextSet = CONTEXTS[language];
    const context = contextSet[contextKey];
    const choices = CHOICES[language];
    const isCorrect = choice === context.answer;

    const handleContextChange = (key: ContextKey) => {
        setContextKey(key);
        setChoice(null);
    };

    useEffect(() => {
        setChoice(null);
    }, [language]);

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', width: '100%', padding: '0 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        {(Object.keys(contextSet) as ContextKey[]).map((key) => {
                            const isActive = key === contextKey;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleContextChange(key)}
                                    aria-pressed={isActive}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '999px',
                                        border: '1px solid #b2bec3',
                                        backgroundColor: isActive ? '#0984e3' : '#ffffff',
                                        color: isActive ? '#ffffff' : '#2d3436',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {contextSet[key].label}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {context.tokens.map((token, index) => {
                            const isHighlight = index === context.highlightIndex;
                            return (
                                <span
                                    key={`${token}-${index}`}
                                    style={{
                                        padding: '0.5rem 0.8rem',
                                        borderRadius: '8px',
                                        backgroundColor: isHighlight ? '#ffeaa7' : '#f1f2f6',
                                        border: isHighlight ? '2px solid #fdcb6e' : '1px solid #dfe6e9',
                                        fontWeight: isHighlight ? 700 : 500,
                                        minWidth: token === '___' ? '60px' : 'auto',
                                        textAlign: 'center',
                                    }}
                                >
                                    {token}
                                </span>
                            );
                        })}
                    </div>

                    <div style={{ textAlign: 'center', fontWeight: 600 }}>{t.prompt}</div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        {choices.map((option) => {
                            const isSelected = option === choice;
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setChoice(option)}
                                    style={{
                                        padding: '0.7rem 1.2rem',
                                        borderRadius: '10px',
                                        border: '2px solid',
                                        borderColor: isSelected ? '#0984e3' : '#dfe6e9',
                                        backgroundColor: isSelected ? '#dfe6e9' : '#ffffff',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        minWidth: '90px',
                                    }}
                                >
                                    {option}
                                </button>
                            );
                        })}
                    </div>

                    {choice && (
                        <div
                            style={{
                                textAlign: 'center',
                                fontWeight: 600,
                                color: isCorrect ? '#00b894' : '#d63031',
                            }}
                        >
                            {isCorrect ? t.feedbackGood : t.feedbackOdd}
                        </div>
                    )}
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
