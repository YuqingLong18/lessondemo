import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrainCircuit, Activity, Zap, Layers, BookOpen, Workflow, TrendingDown, Cpu, MessageSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '../core/LanguageContext';

export const Sidebar: React.FC = () => {
    const { language } = useLanguage();

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col shrink-0 transition-all duration-300">
            <div className="p-6">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ML Lessons
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <NavLink
                    to="/knowledge-learning"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-indigo-100 rounded-lg group-[.active]:bg-indigo-200">
                        <BookOpen size={20} className="text-indigo-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? '知识到学习' : 'Knowledge → Learning'}
                    </span>
                </NavLink>

                <NavLink
                    to="/ml-workflow"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-sky-50 text-sky-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-sky-100 rounded-lg group-[.active]:bg-sky-200">
                        <Workflow size={20} className="text-sky-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? '机器学习基础流程' : 'Basic Workflow of Machine Learning'}
                    </span>
                </NavLink>

                <NavLink
                    to="/fourschools"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-green-50 text-green-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-green-100 rounded-lg group-[.active]:bg-green-200">
                        <Layers size={20} className="text-green-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? '四大流派' : 'The Four Schools'}
                    </span>
                </NavLink>


                <NavLink
                    to="/neuron"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-amber-50 text-amber-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-amber-100 rounded-lg group-[.active]:bg-amber-200">
                        <Zap size={20} className="text-amber-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? '人工神经元' : 'Artificial Neuron'}
                    </span>
                </NavLink>

                <NavLink
                    to="/gradient-descent"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-rose-50 text-rose-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-rose-100 rounded-lg group-[.active]:bg-rose-200">
                        <TrendingDown size={20} className="text-rose-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? '梯度下降' : 'Gradient Descent'}
                    </span>
                </NavLink>

                <NavLink
                    to="/cnn"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-blue-50 text-blue-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-blue-100 rounded-lg group-[.active]:bg-blue-200">
                        <BrainCircuit size={20} className="text-blue-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? '卷积神经网络' : 'CNN'}
                    </span>
                </NavLink>

                <NavLink
                    to="/rnn"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-purple-50 text-purple-600 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-purple-100 rounded-lg group-[.active]:bg-purple-200">
                        <Activity size={20} className="text-purple-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? '循环神经网络' : 'RNN'}
                    </span>
                </NavLink>

                <NavLink
                    to="/learning-to-generating"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-emerald-100 rounded-lg group-[.active]:bg-emerald-200">
                        <Sparkles size={20} className="text-emerald-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? 'From Learning to Generating' : 'From Learning to Generating'}
                    </span>
                </NavLink>

                <NavLink
                    to="/language-models"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-orange-50 text-orange-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-orange-100 rounded-lg group-[.active]:bg-orange-200">
                        <MessageSquare size={20} className="text-orange-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? '语言模型' : 'Language Models'}
                    </span>
                </NavLink>

                <NavLink
                    to="/transformer"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                            ? 'bg-teal-50 text-teal-700 shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`
                    }
                >
                    <div className="p-2 bg-teal-100 rounded-lg group-[.active]:bg-teal-200">
                        <Cpu size={20} className="text-teal-600" />
                    </div>
                    <span className="font-medium">
                        {language === 'zh' ? 'Transformer 架构' : 'The Transformer Architecture'}
                    </span>
                </NavLink>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="px-4 py-3 text-xs text-gray-400 text-center">
                    © 2025 ML Lessons
                </div>
            </div>
        </div>
    );
};
