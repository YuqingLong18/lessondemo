import React, { useState, useRef, useEffect } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';

// Larger 9x9 Pattern: Cross + Isolated Point
// Updated Grid: Vertical line at col 4. Horizontal at row 4. Isolated point at [7,7].
const GRID_9x9 = Array(9).fill(0).map(() => Array(9).fill(0));
// Vertical Line
for (let r = 0; r < 9; r++) GRID_9x9[r][4] = 10;
// Horizontal Line
for (let c = 0; c < 9; c++) GRID_9x9[4][c] = 10;
// Isolated Point
GRID_9x9[7][7] = 10;
GRID_9x9[4][4] = 10; // Intersection explicitly set (already 10)

const KERNELS = [
    {
        name: 'Vertical Edge',
        desc: 'Detects vertical lines',
        threshold: 20, // Sum can be 30
        matrix: [
            [-1, 0, 1],
            [-1, 0, 1],
            [-1, 0, 1],
        ]
    },
    {
        name: 'Horizontal Edge',
        desc: 'Detects horizontal lines',
        threshold: 20,
        matrix: [
            [-1, -1, -1],
            [0, 0, 0],
            [1, 1, 1],
        ]
    },
    {
        name: 'Point / Corner',
        desc: 'Detects isolated points',
        threshold: 70, // Lines are 60, Isolated is 80 (perfect match)
        matrix: [
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1],
        ]
    }
];

const CELL_SIZE = 36;
const GAP = 2;
const TOTAL_CELL_SIZE = CELL_SIZE + GAP;

export const Slide3_KernelScanning: React.FC = () => {
    const [kernelPos, setKernelPos] = useState({ r: 0, c: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [activeKernelIndex, setActiveKernelIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Input 9x9, Kernel 3x3 -> Output 7x7
    const outputGridSize = 7;
    const activeKernel = KERNELS[activeKernelIndex];

    const calculateConvolution = (r: number, c: number) => {
        let sum = 0;
        for (let kr = 0; kr < 3; kr++) {
            for (let kc = 0; kc < 3; kc++) {
                sum += GRID_9x9[r + kr][c + kc] * activeKernel.matrix[kr][kc];
            }
        }
        return sum;
    };

    const currentResult = calculateConvolution(kernelPos.r, kernelPos.c);

    // Drag Logic
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Simple snapping logic
            // We want the top-left of the kernel (3x3 blocks) to snap
            // Range for r,c is 0 to 6
            let c = Math.floor(x / TOTAL_CELL_SIZE) - 1; // Offset center
            let r = Math.floor(y / TOTAL_CELL_SIZE) - 1;

            // Clamp
            c = Math.max(0, Math.min(outputGridSize - 1, c));
            r = Math.max(0, Math.min(outputGridSize - 1, r));

            setKernelPos({ r, c });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', userSelect: 'none' }}>
                    {/* INPUT GRID */}
                    <div>
                        <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Input Image (9x9)</h4>
                        <div style={{ position: 'relative' }} ref={containerRef}>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: `repeat(9, ${CELL_SIZE}px)`,
                                    gap: `${GAP}px`,
                                    padding: '4px', // padding for drag boundary
                                }}
                            >
                                {GRID_9x9.map((row, r) =>
                                    row.map((val, c) => (
                                        <div
                                            key={`in-${r}-${c}`}
                                            style={{
                                                width: `${CELL_SIZE}px`,
                                                height: `${CELL_SIZE}px`,
                                                backgroundColor: val > 0 ? '#b2bec3' : '#dfe6e9',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '0.7rem',
                                                color: '#636e72',
                                                borderRadius: '2px'
                                            }}
                                        >
                                            {val}
                                        </div>
                                    ))
                                )}
                            </div>
                            {/* Sliding Window Overlay */}
                            <div
                                onMouseDown={handleMouseDown}
                                style={{
                                    position: 'absolute',
                                    top: `${kernelPos.r * TOTAL_CELL_SIZE + 4}px`, // +4 for container padding
                                    left: `${kernelPos.c * TOTAL_CELL_SIZE + 4}px`,
                                    width: `${3 * CELL_SIZE + 2 * GAP}px`,
                                    height: `${3 * CELL_SIZE + 2 * GAP}px`,
                                    border: '3px solid #0984e3',
                                    backgroundColor: 'rgba(9, 132, 227, 0.2)',
                                    cursor: isDragging ? 'grabbing' : 'grab',
                                    transition: isDragging ? 'none' : 'top 0.1s, left 0.1s', // Smooth snap when not dragging
                                    zIndex: 10,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#0984e3',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    textShadow: '0 0 2px white',
                                }}
                            >
                                DRAG ME
                            </div>
                        </div>
                    </div>

                    {/* OPERATION TEXT */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#b2bec3'
                    }}>
                        <div style={{ fontSize: '1.5rem' }}>➡</div>
                        <div style={{ fontSize: '0.8rem', width: '80px', textAlign: 'center', lineHeight: 1.2 }}>convolution operation</div>
                    </div>

                    {/* KERNEL SELECTION */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Kernel</h4>

                        {/* Tabs */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                            {KERNELS.map((k, idx) => (
                                <button
                                    key={k.name}
                                    onClick={() => setActiveKernelIndex(idx)}
                                    style={{
                                        padding: '0.3rem 0.6rem',
                                        fontSize: '0.7rem',
                                        border: '1px solid #b2bec3',
                                        borderRadius: '4px',
                                        backgroundColor: activeKernelIndex === idx ? '#0984e3' : 'white',
                                        color: activeKernelIndex === idx ? 'white' : '#636e72',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {k.name}
                                </button>
                            ))}
                        </div>

                        {/* Matrix Visual */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 30px)',
                                gap: '2px',
                                marginBottom: '0.5rem'
                            }}
                        >
                            {activeKernel.matrix.map((row, r) =>
                                row.map((val, c) => (
                                    <div
                                        key={`k-${r}-${c}`}
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            backgroundColor: '#fab1a0',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '0.7rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {val}
                                    </div>
                                ))
                            )}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#636e72', fontStyle: 'italic' }}>
                            {activeKernel.desc}
                        </div>
                    </div>

                    <div style={{ fontSize: '2rem', color: '#b2bec3' }}>=</div>

                    {/* OUTPUT GRID */}
                    <div>
                        <h4 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>Feature Map</h4>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${outputGridSize}, ${CELL_SIZE}px)`,
                                gap: `${GAP}px`,
                            }}
                        >
                            {Array.from({ length: outputGridSize }).map((_, r) =>
                                Array.from({ length: outputGridSize }).map((_, c) => {
                                    const isCurrent = r === kernelPos.r && c === kernelPos.c;
                                    const val = calculateConvolution(r, c);

                                    // Visual Feedback based on kernel-specific threshold
                                    let bg = '#ecf0f1';
                                    if (val >= activeKernel.threshold) bg = '#ffeaa7'; // Strong match
                                    else if (val <= -activeKernel.threshold) bg = '#dfe6e9'; // Strong negative logic if needed, but mostly positive matters for match

                                    if (isCurrent) bg = '#74b9ff';

                                    return (
                                        <div
                                            key={`out-${r}-${c}`}
                                            // onClick={() => setKernelPos({ r, c })} 
                                            style={{
                                                width: `${CELL_SIZE}px`,
                                                height: `${CELL_SIZE}px`,
                                                backgroundColor: bg,
                                                border: isCurrent ? '2px solid #0984e3' : '1px solid #dfe6e9',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '0.8rem',
                                                fontWeight: isCurrent ? 'bold' : 'normal',
                                                transition: 'background-color 0.1s',
                                                color: isCurrent ? '#fff' : '#2d3436',
                                                transform: isCurrent ? 'scale(1.1)' : 'scale(1)',
                                                zIndex: isCurrent ? 5 : 0,
                                                boxShadow: isCurrent ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
                                            }}
                                        >
                                            {val}
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* MATH EXPLANATION */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '20px',
                        backgroundColor: '#fff',
                        padding: '1rem',
                        borderRadius: '8px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        fontFamily: 'monospace',
                        pointerEvents: 'none', // pass through
                        opacity: 0.9,
                    }}
                >
                    <strong>Operation:</strong> Dot Product <br />
                    Result: {currentResult} {currentResult >= activeKernel.threshold ? '🔥 Match!' : ''}
                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>3. The "Kernel" Scan</h3>
                <ul>
                    <li>The input image contains vertical, horizontal, and point features.</li>
                    <li><strong>Choose a Kernel</strong> to tell the scanner what to look for. (Vertical, Horizontal, or Corner).</li>
                    <li><strong>Drag the blue box</strong> to scan the image.</li>
                    <li>Notice: The "Point" kernel now <strong>ignores</strong> lines and looks only for the isolated dot!</li>
                </ul>
            </ExplainPanel>
        </>
    );
};
