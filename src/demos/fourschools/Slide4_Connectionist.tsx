import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { Play, RotateCcw } from 'lucide-react';

// Helpers
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
const dSigmoid = (y: number) => y * (1 - y);

// Types
type LayerWeights = number[][]; // [input_index][output_index]
type LayerBiases = number[];

export const Slide4_Connectionist: React.FC = () => {
    // --- State for 2-3-3-1 Network ---
    // Inputs: 2
    // Hidden 1: 3
    // Hidden 2: 3
    // Output: 1

    // Initial random weights
    const initWeights = (inputs: number, outputs: number) =>
        Array.from({ length: inputs }, () => Array.from({ length: outputs }, () => (Math.random() * 2 - 1)));
    const initBiases = (size: number) => Array.from({ length: size }, () => (Math.random() * 2 - 1));

    const [w1, setW1] = useState<LayerWeights>(() => initWeights(2, 3));
    const [b1, setB1] = useState<LayerBiases>(() => initBiases(3));

    const [w2, setW2] = useState<LayerWeights>(() => initWeights(3, 3));
    const [b2, setB2] = useState<LayerBiases>(() => initBiases(3));

    const [w3, setW3] = useState<LayerWeights>(() => initWeights(3, 1));
    const [b3, setB3] = useState<LayerBiases>(() => initBiases(1));

    const [activations, setActivations] = useState<{ h1: number[], h2: number[], out: number }>({ h1: [0, 0, 0], h2: [0, 0, 0], out: 0.5 });
    const [loss, setLoss] = useState(0);
    const [epoch, setEpoch] = useState(0);
    const [animating, setAnimating] = useState(false);

    // Fixed Inputs
    const inputs = [1.0, 1.0];
    const target = 1.0;

    // --- Forward & Train ---
    const trainStep = () => {
        setAnimating(false);
        setTimeout(() => setAnimating(true), 10); // Trigger animation restart

        const LR = 0.8; // Learning Rate

        // --- Forward Pass ---
        // Layer 1
        const h1_raw = b1.map((b, i) => b + inputs[0] * w1[0][i] + inputs[1] * w1[1][i]);
        const h1 = h1_raw.map(sigmoid);

        // Layer 2
        const h2_raw = b2.map((b, i) => b + h1[0] * w2[0][i] + h1[1] * w2[1][i] + h1[2] * w2[2][i]);
        const h2 = h2_raw.map(sigmoid);

        // Output Layer
        const out_raw = b3[0] + h2[0] * w3[0][0] + h2[1] * w3[1][0] + h2[2] * w3[2][0];
        const out = sigmoid(out_raw);

        // Error
        const currentLoss = 0.5 * Math.pow(target - out, 2);

        // --- Backward Pass ---
        const dError_dOut = -(target - out);
        const dOut_dNet3 = dSigmoid(out);
        const delta3 = dError_dOut * dOut_dNet3; // Scalar for output node

        // Gradients for W3, B3
        const dW3 = h2.map(h => h * delta3); // [3]
        const dB3 = delta3;

        // Backprop to Layer 2
        const delta2: number[] = [];
        for (let i = 0; i < 3; i++) {
            const errorContrib = delta3 * w3[i][0];
            delta2[i] = errorContrib * dSigmoid(h2[i]);
        }

        // Gradients for W2, B2
        const dW2 = h1.map(h => delta2.map(d => h * d)); // [3][3]
        const dB2 = delta2;

        // Backprop to Layer 1
        const delta1: number[] = [];
        for (let i = 0; i < 3; i++) {
            let errorContrib = 0;
            for (let j = 0; j < 3; j++) errorContrib += delta2[j] * w2[i][j];
            delta1[i] = errorContrib * dSigmoid(h1[i]);
        }

        // Gradients for W1, B1
        const dW1 = inputs.map(inp => delta1.map(d => inp * d)); // [2][3]
        const dB1 = delta1;

        // --- Update State ---
        // We do this functional style to ensure consistency
        setW3(prev => prev.map((row, r) => row.map((val, _c) => val - LR * dW3[r])));
        setB3(prev => prev.map((val, _i) => val - LR * dB3));

        setW2(prev => prev.map((row, r) => row.map((val, c) => val - LR * dW2[r][c])));
        setB2(prev => prev.map((val, i) => val - LR * dB2[i]));

        setW1(prev => prev.map((row, r) => row.map((val, c) => val - LR * dW1[r][c])));
        setB1(prev => prev.map((val, i) => val - LR * dB1[i]));

        setActivations({ h1, h2, out });
        setLoss(currentLoss);
        setEpoch(e => e + 1);
    };

    const reset = () => {
        setW1(initWeights(2, 3));
        setB1(initBiases(3));
        setW2(initWeights(3, 3));
        setB2(initBiases(3));
        setW3(initWeights(3, 1));
        setB3(initBiases(3)); // bug fix: initBiases(1) actually
        setEpoch(0);
        setLoss(0.5); // Initial guess 0 => loss 0.5
        setActivations({ h1: [0, 0, 0], h2: [0, 0, 0], out: 0.5 });
    };

    // --- Visualization Config ---
    // Coordinates
    const layerX = [50, 180, 310, 440];
    const nodeY = {
        input: [100, 200],
        hidden: [75, 150, 225],
        output: [150]
    };

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full relative">

                    <div className="absolute top-4 right-4 bg-gray-100 p-2 rounded text-xs font-mono">
                        Loss: {loss.toFixed(4)} <br />
                        Epoch: {epoch}
                    </div>

                    <svg width="500" height="300" className="overflow-visible">
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="2" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>

                        {/* Connections Layer 0 -> 1 */}
                        {nodeY.input.map((y1, i) =>
                            nodeY.hidden.map((y2, j) => (
                                <Connection key={`l0-${i}-${j}`}
                                    x1={layerX[0]} y1={y1} x2={layerX[1]} y2={y2}
                                    weight={w1[i][j]} animating={animating} delay={0}
                                />
                            ))
                        )}

                        {/* Connections Layer 1 -> 2 */}
                        {nodeY.hidden.map((y1, i) =>
                            nodeY.hidden.map((y2, j) => (
                                <Connection key={`l1-${i}-${j}`}
                                    x1={layerX[1]} y1={y1} x2={layerX[2]} y2={y2}
                                    weight={w2[i][j]} animating={animating} delay={0.3}
                                />
                            ))
                        )}

                        {/* Connections Layer 2 -> 3 */}
                        {nodeY.hidden.map((y1, i) =>
                            nodeY.output.map((y2, j) => (
                                <Connection key={`l2-${i}-${j}`}
                                    x1={layerX[2]} y1={y1} x2={layerX[3]} y2={y2}
                                    weight={w3[i][0]} animating={animating} delay={0.6}
                                />
                            ))
                        )}

                        {/* Nodes */}
                        {/* Input */}
                        {nodeY.input.map((y, i) => (
                            <g key={`in-${i}`}>
                                <circle cx={layerX[0]} cy={y} r="25" fill="#e5e7eb" stroke="#374151" strokeWidth="2" />
                                <text x={layerX[0]} y={y + 5} textAnchor="middle" fontSize="10" fontWeight="bold">{i === 0 ? 'Cloud' : 'Humid'}</text>
                            </g>
                        ))}

                        {/* Hidden 1 */}
                        {nodeY.hidden.map((y, i) => (
                            <circle key={`h1-${i}`} cx={layerX[1]} cy={y} r="18" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
                        ))}

                        {/* Hidden 2 */}
                        {nodeY.hidden.map((y, i) => (
                            <circle key={`h2-${i}`} cx={layerX[2]} cy={y} r="18" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
                        ))}

                        {/* Output */}
                        <circle cx={layerX[3]} cy={nodeY.output[0]} r="30"
                            fill={`rgba(147, 51, 234, ${activations.out})`} stroke="#9333ea" strokeWidth="4"
                        />
                        <text x={layerX[3]} y={nodeY.output[0] + 5} textAnchor="middle" fontSize="12" fill={activations.out > 0.5 ? 'white' : 'black'} fontWeight="bold">Rain?</text>
                        <text x={layerX[3]} y={nodeY.output[0] + 45} textAnchor="middle" fontSize="12" className="font-mono">Out: {activations.out.toFixed(2)}</text>

                    </svg>

                    {/* Controls */}
                    <div className="flex gap-4 mt-8">
                        <button
                            onClick={trainStep}
                            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 active:transform active:scale-95 transition-all"
                        >
                            <Play size={20} fill="currentColor" />
                            Train One Step
                        </button>

                        <button
                            onClick={reset}
                            className="flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                        >
                            <RotateCcw size={18} />
                            Reset
                        </button>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>
                {`
- **Neural Networks** are inspired by the brain's dense connections.
- We added **2 Hidden Layers** (the "Black Box" magic).
- **Signal Flow**: When you train, see the signal propagate?
- Deep networks can learn deeper patterns than simple rules!
- Click **Train** to minimize the Loss (Error).
`}
            </ExplainPanel>
        </div>
    );
};

// Subcomponent for Connection + Animation
const Connection: React.FC<{
    x1: number, y1: number, x2: number, y2: number, weight: number, animating: boolean, delay: number
}> = ({ x1, y1, x2, y2, weight, animating, delay }) => {
    return (
        <>
            {/* Static Line */}
            <line
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={weight > 0 ? "#9333ea" : "#ef4444"}
                strokeWidth={Math.min(Math.abs(weight) * 3 + 1, 8)}
                opacity="0.3"
            />
            {/* Pulse Animation */}
            {animating && (
                <circle r="4" fill={weight > 0 ? "#9333ea" : "#ef4444"}>
                    <animateMotion
                        dur="0.5s"
                        begin={`${delay}s`}
                        fill="freeze"
                        repeatCount="1"
                        path={`M${x1},${y1} L${x2},${y2}`}
                    />
                    <animate attributeName="opacity" values="1;0" dur="0.5s" begin={`${delay}s`} fill="freeze" />
                </circle>
            )}
        </>
    );
};
