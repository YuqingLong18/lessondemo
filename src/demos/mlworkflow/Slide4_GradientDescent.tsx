import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const WIDTH = 420;
const HEIGHT = 200;
const PADDING = 28;
const W_MIN = -2;
const W_MAX = 6;
const MAX_LOSS = 16;

const lossFn = (w: number) => Math.pow(w - 2, 2);

export const Slide4_GradientDescent: React.FC = () => {
    const { language } = useLanguage();
    const [learningRate, setLearningRate] = useState(0.2);
    const [steps, setSteps] = useState(6);

    const curvePoints = useMemo(() => {
        const points: string[] = [];
        for (let i = 0; i <= 120; i += 1) {
            const w = W_MIN + (i / 120) * (W_MAX - W_MIN);
            const loss = lossFn(w);
            const x = PADDING + ((w - W_MIN) / (W_MAX - W_MIN)) * (WIDTH - PADDING * 2);
            const y = HEIGHT - PADDING - (loss / MAX_LOSS) * (HEIGHT - PADDING * 2);
            points.push(`${x},${y}`);
        }
        return points.join(' ');
    }, []);

    const path = useMemo(() => {
        const values: number[] = [];
        let w = -1;
        values.push(w);
        for (let i = 0; i < steps; i += 1) {
            const gradient = 2 * (w - 2);
            w = w - learningRate * gradient;
            values.push(w);
        }
        return values;
    }, [learningRate, steps]);

    const lastW = path[path.length - 1];
    const lastLoss = lossFn(lastW);

    const panel =
        language === 'zh'
            ? `**Gradient Descent**\n\n- Move parameters in the direction that reduces loss the fastest.\n- Learning rate controls the step size.\n- Repeating updates leads toward a low-loss valley.`
            : `**Gradient Descent**\n\n- Move parameters in the direction that reduces loss the fastest.\n- Learning rate controls the step size.\n- Repeating updates leads toward a low-loss valley.`;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex items-center gap-8">
                    <div className="flex-1 flex flex-col items-center">
                        <div className="text-sm text-gray-500 mb-3">
                            Update rule: w = w - lr * gradient
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                Loss curve
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-400" />
                                Steps
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-700" />
                                Current
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
                            <polyline points={curvePoints} fill="none" stroke="#3b82f6" strokeWidth="3" />
                            {path.map((w, index) => {
                                const loss = lossFn(w);
                                const x = PADDING + ((w - W_MIN) / (W_MAX - W_MIN)) * (WIDTH - PADDING * 2);
                                const y = HEIGHT - PADDING - (loss / MAX_LOSS) * (HEIGHT - PADDING * 2);
                                const isLast = index === path.length - 1;
                                return (
                                    <circle
                                        key={`${w}-${index}`}
                                        cx={x}
                                        cy={y}
                                        r={isLast ? 6 : 4}
                                        fill={isLast ? '#1d4ed8' : '#94a3b8'}
                                    />
                                );
                            })}
                        </svg>
                        <div className="text-xs text-gray-400 mt-2">Dots show each step of gradient descent.</div>
                    </div>

                    <div className="w-64 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                        <div className="text-xs uppercase text-blue-500">Learning rate</div>
                        <div className="text-2xl font-semibold text-gray-900 mt-1">{learningRate.toFixed(2)}</div>
                        <input
                            type="range"
                            min={0.05}
                            max={0.5}
                            step={0.01}
                            value={learningRate}
                            onChange={(event) => setLearningRate(Number(event.target.value))}
                            className="w-full mt-4 accent-blue-600"
                            aria-label="Learning rate"
                        />

                        <div className="mt-6 text-xs uppercase text-slate-500">Steps</div>
                        <div className="text-2xl font-semibold text-gray-900 mt-1">{steps}</div>
                        <input
                            type="range"
                            min={0}
                            max={12}
                            step={1}
                            value={steps}
                            onChange={(event) => setSteps(Number(event.target.value))}
                            className="w-full mt-4 accent-blue-600"
                            aria-label="Steps"
                        />

                        <div className="mt-6 text-xs uppercase text-blue-600">Current w</div>
                        <div className="text-2xl font-semibold text-blue-700 mt-1">{lastW.toFixed(2)}</div>
                        <div className="text-xs text-gray-500 mt-2">Loss: {lastLoss.toFixed(2)}</div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
