import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { RefreshCw } from 'lucide-react';

const WIDTH = 600;
const HEIGHT = 320;
const PADDING = 28;
const W_MIN = -2;
const W_MAX = 6;
const MAX_LOSS = 8; // Adjusted for new function range

// Non-convex loss function: Quadratic bowl + Cosine ripples
const lossFn = (w: number) => 0.3 * Math.pow(w - 2, 2) - 0.8 * Math.cos(3 * w) + 1.5;
// Gradient: 0.6 * (w - 2) + 2.4 * sin(3 * w)
const gradientFn = (w: number) => 0.6 * (w - 2) + 2.4 * Math.sin(3 * w);

export const Slide4_GradientDescent: React.FC = () => {
    const { language } = useLanguage();
    const [learningRate, setLearningRate] = useState(0.15); // Slightly lower default LR for stability
    const [steps, setSteps] = useState(10);
    const [startW, setStartW] = useState(-1);

    const curvePoints = useMemo(() => {
        const points: string[] = [];
        for (let i = 0; i <= 150; i += 1) { // Higher res for ripples
            const w = W_MIN + (i / 150) * (W_MAX - W_MIN);
            const loss = lossFn(w);
            const x = PADDING + ((w - W_MIN) / (W_MAX - W_MIN)) * (WIDTH - PADDING * 2);
            const y = HEIGHT - PADDING - (loss / MAX_LOSS) * (HEIGHT - PADDING * 2);
            points.push(`${x},${y}`);
        }
        return points.join(' ');
    }, []);

    const path = useMemo(() => {
        const values: number[] = [];
        let w = startW;
        values.push(w);
        for (let i = 0; i < steps; i += 1) {
            const grad = gradientFn(w);
            w = w - learningRate * grad;
            // Bound w to keep visualization sane, though math can go outside
            if (w < W_MIN) w = W_MIN;
            if (w > W_MAX) w = W_MAX;
            values.push(w);
        }
        return values;
    }, [learningRate, steps, startW]);

    const lastW = path[path.length - 1];
    const lastLoss = lossFn(lastW);

    const randomizeStart = () => {
        const range = W_MAX - W_MIN;
        // Keep slightly away from edges
        const newW = W_MIN + 0.5 + Math.random() * (range - 1);
        setStartW(newW);
    };

    const copy = {
        zh: {
            panel: `**局部最小值的陷阱**\n\n- 在复杂地形中，梯度下降可能陷入“局部谷底”（局部最小值）。\n- 起点很重要！\n- 点击 **随机起点** 看初始位置如何影响最终结果。`,
            equationLabel: '损失函数 Loss(w) = 0.3(w-2)² - 0.8cos(3w) + 1.5',
            legendLoss: '损失曲线',
            legendSteps: '迭代步骤',
            legendFinal: '最终点',
            caption: '小球会往下滚，但可能卡在小坑里。',
            initialization: '初始化',
            randomize: '随机起点',
            learningRate: '学习率',
            steps: '步数',
            currentParam: '当前参数',
            finalLoss: '最终损失',
        },
        en: {
            panel: `**The Trap of Local Minima**\n\n- In complex landscapes, gradient descent can get stuck in a "local valley" (local minimum).\n- The starting point matters!\n- Try **Randomize Start** to see how the initial position affects the final result.`,
            equationLabel: 'Loss(w) = 0.3(w-2)² - 0.8cos(3w) + 1.5',
            legendLoss: 'Loss curve',
            legendSteps: 'Steps',
            legendFinal: 'Final',
            caption: 'The ball rolls down, but can get stuck in small holes.',
            initialization: 'Initialization',
            randomize: 'Randomize Start',
            learningRate: 'Learning rate',
            steps: 'Steps',
            currentParam: 'Current Param',
            finalLoss: 'Final Loss',
        },
    };
    const text = copy[language];
    const panel = text.panel;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex items-center gap-8 font-sans">
                    <div className="flex-1 flex flex-col items-center">
                        <div className="text-sm text-gray-500 mb-3 font-semibold">
                            {text.equationLabel}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                {text.legendLoss}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-slate-400" />
                                {text.legendSteps}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-700" />
                                {text.legendFinal}
                            </span>
                        </div>
                        <svg width={WIDTH} height={HEIGHT} className="bg-white rounded-lg border border-slate-50 shadow-sm">
                            <line
                                x1={PADDING}
                                y1={HEIGHT - PADDING}
                                x2={WIDTH - PADDING}
                                y2={HEIGHT - PADDING}
                                stroke="#e2e8f0"
                            />
                            <line
                                x1={PADDING}
                                y1={PADDING}
                                x2={PADDING}
                                y2={HEIGHT - PADDING}
                                stroke="#e2e8f0"
                            />
                            <polyline points={curvePoints} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
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
                                        r={isLast ? 6 : 3}
                                        fill={isLast ? '#1d4ed8' : '#94a3b8'}
                                        className="transition-all duration-300"
                                    />
                                );
                            })}
                        </svg>
                        <div className="text-xs text-slate-400 mt-2 italic">{text.caption}</div>
                    </div>

                    <div className="w-72 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-5">

                        {/* Start Control */}
                        <div>
                            <div className="text-xs uppercase text-slate-500 font-bold mb-2">{text.initialization}</div>
                            <button
                                onClick={randomizeStart}
                                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                {text.randomize}
                            </button>
                        </div>

                        {/* Learning Rate */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <div className="text-xs uppercase text-blue-500 font-bold">{text.learningRate}</div>
                                <div className="text-sm font-semibold text-gray-900">{learningRate.toFixed(2)}</div>
                            </div>
                            <input
                                type="range"
                                min={0.01}
                                max={0.4}
                                step={0.01}
                                value={learningRate}
                                onChange={(event) => setLearningRate(Number(event.target.value))}
                                className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Steps */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <div className="text-xs uppercase text-slate-500 font-bold">{text.steps}</div>
                                <div className="text-sm font-semibold text-gray-900">{steps}</div>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={20}
                                step={1}
                                value={steps}
                                onChange={(event) => setSteps(Number(event.target.value))}
                                className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>

                        {/* Result */}
                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                                <div>
                                    <div className="text-[10px] uppercase text-slate-400 font-bold">{text.currentParam}</div>
                                    <div className="text-lg font-mono font-semibold text-slate-700">{lastW.toFixed(2)}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase text-slate-400 font-bold">{text.finalLoss}</div>
                                    <div className={`text-lg font-mono font-semibold ${lastLoss < 0.5 ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {lastLoss.toFixed(3)}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
