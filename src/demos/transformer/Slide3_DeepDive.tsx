import React, { useEffect, useState } from 'react';
import { MapPin, Package, Sparkles } from 'lucide-react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import type { RegisterStepControl } from '../../components/core/SlideDeck';
import { NeonBabelFrame } from './NeonBabelFrame';
import { useLanguage } from '../../components/core/LanguageContext';

interface SlideStepProps {
    registerStepControl?: RegisterStepControl;
}

export const Slide3_DeepDive: React.FC<SlideStepProps> = ({ registerStepControl }) => {
    const { language } = useLanguage();
    const [hasEmbedding, setHasEmbedding] = useState(false);
    const [hasPosition, setHasPosition] = useState(false);
    const step = hasEmbedding ? (hasPosition ? 2 : 1) : 0;
    const totalSteps = 3;

    const handleApplyEmbedding = () => setHasEmbedding(true);
    const handleApplyPosition = () => setHasPosition(true);

    useEffect(() => {
        if (!registerStepControl) return;
        registerStepControl({
            currentStep: step,
            totalSteps,
            canGoNext: step < totalSteps - 1,
            canGoPrev: step > 0,
            goNext: () => {
                if (step === 0) setHasEmbedding(true);
                if (step === 1) setHasPosition(true);
            },
            goPrev: () => {
                if (step === 2) setHasPosition(false);
                if (step === 1) setHasEmbedding(false);
            },
        });
    }, [registerStepControl, step, totalSteps]);

    useEffect(() => {
        if (!registerStepControl) return;
        return () => registerStepControl(null);
    }, [registerStepControl]);

    const tokens = [
        {
            en: 'Apple',
            zh: '苹果',
            propsEn: ['+5 Fruitiness', '+8 Redness', '+2 Tech Co.'],
            propsZh: ['+5 果味', '+8 红度', '+2 科技公司关联'],
        },
        {
            en: 'tastes',
            zh: '尝起来',
            propsEn: ['+7 Flavor signal', '+4 Verb action', '+2 Sensory cue'],
            propsZh: ['+7 味觉信号', '+4 动作动词', '+2 感官提示'],
        },
        {
            en: 'so',
            zh: '很',
            propsEn: ['+6 Intensifier', '+3 Context link', '+1 Tone shift'],
            propsZh: ['+6 程度加强', '+3 语境连接', '+1 语气变化'],
        },
        {
            en: 'sweet',
            zh: '甜',
            propsEn: ['+8 Sugary', '+6 Positive', '+2 Dessert link'],
            propsZh: ['+8 甜味', '+6 正向情感', '+2 甜点联想'],
        },
    ];

    return (
        <>
            <ConceptStage>
                <NeonBabelFrame cornerLabel={language === 'zh' ? '模块 3 - 装备上身' : 'Module 3 - Suiting Up'}>
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="bg-slate-950/70 border border-cyan-400/30 rounded-xl p-4 max-w-xl">
                            <div className="text-cyan-200 text-xs uppercase tracking-[0.3em]">
                                {language === 'zh' ? '首席 Netrunner' : 'Lead Netrunner'}
                            </div>
                            <div className="text-slate-100 font-semibold mt-2">
                                {language === 'zh'
                                    ? '“原始数据没法直接用，我们得先把它装进格网。”'
                                    : '"Raw data is useless. We need to prep it for the lattice."'}
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center gap-6">
                            {tokens.map((token, i) => {
                                const word = language === 'zh' ? token.zh : token.en;
                                const props = language === 'zh' ? token.propsZh : token.propsEn;
                                return (
                                    <div key={token.en} className="flex flex-col items-center gap-2">
                                        <div
                                            className={`transition-all duration-500 ${hasPosition ? 'opacity-100' : 'opacity-0 -translate-y-3'}`}
                                        >
                                            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 font-bold flex items-center justify-center shadow-lg border-2 border-amber-200">
                                                {i + 1}
                                            </div>
                                        </div>

                                        <div
                                            className={`relative w-24 h-32 rounded-2xl border-2 transition-all duration-700 flex items-center justify-center ${
                                                hasEmbedding
                                                    ? 'bg-gradient-to-br from-cyan-500/30 to-pink-500/20 border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.45)]'
                                                    : 'bg-slate-800/70 border-slate-500/70'
                                            }`}
                                            style={!hasEmbedding ? { clipPath: 'polygon(6% 0, 100% 6%, 94% 100%, 0 94%)' } : undefined}
                                        >
                                            {hasEmbedding ? (
                                                <Sparkles className="text-cyan-200" size={28} />
                                            ) : (
                                                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                                                    {language === 'zh' ? '原始' : 'Raw'}
                                                </span>
                                            )}
                                        </div>

                                        <div className="px-3 py-1 bg-slate-950/70 border border-slate-600/60 rounded text-sm text-slate-100">
                                            {word}
                                        </div>

                                        <div
                                            className={`mt-1 w-28 min-h-[64px] rounded-lg border text-[10px] uppercase tracking-[0.2em] px-2 py-2 text-cyan-200 transition-all duration-500 ${
                                                hasEmbedding
                                                    ? 'bg-slate-950/90 border-cyan-400/30 opacity-100'
                                                    : 'bg-transparent border-transparent opacity-0'
                                            }`}
                                        >
                                            <div className="text-[9px] text-cyan-300 mb-1">
                                                {language === 'zh' ? '嵌入' : 'Embedding'}
                                            </div>
                                            <div className="flex flex-col gap-1 text-[10px] normal-case text-slate-200">
                                                {props.map((prop) => (
                                                    <span key={prop}>{prop}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-center gap-4 mt-2">
                            {!hasEmbedding && (
                                <button
                                    onClick={handleApplyEmbedding}
                                    className="px-6 py-3 bg-cyan-400 text-slate-900 font-bold rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-cyan-300 flex items-center gap-2"
                                >
                                    <Package size={18} />
                                    {language === 'zh' ? '应用嵌入装甲' : 'APPLY EMBEDDING SUIT'}
                                </button>
                            )}
                            {hasEmbedding && !hasPosition && (
                                <button
                                    onClick={handleApplyPosition}
                                    className="px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-lg shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:bg-amber-300 flex items-center gap-2"
                                >
                                    <MapPin size={18} /> {language === 'zh' ? '添加位置标记' : 'ADD POSITION TRACKER'}
                                </button>
                            )}
                        </div>
                    </div>
                </NeonBabelFrame>
            </ConceptStage>
            <ExplainPanel>
                <li>
                    <strong>{language === 'zh' ? '嵌入：' : 'Embeddings:'}</strong>{' '}
                    {language === 'zh'
                        ? '把词变成“意义向量”。相似语义会得到相似装甲。'
                        : 'Words become numeric armor. Similar meaning leads to similar suits.'}
                </li>
                <li>
                    <strong>{language === 'zh' ? '位置编码：' : 'Positional Encoding:'}</strong>{' '}
                    {language === 'zh'
                        ? '像 GPS 一样标记词序。'
                        : 'A GPS stamp tells each token where it sits in the sentence.'}
                </li>
                <li>
                    <strong>{language === 'zh' ? '结果：' : 'Result:'}</strong>{' '}
                    {language === 'zh'
                        ? '团队并行工作但不会丢失顺序。'
                        : 'The team can work in parallel without losing word order.'}
                </li>
            </ExplainPanel>
        </>
    );
};
