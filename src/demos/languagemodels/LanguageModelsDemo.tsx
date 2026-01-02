import React from 'react';
import { SlideDeck } from '../../components/core/SlideDeck';
import { Slide1_LanguageBridge } from './Slide1_LanguageBridge';
import { Slide2_LanguageShapesThought } from './Slide2_LanguageShapesThought';
import { Slide3_PoemDetection } from './Slide3_PoemDetection';
import { Slide4_WhatIsALanguageModel } from './Slide4_WhatIsALanguageModel';
import { Slide5_SymbolicRules } from './Slide5_SymbolicRules';
import { Slide6_SymbolicAmbiguity } from './Slide6_SymbolicAmbiguity';
import { Slide7_StatisticalNgram } from './Slide7_StatisticalNgram';
import { Slide8_StatisticalLimits } from './Slide8_StatisticalLimits';
import { Slide9_WordEmbeddings } from './Slide9_WordEmbeddings';
import { Slide10_ContextualEmbeddings } from './Slide10_ContextualEmbeddings';

const slides = [
    {
        title: { zh: '语言与智能', en: 'Language and Intelligence' },
        subConcept: { zh: '语言传递思想', en: 'Language moves ideas' },
        component: Slide1_LanguageBridge,
    },
    {
        title: { zh: '语言与智能', en: 'Language and Intelligence' },
        subConcept: { zh: '语言组织思维', en: 'Language organizes thought' },
        component: Slide2_LanguageShapesThought,
    },
    {
        title: { zh: '语言与智能', en: 'Language and Intelligence' },
        subConcept: { zh: '人类还是模型？', en: 'Human or model?' },
        component: Slide3_PoemDetection,
    },
    {
        title: { zh: '语言模型', en: 'Language Models' },
        subConcept: { zh: '预测下一个词', en: 'Predict the next word' },
        component: Slide4_WhatIsALanguageModel,
    },
    {
        title: { zh: '符号主义方法', en: 'Symbolic Approach' },
        subConcept: { zh: '规则与语法', en: 'Rules and grammar' },
        component: Slide5_SymbolicRules,
    },
    {
        title: { zh: '符号主义方法', en: 'Symbolic Approach' },
        subConcept: { zh: '歧义与意义', en: 'Ambiguity and meaning' },
        component: Slide6_SymbolicAmbiguity,
    },
    {
        title: { zh: '统计方法', en: 'Statistical Approach' },
        subConcept: { zh: 'N-gram 预测', en: 'N-gram prediction' },
        component: Slide7_StatisticalNgram,
    },
    {
        title: { zh: '统计方法', en: 'Statistical Approach' },
        subConcept: { zh: '长程依赖的限制', en: 'Long-range limits' },
        component: Slide8_StatisticalLimits,
    },
    {
        title: { zh: '词向量', en: 'Word Embeddings' },
        subConcept: { zh: '向量与类比', en: 'Vectors and analogies' },
        component: Slide9_WordEmbeddings,
    },
    {
        title: { zh: '词向量', en: 'Word Embeddings' },
        subConcept: { zh: '语境与下一步', en: 'Context and what comes next' },
        component: Slide10_ContextualEmbeddings,
    },
];

export const LanguageModelsDemo: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
