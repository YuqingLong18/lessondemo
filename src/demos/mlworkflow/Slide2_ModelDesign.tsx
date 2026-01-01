import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage, type LocalizedText } from '../../components/core/LanguageContext';

// Import assets (some might be placeholders initially)
import tabularImg from '../../assets/tabular_data.svg';
import imageImg from '../../assets/input_image.png';
import sequenceImg from '../../assets/input_sequence.png'; // To be generated
import linearStructure from '../../assets/linear_model.png';
import cnnStructure from '../../assets/cnn_model.png';
import rnnStructure from '../../assets/rnn_model.webp';

type DataType = 'tabular' | 'image' | 'sequence';
type ModelKey = 'linear' | 'cnn' | 'rnn';

interface InputCard {
    type: DataType;
    label: LocalizedText;
    image: string;
    description: LocalizedText;
}

interface ModelCard {
    key: ModelKey;
    label: LocalizedText;
    pill: string;
    structureImg: string;
    bestFor: DataType;
}

const inputCardsData: InputCard[] = [
    {
        type: 'tabular',
        label: { en: 'Tabular Data', zh: '表格数据' },
        image: tabularImg,
        description: { en: 'Spreadsheets, CSVs, features', zh: '表格、CSV、特征向量' },
    },
    {
        type: 'image',
        label: { en: 'Image Data', zh: '图像数据' },
        image: imageImg,
        description: { en: 'Photos, visual inputs', zh: '照片、视觉输入' },
    },
    {
        type: 'sequence',
        label: { en: 'Sequence Data', zh: '序列数据' },
        image: sequenceImg,
        description: { en: 'Audio, text, time-series', zh: '音频、文本、时间序列' },
    },
];

const modelCardsData: ModelCard[] = [
    {
        key: 'linear',
        label: { en: 'Linear Model', zh: '线性模型' },
        pill: 'bg-slate-100 text-slate-700',
        structureImg: linearStructure,
        bestFor: 'tabular',
    },
    {
        key: 'cnn',
        label: { en: 'Convolutional Neural Network', zh: '卷积神经网络' },
        pill: 'bg-blue-100 text-blue-700',
        structureImg: cnnStructure,
        bestFor: 'image',
    },
    {
        key: 'rnn',
        label: { en: 'Recurrent Neural Network', zh: '循环神经网络' },
        pill: 'bg-purple-100 text-purple-700',
        structureImg: rnnStructure,
        bestFor: 'sequence',
    },
];

export const Slide2_ModelDesign: React.FC = () => {
    const { language } = useLanguage();
    const [selectedInput, setSelectedInput] = useState<DataType | null>(null);
    const [selectedModel, setSelectedModel] = useState<ModelKey | null>(null);
    const [matchResult, setMatchResult] = useState<'correct' | 'incorrect' | null>(null);

    const [shuffledInputs, setShuffledInputs] = useState<InputCard[]>([]);
    const [shuffledModels, setShuffledModels] = useState<ModelCard[]>([]);

    const inputRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const modelRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const [lineCoords, setLineCoords] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);

    // Shuffle on mount
    useEffect(() => {
        setShuffledInputs([...inputCardsData].sort(() => Math.random() - 0.5));
        setShuffledModels([...modelCardsData].sort(() => Math.random() - 0.5));
    }, []);

    // Reset match result when selection changes
    useEffect(() => {
        if (selectedInput && selectedModel) {
            const model = modelCardsData.find(m => m.key === selectedModel);
            if (model?.bestFor === selectedInput) {
                setMatchResult('correct');
            } else {
                setMatchResult('incorrect');
            }
        } else {
            setMatchResult(null);
        }
    }, [selectedInput, selectedModel]);

    // Calculate line coordinates
    useLayoutEffect(() => {
        if (matchResult === 'correct' && selectedInput && selectedModel && containerRef.current) {
            const inputEl = inputRefs.current[selectedInput];
            const modelEl = modelRefs.current[selectedModel];

            if (inputEl && modelEl) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const inputRect = inputEl.getBoundingClientRect();
                const modelRect = modelEl.getBoundingClientRect();

                setLineCoords({
                    x1: inputRect.left + inputRect.width / 2 - containerRect.left,
                    y1: inputRect.bottom - containerRect.top,
                    x2: modelRect.left + modelRect.width / 2 - containerRect.left,
                    y2: modelRect.top - containerRect.top,
                });
            }
        } else {
            setLineCoords(null);
        }
    }, [matchResult, selectedInput, selectedModel, shuffledInputs, shuffledModels]);
    // Add dependencies on shuffled arrays so if layout shifts due to shuffle (though only on mount), it recalcs.
    // Also consider window resize in a real app.

    const copy = {
        zh: {
            panel: `**交互匹配**\n\n- 从上方选择一种数据输入类型。\n- 将它与下方最合适的模型结构进行匹配。\n- 观察模型结构，理解为什么它适合这种数据。`,
            feedbackPrompt: '选择一个输入类型和一个模型来检查匹配度。',
            feedbackCorrect: '完美匹配！该模型结构针对这种数据形式进行了优化。',
            feedbackIncorrect: '还不太对。想一想数据的空间或时间结构。',
            connected: '✓ 匹配成功！',
        },
        en: {
            panel: `**Interactive Match**\n\n- **Select** a data input type from the top row.\n- **Match** it with the most appropriate model architecture below.\n- Observe the model structure to understand why it fits.`,
            feedbackPrompt: 'Select an input and a model to check the fit.',
            feedbackCorrect: 'Perfect Match! This model architecture is optimized for this data structure.',
            feedbackIncorrect: 'Not quite. Consider the spatial or temporal nature of the data.',
            connected: '✓ Connected!',
        },
    };
    const text = copy[language];
    const panel = text.panel;

    const getFeedbackMessage = () => {
        if (!matchResult) return text.feedbackPrompt;
        if (matchResult === 'correct') return text.feedbackCorrect;
        return text.feedbackIncorrect;
    };

    return (
        <>
            <ConceptStage>
                <div ref={containerRef} className="w-full h-full p-6 flex flex-col font-sans relative">
                    {/* Header / Feedback */}
                    <div className={`text-center transition-colors duration-300 font-medium h-8 mb-8 ${matchResult === 'correct' ? 'text-emerald-600' : matchResult === 'incorrect' ? 'text-amber-600' : 'text-gray-500'}`}>
                        {getFeedbackMessage()}
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-24 relative z-10"> {/* Increased gap */}
                        {/* Input Row */}
                        <div className="flex justify-center gap-12">
                            {shuffledInputs.map((card) => (
                                <button
                                    key={card.type}
                                    ref={(el) => { inputRefs.current[card.type] = el; }}
                                    onClick={() => setSelectedInput(card.type)}
                                    className={`group relative w-56 flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 outline-none
                                        ${selectedInput === card.type
                                            ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 shadow-md transform scale-105'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="w-32 h-32 mb-3 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                                        <img src={card.image} alt={card.label[language]} className="w-full h-full object-contain p-2" />
                                    </div>
                                    <div className="text-base font-semibold text-gray-700">{card.label[language]}</div>
                                    <div className="text-xs text-center text-gray-400 mt-1 leading-tight">
                                        {card.description[language]}
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Model Row */}
                        <div className="flex justify-center gap-12">
                            {shuffledModels.map((card) => (
                                <button
                                    key={card.key}
                                    ref={(el) => { modelRefs.current[card.key] = el; }}
                                    onClick={() => setSelectedModel(card.key)}
                                    className={`group relative w-56 flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 outline-none
                                         ${selectedModel === card.key
                                            ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200 shadow-md transform scale-105'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="w-32 h-32 mb-3 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                                        <img src={card.structureImg} alt={card.label[language]} className="w-full h-full object-contain p-2" />
                                    </div>
                                    <div className="text-sm font-bold text-center text-gray-700 leading-tight">{card.label[language]}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* SVG Connector Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {lineCoords && (
                            <line
                                x1={lineCoords.x1}
                                y1={lineCoords.y1}
                                x2={lineCoords.x2}
                                y2={lineCoords.y2}
                                stroke="#10b981"
                                strokeWidth="4"
                                strokeDasharray="10"
                                className="animate-dash"
                                style={{ strokeDashoffset: 0 }}
                            >
                                <animate attributeName="stroke-dashoffset" from="100" to="0" dur="0.5s" fill="freeze" />
                            </line>
                        )}
                    </svg>

                    {/* Simple CSS animation fallback/hack inline or we assume global css handles it. Using simple opacity transition wrapper */}
                    <div className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-all duration-500 z-20 ${matchResult === 'correct' ? 'opacity-100 scale-100 delay-300' : 'opacity-0 scale-90'}`}>
                        <div className="bg-white/95 p-4 rounded-full shadow-xl border-2 border-emerald-100 text-emerald-600 font-bold text-xl backdrop-blur-sm">
                            {text.connected}
                        </div>
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
