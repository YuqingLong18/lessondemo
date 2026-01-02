import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const points: Record<string, { x: number; y: number; group: string }> = {
    man: { x: 100, y: 230, group: 'gender' },
    woman: { x: 190, y: 210, group: 'gender' },
    king: { x: 80, y: 85, group: 'gender' },
    queen: { x: 170, y: 65, group: 'gender' },
    france: { x: 400, y: 240, group: 'geo' },
    italy: { x: 470, y: 210, group: 'geo' },
    paris: { x: 330, y: 170, group: 'geo' },
    rome: { x: 400, y: 140, group: 'geo' },
    walk: { x: 140, y: 310, group: 'tense' },
    walked: { x: 180, y: 240, group: 'tense' },
    swim: { x: 250, y: 300, group: 'tense' },
    swam: { x: 290, y: 230, group: 'tense' },
};

const examples = [
    {
        id: 'royalty',
        label: 'king - man + woman',
        from: 'man',
        to: 'king',
        applyFrom: 'woman',
        applyTo: 'queen',
    },
    {
        id: 'capital',
        label: 'paris - france + italy',
        from: 'france',
        to: 'paris',
        applyFrom: 'italy',
        applyTo: 'rome',
    },
    {
        id: 'tense',
        label: 'walked - walk + swim',
        from: 'walk',
        to: 'walked',
        applyFrom: 'swim',
        applyTo: 'swam',
    },
];

const groupColors: Record<string, string> = {
    gender: '#f97316',
    geo: '#14b8a6',
    tense: '#6366f1',
};

export const Slide9_WordEmbeddings: React.FC = () => {
    const { language } = useLanguage();
    const [selectedId, setSelectedId] = useState(examples[0].id);

    const text = {
        en: {
            title: 'Embeddings place words in a numeric space.',
            selectorLabel: 'Vector analogy',
            analogyTag: 'Analogy',
            explain: `
- Similar words end up near each other in the vector space.
- Directions capture relationships like gender or tense.
- Simple vector math can reveal missing words.
`,
        },
        zh: {
            title: '词向量把词映射到数字空间中。',
            selectorLabel: '向量类比',
            analogyTag: '类比',
            explain: `
- 相近的词会在向量空间中靠得更近。
- 向量方向可以刻画性别或时态关系。
- 简单的向量运算也能补出缺失的词。
`,
        },
    };

    const t = text[language];
    const example = examples.find((item) => item.id === selectedId) ?? examples[0];

    const highlights = useMemo(() => {
        return new Set([example.from, example.to, example.applyFrom, example.applyTo]);
    }, [example]);

    const arrowA = { start: points[example.from], end: points[example.to] };
    const arrowB = { start: points[example.applyFrom], end: points[example.applyTo] };

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-base text-gray-600 mb-4">{t.title}</div>
                    <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                            <div className="text-base font-semibold text-gray-700">{t.selectorLabel}</div>
                            <select
                                value={selectedId}
                                onChange={(event) => setSelectedId(event.target.value)}
                                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-800 shadow-sm"
                                aria-label={t.selectorLabel}
                            >
                                {examples.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 min-h-0 rounded-2xl border border-gray-200 bg-white overflow-hidden">
                            <svg viewBox="0 0 520 340" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <marker
                                        id="arrow"
                                        viewBox="0 0 10 10"
                                        refX="6"
                                        refY="5"
                                        markerWidth="6"
                                        markerHeight="6"
                                        orient="auto-start-reverse"
                                    >
                                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#111827" />
                                    </marker>
                                </defs>
                                <line
                                    x1={arrowA.start.x}
                                    y1={arrowA.start.y}
                                    x2={arrowA.end.x}
                                    y2={arrowA.end.y}
                                    stroke="#111827"
                                    strokeWidth={2}
                                    markerEnd="url(#arrow)"
                                />
                                <line
                                    x1={arrowB.start.x}
                                    y1={arrowB.start.y}
                                    x2={arrowB.end.x}
                                    y2={arrowB.end.y}
                                    stroke="#111827"
                                    strokeWidth={2}
                                    markerEnd="url(#arrow)"
                                />
                                {Object.entries(points).map(([word, point]) => {
                                    const isHighlighted = highlights.has(word);
                                    const color = groupColors[point.group] ?? '#64748b';
                                    return (
                                        <g key={word}>
                                            <circle
                                                cx={point.x}
                                                cy={point.y}
                                                r={isHighlighted ? 9 : 7}
                                                fill={color}
                                                opacity={isHighlighted ? 1 : 0.5}
                                            />
                                            <text
                                                x={point.x + 10}
                                                y={point.y + 4}
                                                fontSize={14}
                                                fill={isHighlighted ? '#111827' : '#6b7280'}
                                            >
                                                {word}
                                            </text>
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-base text-gray-700">
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white">
                            {t.analogyTag}
                        </span>
                        <span className="font-semibold">{example.label}</span>
                        <span className="text-gray-500">=</span>
                        <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1 font-semibold text-emerald-700">
                            {example.applyTo}
                        </span>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{t.explain}</ExplainPanel>
        </div>
    );
};
