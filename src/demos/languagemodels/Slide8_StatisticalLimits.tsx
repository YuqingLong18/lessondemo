import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const tokens = ['The', 'cat', 'that', 'the', 'dog', 'chased', 'was', 'black,', 'but', 'the'];

export const Slide8_StatisticalLimits: React.FC = () => {
    const { language } = useLanguage();
    const [windowSize, setWindowSize] = useState(4);

    const text = {
        en: {
            title: 'Short windows miss long-range meaning.',
            sliderLabel: 'Context window size',
            explain: `
- N-gram models only remember a few recent words.
- Long sentences can hide the true subject.
- This limits understanding of who did what to whom.
`,
            correct: 'Correct referent: cat',
        },
        zh: {
            title: 'Short windows miss long-range meaning.',
            sliderLabel: 'Context window size',
            explain: `
- N-gram models only remember a few recent words.
- Long sentences can hide the true subject.
- This limits understanding of who did what to whom.
`,
            correct: 'Correct referent: cat',
        },
    };

    const t = text[language];

    const highlightStart = useMemo(() => {
        return Math.max(0, tokens.length - windowSize);
    }, [windowSize]);

    const predictedWord = useMemo(() => {
        if (windowSize <= 4) {
            return 'dog';
        }
        if (windowSize <= 6) {
            return 'chased';
        }
        return 'cat';
    }, [windowSize]);

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-sm text-gray-500 mb-3">{t.title}</div>
                    <div className="flex-1 flex flex-col gap-6">
                        <div>
                            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Sentence prefix</div>
                            <div className="flex flex-wrap gap-2">
                                {tokens.map((token, index) => {
                                    const isVisible = index >= highlightStart;
                                    return (
                                        <span
                                            key={`${token}-${index}`}
                                            className={`px-2 py-1 rounded-full text-xs border ${
                                                isVisible
                                                    ? 'bg-amber-500 text-white border-amber-500'
                                                    : 'bg-slate-100 text-slate-400 border-slate-200'
                                            }`}
                                        >
                                            {token}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5">
                            <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Model guess</div>
                            <div className="text-lg font-semibold text-gray-800">The {predictedWord} was fast.</div>
                            <div className="text-xs text-gray-500 mt-2">{t.correct}</div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                        <div className="text-xs text-gray-500">{t.sliderLabel}: {windowSize} words</div>
                        <input
                            type="range"
                            min={3}
                            max={9}
                            step={1}
                            value={windowSize}
                            onChange={(event) => setWindowSize(Number(event.target.value))}
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
