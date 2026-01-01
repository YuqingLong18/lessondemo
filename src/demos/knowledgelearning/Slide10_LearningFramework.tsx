import React, { useMemo, useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';

const apples = [
    { x: 7, y: 8 },
    { x: 8, y: 7 },
    { x: 6, y: 9 },
    { x: 7, y: 6 },
    { x: 8, y: 8 },
];

const oranges = [
    { x: 2, y: 3 },
    { x: 3, y: 2 },
    { x: 4, y: 3 },
    { x: 2, y: 5 },
    { x: 5, y: 4 },
];

const elements = {
    en: [
        { id: 'objective', label: 'Objective', desc: 'Maximize classification accuracy.' },
        { id: 'model', label: 'Model', desc: 'A line that separates two classes.' },
        { id: 'algorithm', label: 'Algorithm', desc: 'Adjust the line to reduce errors.' },
        { id: 'data', label: 'Data', desc: 'Observed samples of apples and oranges.' },
        { id: 'knowledge', label: 'Knowledge', desc: 'Prior hints like size and color.' },
    ],
    zh: [
        { id: 'objective', label: '目标', desc: '最大化分类准确率。' },
        { id: 'model', label: '模型', desc: '一条分隔两类的直线。' },
        { id: 'algorithm', label: '算法', desc: '调整直线来减少错误。' },
        { id: 'data', label: '数据', desc: '苹果与橘子的样本。' },
        { id: 'knowledge', label: '知识', desc: '大小与颜色等先验提示。' },
    ],
};

export const Slide10_LearningFramework: React.FC = () => {
    const { language } = useLanguage();
    const [slope, setSlope] = useState(0.7);
    const [intercept, setIntercept] = useState(2.5);
    const [selected, setSelected] = useState('objective');

    const t = {
        en: {
            slope: 'Slope',
            intercept: 'Intercept',
            accuracy: 'Accuracy',
            explain: `
- Learning uses five elements: objective, model, algorithm, data, knowledge.
- The model improves by minimizing errors on data.
- Data quality and coverage strongly affect results.
`,
        },
        zh: {
            slope: '斜率',
            intercept: '截距',
            accuracy: '准确率',
            explain: `
- 学习框架包含五个要素：目标、模型、算法、数据、知识。
- 模型通过减少错误来改进。
- 数据质量与覆盖度会显著影响结果。
`,
        },
    };

    const text = t[language];
    const chips = elements[language];

    const accuracy = useMemo(() => {
        const total = apples.length + oranges.length;
        const correct = [
            ...apples.map((p) => (p.y >= slope * p.x + intercept ? 1 : 0)),
            ...oranges.map((p) => (p.y < slope * p.x + intercept ? 1 : 0)),
        ].reduce((sum, val) => sum + val, 0);
        return Math.round((correct / total) * 100);
    }, [slope, intercept]);

    const line = {
        x1: 0,
        y1: intercept,
        x2: 10,
        y2: slope * 10 + intercept,
    };

    const scaleX = (value: number) => 40 + value * 28;
    const scaleY = (value: number) => 220 - value * 18;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full gap-6">
                    <div className="flex gap-2 flex-wrap justify-center">
                        {chips.map((chip) => (
                            <button
                                key={chip.id}
                                onClick={() => setSelected(chip.id)}
                                className={`px-3 py-1 rounded-full text-xs border ${
                                    selected === chip.id ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600'
                                }`}
                            >
                                {chip.label}
                            </button>
                        ))}
                    </div>

                    <div className="text-sm text-gray-600">
                        {chips.find((chip) => chip.id === selected)?.desc}
                    </div>

                    <div className="relative w-[360px] h-[240px] bg-white border border-gray-200 rounded-2xl">
                        <svg width="360" height="240">
                            <line x1={scaleX(line.x1)} y1={scaleY(line.y1)} x2={scaleX(line.x2)} y2={scaleY(line.y2)} stroke="#3b82f6" strokeWidth={2} />
                            {apples.map((p, idx) => (
                                <circle key={`a-${idx}`} cx={scaleX(p.x)} cy={scaleY(p.y)} r={6} fill="#ef4444" />
                            ))}
                            {oranges.map((p, idx) => (
                                <circle key={`o-${idx}`} cx={scaleX(p.x)} cy={scaleY(p.y)} r={6} fill="#f59e0b" />
                            ))}
                        </svg>
                        <div className="absolute right-4 top-4 text-xs text-gray-500">
                            {text.accuracy}: <span className="font-semibold text-gray-800">{accuracy}%</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <label className="text-xs text-gray-600" htmlFor="slope-slider">
                                {text.slope}
                            </label>
                            <input
                                id="slope-slider"
                                type="range"
                                min={-0.2}
                                max={1.5}
                                step={0.1}
                                value={slope}
                                onChange={(e) => setSlope(Number(e.target.value))}
                                className="w-36"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xs text-gray-600" htmlFor="intercept-slider">
                                {text.intercept}
                            </label>
                            <input
                                id="intercept-slider"
                                type="range"
                                min={0}
                                max={8}
                                step={0.5}
                                value={intercept}
                                onChange={(e) => setIntercept(Number(e.target.value))}
                                className="w-36"
                            />
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{text.explain}</ExplainPanel>
        </div>
    );
};
