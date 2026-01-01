import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

// Import assets (some might be placeholders initially)
import tabularImg from '../../assets/input_tabular.png';
import imageImg from '../../assets/input_image.png';
import sequenceImg from '../../assets/input_sequence.png'; // To be generated
import linearStructure from '../../assets/structure_linear.png'; // To be generated
import cnnStructure from '../../assets/structure_cnn.png'; // To be generated
import rnnStructure from '../../assets/structure_rnn.png'; // To be generated

type DataType = 'tabular' | 'image' | 'sequence';
type ModelKey = 'linear' | 'cnn' | 'rnn';

interface InputCard {
    type: DataType;
    label: string;
    image: string;
    description: string;
}

interface ModelCard {
    key: ModelKey;
    label: string;
    pill: string;
    structureImg: string;
    bestFor: DataType;
}

const inputCardsData: InputCard[] = [
    { type: 'tabular', label: 'Tabular Data', image: tabularImg, description: 'Spreadsheets, CSVs, features' },
    { type: 'image', label: 'Image Data', image: imageImg, description: 'Photos, visual inputs' },
    { type: 'sequence', label: 'Sequence Data', image: sequenceImg, description: 'Audio, text, time-series' },
];

const modelCardsData: ModelCard[] = [
    { key: 'linear', label: 'Linear Model', pill: 'bg-slate-100 text-slate-700', structureImg: linearStructure, bestFor: 'tabular' },
    { key: 'cnn', label: 'CNN', pill: 'bg-blue-100 text-blue-700', structureImg: cnnStructure, bestFor: 'image' },
    { key: 'rnn', label: 'RNN', pill: 'bg-purple-100 text-purple-700', structureImg: rnnStructure, bestFor: 'sequence' },
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

    const panel =
        language === 'zh'
            ? `**Interactive Match**\n\n- **Select** a data input type from the top row.\n- **Match** it with the most appropriate model architecture below.\n- Observe the model structure to understand why it fits.`
            : `**Interactive Match**\n\n- **Select** a data input type from the top row.\n- **Match** it with the most appropriate model architecture below.\n- Observe the model structure to understand why it fits.`;

    const getFeedbackMessage = () => {
        if (!matchResult) return 'Select an input and a model to check the fit.';
        if (matchResult === 'correct') return 'Perfect Match! This model architecture is optimized for this data structure.';
        return 'Not quite. Consider the spatial or temporal nature of the data.';
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
                                    className={`group relative w-40 flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 outline-none
                                        ${selectedInput === card.type
                                            ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 shadow-md transform scale-105'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="w-24 h-24 mb-2 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                                        <img src={card.image} alt={card.label} className="w-full h-full object-contain p-1" />
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700">{card.label}</div>
                                    <div className="text-[10px] text-gray-400 mt-1">{card.description}</div>
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
                                    className={`w-40 flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-200 outline-none
                                         ${selectedModel === card.key
                                            ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200 shadow-md transform scale-105'
                                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.pill}`}>{card.key.toUpperCase()}</span>
                                        <span className="text-sm font-semibold text-gray-700">{card.label}</span>
                                    </div>

                                    {/* Structure Visualization */}
                                    <div className="w-32 h-20 rounded border border-slate-100 bg-slate-50 overflow-hidden flex items-center justify-center">
                                        <img src={card.structureImg} alt="Structure" className="w-full h-full object-contain opacity-80" />
                                    </div>
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
                            ✓ Connected!
                        </div>
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
