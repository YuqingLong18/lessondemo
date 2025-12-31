import React, { useState, useEffect, useCallback } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { RefreshCw, Play, Users, Trophy, Dna, Sparkles } from 'lucide-react';
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

const POPULATION_SIZE = 50;
const ELITE_COUNT = 5;
const PARENT_POOL = 10;
const DISPLAY_COUNT = 20;

const Slide5Content: React.FC = () => {
    const [population, setPopulation] = useState<Gene[]>([]);
    const [generation, setGeneration] = useState(0);
    const [mutationRate, setMutationRate] = useState(0.3);

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
        const initialPop: Gene[] = Array.from({ length: POPULATION_SIZE }).map(() => ({
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
        // Elitism: Keep top survivors
        const newPop = population.slice(0, ELITE_COUNT);

        // Fill rest by crossover/mutation
        while (newPop.length < POPULATION_SIZE) {
            // Select parents (tournament or top)
            const parentA = population[Math.floor(Math.random() * PARENT_POOL)]; // Pick from top pool
            const parentB = population[Math.floor(Math.random() * PARENT_POOL)];

            if (!parentA || !parentB) break; // Safety check

            // Crossover
            const child = {
                a: (parentA.a + parentB.a) / 2,
                b: (parentA.b + parentB.b) / 2,
                fitness: 0
            };

            // Mutation
            if (Math.random() < mutationRate) child.a += (Math.random() - 0.5) * 0.2;
            if (Math.random() < mutationRate) child.b += (Math.random() - 0.5) * 0.2;

            newPop.push(child);
        }

        evaluate(newPop);
        setPopulation(newPop);
        setGeneration(g => g + 1);
    }, [population, evaluate, mutationRate]);

    const bestGene = population[0] || { a: 0, b: 0, fitness: 0 };
    const elite = population.slice(0, ELITE_COUNT);
    const mutationPercent = Math.round(mutationRate * 100);
    const maxFitness = elite[0]?.fitness || 1;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex w-full h-full items-center justify-center gap-8 px-6">
                    <div className="flex flex-col items-center">
                        {/* Visualization */}
                        <div className="relative w-80 h-80 bg-white border-2 border-gray-300">
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
                                {/* Population lines (top elites are brighter) */}
                                {population.slice(0, DISPLAY_COUNT).map((gene, i) => {
                                    const isElite = i < ELITE_COUNT;
                                    return (
                                        <line
                                            key={i}
                                            x1="0%" y1={`${(1 - (gene.a * 0 + gene.b)) * 100}%`}
                                            x2="100%" y2={`${(1 - (gene.a * 1 + gene.b)) * 100}%`}
                                            stroke={isElite ? "#f59e0b" : "#9ca3af"}
                                            strokeWidth={isElite ? 2 : 1}
                                            opacity={isElite ? 0.35 : 0.12}
                                        />
                                    );
                                })}

                                {/* Best Curve (Bold) */}
                                <line
                                    x1="0%" y1={`${(1 - (bestGene.a * 0 + bestGene.b)) * 100}%`}
                                    x2="100%" y2={`${(1 - (bestGene.a * 1 + bestGene.b)) * 100}%`}
                                    stroke="#16a34a"
                                    strokeWidth="4"
                                />
                            </svg>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-600 mt-3">
                            <LegendDot colorClass="bg-gray-400" label="Rejected" />
                            <LegendDot colorClass="bg-amber-400" label={`Survivors (${ELITE_COUNT})`} />
                            <LegendDot colorClass="bg-green-600" label="Best fit" />
                        </div>

                        <div className="text-center font-mono mt-3 mb-4">
                            Generation: {generation} <br />
                            Best Fitness: {bestGene.fitness.toFixed(2)}
                        </div>

                        <div className="flex items-end gap-4">
                            <button
                                onClick={evolve}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 active:scale-95 transition-transform"
                            >
                                <Play size={20} fill="currentColor" />
                                Evolve Next Generation
                            </button>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="mutation-rate" className="text-xs text-gray-600">
                                    Mutation rate
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="mutation-rate"
                                        type="range"
                                        min={0}
                                        max={0.6}
                                        step={0.05}
                                        value={mutationRate}
                                        onChange={(e) => setMutationRate(Number(e.target.value))}
                                        className="w-28"
                                    />
                                    <span className="text-xs font-mono w-10 text-right">{mutationPercent}%</span>
                                </div>
                            </div>

                            <button
                                onClick={reset}
                                className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
                                aria-label="Reset population"
                            >
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="w-60 flex flex-col gap-3">
                        <div className="text-[11px] uppercase tracking-widest text-gray-500">Evolution Loop</div>
                        <div className="flex flex-col gap-2">
                            <StepCard
                                icon={<Users size={16} className="text-gray-600" />}
                                title="Population"
                                description={`${POPULATION_SIZE} random solutions`}
                                tone="bg-gray-50 border-gray-200"
                            />
                            <StepCard
                                icon={<Trophy size={16} className="text-amber-600" />}
                                title="Selection"
                                description={`Top ${ELITE_COUNT} survive`}
                                tone="bg-amber-50 border-amber-200"
                            />
                            <StepCard
                                icon={<Dna size={16} className="text-emerald-600" />}
                                title="Crossover"
                                description="Parents blend a + b"
                                tone="bg-emerald-50 border-emerald-200"
                            />
                            <StepCard
                                icon={<Sparkles size={16} className="text-green-600" />}
                                title="Mutation"
                                description={`${mutationPercent}% chance of tweak`}
                                tone="bg-green-50 border-green-200"
                            />
                        </div>

                        <div className="p-3 border rounded-lg bg-white">
                            <div className="text-xs font-semibold text-gray-700 mb-2">Survivor fitness</div>
                            <div className="flex flex-col gap-2">
                                {elite.map((gene, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <span className="w-5 text-[10px] text-gray-500">#{i + 1}</span>
                                        <div className="flex-1 h-2 bg-gray-100 rounded">
                                            <div
                                                className="h-2 bg-amber-400 rounded"
                                                style={{ width: `${Math.max(6, (gene.fitness / maxFitness) * 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>
                {`
- **Evolutionary** means _population → selection → variation → new generation_.
- Gold lines are the **survivors**; the bold green line is the **current best**.
- Crossover blends parents; mutation adds small random tweaks.
- **Interact**: Click "Evolve" or adjust mutation to see how diversity changes.
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

const LegendDot: React.FC<{ colorClass: string; label: string }> = ({ colorClass, label }) => (
    <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${colorClass}`} />
        <span>{label}</span>
    </div>
);

const StepCard: React.FC<{ icon: React.ReactNode; title: string; description: string; tone: string }> = ({
    icon,
    title,
    description,
    tone,
}) => (
    <div className={`flex items-center gap-3 p-2 border rounded-lg ${tone}`}>
        <div className="shrink-0">{icon}</div>
        <div>
            <div className="text-sm font-semibold text-gray-800">{title}</div>
            <div className="text-xs text-gray-600">{description}</div>
        </div>
    </div>
);
