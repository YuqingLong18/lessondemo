import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const GRID_SIZE = 10;

// Initial smiley face pattern
const INITIAL_GRID = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const copy = {
    en: {
        title: '1. Images are Matrices',
        bullets: [
            <>Computers don&apos;t "see" shapes. They see a <strong>grid of numbers</strong>.</>,
            <>In a grayscale image, each pixel is a number representing brightness (0-255).</>,
            <>
                <strong>Interact:</strong> Click the pixels to change the image and see the numbers update.
            </>,
        ],
    },
    zh: {
        title: '1. 图像是矩阵',
        bullets: [
            <>计算机不会“看到”形状，它看到的是一张<strong>数字网格</strong>。</>,
            <>在灰度图中，每个像素是代表亮度的数字（0-255）。</>,
            <>
                <strong>互动：</strong>点击像素改变图像，并观察数字同步变化。
            </>,
        ],
    },
};

export const Slide1_PixelMatrix: React.FC = () => {
    const [grid, setGrid] = useState<number[][]>(INITIAL_GRID);
    const { language } = useLanguage();
    const t = copy[language];

    const togglePixel = (row: number, col: number) => {
        const newGrid = grid.map((r, rIndex) =>
            r.map((val, cIndex) => {
                if (rIndex === row && cIndex === col) {
                    return val === 0 ? 1 : 0;
                }
                return val;
            })
        );
        setGrid(newGrid);
    };

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 40px)`, gap: '2px' }}>
                    {grid.map((row, rIndex) =>
                        row.map((val, cIndex) => (
                            <div
                                key={`${rIndex}-${cIndex}`}
                                onClick={() => togglePixel(rIndex, cIndex)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: val === 1 ? '#2d3436' : '#dfe6e9',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem',
                                    color: val === 1 ? '#dfe6e9' : '#636e72',
                                    transition: 'background-color 0.2s',
                                    userSelect: 'none',
                                }}
                            >
                                {val === 1 ? 255 : 0}
                            </div>
                        ))
                    )}
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
