import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const questions = [
    {
        prompt: 'What does the encoder output in an autoencoder?',
        options: [
            {
                text: 'A short code that summarizes the input',
                correct: true,
                rationale: 'The encoder compresses the input into a compact latent code.',
            },
            {
                text: 'A class label (cat or dog)',
                correct: false,
                rationale: 'Classification is a different task from reconstruction.',
            },
            {
                text: 'A brand new animal image',
                correct: false,
                rationale: 'The decoder creates images from the code, not the encoder.',
            },
        ],
    },
    {
        prompt: 'What happens if the discriminator becomes too strong?',
        options: [
            {
                text: 'The generator collapses to very similar samples',
                correct: true,
                rationale: 'When the discriminator dominates, the generator stops exploring.',
            },
            {
                text: 'The generator instantly learns perfect variety',
                correct: false,
                rationale: 'Variety needs balanced feedback, not overwhelming pressure.',
            },
            {
                text: 'Training finishes with zero loss for both models',
                correct: false,
                rationale: 'GAN training rarely reaches perfect equilibrium.',
            },
        ],
    },
];

const copy = {
    en: {
        title: '8. Quick Concept Check',
        bullets: [
            'Answer each question to confirm understanding.',
            'Feedback explains why an option is right or wrong.',
        ],
        correct: 'Correct',
        incorrect: 'Not quite',
    },
    zh: {
        title: '8. Quick Concept Check',
        bullets: [
            'Answer each question to confirm understanding.',
            'Feedback explains why an option is right or wrong.',
        ],
        correct: 'Correct',
        incorrect: 'Not quite',
    },
};

export const Slide8_ConceptCheck: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));

    return (
        <>
            <ConceptStage>
                <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    {questions.map((question, qIndex) => (
                        <div
                            key={`question-${qIndex}`}
                            style={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '12px',
                                padding: '1rem',
                            }}
                        >
                            <div style={{ fontWeight: 700, marginBottom: '0.8rem', color: '#1f2933' }}>
                                {question.prompt}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '0.8rem' }}>
                                {question.options.map((option, optionIndex) => {
                                    const selected = answers[qIndex] === optionIndex;
                                    const showFeedback = selected;
                                    const borderColor = selected
                                        ? option.correct
                                            ? '#34d399'
                                            : '#f97316'
                                        : '#e2e8f0';
                                    const label = selected ? (option.correct ? t.correct : t.incorrect) : null;

                                    return (
                                        <button
                                            key={`option-${qIndex}-${optionIndex}`}
                                            type="button"
                                            onClick={() =>
                                                setAnswers((prev) =>
                                                    prev.map((value, index) => (index === qIndex ? optionIndex : value))
                                                )
                                            }
                                            style={{
                                                textAlign: 'left',
                                                padding: '0.85rem',
                                                borderRadius: '10px',
                                                border: `2px solid ${borderColor}`,
                                                backgroundColor: '#f8fafc',
                                                cursor: 'pointer',
                                            }}
                                            aria-pressed={selected}
                                        >
                                            <div style={{ fontWeight: 600, color: '#1f2933', marginBottom: '0.4rem' }}>
                                                {option.text}
                                            </div>
                                            {showFeedback && (
                                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                                    <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{label}</div>
                                                    <div>{option.rationale}</div>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
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
