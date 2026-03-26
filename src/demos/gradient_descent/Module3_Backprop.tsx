import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Factory, Cog, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../components/core/LanguageContext';

export const Module3_Backprop: React.FC = () => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0); // 0: The Test, 1: The Reaction, 2: Interactive Blame Game, 3: Success

    // Blame Game State
    // 0: Start (Click Output)
    // 1: Click Layer 2 (Hidden 2)
    // 2: Click Layer 1 (Hidden 1)
    // 3: Finished
    const [blameStep, setBlameStep] = useState(0);

    // Helper to draw lines
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, [step]); // Re-measure when step changes (container might appear)

    // Calculate node positions
    // Returns an array of layers, each containing an array of node coordinates {x, y}
    const getNodePositions = () => {
        if (dimensions.width === 0) return [];

        const layerCounts = [2, 3, 3, 1]; // Input, H1, H2, Output
        const colWidth = dimensions.width / 4;

        return layerCounts.map((count, layerIdx) => {
            const x = (layerIdx * colWidth) + (colWidth / 2);
            return Array.from({ length: count }).map((_, nodeIdx) => {
                // Distribute vertically: (i + 1) * (H / (N + 1))
                // This puts 2 items at 1/3 and 2/3 of height
                const y = (nodeIdx + 1) * (dimensions.height / (count + 1));
                return { x, y };
            });
        });
    };

    const nodePositions = getNodePositions();

    const getConnections = () => {
        if (nodePositions.length === 0) return [];
        const lines: React.ReactNode[] = [];

        // Loop through layers that have a next layer (0 to 2)
        for (let l = 0; l < 3; l++) {
            const currentLayer = nodePositions[l];
            const nextLayer = nodePositions[l + 1];

            currentLayer.forEach((startNode, i) => {
                nextLayer.forEach((endNode, j) => {
                    let isActive = false;
                    // Logic for highlighting based on Blame Step
                    // Blame Cycle: Output(3) -> H2(2) -> H1(1)

                    // Connection L2->Output (Layer 2 to 3)
                    if (l === 2) {
                        isActive = blameStep >= 1; // Highlight when output blames H2
                    }
                    // Connection H1->H2 (Layer 1 to 2)
                    else if (l === 1) {
                        isActive = blameStep >= 2; // Highlight when H2 blames H1
                    }

                    lines.push(
                        <line
                            key={`l${l}-${i}-${j}`}
                            x1={startNode.x}
                            y1={startNode.y}
                            x2={endNode.x}
                            y2={endNode.y}
                            stroke={isActive ? (l === 2 ? "rgba(220, 38, 38, 0.8)" : "rgba(250, 204, 21, 0.8)") : "rgba(148, 163, 184, 0.2)"}
                            strokeWidth={isActive ? "3" : "1"}
                            className={`transition-all duration-500`}
                        />
                    );
                });
            });
        }
        return lines;
    };


    return (
        <div className="max-w-5xl mx-auto p-4 space-y-6">
            {/* Progress Bar */}
            <div className="flex justify-center gap-2 mb-8">
                {[0, 1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={`h-2 w-12 rounded-full transition-all duration-300 ${s <= step ? 'bg-purple-600' : 'bg-gray-200'
                            }`}
                    />
                ))}
            </div>

            {/* Panel 1: The Test */}
            {step === 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-gray-50 p-8 flex items-center justify-center h-64 border-b border-gray-100">
                        <div className="flex items-center gap-8">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 transform -rotate-3">
                                <span className="text-6xl">🐶</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <Bot size={100} className="text-blue-600" />
                                <div className="mt-4 bg-gray-800 text-green-400 px-4 py-2 rounded-lg font-mono text-sm border-2 border-gray-600">
                                    {language === 'zh' ? '处理中...' : 'PROCESSING...'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{language === 'zh' ? '测试时间' : 'The Test'}</h3>
                        <p className="text-gray-600 mb-6">{language === 'zh' ? 'Widget站在他的机器旁。有人举起了一张狗的照片。' : 'Widget stands next to his machine. Someone holds up a picture of a DOG.'}</p>
                        <button onClick={() => setStep(1)} className="btn-primary flex items-center gap-2">
                            {language === 'zh' ? '运行机器' : 'Run Machine'} <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Panel 2: The Reaction */}
            {step === 1 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-red-50 p-8 flex items-center justify-center h-64 border-b border-red-100 relative">
                        <div className="flex flex-col items-center z-10">
                            <Bot size={100} className="text-blue-600 animate-pulse" />
                            <div className="mt-4 bg-black text-red-500 px-6 py-3 rounded-lg font-mono text-xl border-2 border-red-400 shadow-lg animate-bounce">
                                {language === 'zh' ? '输出: 松鼠' : 'OUTPUT: A SQUIRREL'}
                            </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-red-600 text-red-600 font-black text-6xl px-8 py-4 rounded-xl rotate-12 opacity-80 mix-blend-multiply">
                            {language === 'zh' ? '错误' : 'WRONG!'}
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{language === 'zh' ? 'Widget: "该死的！"' : 'Widget: "Darn it!"'}</h3>
                        <p className="text-gray-600 mb-6">
                            {language === 'zh'
                                ? '我又犯错了。但我的神经网络很复杂！哪一层出了问题？'
                                : 'I\'m still making mistakes. But my neural network is complex! Which part screwed up?'}
                        </p>
                        <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">
                            {language === 'zh' ? '责备游戏 (反向传播)' : 'The Blame Game (Backpropagation)'} <Factory size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Panel 3: The Blame Network (Interactive) */}
            {step === 2 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-slate-900 p-8 min-h-[500px] border-b border-slate-700 relative flex flex-col">
                        {/* Header */}
                        <div className="text-white/50 font-mono text-sm mb-4 flex justify-between items-center">
                            <span>{language === 'zh' ? '神经网络内部视图' : 'NEURAL NETWORK: INTERNAL VIEW'}</span>
                            <div className="flex gap-4 text-xs">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                    <span>{language === 'zh' ? '输入' : 'Input'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-yellow-100"></div>
                                    <span>{language === 'zh' ? '隐藏层 1' : 'Hidden 1'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-orange-100"></div>
                                    <span>{language === 'zh' ? '隐藏层 2' : 'Hidden 2'}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 rounded-full bg-red-100"></div>
                                    <span>{language === 'zh' ? '输出' : 'Output'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Network Area */}
                        <div className="flex-1 relative" ref={containerRef}>
                            {/* SVG Connections Overlay */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                {getConnections()}
                            </svg>

                            {/* Render Nodes using absolute positioning */}
                            {nodePositions.length > 0 && (
                                <>
                                    {/* Input Layer (Layer 0) */}
                                    {nodePositions[0].map((pos, i) => (
                                        <div
                                            key={`input-${i}`}
                                            className="absolute w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center border-2 border-slate-400 shadow-[0_0_15px_rgba(255,255,255,0.1)] opacity-60"
                                            style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                                        >
                                            <User size={20} className="text-slate-700" />
                                        </div>
                                    ))}

                                    {/* Hidden Layer 1 (Layer 1) */}
                                    {nodePositions[1].map((pos, i) => (
                                        <button
                                            key={`h1-${i}`}
                                            disabled={blameStep !== 2}
                                            onClick={() => setBlameStep(3)}
                                            className={`absolute transition-all duration-300 w-14 h-14 rounded-full flex items-center justify-center border-4
                                                ${blameStep === 2
                                                    ? 'bg-yellow-100 border-yellow-400 scale-125 cursor-pointer z-50 animate-bounce shadow-[0_0_30px_rgba(250,204,21,0.6)]'
                                                    : 'bg-yellow-50 border-yellow-200 opacity-80'}`}
                                            style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                                        >
                                            <Cog size={24} className={`text-yellow-700 ${blameStep === 2 ? 'animate-spin' : ''}`} />
                                            {blameStep === 2 && i === 1 && (
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                                                    {language === 'zh' ? '点击调整!' : 'Click to Tweak!'}
                                                </div>
                                            )}
                                        </button>
                                    ))}

                                    {/* Hidden Layer 2 (Layer 2) */}
                                    {nodePositions[2].map((pos, i) => (
                                        <button
                                            key={`h2-${i}`}
                                            disabled={blameStep !== 1}
                                            onClick={() => setBlameStep(2)}
                                            className={`absolute transition-all duration-300 w-14 h-14 rounded-full flex items-center justify-center border-4
                                                ${blameStep === 1
                                                    ? 'bg-orange-100 border-orange-400 scale-125 cursor-pointer z-50 animate-bounce shadow-[0_0_30px_rgba(251,146,60,0.6)]'
                                                    : 'bg-orange-50 border-orange-200 opacity-80'}`}
                                            style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                                        >
                                            <Cog size={24} className={`text-orange-700 ${blameStep === 1 || blameStep === 2 ? 'animate-spin' : ''}`} />
                                            {blameStep === 1 && i === 1 && (
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-orange-400 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                                                    {language === 'zh' ? '那是谁的错？' : 'Whose fault?'}
                                                </div>
                                            )}
                                        </button>
                                    ))}

                                    {/* Output Layer (Layer 3) */}
                                    {nodePositions[3].map((pos, i) => (
                                        <button
                                            key={`output-${i}`}
                                            disabled={blameStep !== 0}
                                            onClick={() => setBlameStep(1)}
                                            className={`absolute transition-all duration-300 w-20 h-20 rounded-full flex items-center justify-center border-4
                                                ${blameStep === 0
                                                    ? 'bg-red-100 border-red-500 scale-110 cursor-pointer animate-pulse shadow-[0_0_40px_rgba(239,68,68,0.5)]'
                                                    : 'bg-red-50 border-red-200'}`}
                                            style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                                        >
                                            <span className="text-4xl">👹</span>
                                            {blameStep === 0 && (
                                                <div className="absolute -left-32 top-1/2 -translate-y-1/2 bg-white text-red-600 px-3 py-1 rounded-lg text-xs font-bold animate-bounce hidden md:block">
                                                    {language === 'zh' ? '从这里开始' : 'Start Here'} -&gt;
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </>
                            )}
                        </div>

                        {/* Dialogue/Instruction Overlay */}
                        <div className="mt-8 bg-slate-800 border border-slate-600 rounded-xl p-4 min-h-[100px] flex items-center shadow-inner">
                            {blameStep === 0 && (
                                <div className="flex gap-4 items-center animate-in fade-in slide-in-from-left-2">
                                    <span className="text-3xl">👈</span>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{language === 'zh' ? '第一步：输出' : 'Step 1: The Output'}</h4>
                                        <p className="text-slate-300 text-sm">
                                            {language === 'zh'
                                                ? '我们从错误的结尾开始。点击**输出地精**，问它是怎么搞砸的！'
                                                : 'We start at the end, where the mistake happened. Click the **Output Goblin** to ask how he messed up!'}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {blameStep === 1 && (
                                <div className="flex gap-4 items-center animate-in fade-in slide-in-from-left-2">
                                    <span className="text-3xl">🤬</span>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{language === 'zh' ? '第二步：传递责备' : 'Step 2: Pass the Blame'}</h4>
                                        <p className="text-slate-300 text-sm mb-2">
                                            {language === 'zh'
                                                ? '地精责怪他的老板（隐藏层2）。看！连接亮起了红色。'
                                                : 'The Goblin blames his bosses (Hidden Layer 2). Look! The connections glow red.'}
                                        </p>
                                        <p className="text-orange-300 text-sm font-bold">
                                            {language === 'zh' ? '点击闪烁的橙色节点来质问经理们！' : 'Click the bouncing ORANGE nodes to interrogate the managers!'}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {blameStep === 2 && (
                                <div className="flex gap-4 items-center animate-in fade-in slide-in-from-left-2">
                                    <span className="text-3xl">🔧</span>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{language === 'zh' ? '第三步：调整与更深层的责备' : 'Step 3: Tweak & Blame Deeper'}</h4>
                                        <p className="text-slate-300 text-sm mb-2">
                                            {language === 'zh'
                                                ? '隐藏层2的经理们稍微调整了他们的旋钮，但他们也责怪他们的下属（隐藏层1）。'
                                                : 'Hidden Layer 2 managers tweak their knobs a bit, but they also blame their underlings (Hidden Layer 1).'}
                                        </p>
                                        <p className="text-yellow-300 text-sm font-bold">
                                            {language === 'zh' ? '点击闪烁的黄色节点来修复最后一层！' : 'Click the bouncing YELLOW nodes to fix the last layer!'}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {blameStep === 3 && (
                                <div className="flex gap-4 items-center animate-in fade-in slide-in-from-left-2">
                                    <CheckCircle2 size={32} className="text-green-400" />
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{language === 'zh' ? '完成！' : 'Done!'}</h4>
                                        <p className="text-slate-300 text-sm mb-2">
                                            {language === 'zh'
                                                ? '所有的层都已经被轻微调整了。这就是每一次训练迭代中发生的事情！'
                                                : 'All layers have been tweaked slightly. This happens millions of times during training!'}
                                        </p>
                                        <button
                                            onClick={() => setStep(3)}
                                            className="mt-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm transition-all animate-bounce flex items-center gap-2"
                                        >
                                            {language === 'zh' ? 'Widget的团队吸取了教训。我们正在变得更好！' : "Widget's team learns about its mistakes. We are getting better!"}
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{language === 'zh' ? '责备游戏 (反向传播)' : 'The Blame Game (Backpropagation)'}</h3>
                        <p className="text-gray-600">
                            {language === 'zh'
                                ? '在一个真实的神经网络中，我们有很多层。反向传播就像多米诺骨牌一样——所有的责备从输出端一直向后传递到输入端，每个人都稍微调整一点点自己的责任。'
                                : 'In a real neural network, we have many layers. Backpropagation is like dominoes—the blame gets passed all the way back from Output to Input, and everyone fixes their own small part of the mess.'}
                        </p>
                    </div>
                </div>
            )}

            {/* Final Summary */}
            {step === 3 && (
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg text-white overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                    <div className="p-12 text-center">
                        <div className="bg-white/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm animate-pulse">
                            <Bot size={48} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">
                            {language === 'zh' ? 'Widget正在学习!' : 'Widget is Learning!'}
                        </h2>
                        <p className="text-lg text-green-100 max-w-2xl mx-auto leading-relaxed mb-8">
                            {language === 'zh'
                                ? '成千上万次微小的调整后，Widget实际上可能会认出一只狗。这并不神奇，这只是数学和大量的责备。如果你用更多的例子去教Widget，Widget甚至可以认出成千上万种动物、甚至是你！'
                                : 'Millions of tiny tweaks later, Widget might actually recognize a dog. It\'s not magic, it\'s just math, and a whole lot of blame. If you teach Widget with more examples, it can even recognize thousands of animals, or even YOU!'}
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setStep(4)}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all flex items-center gap-2"
                            >
                                <RefreshCw size={18} />
                                {language === 'zh' ? '看看Widget最后都学会了什么' : 'See what Widget learned'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 4: What Widget Learned (Bonus Scene) */}
            {step === 4 && <FinalShowcase onReset={() => { setStep(0); setBlameStep(0); }} />}
        </div>
    );
};

// Sub-component for the final animation sequence
const FinalShowcase: React.FC<{ onReset: () => void }> = ({ onReset }) => {
    const { language } = useLanguage();
    const [scene, setScene] = useState(0); // 0: Dog, 1: Cat, 2: You
    const [bubbleFlash, setBubbleFlash] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setScene(1), 3000);
        const timer2 = setTimeout(() => setScene(2), 6000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    useEffect(() => {
        const flashOnTimer = window.setTimeout(() => setBubbleFlash(true), 0);
        const flashOffTimer = window.setTimeout(() => setBubbleFlash(false), 500);
        return () => {
            window.clearTimeout(flashOnTimer);
            window.clearTimeout(flashOffTimer);
        };
    }, [scene]);

    const getLeftContent = () => {
        if (scene === 0) return <span className="text-6xl animate-bounce">🐶</span>;
        if (scene === 1) return <span className="text-6xl animate-bounce">🐱</span>;
        return (
            <div className="text-center animate-pulse">
                <span className="text-4xl">❓</span>
                <p className="font-bold text-slate-700 mt-2">{language === 'zh' ? '谁是最好的学习者？' : "Who's the best learner?"}</p>
            </div>
        );
    };

    const getRightContent = () => {
        if (scene === 0) return language === 'zh' ? '小狗！' : 'DOG!';
        if (scene === 1) return language === 'zh' ? '小猫！' : 'CAT!';
        return language === 'zh' ? '是你，我的朋友！' : 'You, my friend!';
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 h-[400px] flex flex-col">
            <div className="flex-1 flex items-center justify-center gap-12 p-8">
                {/* Left Side (Input) */}
                <div key={scene} className="w-48 h-48 bg-slate-50 rounded-2xl border-2 border-slate-200 flex flex-col items-center justify-center animate-in slide-in-from-left-8 fade-in duration-500">
                    {getLeftContent()}
                </div>

                {/* Arrow */}
                <div className="text-slate-300">
                    <ChevronRight size={48} />
                </div>

                {/* Center (Widget) */}
                <div className="flex flex-col items-center z-10">
                    <Bot size={80} className="text-blue-600 mb-4" />
                    <div className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-mono">
                        {language === 'zh' ? 'WIDGET 2.0版' : 'WIDGET v2.0'}
                    </div>
                </div>

                {/* Right Side (Output) */}
                <div
                    key={`out-${scene}`}
                    className={`relative z-20 transition-all duration-300 ${bubbleFlash ? 'scale-105 ring-4 ring-blue-200/70 shadow-[0_0_0_6px_rgba(59,130,246,0.12)]' : 'scale-100'}`}
                >
                    <div className="bg-blue-600 text-white text-xl font-bold px-6 py-4 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-xl relative">
                        {getRightContent()}
                        <div className="absolute -bottom-2 right-0 w-4 h-4 bg-blue-600 rotate-45 transform translate-y-2"></div>
                    </div>
                </div>
            </div>

            {/* Footer / Reset */}
            <div className="bg-slate-50 p-6 flex justify-center border-t border-slate-100">
                {scene === 2 && (
                    <button
                        onClick={onReset}
                        className="btn-primary animate-in fade-in zoom-in duration-500"
                    >
                        {language === 'zh' ? '再次演示' : 'Run Demo Again'}
                    </button>
                )}
            </div>
        </div>
    );
};
