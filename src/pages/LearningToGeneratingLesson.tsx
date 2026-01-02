import React from 'react';
import { SlideDeck } from '../components/core/SlideDeck';
import { Slide1_FromLearningToGenerating } from '../demos/learning_to_generating/Slide1_FromLearningToGenerating';
import { Slide2_AutoencoderCompression } from '../demos/learning_to_generating/Slide2_AutoencoderCompression';
import { Slide3_LatentMap } from '../demos/learning_to_generating/Slide3_LatentMap';
import { Slide4_SamplingLatent } from '../demos/learning_to_generating/Slide4_SamplingLatent';
import { Slide5_GANCompetition } from '../demos/learning_to_generating/Slide5_GANCompetition';
import { Slide6_TrainingBalance } from '../demos/learning_to_generating/Slide6_TrainingBalance';
import { Slide7_AEvsGAN } from '../demos/learning_to_generating/Slide7_AEvsGAN';
import { Slide8_ConceptCheck } from '../demos/learning_to_generating/Slide8_ConceptCheck';
import { Slide9_MakeANewAnimal } from '../demos/learning_to_generating/Slide9_MakeANewAnimal';

const slides = [
    {
        title: { en: 'From Learning to Generating', zh: 'From Learning to Generating' },
        subConcept: { en: 'Prediction vs creation', zh: 'Prediction vs creation' },
        component: Slide1_FromLearningToGenerating,
    },
    {
        title: { en: 'From Learning to Generating', zh: 'From Learning to Generating' },
        subConcept: { en: 'Autoencoder bottleneck', zh: 'Autoencoder bottleneck' },
        component: Slide2_AutoencoderCompression,
    },
    {
        title: { en: 'From Learning to Generating', zh: 'From Learning to Generating' },
        subConcept: { en: 'Latent space map', zh: 'Latent space map' },
        component: Slide3_LatentMap,
    },
    {
        title: { en: 'From Learning to Generating', zh: 'From Learning to Generating' },
        subConcept: { en: 'Sampling new examples', zh: 'Sampling new examples' },
        component: Slide4_SamplingLatent,
    },
    {
        title: { en: 'From Learning to Generating', zh: 'From Learning to Generating' },
        subConcept: { en: 'Generator vs discriminator', zh: 'Generator vs discriminator' },
        component: Slide5_GANCompetition,
    },
    {
        title: { en: 'From Learning to Generating', zh: 'From Learning to Generating' },
        subConcept: { en: 'Balance and mode collapse', zh: 'Balance and mode collapse' },
        component: Slide6_TrainingBalance,
    },
    {
        title: { en: 'From Learning to Generating', zh: 'From Learning to Generating' },
        subConcept: { en: 'Different objectives', zh: 'Different objectives' },
        component: Slide7_AEvsGAN,
    },
    {
        title: { en: 'From Learning to Generating', zh: 'From Learning to Generating' },
        subConcept: { en: 'Concept check', zh: 'Concept check' },
        component: Slide8_ConceptCheck,
    },
    {
        title: { en: 'From Learning to Generating', zh: 'From Learning to Generating' },
        subConcept: { en: 'Steer the generator', zh: 'Steer the generator' },
        component: Slide9_MakeANewAnimal,
    },
];

export const LearningToGeneratingLesson: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
