import React, { useEffect, useState } from 'react';
import { Download, Key, Radio } from 'lucide-react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import type { RegisterStepControl } from '../../components/core/SlideDeck';
import { NeonBabelFrame } from './NeonBabelFrame';

interface SlideStepProps {
    registerStepControl?: RegisterStepControl;
}

export const Slide4_MainEvent: React.FC<SlideStepProps> = ({ registerStepControl }) => {
    const [step, setStep] = useState(0); // 0: Idle, 1: Query, 2: Key Match, 3: Value Download
    const totalSteps = 4;

    const handleBroadcastQ = () => setStep(1);
    const handleCheckKeys = () => setStep(2);
    const handleDownloadValues = () => setStep(3);

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

    const words = [
        { text: 'The', type: 'article', match: 0.1 },
        { text: 'big', type: 'adj', match: 0.2 },
        { text: 'red', type: 'adj', match: 0.2 },
        { text: 'dog', type: 'noun', match: 0.95, label: 'HIGH MATCH' },
        { text: 'ate', type: 'verb', match: 1.0, isFocus: true },
        { text: 'the', type: 'article', match: 0.1 },
        { text: 'tiny', type: 'adj', match: 0.3 },
        { text: 'bone', type: 'noun', match: 0.65, label: 'MEDIUM MATCH' },
    ];

    const focusIndex = words.findIndex((word) => word.isFocus);

    return (
        <>
            <ConceptStage>
                <NeonBabelFrame cornerLabel="Module 4 - The Resonance">
                    <div className="flex-1 flex flex-col items-center justify-between py-6">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                                Attention Protocol - Matchmaking in motion
                            </div>

                            <div className="text-sm text-slate-300 max-w-xl text-center">
                                The word "ate" needs a subject and an object. It sends a resonance ping to every other word.
                            </div>

                            <div className="min-h-[28px] flex items-center justify-center">
                                {step >= 1 && (
                                    <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-200 border border-cyan-400/40 px-3 py-1 rounded-full">
                                        Query: Looking for nouns related to eating
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="relative w-full max-w-5xl flex flex-col items-center py-3">
                            <div className="flex gap-3 items-center justify-center w-full px-8">
                                {words.map((word) => {
                                    const matchLevel = word.match >= 0.8 ? 'high' : word.match >= 0.5 ? 'medium' : 'low';
                                    const signalStyles =
                                        matchLevel === 'high'
                                            ? 'border-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.6)]'
                                            : matchLevel === 'medium'
                                                ? 'border-amber-300 shadow-[0_0_16px_rgba(251,191,36,0.5)]'
                                                : 'border-slate-600/60 shadow-[0_0_10px_rgba(148,163,184,0.25)]';
                                    const signalDot =
                                        matchLevel === 'high'
                                            ? 'bg-emerald-400'
                                            : matchLevel === 'medium'
                                                ? 'bg-amber-300'
                                                : 'bg-slate-500';
                                    const signalText =
                                        matchLevel === 'high'
                                            ? 'text-emerald-300'
                                            : matchLevel === 'medium'
                                                ? 'text-amber-300'
                                                : 'text-slate-400';

                                    return (
                                    <div key={word.text} className="flex flex-col items-center relative">
                                        <div
                                            className={`w-20 h-24 rounded-lg flex flex-col items-center justify-center border-2 transition-all duration-500 ${
                                                word.isFocus
                                                    ? 'bg-cyan-200 text-slate-900 border-cyan-400 scale-110 shadow-[0_0_30px_rgba(34,211,238,0.6)]'
                                                    : `bg-slate-900/80 text-slate-100 ${step >= 2 ? signalStyles : 'border-slate-600/60'}`
                                            }`}
                                        >
                                            <span className="font-bold text-lg">{word.text}</span>
                                            <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{word.type}</span>

                                            {step >= 1 && word.isFocus && (
                                                <div className="absolute -inset-4 rounded-full border border-cyan-300/60 animate-ping" />
                                            )}
                                            {step >= 2 && !word.isFocus && word.label && (
                                                <div
                                                    className={`absolute -top-7 text-[9px] uppercase tracking-[0.3em] ${signalText}`}
                                                    style={{ opacity: 0.9 }}
                                                >
                                                    {word.label}
                                                </div>
                                            )}
                                            {step >= 2 && !word.isFocus && (
                                                <div className={`absolute -top-2 flex items-center gap-1 ${signalText}`}>
                                                    <span className={`w-2 h-2 rounded-full ${signalDot}`} />
                                                    <Key size={14} />
                                                </div>
                                            )}
                                            {step === 3 && !word.isFocus && word.match > 0.5 && (
                                                <div className="absolute -bottom-4 text-cyan-300 animate-pulse">
                                                    <Download size={14} />
                                                </div>
                                            )}
                                            {step >= 2 && !word.isFocus && (
                                                <div
                                                    className={`absolute -bottom-3 w-10 h-1 rounded-full ${signalDot}`}
                                                    style={{ opacity: matchLevel === 'low' ? 0.4 : 0.9 }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    );
                                })}
                            </div>

                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                {step === 3 &&
                                    words.map((word, i) => {
                                        if (word.isFocus) return null;
                                        const spread = 9;
                                        const startX = 50 + (i - focusIndex) * spread;
                                        return (
                                            <path
                                                key={word.text}
                                                d={`M ${startX}% 54 Q 50% 20 50% 54`}
                                                fill="none"
                                                stroke="#22d3ee"
                                                strokeWidth={word.match * 8}
                                                opacity={0.6}
                                                className="animate-pulse"
                                            />
                                        );
                                    })}
                            </svg>
                        </div>

                        <div className="mt-8 flex gap-4 z-10">
                            {step === 0 && (
                                <button
                                    onClick={handleBroadcastQ}
                                    className="px-6 py-3 bg-cyan-400 text-slate-900 font-bold rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center gap-2"
                                >
                                    <Radio size={18} /> BROADCAST Q
                                </button>
                            )}
                            {step === 1 && (
                                <button
                                    onClick={handleCheckKeys}
                                    className="px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-lg shadow-[0_0_20px_rgba(250,204,21,0.4)] flex items-center gap-2"
                                >
                                    <Key size={18} /> CHECK KEYS
                                </button>
                            )}
                            {step === 2 && (
                                <button
                                    onClick={handleDownloadValues}
                                    className="px-6 py-3 bg-slate-100 text-slate-900 font-bold rounded-lg shadow-[0_0_20px_rgba(248,250,252,0.4)] flex items-center gap-2"
                                >
                                    <Download size={18} /> DOWNLOAD VALUES
                                </button>
                            )}
                            {step === 3 && (
                                <div className="px-6 py-3 bg-slate-950/80 text-cyan-200 border border-cyan-400/40 rounded-lg text-sm">
                                    Self-attention complete: "ate" locks onto "dog" and "bone".
                                </div>
                            )}
                        </div>
                    </div>
                </NeonBabelFrame>
            </ConceptStage>
            <ExplainPanel>
                <li>
                    <strong>Query (Q):</strong> "Ate" sends a resonance ping asking who acted and what was acted on.
                </li>
                <li>
                    <strong>Key (K):</strong> Each word replies with a match signal. Dog is bright, bone is medium.
                </li>
                <li>
                    <strong>Value (V):</strong> "Ate" absorbs the strongest replies to build context. This is self-attention.
                </li>
            </ExplainPanel>
        </>
    );
};
