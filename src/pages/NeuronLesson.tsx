import React from 'react';
import { SlideDeck } from '../components/core/SlideDeck';
import { Slide1_BioVsArtificial } from '../demos/neuron/Slide1_BioVsArtificial';
import { Slide2_MPNeuron } from '../demos/neuron/Slide2_MPNeuron';
import { Slide3_Perceptron } from '../demos/neuron/Slide3_Perceptron';

const slides = [
    {
        title: { zh: '灵感来源', en: 'Inspiration' },
        subConcept: { zh: '生物与人工', en: 'Biological vs Artificial' },
        component: Slide1_BioVsArtificial,
    },
    {
        title: { zh: 'M-P 神经元', en: 'The M-P Neuron' },
        subConcept: { zh: '阈值逻辑', en: 'Threshold Logic' },
        component: Slide2_MPNeuron,
    },
    {
        title: { zh: '感知机', en: 'The Perceptron' },
        subConcept: { zh: '权重与偏置', en: 'Weights & Bias' },
        component: Slide3_Perceptron,
    },
];

export const NeuronLesson: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
