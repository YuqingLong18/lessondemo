import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { Activity } from 'lucide-react';

export const Slide1_BioVsArtificial: React.FC = () => {
    const { language } = useLanguage();
    const [pulseBio, setPulseBio] = useState(false);
    const [pulseArt, setPulseArt] = useState(false);

    const t = {
        title: { zh: '灵感来源', en: 'Inspiration' },
        subConcept: { zh: '生物与人工', en: 'Biological vs Artificial' },
        bio: { zh: '生物神经元', en: 'Biological Neuron' },
        art: { zh: '人工神经元', en: 'Artificial Neuron' },
        input: { zh: '输入信号', en: 'Input Signals' },
        process: { zh: '处理 (化学/电)', en: 'Process (Chem/Elec)' },
        math: { zh: '数学求和', en: 'Math Sum' },
        output: { zh: '输出', en: 'Output' },
        stimulate: { zh: '⚡ 刺激', en: '⚡ Stimulate' },
        bullets: {
            en: [
                'Biological neurons communicate via electrochemical spikes.',
                'They are messy, complex, and analog.',
                'Artificial neurons are a **simplified mathematical model**.',
                'They just take numbers, add them up, and decide to output a number.'
            ],
            zh: [
                '生物神经元通过电化学脉冲进行交流。',
                '它们复杂、混沌且是模拟信号。',
                '人工神经元是一个**简化的数学模型**。',
                '它们只是接收数字，求和，然后决定输出一个数字。'
            ]
        }
    };

    const handleStimulate = () => {
        setPulseBio(true);
        setPulseArt(true);
        setTimeout(() => {
            setPulseBio(false);
            setPulseArt(false);
        }, 1000);
    };

    return (
        <>
            <ConceptStage>
                <div className="flex flex-col items-center justify-center gap-12 w-full max-w-4xl">

                    {/* Biological Neuron */}
                    <div className="flex items-center gap-8 w-full justify-center">
                        <div className="w-24 text-right font-bold text-gray-500">{t.bio[language]}</div>

                        <div className="relative flex items-center bg-green-50 rounded-full p-4 border border-green-200 w-96 h-32 overflow-hidden shadow-inner">
                            {/* Dendrites (Inputs) */}
                            <div className="absolute left-2 flex flex-col gap-2">
                                <div className="w-8 h-1 bg-green-300 rounded-full rotate-12"></div>
                                <div className="w-8 h-1 bg-green-300 rounded-full -rotate-12"></div>
                                <div className="w-8 h-1 bg-green-300 rounded-full"></div>
                            </div>

                            {/* Soma (Body) */}
                            <div className="absolute left-10 w-20 h-20 bg-green-400 rounded-full flex items-center justify-center shadow-lg z-10">
                                <Activity className="text-white w-10 h-10" />
                            </div>

                            {/* Axon (Path) */}
                            <div className="absolute left-28 right-4 h-4 bg-green-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-yellow-400 w-12 transition-transform duration-1000 ease-in-out ${pulseBio ? 'translate-x-60 opacity-100' : '-translate-x-12 opacity-0'}`}
                                />
                            </div>

                            {/* Terminals */}
                            <div className="absolute right-2 flex flex-col gap-2">
                                <div className="w-6 h-1 bg-green-300 rounded-full rotate-45"></div>
                                <div className="w-6 h-1 bg-green-300 rounded-full -rotate-45"></div>
                            </div>
                        </div>

                        <div className="w-24 text-sm text-gray-400">{t.process[language]}</div>
                    </div>

                    <div className="w-full border-t border-dashed border-gray-300" />

                    {/* Artificial Neuron */}
                    <div className="flex items-center gap-8 w-full justify-center">
                        <div className="w-24 text-right font-bold text-gray-500">{t.art[language]}</div>

                        <div className="relative flex items-center bg-blue-50 rounded-xl p-4 border border-blue-200 w-96 h-32 overflow-visible shadow-inner">

                            {/* Inputs */}
                            <div className="absolute -left-8 flex flex-col gap-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-mono">x{i}</div>
                                        <div className="w-8 h-0.5 bg-gray-300"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Summation Node */}
                            <div className={`absolute left-16 w-16 h-16 rounded-full border-4 flex items-center justify-center text-2xl font-bold bg-white transition-all duration-300 ${pulseArt ? 'border-yellow-400 scale-110 shadow-yellow-200 shadow-lg' : 'border-blue-500 shadow-md'}`}>
                                ∑
                            </div>

                            {/* Connection */}
                            <div className="absolute left-32 right-20 h-1 bg-gray-800">
                                <div
                                    className={`h-2 w-2 rounded-full bg-yellow-400 absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear ${pulseArt ? 'left-full opacity-100' : 'left-0 opacity-0'}`}
                                />
                            </div>

                            {/* Activation Node (Optional visual) */}
                            <div className="absolute right-10 w-14 h-14 rounded-md border-2 border-gray-400 flex items-center justify-center bg-white text-xs">
                                f(x)
                            </div>

                            {/* Output */}
                            <div className="absolute -right-8 flex items-center">
                                <div className="w-8 h-1 bg-gray-800"></div>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${pulseArt && !pulseBio ? 'bg-yellow-400 scale-125' : 'bg-gray-200'} `}>
                                    y
                                </div>
                            </div>

                        </div>

                        <div className="w-24 text-sm text-gray-400">{t.math[language]}</div>
                    </div>

                    <button
                        onClick={handleStimulate}
                        disabled={pulseBio}
                        className="mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {t.stimulate[language]}
                    </button>

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
