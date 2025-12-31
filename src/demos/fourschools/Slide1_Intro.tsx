import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { Binary, Network, Dna, Scale } from 'lucide-react';
import { useLanguage } from '../../components/core/LanguageContext';

const schools = [
    {
        id: 'symbolic',
        name: { zh: '符号主义学派', en: 'Symbolic School' },
        icon: Binary,
        color: 'bg-blue-100 border-blue-500 text-blue-700',
        philosophy: { zh: '智能是对符号的操控（逻辑与规则）。', en: 'Intelligence is manipulating symbols (Logic & Rules).' },
        keywords: { zh: '逻辑、规则、知识图谱', en: 'Logic, Rules, Knowledge Graphs' }
    },
    {
        id: 'bayesian',
        name: { zh: '贝叶斯学派', en: 'Bayesian School' },
        icon: Scale, // Representing weighing probabilities
        color: 'bg-orange-100 border-orange-500 text-orange-700',
        philosophy: { zh: '智能是管理不确定性（概率）。', en: 'Intelligence is managing uncertainty (Probability).' },
        keywords: { zh: '概率、不确定性、推断', en: 'Probability, Uncertainty, Inference' }
    },
    {
        id: 'connectionist',
        name: { zh: '连接主义学派', en: 'Connectionist School' },
        icon: Network,
        color: 'bg-purple-100 border-purple-500 text-purple-700',
        philosophy: { zh: '智能是连接简单单元（类脑）。', en: 'Intelligence is networking simple units (The Brain).' },
        keywords: { zh: '神经网络、深度学习、反向传播', en: 'Neural Networks, Deep Learning, Backprop' }
    },
    {
        id: 'evolutionary',
        name: { zh: '进化主义学派', en: 'Evolutionary School' },
        icon: Dna,
        color: 'bg-green-100 border-green-500 text-green-700',
        philosophy: { zh: '智能是演化解决方案（自然选择）。', en: 'Intelligence is evolving solutions (Natural Selection).' },
        keywords: { zh: '遗传算法、进化、优化', en: 'Genetic Algos, Evolution, Optimization' }
    }
];

export const Slide1_Intro: React.FC = () => {
    const [activeSchool, setActiveSchool] = useState<string | null>(null);
    const { language } = useLanguage();
    const t = {
        en: {
            explain: `
- Machine Learning isn't just one thing; it has 4 major historical "tribes".
- Each tribe has a different central belief about what "Intelligence" is.
- **Hover over the cards** to see their core philosophies.
`
        },
        zh: {
            explain: `
- 机器学习并非单一流派；它有 4 个历史上的主要“部落”。
- 每个部落对“智能”有不同的核心信念。
- **悬停卡片**查看它们的核心理念。
`
        },
    };

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="grid grid-cols-2 gap-4 h-full p-4 w-full">
                    {schools.map((school) => (
                        <div
                            key={school.id}
                            className={`relative flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform 
                  ${activeSchool === school.id ? 'scale-105 shadow-lg ' + school.color : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}
                `}
                            onMouseEnter={() => setActiveSchool(school.id)}
                            onMouseLeave={() => setActiveSchool(null)}
                        >
                            <school.icon size={64} strokeWidth={1.5} className="mb-4" />
                            <h3 className="text-xl font-bold mb-2">{school.name[language]}</h3>

                            {/* Reveal content on hover */}
                            <div className={`text-center transition-opacity duration-300 ${activeSchool === school.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                                <p className="font-semibold mb-1">{school.philosophy[language]}</p>
                                <p className="text-sm opacity-80">{school.keywords[language]}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ConceptStage>
            <ExplainPanel>
                {t[language].explain}
            </ExplainPanel>
        </div>
    );
};
