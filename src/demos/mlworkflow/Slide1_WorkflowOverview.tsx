import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

type StepInfo = {
    key: string;
    label: { en: string; zh: string };
    detail: { en: string; zh: string };
    tone: { active: string; strip: string; panel: string; pill: string };
};

const steps: StepInfo[] = [
    {
        key: 'design',
        label: { en: 'Model Design', zh: '模型设计' },
        detail: {
            en: 'Pick features and a model family that matches the task and data.',
            zh: '选择与任务和数据相匹配的特征与模型家族。',
        },
        tone: {
            active: 'border-emerald-300 bg-emerald-50 text-emerald-700',
            strip: 'bg-emerald-300',
            panel: 'border-emerald-200 bg-emerald-50/60',
            pill: 'bg-emerald-100 text-emerald-700',
        },
    },
    {
        key: 'training',
        label: { en: 'Model Training', zh: '模型训练' },
        detail: {
            en: 'Use data to adjust parameters by minimizing a loss function.',
            zh: '用数据通过最小化损失函数来调整参数。',
        },
        tone: {
            active: 'border-blue-300 bg-blue-50 text-blue-700',
            strip: 'bg-blue-300',
            panel: 'border-blue-200 bg-blue-50/60',
            pill: 'bg-blue-100 text-blue-700',
        },
    },
    {
        key: 'testing',
        label: { en: 'Model Testing', zh: '模型测试' },
        detail: {
            en: 'Evaluate on new data to detect overfitting or underfitting.',
            zh: '在新数据上评估，以检测过拟合或欠拟合。',
        },
        tone: {
            active: 'border-amber-300 bg-amber-50 text-amber-700',
            strip: 'bg-amber-300',
            panel: 'border-amber-200 bg-amber-50/60',
            pill: 'bg-amber-100 text-amber-700',
        },
    },
    {
        key: 'selection',
        label: { en: 'Model Selection', zh: '模型选择' },
        detail: {
            en: 'Choose the simplest model that performs well on the test set.',
            zh: '在测试集上表现良好时选择最简单的模型。',
        },
        tone: {
            active: 'border-purple-300 bg-purple-50 text-purple-700',
            strip: 'bg-purple-300',
            panel: 'border-purple-200 bg-purple-50/60',
            pill: 'bg-purple-100 text-purple-700',
        },
    },
];

export const Slide1_WorkflowOverview: React.FC = () => {
    const { language } = useLanguage();
    const [activeStep, setActiveStep] = useState(0);

    const copy = {
        zh: {
            panel: `**流程概览**\n\n- 机器学习系统从任务 + 数据走向最终选定的模型。\n- 流程包含四个阶段：设计、训练、测试和选择。\n- 点击每个阶段查看其在流程中的作用。`,
            hint: '点击某个阶段进行探索',
            input: '输入',
            output: '输出',
            taskData: '任务 + 数据',
            deployedModel: '部署的模型',
            selectedStage: '当前阶段',
        },
        en: {
            panel: `**Workflow Overview**\n\n- A machine learning system moves from task + data to a chosen model.\n- The workflow has four stages: design, training, testing, and selection.\n- Click each stage to see its role in the pipeline.`,
            hint: 'Click a stage to explore',
            input: 'Input',
            output: 'Output',
            taskData: 'Task + Data',
            deployedModel: 'Deployed Model',
            selectedStage: 'Selected Stage',
        },
    };
    const text = copy[language];

    const panel = text.panel;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex flex-col gap-6">
                    <div className="text-xs uppercase tracking-wide text-gray-400">
                        {text.hint}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-40 bg-white border border-gray-200 rounded-xl p-4 text-sm">
                            <div className="text-xs text-gray-400 uppercase">{text.input}</div>
                            <div className="font-semibold text-gray-800">{text.taskData}</div>
                        </div>

                        <div className="flex-1 flex items-center gap-3">
                            {steps.map((step, index) => {
                                const isActive = index === activeStep;
                                return (
                                    <button
                                        key={step.key}
                                        type="button"
                                        onClick={() => setActiveStep(index)}
                                        aria-pressed={isActive}
                                        className={`flex-1 rounded-xl border px-3 py-4 text-center text-sm font-semibold transition-all ${
                                            isActive
                                                ? `${step.tone.active} shadow-sm`
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                        }`}
                                    >
                                        <div className={`h-1 w-full rounded-full mb-2 ${step.tone.strip}`} />
                                        {step.label[language]}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="w-40 bg-white border border-gray-200 rounded-xl p-4 text-sm">
                            <div className="text-xs text-gray-400 uppercase">{text.output}</div>
                            <div className="font-semibold text-gray-800">{text.deployedModel}</div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div
                            className={`w-full max-w-3xl rounded-2xl p-6 shadow-sm border ${steps[activeStep].tone.panel}`}
                        >
                            <div className="text-xs uppercase text-gray-400">{text.selectedStage}</div>
                            <div className="text-lg font-semibold text-gray-900 mt-1">
                                {steps[activeStep].label[language]}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                {steps[activeStep].detail[language]}
                            </p>
                            <div className={`inline-flex mt-4 px-3 py-1 rounded-full text-xs font-semibold ${steps[activeStep].tone.pill}`}>
                                {steps[activeStep].label[language]}
                            </div>
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{panel}</ExplainPanel>
        </>
    );
};
