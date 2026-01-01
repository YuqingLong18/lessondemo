import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';
import { ArrowRight } from 'lucide-react';

export const Slide7_ProductionRules: React.FC = () => {
    const { language } = useLanguage();
    const [cloudy, setCloudy] = useState(false);
    const [humid, setHumid] = useState(false);

    const t = {
        en: {
            cloudy: 'Cloudy',
            humid: 'Humid',
            rule1: 'If cloudy AND humid → Rain',
            rule2: 'If rain → River floods',
            rule3: 'If flood → Houses at risk',
            fact: 'Facts',
            explain: `
- Empirical knowledge is often encoded as IF-THEN rules.
- Chaining rules lets the system reach deeper conclusions.
- Expert systems store these rules in a knowledge base.
`,
        },
        zh: {
            cloudy: '多云',
            humid: '潮湿',
            rule1: '如果 多云 且 潮湿 → 下雨',
            rule2: '如果 下雨 → 河流泛滥',
            rule3: '如果 泛滥 → 房屋受威胁',
            fact: '事实',
            explain: `
- 经验知识通常用“如果…那么…”表示。
- 规则链可以推导出更深层结论。
- 专家系统把这些规则存入知识库。
`,
        },
    };

    const text = t[language];
    const rain = cloudy && humid;
    const flood = rain;
    const risk = flood;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full gap-8">
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500">{text.fact}</div>
                        <ToggleChip label={text.cloudy} active={cloudy} onClick={() => setCloudy(!cloudy)} />
                        <ToggleChip label={text.humid} active={humid} onClick={() => setHumid(!humid)} />
                    </div>

                    <div className="flex items-center gap-3">
                        <RuleCard label={text.rule1} active={rain} />
                        <ArrowRight className={rain ? 'text-blue-500' : 'text-gray-300'} />
                        <RuleCard label={text.rule2} active={flood} />
                        <ArrowRight className={flood ? 'text-blue-500' : 'text-gray-300'} />
                        <RuleCard label={text.rule3} active={risk} />
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{text.explain}</ExplainPanel>
        </div>
    );
};

const ToggleChip: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full text-sm border ${active ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600'}`}
    >
        {label}
    </button>
);

const RuleCard: React.FC<{ label: string; active: boolean }> = ({ label, active }) => (
    <div
        className={`px-4 py-3 rounded-xl border text-sm font-medium ${
            active ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-500'
        }`}
    >
        {label}
    </div>
);
