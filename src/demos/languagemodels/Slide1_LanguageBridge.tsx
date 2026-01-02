import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const ideaOptions = [
    {
        id: 'past',
        label: { en: 'Past memory', zh: '过去的记忆' },
        example: { en: 'We mapped the stars long ago.', zh: '我们很久以前绘制过星图。' },
        shared: { en: 'A story is recorded and taught later.', zh: '故事被记录并在后来传授。' },
    },
    {
        id: 'future',
        label: { en: 'Future plan', zh: '未来计划' },
        example: { en: 'Next year we will build a bridge.', zh: '明年我们将修一座桥。' },
        shared: { en: 'A plan is shared for coordination.', zh: '计划被分享以便协作。' },
    },
    {
        id: 'imagined',
        label: { en: 'Imagined world', zh: '想象世界' },
        example: { en: 'A dragon guards a library of ideas.', zh: '一条巨龙守护着思想图书馆。' },
        shared: { en: 'Creativity sparks new questions.', zh: '创造力激发新的问题。' },
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
            resultLabel: 'Result',
            explain: `
- Language stores ideas and lets them travel across generations.
- Words express the past, future, and imaginary with the same system.
- Culture grows when knowledge can be packaged and passed on.
`,
            controlsLabel: 'Choose an idea to send',
        },
        zh: {
            title: '语言让思想跨越时间与人群。',
            input: '经历',
            process: '语言',
            output: '共享知识',
            resultLabel: '结果',
            explain: `
- 语言存储思想，使其跨代传播。
- 同一套系统可以表达过去、未来与想象。
- 当知识被打包并传递，文化才得以累积。
`,
            controlsLabel: '选择一个要传递的想法',
        },
    };

    const t = text[language];
    const selected = ideaOptions.find((idea) => idea.id === selectedId) ?? ideaOptions[0];

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-base text-gray-600 mb-4">{t.title}</div>
                    <div className="flex-1 flex items-center justify-center gap-5">
                        <div className="w-72">
                            <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">{t.input}</div>
                            <div className="rounded-2xl border border-gray-200 bg-slate-50 p-5 shadow-sm">
                                <div className="text-base font-semibold text-gray-800 mb-2">{selected.label[language]}</div>
                                <div className="text-sm text-gray-600">{selected.example[language]}</div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <div className="text-gray-400 text-xl font-semibold">-&gt;</div>
                            <div className="rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-700">
                                {t.process}
                            </div>
                            <div className="text-gray-400 text-xl font-semibold">-&gt;</div>
                        </div>

                        <div className="w-72">
                            <div className="text-sm uppercase tracking-wide text-gray-500 mb-2">{t.output}</div>
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
                                <div className="text-base font-semibold text-emerald-800 mb-2">{t.resultLabel}</div>
                                <div className="text-sm text-emerald-700">{selected.shared[language]}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="text-sm text-gray-500 mb-2">{t.controlsLabel}</div>
                        <div className="flex gap-2">
                            {ideaOptions.map((idea) => {
                                const isActive = idea.id === selectedId;
                                return (
                                    <button
                                        key={idea.id}
                                        type="button"
                                        onClick={() => setSelectedId(idea.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                                            isActive
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                        }`}
                                        aria-pressed={isActive}
                                    >
                                        {idea.label[language]}
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
