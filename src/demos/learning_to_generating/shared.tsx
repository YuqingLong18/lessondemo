import React from 'react';

export const palette = {
    input: '#e0f2fe',
    inputBorder: '#7dd3fc',
    process: '#fff4d6',
    processBorder: '#facc15',
    output: '#e7f9ed',
    outputBorder: '#86efac',
    cat: '#fde2e4',
    dog: '#e0f2fe',
    ink: '#1f2933',
    muted: '#6b7280',
    panel: '#ffffff',
    soft: '#f8fafc',
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace('#', '');
    const num = parseInt(cleanHex, 16);
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255,
    };
};

const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (value: number) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const mixColor = (from: string, to: string, ratio: number) => {
    const amount = clamp(ratio);
    const a = hexToRgb(from);
    const b = hexToRgb(to);
    const r = Math.round(a.r + (b.r - a.r) * amount);
    const g = Math.round(a.g + (b.g - a.g) * amount);
    const bValue = Math.round(a.b + (b.b - a.b) * amount);
    return rgbToHex(r, g, bValue);
};

const toneMap = {
    input: { background: palette.input, border: palette.inputBorder },
    process: { background: palette.process, border: palette.processBorder },
    output: { background: palette.output, border: palette.outputBorder },
    neutral: { background: palette.panel, border: '#e5e7eb' },
};

export const StageCard: React.FC<{
    title: string;
    tone?: keyof typeof toneMap;
    children: React.ReactNode;
}> = ({ title, tone = 'neutral', children }) => {
    const colors = toneMap[tone];
    return (
        <div
            style={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.border}`,
                borderRadius: '12px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                height: '100%',
            }}
        >
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: palette.ink }}>{title}</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{children}</div>
        </div>
    );
};

export const PillButton: React.FC<{
    label: string;
    active: boolean;
    onClick: () => void;
}> = ({ label, active, onClick }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '999px',
                border: `1px solid ${active ? '#2563eb' : '#cbd5f5'}`,
                backgroundColor: active ? '#e0edff' : '#ffffff',
                color: palette.ink,
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
            }}
        >
            {label}
        </button>
    );
};

export const MeterBar: React.FC<{
    label: string;
    value: number;
    color: string;
}> = ({ label, value, color }) => {
    const percent = Math.round(clamp(value) * 100);
    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                <span style={{ color: palette.muted }}>{label}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', color: palette.ink }}>{percent}%</span>
            </div>
            <div style={{ height: '10px', backgroundColor: '#e5e7eb', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${percent}%`, height: '100%', backgroundColor: color }} />
            </div>
        </div>
    );
};

export const AnimalFace: React.FC<{
    catness: number;
    energy?: number;
    size?: number;
    label?: string;
}> = ({ catness, energy = 0.5, size = 120, label }) => {
    const clampedCatness = clamp(catness);
    const dogness = 1 - clampedCatness;
    const faceColor = mixColor(palette.dog, palette.cat, clampedCatness);
    const eyeWidth = 4 + energy * 3;
    const eyeHeight = 3 + energy * 2;
    const snoutScale = 0.6 + dogness * 0.7;

    return (
        <div style={{ width: size, textAlign: 'center' }}>
            <svg width={size} height={size} viewBox="0 0 160 160" role="img" aria-label={label || 'animal'}>
                <circle cx="80" cy="85" r="50" fill={faceColor} stroke="#cbd5f5" strokeWidth="3" />

                <polygon
                    points="45,50 60,20 80,50"
                    fill={faceColor}
                    stroke="#cbd5f5"
                    strokeWidth="3"
                    style={{ opacity: clampedCatness }}
                />
                <polygon
                    points="80,50 100,20 115,50"
                    fill={faceColor}
                    stroke="#cbd5f5"
                    strokeWidth="3"
                    style={{ opacity: clampedCatness }}
                />

                <ellipse
                    cx="35"
                    cy="60"
                    rx="18"
                    ry="28"
                    fill={faceColor}
                    stroke="#cbd5f5"
                    strokeWidth="3"
                    style={{ opacity: dogness }}
                />
                <ellipse
                    cx="125"
                    cy="60"
                    rx="18"
                    ry="28"
                    fill={faceColor}
                    stroke="#cbd5f5"
                    strokeWidth="3"
                    style={{ opacity: dogness }}
                />

                <ellipse cx="65" cy="85" rx={eyeWidth} ry={eyeHeight} fill="#1f2933" />
                <ellipse cx="95" cy="85" rx={eyeWidth} ry={eyeHeight} fill="#1f2933" />

                <circle
                    cx="80"
                    cy="102"
                    r={6 + dogness * 2}
                    fill="#1f2933"
                    opacity="0.9"
                />
                <path
                    d="M70 108 Q80 118 90 108"
                    stroke="#1f2933"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                />

                <g opacity={clampedCatness} stroke="#1f2933" strokeWidth="2">
                    <line x1="55" y1="95" x2="35" y2="92" />
                    <line x1="55" y1="102" x2="35" y2="104" />
                    <line x1="105" y1="95" x2="125" y2="92" />
                    <line x1="105" y1="102" x2="125" y2="104" />
                </g>

                <ellipse
                    cx="80"
                    cy="105"
                    rx={18 * snoutScale}
                    ry={10 * snoutScale}
                    fill="#ffffff"
                    opacity={0.3 + dogness * 0.4}
                />
            </svg>
            {label && (
                <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: palette.muted }}>{label}</div>
            )}
        </div>
    );
};
