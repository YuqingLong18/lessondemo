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
        title: { zh: 'Language and Intelligence', en: 'Language and Intelligence' },
        subConcept: { zh: 'Language moves ideas', en: 'Language moves ideas' },
        component: Slide1_LanguageBridge,
    },
    {
        title: { zh: 'Language and Intelligence', en: 'Language and Intelligence' },
        subConcept: { zh: 'Language organizes thought', en: 'Language organizes thought' },
        component: Slide2_LanguageShapesThought,
    },
    {
        title: { zh: 'Language and Intelligence', en: 'Language and Intelligence' },
        subConcept: { zh: 'Human or model?', en: 'Human or model?' },
        component: Slide3_PoemDetection,
    },
    {
        title: { zh: 'Language Models', en: 'Language Models' },
        subConcept: { zh: 'Predict the next word', en: 'Predict the next word' },
        component: Slide4_WhatIsALanguageModel,
    },
    {
        title: { zh: 'Symbolic Approach', en: 'Symbolic Approach' },
        subConcept: { zh: 'Rules and grammar', en: 'Rules and grammar' },
        component: Slide5_SymbolicRules,
    },
    {
        title: { zh: 'Symbolic Approach', en: 'Symbolic Approach' },
        subConcept: { zh: 'Ambiguity and meaning', en: 'Ambiguity and meaning' },
        component: Slide6_SymbolicAmbiguity,
    },
    {
        title: { zh: 'Statistical Approach', en: 'Statistical Approach' },
        subConcept: { zh: 'N-gram prediction', en: 'N-gram prediction' },
        component: Slide7_StatisticalNgram,
    },
    {
        title: { zh: 'Statistical Approach', en: 'Statistical Approach' },
        subConcept: { zh: 'Long-range limits', en: 'Long-range limits' },
        component: Slide8_StatisticalLimits,
    },
    {
        title: { zh: 'Word Embeddings', en: 'Word Embeddings' },
        subConcept: { zh: 'Vectors and analogies', en: 'Vectors and analogies' },
        component: Slide9_WordEmbeddings,
    },
    {
        title: { zh: 'Word Embeddings', en: 'Word Embeddings' },
        subConcept: { zh: 'Context and what comes next', en: 'Context and what comes next' },
        component: Slide10_ContextualEmbeddings,
    },
];

export const LanguageModelsDemo: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
