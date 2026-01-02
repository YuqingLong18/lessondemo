import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const contexts = [
    {
        id: 'money',
        label: 'Money context',
        center: { x: 140, y: 150 },
        color: '#f97316',
        examples: ['loan', 'interest', 'account'],
    },
    {
        id: 'river',
        label: 'River context',
        center: { x: 380, y: 150 },
        color: '#0ea5e9',
        examples: ['water', 'shore', 'current'],
    },
];

const timeline = ['Rules', 'Statistics', 'Embeddings', 'RNN', 'Transformer'];

export const Slide10_ContextualEmbeddings: React.FC = () => {
    const { language } = useLanguage();
    const [selectedId, setSelectedId] = useState('money');

    const text = {
        en: {
            title: 'Context decides which meaning a word should take.',
            explain: `
- Traditional embeddings store one vector per word.
- Words like "bank" need different vectors for different contexts.
- Sequence models and Transformers learn contextual embeddings.
`,
            selectorLabel: 'Choose a context',
            staticLabel: 'Static embedding',
            staticNoteLine1: 'Static vector blurs',
            staticNoteLine2: 'both meanings.',
            contextualLabel: 'Contextual embedding',
        },
        zh: {
            title: 'Context decides which meaning a word should take.',
            explain: `
- Traditional embeddings store one vector per word.
- Words like "bank" need different vectors for different contexts.
- Sequence models and Transformers learn contextual embeddings.
`,
            selectorLabel: 'Choose a context',
            staticLabel: 'Static embedding',
            staticNoteLine1: 'Static vector blurs',
            staticNoteLine2: 'both meanings.',
            contextualLabel: 'Contextual embedding',
        },
    };

    const t = text[language];
    const selected = contexts.find((context) => context.id === selectedId) ?? contexts[0];

    const staticPoint = useMemo(() => ({ x: 260, y: 150 }), []);
    const contextualY = selected.center.y - 18;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-sm text-gray-500 mb-3">{t.title}</div>
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            {contexts.map((context) => {
                                const isActive = context.id === selectedId;
                                return (
                                    <button
                                        key={context.id}
                                        type="button"
                                        onClick={() => setSelectedId(context.id)}
                                        className={`px-3 py-2 rounded-full text-xs font-semibold border transition ${
                                            isActive
                                                ? 'bg-slate-900 text-white border-slate-900'
                                                : 'bg-white text-gray-600 border-gray-200'
                                        }`}
                                        aria-pressed={isActive}
                                    >
                                        {context.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex-1 rounded-2xl border border-gray-200 bg-white">
                            <svg viewBox="0 0 520 300" className="w-full h-full">
                                {contexts.map((context) => (
                                    <g key={context.id}>
                                        <circle
                                            cx={context.center.x}
                                            cy={context.center.y}
                                            r={70}
                                            fill={context.color}
                                            opacity={0.12}
                                        />
                                        <text
                                            x={context.center.x}
                                            y={context.center.y - 80}
                                            textAnchor="middle"
                                            fontSize={12}
                                            fill="#475569"
                                        >
                                            {context.label}
                                        </text>
                                        {context.examples.map((word, index) => (
                                            <text
                                                key={word}
                                                x={context.center.x}
                                                y={context.center.y + 18 + index * 16}
                                                textAnchor="middle"
                                                fontSize={11}
                                                fill="#64748b"
                                            >
                                                {word}
                                            </text>
                                        ))}
                                    </g>
                                ))}
                                <g>
                                    <circle cx={staticPoint.x} cy={staticPoint.y} r={10} fill="#94a3b8" />
                                    <text x={staticPoint.x} y={staticPoint.y + 26} textAnchor="middle" fontSize={11} fill="#475569">
                                        {t.staticLabel}
                                    </text>
                                    <text
                                        x={staticPoint.x}
                                        y={staticPoint.y + 42}
                                        textAnchor="middle"
                                        fontSize={10}
                                        fill="#64748b"
                                    >
                                        {t.staticNoteLine1}
                                    </text>
                                    <text
                                        x={staticPoint.x}
                                        y={staticPoint.y + 56}
                                        textAnchor="middle"
                                        fontSize={10}
                                        fill="#64748b"
                                    >
                                        {t.staticNoteLine2}
                                    </text>
                                </g>
                                <g>
                                    <circle
                                        cx={selected.center.x}
                                        cy={contextualY}
                                        r={12}
                                        fill="#0f172a"
                                    />
                                    <text
                                        x={selected.center.x + 18}
                                        y={contextualY + 4}
                                        fontSize={12}
                                        fill="#0f172a"
                                    >
                                        bank
                                    </text>
                                    <text
                                        x={selected.center.x}
                                        y={selected.center.y + 92}
                                        textAnchor="middle"
                                        fontSize={11}
                                        fill="#0f172a"
                                    >
                                        {t.contextualLabel}
                                    </text>
                                </g>
                            </svg>
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
                            {timeline.map((step) => {
                                const isActive = step === 'Embeddings';
                                const isNext = step === 'RNN' || step === 'Transformer';
                                return (
                                    <span
                                        key={step}
                                        className={`px-2 py-1 rounded-full ${
                                            isActive
                                                ? 'bg-slate-900 text-white'
                                                : isNext
                                                    ? 'bg-indigo-100 text-indigo-700'
                                                    : 'bg-white border border-slate-200'
                                        }`}
                                    >
                                        {step}
                                    </span>
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
