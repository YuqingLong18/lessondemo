import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

const WIDTH = 280;
const HEIGHT = 180;
const PADDING = 20;

// Generate noisy quadratic data
const generateData = (): { x: number, y: number }[] => {
    const points: { x: number, y: number }[] = [];
    for (let x = -3; x <= 3; x += 0.8) {
        const noise = (Math.random() - 0.5) * 1.5;
        const y = 0.5 * x * x + noise;
        points.push({ x, y });
    }
    return points;
};

// Simple model: Smooth quadratic
const getSimpleCurve = (): { x: number, y: number }[] => {
    return Array.from({ length: 50 }, (_, i) => {
        const x = -3 + (i / 49) * 6;
        const y = 0.5 * x * x; // The "true" underlying function
        return { x, y };
    });
};

// Complex model: Linear interpolation through every point (overfitting)
const getComplexCurve = (points: { x: number, y: number }[]) => {
    // Just sort points by x and connect them
    return [...points].sort((a, b) => a.x - b.x);
};

// Helper to scale points to SVG coordinates
const toSvg = (x: number, y: number) => {
    const sX = PADDING + ((x + 3) / 6) * (WIDTH - PADDING * 2);
    const sY = HEIGHT - PADDING - ((y + 1) / 7) * (HEIGHT - PADDING * 2); // shifted y range
    return `${sX},${sY}`;
};

export const Slide6_ModelSelection: React.FC = () => {
    const { language } = useLanguage();
    const [selected, setSelected] = useState<'simple' | 'complex' | null>(null);

    // Stable data per session
    const data = useMemo(() => generateData(), []);
    const simpleCurve = useMemo(() => getSimpleCurve(), []);
    const complexCurve = useMemo(() => getComplexCurve(data), [data]);

    const simplePath = simpleCurve.map(p => toSvg(p.x, p.y)).join(' ');
    const complexPath = complexCurve.map(p => toSvg(p.x, p.y)).join(' ');

    const copy = {
        zh: {
            panel: `**奥卡姆剃刀**\n\n- “如无必要，勿增实体。”\n- 当两个模型表现相近时，更简单的模型通常更好。\n- 复杂模型往往会对噪声过拟合，使其在新数据上更脆弱。`,
            title: '模型选择对决',
            subtitle: '我们应该把哪个模型部署到生产环境？',
            modelA: '模型 A',
            modelB: '模型 B',
            paramsLabel: '参数',
            trainingError: '训练误差',
            complexity: '复杂度',
            low: '低',
            veryLow: '很低',
            zeroPerfect: '零（完美）',
            extreme: '极高',
            excellent: '很好的选择！',
            wait: '等等... 再仔细看看！',
            razorApproved: '奥卡姆剃刀通过！🪒',
            razorBodyLead: '即使模型 A 有一些误差，它也捕捉到了',
            razorBodyEmphasis: '真正的趋势',
            razorBodyTail: '。它更稳健，能更好地泛化到新数据。',
            overfitTrap: '过拟合陷阱！⚠️',
            overfitBody:
                '模型 B 把每个点都击中，但它只是记住了噪声。它过于曲折且复杂，很可能在新数据上失败。',
        },
        en: {
            panel: `**Occam's Razor**\n\n- "Entities should not be multiplied beyond necessity."\n- When two models have similar performance, the simpler one is usually better.\n- Complex models often "overfit" to noise, making them fragile on new data.`,
            title: 'Model Selection Tournament',
            subtitle: 'Which model should we deploy to production?',
            modelA: 'Model A',
            modelB: 'Model B',
            paramsLabel: 'Params',
            trainingError: 'Training Error',
            complexity: 'Complexity',
            low: 'Low',
            veryLow: 'Very Low',
            zeroPerfect: 'Zero (Perfect)',
            extreme: 'Extreme',
            excellent: 'Excellent Choice!',
            wait: 'Wait... Look closer!',
            razorApproved: "Occam's Razor Approved! 🪒",
            razorBodyLead: 'Even though Model A has some error, it captures the ',
            razorBodyEmphasis: 'true trend',
            razorBodyTail: '. It is robust and will generalize well to new data.',
            overfitTrap: 'The Overfitting Trap! ⚠️',
            overfitBody:
                "Model B hit every single point, but it's just memorizing noise. It is too wiggly and complex. It will likely fail on new data.",
        },
    };
    const text = copy[language];
    const panel = text.panel;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex flex-col font-sans">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-bold text-gray-800">{text.title}</h2>
                        <p className="text-gray-500 text-sm mt-1">{text.subtitle}</p>
                    </div>

                    <div className="flex-1 flex justify-center gap-12 items-stretch">

                        {/* Simple Model Card */}
                        <div
                            onClick={() => setSelected('simple')}
                            className={`w-72 relative rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col overflow-hidden
                                ${selected === 'simple'
                                    ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105 ring-2 ring-emerald-200'
                                    : 'border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md'}`}
                        >
                            <div className="p-4 bg-slate-50 border-b border-gray-100 flex justify-center">
                                <svg width={WIDTH} height={HEIGHT} className="overflow-visible">
                                    {/* Data Points */}
                                    {data.map((p, i) => (
                                        <circle key={i} cx={toSvg(p.x, p.y).split(',')[0]} cy={toSvg(p.x, p.y).split(',')[1]} r="3" fill="#94a3b8" />
                                    ))}
                                    {/* Curve */}
                                    <polyline points={simplePath} fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="p-5 flex-1 flex flex-col items-center text-center">
                                <h3 className="font-bold text-lg text-gray-800">{text.modelA}</h3>
                                <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500 mt-2">
                                    {text.paramsLabel}: 3
                                </div>
                                <div className="mt-4 space-y-1">
                                    <div className="text-sm text-gray-600">
                                        {text.trainingError}:{' '}
                                        <span className="font-semibold text-amber-600">{text.low}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {text.complexity}:{' '}
                                        <span className="font-semibold text-emerald-600">{text.veryLow}</span>
                                    </div>
                                </div>
                                {selected === 'simple' && (
                                    <div className="mt-auto pt-4 text-emerald-700 font-bold flex items-center gap-2 animate-pulse">
                                        <CheckCircleIcon className="w-5 h-5" />
                                        {text.excellent}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Complex Model Card */}
                        <div
                            onClick={() => setSelected('complex')}
                            className={`w-72 relative rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col overflow-hidden
                                ${selected === 'complex'
                                    ? 'border-rose-500 bg-rose-50 shadow-lg scale-105 ring-2 ring-rose-200'
                                    : 'border-gray-200 bg-white hover:border-rose-300 hover:shadow-md'}`}
                        >
                            <div className="p-4 bg-slate-50 border-b border-gray-100 flex justify-center">
                                <svg width={WIDTH} height={HEIGHT} className="overflow-visible">
                                    {/* Data Points */}
                                    {data.map((p, i) => (
                                        <circle key={i} cx={toSvg(p.x, p.y).split(',')[0]} cy={toSvg(p.x, p.y).split(',')[1]} r="3" fill="#94a3b8" />
                                    ))}
                                    {/* Curve */}
                                    <polyline points={complexPath} fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 2" />
                                </svg>
                            </div>
                            <div className="p-5 flex-1 flex flex-col items-center text-center">
                                <h3 className="font-bold text-lg text-gray-800">{text.modelB}</h3>
                                <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500 mt-2">
                                    {text.paramsLabel}: 100+
                                </div>
                                <div className="mt-4 space-y-1">
                                    <div className="text-sm text-gray-600">
                                        {text.trainingError}:{' '}
                                        <span className="font-semibold text-emerald-600">{text.zeroPerfect}</span>
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        {text.complexity}:{' '}
                                        <span className="font-semibold text-rose-600">{text.extreme}</span>
                                    </div>
                                </div>
                                {selected === 'complex' && (
                                    <div className="mt-auto pt-4 text-rose-700 font-bold flex items-center gap-2">
                                        <XCircleIcon className="w-5 h-5" />
                                        {text.wait}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Feedback Area */}
                    <div className={`mt-8 p-4 rounded-xl border text-center transition-all duration-500 ${selected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} 
                        ${selected === 'simple' ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                        {selected === 'simple' ? (
                            <p className="text-emerald-800 text-sm">
                                <strong className="block text-base mb-1">{text.razorApproved}</strong>
                                {text.razorBodyLead}
                                <strong>{text.razorBodyEmphasis}</strong>
                                {text.razorBodyTail}
                            </p>
                        ) : (
                            <p className="text-rose-800 text-sm">
                                <strong className="block text-base mb-1">{text.overfitTrap}</strong>
                                {text.overfitBody}
                            </p>
                        )}
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
