import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { Check, X, Sun, BookOpen } from 'lucide-react';

export const Slide3_Perceptron: React.FC = () => {
    const { language } = useLanguage();
    // Mutable inputs now
    const [inputs, setInputs] = useState<[number, number]>([1.0, 1.0]);
    const [weights, setWeights] = useState([1.5, 1.5]); // Initial weights to help it pass with bias -2.5 (1.5+1.5-2.5 = 0.5 > 0)
    const [bias, setBias] = useState(-2.5);

    // Perceptron formula: sum = (w1*x1 + w2*x2) + b
    const dotProduct = inputs[0] * weights[0] + inputs[1] * weights[1];
    const totalSum = dotProduct + bias;
    const output = totalSum > 0 ? 1 : 0;

    const t = {
        title: { zh: '感知机 (1958)', en: 'The Perceptron (1958)' },
        bullets: {
            en: [
                'The Perceptron introduced **Weights (w)** and **Bias (b)**.',
                'Weights determine the *importance* of each input.',
                'Bias acts as a strict threshold (negative bias makes it harder to activate).',
                'Formula: **y = step(∑(w·x) + b)**'
            ],
            zh: [
                '感知机引入了**权重 (w)**和**偏置 (b)**。',
                '权重决定了每个输入的*重要性*。',
                '偏置充当严格的阈值（负偏置使激活更困难）。',
                '公式：**y = step(∑(w·x) + b)**'
            ]
        },
        inputs: {
            en: ['Finished Homework?', 'Weather Outside'],
            zh: ['做完作业了吗？', '外面天气']
        },
        outputLabel: {
            en: 'Play Outside!',
            zh: '出去玩！'
        },
        hintLowerBias: {
            en: 'Lower bias = Harder to activate',
            zh: '偏置越低 = 越难激活'
        },
        labelBiasThreshold: {
            en: 'BIAS (THRESHOLD)',
            zh: '偏置 (阈值)'
        },
        sumInputs: { zh: '输入', en: 'Inputs' },
        sumBias: { zh: '偏置', en: 'Bias' },
        sumTotal: { zh: '总和', en: 'Sum' },
        guidance: {
            en: 'Try increasing the weights! Notice that when a weight is higher, that specific input matters more for the final decision.',
            zh: '尝试增加权重！注意，当某个权重较高时，该特定输入对最终决定更重要。'
        }
    };

    const updateWeight = (idx: number, val: number) => {
        const newWeights = [...weights];
        newWeights[idx] = val;
        setWeights(newWeights);
    };

    const updateInput = (idx: number, val: number) => {
        const newInputs: [number, number] = [...inputs];
        newInputs[idx] = val;
        setInputs(newInputs);
    };

    return (
        <>
            <ConceptStage>
                <div className="flex flex-col items-center w-full max-w-4xl select-none pt-4">

                    <div className="flex items-center gap-12 mb-8 scale-90 origin-top">

                        {/* Inputs Column */}
                        <div className="flex flex-col gap-16">
                            {inputs.map((x, i) => (
                                <div key={i} className="flex flex-col items-end gap-2 relative group">
                                    {/* Input Logic */}
                                    <div className="absolute right-full mr-4 flex flex-col items-end w-40">
                                        <span className="text-sm font-bold text-gray-700 text-right">{t.inputs[language][i]}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-400">0</span>
                                            <input
                                                type="range" min="0" max="1" step="0.1"
                                                value={x}
                                                onChange={(e) => updateInput(i, Number(e.target.value))}
                                                className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                            />
                                            <span className="text-xs text-gray-400">1</span>
                                        </div>
                                    </div>

                                    {/* Input Node */}
                                    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-sm z-10 transition-colors duration-300 ${x > 0.5 ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-300'}`}>
                                        {i === 0 ? <BookOpen size={20} className={x > 0.5 ? 'text-green-600' : 'text-gray-400'} /> : <Sun size={20} className={x > 0.5 ? 'text-amber-500' : 'text-gray-400'} />}
                                    </div>
                                    <div className="text-xs font-mono font-bold text-gray-500 bg-white px-1 -mt-2 z-20">{x.toFixed(1)}</div>

                                    {/* Weight Connection */}
                                    <div className="w-full absolute left-14 top-7 h-0.5 bg-gray-300" style={{ width: '160px', transformOrigin: 'left', transform: `rotate(${i === 0 ? '20deg' : '-20deg'})` }}>
                                        {/* Weight Tag */}
                                        <div className="absolute left-16 -top-8 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-xs text-blue-700 font-bold shadow-sm">
                                            w{i + 1}={weights[i].toFixed(1)}
                                        </div>

                                        {/* Flow Animation */}
                                        <div
                                            className="absolute top-0 left-0 h-full bg-blue-500 opacity-60"
                                            style={{
                                                width: '40px',
                                                animation: output === 1 ? 'flow 0.8s infinite linear' : 'none',
                                                backgroundColor: weights[i] >= 0 ? '#3b82f6' : '#ef4444',
                                                display: x > 0 ? 'block' : 'none'
                                            }}
                                        />
                                    </div>

                                    {/* Weight Slider */}
                                    <div className={`absolute left-[80px] w-24 z-30 opacity-20 group-hover:opacity-100 transition-opacity ${i === 0 ? '-top-6' : 'top-10'}`}>
                                        <input
                                            type="range" min="-3" max="5" step="0.5"
                                            value={weights[i]}
                                            onChange={(e) => updateWeight(i, Number(e.target.value))}
                                            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Bias Control (Visualized as a threshold adjustment) */}
                            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-24 bg-purple-50 p-4 rounded-xl border border-purple-100 shadow-sm flex flex-col gap-2 items-center">
                                <label className="text-xs font-bold text-purple-700 uppercase tracking-wider">{t.labelBiasThreshold[language]}</label>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-mono text-purple-600 font-bold">{bias.toFixed(1)}</span>
                                    <input
                                        type="range"
                                        min="-5"
                                        max="0"
                                        step="0.5"
                                        value={bias}
                                        onChange={(e) => setBias(Number(e.target.value))}
                                        className="w-40 appearance-none bg-purple-200 h-1.5 rounded-full accent-purple-600"
                                    />
                                </div>
                                <div className="text-[10px] text-purple-400 text-center max-w-[150px] leading-tight">
                                    {t.hintLowerBias[language]}
                                </div>
                            </div>
                        </div>

                        {/* Summation Core */}
                        <div className="ml-32 w-44 h-44 rounded-full bg-white border-[6px] border-indigo-50 shadow-2xl flex flex-col items-center justify-center relative z-20">
                            <div className="text-2xl font-bold text-gray-300 absolute top-3">∑</div>

                            <div className="w-full px-6 space-y-2">
                                <div className="flex justify-between text-sm text-gray-500 font-mono">
                                    <span>{t.sumInputs[language]}</span>
                                    <span>{dotProduct.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-purple-500 font-mono border-b border-gray-100 pb-1">
                                    <span>{t.sumBias[language]}</span>
                                    <span>{bias.toFixed(1)}</span>
                                </div>
                                <div className={`flex justify-between text-xl font-bold font-mono ${totalSum > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    <span>{t.sumTotal[language]}</span>
                                    <span>{totalSum.toFixed(1)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Arrow */}
                        <div className="text-4xl text-gray-300">➜</div>

                        {/* Output Node */}
                        <div className="flex flex-col items-center gap-3">
                            <div className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center shadow-xl transition-all duration-300 border-4 ${output === 1 ? 'bg-green-500 border-green-400 scale-105' : 'bg-gray-100 border-gray-200'}`}>
                                {output === 1 ? <Check size={48} className="text-white" /> : <X size={48} className="text-gray-300" />}
                            </div>
                            <span className={`text-lg font-bold transition-colors ${output === 1 ? 'text-green-600' : 'text-gray-400'}`}>
                                {t.outputLabel[language]}
                            </span>
                        </div>

                    </div>

                    {/* Educational Prompt */}
                    <div className="mt-12 bg-blue-50 border-l-4 border-blue-400 p-4 max-w-2xl rounded-r-lg">
                        <p className="text-blue-800 font-medium flex items-start gap-2">
                            <span className="text-xl">💡</span>
                            {t.guidance[language]}
                        </p>
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
