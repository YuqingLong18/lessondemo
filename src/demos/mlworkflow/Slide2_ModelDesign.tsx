import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

type DataType = 'tabular' | 'image' | 'sequence';

type ModelKey = 'linear' | 'cnn' | 'rnn';

type ModelScore = Record<ModelKey, number>;

const baseScores: Record<DataType, ModelScore> = {
    tabular: { linear: 0.82, cnn: 0.35, rnn: 0.4 },
    image: { linear: 0.3, cnn: 0.88, rnn: 0.5 },
    sequence: { linear: 0.35, cnn: 0.45, rnn: 0.86 },
};

const models = [
    { key: 'linear', label: 'Linear Model', bar: 'bg-slate-500', pill: 'bg-slate-100 text-slate-700' },
    { key: 'cnn', label: 'CNN', bar: 'bg-blue-500', pill: 'bg-blue-100 text-blue-700' },
    { key: 'rnn', label: 'RNN', bar: 'bg-purple-500', pill: 'bg-purple-100 text-purple-700' },
] as const;

export const Slide2_ModelDesign: React.FC = () => {
    const { language } = useLanguage();
    const [dataType, setDataType] = useState<DataType>('tabular');
    const [dataSize, setDataSize] = useState<'small' | 'large'>('small');

    const scores = useMemo(() => {
        const boost: ModelScore =
            dataSize === 'large'
                ? { linear: 0, cnn: 0.08, rnn: 0.08 }
                : { linear: 0.08, cnn: 0, rnn: 0 };
        return (Object.keys(baseScores[dataType]) as ModelKey[]).reduce((acc, key) => {
            acc[key] = Math.min(1, baseScores[dataType][key] + boost[key]);
            return acc;
        }, {} as ModelScore);
    }, [dataSize, dataType]);

    const bestModel = (Object.keys(scores) as ModelKey[]).reduce((best, key) =>
        scores[key] > scores[best] ? key : best
    , 'linear');

    const panel =
        language === 'zh'
            ? `**Model Design**\n\n- No Free Lunch: no model wins on every task.\n- Match the model to data format, size, and constraints.\n- A good design starts with the task, not the algorithm.`
            : `**Model Design**\n\n- No Free Lunch: no model wins on every task.\n- Match the model to data format, size, and constraints.\n- A good design starts with the task, not the algorithm.`;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex flex-col gap-6">
                    <div className="flex flex-wrap items-center gap-6">
                        <div>
                            <div className="text-xs uppercase text-gray-400">Data format</div>
                            <div className="flex gap-2 mt-2">
                                {(['tabular', 'image', 'sequence'] as DataType[]).map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setDataType(type)}
                                        aria-pressed={dataType === type}
                                        className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                                            dataType === type
                                                ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                    >
                                        {type === 'tabular' ? 'Tabular' : type === 'image' ? 'Image' : 'Sequence'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-xs uppercase text-gray-400">Data size</div>
                            <div className="flex gap-2 mt-2">
                                {(['small', 'large'] as const).map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setDataSize(size)}
                                        aria-pressed={dataSize === size}
                                        className={`px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                                            dataSize === size
                                                ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                    >
                                        {size === 'small' ? 'Small' : 'Large'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-4">
                        <div className="text-sm text-gray-500">
                            {language === 'zh'
                                ? 'Model fit scores update with the data profile.'
                                : 'Model fit scores update with the data profile.'}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {models.map((model) => {
                                const score = scores[model.key];
                                const isBest = model.key === bestModel;
                                return (
                                    <div
                                        key={model.key}
                                        className={`rounded-2xl border p-4 bg-white shadow-sm ${
                                            isBest ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-gray-200'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-semibold text-gray-800">{model.label}</div>
                                            <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${model.pill}`}>
                                                {model.key.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
                                            <div
                                                className={`h-2 rounded-full ${model.bar}`}
                                                style={{ width: `${Math.round(score * 100)}%` }}
                                            />
                                        </div>
                                        <div className="mt-2 text-xs text-gray-500">
                                            Fit score: {Math.round(score * 100)}
                                        </div>
                                        {isBest && (
                                            <div className="mt-2 text-xs font-semibold text-emerald-600">
                                                Best fit for this data
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
