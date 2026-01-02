import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const nouns = ['rat', 'cheese', 'robot', 'child', 'apple', 'idea'];
const verbs = ['ate', 'chased', 'admired'];

const nounTraits: Record<string, { animate: boolean; edible: boolean }> = {
    rat: { animate: true, edible: false },
    cheese: { animate: false, edible: true },
    robot: { animate: true, edible: false },
    child: { animate: true, edible: false },
    apple: { animate: false, edible: true },
    idea: { animate: false, edible: false },
};

export const Slide5_SymbolicRules: React.FC = () => {
    const { language } = useLanguage();
    const [subject, setSubject] = useState('rat');
    const [verb, setVerb] = useState('ate');
    const [object, setObject] = useState('cheese');

    const text = {
        en: {
            rule: 'Rule: noun + verb + noun',
            grammar: 'Grammar',
            meaning: 'Meaning',
            grammatical: 'Valid by rules',
            odd: 'Odd meaning',
            meaningful: 'Meaningful',
            subjectLabel: 'Subject',
            verbLabel: 'Verb',
            objectLabel: 'Object',
            ruleNote: 'The grammar rule always accepts the sentence, but meaning depends on word roles.',
            explain: `
- Symbolic systems used explicit grammar rules.
- Rules can generate correct structure without understanding meaning.
- "The cheese ate the rat" follows rules but sounds wrong.
`,
        },
        zh: {
            rule: '规则：名词 + 动词 + 名词',
            grammar: '语法',
            meaning: '语义',
            grammatical: '语法正确',
            odd: '语义不通',
            meaningful: '语义合理',
            subjectLabel: '主语',
            verbLabel: '动词',
            objectLabel: '宾语',
            ruleNote: '语法规则总会接受句子，但语义取决于词语角色。',
            explain: `
- 符号主义系统使用显式的语法规则。
- 规则能生成正确结构，却不理解意义。
- "The cheese ate the rat" 符合规则，但语义不通。
`,
        },
    };

    const t = text[language];

    const { grammarOk, meaningOk } = useMemo(() => {
        const subjectTraits = nounTraits[subject];
        const objectTraits = nounTraits[object];

        let meaning = false;
        if (verb === 'ate') {
            meaning = subjectTraits.animate && objectTraits.edible;
        } else if (verb === 'chased') {
            meaning = subjectTraits.animate && objectTraits.animate;
        } else if (verb === 'admired') {
            meaning = subjectTraits.animate;
        }
        return { grammarOk: true, meaningOk: meaning };
    }, [subject, verb, object]);

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-base text-gray-600">{t.rule}</div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full text-sm font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700">
                                {t.grammar}: {t.grammatical}
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                                    meaningOk
                                        ? 'border-sky-200 bg-sky-50 text-sky-700'
                                        : 'border-rose-200 bg-rose-50 text-rose-700'
                                }`}
                            >
                                {t.meaning}: {meaningOk ? t.meaningful : t.odd}
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center gap-6">
                        <div className="text-3xl font-semibold text-gray-800">
                            The {subject} {verb} the {object}.
                        </div>
                        <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                            <SelectBox label={t.subjectLabel} value={subject} options={nouns} onChange={setSubject} />
                            <SelectBox label={t.verbLabel} value={verb} options={verbs} onChange={setVerb} />
                            <SelectBox label={t.objectLabel} value={object} options={nouns} onChange={setObject} />
                        </div>
                        <div className="text-sm text-gray-500 max-w-md text-center">{t.ruleNote}</div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{t.explain}</ExplainPanel>
        </div>
    );
};

interface SelectBoxProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ label, value, options, onChange }) => {
    return (
        <label className="flex flex-col gap-2 text-sm text-gray-500">
            <span className="uppercase tracking-wide">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-base text-gray-700"
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
};
