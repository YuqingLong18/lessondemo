import React from 'react';
import { SlideDeck } from '../../components/core/SlideDeck';
import { Slide1_TimeTraveler } from './Slide1_TimeTraveler';
import { Slide2_TwoIntelligences } from './Slide2_TwoIntelligences';
import { Slide3_ReasoningFromAxioms } from './Slide3_ReasoningFromAxioms';
import { Slide4_HeuristicSearch } from './Slide4_HeuristicSearch';
import { Slide5_GamePlaying } from './Slide5_GamePlaying';
import { Slide6_KnowledgeLimits } from './Slide6_KnowledgeLimits';
import { Slide7_ProductionRules } from './Slide7_ProductionRules';
import { Slide8_ExpertAndGraph } from './Slide8_ExpertAndGraph';
import { Slide9_ShiftToLearning } from './Slide9_ShiftToLearning';
import { Slide10_LearningFramework } from './Slide10_LearningFramework';

const slides = [
    {
        title: { zh: '知识到学习', en: 'From Knowledge to Learning' },
        subConcept: { zh: '引入与动机', en: 'Hook & Motivation' },
        component: Slide1_TimeTraveler,
    },
    {
        title: { zh: '知识与智能', en: 'Knowledge and Intelligence' },
        subConcept: { zh: '流体 vs 晶体', en: 'Fluid vs Crystallized' },
        component: Slide2_TwoIntelligences,
    },
    {
        title: { zh: '通用知识推理', en: 'Reasoning from Axioms' },
        subConcept: { zh: '定理证明', en: 'Theorem Proving' },
        component: Slide3_ReasoningFromAxioms,
    },
    {
        title: { zh: '启发式搜索', en: 'Heuristic Search' },
        subConcept: { zh: '更聪明的搜索', en: 'Guided Search' },
        component: Slide4_HeuristicSearch,
    },
    {
        title: { zh: '博弈搜索', en: 'Game Playing' },
        subConcept: { zh: '极小极大与剪枝', en: 'Minimax & Alpha-Beta' },
        component: Slide5_GamePlaying,
    },
    {
        title: { zh: '通用知识的限制', en: 'Limits of General Knowledge' },
        subConcept: { zh: '复杂现实世界', en: 'Real-World Complexity' },
        component: Slide6_KnowledgeLimits,
    },
    {
        title: { zh: '经验知识', en: 'Empirical Knowledge' },
        subConcept: { zh: '产生式规则', en: 'Production Rules' },
        component: Slide7_ProductionRules,
    },
    {
        title: { zh: '专家系统与知识图谱', en: 'Expert Systems & Knowledge Graphs' },
        subConcept: { zh: '知识结构化', en: 'Structured Knowledge' },
        component: Slide8_ExpertAndGraph,
    },
    {
        title: { zh: '走向学习型 AI', en: 'Toward Learning-Based AI' },
        subConcept: { zh: '从规则到数据', en: 'From Rules to Data' },
        component: Slide9_ShiftToLearning,
    },
    {
        title: { zh: '学习框架', en: 'Learning Framework' },
        subConcept: { zh: '苹果与橘子', en: 'Apples vs Oranges' },
        component: Slide10_LearningFramework,
    },
];

export const KnowledgeLearningDemo: React.FC = () => {
    return <SlideDeck slides={slides} />;
};
