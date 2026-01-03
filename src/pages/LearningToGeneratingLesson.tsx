import React from 'react';
import { SlideDeck } from '../components/core/SlideDeck';
import { Slide1_FromLearningToGenerating } from '../demos/learning_to_generating/Slide1_FromLearningToGenerating';
import { Slide2_AutoencoderCompression } from '../demos/learning_to_generating/Slide2_AutoencoderCompression';
import { Slide3_LatentMap } from '../demos/learning_to_generating/Slide3_LatentMap';
import { Slide5_GANCompetition } from '../demos/learning_to_generating/Slide5_GANCompetition';
import { Slide6_TrainingBalance } from '../demos/learning_to_generating/Slide6_TrainingBalance';
import { Slide7_AEvsGAN } from '../demos/learning_to_generating/Slide7_AEvsGAN';
import { Slide8_ConceptCheck } from '../demos/learning_to_generating/Slide8_ConceptCheck';

const slides = [
    {
        title: { en: 'From Learning to Generating', zh: '从学习到生成' },
        subConcept: { en: 'Prediction vs creation', zh: '预测与生成' },
        component: Slide1_FromLearningToGenerating,
    },
    {
        title: { en: 'From Learning to Generating', zh: '从学习到生成' },
        subConcept: { en: 'Autoencoder bottleneck', zh: '自编码器瓶颈' },
        component: Slide2_AutoencoderCompression,
    },
    {
        title: { en: 'From Learning to Generating', zh: '从学习到生成' },
        subConcept: { en: 'Latent space map', zh: '潜在空间地图' },
        component: Slide3_LatentMap,
    },
    {
        title: { en: 'From Learning to Generating', zh: '从学习到生成' },
        subConcept: { en: 'Generator vs discriminator', zh: '生成器与判别器' },
        component: Slide5_GANCompetition,
    },
    {
        title: { en: 'From Learning to Generating', zh: '从学习到生成' },
        subConcept: { en: 'Balance and mode collapse', zh: '平衡与模式崩塌' },
        component: Slide6_TrainingBalance,
    },
    {
        title: { en: 'From Learning to Generating', zh: '从学习到生成' },
        subConcept: { en: 'Different objectives', zh: '不同目标' },
        component: Slide7_AEvsGAN,
    },
    {
        title: { en: 'From Learning to Generating', zh: '从学习到生成' },
        subConcept: { en: 'Concept check', zh: '概念检查' },
        component: Slide8_ConceptCheck,
    },
];

export const LearningToGeneratingLesson: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
