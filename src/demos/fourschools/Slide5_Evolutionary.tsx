import React, { useState, useEffect, useCallback } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { RefreshCw, Play } from 'lucide-react';
import { ErrorBoundary } from '../../components/core/ErrorBoundary';

// Simple Genetic Algorithm to fit a curve y = ax + b
// Target: Fit the points (0.2, 0.3), (0.5, 0.6), (0.8, 0.9) -> y = x + 0.1 approximately
// A "Gene" is { a, b }

interface Gene {
    a: number; // Slope
    b: number; // Intercept
    fitness: number;
}

const TARGET_POINTS = [
    { x: 0.2, y: 0.3 },
    { x: 0.5, y: 0.6 },
    { x: 0.8, y: 0.9 },
];

const Slide5Content: React.FC = () => {
    const [population, setPopulation] = useState<Gene[]>([]);
    const [generation, setGeneration] = useState(0);

    const evaluate = useCallback((pop: Gene[]) => {
        pop.forEach(ind => {
            let error = 0;
            TARGET_POINTS.forEach(p => {
                const yPred = ind.a * p.x + ind.b;
                // Avoid NaN
                if (isNaN(yPred)) error += 1000;
                else error += Math.pow(yPred - p.y, 2);
            });
            ind.fitness = 1 / (error + 0.0001); // Higher fitness = lower error
        });
        // Sort by fitness desc
        pop.sort((x, y) => y.fitness - x.fitness);
    }, []);

    const reset = useCallback(() => {
        const initialPop: Gene[] = Array.from({ length: 50 }).map(() => ({
            a: (Math.random() * 4) - 2, // Random slope -2 to 2
            b: (Math.random() * 2) - 1, // Random intercept -1 to 1
            fitness: 0
        }));
        evaluate(initialPop);
        setPopulation(initialPop);
        setGeneration(0);
    }, [evaluate]);

    // Initialize
    useEffect(() => {
        reset();
    }, [reset]);

    const evolve = useCallback(() => {
        // Elitism: Keep top 5
        const newPop = population.slice(0, 5);

        // Fill rest by crossover/mutation
        while (newPop.length < 50) {
            // Select parents (tournament or top)
            const parentA = population[Math.floor(Math.random() * 10)]; // Pick from top 10
            const parentB = population[Math.floor(Math.random() * 10)];

            if (!parentA || !parentB) break; // Safety check

            // Crossover
            const child = {
                a: (parentA.a + parentB.a) / 2,
                b: (parentA.b + parentB.b) / 2,
                fitness: 0
            };

            // Mutation
            if (Math.random() < 0.3) child.a += (Math.random() - 0.5) * 0.2;
            if (Math.random() < 0.3) child.b += (Math.random() - 0.5) * 0.2;

            newPop.push(child);
        }

        evaluate(newPop);
        setPopulation(newPop);
        setGeneration(g => g + 1);
    }, [population, evaluate]);

    const bestGene = population[0] || { a: 0, b: 0 };

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full">

                    {/* Visualization */}
                    <div className="relative w-80 h-80 bg-white border-2 border-gray-300 mb-6">
                        {/* Grid lines */}
                        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 divide-x divide-y divide-gray-100 pointer-events-none"></div>

                        {/* Target Points */}
                        {TARGET_POINTS.map((p, i) => (
                            <div
                                key={i}
                                className="absolute w-3 h-3 bg-red-500 rounded-full"
                                style={{ left: `${p.x * 100}%`, bottom: `${p.y * 100}%`, transform: 'translate(-50%, 50%)' }}
                            />
                        ))}

                        {/* Population Curves (Rendered in ONE SVG) */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                            {/* Faint lines for population */}
                            {population.slice(0, 20).map((gene, i) => (
                                <line
                                    key={i}
                                    x1="0%" y1={`${(1 - (gene.a * 0 + gene.b)) * 100}%`}
                                    x2="100%" y2={`${(1 - (gene.a * 1 + gene.b)) * 100}%`}
                                    stroke="green"
                                    strokeWidth="1"
                                    opacity="0.1"
                                />
                            ))}

                            {/* Best Curve (Bold) */}
                            <line
                                x1="0%" y1={`${(1 - (bestGene.a * 0 + bestGene.b)) * 100}%`}
                                x2="100%" y2={`${(1 - (bestGene.a * 1 + bestGene.b)) * 100}%`}
                                stroke="green"
                                strokeWidth="4"
                            />
                        </svg>
                    </div>

                    <div className="text-center font-mono mb-6">
                        Generation: {generation} <br />
                        Best Fitness: {bestGene.fitness.toFixed(2)}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={evolve}
                            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 active:scale-95 transition-transform"
                        >
                            <Play size={20} fill="currentColor" />
                            Evolve Next Generation
                        </button>
                        <button
                            onClick={reset}
                            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                            <RefreshCw size={20} />
                        </button>
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>
                {`
- **The Evolutionary School** solves problems by trial and error.
- "Survival of the Fittest": We generate 50 random solutions.
- The bad ones die. The good ones "breed" (swap parameters) and "mutate".
- **Interact**: Click "Evolve". Watch the chaotic lines (the population) converge onto the red dots (the solution) without any calculus!
`}
            </ExplainPanel>
        </div>
    );
};

export const Slide5_Evolutionary: React.FC = () => (
    <ErrorBoundary>
        <Slide5Content />
    </ErrorBoundary>
);
