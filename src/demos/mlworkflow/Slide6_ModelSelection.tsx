import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

type Choice = 'simple' | 'complex' | null;

export const Slide6_ModelSelection: React.FC = () => {
    const { language } = useLanguage();
    const [gap, setGap] = useState(1);
    const [choice, setChoice] = useState<Choice>(null);

    const simpleScore = 82;
    const complexScore = Math.min(98, simpleScore + gap);
    const recommendSimple = gap <= 2;

    const feedback =
        choice === null
            ? 'Pick a model and see the reasoning.'
            : choice === 'simple'
                ? recommendSimple
                    ? 'Correct: when performance is similar, choose the simpler model.'
                    : 'Consider complexity: the gain may justify the extra capacity.'
                : recommendSimple
                    ? 'Occam says the simpler model is safer when performance is similar.'
                    : 'Correct: the complex model earns its extra complexity here.';

    const panel =
        language === 'zh'
            ? `**Model Selection**\n\n- Prefer simpler models when performance is similar.\n- Occam's Razor reduces unnecessary complexity.\n- The right trade-off depends on the task and data.`
            : `**Model Selection**\n\n- Prefer simpler models when performance is similar.\n- Occam's Razor reduces unnecessary complexity.\n- The right trade-off depends on the task and data.`;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs uppercase text-gray-400">Performance gap</div>
                            <div className="text-2xl font-semibold text-gray-900 mt-1">+{gap}%</div>
                        </div>
                        <div className="w-64">
                            <input
                                type="range"
                                min={0}
                                max={10}
                                step={1}
                                value={gap}
                                onChange={(event) => {
                                    setGap(Number(event.target.value));
                                    setChoice(null);
                                }}
                                className="w-full accent-purple-600"
                                aria-label="Performance gap"
                            />
                            <div className="text-xs text-gray-500 mt-2">How much better is the complex model?</div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center gap-6">
                        <button
                            type="button"
                            onClick={() => setChoice('simple')}
                            className={`flex-1 rounded-2xl border p-6 text-left shadow-sm transition-all ${
                                recommendSimple ? 'border-purple-400 ring-2 ring-purple-100' : 'border-gray-200'
                            } ${choice === 'simple' ? 'bg-purple-50' : 'bg-white'}`}
                            aria-pressed={choice === 'simple'}
                        >
                            <div className="text-xs uppercase text-gray-400">Simple model</div>
                            <div className="text-3xl font-semibold text-gray-900 mt-2">{simpleScore}%</div>
                            <div className="text-sm text-gray-500 mt-2">Low complexity, fast to train.</div>
                        </button>

                        <button
                            type="button"
                            onClick={() => setChoice('complex')}
                            className={`flex-1 rounded-2xl border p-6 text-left shadow-sm transition-all ${
                                !recommendSimple ? 'border-purple-400 ring-2 ring-purple-100' : 'border-gray-200'
                            } ${choice === 'complex' ? 'bg-purple-50' : 'bg-white'}`}
                            aria-pressed={choice === 'complex'}
                        >
                            <div className="text-xs uppercase text-gray-400">Complex model</div>
                            <div className="text-3xl font-semibold text-gray-900 mt-2">{complexScore}%</div>
                            <div className="text-sm text-gray-500 mt-2">Higher capacity, more resource cost.</div>
                        </button>
                    </div>

                    <div className="text-sm text-gray-600 bg-white border border-purple-100 rounded-xl p-4">
                        {feedback}
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
