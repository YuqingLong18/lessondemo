import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';
import { BookOpen, Stethoscope, Wheat, FlaskConical } from 'lucide-react';

const outcomes = [
    {
        id: 'medicine',
        threshold: 30,
        icon: Stethoscope,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        zh: '基础医疗知识',
        en: 'Basic Medicine',
    },
    {
        id: 'farming',
        threshold: 55,
        icon: Wheat,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        zh: '现代农业技巧',
        en: 'Modern Farming',
    },
    {
        id: 'science',
        threshold: 80,
        icon: FlaskConical,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        zh: '科学发明方法',
        en: 'Scientific Invention',
    },
    {
        id: 'library',
        threshold: 95,
        icon: BookOpen,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        zh: '跨学科智慧',
        en: 'Cross-domain Wisdom',
    },
];

export const Slide1_TimeTraveler: React.FC = () => {
    const { language } = useLanguage();
    const [knowledge, setKnowledge] = useState(40);

    const t = {
        en: {
            title: 'Knowledge Index',
            subtitle: 'Imagine reading every book ever written',
            slider: 'Accumulated knowledge',
            unlock: 'Unlocked',
            locked: 'Locked',
            explain: `
- Accumulated knowledge can look like intelligence.
- A "time traveler" with modern knowledge would seem brilliant in the past.
- Knowledge-based AI tries to fill a machine with useful knowledge.
`,
        },
        zh: {
            title: '知识指数',
            subtitle: '想象读完人类所有书籍',
            slider: '累积知识量',
            unlock: '已解锁',
            locked: '未解锁',
            explain: `
- 知识的积累往往表现为“智能”。
- 带着现代知识回到过去，会显得无比聪明。
- 知识型 AI 的思路是把有用知识装进机器。
`,
        },
    };

    const text = t[language];

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex w-full h-full items-center justify-center gap-8 px-6">
                    <div className="w-5/12 flex flex-col gap-6">
                        <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">{text.title}</div>
                            <div className="text-3xl font-semibold text-gray-900 mb-2">{knowledge}</div>
                            <div className="text-sm text-gray-500 mb-4">{text.subtitle}</div>
                            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-400 to-emerald-500"
                                    style={{ width: `${knowledge}%` }}
                                />
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50">
                            <label className="text-sm font-medium text-gray-700" htmlFor="knowledge-slider">
                                {text.slider}
                            </label>
                            <input
                                id="knowledge-slider"
                                type="range"
                                min={0}
                                max={100}
                                value={knowledge}
                                onChange={(e) => setKnowledge(Number(e.target.value))}
                                className="mt-3 w-full"
                            />
                        </div>
                    </div>

                    <div className="w-7/12 grid grid-cols-2 gap-4">
                        {outcomes.map((item) => {
                            const unlocked = knowledge >= item.threshold;
                            return (
                                <div
                                    key={item.id}
                                    className={`p-4 rounded-2xl border transition-all ${
                                        unlocked ? `${item.bg} border-transparent shadow-md` : 'border-gray-200 bg-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                unlocked ? item.bg : 'bg-gray-100'
                                            }`}
                                        >
                                            <item.icon className={unlocked ? item.color : 'text-gray-400'} size={22} />
                                        </div>
                                        <div>
                                            <div className={`text-sm font-semibold ${unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                                                {language === 'zh' ? item.zh : item.en}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {unlocked ? text.unlock : text.locked} · {item.threshold}+
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{text.explain}</ExplainPanel>
        </div>
    );
};
