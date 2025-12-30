import React, { useState, useEffect, useCallback } from 'react';
import { SlideShell } from './SlideShell';

interface SlideData {
    title: string;
    subConcept?: string;
    component: React.ComponentType<any>;
}

interface SlideDeckProps {
    slides: SlideData[];
}

export const SlideDeck: React.FC<SlideDeckProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }, []);

    const reset = useCallback(() => {
        // In a real app, this might trigger a reset key or callback on the slide
        // For now, it just logs or could reset local state if lifted
        console.log('Global Reset Triggered');
        window.location.reload(); // Hard reset for concept stability as per AGENTS.md "restore same initial behavior"
    }, []);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    const CurrentSlideComponent = slides[currentIndex].component;

    return (
        <SlideShell
            title={slides[currentIndex].title}
            subConcept={slides[currentIndex].subConcept}
            currentSlide={currentIndex}
            totalSlides={slides.length}
            onNext={nextSlide}
            onPrev={prevSlide}
            onReset={reset}
        >
            <CurrentSlideComponent />
        </SlideShell>
    );
};
