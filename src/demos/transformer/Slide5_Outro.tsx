import React, { useEffect, useState } from 'react';
import { Bot, EyeOff } from 'lucide-react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import type { RegisterStepControl } from '../../components/core/SlideDeck';
import { NeonBabelFrame } from './NeonBabelFrame';

interface SlideStepProps {
    registerStepControl?: RegisterStepControl;
}

export const Slide5_Outro: React.FC<SlideStepProps> = ({ registerStepControl }) => {
    const [step, setStep] = useState(0); // 0: Decoder, 1: Masking, 2: Reveal
    const totalSteps = 3;

    const handleMask = () => setStep(1);
    const handleReveal = () => setStep(2);

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

    const decoderTokens = ['Le', 'grand', 'chien', 'rouge'];

    return (
        <>
            <ConceptStage>
                <NeonBabelFrame cornerLabel="Module 5 - The Decoder">
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex-1 bg-slate-950/70 border border-cyan-400/30 rounded-xl p-4">
                                <div className="text-cyan-200 text-xs uppercase tracking-[0.3em]">Encoder Team</div>
                                <div className="mt-3 flex gap-3">
                                    {['Input', 'Context', 'Meaning'].map((label) => (
                                        <div
                                            key={label}
                                            className="w-16 h-16 bg-slate-900/80 border border-cyan-400/40 rounded-lg flex items-center justify-center text-[10px] uppercase tracking-[0.3em] text-cyan-200"
                                        >
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-1 h-24 bg-pink-400/70 shadow-[0_0_20px_rgba(244,114,182,0.6)]" />

                            <div className="flex-1 bg-slate-950/70 border border-pink-400/30 rounded-xl p-4">
                                <div className="text-pink-200 text-xs uppercase tracking-[0.3em]">Decoder Team</div>
                                <div className="mt-3 flex gap-3">
                                    {['Predict', 'Refine', 'Generate'].map((label) => (
                                        <div
                                            key={label}
                                            className="w-16 h-16 bg-slate-900/80 border border-pink-400/40 rounded-lg flex items-center justify-center text-[10px] uppercase tracking-[0.3em] text-pink-200"
                                        >
                                            {label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <div className="text-sm text-slate-300 max-w-xl text-center">
                                The Encoder understands the input. The Decoder uses that context to generate new text.
                            </div>

                            <div className="flex items-center gap-2">
                                {decoderTokens.map((word) => (
                                    <div
                                        key={word}
                                        className="px-4 py-2 bg-cyan-100/90 text-slate-900 rounded border border-cyan-200 text-sm font-medium"
                                    >
                                        {word}
                                    </div>
                                ))}
                                <div className="relative">
                                    <div className="px-4 py-2 w-24 h-10 border-2 border-dashed border-pink-400 rounded bg-pink-100/80 flex items-center justify-center">
                                        {step === 2 ? (
                                            <span className="font-bold text-pink-700 animate-pulse">a mange</span>
                                        ) : (
                                            <span className="text-slate-400 text-xs">?</span>
                                        )}
                                    </div>
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-pink-300">
                                        <Bot size={28} />
                                    </div>
                                </div>

                                <div className="flex gap-2 ml-2 relative">
                                    {Array.from({ length: 2 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-20 h-10 bg-slate-200/80 rounded flex items-center justify-center relative overflow-hidden"
                                        >
                                            {step >= 1 && (
                                                <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center text-cyan-100">
                                                    <EyeOff size={14} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {step >= 1 && (
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-cyan-200">
                                            Masked
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="h-12 flex items-center justify-center text-center text-sm">
                                {step === 0 && <span className="text-slate-300">No spoilers. The Decoder can only look backward.</span>}
                                {step === 1 && (
                                    <span className="text-pink-200 font-semibold">
                                        Masking is active. Future words are hidden behind the curtain.
                                    </span>
                                )}
                                {step === 2 && (
                                    <span className="text-cyan-200 font-semibold">
                                        Prediction complete. The Decoder wrote the next token.
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            {step === 0 && (
                                <button
                                    onClick={handleMask}
                                    className="px-6 py-3 bg-pink-500 text-white font-bold rounded-lg shadow-[0_0_20px_rgba(244,114,182,0.45)] flex items-center gap-2"
                                >
                                    <EyeOff size={18} /> APPLY MASKING
                                </button>
                            )}
                            {step === 1 && (
                                <button
                                    onClick={handleReveal}
                                    className="px-6 py-3 bg-cyan-400 text-slate-900 font-bold rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.45)] flex items-center gap-2"
                                >
                                    <Bot size={18} /> GENERATE NEXT TOKEN
                                </button>
                            )}
                            {step === 2 && (
                                <div className="px-6 py-3 bg-slate-950/80 text-cyan-200 border border-cyan-400/40 rounded-lg text-sm">
                                    Job's done. Jack out.
                                </div>
                            )}
                        </div>

                        {step === 2 && (
                            <div className="text-center text-xs uppercase tracking-[0.4em] text-slate-400 mt-2">
                                GPT-4 - Claude - Gemini
                            </div>
                        )}
                    </div>
                </NeonBabelFrame>
            </ConceptStage>
            <ExplainPanel>
                <li>
                    <strong>Decoder:</strong> Generates output using the Encoder's context, one token at a time.
                </li>
                <li>
                    <strong>Masking:</strong> Blocks future words so predictions stay honest during training.
                </li>
                <li>
                    <strong>Impact:</strong> Transformers power most modern AI systems, from translation to chatbots.
                </li>
            </ExplainPanel>
        </>
    );
};
