import React from 'react';
import { useLanguage } from '../../components/core/LanguageContext';

interface NeonBabelFrameProps {
    children: React.ReactNode;
    cornerLabel?: string;
}

export const NeonBabelFrame: React.FC<NeonBabelFrameProps> = ({ children, cornerLabel }) => {
    const { language } = useLanguage();
    const projectLabel = language === 'zh' ? '项目：NEON BABEL' : 'Project: NEON BABEL';
    return (
        <div
            className="relative w-full h-full overflow-hidden"
            style={{
                fontFamily: 'var(--neon-body-font)',
                color: '#e6f1ff',
            }}
        >
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'radial-gradient(circle at top left, rgba(62, 255, 214, 0.12), transparent 45%),' +
                        'radial-gradient(circle at bottom right, rgba(255, 71, 193, 0.15), transparent 50%),' +
                        'linear-gradient(135deg, #0b0f1a 0%, #0f172a 50%, #0b0f1a 100%)',
                }}
            />
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(46, 230, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 230, 255, 0.12) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />
            <div className="absolute -top-24 -right-16 w-72 h-72 bg-cyan-500/20 blur-3xl neon-float" />
            <div
                className="absolute -bottom-28 -left-20 w-80 h-80 bg-pink-500/20 blur-3xl neon-float"
                style={{ animationDelay: '1.4s' }}
            />
            <div className="absolute top-16 left-0 h-px w-1/3 bg-cyan-400/50 neon-scan" />
            <div className="absolute inset-0 border border-cyan-400/20 rounded-xl pointer-events-none" />

            <div className="relative w-full h-full p-6 flex flex-col">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em]">
                    <span
                        className="px-3 py-1 rounded-full border border-cyan-400/60 text-cyan-200"
                        style={{ fontFamily: 'var(--neon-display-font)' }}
                    >
                        {projectLabel}
                    </span>
                    <span className="text-slate-400">{cornerLabel || 'Transformer Architecture'}</span>
                </div>
                <div className="flex-1 mt-4 flex flex-col">{children}</div>
            </div>
        </div>
    );
};
