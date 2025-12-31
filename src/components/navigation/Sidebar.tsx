import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrainCircuit, Activity, Zap, Layers } from 'lucide-react';
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
            </nav>

            <div className="p-4 border-t border-gray-100">
                <div className="px-4 py-3 text-xs text-gray-400 text-center">
                    © 2025 ML Lessons
                </div>
            </div>
        </div>
    );
};
