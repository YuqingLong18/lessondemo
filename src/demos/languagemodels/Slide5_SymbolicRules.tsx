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
            explain: `
- Symbolic systems used explicit grammar rules.
- Rules can generate correct structure without understanding meaning.
- "The cheese ate the rat" follows rules but sounds wrong.
`,
        },
        zh: {
            rule: 'Rule: noun + verb + noun',
            grammar: 'Grammar',
            meaning: 'Meaning',
            grammatical: 'Valid by rules',
            odd: 'Odd meaning',
            meaningful: 'Meaningful',
            explain: `
- Symbolic systems used explicit grammar rules.
- Rules can generate correct structure without understanding meaning.
- "The cheese ate the rat" follows rules but sounds wrong.
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
                        <div className="text-sm text-gray-500">{t.rule}</div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200 bg-emerald-50 text-emerald-700">
                                {t.grammar}: {t.grammatical}
                            </span>
                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
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
                        <div className="text-2xl font-semibold text-gray-800">
                            The {subject} {verb} the {object}.
                        </div>
                        <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
                            <SelectBox label="Subject" value={subject} options={nouns} onChange={setSubject} />
                            <SelectBox label="Verb" value={verb} options={verbs} onChange={setVerb} />
                            <SelectBox label="Object" value={object} options={nouns} onChange={setObject} />
                        </div>
                        <div className="text-xs text-gray-500 max-w-md text-center">
                            The grammar rule always accepts the sentence, but meaning depends on word roles.
                        </div>
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
        <label className="flex flex-col gap-2 text-xs text-gray-500">
            <span className="uppercase tracking-wide">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700"
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
