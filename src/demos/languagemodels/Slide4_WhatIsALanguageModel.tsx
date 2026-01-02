import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const contextTokens = ['The', 'cat', 'sat', 'on', 'the'];
const candidates = [
    { word: 'mat', prob: 0.62 },
    { word: 'roof', prob: 0.22 },
    { word: 'moon', prob: 0.16 },
];

export const Slide4_WhatIsALanguageModel: React.FC = () => {
    const { language } = useLanguage();
    const [selectedWord, setSelectedWord] = useState(candidates[0].word);

    const text = {
        en: {
            title: 'A language model predicts the next word from context.',
            inputLabel: 'Context',
            outputLabel: 'Sampled output',
            optionsLabel: 'Next word options',
            sampleNote: 'Model samples a word based on probabilities.',
            explain: `
- The model assigns a probability to each possible next word.
- Higher probability words are more likely to be chosen.
- This simple idea powers many text generation systems.
`,
        },
        zh: {
            title: '语言模型根据上下文预测下一个词。',
            inputLabel: '上下文',
            outputLabel: '采样输出',
            optionsLabel: '候选词与概率',
            sampleNote: '模型按概率抽样出一个词。',
            explain: `
- 模型为每个可能的下一个词分配概率。
- 概率更高的词更容易被选中。
- 这个简单思想支撑了许多文本生成系统。
`,
        },
    };

    const t = text[language];

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-base text-gray-600 mb-4">{t.title}</div>
                    <div className="flex-1 grid grid-cols-[1.1fr_1fr] gap-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">{t.inputLabel}</div>
                                <div className="flex flex-wrap gap-2">
                                    {contextTokens.map((token) => (
                                        <span
                                            key={token}
                                            className="px-3 py-1 rounded-full text-sm bg-slate-100 text-slate-700 border border-slate-200"
                                        >
                                            {token}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">{t.optionsLabel}</div>
                                <div className="space-y-2">
                                    {candidates.map((candidate) => {
                                        const isSelected = candidate.word === selectedWord;
                                        return (
                                            <button
                                                key={candidate.word}
                                                type="button"
                                                onClick={() => setSelectedWord(candidate.word)}
                                                className={`w-full flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-base transition ${
                                                    isSelected
                                                        ? 'border-indigo-500 bg-indigo-50'
                                                        : 'border-gray-200 bg-white hover:border-gray-300'
                                                }`}
                                                aria-pressed={isSelected}
                                            >
                                                <span className="w-14 font-semibold text-gray-700">{candidate.word}</span>
                                                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-indigo-500"
                                                        style={{ width: `${candidate.prob * 100}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-gray-500">{Math.round(candidate.prob * 100)}%</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="text-sm uppercase tracking-wide text-gray-500 mb-3">{t.outputLabel}</div>
                            <div className="text-2xl font-semibold text-gray-800 text-center">
                                {contextTokens.join(' ')} {selectedWord}.
                            </div>
                            <div className="text-sm text-gray-500 mt-2">{t.sampleNote}</div>
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{t.explain}</ExplainPanel>
        </div>
    );
};
