import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const contextTokens = ['I', 'want', 'to', 'learn', 'about'];

const predictionsByN: Record<number, { word: string; prob: number }[]> = {
    2: [
        { word: 'it', prob: 0.4 },
        { word: 'that', prob: 0.32 },
        { word: 'today', prob: 0.28 },
    ],
    3: [
        { word: 'this', prob: 0.36 },
        { word: 'math', prob: 0.34 },
        { word: 'history', prob: 0.3 },
    ],
    4: [
        { word: 'language', prob: 0.45 },
        { word: 'ai', prob: 0.32 },
        { word: 'music', prob: 0.23 },
    ],
    5: [
        { word: 'language', prob: 0.58 },
        { word: 'transformers', prob: 0.25 },
        { word: 'culture', prob: 0.17 },
    ],
};

export const Slide7_StatisticalNgram: React.FC = () => {
    const { language } = useLanguage();
    const [nValue, setNValue] = useState(4);

    const text = {
        en: {
            title: 'N-gram models predict the next word from a short window.',
            sliderLabel: 'Context size (n)',
            explain: `
- Statistical models learn which word sequences are common.
- A bigger window usually improves the prediction.
- They still only see the last n - 1 words.
`,
        },
        zh: {
            title: 'N-gram models predict the next word from a short window.',
            sliderLabel: 'Context size (n)',
            explain: `
- Statistical models learn which word sequences are common.
- A bigger window usually improves the prediction.
- They still only see the last n - 1 words.
`,
        },
    };

    const t = text[language];
    const predictions = predictionsByN[nValue];

    const highlightStart = useMemo(() => {
        return Math.max(0, contextTokens.length - (nValue - 1));
    }, [nValue]);

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-sm text-gray-500 mb-3">{t.title}</div>
                    <div className="flex-1 grid grid-cols-[1.05fr_1fr] gap-6">
                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Context window</div>
                                <div className="flex flex-wrap gap-2">
                                    {contextTokens.map((token, index) => {
                                        const isActive = index >= highlightStart;
                                        return (
                                            <span
                                                key={`${token}-${index}`}
                                                className={`px-2 py-1 rounded-full text-xs border ${
                                                    isActive
                                                        ? 'bg-slate-900 text-white border-slate-900'
                                                        : 'bg-slate-100 text-slate-500 border-slate-200'
                                                }`}
                                            >
                                                {token}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">Next word probabilities</div>
                                <div className="space-y-2">
                                    {predictions.map((prediction) => (
                                        <div key={prediction.word} className="flex items-center gap-3 text-sm text-gray-700">
                                            <span className="w-20 font-semibold">{prediction.word}</span>
                                            <div className="flex-1 h-2 bg-white border border-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-slate-900"
                                                    style={{ width: `${prediction.prob * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-500">{Math.round(prediction.prob * 100)}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center rounded-2xl border border-indigo-200 bg-indigo-50 p-5 text-center">
                            <div className="text-xs uppercase tracking-wide text-indigo-600 mb-3">Top guess</div>
                            <div className="text-3xl font-semibold text-indigo-800">{predictions[0].word}</div>
                            <div className="text-xs text-indigo-700 mt-2">Based on the last {nValue - 1} words.</div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                        <div className="text-xs text-gray-500">{t.sliderLabel}: {nValue}</div>
                        <input
                            type="range"
                            min={2}
                            max={5}
                            step={1}
                            value={nValue}
                            onChange={(event) => setNValue(Number(event.target.value))}
                            className="w-64"
                            aria-label={t.sliderLabel}
                        />
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{t.explain}</ExplainPanel>
        </div>
    );
};
