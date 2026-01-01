import React, { useState } from 'react';
import { Module1_HotOrCold } from '../demos/gradient_descent/Module1_HotOrCold';
import { Module2_LearningRate } from '../demos/gradient_descent/Module2_LearningRate';
import { Module3_Backprop } from '../demos/gradient_descent/Module3_Backprop';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../components/core/LanguageContext';

export const GradientDescentLesson: React.FC = () => {
    const [currentModule, setCurrentModule] = useState(1);
    const { language } = useLanguage();

    const modules = [
        { id: 1, title: language === 'zh' ? '热与冷 (梯度)' : 'Hot or Cold (Gradient)', component: <Module1_HotOrCold /> },
        { id: 2, title: language === 'zh' ? '学习率' : 'Learning Rate', component: <Module2_LearningRate /> },
        { id: 3, title: language === 'zh' ? '反向传播' : 'Backpropagation', component: <Module3_Backprop /> },
    ];

    const handleNext = () => {
        if (currentModule < modules.length) {
            setCurrentModule(currentModule + 1);
        }
    };

    const handlePrev = () => {
        if (currentModule > 1) {
            setCurrentModule(currentModule - 1);
        }
    };

    return (
        <div className="h-full flex flex-col bg-white overflow-hidden">
            {/* Header */}
            <div className="shrink-0 h-16 border-b flex items-center justify-between px-6 bg-white z-10">
                <h1 className="text-xl font-bold text-gray-800">
                    {language === 'zh' ? 'Widget与错误之山' : 'Widget vs. The Mountain of Mistakes'}
                </h1>

                <div className="flex bg-gray-100 p-1 rounded-lg">
                    {modules.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setCurrentModule(m.id)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${currentModule === m.id
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {m.id}. {m.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="glass-panel m-6 min-h-[calc(100vh-10rem)]">
                    {modules[currentModule - 1].component}
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="shrink-0 h-20 border-t bg-gray-50 flex items-center justify-between px-8">
                <button
                    onClick={handlePrev}
                    disabled={currentModule === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentModule === 1
                            ? 'opacity-0 cursor-default'
                            : 'bg-white border hover:bg-gray-50 text-gray-700 shadow-sm'
                        }`}
                >
                    <ChevronLeft size={20} />
                    {language === 'zh' ? '上一章' : 'Previous'}
                </button>

                <button
                    onClick={handleNext}
                    disabled={currentModule === modules.length}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${currentModule === modules.length
                            ? 'opacity-0 cursor-default'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                        }`}
                >
                    {language === 'zh' ? '下一章' : 'Next'}
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};
