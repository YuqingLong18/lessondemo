import React, { useMemo, useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';

const stages = [
    { level: 1, zh: '原子', en: 'Atoms' },
    { level: 2, zh: '分子', en: 'Molecules' },
    { level: 3, zh: '蛋白质', en: 'Proteins' },
    { level: 4, zh: '器官', en: 'Organs' },
    { level: 5, zh: '天气系统', en: 'Weather' },
];

export const Slide6_KnowledgeLimits: React.FC = () => {
    const { language } = useLanguage();
    const [complexity, setComplexity] = useState(3);

    const t = {
        en: {
            slider: 'System complexity',
            compute: 'Compute cost',
            note: 'General laws are powerful, but real-world systems explode in complexity.',
            explain: `
- General knowledge can be too low-level for complex reality.
- Many real systems are open, uncertain, and multi-scale.
- Pure axioms often become computationally impossible.
`,
        },
        zh: {
            slider: '系统复杂度',
            compute: '计算成本',
            note: '基础规律很强大，但现实系统的复杂度会急剧爆炸。',
            explain: `
- 通用知识往往过于基础，难以直接应对复杂现实。
- 真实系统开放、多尺度且充满不确定性。
- 仅靠公理推理常常计算量不可承受。
`,
        },
    };

    const text = t[language];
    const cost = useMemo(() => Math.pow(2, complexity) * 6, [complexity]);

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex w-full h-full items-center justify-center gap-10 px-8">
                    <div className="w-1/2">
                        <div className="text-xs text-gray-500 mb-2">{text.slider}</div>
                        <input
                            type="range"
                            min={1}
                            max={5}
                            step={1}
                            value={complexity}
                            onChange={(e) => setComplexity(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="mt-4 space-y-2">
                            {stages.map((stage) => {
                                const active = stage.level === complexity;
                                return (
                                    <div
                                        key={stage.level}
                                        className={`px-4 py-2 rounded-lg border text-sm ${
                                            active ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500'
                                        }`}
                                    >
                                        {language === 'zh' ? stage.zh : stage.en}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="w-1/2">
                        <div className="text-xs text-gray-500 mb-2">{text.compute}</div>
                        <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-orange-300 to-red-500"
                                style={{ width: `${Math.min(cost, 100)}%` }}
                            />
                        </div>
                        <div className="mt-3 text-sm text-gray-600">{text.note}</div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{text.explain}</ExplainPanel>
        </div>
    );
};
