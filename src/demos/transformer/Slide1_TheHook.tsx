import React, { useEffect, useState } from 'react';
import { AlertTriangle, Play } from 'lucide-react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import type { RegisterStepControl } from '../../components/core/SlideDeck';
import { NeonBabelFrame } from './NeonBabelFrame';

interface SlideStepProps {
    registerStepControl?: RegisterStepControl;
}

export const Slide1_TheHook: React.FC<SlideStepProps> = ({ registerStepControl }) => {
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
    const sentence =
        'The bank, which was located across the street from the very noisy construction site that had been operating for three years, finally closed.';

    const bubbleCopy = [
        {
            title: 'Meet Ron. For years, Ron was the only way to translate languages.',
            body: 'He processes data one word at a time, in a strict order.',
            quote: '"Okay, first word: The. Got it. Moving on..."',
        },
        {
            title: 'Halfway down the road, the memory bag is overflowing.',
            body: 'Ron is still trying to carry every earlier word.',
            quote: '"...next word is bank. Okay. The...bank. Holding it in memory..."',
        },
        {
            title: 'Ron has reached the final word: "closed".',
            body: 'The sentence is long. The start is far behind him.',
            quote: '"Okay... closed. Wait. What closed?"',
        },
        {
            title: 'Ron sparks and forgets the subject.',
            body: '"Uh... the construction site closed? No wait, the three years closed?"',
            quote: '"ERROR! OUT OF MEMORY!"',
        },
    ];

    return (
        <>
            <ConceptStage>
                <NeonBabelFrame cornerLabel="Module 1 - The Hook">
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
                                        Data Block
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
                                        Rusty Courier Bot
                                    </div>
                                    {step === 3 && (
                                        <div className="text-rose-600 text-sm font-bold">System overload</div>
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
                            <div className="text-cyan-200 text-xs uppercase tracking-[0.25em]">Comic Panel</div>
                            <div className="text-slate-100 text-sm font-semibold mt-2">{bubbleCopy[step].title}</div>
                            <div className="text-slate-400 text-xs mt-2">{bubbleCopy[step].body}</div>
                            <div className="text-slate-200 text-sm mt-3 italic">{bubbleCopy[step].quote}</div>
                        </div>

                        {step >= 2 && (
                            <div className="absolute right-10 top-10 max-w-xs bg-slate-900/80 border border-slate-600/60 rounded-xl p-3 text-xs text-slate-300 leading-relaxed">
                                <div className="text-cyan-200 text-[10px] uppercase tracking-[0.3em] mb-2">Sentence</div>
                                {sentence}
                            </div>
                        )}

                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                            {step < 2 && (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-3 bg-cyan-500 text-slate-900 font-bold rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-cyan-400 flex items-center gap-2"
                                >
                                    <Play size={18} /> NEXT WORD BLOCK
                                </button>
                            )}
                            {step === 2 && (
                                <button
                                    onClick={handleAskRon}
                                    className="px-6 py-3 bg-rose-600 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:bg-rose-500 flex items-center gap-2"
                                >
                                    <AlertTriangle size={18} /> ASK RON WHAT CLOSED
                                </button>
                            )}
                            {step === 3 && (
                                <div className="px-6 py-3 bg-slate-950/80 text-cyan-200 border border-cyan-400/40 rounded-lg text-sm">
                                    Takeaway: Sequential models often forget the early context in long sequences.
                                </div>
                            )}
                        </div>
                    </div>
                </NeonBabelFrame>
            </ConceptStage>
            <ExplainPanel>
                <li>
                    <strong>The Problem:</strong> RNNs process data sequentially, carrying memory forward one word at a time.
                </li>
                <li>
                    <strong>The Symptom:</strong> Long sentences overload the memory trail, so the beginning fades away.
                </li>
                <li>
                    <strong>The Need:</strong> We need a way to see the whole sentence at once.
                </li>
            </ExplainPanel>
        </>
    );
};
