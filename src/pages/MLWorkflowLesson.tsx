import React from 'react';
import { SlideDeck } from '../components/core/SlideDeck';
import { Slide1_WorkflowOverview } from '../demos/mlworkflow/Slide1_WorkflowOverview';
import { Slide2_ModelDesign } from '../demos/mlworkflow/Slide2_ModelDesign';
import { Slide3_LossFunction } from '../demos/mlworkflow/Slide3_LossFunction';
import { Slide4_GradientDescent } from '../demos/mlworkflow/Slide4_GradientDescent';
import { Slide5_ModelTesting } from '../demos/mlworkflow/Slide5_ModelTesting';
import { Slide6_ModelSelection } from '../demos/mlworkflow/Slide6_ModelSelection';

const slides = [
    {
        title: { zh: '机器学习基础流程', en: 'Basic Workflow of Machine Learning' },
        subConcept: { zh: '四个阶段', en: 'Four Stages' },
        component: Slide1_WorkflowOverview,
    },
    {
        title: { zh: '模型设计', en: 'Model Design' },
        subConcept: { zh: '无免费午餐', en: 'No Free Lunch' },
        component: Slide2_ModelDesign,
    },
    {
        title: { zh: '模型训练', en: 'Model Training' },
        subConcept: { zh: '损失函数', en: 'Loss Function' },
        component: Slide3_LossFunction,
    },
    {
        title: { zh: '模型训练', en: 'Model Training' },
        subConcept: { zh: '梯度下降', en: 'Gradient Descent' },
        component: Slide4_GradientDescent,
    },
    {
        title: { zh: '模型测试', en: 'Model Testing' },
        subConcept: { zh: '过拟合', en: 'Overfitting' },
        component: Slide5_ModelTesting,
    },
    {
        title: { zh: '模型选择', en: 'Model Selection' },
        subConcept: { zh: '奥卡姆剃刀', en: 'Occam\'s Razor' },
        component: Slide6_ModelSelection,
    },
];

export const MLWorkflowLesson: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
