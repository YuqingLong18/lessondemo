import React, { useMemo, useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';

const chartWidth = 520;
const chartHeight = 260;
const padding = 36;

const axisAges = [0, 10, 20, 30, 40, 50, 60, 70];

const fluidCurve = [
    { age: 0, value: 20 },
    { age: 10, value: 35 },
    { age: 20, value: 60 },
    { age: 30, value: 70 },
    { age: 40, value: 64 },
    { age: 50, value: 58 },
    { age: 60, value: 50 },
    { age: 70, value: 42 },
];

const crystalCurve = [
    { age: 0, value: 25 },
    { age: 10, value: 40 },
    { age: 20, value: 62 },
    { age: 30, value: 72 },
    { age: 40, value: 82 },
    { age: 50, value: 88 },
    { age: 60, value: 95 },
    { age: 70, value: 100 },
];

const buildPath = (values: { age: number; value: number }[]) => {
    return values
        .map((point, index) => {
            const x = padding + (point.age / 70) * (chartWidth - padding * 2);
            const y = chartHeight - padding - (point.value / 100) * (chartHeight - padding * 2);
            return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`;
        })
        .join(' ');
};

const interpolateValue = (values: { age: number; value: number }[], age: number) => {
    if (age <= values[0].age) return values[0].value;
    if (age >= values[values.length - 1].age) return values[values.length - 1].value;
    for (let i = 0; i < values.length - 1; i += 1) {
        const left = values[i];
        const right = values[i + 1];
        if (age >= left.age && age <= right.age) {
            const ratio = (age - left.age) / (right.age - left.age);
            return left.value + ratio * (right.value - left.value);
        }
    }
    return values[0].value;
};

export const Slide2_TwoIntelligences: React.FC = () => {
    const { language } = useLanguage();
    const [age, setAge] = useState(30);

    const t = {
        en: {
            fluid: 'Fluid intelligence',
            crystallized: 'Crystallized intelligence',
            ageLabel: 'Age',
            insight: 'Crystallized knowledge keeps growing while fluid intelligence peaks and declines.',
            yAxis: 'Intelligence levels',
            explain: `
- Fluid intelligence helps solve new problems.
- Crystallized intelligence grows with accumulated knowledge.
- Knowledge-based AI is inspired by this growth in crystallized intelligence.
`,
        },
        zh: {
            fluid: '流体智能',
            crystallized: '晶体智能',
            ageLabel: '年龄',
            insight: '晶体智能持续增长，而流体智能在峰值后下降。',
            yAxis: '智能水平',
            explain: `
- 流体智能帮助我们解决新问题。
- 晶体智能随着知识积累不断增长。
- 知识型 AI 正是借鉴晶体智能的增长方式。
`,
        },
    };

    const text = t[language];

    const points = useMemo(() => {
        return {
            fluid: fluidCurve,
            crystallized: crystalCurve,
        };
    }, []);

    const currentFluid = interpolateValue(points.fluid, age);
    const currentCrystal = interpolateValue(points.crystallized, age);

    const markerX = padding + (age / 70) * (chartWidth - padding * 2);
    const markerFluidY = chartHeight - padding - (currentFluid / 100) * (chartHeight - padding * 2);
    const markerCrystalY = chartHeight - padding - (currentCrystal / 100) * (chartHeight - padding * 2);

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full px-6">
                    <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                        <svg width={chartWidth} height={chartHeight} className="w-full">
                            <rect
                                x={padding}
                                y={padding}
                                width={chartWidth - padding * 2}
                                height={chartHeight - padding * 2}
                                fill="#ffffff"
                                stroke="#e2e8f0"
                            />
                            {Array.from({ length: 6 }).map((_, idx) => {
                                const y = padding + (idx / 5) * (chartHeight - padding * 2);
                                return <line key={idx} x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#e5e7eb" strokeWidth={1} />;
                            })}
                            <path d={buildPath(points.fluid)} stroke="#f59e0b" strokeWidth={4} fill="none" />
                            <path d={buildPath(points.crystallized)} stroke="#38bdf8" strokeWidth={4} fill="none" />
                            <circle cx={markerX} cy={markerFluidY} r={5} fill="#f59e0b" />
                            <circle cx={markerX} cy={markerCrystalY} r={5} fill="#38bdf8" />

                            {axisAges.map((axisAge) => {
                                const x = padding + (axisAge / 70) * (chartWidth - padding * 2);
                                return (
                                    <g key={axisAge}>
                                        <line x1={x} y1={chartHeight - padding} x2={x} y2={chartHeight - padding + 6} stroke="#cbd5f5" />
                                        <text x={x} y={chartHeight - padding + 18} textAnchor="middle" fontSize={10} fill="#6b7280">
                                            {axisAge === 0 ? (language === 'zh' ? '出生' : 'Birth') : `${axisAge}`}
                                        </text>
                                    </g>
                                );
                            })}

                            <text
                                x={padding - 24}
                                y={chartHeight / 2}
                                textAnchor="middle"
                                fontSize={11}
                                fill="#6b7280"
                                transform={`rotate(-90 ${padding - 24} ${chartHeight / 2})`}
                            >
                                {text.yAxis}
                            </text>
                        </svg>
                        <div className="flex items-center justify-center gap-6 text-xs text-gray-600 mt-3">
                            <LegendItem color="bg-amber-400" label={text.fluid} />
                            <LegendItem color="bg-sky-400" label={text.crystallized} />
                        </div>
                    </div>

                    <div className="flex items-center gap-6 mt-6">
                        <div className="text-sm text-gray-600">
                            {text.ageLabel}: <span className="font-semibold text-gray-900">{age}</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={70}
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="w-64"
                            aria-label={text.ageLabel}
                        />
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        {text.insight}
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{text.explain}</ExplainPanel>
        </div>
    );
};

const LegendItem: React.FC<{ color: string; label: string }> = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <span className={`w-4 h-2 rounded-full ${color}`} />
        <span>{label}</span>
    </div>
);
