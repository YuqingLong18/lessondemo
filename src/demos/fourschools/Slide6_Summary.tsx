import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';

export const Slide6_Summary: React.FC = () => {
    const [highlight, setHighlight] = useState<string | null>(null);
    const { language } = useLanguage();

    const t = {
        en: {
            title: 'School Comparison',
            criterion: 'Criterion',
            schools: {
                symbolic: 'Symbolic',
                bayesian: 'Bayesian',
                connectionist: 'Connectionist',
            },
            criteria: {
                knowledge: 'Knowledge Reliance',
                data: 'Data Reliance',
                learnability: 'Learnability',
                interpretability: 'Interpretability',
            },
            levels: {
                high: 'High',
                medium: 'Medium',
                low: 'Low',
            },
            integration: {
                title: 'Integration (The Future):',
                body: (
                    <>
                        Modern AI combines these. For example,
                        <em> Bayesian Neural Networks</em> combine uncertainty (Bayesian) with learning (Connectionist).
                        <em> Knowledge Graphs + LLMs</em> combine logic (Symbolic) with language (Connectionist).
                    </>
                ),
            },
            explain: `
- **Symbolic**: Great at Logic, bad at Learning. (Clear, but rigid).
- **Connectionist**: Great at Learning, bad at Explaining. (Powerful, but "Black Box").
- **Bayesian**: The middle ground, managing Uncertainty.
- **Evolutionary**: The universal optimizer when we don't have a model.
- **No Free Lunch**: No single method is best for everything. We must choose the right tool!
`
        },
        zh: {
            title: '学派对比',
            criterion: '维度',
            schools: {
                symbolic: '符号主义',
                bayesian: '贝叶斯',
                connectionist: '连接主义',
            },
            criteria: {
                knowledge: '知识依赖',
                data: '数据依赖',
                learnability: '可学习性',
                interpretability: '可解释性',
            },
            levels: {
                high: '高',
                medium: '中',
                low: '低',
            },
            integration: {
                title: '融合（未来）：',
                body: (
                    <>
                        现代 AI 会将这些方法结合起来。例如，
                        <em> 贝叶斯神经网络</em>结合不确定性（贝叶斯）与学习（连接主义）。
                        <em> 知识图谱 + LLM</em>结合逻辑（符号主义）与语言（连接主义）。
                    </>
                ),
            },
            explain: `
- **符号主义**：擅长逻辑，不擅长学习。（清晰但僵硬）
- **连接主义**：擅长学习，不擅长解释。（强大但“黑箱”）
- **贝叶斯**：居中，管理不确定性。
- **进化主义**：当我们没有模型时的通用优化器。
- **无免费午餐**：没有一种方法能最好地解决所有问题。必须选对工具。
`
        },
    };
    const text = t[language];

    const data = [
        { crit: text.criteria.knowledge, sym: 'high', bay: 'medium', con: 'low' },
        { crit: text.criteria.data, sym: 'low', bay: 'medium', con: 'high' },
        { crit: text.criteria.learnability, sym: 'low', bay: 'medium', con: 'high' },
        { crit: text.criteria.interpretability, sym: 'high', bay: 'medium', con: 'low' }
    ];

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full p-8">
                    <h2 className="text-2xl font-bold mb-6">{text.title}</h2>

                    <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="p-4 font-bold text-gray-700">{text.criterion}</th>
                                    <th className="p-4 font-bold text-blue-700">{text.schools.symbolic}</th>
                                    <th className="p-4 font-bold text-orange-700">{text.schools.bayesian}</th>
                                    <th className="p-4 font-bold text-purple-700">{text.schools.connectionist}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => {
                                    const getCellClass = (val: string, defaultClass: string) => {
                                        if (val === 'high') return 'p-4 font-bold text-green-600';
                                        if (val === 'low') return 'p-4 font-bold text-red-700';
                                        return `p-4 font-medium ${defaultClass}`;
                                    };

                                    return (
                                        <tr
                                            key={i}
                                            className={`border-b border-gray-100 cursor-pointer transition-colors ${highlight === row.crit ? 'bg-yellow-50' : 'hover:bg-gray-50'}`}
                                            onMouseEnter={() => setHighlight(row.crit)}
                                            onMouseLeave={() => setHighlight(null)}
                                        >
                                            <td className="p-4 font-bold text-gray-600">{row.crit}</td>
                                            <td className={getCellClass(row.sym, 'text-blue-600')}>{text.levels[row.sym as keyof typeof text.levels]}</td>
                                            <td className={getCellClass(row.bay, 'text-orange-600')}>{text.levels[row.bay as keyof typeof text.levels]}</td>
                                            <td className={getCellClass(row.con, 'text-purple-600')}>{text.levels[row.con as keyof typeof text.levels]}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 max-w-2xl">
                        <strong>{text.integration.title}</strong> {text.integration.body}
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>
                {text.explain}
            </ExplainPanel>
        </div>
    );
};
