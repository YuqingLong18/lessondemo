import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { Cloud, Droplets } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export const Slide3_Bayesian: React.FC = () => {
    const [cloudiness, setCloudiness] = useState(50);
    const [humidity, setHumidity] = useState(50);

    // Bayesian / Probabilistic Model from the text
    // P(rain) = sigmoid(a*cloud + b*humidity + c)
    // Let's pick arbitrary params to make it feel right
    const calculateProbability = (c: number, h: number) => {
        // Normalize inputs to 0-1 range for calculation
        const normC = c / 100;
        const normH = h / 100;

        // Weights (a=5, b=5, c=-5 to bias towards center)
        const logit = (5 * normC) + (5 * normH) - 5;
        const prob = 1 / (1 + Math.exp(-logit));
        return prob;
    };

    const probRain = calculateProbability(cloudiness, humidity);
    const percentRain = (probRain * 100).toFixed(1);

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center h-full w-full px-8">

                    {/* Network Visualization */}
                    <div className="relative w-full max-w-lg mb-8">
                        {/* Nodes */}
                        <div className="flex justify-between mb-12">
                            <div className="flex flex-col items-center">
                                <Cloud size={48} className="text-gray-500 mb-2" />
                                <span className="font-bold">Cloud Cover</span>
                                <input
                                    type="range" min="0" max="100" value={cloudiness}
                                    onChange={(e) => setCloudiness(Number(e.target.value))}
                                    className="mt-2 w-32 cursor-pointer"
                                />
                                <span className="text-sm">{cloudiness}%</span>
                            </div>

                            <div className="flex flex-col items-center">
                                <Droplets size={48} className="text-blue-500 mb-2" />
                                <span className="font-bold">Humidity</span>
                                <input
                                    type="range" min="0" max="100" value={humidity}
                                    onChange={(e) => setHumidity(Number(e.target.value))}
                                    className="mt-2 w-32 cursor-pointer"
                                />
                                <span className="text-sm">{humidity}%</span>
                            </div>
                        </div>

                        {/* Arrows */}
                        <svg className="absolute top-16 left-0 w-full h-32 pointer-events-none -z-10">
                            <line x1="20%" y1="0" x2="50%" y2="100%" stroke="#cbd5e1" strokeWidth="4" />
                            <line x1="80%" y1="0" x2="50%" y2="100%" stroke="#cbd5e1" strokeWidth="4" />
                        </svg>

                        {/* Target Node */}
                        <div className="flex justify-center mt-4">
                            <div className="flex flex-col items-center p-6 bg-white border-4 border-orange-400 rounded-full shadow-lg z-10 w-48">
                                <span className="text-gray-500 text-sm font-bold uppercase mb-1">P(Rain | Evidence)</span>
                                <span className="text-4xl font-bold text-orange-600">{percentRain}%</span>
                            </div>
                        </div>
                    </div>

                    {/* Probability Meter Visualization */}
                    <div className="w-full max-w-md bg-gray-200 rounded-full h-6 overflow-hidden border border-gray-300">
                        <div
                            className="h-full bg-gradient-to-r from-blue-300 to-blue-600 transition-all duration-300"
                            style={{ width: `${percentRain}%` }}
                        />
                    </div>
                    <div className="mt-2 text-sm text-gray-500 font-mono">
                        <ReactMarkdown rehypePlugins={[rehypeKatex]}>
                            {"Model: $$P = \\sigma(w_1 \\cdot Cloud + w_2 \\cdot Humid + bias)$$"}
                        </ReactMarkdown>
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>
                {`
- **The Bayesian School** views the world as uncertain.
- Nothing is certainly "True" or "False" (like the Symbolists thought). Everything is a 0% to 100% chance.
- **Interact**: Move the evidence sliders. See how our **belief** (probability) updates smoothly?
- We update our beliefs based on new evidence.
`}
            </ExplainPanel>
        </div>
    );
};
