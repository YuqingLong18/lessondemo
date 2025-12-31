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
                <div className="flex flex-col items-center justify-center gap-12 w-full max-w-5xl select-none">

                    {/* Biological Neuron */}
                    <div className="flex items-center gap-4 w-full justify-center">
                        <div className="w-24 text-right font-bold text-gray-500">{t.bio[language]}</div>

                        <div className="relative flex items-center bg-green-50/50 rounded-full px-8 py-4 border border-green-100/50 w-[500px] h-40 overflow-visible shadow-sm ml-16 mr-36">

                            {/* Input Neurons Icon area */}
                            <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                                <div className="flex flex-col gap-1 items-end opacity-60">
                                    <Activity size={24} className="text-green-600 rotate-180" />
                                    <Activity size={24} className="text-green-600 rotate-180" />
                                    <Activity size={24} className="text-green-600 rotate-180" />
                                </div>
                            </div>

                            {/* Dendrites (Inputs) */}
                            <div className="absolute left-0 flex flex-col gap-1">
                                <div className="w-16 h-1 bg-green-300 rounded-full rotate-12 translate-y-2 origin-right"></div>
                                <div className="w-16 h-1 bg-green-300 rounded-full -rotate-12 -translate-y-2 origin-right"></div>
                                <div className="w-16 h-1 bg-green-300 rounded-full"></div>
                            </div>

                            {/* Organic Cell Body (SVG) */}
                            <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 w-28 h-28 flex items-center justify-center">
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md text-green-400 fill-current">
                                    <path d="M45.6,18.8c-7.3-2.1-15.6,0.8-21.2,5.5c-6.8,5.7-9.4,14.8-11.3,23.4c-1.8,8.1-4.7,16.5-1.1,24.3c3.7,8.2,13.2,12.5,21.9,13.2c8.9,0.7,18-1.5,25.4-6.8c7.8-5.6,12.4-15.6,12.4-25.2C71.7,39.6,63.1,23.8,45.6,18.8z" />
                                </svg>
                                <Activity className="text-white w-10 h-10 absolute animate-pulse" />
                            </div>

                            {/* Axon (Path) */}
                            <div className="absolute left-32 right-12 h-3 bg-green-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-yellow-400 w-20 blur-sm transition-transform duration-1000 ease-in-out ${pulseBio ? 'translate-x-[400px] opacity-100' : '-translate-x-20 opacity-0'}`}
                                />
                            </div>

                            {/* Terminals */}
                            <div className="absolute right-4 flex flex-col gap-1">
                                <div className="w-10 h-1 bg-green-300 rounded-full rotate-45 origin-left"></div>
                                <div className="w-10 h-1 bg-green-300 rounded-full -rotate-45 origin-left"></div>
                            </div>

                            {/* Right Arrow */}
                            <div className="absolute -right-32 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-60">
                                <div className="h-0.5 w-8 bg-green-400"></div>
                                <div className="text-xs text-green-600 font-medium w-24 leading-tight">
                                    Signals keep going to other neurons &rarr;
                                </div>
                            </div>
                        </div>

                        <div className="w-24 text-sm text-gray-400">{t.process[language]}</div>
                    </div>

                    <div className="w-full border-t border-dashed border-gray-300" />

                    {/* Artificial Neuron */}
                    <div className="flex items-center gap-4 w-full justify-center">
                        <div className="w-24 text-right font-bold text-gray-500">{t.art[language]}</div>

                        <div className="relative flex items-center bg-blue-50/50 rounded-xl px-8 py-4 border border-blue-100/50 w-[500px] h-40 overflow-visible shadow-sm ml-20 mr-52">

                            {/* Input Nodes Icon area */}
                            <div className="absolute -left-20 flex flex-col gap-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex items-center gap-2 justify-end">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-mono shadow-sm">x{i}</div>
                                        <div className="w-12 h-0.5 bg-gray-300"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Summation Node */}
                            <div className={`absolute left-16 w-20 h-20 rounded-full border-4 flex items-center justify-center text-3xl font-bold bg-white transition-all duration-300 z-10 ${pulseArt ? 'border-yellow-400 scale-110 shadow-yellow-200 shadow-lg' : 'border-blue-500 shadow-md'}`}>
                                ∑
                            </div>

                            {/* Connection */}
                            <div className="absolute left-32 right-24 h-1 bg-gray-800">
                                <div
                                    className={`h-2 w-4 rounded-full bg-yellow-400 absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-linear ${pulseArt ? 'left-full opacity-100' : 'left-0 opacity-0'}`}
                                />
                            </div>

                            {/* Activation Node (Optional visual) */}
                            <div className="absolute right-12 w-16 h-16 rounded-lg border-2 border-gray-400 flex items-center justify-center bg-white text-sm font-mono shadow-sm z-10">
                                f(x)
                            </div>

                            {/* Output */}
                            <div className="absolute -right-8 flex items-center">
                                <div className="w-12 h-1 bg-gray-800"></div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-sm ${pulseArt && !pulseBio ? 'bg-yellow-400 scale-125' : 'bg-gray-200'} `}>
                                    y
                                </div>
                            </div>

                            {/* Right Arrow */}
                            <div className="absolute -right-48 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-60">
                                <div className="h-0.5 w-8 bg-blue-400"></div>
                                <div className="text-xs text-blue-600 font-medium w-24 leading-tight">
                                    Output passed to next layer &rarr;
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
