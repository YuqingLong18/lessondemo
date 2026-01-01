import React, { useState } from 'react';
import { Bot, User, MoveLeft, Factory, Cog, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { useLanguage } from '../../components/core/LanguageContext';

export const Module3_Backprop: React.FC = () => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0); // 0: The Test, 1: The Reaction, 2: Interactive Blame Game, 3: Success

    // Blame Game State
    const [blameStep, setBlameStep] = useState(0); // 0: Start, 1: Click Output, 2: Click Middle, 3: Click Knob

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
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
                                    PROCESSING...
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
                                OUTPUT: A SQUIRREL
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
                                ? '我又犯错了。但我的机器里有50个不同的旋钮！哪一个是罪魁祸首？'
                                : 'I\'m still making mistakes. But my machine has 50 different knobs inside! Which one screwed up?'}
                        </p>
                        <button onClick={() => setStep(2)} className="btn-primary flex items-center gap-2">
                            {language === 'zh' ? '打开机器 (反向传播)' : 'Open Machine (Backpropagation)'} <Factory size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Panel 3: The Blame Game (Interactive) */}
            {step === 2 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-slate-800 p-8 min-h-[400px] border-b border-slate-700 relative">
                        {/* Title */}
                        <div className="absolute top-4 left-4 text-white/50 font-mono text-sm">
                            {language === 'zh' ? '内部视图: 责备游戏' : 'INTERNAL VIEW: THE BLAME GAME'}
                        </div>

                        <div className="flex items-center justify-between h-full pt-10 px-4 relative">
                            {/* Connection Lines */}
                            <div className="absolute top-1/2 left-[15%] w-[35%] h-1 bg-slate-600 -z-0"></div>
                            <div className="absolute top-1/2 right-[15%] w-[35%] h-1 bg-slate-600 -z-0"></div>

                            {/* 1. Input Guy (Static) */}
                            <div className="flex flex-col items-center z-10 opacity-50">
                                <div className="bg-slate-200 p-4 rounded-full border-4 border-slate-400">
                                    <User size={32} className="text-slate-600" />
                                </div>
                                <div className="mt-2 text-slate-400 text-xs font-mono">INPUT</div>
                            </div>

                            {/* 2. Middle Manager (Hidden Layer) */}
                            <div className="flex flex-col items-center z-10 relative">
                                <button
                                    disabled={blameStep !== 2}
                                    onClick={() => setBlameStep(3)}
                                    className={`p-6 rounded-full border-4 transition-all duration-300 ${blameStep === 2
                                        ? 'bg-yellow-100 border-yellow-400 scale-110 animate-bounce cursor-pointer shadow-[0_0_30px_rgba(250,204,21,0.5)]'
                                        : blameStep > 2
                                            ? 'bg-red-100 border-red-500'
                                            : 'bg-slate-200 border-slate-400'
                                        }`}
                                >
                                    <span className="text-3xl">👔</span>
                                </button>
                                <div className="mt-2 text-slate-300 text-xs font-mono font-bold bg-slate-900 px-2 py-1 rounded">
                                    {language === 'zh' ? '中层经理' : 'MIDDLE MGR'}
                                </div>
                                { /* Knob A attached to Manager */}
                                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                                    <button
                                        disabled={blameStep !== 3}
                                        onClick={() => {
                                            setBlameStep(4);
                                            setTimeout(() => setStep(3), 2000);
                                        }}
                                        className={`transition-all duration-300 ${blameStep === 3
                                            ? 'scale-125 cursor-pointer hover:rotate-12'
                                            : ''
                                            }`}
                                    >
                                        <div className={`p-2 rounded-full border-2 ${blameStep >= 3 ? 'bg-orange-100 border-orange-500' : 'bg-slate-300 border-slate-500'}`}>
                                            <Cog size={24} className={`text-slate-700 ${blameStep === 4 ? 'animate-spin' : ''}`} />
                                        </div>
                                        <div className="text-center text-[10px] text-white mt-1">Knob A</div>
                                        {blameStep === 3 && (
                                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-orange-500 text-white text-xs px-2 py-1 rounded animate-bounce">
                                                {language === 'zh' ? '点击调整!' : 'Click to Tweak!'}
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* 3. Output Goblin (Output Layer) */}
                            <div className="flex flex-col items-center z-10">
                                <button
                                    disabled={blameStep !== 0} // Initially clickable
                                    onClick={() => setBlameStep(1)}
                                    className={`p-6 rounded-full border-4 transition-all duration-300 ${blameStep === 0
                                        ? 'bg-red-100 border-red-500 scale-110 animate-pulse cursor-pointer shadow-[0_0_30px_rgba(220,38,38,0.5)]'
                                        : 'bg-slate-200 border-slate-400'
                                        }`}
                                >
                                    <span className="text-3xl">👹</span>
                                </button>
                                <div className="mt-2 text-slate-300 text-xs font-mono font-bold bg-slate-900 px-2 py-1 rounded">
                                    {language === 'zh' ? '输出地精' : 'OUTPUT GOBLIN'}
                                </div>
                                {blameStep === 0 && (
                                    <div className="absolute -top-12 right-0 bg-white text-red-600 px-4 py-2 rounded-xl shadow-lg border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                                        {language === 'zh' ? '从这里开始! ->' : 'Start Here! ->'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dialogue Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur text-white p-4 rounded-xl border border-white/10 min-h-[80px] flex items-center">
                            {blameStep === 0 && (
                                <p>{language === 'zh' ? '点击输出地精来询问它是谁的错。' : 'Click the Output Goblin to ask who is responsible.'}</p>
                            )}
                            {blameStep === 1 && (
                                <div className="flex items-center gap-4 w-full">
                                    <span className="text-3xl">👹</span>
                                    <div>
                                        <p className="font-bold text-red-400 text-sm mb-1">{language === 'zh' ? '输出地精:' : 'OUTPUT GOBLIN:'}</p>
                                        <p>{language === 'zh' ? '“别看我！中层经理告诉我它有毛茸茸的尾巴，所以我猜是松鼠！是他的错！”' : '"Don\'t look at me! The Middle Manager told me it had a fluffy tail, so I guessed Squirrel! It\'s his fault!"'}</p>
                                        <button onClick={() => setBlameStep(2)} className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded flex items-center gap-1">
                                            <MoveLeft size={12} /> {language === 'zh' ? '把责任推回去' : 'Pass Blame Back'}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {blameStep === 2 && (
                                <p>{language === 'zh' ? '网络计算出误差并向后传递。现在点击中层经理！' : 'The network calculates output error and passes it backward. Now Click the Middle Manager!'}</p>
                            )}
                            {blameStep === 3 && (
                                <div className="flex items-center gap-4 w-full">
                                    <span className="text-3xl">👔</span>
                                    <div>
                                        <p className="font-bold text-yellow-400 text-sm mb-1">{language === 'zh' ? '中层经理:' : 'MIDDLE MANAGER:'}</p>
                                        <p>{language === 'zh' ? '“好吧！我可能把旋钮A调得太高了。如果我们稍微调低一点...”' : '"Okay! I might have turned Knob A too high. If we tweet it down just a bit..."'}</p>
                                    </div>
                                </div>
                            )}
                            {blameStep === 4 && (
                                <div className="flex items-center gap-4 w-full justify-center text-green-400 font-bold">
                                    <CheckCircle2 /> {language === 'zh' ? '调整已应用！' : 'TWEAK APPLIED!'}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{language === 'zh' ? '责备游戏 (反向传播)' : 'The Blame Game (Backpropagation)'}</h3>
                        <p className="text-gray-600">
                            {language === 'zh'
                                ? '这就是反向传播。我们从错误开始（输出），通过连接向后传递“责备”，找出谁贡献了多少错误，并使用梯度下降稍微调整它们。'
                                : 'This is Backpropagation. We start at the mistake (Output) and pass the "blame" backward through the connections, figuring out how much each part contributed to the error, and tweaking them just a tiny bit.'}
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
                                ? '成千上万次微小的调整后，Widget实际上可能会认出一只狗。这并不神奇，这只是数学和大量的责备。'
                                : 'Millions of tiny tweaks later, Widget might actually recognize a dog. It\'s not magic, it\'s just math, and a whole lot of blame.'}
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => { setStep(0); setBlameStep(0); }}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all flex items-center gap-2"
                            >
                                <Zap size={18} />
                                {language === 'zh' ? '再次演示' : 'Run Demo Again'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
