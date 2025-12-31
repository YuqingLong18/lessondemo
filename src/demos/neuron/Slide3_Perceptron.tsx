import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

export const Slide3_Perceptron: React.FC = () => {
    const { language } = useLanguage();
    const [inputs] = useState([1.0, 0.5]);
    const [weights, setWeights] = useState([0.8, -0.5]);
    const [bias, setBias] = useState(-0.2);

    // Perceptron formula: sum = (w1*x1 + w2*x2) + b
    const dotProduct = inputs[0] * weights[0] + inputs[1] * weights[1];
    const totalSum = dotProduct + bias;
    const output = totalSum > 0 ? 1 : 0;

    const t = {
        title: { zh: '感知机 (1958)', en: 'The Perceptron (1958)' },
        subConcept: { zh: '权重与偏置', en: 'Weights & Bias' },
        formula: { zh: '加权求和 + 偏置', en: 'Weighted Sum + Bias' },
        bias: { zh: '偏置 (b)', en: 'Bias (b)' },
        output: { zh: '输出', en: 'Output' },
        bullets: {
            en: [
                'The Perceptron introduced **Weights (w)** and **Bias (b)**.',
                'Weights control *how important* each input is.',
                'Bias shifts the activation threshold up or down.',
                'Formula: **y = step(∑(w·x) + b)**'
            ],
            zh: [
                '感知机引入了**权重 (w)**和**偏置 (b)**。',
                '权重控制每个输入的*重要性*。',
                '偏置上下移动激活阈值。',
                '公式：**y = step(∑(w·x) + b)**'
            ]
        }
    };

    const updateWeight = (idx: number, val: number) => {
        const newWeights = [...weights];
        newWeights[idx] = val;
        setWeights(newWeights);
    };

    return (
        <>
            <ConceptStage>
                <div className="flex flex-col items-center w-full max-w-3xl select-none">

                    <div className="flex items-center gap-16 mb-12">

                        {/* Inputs & Weights */}
                        <div className="flex flex-col gap-6">
                            {inputs.map((x, i) => (
                                <div key={i} className="flex items-center gap-4 relative">
                                    {/* Input Node */}
                                    <div className="w-14 h-14 rounded-full bg-gray-100 border-2 border-gray-300 flex flex-col items-center justify-center shadow-sm z-10">
                                        <span className="text-xs text-gray-500 font-bold">x{i + 1}</span>
                                        <span className="text-sm font-mono">{x}</span>
                                    </div>

                                    {/* Weight Edge */}
                                    <div className="w-full absolute left-14 top-1/2 h-0.5 bg-gray-300" style={{ width: '180px', transformOrigin: 'left', transform: `rotate(${i === 0 ? '15deg' : '-15deg'})` }}>
                                        {/* Weight Value Tag on Line */}
                                        <div className="absolute left-16 -top-8 bg-blue-50 border border-blue-200 px-2 py-1 rounded text-xs text-blue-700 font-bold">
                                            w{i + 1} = {weights[i].toFixed(1)}
                                        </div>

                                        {/* Animated Flow based on weight magnitude */}
                                        <div
                                            className={`absolute top-0 left-0 h-full bg-blue-500 transition-all duration-[2000ms] w-20 opacity-50`}
                                            style={{
                                                animation: output === 1 ? 'flow 1s infinite linear' : 'none',
                                                backgroundColor: weights[i] >= 0 ? '#3b82f6' : '#ef4444' // Blue positive, Red negative
                                            }}
                                        />
                                    </div>

                                    {/* Weight Slider (placed near input for direct control) */}
                                    <input
                                        type="range"
                                        min="-2"
                                        max="2"
                                        step="0.1"
                                        value={weights[i]}
                                        onChange={(e) => updateWeight(i, Number(e.target.value))}
                                        className="absolute left-[-140px] w-32 accent-blue-600"
                                    />
                                </div>
                            ))}

                            {/* Bias Input (Ghost Node) */}
                            <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full pr-8">
                                <div className="flex flex-col items-end gap-1">
                                    <label className="text-xs font-bold text-gray-400">Bias</label>
                                    <input
                                        type="range"
                                        min="-2"
                                        max="2"
                                        step="0.1"
                                        value={bias}
                                        onChange={(e) => setBias(Number(e.target.value))}
                                        className="w-32 accent-purple-500"
                                    />
                                    <span className="text-xs text-purple-600 font-mono font-bold">{bias.toFixed(1)}</span>
                                </div>
                            </div>

                        </div>

                        {/* Summation Core */}
                        <div className="ml-32 w-48 h-48 rounded-full bg-white border-4 border-indigo-100 shadow-xl flex flex-col items-center justify-center relative z-20">
                            <div className="text-3xl font-bold text-gray-300 absolute top-4">∑</div>

                            <div className="flex flex-col gap-1 w-full px-6 text-sm font-mono text-gray-600">
                                <div className="flex justify-between border-b border-gray-100 pb-1">
                                    <span>w·x</span>
                                    <span>{dotProduct.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-purple-500">
                                    <span>+ b</span>
                                    <span>{bias.toFixed(2)}</span>
                                </div>
                                <div className={`flex justify-between font-bold text-lg border-t border-gray-200 pt-1 ${totalSum >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    <span>=</span>
                                    <span>{totalSum.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Activation Function (Step) */}
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-2xl text-gray-400">➜</div>
                            <div className="w-16 h-12 border border-gray-300 rounded bg-white relative overflow-hidden">
                                {/* Step Function Graph */}
                                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-200" />
                                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200" />
                                <div className="absolute left-0 w-1/2 top-3/4 h-0.5 bg-indigo-500" /> {/* x < 0, y = 0 */}
                                <div className="absolute right-0 w-1/2 top-1/4 h-0.5 bg-indigo-500" /> {/* x > 0, y = 1 */}
                                <div className="absolute left-1/2 top-1/4 h-1/2 w-0.5 bg-indigo-500" /> {/* Vertical Jump */}

                                {/* Current Point Dot */}
                                <div
                                    className="absolute w-2 h-2 rounded-full bg-red-500 z-10 transition-all duration-300"
                                    style={{
                                        left: totalSum >= 0 ? '70%' : '30%',
                                        top: totalSum >= 0 ? '25%' : '75%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Output */}
                        <div className={`w-24 h-24 rounded-xl flex items-center justify-center text-4xl font-bold shadow-lg transition-all duration-300 ${output === 1 ? 'bg-green-500 text-white scale-110' : 'bg-gray-100 text-gray-400'}`}>
                            {output}
                        </div>

                    </div>

                    <div className="text-center text-gray-500 text-sm italic w-2/3">
                        Adjust the sliders. <br />
                        Notice how changing weights changes the contribution of each input, <br />
                        and Bias shifts the total sum required to activate.
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3 className="text-lg font-bold mb-4">{t.title[language]}</h3>
                <ul className="space-y-3">
                    {t.bullets[language].map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                            <span className="text-blue-500">•</span>
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </li>
                    ))}
                </ul>
            </ExplainPanel>
        </>
    );
};
