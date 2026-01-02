import React from 'react';
import { SlideDeck } from '../components/core/SlideDeck';
import { Slide1_TheHook } from '../demos/transformer/Slide1_TheHook';
import { Slide2_Intro } from '../demos/transformer/Slide2_Intro';
import { Slide3_DeepDive } from '../demos/transformer/Slide3_DeepDive';
import { Slide4_MainEvent } from '../demos/transformer/Slide4_MainEvent';
import { Slide5_Outro } from '../demos/transformer/Slide5_Outro';

const slides = [
    {
        title: { zh: 'Transformer 架构', en: 'The Transformer Architecture' },
        subConcept: { zh: '模块 1 - 引子（RNN）', en: 'Module 1 - The Hook (RNNs)' },
        component: Slide1_TheHook,
    },
    {
        title: { zh: 'Transformer 架构', en: 'The Transformer Architecture' },
        subConcept: { zh: '模块 2 - Syndicate 登场', en: 'Module 2 - Enter the Syndicate' },
        component: Slide2_Intro,
    },
    {
        title: { zh: 'Transformer 架构', en: 'The Transformer Architecture' },
        subConcept: {
            zh: '模块 3 - 装备上身（嵌入 + 位置）',
            en: 'Module 3 - Suiting Up (Embeddings + Position)',
        },
        component: Slide3_DeepDive,
    },
    {
        title: { zh: 'Transformer 架构', en: 'The Transformer Architecture' },
        subConcept: { zh: '模块 4 - 共振（注意力）', en: 'Module 4 - The Resonance (Attention)' },
        component: Slide4_MainEvent,
    },
    {
        title: { zh: 'Transformer 架构', en: 'The Transformer Architecture' },
        subConcept: { zh: '模块 5 - 全局图景', en: 'Module 5 - The Big Picture' },
        component: Slide5_Outro,
    },
];

export const TransformerLesson: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
