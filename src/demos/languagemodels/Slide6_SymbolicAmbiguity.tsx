import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const options = [
    {
        id: 'everyday',
        text: { en: 'Time passes quickly, like an arrow.', zh: '时间飞逝，像箭一样快。' },
        note: { en: 'Common reading in everyday English.', zh: '日常语境中最常见的理解。' },
    },
    {
        id: 'measure',
        text: { en: 'Measure the speed of flies the way you measure an arrow.', zh: '用测量箭的方式来测量苍蝇的速度。' },
        note: { en: '"Time" acts like a verb; "flies" is a noun.', zh: '"Time" 作动词，"flies" 作名词。' },
    },
    {
        id: 'species',
        text: { en: 'A type of flies called "time flies" enjoy arrows.', zh: '一种叫“time flies”的苍蝇喜欢箭。' },
        note: { en: 'Unusual but grammatically possible.', zh: '不常见，但语法上成立。' },
    },
];

export const Slide6_SymbolicAmbiguity: React.FC = () => {
    const { language } = useLanguage();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const text = {
        en: {
            sentence: 'Time flies like an arrow.',
            prompt: 'Pick an interpretation:',
            outputLabel: 'Output',
            outputEmpty: 'No interpretation selected yet.',
            explain: `
- The same words can support different parses.
- Rule-based systems struggled to choose the intended meaning.
- Real language needs context beyond grammar rules.
`,
            note: 'All three parses are grammatically valid, but only one is the intended meaning most of the time.',
        },
        zh: {
            sentence: 'Time flies like an arrow.',
            prompt: '请选择一种理解：',
            outputLabel: '输出',
            outputEmpty: '尚未选择任何解释。',
            explain: `
- 同一组词可以产生不同的语法解析。
- 规则系统很难选出真正的意图。
- 真实语言需要语境来消歧。
`,
            note: '三种解析在语法上都成立，但多数情况下只有一种是意图。',
        },
    };

    const t = text[language];
    const selected = options.find((option) => option.id === selectedId) ?? null;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-base text-gray-600 mb-3">{t.sentence}</div>
                    <div className="text-sm uppercase tracking-wide text-gray-500 mb-3">{t.prompt}</div>
                    <div className="grid grid-cols-3 gap-4 flex-1">
                        {options.map((option) => {
                            const isSelected = option.id === selectedId;
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => setSelectedId(option.id)}
                                    className={`rounded-2xl border p-5 text-left transition ${
                                        isSelected
                                            ? 'border-slate-900 bg-slate-900 text-white'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                                    aria-pressed={isSelected}
                                >
                                    <div className="text-base font-semibold mb-3">{option.text[language]}</div>
                                    <div className={`text-sm ${isSelected ? 'text-slate-200' : 'text-gray-500'}`}>
                                        {option.note[language]}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                        <span className="font-semibold text-gray-700">{t.outputLabel}:</span>{' '}
                        {selected ? selected.text[language] : t.outputEmpty}
                    </div>
                    <div className="mt-2 text-sm text-gray-500">{t.note}</div>
                </div>
            </ConceptStage>
            <ExplainPanel>{t.explain}</ExplainPanel>
        </div>
    );
};
