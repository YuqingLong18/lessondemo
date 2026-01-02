import React, { useEffect, useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import type { RegisterStepControl } from '../../components/core/SlideDeck';
import { NeonBabelFrame } from './NeonBabelFrame';
import { useLanguage } from '../../components/core/LanguageContext';

interface SlideStepProps {
    registerStepControl?: RegisterStepControl;
}

export const Slide5_Outro: React.FC<SlideStepProps> = ({ registerStepControl }) => {
    const { language } = useLanguage();
    const [embeddingReady, setEmbeddingReady] = useState(false);
    const [positionReady, setPositionReady] = useState(false);
    const [attentionReady, setAttentionReady] = useState(false);
    const [decodeIndex, setDecodeIndex] = useState(0);
    const [isDecoding, setIsDecoding] = useState(false);

    useEffect(() => {
        if (!registerStepControl) return;
        registerStepControl(null);
    }, [registerStepControl]);

    const chineseTokens = ['那家', '在', '街对面', '的', '银行', '关门', '了'];
    const englishTokens = ['The', 'bank', 'across', 'the', 'street', 'is', 'closed.'];

    const attentionMatrix: number[][] = [
        [0.2, 0.1, 0.2, 0.1, 0.7, 0.4, 0.2],
        [0.1, 0.2, 0.1, 0.1, 0.6, 0.3, 0.2],
        [0.2, 0.1, 0.3, 0.2, 0.4, 0.2, 0.1],
        [0.1, 0.1, 0.2, 0.2, 0.5, 0.3, 0.2],
        [0.6, 0.4, 0.5, 0.4, 0.3, 0.2, 0.1],
        [0.4, 0.3, 0.3, 0.2, 0.5, 0.3, 0.6],
        [0.2, 0.2, 0.1, 0.1, 0.4, 0.5, 0.7],
    ];

    useEffect(() => {
        if (!isDecoding) return;
        if (decodeIndex >= englishTokens.length) {
            setIsDecoding(false);
            return;
        }
        const timer = window.setTimeout(() => {
            setDecodeIndex((prev) => prev + 1);
        }, 420);
        return () => window.clearTimeout(timer);
    }, [isDecoding, decodeIndex, englishTokens.length]);

    const handleDecode = () => {
        setDecodeIndex(0);
        setIsDecoding(true);
    };

    return (
        <>
            <ConceptStage>
                <NeonBabelFrame cornerLabel={language === 'zh' ? '模块 5 - 全局图景' : 'Module 5 - Big Picture'}>
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div className="text-xs uppercase tracking-[0.3em] text-cyan-200">
                                {language === 'zh' ? 'Transformer：全局图景' : 'Transformer: The Big Picture'}
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                                {language === 'zh' ? '机器翻译示例' : 'Machine Translation Demo'}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 flex-1">
                            <div className="bg-slate-950/70 border border-cyan-400/30 rounded-xl p-4 flex flex-col gap-3">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-200">
                                    {language === 'zh' ? '1. 输入 + 嵌入' : '1. Input + Embeddings'}
                                </div>
                                <div className="text-xs text-slate-300">
                                    {language === 'zh'
                                        ? '中文输入：那家在街对面的银行关门了'
                                        : 'Chinese input: 那家在街对面的银行关门了'}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {chineseTokens.map((token, i) => (
                                        <div key={`${token}-${i}`} className="relative flex flex-col items-center gap-1">
                                            {positionReady && (
                                                <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-bold flex items-center justify-center">
                                                    {i + 1}
                                                </span>
                                            )}
                                            <span className="px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 text-cyan-100 text-xs">
                                                {token}
                                            </span>
                                            {embeddingReady && (
                                                <div className="h-2 w-12 rounded-full bg-gradient-to-r from-cyan-400/70 via-pink-400/40 to-cyan-200/60" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-auto flex gap-2">
                                    {!embeddingReady && (
                                        <button
                                            onClick={() => setEmbeddingReady(true)}
                                            className="px-4 py-2 bg-cyan-400 text-slate-900 font-bold rounded-lg text-xs"
                                        >
                                            {language === 'zh' ? '计算词嵌入' : 'Calculate Word Embedding'}
                                        </button>
                                    )}
                                    {embeddingReady && !positionReady && (
                                        <button
                                            onClick={() => setPositionReady(true)}
                                            className="px-4 py-2 bg-amber-400 text-slate-900 font-bold rounded-lg text-xs"
                                        >
                                            {language === 'zh' ? '加入位置编码' : 'Add Positional Encoding'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-slate-950/70 border border-cyan-400/30 rounded-xl p-4 flex flex-col gap-3">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-200">
                                    {language === 'zh' ? '2. 并行注意力热力图' : '2. Parallel Attention Map'}
                                </div>
                                <div className="text-xs text-slate-300">
                                    {language === 'zh'
                                        ? 'Syndicate 同步计算所有词之间的注意力。'
                                        : 'The Syndicate computes attention between all words at once.'}
                                </div>
                                <div
                                    className="grid gap-1 text-[9px] text-slate-400"
                                    style={{ gridTemplateColumns: `60px repeat(${chineseTokens.length}, minmax(0, 1fr))` }}
                                >
                                    <div />
                                    {chineseTokens.map((token) => (
                                        <div key={`col-${token}`} className="text-center">
                                            {token}
                                        </div>
                                    ))}
                                    {chineseTokens.map((rowToken, rowIndex) => (
                                        <React.Fragment key={`row-${rowToken}`}>
                                            <div className="text-right pr-2">{rowToken}</div>
                                            {chineseTokens.map((_, colIndex) => {
                                                const value = attentionMatrix[rowIndex][colIndex];
                                                const intensity = attentionReady ? value : 0.08;
                                                return (
                                                    <div
                                                        key={`cell-${rowToken}-${colIndex}`}
                                                        className="h-4 rounded-sm border border-slate-800"
                                                        style={{
                                                            backgroundColor: `rgba(34, 211, 238, ${intensity})`,
                                                            boxShadow:
                                                                attentionReady && value > 0.5
                                                                    ? '0 0 8px rgba(34,211,238,0.6)'
                                                                    : 'none',
                                                        }}
                                                    />
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="mt-auto">
                                    {!attentionReady && (
                                        <button
                                            onClick={() => setAttentionReady(true)}
                                            className="px-4 py-2 bg-cyan-400 text-slate-900 font-bold rounded-lg text-xs"
                                        >
                                            {language === 'zh' ? '计算注意力热力图' : 'Compute Attention Map'}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="bg-slate-950/70 border border-cyan-400/30 rounded-xl p-4 flex flex-col gap-3">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-200">
                                    {language === 'zh' ? '3. Encoder 上下文图' : '3. Encoder Context Graph'}
                                </div>
                                <div className="text-xs text-slate-300">
                                    {language === 'zh'
                                        ? 'Encoder 融合关系，形成上下文语义图。'
                                        : 'The Encoder fuses relationships into a contextual meaning graph.'}
                                </div>
                                <div className="flex-1 flex items-center justify-center">
                                    <svg width="260" height="140" viewBox="0 0 260 140">
                                        <line x1="30" y1="70" x2="120" y2="30" stroke="rgba(94,234,212,0.7)" strokeWidth="2" />
                                        <line x1="120" y1="30" x2="210" y2="70" stroke="rgba(236,72,153,0.7)" strokeWidth="2" />
                                        <line x1="30" y1="70" x2="120" y2="110" stroke="rgba(56,189,248,0.7)" strokeWidth="2" />
                                        <line x1="120" y1="110" x2="210" y2="70" stroke="rgba(34,211,238,0.7)" strokeWidth="2" />
                                        <circle cx="30" cy="70" r="12" fill="#5eead4" />
                                        <circle cx="120" cy="30" r="14" fill="#f472b6" />
                                        <circle cx="210" cy="70" r="12" fill="#38bdf8" />
                                        <circle cx="120" cy="110" r="10" fill="#34d399" />
                                    </svg>
                                </div>
                                <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                                    {language === 'zh' ? '上下文锁定' : 'Context locked'}
                                </div>
                            </div>

                            <div className="bg-slate-950/70 border border-cyan-400/30 rounded-xl p-4 flex flex-col gap-3">
                                <div className="text-[11px] uppercase tracking-[0.3em] text-cyan-200">
                                    {language === 'zh' ? '4. Decoder 翻译' : '4. Decoder Translation'}
                                </div>
                                <div className="text-xs text-slate-300">
                                    {language === 'zh'
                                        ? 'Decoder 参考输入注意力，逐词生成英语翻译。'
                                        : 'The Decoder generates English while cross-attending to the input.'}
                                </div>
                                <div className="bg-slate-900/70 border border-slate-700/60 rounded-lg p-3 text-xs text-cyan-100">
                                    {language === 'zh'
                                        ? 'Encoder 团队：“理解了上下文，让我用英语写出来。”'
                                        : 'Encoder Team: "Understood the context. Let me write it out in English."'}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {englishTokens.map((token, index) => (
                                        <span
                                            key={`${token}-${index}`}
                                            className={`px-3 py-1 rounded-lg border text-xs font-medium ${
                                                index < decodeIndex
                                                    ? 'bg-cyan-100 text-slate-900 border-cyan-200'
                                                    : 'bg-slate-900/70 text-slate-500 border-slate-700/60'
                                            }`}
                                        >
                                            {index < decodeIndex ? token : '...'}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-auto">
                                    <button
                                        onClick={handleDecode}
                                        className="px-4 py-2 bg-cyan-400 text-slate-900 font-bold rounded-lg text-xs"
                                    >
                                        {language === 'zh' ? '解码' : 'Decode'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </NeonBabelFrame>
            </ConceptStage>
            <ExplainPanel>
                <li>
                    <strong>{language === 'zh' ? '嵌入 + 位置：' : 'Embeddings + Position:'}</strong>{' '}
                    {language === 'zh'
                        ? '词向量带上顺序信息，模型才能理解序列。'
                        : 'Tokens become vectors with order so the model understands the sequence.'}
                </li>
                <li>
                    <strong>{language === 'zh' ? '并行注意力：' : 'Parallel Attention:'}</strong>{' '}
                    {language === 'zh'
                        ? 'Syndicate 一次性计算整句注意力热力图。'
                        : 'The Syndicate builds a full attention heatmap across every word.'}
                </li>
                <li>
                    <strong>{language === 'zh' ? 'Encoder → Decoder：' : 'Encoder → Decoder:'}</strong>{' '}
                    {language === 'zh'
                        ? 'Encoder 抓住语义，Decoder 写出英文翻译。'
                        : 'The encoder grasps meaning, the decoder writes the English translation.'}
                </li>
            </ExplainPanel>
        </>
    );
};
