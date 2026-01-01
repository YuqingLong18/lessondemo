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
        title: { zh: 'Basic Workflow of Machine Learning', en: 'Basic Workflow of Machine Learning' },
        subConcept: { zh: 'Four Stages', en: 'Four Stages' },
        component: Slide1_WorkflowOverview,
    },
    {
        title: { zh: 'Model Design', en: 'Model Design' },
        subConcept: { zh: 'No Free Lunch', en: 'No Free Lunch' },
        component: Slide2_ModelDesign,
    },
    {
        title: { zh: 'Model Training', en: 'Model Training' },
        subConcept: { zh: 'Loss Function', en: 'Loss Function' },
        component: Slide3_LossFunction,
    },
    {
        title: { zh: 'Model Training', en: 'Model Training' },
        subConcept: { zh: 'Gradient Descent', en: 'Gradient Descent' },
        component: Slide4_GradientDescent,
    },
    {
        title: { zh: 'Model Testing', en: 'Model Testing' },
        subConcept: { zh: 'Overfitting', en: 'Overfitting' },
        component: Slide5_ModelTesting,
    },
    {
        title: { zh: 'Model Selection', en: 'Model Selection' },
        subConcept: { zh: 'Occam\'s Razor', en: 'Occam\'s Razor' },
        component: Slide6_ModelSelection,
    },
];

export const MLWorkflowLesson: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
