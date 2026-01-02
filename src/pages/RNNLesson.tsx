import React from 'react';
import { SlideDeck } from '../components/core/SlideDeck';
import { Slide1_SequenceBasics } from '../demos/rnn/Slide1_SequenceBasics';
import { Slide2_LanguageContext } from '../demos/rnn/Slide2_LanguageContext';
import { Slide3_MusicSpeech } from '../demos/rnn/Slide3_MusicSpeech';
import { Slide4_StockSeries } from '../demos/rnn/Slide4_StockSeries';
import { Slide5_DNASequence } from '../demos/rnn/Slide5_DNASequence';
import { Slide6_RNNStructure } from '../demos/rnn/Slide6_RNNStructure';

const slides = [
    {
        title: { en: 'Recurrent Neural Networks', zh: '循环神经网络' },
        subConcept: { en: 'Time is sequential', zh: '时间具有顺序性' },
        component: Slide1_SequenceBasics,
    },
    {
        title: { en: 'Recurrent Neural Networks', zh: '循环神经网络' },
        subConcept: { en: 'Language is sequential', zh: '语言具有顺序性' },
        component: Slide2_LanguageContext,
    },
    {
        title: { en: 'Recurrent Neural Networks', zh: '循环神经网络' },
        subConcept: { en: 'Music and Speech are sequential, too!', zh: '音乐和语音也有顺序性！' },
        component: Slide3_MusicSpeech,
    },
    {
        title: { en: 'Recurrent Neural Networks', zh: '循环神经网络' },
        subConcept: { en: 'Stock price is sequential', zh: '股价具有顺序性' },
        component: Slide4_StockSeries,
    },
    {
        title: { en: 'Recurrent Neural Networks', zh: '循环神经网络' },
        subConcept: { en: 'Gene is sequential', zh: '基因具有顺序性' },
        component: Slide5_DNASequence,
    },
    {
        title: { en: 'Recurrent Neural Networks', zh: '循环神经网络' },
        subConcept: {
            en: 'RNN is a neural network structure that specializes in learning sequential information.',
            zh: 'RNN 是一种擅长学习序列信息的神经网络结构。',
        },
        component: Slide6_RNNStructure,
    },
];

export const RNNLesson: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
