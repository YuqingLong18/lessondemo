import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const ideaItems = [
    { id: 'm1', label: 'childhood', group: 'Memory', x: '8%', y: '18%' },
    { id: 'm2', label: 'yesterday', group: 'Memory', x: '34%', y: '28%' },
    { id: 'm3', label: 'history', group: 'Memory', x: '18%', y: '54%' },
    { id: 'p1', label: 'goal', group: 'Plan', x: '52%', y: '16%' },
    { id: 'p2', label: 'schedule', group: 'Plan', x: '74%', y: '38%' },
    { id: 'p3', label: 'next week', group: 'Plan', x: '58%', y: '64%' },
    { id: 'i1', label: 'dragon', group: 'Imagined', x: '26%', y: '74%' },
    { id: 'i2', label: 'utopia', group: 'Imagined', x: '66%', y: '76%' },
    { id: 'i3', label: 'time travel', group: 'Imagined', x: '82%', y: '22%' },
];

const groups = [
    { id: 'Memory', description: 'Anchors the past', color: 'bg-amber-50 border-amber-200' },
    { id: 'Plan', description: 'Organizes the future', color: 'bg-sky-50 border-sky-200' },
    { id: 'Imagined', description: 'Expands possibilities', color: 'bg-rose-50 border-rose-200' },
];

export const Slide2_LanguageShapesThought: React.FC = () => {
    const { language } = useLanguage();
    const [labelsOn, setLabelsOn] = useState(true);

    const text = {
        en: {
            title: 'Labels let us group ideas and plan with them.',
            labelsOn: 'Labels on',
            labelsOff: 'Labels off',
            explain: `
- Language does not just describe thought, it helps structure it.
- Named categories make it easier to compare, group, and plan.
- The same ideas feel scattered without words to organize them.
`,
        },
        zh: {
            title: 'Labels let us group ideas and plan with them.',
            labelsOn: 'Labels on',
            labelsOff: 'Labels off',
            explain: `
- Language does not just describe thought, it helps structure it.
- Named categories make it easier to compare, group, and plan.
- The same ideas feel scattered without words to organize them.
`,
        },
    };

    const t = text[language];

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-sm text-gray-500 mb-3">{t.title}</div>
                    <div className="grid grid-cols-3 gap-3 text-[11px] text-gray-500 mb-4">
                        <InfoTag title="Input" text="Raw ideas and experiences." />
                        <InfoTag title="Process" text="Attach words and labels." />
                        <InfoTag title="Output" text="Grouped, usable thoughts." />
                    </div>
                    <div className="flex-1 relative">
                        {labelsOn ? (
                            <div className="grid grid-cols-3 gap-4 h-full">
                                {groups.map((group) => (
                                    <div
                                        key={group.id}
                                        className={`rounded-2xl border ${group.color} p-4 flex flex-col`}
                                    >
                                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                                            {group.id}
                                        </div>
                                        <div className="text-[11px] text-gray-500 mb-3">{group.description}</div>
                                        <div className="flex flex-wrap gap-2">
                                            {ideaItems
                                                .filter((item) => item.group === group.id)
                                                .map((item) => (
                                                    <span
                                                        key={item.id}
                                                        className="px-2 py-1 rounded-full text-xs bg-white border border-gray-200 text-gray-700"
                                                    >
                                                        {item.label}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="relative w-full h-full rounded-2xl border border-gray-200 bg-gray-50">
                                {ideaItems.map((item) => (
                                    <span
                                        key={item.id}
                                        className="absolute px-2 py-1 rounded-full text-xs bg-white border border-gray-200 text-gray-700 shadow-sm"
                                        style={{ left: item.x, top: item.y }}
                                    >
                                        {item.label}
                                    </span>
                                ))}
                                <div className="absolute bottom-3 right-4 text-[11px] text-gray-400">
                                    Unlabeled ideas are harder to group.
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setLabelsOn(true)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                                labelsOn
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-white text-gray-600 border-gray-200'
                            }`}
                            aria-pressed={labelsOn}
                        >
                            {t.labelsOn}
                        </button>
                        <button
                            type="button"
                            onClick={() => setLabelsOn(false)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                                !labelsOn
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-white text-gray-600 border-gray-200'
                            }`}
                            aria-pressed={!labelsOn}
                        >
                            {t.labelsOff}
                        </button>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{t.explain}</ExplainPanel>
        </div>
    );
};

interface InfoTagProps {
    title: string;
    text: string;
}

const InfoTag: React.FC<InfoTagProps> = ({ title, text }) => (
    <div className="rounded-xl border border-gray-200 bg-white px-3 py-2">
        <div className="font-semibold text-gray-700 mb-1">{title}</div>
        <div>{text}</div>
    </div>
);
