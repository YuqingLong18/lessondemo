import React, { useState, useEffect, useCallback } from 'react';
import { SlideShell } from './SlideShell';
import { useLanguage, type LocalizedText } from './LanguageContext';

interface SlideComponentProps {
    registerStepControl?: RegisterStepControl;
    resetSignal?: number;
}

interface SlideData {
    title: LocalizedText;
    subConcept?: LocalizedText;
    component: React.ComponentType<{}>;
}

interface SlideDeckProps {
    slides: SlideData[];
}

export interface RegisterStepControl {
    (control: {
        currentStep: number;
        totalSteps: number;
        canGoNext: boolean;
        canGoPrev: boolean;
        goNext: () => void;
        goPrev: () => void;
    } | null): void;
}

export const SlideDeck: React.FC<SlideDeckProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [resetSignal, setResetSignal] = useState(0);
    const [stepControlState, setStepControlState] = useState<{
        slideIndex: number;
        control: Parameters<RegisterStepControl>[0];
    } | null>(null);
    const { language } = useLanguage();

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    const registerStepControl = useCallback<RegisterStepControl>((control) => {
        setStepControlState(
            control === null
                ? null
                : {
                    slideIndex: currentIndex,
                    control,
                }
        );
    }, [currentIndex]);

    const stepControl = stepControlState?.slideIndex === currentIndex ? stepControlState.control : null;

    const canGoPrev = Boolean(stepControl?.canGoPrev) || currentIndex > 0;
    const canGoNext = Boolean(stepControl?.canGoNext) || currentIndex < slides.length - 1;

    const goPrev = useCallback(() => {
        if (stepControl?.canGoPrev) {
            stepControl.goPrev();
            return;
        }
        prevSlide();
    }, [prevSlide, stepControl]);

    const goNext = useCallback(() => {
        if (stepControl?.canGoNext) {
            stepControl.goNext();
            return;
        }
        nextSlide();
    }, [nextSlide, stepControl]);

    const reset = useCallback(() => {
        setStepControlState(null);
        setCurrentIndex(0);
        setResetSignal((prev) => prev + 1);
    }, []);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [goNext, goPrev]);

    const CurrentSlideComponent = slides[currentIndex].component as React.ComponentType<SlideComponentProps>;
    const stepLabel = stepControl
        ? language === 'zh'
            ? `步骤 ${stepControl.currentStep + 1} / ${stepControl.totalSteps}`
            : `Step ${stepControl.currentStep + 1} / ${stepControl.totalSteps}`
        : undefined;

    return (
        <SlideShell
            title={slides[currentIndex].title[language]}
            subConcept={slides[currentIndex].subConcept?.[language]}
            currentSlide={currentIndex}
            totalSlides={slides.length}
            canGoNext={canGoNext}
            canGoPrev={canGoPrev}
            stepLabel={stepLabel}
            onNext={goNext}
            onPrev={goPrev}
            onReset={reset}
        >
            <CurrentSlideComponent
                key={`${currentIndex}-${resetSignal}`}
                registerStepControl={registerStepControl}
                resetSignal={resetSignal}
            />
        </SlideShell>
    );
};
