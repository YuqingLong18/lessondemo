import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const WIDTH = 420;
const HEIGHT = 200;
const PADDING = 28;

export const Slide3_LossFunction: React.FC = () => {
    const { language } = useLanguage();
    const [prediction, setPrediction] = useState(0.35);
    const target = 1;
    const loss = Math.pow(prediction - target, 2);

    const curvePoints = useMemo(() => {
        const points: string[] = [];
        for (let i = 0; i <= 100; i += 1) {
            const x = i / 100;
            const y = Math.pow(x - target, 2);
            const px = PADDING + x * (WIDTH - PADDING * 2);
            const py = HEIGHT - PADDING - y * (HEIGHT - PADDING * 2);
            points.push(`${px},${py}`);
        }
        return points.join(' ');
    }, [target]);

    const pointX = PADDING + prediction * (WIDTH - PADDING * 2);
    const pointY = HEIGHT - PADDING - loss * (HEIGHT - PADDING * 2);

    const panel =
        language === 'zh'
            ? `**Model Training: Loss**\n\n- A loss function measures the gap between prediction and target.\n- Training seeks parameters that minimize the loss.\n- Smaller loss means the model fits the data better.`
            : `**Model Training: Loss**\n\n- A loss function measures the gap between prediction and target.\n- Training seeks parameters that minimize the loss.\n- Smaller loss means the model fits the data better.`;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex items-center gap-8">
                    <div className="flex-1 flex flex-col items-center">
                        <div className="text-sm text-gray-500 mb-3">
                            Loss = (Y - T)^2, target T = {target}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                Loss curve
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-rose-500" />
                                Current loss
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
                            <circle cx={pointX} cy={pointY} r="6" fill="#f43f5e" />
                        </svg>
                        <div className="text-xs text-gray-400 mt-2">Prediction (Y) on x-axis, loss on y-axis.</div>
                    </div>

                    <div className="w-64 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                        <div className="text-xs uppercase text-blue-500">Prediction</div>
                        <div className="text-2xl font-semibold text-gray-900 mt-1">{prediction.toFixed(2)}</div>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={prediction}
                            onChange={(event) => setPrediction(Number(event.target.value))}
                            className="w-full mt-4 accent-blue-600"
                            aria-label="Prediction value"
                        />

                        <div className="mt-6 text-xs uppercase text-rose-500">Loss value</div>
                        <div className="text-2xl font-semibold text-rose-600 mt-1">{loss.toFixed(3)}</div>
                        <div className="text-xs text-gray-500 mt-2">
                            Lower loss means closer to the target.
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
