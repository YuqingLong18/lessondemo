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
            rules: 'Hand-written rules',
            learning: 'Learning from data',
            amount: 'Data amount',
            coverage: 'Coverage',
            broad: 'Broad',
            narrow: 'Narrow',
            explain: `
- Rules are precise but hard to scale.
- Learning improves with more and more representative data.
- This shift made modern AI possible.
`,
        },
        zh: {
            rules: '手写规则',
            learning: '数据学习',
            amount: '数据量',
            coverage: '覆盖度',
            broad: '广泛',
            narrow: '有限',
            explain: `
- 规则精确但难以扩展。
- 数据越多、越全面，学习效果越好。
- 这一转变推动了现代 AI 的兴起。
`,
        },
    };

    const text = t[language];
    const ruleAccuracy = 65;
    const learningAccuracy = useMemo(() => {
        const base = 35 + dataAmount * 0.5 + (broadCoverage ? 12 : -8);
        return Math.min(95, Math.max(20, base));
    }, [dataAmount, broadCoverage]);

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full gap-8">
                    <div className="flex gap-10">
                        <BarCard label={text.rules} value={ruleAccuracy} color="bg-blue-500" />
                        <BarCard label={text.learning} value={learningAccuracy} color="bg-emerald-500" />
                    </div>

                    <div className="flex items-center gap-6">
                        <div>
                            <label className="text-xs text-gray-600" htmlFor="data-amount">
                                {text.amount}
                            </label>
                            <input
                                id="data-amount"
                                type="range"
                                min={0}
                                max={100}
                                value={dataAmount}
                                onChange={(e) => setDataAmount(Number(e.target.value))}
                                className="w-48"
                            />
                        </div>
                        <div>
                            <div className="text-xs text-gray-600 mb-2">{text.coverage}</div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setBroadCoverage(true)}
                                    className={`px-3 py-1 rounded-full text-xs border ${
                                        broadCoverage ? 'bg-emerald-600 text-white border-emerald-600' : 'border-gray-200 text-gray-600'
                                    }`}
                                >
                                    {text.broad}
                                </button>
                                <button
                                    onClick={() => setBroadCoverage(false)}
                                    className={`px-3 py-1 rounded-full text-xs border ${
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

const BarCard: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
    <div className="w-52 p-4 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="text-sm font-semibold text-gray-700 mb-3">{label}</div>
        <div className="h-32 flex items-end">
            <div className={`w-full rounded-lg ${color}`} style={{ height: `${value}%` }} />
        </div>
        <div className="mt-2 text-xs text-gray-500">{value.toFixed(0)}%</div>
    </div>
);
