import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';
import { ArrowRight } from 'lucide-react';

export const Slide3_ReasoningFromAxioms: React.FC = () => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0);

    const t = {
        en: {
            axiom1: 'If X is even → X is divisible by 2',
            axiom2: '4 is even',
            rule: 'Apply syllogism',
            conclusion: '4 is divisible by 2',
            majorPremise: 'Major premise: All A has property C.',
            minorPremise: 'Minor premise: B is a type of A.',
            abstractConclusion: 'Conclusion: B has property C.',
            geoAxiom: 'Diagonals of a parallelogram bisect each other',
            geoInstance: 'Rectangles are parallelograms',
            geoConclusion: 'Diagonals of rectangles bisect each other',
            next: 'Apply Next Step',
            reset: 'Reset Proof',
            explain: `
- General-knowledge AI starts with axioms and rules.
- Theorem proving is a step-by-step reasoning search.
- Heuristics help choose which rule to apply first.
`,
        },
        zh: {
            axiom1: '如果 X 是偶数 → X 能被 2 整除',
            axiom2: '4 是偶数',
            rule: '应用三段论',
            conclusion: '4 能被 2 整除',
            majorPremise: '大前提：所有 A 具有性质 C。',
            minorPremise: '小前提：B 是 A 的一种。',
            abstractConclusion: '结论：B 具有性质 C。',
            geoAxiom: '平行四边形的对角线互相平分',
            geoInstance: '矩形是平行四边形',
            geoConclusion: '矩形的对角线互相平分',
            next: '推进下一步',
            reset: '重置证明',
            explain: `
- 通用知识型 AI 从公理和规则出发。
- 定理证明是逐步推理的搜索过程。
- 启发式信息帮助选择更有希望的推理路径。
`,
        },
    };

    const text = t[language];
    const highlightRule = step >= 1;
    const showConclusion = step >= 2;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full gap-6">
                    <div className="w-full max-w-3xl border border-gray-200 rounded-2xl bg-white p-4 text-sm text-gray-600">
                        <div className="font-semibold text-gray-700 mb-2">
                            {language === 'zh' ? '三段论抽象结构' : 'Abstract Syllogism Form'}
                        </div>
                        <div className="flex flex-col gap-1">
                            <div>{text.majorPremise}</div>
                            <div className="text-sky-600 font-semibold">{text.minorPremise}</div>
                            <div className="text-orange-600 font-semibold">{text.abstractConclusion}</div>
                        </div>
                    </div>

                    <ExampleRow
                        axiom1={text.axiom1}
                        axiom2={text.axiom2}
                        rule={text.rule}
                        conclusion={text.conclusion}
                        highlightRule={highlightRule}
                        showConclusion={showConclusion}
                    />

                    <ExampleRow
                        axiom1={text.geoAxiom}
                        axiom2={text.geoInstance}
                        rule={text.rule}
                        conclusion={text.geoConclusion}
                        highlightRule={highlightRule}
                        showConclusion={showConclusion}
                    />

                    <button
                        onClick={() => setStep(step >= 2 ? 0 : step + 1)}
                        className="px-6 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
                    >
                        {step >= 2 ? text.reset : text.next}
                    </button>
                </div>
            </ConceptStage>
            <ExplainPanel>{text.explain}</ExplainPanel>
        </div>
    );
};

const FactCard: React.FC<{ label: string; active: boolean; tone?: 'default' | 'minor' | 'conclusion' }> = ({ label, active, tone = 'default' }) => {
    const activeStyle = tone === 'conclusion'
        ? 'border-orange-400 bg-orange-50 text-orange-700'
        : tone === 'minor'
            ? 'border-sky-400 bg-sky-50 text-sky-700'
            : 'border-emerald-500 bg-emerald-50 text-emerald-700';

    return (
        <div
            className={`px-4 py-3 rounded-xl border text-sm font-medium ${
                active ? activeStyle : 'border-gray-200 text-gray-400'
            }`}
        >
            {label}
        </div>
    );
};

const ExampleRow: React.FC<{
    axiom1: string;
    axiom2: string;
    rule: string;
    conclusion: string;
    highlightRule: boolean;
    showConclusion: boolean;
}> = ({ axiom1, axiom2, rule, conclusion, highlightRule, showConclusion }) => (
    <div className="w-full max-w-3xl border border-gray-200 rounded-2xl bg-white p-4">
        <div className="flex items-center gap-6 justify-center">
            <div className="flex flex-col gap-3">
                <FactCard label={axiom1} active />
                <FactCard label={axiom2} active tone="minor" />
            </div>
            <ArrowRight className={`transition-colors ${highlightRule ? 'text-blue-500' : 'text-gray-300'}`} />
            <div className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold ${highlightRule ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-400'}`}>
                {rule}
            </div>
            <ArrowRight className={`transition-colors ${showConclusion ? 'text-emerald-500' : 'text-gray-300'}`} />
            <FactCard label={conclusion} active={showConclusion} tone="conclusion" />
        </div>
    </div>
);
