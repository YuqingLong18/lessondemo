import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const ideaOptions = [
    {
        id: 'past',
        label: 'Past memory',
        example: 'We mapped the stars long ago.',
        shared: 'A story is recorded and taught later.',
    },
    {
        id: 'future',
        label: 'Future plan',
        example: 'Next year we will build a bridge.',
        shared: 'A plan is shared for coordination.',
    },
    {
        id: 'imagined',
        label: 'Imagined world',
        example: 'A dragon guards a library of ideas.',
        shared: 'Creativity sparks new questions.',
    },
];

export const Slide1_LanguageBridge: React.FC = () => {
    const { language } = useLanguage();
    const [selectedId, setSelectedId] = useState('past');

    const text = {
        en: {
            title: 'Language lets us move ideas across time and people.',
            input: 'Experience',
            process: 'Language',
            output: 'Shared knowledge',
            explain: `
- Language stores ideas and lets them travel across generations.
- Words express the past, future, and imaginary with the same system.
- Culture grows when knowledge can be packaged and passed on.
`,
            controlsLabel: 'Choose an idea to send',
        },
        zh: {
            title: 'Language lets us move ideas across time and people.',
            input: 'Experience',
            process: 'Language',
            output: 'Shared knowledge',
            explain: `
- Language stores ideas and lets them travel across generations.
- Words express the past, future, and imaginary with the same system.
- Culture grows when knowledge can be packaged and passed on.
`,
            controlsLabel: 'Choose an idea to send',
        },
    };

    const t = text[language];
    const selected = ideaOptions.find((idea) => idea.id === selectedId) ?? ideaOptions[0];

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-sm text-gray-500 mb-3">{t.title}</div>
                    <div className="flex-1 flex items-center justify-center gap-5">
                        <div className="w-64">
                            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t.input}</div>
                            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-4 shadow-sm">
                                <div className="text-sm font-semibold text-gray-800 mb-2">{selected.label}</div>
                                <div className="text-xs text-gray-600">{selected.example}</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-400 text-lg font-semibold">-&gt;</div>
                            <div className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
                                {t.process}
                            </div>
                            <div className="text-gray-400 text-lg font-semibold">-&gt;</div>
                        </div>

                        <div className="w-64">
                            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{t.output}</div>
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
                                <div className="text-sm font-semibold text-emerald-800 mb-2">Result</div>
                                <div className="text-xs text-emerald-700">{selected.shared}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="text-xs text-gray-500 mb-2">{t.controlsLabel}</div>
                        <div className="flex gap-2">
                            {ideaOptions.map((idea) => {
                                const isActive = idea.id === selectedId;
                                return (
                                    <button
                                        key={idea.id}
                                        type="button"
                                        onClick={() => setSelectedId(idea.id)}
                                        className={`px-3 py-2 rounded-full text-xs font-semibold border transition ${
                                            isActive
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                        }`}
                                        aria-pressed={isActive}
                                    >
                                        {idea.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{t.explain}</ExplainPanel>
        </div>
    );
};
