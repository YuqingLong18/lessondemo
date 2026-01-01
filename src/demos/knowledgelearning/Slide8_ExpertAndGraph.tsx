import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';
import { BookOpen, Cpu, Network } from 'lucide-react';

export const Slide8_ExpertAndGraph: React.FC = () => {
    const { language } = useLanguage();
    const [tab, setTab] = useState<'expert' | 'graph'>('expert');
    const [queried, setQueried] = useState(false);

    const t = {
        en: {
            expert: 'Expert System',
            graph: 'Knowledge Graph',
            knowledgeBase: 'Knowledge Base',
            inference: 'Inference Engine',
            diagnose: 'Run Inference',
            diagnosis: 'Likely diagnosis: Pneumonia',
            question: 'Ask: Where is Mona Lisa?',
            answer: 'Answer: Louvre → France',
            explain: `
- Expert systems store domain rules and reason like specialists.
- Knowledge graphs represent entities and relationships.
- Both emphasize structured, reusable knowledge.
`,
        },
        zh: {
            expert: '专家系统',
            graph: '知识图谱',
            knowledgeBase: '知识库',
            inference: '推理引擎',
            diagnose: '执行推理',
            diagnosis: '可能诊断：肺炎',
            question: '提问：蒙娜丽莎在哪里？',
            answer: '答案：卢浮宫 → 法国',
            explain: `
- 专家系统把领域规则组织起来进行推理。
- 知识图谱用实体与关系表达知识。
- 两者都强调结构化、可复用的知识。
`,
        },
    };

    const text = t[language];

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full gap-6">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setTab('expert')}
                            className={`px-4 py-2 rounded-full text-sm border ${tab === 'expert' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600'}`}
                        >
                            {text.expert}
                        </button>
                        <button
                            onClick={() => setTab('graph')}
                            className={`px-4 py-2 rounded-full text-sm border ${tab === 'graph' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-200 text-gray-600'}`}
                        >
                            {text.graph}
                        </button>
                    </div>

                    {tab === 'expert' ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 bg-white">
                                    <BookOpen className="text-indigo-500" />
                                    <span className="text-sm font-medium">{text.knowledgeBase}</span>
                                </div>
                                <div className="h-10 w-16 border-t-2 border-gray-300" />
                                <div className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 bg-white">
                                    <Cpu className="text-indigo-500" />
                                    <span className="text-sm font-medium">{text.inference}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setQueried(true)}
                                className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm"
                            >
                                {text.diagnose}
                            </button>
                            {queried && (
                                <div className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
                                    {text.diagnosis}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-[420px] h-[200px] bg-white border border-gray-200 rounded-2xl">
                                <svg width="420" height="200">
                                    <line x1="90" y1="100" x2="200" y2="60" stroke="#cbd5e1" strokeWidth="3" />
                                    <line x1="200" y1="60" x2="320" y2="40" stroke="#cbd5e1" strokeWidth="3" />
                                    <line x1="200" y1="60" x2="320" y2="120" stroke="#cbd5e1" strokeWidth="3" />

                                    <Node cx={90} cy={100} label={language === 'zh' ? '蒙娜丽莎' : 'Mona Lisa'} active={queried} />
                                    <Node cx={200} cy={60} label={language === 'zh' ? '卢浮宫' : 'Louvre'} active={queried} />
                                    <Node cx={320} cy={40} label={language === 'zh' ? '法国' : 'France'} active={queried} />
                                    <Node cx={320} cy={120} label={language === 'zh' ? '达芬奇' : 'Da Vinci'} active={false} />
                                </svg>
                                <Network className="absolute right-4 top-4 text-indigo-400" />
                            </div>
                            <button
                                onClick={() => setQueried(true)}
                                className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm"
                            >
                                {text.question}
                            </button>
                            {queried && (
                                <div className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
                                    {text.answer}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </ConceptStage>
            <ExplainPanel>{text.explain}</ExplainPanel>
        </div>
    );
};

const Node: React.FC<{ cx: number; cy: number; label: string; active: boolean }> = ({ cx, cy, label, active }) => (
    <g>
        <circle cx={cx} cy={cy} r={24} fill={active ? '#a7f3d0' : '#e5e7eb'} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={10} fill="#374151">
            {label}
        </text>
    </g>
);
