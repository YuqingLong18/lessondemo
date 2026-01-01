import React, { useState } from 'react';
import { Bot, Mountain, AlertCircle, CheckCircle2, CloudFog, ArrowDownRight, RefreshCw, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../components/core/LanguageContext';

export const Module1_HotOrCold: React.FC = () => {
    const { language } = useLanguage();
    const [step, setStep] = useState(0); // 0-2: Intro Panels, 3: Game, 4: Success
    const [gameFeedback, setGameFeedback] = useState<{ type: 'error' | 'success' | null, message: string }>({ type: null, message: '' });

    const nextStep = () => setStep(prev => prev + 1);

    const handleGameChoice = (choice: 'A' | 'B' | 'C') => {
        if (choice === 'A') {
            setGameFeedback({
                type: 'error',
                message: language === 'zh' ? 'Widget向山上跑去，掉进了一个更深的错误裂缝中。坏主意。再试一次。' : 'Widget ran uphill and fell into a deeper crevice of wrongness. Bad idea. Try again.'
            });
        } else if (choice === 'B') {
            setGameFeedback({
                type: 'error',
                message: language === 'zh' ? '错误之山不怜悯弱者。再试一次。' : 'The Mountain of Mistakes does not pity the weak. Try again.'
            });
        } else {
            setGameFeedback({
                type: 'success',
                message: language === 'zh' ? '聪明！你看不到整座山，但你知道此时此刻“下坡”的感觉。这种倾斜的感觉就是**梯度**。' : 'Smart! You can’t see the whole mountain, but you know what "downhill" feels like right where you are. This feeling of steepness is called the **GRADIENT**.'
            });
            setTimeout(() => {
                setStep(4);
            }, 2500);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">

            {/* Progress Bar of sorts */}
            <div className="flex justify-center gap-2 mb-8">
                {[0, 1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`h-2 w-12 rounded-full transition-all duration-300 ${s <= step ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                    />
                ))}
            </div>

            {/* Panel 1: Widget's Pride */}
            {step === 0 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-blue-50 p-8 flex items-center justify-center h-64 border-b border-blue-100">
                        <div className="flex items-end gap-4">
                            <Bot size={120} className="text-blue-600" />
                            <div className="bg-gray-800 text-green-400 p-4 rounded-xl border-4 border-gray-600 shadow-xl w-48 font-mono text-sm">
                                <div className="border-b border-gray-600 mb-2 pb-1 text-xs text-gray-400">CAT-IDENTIFIER 3000</div>
                                <div className="flex justify-between mb-2">
                                    <span>KNOB A</span>
                                    <span className="text-white">|||</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>KNOB B</span>
                                    <span className="text-white">||||||</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{language === 'zh' ? 'Widget: "看！我的神经网络完成了！"' : 'Widget: "Behold! My neural net is complete."'}</h3>
                        <p className="text-gray-600 mb-6">{language === 'zh' ? '准备迎接完美吧。' : 'Prepare for flawlessness.'}</p>
                        <button onClick={nextStep} className="btn-primary flex items-center gap-2">
                            {language === 'zh' ? '测试它' : 'Test it out'} <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Panel 2: The Failure */}
            {step === 1 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-red-50 p-8 flex items-center justify-center h-64 border-b border-red-100 relative">
                        <div className="absolute top-4 right-4 bg-white p-2 rounded-lg shadow-sm transform rotate-6 border border-gray-200">
                            <span className="text-4xl">🐱</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Bot size={120} className="text-blue-600 animate-pulse" />
                            <div className="mt-4 bg-black text-red-500 px-6 py-3 rounded-lg font-mono text-xl border-2 border-red-400 shadow-lg animate-bounce">
                                OUTPUT: TOASTER OVEN
                            </div>
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{language === 'zh' ? 'Widget: "...搞砸了。"' : 'Widget: "... Nailed it."'}</h3>
                        <p className="text-gray-600 mb-6">{language === 'zh' ? '机器冒烟了，Widget看起来很困惑。' : 'The machine whirs, smokes, and gives a terrible answer.'}</p>
                        <button onClick={nextStep} className="btn-primary flex items-center gap-2">
                            {language === 'zh' ? '发生了什么？' : 'Zoom Out'} <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Panel 3: The Mountain of Mistakes */}
            {step === 2 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-gray-900 p-8 flex items-center justify-center h-80 border-b border-gray-800 relative overflow-hidden">
                        {/* Background Mountain */}
                        <Mountain size={400} className="absolute -bottom-20 text-gray-800" strokeWidth={1} />
                        {/* Garbage items */}
                        <div className="absolute bottom-10 left-20 text-3xl opacity-30">❌</div>
                        <div className="absolute bottom-40 right-20 text-3xl opacity-30">🗑️</div>
                        <div className="absolute top-20 left-1/3 text-3xl opacity-30">⚠️</div>

                        {/* Widget at Peak */}
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
                            <Bot size={60} className="text-white mb-2" />
                            <div className="bg-white/10 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                                {language === 'zh' ? '高处不胜寒' : 'Peak of Wrongness'}
                            </div>
                        </div>

                        {/* Valley Label */}
                        <div className="absolute bottom-4 w-full text-center text-green-400 font-bold opacity-50">
                            {language === 'zh' ? '正确答案之谷 (误差=0)' : 'Valley of Right Answers (Error = 0)'}
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{language === 'zh' ? '错误之山' : 'The Mountain of Mistakes'}</h3>
                        <p className="text-gray-600 mb-6">
                            {language === 'zh'
                                ? 'Widget错了。大错特错。Widget越错，他站在错误之山上的位置就越高。到正确答案之谷还有很长的路要走。'
                                : 'Widget is wrong. Very wrong. The more wrong Widget is, the higher up the Mountain of Mistakes he stands. It’s a long way down to the Valley of Right answers.'}
                        </p>
                        <button onClick={nextStep} className="btn-primary flex items-center gap-2">
                            {language === 'zh' ? '开始下山' : 'Start Descent'} <ArrowDownRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Interactive: The Foggy Descent */}
            {step === 3 && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-gray-300 p-8 flex items-center justify-center h-80 border-b border-gray-200 relative">
                        {/* Fog Effect */}
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8">
                            <CloudFog size={80} className="text-gray-400 mb-4" />
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {language === 'zh' ? '大雾弥漫' : 'The Foggy Descent'}
                            </h2>
                            <p className="text-gray-600 max-w-md">
                                {language === 'zh'
                                    ? 'Widget需要下山，但他看不见谷底！他怎么知道往哪边走？'
                                    : 'Widget needs to get down the mountain, but he can\'t see the bottom! How does he know which way to go?'}
                            </p>
                        </div>

                        {/* Widget feet visible at bottom */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0">
                            <Bot size={150} className="text-gray-500 translate-y-10" />
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50">
                        {gameFeedback.type === 'error' && (
                            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                                <AlertCircle className="shrink-0 mt-0.5" />
                                <div>{gameFeedback.message}</div>
                            </div>
                        )}
                        {gameFeedback.type === 'success' && (
                            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
                                <CheckCircle2 className="shrink-0 mt-0.5" />
                                <div>{gameFeedback.message}</div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => handleGameChoice('A')}
                                className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-red-400 hover:bg-red-50 transition-all text-left group"
                            >
                                <div className="font-bold text-gray-800 mb-1 group-hover:text-red-600">
                                    {language === 'zh' ? 'A. 随便乱跑！' : 'A. Just sprint blindly!'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {language === 'zh' ? '不仅是盲目的，而且很快。' : 'Fast, but dangerous.'}
                                </div>
                            </button>

                            <button
                                onClick={() => handleGameChoice('B')}
                                className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left group"
                            >
                                <div className="font-bold text-gray-800 mb-1 group-hover:text-blue-600">
                                    {language === 'zh' ? 'B. 坐下来哭油泪。' : 'B. Sit down and cry oil tears.'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {language === 'zh' ? '放弃不是选择。' : 'Giving up is not an option.'}
                                </div>
                            </button>

                            <button
                                onClick={() => handleGameChoice('C')}
                                className="p-4 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all text-left group"
                            >
                                <div className="font-bold text-gray-800 mb-1 group-hover:text-green-600">
                                    {language === 'zh' ? 'C. 用脚趾感受坡度。' : 'C. Feel the slope with your toe.'}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {language === 'zh' ? '找到向下的路。' : 'Find the downhill direction.'}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Final Summary */}
            {step === 4 && (
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg text-white overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                    <div className="p-12 text-center">
                        <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                            <ArrowDownRight size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">
                            {language === 'zh' ? '梯度下降 = "冷热"游戏' : 'Gradient Descent is just "Hot or Cold"'}
                        </h2>
                        <p className="text-lg text-indigo-100 max-w-2xl mx-auto leading-relaxed mb-8">
                            {language === 'zh'
                                ? '你不知道答案在哪里，你只知道下一步是便暖（下坡）还是变冷（上坡）。你迈出一步，再次检查坡度，重复直到到达谷底。'
                                : 'You don’t know where the answer is, you just know if your next step is getting warmer (downhill) or colder (uphill). You take a step, check the slope again, and repeat until you hit the bottom.'}
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setStep(0)}
                                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-all flex items-center gap-2"
                            >
                                <RefreshCw size={18} />
                                {language === 'zh' ? '重玩' : 'Replay Module'}
                            </button>
                            <div className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold shadow-lg">
                                {language === 'zh' ? '下一模块：学习率' : 'Next Up: Learning Rate'}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
