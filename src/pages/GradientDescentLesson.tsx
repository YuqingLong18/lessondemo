import React from 'react';
import { SlideDeck } from '../components/core/SlideDeck';
import { Module1_HotOrCold } from '../demos/gradient_descent/Module1_HotOrCold';
import { Module2_LearningRate } from '../demos/gradient_descent/Module2_LearningRate';
import { Module3_Backprop } from '../demos/gradient_descent/Module3_Backprop';

const slides = [
    {
        title: { zh: '梯度下降', en: 'Gradient Descent' },
        subConcept: { zh: '冷热游戏', en: 'Hot or Cold' },
        component: Module1_HotOrCold,
    },
    {
        title: { zh: '梯度下降', en: 'Gradient Descent' },
        subConcept: { zh: '学习率', en: 'Learning Rate' },
        component: Module2_LearningRate,
    },
    {
        title: { zh: '梯度下降', en: 'Gradient Descent' },
        subConcept: { zh: '反向传播', en: 'Backpropagation' },
        component: Module3_Backprop,
    },
];

export const GradientDescentLesson: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
