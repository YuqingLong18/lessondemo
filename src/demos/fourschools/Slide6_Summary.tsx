import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';

export const Slide6_Summary: React.FC = () => {
    const [highlight, setHighlight] = useState<string | null>(null);

    const data = [
        { crit: "Knowledge Reliance", sym: "High", bay: "Medium", con: "Low" },
        { crit: "Data Reliance", sym: "Low", bay: "Medium", con: "High" },
        { crit: "Learnability", sym: "Low", bay: "Medium", con: "High" },
        { crit: "Interpretability", sym: "High", bay: "Medium", con: "Low" }
    ];

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full p-8">
                    <h2 className="text-2xl font-bold mb-6">School Comparison</h2>

                    <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 border-b border-gray-300">
                                    <th className="p-4 font-bold text-gray-700">Criterion</th>
                                    <th className="p-4 font-bold text-blue-700">Symbolic</th>
                                    <th className="p-4 font-bold text-orange-700">Bayesian</th>
                                    <th className="p-4 font-bold text-purple-700">Connectionist</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => {
                                    const getCellClass = (val: string, defaultClass: string) => {
                                        if (val === 'High') return 'p-4 font-bold text-green-600';
                                        if (val === 'Low') return 'p-4 font-bold text-red-700';
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
                                            <td className={getCellClass(row.sym, 'text-blue-600')}>{row.sym}</td>
                                            <td className={getCellClass(row.bay, 'text-orange-600')}>{row.bay}</td>
                                            <td className={getCellClass(row.con, 'text-purple-600')}>{row.con}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 max-w-2xl">
                        <strong>Integration (The Future):</strong> Modern AI combines these. For example,
                        <em> Bayesian Neural Networks</em> combine uncertainty (Bayesian) with learning (Connectionist).
                        <em> Knowledge Graphs + LLMs</em> combine logic (Symbolic) with language (Connectionist).
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>
                {`
- **Symbolic**: Great at Logic, bad at Learning. (Clear, but rigid).
- **Connectionist**: Great at Learning, bad at Explaining. (Powerful, but "Black Box").
- **Bayesian**: The middle ground, managing Uncertainty.
- **Evolutionary**: The universal optimizer when we don't have a model.
- **No Free Lunch**: No single method is best for everything. We must choose the right tool!
`}
            </ExplainPanel>
        </div>
    );
};
