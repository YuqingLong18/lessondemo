import React from 'react';
import { SlideDeck } from '../../components/core/SlideDeck';
import { Slide1_Intro } from './Slide1_Intro';
import { Slide2_Symbolic } from './Slide2_Symbolic';
import { Slide3_Bayesian } from './Slide3_Bayesian';
import { Slide4_Connectionist } from './Slide4_Connectionist';
import { Slide5_Evolutionary } from './Slide5_Evolutionary';
import { Slide6_Summary } from './Slide6_Summary';

const slides = [
    {
        title: { zh: '四大流派概览', en: 'Introduction' },
        subConcept: { zh: '人工智能的历史', en: 'The Four Schools' },
        component: Slide1_Intro,
    },
    {
        title: { zh: '符号主义', en: 'Symbolic School' },
        subConcept: { zh: '逻辑与规则', en: 'Logic, Rules & Symbols' },
        component: Slide2_Symbolic,
    },
    {
        title: { zh: '贝叶斯学派', en: 'Bayesian School' },
        subConcept: { zh: '概率与不确定性', en: 'Probability & Uncertainty' },
        component: Slide3_Bayesian,
    },
    {
        title: { zh: '连接主义', en: 'Connectionist School' },
        subConcept: { zh: '神经网络', en: 'Neural Networks' },
        component: Slide4_Connectionist,
    },
    {
        title: { zh: '进化主义', en: 'Evolutionary School' },
        subConcept: { zh: '遗传算法', en: 'Genetic Algorithms' },
        component: Slide5_Evolutionary,
    },
    {
        title: { zh: '总结与融合', en: 'Summary' },
        subConcept: { zh: '学派对比', en: 'Integration & Comparison' },
        component: Slide6_Summary,
    },
];

export const FourSchoolsDemo: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
