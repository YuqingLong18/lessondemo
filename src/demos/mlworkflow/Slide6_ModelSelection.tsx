import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import { CheckCircleIcon, XCircleIcon, StarIcon } from 'lucide-react';

const WIDTH = 280;
const HEIGHT = 180;
const PADDING = 20;

// Generate noisy quadratic data
const generateData = () => {
    const points: { x: number, y: number }[] = [];
    for (let x = -3; x <= 3; x += 0.8) {
        const noise = (Math.random() - 0.5) * 1.5;
        const y = 0.5 * x * x + noise;
        points.push({ x, y });
    }
    return points;
};

// Simple model: Smooth quadratic
const getSimpleCurve = (points: { x: number, y: number }[]) => {
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
    const simpleCurve = useMemo(() => getSimpleCurve(data), [data]);
    const complexCurve = useMemo(() => getComplexCurve(data), [data]);

    const simplePath = simpleCurve.map(p => toSvg(p.x, p.y)).join(' ');
    const complexPath = complexCurve.map(p => toSvg(p.x, p.y)).join(' ');

    const panel =
        language === 'zh'
            ? `**Occam's Razor**\n\n- "Entities should not be multiplied beyond necessity."\n- When two models have similar performance, the simpler one is usually better.\n- Complex models often "overfit" to noise, making them fragile on new data.`
            : `**Occam's Razor**\n\n- "Entities should not be multiplied beyond necessity."\n- When two models have similar performance, the simpler one is usually better.\n- Complex models often "overfit" to noise, making them fragile on new data.`;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex flex-col font-sans">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-bold text-gray-800">Model Selection Tournament</h2>
                        <p className="text-gray-500 text-sm mt-1">Which model should we deploy to production?</p>
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
                                <h3 className="font-bold text-lg text-gray-800">Model A</h3>
                                <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500 mt-2">Params: 3</div>
                                <div className="mt-4 space-y-1">
                                    <div className="text-sm text-gray-600">Training Error: <span className="font-semibold text-amber-600">Low</span></div>
                                    <div className="text-sm text-gray-600">Complexity: <span className="font-semibold text-emerald-600">Very Low</span></div>
                                </div>
                                {selected === 'simple' && (
                                    <div className="mt-auto pt-4 text-emerald-700 font-bold flex items-center gap-2 animate-pulse">
                                        <CheckCircleIcon className="w-5 h-5" />
                                        Excellent Choice!
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
                                <h3 className="font-bold text-lg text-gray-800">Model B</h3>
                                <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded text-gray-500 mt-2">Params: 100+</div>
                                <div className="mt-4 space-y-1">
                                    <div className="text-sm text-gray-600">Training Error: <span className="font-semibold text-emerald-600">Zero (Perfect)</span></div>
                                    <div className="text-sm text-gray-600">Complexity: <span className="font-semibold text-rose-600">Extreme</span></div>
                                </div>
                                {selected === 'complex' && (
                                    <div className="mt-auto pt-4 text-rose-700 font-bold flex items-center gap-2">
                                        <XCircleIcon className="w-5 h-5" />
                                        Wait... Look closer!
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
                                <strong className="block text-base mb-1">Occam's Razor Approved! 🪒</strong>
                                Even though Model A has some error, it captures the <strong>true trend</strong>. It is robust and will generalize well to new data.
                            </p>
                        ) : (
                            <p className="text-rose-800 text-sm">
                                <strong className="block text-base mb-1">The Overfitting Trap! ⚠️</strong>
                                Model B hit every single point, but it's just memorizing noise. It is too wiggly and complex. It will likely fail on new data.
                            </p>
                        )}
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
