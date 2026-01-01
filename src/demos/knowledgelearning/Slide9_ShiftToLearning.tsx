import React, { useMemo, useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';

export const Slide9_ShiftToLearning: React.FC = () => {
    const { language } = useLanguage();
    const [dataAmount, setDataAmount] = useState(50);
    const [broadCoverage, setBroadCoverage] = useState(true);

    const t = {
        en: {
            rules: 'Knowledge-based rules',
            learning: 'Learning-based model',
            amount: 'Data amount',
            coverage: 'Coverage',
            broad: 'Broad',
            narrow: 'Narrow',
            fixedBoundary: 'Fixed boundary',
            growingBoundary: 'Boundary grows with data',
            world: 'Real-world cases',
            inScope: 'Rule coverage',
            outScope: 'Out of scope',
            learned: 'Learned boundary',
            advantage: 'More data + broader coverage → wider boundary',
            explain: `
- Rules are precise but locked inside a fixed boundary.
- Anything outside the written rules becomes “out of scope.”
- Learning-based methods expand the boundary as data grows.
- More data and broader coverage reduce blind spots.
`,
        },
        zh: {
            rules: '知识型规则',
            learning: '学习型模型',
            amount: '数据量',
            coverage: '覆盖度',
            broad: '广泛',
            narrow: '有限',
            fixedBoundary: '固定边界',
            growingBoundary: '边界会随数据扩大',
            world: '真实世界案例',
            inScope: '规则覆盖',
            outScope: '超出范围',
            learned: '学习边界',
            advantage: '数据越多、覆盖越广 → 边界越大',
            explain: `
- 规则精确，但被固定边界锁住。
- 边界之外就是“不可处理”的盲区。
- 学习型方法会随着数据扩展边界。
- 数据更全、覆盖更广，盲区越少。
`,
        },
    };

    const text = t[language];
    const learningCoverage = useMemo(() => {
        const base = 0.3 + dataAmount / 100 * 0.5 + (broadCoverage ? 0.1 : -0.05);
        return Math.min(0.9, Math.max(0.25, base));
    }, [dataAmount, broadCoverage]);

    const learningWidth = learningCoverage * (broadCoverage ? 1 : 0.75);
    const learningHeight = learningCoverage * (broadCoverage ? 0.8 : 0.55);

    const ruleWidth = 0.45;
    const ruleHeight = 0.35;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full gap-10">
                    <div className="flex gap-12">
                        <div className="w-80 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="text-base font-semibold text-gray-700 mb-1">{text.rules}</div>
                            <div className="text-sm text-gray-500 mb-3">{text.fixedBoundary}</div>
                            <div className="relative h-44 rounded-xl border border-dashed border-gray-300 bg-gray-50">
                                <div className="absolute top-2 left-2 text-[10px] text-gray-400">{text.world}</div>
                                <div
                                    className="absolute bg-blue-100 border border-blue-400 rounded-lg flex items-center justify-center text-[10px] text-blue-700"
                                    style={{
                                        width: `${ruleWidth * 100}%`,
                                        height: `${ruleHeight * 100}%`,
                                        left: '12%',
                                        top: '40%',
                                    }}
                                >
                                    {text.inScope}
                                </div>
                                <span className="absolute right-4 top-8 w-2 h-2 bg-rose-400 rounded-full" />
                                <span className="absolute right-8 bottom-10 w-2 h-2 bg-rose-400 rounded-full" />
                                <span className="absolute left-8 top-12 w-2 h-2 bg-rose-400 rounded-full" />
                                <div className="absolute bottom-2 right-3 text-[10px] text-rose-500">{text.outScope}</div>
                            </div>
                        </div>

                        <div className="w-80 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="text-base font-semibold text-gray-700 mb-1">{text.learning}</div>
                            <div className="text-sm text-gray-500 mb-3">{text.growingBoundary}</div>
                            <div className="relative h-44 rounded-xl border border-dashed border-gray-300 bg-gray-50">
                                <div className="absolute top-2 left-2 text-[10px] text-gray-400">{text.world}</div>
                                <div
                                    className="absolute bg-emerald-100 border border-emerald-400 rounded-lg flex items-center justify-center text-[10px] text-emerald-700 transition-all duration-300"
                                    style={{
                                        width: `${learningWidth * 100}%`,
                                        height: `${learningHeight * 100}%`,
                                        left: `${(1 - learningWidth) * 50}%`,
                                        top: `${(1 - learningHeight) * 50}%`,
                                    }}
                                >
                                    {text.learned}
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-emerald-600">{text.advantage}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div>
                            <label className="text-sm text-gray-600" htmlFor="data-amount">
                                {text.amount}
                            </label>
                            <input
                                id="data-amount"
                                type="range"
                                min={0}
                                max={100}
                                value={dataAmount}
                                onChange={(e) => setDataAmount(Number(e.target.value))}
                                className="w-56"
                            />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 mb-2">{text.coverage}</div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setBroadCoverage(true)}
                                    className={`px-3 py-1 rounded-full text-sm border ${
                                        broadCoverage ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-600'
                                    }`}
                                >
                                    {text.broad}
                                </button>
                                <button
                                    onClick={() => setBroadCoverage(false)}
                                    className={`px-3 py-1 rounded-full text-sm border ${
                                        !broadCoverage ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-600'
                                    }`}
                                >
                                    {text.narrow}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{text.explain}</ExplainPanel>
        </div>
    );
};
