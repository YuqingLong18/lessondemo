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
        label: { en: 'Model Design', zh: 'Model Design' },
        detail: {
            en: 'Pick features and a model family that matches the task and data.',
            zh: 'Pick features and a model family that matches the task and data.',
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
        label: { en: 'Model Training', zh: 'Model Training' },
        detail: {
            en: 'Use data to adjust parameters by minimizing a loss function.',
            zh: 'Use data to adjust parameters by minimizing a loss function.',
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
        label: { en: 'Model Testing', zh: 'Model Testing' },
        detail: {
            en: 'Evaluate on new data to detect overfitting or underfitting.',
            zh: 'Evaluate on new data to detect overfitting or underfitting.',
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
        label: { en: 'Model Selection', zh: 'Model Selection' },
        detail: {
            en: 'Choose the simplest model that performs well on the test set.',
            zh: 'Choose the simplest model that performs well on the test set.',
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

    const panel =
        language === 'zh'
            ? `**Workflow Overview**\n\n- A machine learning system moves from task + data to a chosen model.\n- The workflow has four stages: design, training, testing, and selection.\n- Click each stage to see its role in the pipeline.`
            : `**Workflow Overview**\n\n- A machine learning system moves from task + data to a chosen model.\n- The workflow has four stages: design, training, testing, and selection.\n- Click each stage to see its role in the pipeline.`;

    return (
        <>
            <ConceptStage>
                <div className="w-full h-full p-8 flex flex-col gap-6">
                    <div className="text-xs uppercase tracking-wide text-gray-400">
                        {language === 'zh' ? 'Click a stage to explore' : 'Click a stage to explore'}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-40 bg-white border border-gray-200 rounded-xl p-4 text-sm">
                            <div className="text-xs text-gray-400 uppercase">Input</div>
                            <div className="font-semibold text-gray-800">Task + Data</div>
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
                            <div className="text-xs text-gray-400 uppercase">Output</div>
                            <div className="font-semibold text-gray-800">Deployed Model</div>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div
                            className={`w-full max-w-3xl rounded-2xl p-6 shadow-sm border ${steps[activeStep].tone.panel}`}
                        >
                            <div className="text-xs uppercase text-gray-400">Selected Stage</div>
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
