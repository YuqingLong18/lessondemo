import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Users, Zap } from 'lucide-react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import type { RegisterStepControl } from '../../components/core/SlideDeck';
import { NeonBabelFrame } from './NeonBabelFrame';
import { useLanguage } from '../../components/core/LanguageContext';

interface SlideStepProps {
    registerStepControl?: RegisterStepControl;
}

export const Slide2_Intro: React.FC<SlideStepProps> = ({ registerStepControl }) => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0); // 0: Ron, 1: Boot, 2: Syndicate
    const kickTimeoutRef = useRef<number | null>(null);
    const sentenceTokensEn = [
        'The',
        'bank,',
        'which',
        'was',
        'located',
        'across',
        'the',
        'street',
        'from',
        'the',
        'very',
        'noisy',
        'construction',
        'site',
        'that',
        'had',
        'been',
        'operating',
        'for',
        'three',
        'years,',
        'finally',
        'closed.',
    ];
    const sentenceTokensZh = [
        '那家',
        '银行',
        '位于',
        '街对面',
        '那个',
        '非常',
        '吵闹',
        '的',
        '施工现场',
        '旁边',
        '已经',
        '运营',
        '了',
        '三年',
        '终于',
        '关闭',
        '了',
    ];
    const chunkAssignmentsEn = [
        'The bank, which',
        'was located across',
        'the street from',
        'the very noisy',
        'construction site that',
        'had been operating',
        'for three years,',
        'finally closed.',
    ];
    const chunkAssignmentsZh = [
        '那家 银行',
        '位于 街对面',
        '那个 非常',
        '吵闹 的',
        '施工现场 旁边',
        '已经 运营',
        '了 三年',
        '终于 关闭了',
    ];

    const sentenceTokens = language === 'zh' ? sentenceTokensZh : sentenceTokensEn;
    const chunkAssignments = language === 'zh' ? chunkAssignmentsZh : chunkAssignmentsEn;

    const clearKickTimeout = useCallback(() => {
        if (kickTimeoutRef.current !== null) {
            window.clearTimeout(kickTimeoutRef.current);
            kickTimeoutRef.current = null;
        }
    }, []);

    const handleKick = useCallback(() => {
        clearKickTimeout();
        setStep(1);
        kickTimeoutRef.current = window.setTimeout(() => {
            setStep(2);
            kickTimeoutRef.current = null;
        }, 1400);
    }, [clearKickTimeout]);

    useEffect(() => {
        return () => clearKickTimeout();
    }, [clearKickTimeout]);

    const totalSteps = 2;

    useEffect(() => {
        if (!registerStepControl) return;
        registerStepControl({
            currentStep: step < 2 ? 0 : 1,
            totalSteps,
            canGoNext: step < 2,
            canGoPrev: step > 0,
            goNext: () => {
                if (step === 0) {
                    handleKick();
                    return;
                }
                if (step === 1) {
                    clearKickTimeout();
                    setStep(2);
                }
            },
            goPrev: () => {
                clearKickTimeout();
                setStep(0);
            },
        });
    }, [registerStepControl, step, totalSteps, handleKick, clearKickTimeout]);

    useEffect(() => {
        if (!registerStepControl) return;
        return () => registerStepControl(null);
    }, [registerStepControl]);

    return (
        <>
            <ConceptStage>
                <NeonBabelFrame cornerLabel={language === 'zh' ? '模块 2 - Syndicate 登场' : 'Module 2 - Enter the Syndicate'}>
                    <div className="flex-1 relative flex items-center justify-center">
                        <div
                            className={`transition-all duration-700 absolute ${
                                step >= 1 ? '-translate-x-[160%] rotate-12 opacity-0' : 'translate-x-0'
                            }`}
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-32 h-32 bg-slate-700 rounded-full border-4 border-slate-500 flex items-center justify-center mb-4 text-3xl">
                                    o_O
                                </div>
                                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                                    {language === 'zh' ? 'Ron - 顺序处理' : 'Ron - Sequential'}
                                </span>
                            </div>
                        </div>

                        {step === 1 && (
                            <div className="absolute z-20 flex flex-col items-center">
                                <div className="w-20 h-10 bg-pink-500 rounded-b-2xl rounded-t-sm shadow-[0_0_18px_rgba(244,114,182,0.7)]" />
                                <div className="text-6xl font-black text-pink-400 tracking-[0.2em]">BOOT!</div>
                                <div className="mt-3 text-xs uppercase tracking-[0.4em] text-pink-200">
                                    {language === 'zh' ? '系统接管' : 'System override'}
                                </div>
                            </div>
                        )}

                        <div
                            className={`transition-all duration-1000 transform ${
                                step === 2 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                            }`}
                        >
                            <div className="relative flex flex-col items-center gap-4">
                                <div className="absolute -inset-8 bg-cyan-500/20 blur-2xl rounded-full" />
                                <div className="w-full max-w-4xl bg-slate-950/70 border border-cyan-400/30 rounded-2xl p-4 shadow-[0_0_25px_rgba(34,211,238,0.2)]">
                                    <div className="text-[10px] uppercase tracking-[0.4em] text-cyan-200">
                                        {language === 'zh' ? '长句子 · 同步处理' : 'Long sentence - processed simultaneously'}
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-cyan-100">
                                        {sentenceTokens.map((token, i) => (
                                            <span
                                                key={`${token}-${i}`}
                                                className="px-2 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 animate-pulse"
                                                style={{ animationDelay: `${i * 60}ms` }}
                                            >
                                                {token}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-4 p-5 bg-slate-900/70 rounded-2xl border border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.25)]">
                                    {chunkAssignments.map((chunk, i) => (
                                        <div
                                            key={chunk}
                                            className="flex flex-col items-center gap-2 bg-slate-950/60 border border-cyan-400/30 rounded-xl p-3"
                                        >
                                            <div className="flex items-center gap-2 text-cyan-200 text-[10px] uppercase tracking-[0.3em]">
                                                <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
                                                {language === 'zh' ? '同步' : 'Live'}
                                            </div>
                                            <div className="w-12 h-12 bg-cyan-900 rounded-lg flex items-center justify-center border border-cyan-400">
                                                <Users className="text-cyan-300" size={24} />
                                            </div>
                                            <span className="text-[10px] text-cyan-200 uppercase tracking-[0.2em]">Netrunner {i + 1}</span>
                                            <span className="text-[11px] text-slate-200 text-center leading-tight">{chunk}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center">
                                    <h2
                                        className="text-2xl font-bold text-cyan-200"
                                        style={{ fontFamily: 'var(--neon-display-font)' }}
                                    >
                                        The Syndicate
                                    </h2>
                                    <p className="text-cyan-100 mt-2 text-xs uppercase tracking-[0.3em]">
                                        {language === 'zh' ? '每名成员同时处理一个片段' : 'Every worker reads a chunk at the same time'}
                                    </p>
                                </div>

                                {step === 2 && (
                                    <div className="text-center text-xs text-slate-300 max-w-xl">
                                        {language === 'zh'
                                            ? '并行处理意味着每个词同时被分析，规模巨大。'
                                            : 'Parallel processing means every word is analyzed at the same time, at massive scale.'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {step < 2 && (
                            <div className="absolute bottom-6 text-center text-sm text-slate-300 max-w-xl">
                                <span>
                                    {language === 'zh'
                                        ? '进入 Syndicate。不是一个快递员，而是一支同步的团队并行点亮整句。'
                                        : 'Enter the Syndicate. No single courier. A synchronized team lights up the full sentence in parallel.'}
                                </span>
                            </div>
                        )}

                        {step === 0 && (
                            <button
                                onClick={handleKick}
                                className="absolute bottom-16 px-8 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-slate-900 rounded-lg font-bold shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:scale-105 transition-transform"
                            >
                                <span className="flex items-center gap-2">
                                    <Zap size={20} /> {language === 'zh' ? '进入 Syndicate' : 'ENTER THE SYNDICATE'}
                                </span>
                            </button>
                        )}
                    </div>
                </NeonBabelFrame>
            </ConceptStage>
            <ExplainPanel>
                <li>
                    <strong>{language === 'zh' ? '顺序很慢：' : 'Sequential is Slow:'}</strong>{' '}
                    {language === 'zh'
                        ? 'RNN 必须逐词阅读，记忆负担大。'
                        : 'RNNs read word by word, which strains memory and time.'}
                </li>
                <li>
                    <strong>{language === 'zh' ? '并行很强：' : 'Parallel is Powerful:'}</strong>{' '}
                    {language === 'zh'
                        ? 'Transformer 同时分析整句。'
                        : 'Transformers analyze the full sentence simultaneously.'}
                </li>
                <li>
                    <strong>{language === 'zh' ? '结果：' : 'Result:'}</strong>{' '}
                    {language === 'zh'
                        ? '它能在更大规模上快速处理序列。'
                        : 'The model scales to huge sequences with far fewer bottlenecks.'}
                </li>
            </ExplainPanel>
        </>
    );
};
