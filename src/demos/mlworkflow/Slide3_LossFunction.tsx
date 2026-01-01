import React, { useState, useMemo } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

export const Slide3_LossFunction: React.FC = () => {
    const { language } = useLanguage();

    // 8 Parameters for the complex loss function
    const [params, setParams] = useState({
        w1: 0, w2: 0, w3: 0, w4: 0,
        w5: 0, w6: 0, w7: 0, w8: 0
    });

    // A highly non-linear, non-convex loss function with 8 parameters
    const loss = useMemo(() => {
        const { w1, w2, w3, w4, w5, w6, w7, w8 } = params;

        // Block 1: Rosenbrock-like valley (w1, w2)
        const term1 = 100 * Math.pow(w2 - w1 * w1, 2) + Math.pow(1 - w1, 2);

        // Block 2: Rastrigin-like oscillation (w3, w4)
        const term2 = 20 + (w3 * w3 - 10 * Math.cos(2 * Math.PI * w3)) + (w4 * w4 - 10 * Math.cos(2 * Math.PI * w4));

        // Block 3: Styblinski-Tang interactions (w5, w6)
        const st = (x: number) => Math.pow(x, 4) - 16 * Math.pow(x, 2) + 5 * x;
        const term3 = 0.5 * (st(w5) + st(w6)) + 40; // Shifted up to be positive

        // Block 4: Simple chaos (w7, w8)
        const term4 = Math.abs(w7 + w8) + Math.sin(w7 * 3) * Math.cos(w8 * 3) * 5 + 5;

        // Normalize/Scale to be readable but hard to zero out
        return (term1 + term2 + term3 + term4) / 100 + 0.1532;
    }, [params]);

    const handleChange = (param: keyof typeof params, value: number) => {
        setParams(prev => ({ ...prev, [param]: value }));
    };

    const copy = {
        zh: {
            panel: `**高维优化**\n\n- 模型训练是寻找最优参数的数学过程。\n- 在高维空间中，损失地形复杂且非凸。\n- 梯度下降能高效地自动完成这种“寻优”过程。`,
            title: '模型训练：参数优化',
            subtitle:
                '调整 8 个参数以最小化损失。关系是非线性且非凸的，手工优化非常困难。',
            currentLoss: '当前损失',
            lossHint: '尝试手动最小化该值，体会训练的难度。',
        },
        en: {
            panel: `**High-Dimensional Optimization**\n\n- Model training is the mathematical process of finding the optimal parameters.\n- In high dimensions, the loss landscape is complex and non-convex.\n- Gradient descent helps efficiently automate this "hunting" process.`,
            title: 'Blind Parameter Optimization',
            subtitle:
                'Adjust the 8 parameters to minimize the loss. The relationship is non-linear and non-convex, making manual optimization extremely difficult.',
            currentLoss: 'Current Loss',
            lossHint: 'Minimize this value manually to understand the difficulty of training.',
        },
    };
    const text = copy[language];
    const panel = text.panel;

    // Dynamic color for loss value
    const getLossColor = (l: number) => {
        if (l < 0.5) return 'text-emerald-500'; // Hard to reach
        if (l < 2.0) return 'text-amber-500';
        return 'text-rose-500';
    };

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-6 flex flex-col items-center justify-center gap-8 font-sans">

                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{text.title}</h2>
                        <div className="text-gray-500 max-w-lg mx-auto text-sm">
                            {text.subtitle}
                        </div>
                    </div>

                    {/* Main Interface: Sliders + Loss Display */}
                    <div className="flex gap-8 w-full max-w-5xl items-center">

                        {/* Sliders Area - 2x4 Grid */}
                        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {(Object.keys(params) as Array<keyof typeof params>).map((key) => (
                                <div key={key} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-bold text-gray-500 uppercase">{key}</label>
                                        <span className="text-[10px] text-slate-400 font-mono">{params[key].toFixed(2)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="-3"
                                        max="3"
                                        step="0.01"
                                        value={params[key]}
                                        onChange={(e) => handleChange(key, parseFloat(e.target.value))}
                                        className="w-full accent-indigo-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Loss Monitor */}
                        <div className="w-56 shrink-0 flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl shadow-xl border border-slate-700">
                            <div className="text-xs uppercase text-slate-400 font-bold tracking-widest mb-4">{text.currentLoss}</div>
                            <div className={`text-4xl font-mono font-bold transition-all duration-200 ${getLossColor(loss)}`}>
                                {loss.toFixed(4)}
                            </div>
                            <div className="mt-4 text-[10px] text-slate-600 text-center px-2">
                                {text.lossHint}
                            </div>
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
