import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const PRICES = [100, 102, 101, 105, 103, 106, 110, 108, 111, 115, 113, 118];

const copy = {
    en: {
        title: '4. Stocks Are Time Series',
        bullets: [
            'A single price is not the whole story.',
            'Trends appear when you compare many steps.',
            'Move through time and watch the trend change.',
        ],
        dayLabel: 'Day',
        windowLabel: 'Trend window:',
        trendUp: 'Trend: Up',
        trendDown: 'Trend: Down',
        trendFlat: 'Trend: Flat',
    },
    zh: {
        title: '4. 股票价格是时间序列',
        bullets: [
            '单个价格不是全部信息。',
            '比较多个时间步才能看到趋势。',
            '沿着时间移动，观察趋势变化。',
        ],
        dayLabel: '天数',
        windowLabel: '趋势窗口：',
        trendUp: '趋势：上升',
        trendDown: '趋势：下降',
        trendFlat: '趋势：平稳',
    },
};

export const Slide4_StockSeries: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [dayIndex, setDayIndex] = useState(5);
    const [windowSize, setWindowSize] = useState(3);

    const chart = useMemo(() => {
        const width = 520;
        const height = 240;
        const padding = 30;
        const min = Math.min(...PRICES);
        const max = Math.max(...PRICES);
        const scaleX = (index: number) =>
            padding + (index / (PRICES.length - 1)) * (width - padding * 2);
        const scaleY = (value: number) =>
            padding + (max - value) / (max - min) * (height - padding * 2);

        const points = PRICES.map((value, index) => ({
            x: scaleX(index),
            y: scaleY(value),
            value,
        }));

        const fullPath = points
            .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
            .join(' ');

        const visiblePoints = points.slice(0, dayIndex + 1);
        const visiblePath = visiblePoints
            .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
            .join(' ');

        return { width, height, points, fullPath, visiblePath };
    }, [dayIndex]);

    const trendStart = Math.max(0, dayIndex - windowSize + 1);
    const trendDelta = PRICES[dayIndex] - PRICES[trendStart];
    const trendLabel =
        trendDelta > 0.5 ? t.trendUp : trendDelta < -0.5 ? t.trendDown : t.trendFlat;

    const dayText =
        language === 'zh'
            ? `第 ${dayIndex + 1} 天：${PRICES[dayIndex].toFixed(0)}`
            : `${t.dayLabel} ${dayIndex + 1}: ${PRICES[dayIndex].toFixed(0)}`;

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
                    <svg width="100%" height="260" viewBox={`0 0 ${chart.width} ${chart.height}`}>
                        <path d={chart.fullPath} fill="none" stroke="#dfe6e9" strokeWidth="3" />
                        <path d={chart.visiblePath} fill="none" stroke="#0984e3" strokeWidth="3" />
                        {chart.points.map((point, index) => {
                            const isActive = index === dayIndex;
                            const isVisible = index <= dayIndex;
                            return (
                                <circle
                                    key={`point-${index}`}
                                    cx={point.x}
                                    cy={point.y}
                                    r={isActive ? 7 : 4}
                                    fill={isActive ? '#0984e3' : isVisible ? '#74b9ff' : '#b2bec3'}
                                />
                            );
                        })}
                    </svg>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontWeight: 600 }}>
                        <div>{dayText}</div>
                        <div>{trendLabel}</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600 }}>
                            {t.dayLabel}
                            <input
                                type="range"
                                min={0}
                                max={PRICES.length - 1}
                                value={dayIndex}
                                onChange={(event) => setDayIndex(Number(event.target.value))}
                            />
                            <span style={{ fontVariantNumeric: 'tabular-nums' }}>
                                {dayIndex + 1}/{PRICES.length}
                            </span>
                        </label>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontWeight: 600 }}>{t.windowLabel}</span>
                            {[3, 5].map((size) => {
                                const isActive = size === windowSize;
                                return (
                                    <button
                                        key={`window-${size}`}
                                        type="button"
                                        onClick={() => setWindowSize(size)}
                                        aria-pressed={isActive}
                                        style={{
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '999px',
                                            border: '1px solid #b2bec3',
                                            backgroundColor: isActive ? '#0984e3' : '#ffffff',
                                            color: isActive ? '#ffffff' : '#2d3436',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {size}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>{t.title}</h3>
                <ul>
                    {t.bullets.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </ExplainPanel>
        </>
    );
};
