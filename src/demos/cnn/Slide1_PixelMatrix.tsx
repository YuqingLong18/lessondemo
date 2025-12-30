import React, { useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';

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

export const Slide1_PixelMatrix: React.FC = () => {
    const [grid, setGrid] = useState<number[][]>(INITIAL_GRID);

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
                <h3>1. Images are Matrices</h3>
                <ul>
                    <li>Computers don't "see" shapes. They see a <strong>grid of numbers</strong>.</li>
                    <li>In a grayscale image, each pixel is a number representing brightness (0-255).</li>
                    <li><strong>Interact:</strong> Click the pixels to change the image and see the numbers update.</li>
                </ul>
            </ExplainPanel>
        </>
    );
};
