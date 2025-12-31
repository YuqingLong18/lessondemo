import React from 'react';
import { useLanguage } from '../components/core/LanguageContext';

export const RNNLesson: React.FC = () => {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-lg">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                    {language === 'zh' ? '循环神经网络' : 'Recurrent Neural Networks'}
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                    {language === 'zh'
                        ? '本课程正在开发中。敬请期待！'
                        : 'This lesson is currently under development. Stay tuned!'}
                </p>
                <div className="animate-bounce text-4xl">
                    🚧
                </div>
            </div>
        </div>
    );
};
