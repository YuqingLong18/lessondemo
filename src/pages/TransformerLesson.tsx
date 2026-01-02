import React from 'react';
import { SlideDeck } from '../components/core/SlideDeck';
import { Slide1_TheHook } from '../demos/transformer/Slide1_TheHook';
import { Slide2_Intro } from '../demos/transformer/Slide2_Intro';
import { Slide3_DeepDive } from '../demos/transformer/Slide3_DeepDive';
import { Slide4_MainEvent } from '../demos/transformer/Slide4_MainEvent';
import { Slide5_Outro } from '../demos/transformer/Slide5_Outro';

const slides = [
    {
        title: { zh: 'The Transformer Architecture', en: 'The Transformer Architecture' },
        subConcept: { zh: 'Module 1 - The Hook (RNNs)', en: 'Module 1 - The Hook (RNNs)' },
        component: Slide1_TheHook,
    },
    {
        title: { zh: 'The Transformer Architecture', en: 'The Transformer Architecture' },
        subConcept: { zh: 'Module 2 - Enter the Syndicate', en: 'Module 2 - Enter the Syndicate' },
        component: Slide2_Intro,
    },
    {
        title: { zh: 'The Transformer Architecture', en: 'The Transformer Architecture' },
        subConcept: {
            zh: 'Module 3 - Suiting Up (Embeddings + Position)',
            en: 'Module 3 - Suiting Up (Embeddings + Position)',
        },
        component: Slide3_DeepDive,
    },
    {
        title: { zh: 'The Transformer Architecture', en: 'The Transformer Architecture' },
        subConcept: { zh: 'Module 4 - The Resonance (Attention)', en: 'Module 4 - The Resonance (Attention)' },
        component: Slide4_MainEvent,
    },
    {
        title: { zh: 'The Transformer Architecture', en: 'The Transformer Architecture' },
        subConcept: { zh: 'Module 5 - The Decoder and the Future', en: 'Module 5 - The Decoder and the Future' },
        component: Slide5_Outro,
    },
];

export const TransformerLesson: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
