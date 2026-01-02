import React, { useEffect, useState } from 'react';
import { AlertTriangle, Play } from 'lucide-react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import type { RegisterStepControl } from '../../components/core/SlideDeck';
import { NeonBabelFrame } from './NeonBabelFrame';
import { useLanguage } from '../../components/core/LanguageContext';

interface SlideStepProps {
    registerStepControl?: RegisterStepControl;
}

export const Slide1_TheHook: React.FC<SlideStepProps> = ({ registerStepControl }) => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0); // 0: Start, 1: Halfway, 2: End, 3: Error
    const totalSteps = 4;

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
    };

    const handleAskRon = () => {
        setStep(3);
    };

    useEffect(() => {
        if (!registerStepControl) return;
        registerStepControl({
            currentStep: step,
            totalSteps,
            canGoNext: step < totalSteps - 1,
            canGoPrev: step > 0,
            goNext: () => setStep((prev) => Math.min(prev + 1, totalSteps - 1)),
            goPrev: () => setStep((prev) => Math.max(prev - 1, 0)),
        });
    }, [registerStepControl, step, totalSteps]);

    useEffect(() => {
        if (!registerStepControl) return;
        return () => registerStepControl(null);
    }, [registerStepControl]);

    const ronOffset = step === 0 ? -260 : step === 1 ? 0 : 260;
    const sentenceEn =
        'The bank, which was located across the street from the very noisy construction site that had been operating for three years, finally closed.';
    const sentenceZh = '那家银行位于街对面那个非常吵闹的施工现场旁边，已经运营了三年，终于关闭了。';
    const sentence = language === 'zh' ? sentenceZh : sentenceEn;

    const bubbleCopy = [
        {
            title: {
                en: 'Meet Ron. For years, Ron was the only way to translate languages.',
                zh: '认识 Ron。多年来，Ron 是唯一可用的翻译方式。',
            },
            body: {
                en: 'He processes data one word at a time, in a strict order.',
                zh: '他按严格顺序一次处理一个词。',
            },
            quote: {
                en: '"Okay, first word: The. Got it. Moving on..."',
                zh: '“好，第一词：The。记住了。继续...”',
            },
        },
        {
            title: {
                en: 'Halfway down the road, the memory bag is overflowing.',
                zh: '走到半路，记忆包已经塞满。',
            },
            body: {
                en: 'Ron is still trying to carry every earlier word.',
                zh: 'Ron 仍在努力背着所有早先的词。',
            },
            quote: {
                en: '"...next word is bank. Okay. The...bank. Holding it in memory..."',
                zh: '“...下一个词是 bank。好，The...bank。还在记着...”',
            },
        },
        {
            title: {
                en: 'Ron has reached the final word: "closed".',
                zh: 'Ron 到了最后一个词：“closed”。',
            },
            body: {
                en: 'The sentence is long. The start is far behind him.',
                zh: '句子很长，开头已经很远。',
            },
            quote: {
                en: '"Okay... closed. Wait. What closed?"',
                zh: '“好...closed。等等，是什么关了？”',
            },
        },
        {
            title: {
                en: 'Ron sparks and forgets the subject.',
                zh: 'Ron 开始冒火花并忘记了主语。',
            },
            body: {
                en: '"Uh... the construction site closed? No wait, the three years closed?"',
                zh: '“呃...施工现场关了？不对，三年关了？”',
            },
            quote: {
                en: '"ERROR! OUT OF MEMORY!"',
                zh: '“错误！内存不足！”',
            },
        },
    ];

    const panel = bubbleCopy[step];

    return (
        <>
            <ConceptStage>
                <NeonBabelFrame cornerLabel={language === 'zh' ? '模块 1 - 引子' : 'Module 1 - The Hook'}>
                    <div className="flex-1 relative">
                        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-28 bg-slate-950/70 border border-cyan-400/20 rounded-2xl overflow-hidden">
                            <div
                                className="flex gap-4 items-center absolute left-0 top-1/2 -translate-y-1/2 transition-transform duration-700"
                                style={{ transform: `translateX(${-step * 240}px)` }}
                            >
                                {Array.from({ length: 14 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-28 h-16 bg-slate-800/80 rounded-lg border border-slate-600/60 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-slate-400"
                                    >
                                        {language === 'zh' ? '数据块' : 'DATA BLOCK'}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            className="absolute top-1/2"
                            style={{
                                left: '50%',
                                transform: `translate(-50%, -50%) translateX(${ronOffset}px)`,
                                transition: 'transform 0.8s ease-in-out',
                            }}
                        >
                            <div className="relative">
                                <div
                                    className={`w-56 h-60 rounded-2xl border-2 ${
                                        step === 3 ? 'border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.5)]' : 'border-slate-500/70'
                                    } bg-slate-300/90 flex flex-col items-center justify-center gap-3`}
                                >
                                    <div className="w-24 h-24 rounded-full bg-slate-900 border-4 border-slate-400 flex items-center justify-center text-3xl text-amber-300">
                                        {step === 3 ? 'x_x' : step === 2 ? 'o_O' : '^_^'}
                                    </div>
                                    <div className="text-slate-900 font-bold">RON (RNN)</div>
                                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-600">
                                        {language === 'zh' ? '顺序处理器' : 'Sequential Processor'}
                                    </div>
                                    {step === 3 && (
                                        <div className="text-rose-600 text-sm font-bold">
                                            {language === 'zh' ? '系统过载' : 'System overload'}
                                        </div>
                                    )}
                                </div>

                                <div className="absolute -right-5 top-16 w-12 h-16 bg-amber-700 border-2 border-amber-400 rounded-lg shadow-lg">
                                    <div
                                        className={`absolute -top-3 left-1 w-10 h-3 bg-amber-500/70 rounded ${
                                            step >= 1 ? 'opacity-100' : 'opacity-0'
                                        } transition-opacity duration-500`}
                                    />
                                </div>
                                {step >= 1 && (
                                    <div className="absolute -right-2 top-6 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                                )}
                                {step === 3 && (
                                    <div className="absolute -top-4 right-6 flex gap-1">
                                        <span className="w-1 h-4 bg-amber-400 rotate-12" />
                                        <span className="w-1 h-3 bg-amber-300 -rotate-12" />
                                        <span className="w-1 h-5 bg-amber-500 rotate-6" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="absolute left-10 top-8 max-w-md bg-slate-950/80 border border-cyan-400/30 rounded-xl p-4 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                            <div className="text-cyan-200 text-xs uppercase tracking-[0.25em]">
                                {language === 'zh' ? '漫画面板' : 'Comic Panel'}
                            </div>
                            <div className="text-slate-100 text-sm font-semibold mt-2">{panel.title[language]}</div>
                            <div className="text-slate-400 text-xs mt-2">{panel.body[language]}</div>
                            <div className="text-slate-200 text-sm mt-3 italic">{panel.quote[language]}</div>
                        </div>

                        {step >= 2 && (
                            <div className="absolute right-10 top-10 max-w-xs bg-slate-900/80 border border-slate-600/60 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
                                <div className="text-cyan-200 text-[10px] uppercase tracking-[0.3em] mb-2">
                                    {language === 'zh' ? '句子' : 'Sentence'}
                                </div>
                                {sentence}
                            </div>
                        )}

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                            {step < 2 && (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-3 bg-cyan-500 text-slate-900 font-bold rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-cyan-400 flex items-center gap-2"
                                >
                                    <Play size={18} /> {language === 'zh' ? '下一个词块' : 'NEXT WORD BLOCK'}
                                </button>
                            )}
                            {step === 2 && (
                                <button
                                    onClick={handleAskRon}
                                    className="px-6 py-3 bg-rose-600 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:bg-rose-500 flex items-center gap-2"
                                >
                                    <AlertTriangle size={18} />
                                    {language === 'zh' ? '问 Ron 是什么关了' : 'ASK RON WHAT CLOSED'}
                                </button>
                            )}
                            {step === 3 && (
                                <div className="px-6 py-3 bg-slate-950/80 text-cyan-200 border border-cyan-400/40 rounded-lg text-sm">
                                    {language === 'zh'
                                        ? '要点：顺序模型在长序列中常常忘记前面的上下文。'
                                        : 'Takeaway: Sequential models often forget the early context in long sequences.'}
                                </div>
                            )}
                        </div>
                    </div>
                </NeonBabelFrame>
            </ConceptStage>
            <ExplainPanel>
                <li>
                    <strong>{language === 'zh' ? '问题：' : 'The Problem:'}</strong>{' '}
                    {language === 'zh'
                        ? 'RNN 只能顺序处理数据，一次一个词。'
                        : 'RNNs process data sequentially, one word at a time.'}
                </li>
                <li>
                    <strong>{language === 'zh' ? '症状：' : 'The Symptom:'}</strong>{' '}
                    {language === 'zh'
                        ? '长句会让前面的信息逐渐淡化，导致遗忘。'
                        : 'Long sentences overload memory so the beginning fades away.'}
                </li>
                <li>
                    <strong>{language === 'zh' ? '需求：' : 'The Need:'}</strong>{' '}
                    {language === 'zh' ? '我们需要一次看到整个句子。' : 'We need a way to see the whole sentence at once.'}
                </li>
            </ExplainPanel>
        </>
    );
};
