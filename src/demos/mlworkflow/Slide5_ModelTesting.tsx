import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const WIDTH = 600;
const HEIGHT = 320;
const PADDING = 28;
const COMPLEXITY_MAX = 10;

const trainAccuracy = (c: number) => Math.min(0.95, 0.6 + 0.04 * c + 0.02 * Math.log(1 + c));
const testAccuracy = (c: number) => 0.6 + 0.08 * c - 0.008 * c * c;

export const Slide5_ModelTesting: React.FC = () => {
    const { language } = useLanguage();
    const [complexity, setComplexity] = useState(4);

    const points = useMemo(() => {
        const trainPoints: string[] = [];
        const testPoints: string[] = [];
        for (let i = 0; i <= COMPLEXITY_MAX; i += 1) {
            const x = PADDING + (i / COMPLEXITY_MAX) * (WIDTH - PADDING * 2);
            const train = trainAccuracy(i);
            const test = testAccuracy(i);
            const trainY = HEIGHT - PADDING - (train - 0.5) * (HEIGHT - PADDING * 2) / 0.5;
            const testY = HEIGHT - PADDING - (test - 0.5) * (HEIGHT - PADDING * 2) / 0.5;
            trainPoints.push(`${x},${trainY}`);
            testPoints.push(`${x},${testY}`);
        }
        return { train: trainPoints.join(' '), test: testPoints.join(' ') };
    }, []);

    const currentTrain = trainAccuracy(complexity);
    const currentTest = testAccuracy(complexity);
    const currentX = PADDING + (complexity / COMPLEXITY_MAX) * (WIDTH - PADDING * 2);
    const currentTrainY = HEIGHT - PADDING - (currentTrain - 0.5) * (HEIGHT - PADDING * 2) / 0.5;
    const currentTestY = HEIGHT - PADDING - (currentTest - 0.5) * (HEIGHT - PADDING * 2) / 0.5;

    const fitLabel =
        complexity < 3
            ? 'Underfitting: model too simple'
            : complexity > 7
                ? 'Overfitting: model too complex'
                : 'Good fit: balanced complexity';
    const fitTone =
        complexity < 3
            ? 'text-amber-700 bg-amber-50 border-amber-200'
            : complexity > 7
                ? 'text-rose-700 bg-rose-50 border-rose-200'
                : 'text-emerald-700 bg-emerald-50 border-emerald-200';

    const panel =
        language === 'zh'
            ? `**Model Testing**\n\n- Test on data that the model has not seen before.\n- Overfitting happens when training performance is high but test performance drops.\n- Underfitting happens when both are low because the model is too simple.`
            : `**Model Testing**\n\n- Test on data that the model has not seen before.\n- Overfitting happens when training performance is high but test performance drops.\n- Underfitting happens when both are low because the model is too simple.`;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex items-center gap-8">
                    <div className="flex-1 flex flex-col items-center">
                        <div className="text-sm text-gray-500 mb-3">
                            Training vs test accuracy across model complexity
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                Training accuracy
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                Test accuracy
                            </span>
                        </div>
                        <svg width={WIDTH} height={HEIGHT} className="bg-white">
                            <line
                                x1={PADDING}
                                y1={HEIGHT - PADDING}
                                x2={WIDTH - PADDING}
                                y2={HEIGHT - PADDING}
                                stroke="#d1d5db"
                            />
                            <line
                                x1={PADDING}
                                y1={PADDING}
                                x2={PADDING}
                                y2={HEIGHT - PADDING}
                                stroke="#d1d5db"
                            />
                            <polyline
                                points={points.train}
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="3"
                            />
                            <polyline
                                points={points.test}
                                fill="none"
                                stroke="#3b82f6"
                                strokeWidth="3"
                            />
                            <line
                                x1={currentX}
                                y1={PADDING}
                                x2={currentX}
                                y2={HEIGHT - PADDING}
                                stroke="#e5e7eb"
                                strokeDasharray="4 4"
                            />
                            <circle cx={currentX} cy={currentTrainY} r="5" fill="#22c55e" />
                            <circle cx={currentX} cy={currentTestY} r="5" fill="#3b82f6" />
                        </svg>
                        <div className="text-xs text-gray-400 mt-2">
                            Green: training accuracy, blue: test accuracy.
                        </div>
                    </div>

                    <div className="w-64 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                        <div className="text-xs uppercase text-gray-400">Model complexity</div>
                        <div className="text-2xl font-semibold text-gray-900 mt-1">{complexity}</div>
                        <input
                            type="range"
                            min={0}
                            max={COMPLEXITY_MAX}
                            step={1}
                            value={complexity}
                            onChange={(event) => setComplexity(Number(event.target.value))}
                            className="w-full mt-4 accent-blue-600"
                            aria-label="Model complexity"
                        />

                        <div className="mt-6 text-xs uppercase text-emerald-500">Training accuracy</div>
                        <div className="text-lg font-semibold text-emerald-600 mt-1">
                            {(currentTrain * 100).toFixed(1)}%
                        </div>

                        <div className="mt-4 text-xs uppercase text-blue-500">Test accuracy</div>
                        <div className="text-lg font-semibold text-blue-600 mt-1">
                            {(currentTest * 100).toFixed(1)}%
                        </div>

                        <div className={`mt-4 text-xs border rounded-lg px-2 py-2 ${fitTone}`}>{fitLabel}</div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
