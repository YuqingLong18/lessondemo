import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { Lightbulb } from 'lucide-react';

export const Slide2_MPNeuron: React.FC = () => {
    const { language } = useLanguage();
    const [inputs, setInputs] = useState([0, 0]); // Two binary inputs
    const [threshold, setThreshold] = useState(2);

    const sum = inputs.reduce((a, b) => a + b, 0);
    const isFiring = sum >= threshold;

    const t = {
        title: { zh: 'M-P 神经元', en: 'The M-P Neuron' },
        inputs: { zh: '输入信号', en: 'Inputs' },
        threshold: { zh: '阈值', en: 'Threshold (T)' },
        sum: { zh: '总和:', en: 'Sum:' },
        status: { zh: '状态:', en: 'Status:' },
        active: { zh: '激活 🔥', en: 'Active 🔥' },
        inactive: { zh: '静默 💤', en: 'Inactive 💤' },
        outputLabel: { zh: '出去玩！', en: 'Play outside!' },
        inputLabels: {
            en: ['Finished all homework?', 'Weather is good outside?'],
            zh: ['作业做完了吗？', '外面天气好吗？']
        },
        question: {
            en: 'What difference does it make to have a threshold of 0, 1, 2 or 3? How does it affect whether I can go out and play?',
            zh: '阈值为 0、1、2 或 3 有什么区别？它如何影响我能否出去玩？'
        },
        bullets: {
            en: [
                'The McCulloch-Pitts (M-P) neuron is the simplest artificial neuron.',
                'Inputs are binary (0 or 1). It sums them up.',
                'If **Sum ≥ Threshold**, it fires (1). Otherwise, 0.',
                'It can model basic logic like AND (T=2) or OR (T=1).'
            ],
            zh: [
                'McCulloch-Pitts (M-P) 神经元是最简单的人工神经元。',
                '输入是二进制的（0 或 1）。它将它们相加。',
                '如果 **总和 ≥ 阈值**，它就会激活 (1)。否则为 0。',
                '它可以模拟基本逻辑，如 AND (T=2) 或 OR (T=1)。'
            ]
        }
    };

    const toggleInput = (idx: number) => {
        const newInputs = [...inputs];
        newInputs[idx] = newInputs[idx] === 0 ? 1 : 0;
        setInputs(newInputs);
    };

    return (
        <>
            <ConceptStage>
                <div className="flex flex-col items-center justify-center gap-8 w-full max-w-3xl select-none">

                    <div className="flex items-center gap-12">

                        {/* Inputs Column */}
                        <div className="flex flex-col gap-8 items-end">
                            {inputs.map((val, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <span className="text-gray-600 font-bold text-sm bg-white/50 px-3 py-1 rounded-full shadow-sm">{t.inputLabels[language][i]}</span>
                                    <button
                                        onClick={() => toggleInput(i)}
                                        className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4 transition-all ${val === 1 ? 'bg-green-500 border-green-600 text-white shadow-lg scale-105' : 'bg-gray-100 border-gray-300 text-gray-400'}`}
                                    >
                                        {val}
                                    </button>
                                    {/* Wire */}
                                    <div className={`h-2 w-16 transition-colors ${val === 1 ? 'bg-green-400' : 'bg-gray-200'}`} />
                                </div>
                            ))}
                        </div>

                        {/* Neuron Body */}
                        <div className="relative">
                            <div className={`w-48 h-48 rounded-full border-8 flex flex-col items-center justify-center gap-2 bg-white transition-all duration-300 z-10 relative ${isFiring ? 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.6)]' : 'border-gray-300'}`}>

                                <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">{t.sum[language]}</div>
                                <div className="text-5xl font-mono font-bold text-gray-800">{sum}</div>

                                <div className="w-full h-px bg-gray-200 my-2" />

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>{sum}</span>
                                    <span>≥</span>
                                    <span className="font-bold text-blue-600 text-lg">{threshold}</span>
                                    <span>?</span>
                                </div>
                            </div>

                            {/* Output Wire */}
                            <div className={`absolute top-1/2 left-full h-4 w-24 -translate-y-1/2 -z-10 transition-colors ${isFiring ? 'bg-yellow-400' : 'bg-gray-200'}`} />
                        </div>

                        {/* Output Bulb */}
                        <div className="flex flex-col items-center gap-2 pl-20">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${isFiring ? 'bg-yellow-400 text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-400'}`}>
                                <Lightbulb size={40} className={isFiring ? 'fill-current' : ''} />
                            </div>
                            <div className={`font-bold transition-colors ${isFiring ? 'text-yellow-600' : 'text-gray-400'}`}>
                                {isFiring ? t.outputLabel[language] : t.inactive[language]}
                            </div>
                        </div>

                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-bold text-gray-600">{t.threshold[language]}</label>
                            <input
                                type="range"
                                min="0"
                                max="3"
                                step="1"
                                value={threshold}
                                onChange={(e) => setThreshold(Number(e.target.value))}
                                className="w-48 accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-gray-400 px-1">
                                <span>0</span><span>1</span><span>2</span><span>3</span>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm text-gray-500">{t.status[language]}</div>
                            <div className={`text-xl font-bold ${isFiring ? 'text-green-600' : 'text-gray-400'}`}>
                                {isFiring ? t.active[language] : t.inactive[language]}
                            </div>
                        </div>
                    </div>

                    {/* Reflection Question */}
                    <div className="text-center text-indigo-600 font-medium bg-indigo-50 px-6 py-3 rounded-lg border border-indigo-100 max-w-2xl">
                        {t.question[language]}
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
