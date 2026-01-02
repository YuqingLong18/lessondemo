import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const options = [
    {
        id: 'everyday',
        text: 'Time passes quickly, like an arrow.',
        note: 'Common reading in everyday English.',
    },
    {
        id: 'measure',
        text: 'Measure the speed of flies the way you measure an arrow.',
        note: '"Time" acts like a verb; "flies" is a noun.',
    },
    {
        id: 'species',
        text: 'A type of flies called "time flies" enjoy arrows.',
        note: 'Unusual but grammatically possible.',
    },
];

export const Slide6_SymbolicAmbiguity: React.FC = () => {
    const { language } = useLanguage();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const text = {
        en: {
            sentence: 'Time flies like an arrow.',
            prompt: 'Pick an interpretation:',
            explain: `
- The same words can support different parses.
- Rule-based systems struggled to choose the intended meaning.
- Real language needs context beyond grammar rules.
`,
            note: 'All three parses are grammatically valid, but only one is the intended meaning most of the time.',
        },
        zh: {
            sentence: 'Time flies like an arrow.',
            prompt: 'Pick an interpretation:',
            explain: `
- The same words can support different parses.
- Rule-based systems struggled to choose the intended meaning.
- Real language needs context beyond grammar rules.
`,
            note: 'All three parses are grammatically valid, but only one is the intended meaning most of the time.',
        },
    };

    const t = text[language];
    const selected = options.find((option) => option.id === selectedId) ?? null;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-sm text-gray-500 mb-3">{t.sentence}</div>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">{t.prompt}</div>
                    <div className="grid grid-cols-3 gap-4 flex-1">
                        {options.map((option) => {
                            const isSelected = option.id === selectedId;
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => setSelectedId(option.id)}
                                    className={`rounded-2xl border p-4 text-left transition ${
                                        isSelected
                                            ? 'border-slate-900 bg-slate-900 text-white'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                    }`}
                                    aria-pressed={isSelected}
                                >
                                    <div className="text-sm font-semibold mb-3">{option.text}</div>
                                    <div className={`text-xs ${isSelected ? 'text-slate-200' : 'text-gray-500'}`}>
                                        {option.note}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-600">
                        <span className="font-semibold text-gray-700">Output:</span>{' '}
                        {selected ? selected.text : 'No interpretation selected yet.'}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{t.note}</div>
                </div>
            </ConceptStage>
            <ExplainPanel>{t.explain}</ExplainPanel>
        </div>
    );
};
