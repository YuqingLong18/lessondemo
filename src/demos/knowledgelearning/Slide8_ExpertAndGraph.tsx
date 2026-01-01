import React, { useCallback, useMemo, useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';
import { BookOpen, Cpu, Network } from 'lucide-react';

export const Slide8_ExpertAndGraph: React.FC = () => {
    const { language } = useLanguage();
    const [tab, setTab] = useState<'expert' | 'graph'>('expert');
    const [expertRun, setExpertRun] = useState(false);
    const [appliedRules, setAppliedRules] = useState<string[]>([]);
    const [derivedFacts, setDerivedFacts] = useState<string[]>([]);
    const [graphQueried, setGraphQueried] = useState(false);

    const t = {
        en: {
            expert: 'Expert System',
            graph: 'Knowledge Graph',
            knowledgeBase: 'Knowledge Base',
            inference: 'Inference Engine',
            patient: 'Patient intake',
            diagnose: 'Run Inference',
            applied: 'Applied',
            conclusion: 'Conclusion',
            derived: 'Derived facts',
            likelyPneumonia: 'Likely diagnosis: Pneumonia',
            likelyCold: 'Likely diagnosis: Common cold',
            likelyInfection: 'Likely diagnosis: Infection',
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
            patient: '患者信息',
            diagnose: '执行推理',
            applied: '已应用',
            conclusion: '结论',
            derived: '推导事实',
            likelyPneumonia: '可能诊断：肺炎',
            likelyCold: '可能诊断：感冒',
            likelyInfection: '可能诊断：感染',
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
    const factLabels = {
        fever: { en: 'Fever', zh: '发烧' },
        cough: { en: 'Cough', zh: '咳嗽' },
        chestPain: { en: 'Chest pain', zh: '胸痛' },
        fatigue: { en: 'Fatigue', zh: '乏力' },
        runnyNose: { en: 'Runny nose', zh: '流鼻涕' },
        soreThroat: { en: 'Sore throat', zh: '喉咙痛' },
        respiratoryInfection: { en: 'Respiratory infection', zh: '呼吸道感染' },
        infection: { en: 'Possible infection', zh: '可能感染' },
        pneumonia: { en: 'Pneumonia', zh: '肺炎' },
        xray: { en: 'Recommend chest X-ray', zh: '建议胸部 X 光' },
        cold: { en: 'Common cold', zh: '感冒' },
    } as const;

    const patientFacts = ['fever', 'cough', 'chestPain', 'fatigue'];

    const rules = useMemo(() => ([
        { id: 'R1', ifFacts: ['fever', 'cough'], thenFact: 'respiratoryInfection' },
        { id: 'R2', ifFacts: ['runnyNose', 'soreThroat'], thenFact: 'cold' },
        { id: 'R3', ifFacts: ['respiratoryInfection', 'chestPain'], thenFact: 'pneumonia' },
        { id: 'R4', ifFacts: ['fever', 'fatigue'], thenFact: 'infection' },
        { id: 'R5', ifFacts: ['pneumonia'], thenFact: 'xray' },
    ]), []);

    const formatRule = useCallback((rule: typeof rules[number]) => {
        const ifText = rule.ifFacts
            .map((fact) => factLabels[fact as keyof typeof factLabels][language])
            .join(language === 'zh' ? ' 且 ' : ' and ');
        const thenText = factLabels[rule.thenFact as keyof typeof factLabels][language];
        return language === 'zh'
            ? `如果 ${ifText} → ${thenText}`
            : `If ${ifText} → ${thenText}`;
    }, [factLabels, language]);

    const runInference = useCallback(() => {
        const known = new Set<string>(patientFacts);
        const applied: string[] = [];
        let changed = true;

        while (changed) {
            changed = false;
            rules.forEach((rule) => {
                if (applied.includes(rule.id)) return;
                const matches = rule.ifFacts.every((fact) => known.has(fact));
                if (matches) {
                    applied.push(rule.id);
                    if (!known.has(rule.thenFact)) {
                        known.add(rule.thenFact);
                        changed = true;
                    }
                }
            });
        }

        const derived = Array.from(known).filter((fact) => !patientFacts.includes(fact));
        setAppliedRules(applied);
        setDerivedFacts(derived);
        setExpertRun(true);
    }, [patientFacts, rules]);

    const conclusion = useMemo(() => {
        if (!expertRun) return '';
        if (derivedFacts.includes('pneumonia')) return text.likelyPneumonia;
        if (derivedFacts.includes('cold')) return text.likelyCold;
        if (derivedFacts.includes('infection')) return text.likelyInfection;
        return '';
    }, [derivedFacts, expertRun, text]);

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
                        <div className="w-full max-w-4xl flex gap-6">
                            <div className="w-3/5 flex flex-col gap-4">
                                <div className="p-4 rounded-2xl border border-gray-200 bg-white">
                                    <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">{text.patient}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {patientFacts.map((fact) => (
                                            <span key={fact} className="px-3 py-1 rounded-full text-xs bg-blue-50 text-blue-700 border border-blue-100">
                                                {factLabels[fact as keyof typeof factLabels][language]}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl border border-gray-200 bg-white">
                                    <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 mb-3">
                                        <BookOpen className="text-indigo-400" size={16} />
                                        {text.knowledgeBase}
                                    </div>
                                    <div className="grid gap-2">
                                        {rules.map((rule) => {
                                            const applied = appliedRules.includes(rule.id);
                                            return (
                                                <div
                                                    key={rule.id}
                                                    className={`px-3 py-2 rounded-lg border text-xs font-medium ${
                                                        applied ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-600'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between gap-2">
                                                        <span>{rule.id}</span>
                                                        {applied && (
                                                            <span className="text-[10px] uppercase tracking-widest text-emerald-600">
                                                                {text.applied}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="mt-1">{formatRule(rule)}</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="w-2/5 flex flex-col items-center gap-4">
                                <div className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-200 bg-white w-full">
                                    <Cpu className="text-indigo-500" />
                                    <span className="text-sm font-medium">{text.inference}</span>
                                    <button
                                        onClick={runInference}
                                        className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm"
                                    >
                                        {text.diagnose}
                                    </button>
                                </div>

                                {expertRun && (
                                    <div className="w-full p-4 rounded-2xl border border-emerald-200 bg-emerald-50 text-sm text-emerald-800">
                                        <div className="font-semibold mb-2">{text.conclusion}</div>
                                        <div className="mb-2">{conclusion}</div>
                                        <div className="text-xs text-emerald-700">
                                            {text.derived}: {derivedFacts.map((fact) => factLabels[fact as keyof typeof factLabels][language]).join(language === 'zh' ? '、' : ', ')}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-[420px] h-[200px] bg-white border border-gray-200 rounded-2xl">
                                <svg width="420" height="200">
                                    <line x1="90" y1="100" x2="200" y2="60" stroke="#cbd5e1" strokeWidth="3" />
                                    <line x1="200" y1="60" x2="320" y2="40" stroke="#cbd5e1" strokeWidth="3" />
                                    <line x1="200" y1="60" x2="320" y2="120" stroke="#cbd5e1" strokeWidth="3" />

                                    <Node cx={90} cy={100} label={language === 'zh' ? '蒙娜丽莎' : 'Mona Lisa'} active={graphQueried} />
                                    <Node cx={200} cy={60} label={language === 'zh' ? '卢浮宫' : 'Louvre'} active={graphQueried} />
                                    <Node cx={320} cy={40} label={language === 'zh' ? '法国' : 'France'} active={graphQueried} />
                                    <Node cx={320} cy={120} label={language === 'zh' ? '达芬奇' : 'Da Vinci'} active={false} />
                                </svg>
                                <Network className="absolute right-4 top-4 text-indigo-400" />
                            </div>
                            <button
                                onClick={() => setGraphQueried(true)}
                                className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm"
                            >
                                {text.question}
                            </button>
                            {graphQueried && (
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
