import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const ideaItems = [
    { id: 'm1', label: { en: 'childhood', zh: '童年' }, group: 'Memory', x: '8%', y: '18%' },
    { id: 'm2', label: { en: 'yesterday', zh: '昨天' }, group: 'Memory', x: '34%', y: '28%' },
    { id: 'm3', label: { en: 'history', zh: '历史' }, group: 'Memory', x: '18%', y: '54%' },
    { id: 'p1', label: { en: 'goal', zh: '目标' }, group: 'Plan', x: '52%', y: '16%' },
    { id: 'p2', label: { en: 'schedule', zh: '日程' }, group: 'Plan', x: '74%', y: '38%' },
    { id: 'p3', label: { en: 'next week', zh: '下周' }, group: 'Plan', x: '58%', y: '64%' },
    { id: 'i1', label: { en: 'dragon', zh: '龙' }, group: 'Imagined', x: '26%', y: '74%' },
    { id: 'i2', label: { en: 'utopia', zh: '乌托邦' }, group: 'Imagined', x: '66%', y: '76%' },
    { id: 'i3', label: { en: 'time travel', zh: '时间旅行' }, group: 'Imagined', x: '82%', y: '22%' },
];

const groups = [
    {
        id: 'Memory',
        label: { en: 'Memory', zh: '记忆' },
        description: { en: 'Anchors the past', zh: '锚定过去' },
        color: 'bg-amber-50 border-amber-200',
    },
    {
        id: 'Plan',
        label: { en: 'Plan', zh: '计划' },
        description: { en: 'Organizes the future', zh: '组织未来' },
        color: 'bg-sky-50 border-sky-200',
    },
    {
        id: 'Imagined',
        label: { en: 'Imagined', zh: '想象' },
        description: { en: 'Expands possibilities', zh: '扩展可能性' },
        color: 'bg-rose-50 border-rose-200',
    },
];

export const Slide2_LanguageShapesThought: React.FC = () => {
    const { language } = useLanguage();
    const [labelsOn, setLabelsOn] = useState(true);

    const text = {
        en: {
            title: 'Labels let us group ideas and plan with them.',
            labelsOn: 'Labels on',
            labelsOff: 'Labels off',
            inputTitle: 'Input',
            inputText: 'Raw ideas and experiences.',
            processTitle: 'Process',
            processText: 'Attach words and labels.',
            outputTitle: 'Output',
            outputText: 'Grouped, usable thoughts.',
            unlabeledNote: 'Unlabeled ideas are harder to group.',
            explain: `
- Language does not just describe thought, it helps structure it.
- Named categories make it easier to compare, group, and plan.
- The same ideas feel scattered without words to organize them.
`,
        },
        zh: {
            title: '标签让我们更容易分组与规划想法。',
            labelsOn: '显示标签',
            labelsOff: '隐藏标签',
            inputTitle: '输入',
            inputText: '原始想法与经历。',
            processTitle: '处理',
            processText: '贴上词语与标签。',
            outputTitle: '输出',
            outputText: '形成可用的结构。',
            unlabeledNote: '没有标签的想法更难分组。',
            explain: `
- 语言不仅描述思维，也帮助结构化思维。
- 命名的类别让比较、归类与计划更容易。
- 没有词语时，同样的想法更分散。
`,
        },
    };

    const t = text[language];

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col w-full h-full p-6">
                    <div className="text-base text-gray-600 mb-4">{t.title}</div>
                    <div className="grid grid-cols-3 gap-3 text-sm text-gray-500 mb-4">
                        <InfoTag title={t.inputTitle} text={t.inputText} />
                        <InfoTag title={t.processTitle} text={t.processText} />
                        <InfoTag title={t.outputTitle} text={t.outputText} />
                    </div>
                    <div className="flex-1 relative">
                        {labelsOn ? (
                            <div className="grid grid-cols-3 gap-4 h-full">
                                {groups.map((group) => (
                                    <div
                                        key={group.id}
                                        className={`rounded-2xl border ${group.color} p-4 flex flex-col`}
                                    >
                                    <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                                        {group.label[language]}
                                    </div>
                                    <div className="text-sm text-gray-500 mb-3">{group.description[language]}</div>
                                        <div className="flex flex-wrap gap-2">
                                            {ideaItems
                                                .filter((item) => item.group === group.id)
                                                .map((item) => (
                                            <span
                                                key={item.id}
                                                className="px-3 py-1 rounded-full text-sm bg-white border border-gray-200 text-gray-700"
                                            >
                                                {item.label[language]}
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
                                        className="absolute px-3 py-1 rounded-full text-sm bg-white border border-gray-200 text-gray-700 shadow-sm"
                                        style={{ left: item.x, top: item.y }}
                                    >
                                        {item.label[language]}
                                    </span>
                                ))}
                                <div className="absolute bottom-3 right-4 text-sm text-gray-400">
                                    {t.unlabeledNote}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setLabelsOn(true)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
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
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
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
