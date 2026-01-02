import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const BASES = ['A', 'C', 'G', 'T'] as const;
const BASE_VALUE: Record<string, number> = { A: 0, C: 1, G: 2, T: 3 };
const INSTRUCTIONS = {
    en: ['Instruction A', 'Instruction B', 'Instruction C', 'Instruction D'],
    zh: ['指令 A', '指令 B', '指令 C', '指令 D'],
};
const INSTRUCTION_COLORS = ['#74b9ff', '#55efc4', '#ffeaa7', '#ff7675'];

const INITIAL_SEQUENCE = ['A', 'T', 'G', 'G', 'A', 'A', 'T', 'A', 'A'];

const copy = {
    en: {
        title: '5. DNA Is Read in Order',
        bullets: [
            'DNA is a long sequence of letters.',
            'Cells read letters in triplets (codons).',
            'This demo uses a simplified code key for illustration.',
        ],
        prompt: 'Click a letter to mutate it.',
        reading: 'Read left to right in triplets.',
    },
    zh: {
        title: '5. DNA 按顺序读取',
        bullets: [
            'DNA 是一串很长的字母序列。',
            '细胞按三个字母一组（密码子）读取。',
            '本演示使用简化规则来说明。',
        ],
        prompt: '点击字母进行突变。',
        reading: '按三个一组从左到右读取。',
    },
};

const getInstruction = (codon: string, instructions: string[]) => {
    const [a, b, c] = codon.split('');
    const value = (BASE_VALUE[a] ?? 0) * 16 + (BASE_VALUE[b] ?? 0) * 4 + (BASE_VALUE[c] ?? 0);
    return {
        label: instructions[value % instructions.length],
        color: INSTRUCTION_COLORS[value % INSTRUCTION_COLORS.length],
    };
};

export const Slide5_DNASequence: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [sequence, setSequence] = useState<string[]>(INITIAL_SEQUENCE);

    const handleCycleBase = (index: number) => {
        setSequence((prev) => {
            const current = prev[index];
            const nextIndex = (BASES.indexOf(current as (typeof BASES)[number]) + 1) % BASES.length;
            const next = BASES[nextIndex];
            return prev.map((base, i) => (i === index ? next : base));
        });
    };

    const codons = [sequence.slice(0, 3), sequence.slice(3, 6), sequence.slice(6, 9)];

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', alignItems: 'center' }}>
                    <div style={{ fontWeight: 600 }}>{t.prompt}</div>
                    <div style={{ display: 'flex', gap: '1.2rem' }}>
                        {codons.map((codon, codonIndex) => {
                            const codonString = codon.join('');
                            const instruction = getInstruction(codonString, INSTRUCTIONS[language]);
                            return (
                                <div
                                    key={`codon-${codonIndex}`}
                                    style={{
                                        padding: '0.8rem 1rem',
                                        borderRadius: '12px',
                                        backgroundColor: '#f8f9fa',
                                        border: '1px solid #dfe6e9',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.7rem',
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {codon.map((base, baseIndex) => {
                                            const absoluteIndex = codonIndex * 3 + baseIndex;
                                            const ariaLabel =
                                                language === 'zh'
                                                    ? `DNA 碱基 ${base}，位置 ${absoluteIndex + 1}`
                                                    : `DNA base ${base} at position ${absoluteIndex + 1}`;
                                            return (
                                                <button
                                                    key={`base-${absoluteIndex}`}
                                                    type="button"
                                                    onClick={() => handleCycleBase(absoluteIndex)}
                                                    style={{
                                                        width: '48px',
                                                        height: '48px',
                                                        borderRadius: '10px',
                                                        border: '2px solid #b2bec3',
                                                        backgroundColor: '#ffffff',
                                                        fontWeight: 700,
                                                        fontSize: '1.1rem',
                                                        cursor: 'pointer',
                                                    }}
                                                    aria-label={ariaLabel}
                                                >
                                                    {base}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div
                                        style={{
                                            padding: '0.3rem 0.7rem',
                                            borderRadius: '999px',
                                            backgroundColor: instruction.color,
                                            color: '#2d3436',
                                            fontWeight: 700,
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        {instruction.label}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ fontWeight: 600, color: '#636e72' }}>{t.reading}</div>
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
