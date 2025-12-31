import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { Binary, Network, Dna, Scale } from 'lucide-react';

const schools = [
    {
        id: 'symbolic',
        name: 'Symbolic School',
        icon: Binary,
        color: 'bg-blue-100 border-blue-500 text-blue-700',
        philosophy: "Intelligence is manipulating symbols (Logic & Rules).",
        keywords: "Logic, Rules, Knowledge Graphs"
    },
    {
        id: 'bayesian',
        name: 'Bayesian School',
        icon: Scale, // Representing weighing probabilities
        color: 'bg-orange-100 border-orange-500 text-orange-700',
        philosophy: "Intelligence is managing uncertainty (Probability).",
        keywords: "Probability, Uncertainty, Inference"
    },
    {
        id: 'connectionist',
        name: 'Connectionist School',
        icon: Network,
        color: 'bg-purple-100 border-purple-500 text-purple-700',
        philosophy: "Intelligence is networking simple units (The Brain).",
        keywords: "Neural Networks, Deep Learning, Backprop"
    },
    {
        id: 'evolutionary',
        name: 'Evolutionary School',
        icon: Dna,
        color: 'bg-green-100 border-green-500 text-green-700',
        philosophy: "Intelligence is evolving solutions (Natural Selection).",
        keywords: "Genetic Algos, Evolution, Optimization"
    }
];

export const Slide1_Intro: React.FC = () => {
    const [activeSchool, setActiveSchool] = useState<string | null>(null);

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
                            <h3 className="text-xl font-bold mb-2">{school.name}</h3>

                            {/* Reveal content on hover */}
                            <div className={`text-center transition-opacity duration-300 ${activeSchool === school.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                                <p className="font-semibold mb-1">{school.philosophy}</p>
                                <p className="text-sm opacity-80">{school.keywords}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ConceptStage>
            <ExplainPanel>
                {`
- Machine Learning isn't just one thing; it has 4 major historical "tribes".
- Each tribe has a different central belief about what "Intelligence" is.
- **Hover over the cards** to see their core philosophies.
`}
            </ExplainPanel>
        </div>
    );
};
