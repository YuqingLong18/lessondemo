import React, { useEffect, useRef, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';

const KERNELS = {
    Identity: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
    ],
    'Vertical Edge': [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1],
    ],
    'Horizontal Edge': [
        [-1, -2, -1],
        [0, 0, 0],
        [1, 2, 1],
    ],
    Sharpen: [
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0],
    ],
    Emboss: [
        [-2, -1, 0],
        [-1, 1, 1],
        [0, 1, 2],
    ],
};

export const Slide4_FilterGallery: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<keyof typeof KERNELS>('Identity');
    const canvasRef = useRef<HTMLCanvasElement>(null);


    // Better approach: Store original image data
    const [originalData, setOriginalData] = useState<ImageData | null>(null);

    useEffect(() => {
        // Generate Image Once
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 300;
        tempCanvas.height = 300;
        const ctx = tempCanvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = '#ecf0f1';
            ctx.fillRect(0, 0, 300, 300);
            ctx.fillStyle = '#2d3436';
            ctx.fillRect(50, 100, 200, 20); // Horiz
            ctx.fillRect(140, 50, 20, 200); // Vert
            ctx.beginPath();
            ctx.arc(220, 220, 40, 0, Math.PI * 2);
            ctx.fill();
            setOriginalData(ctx.getImageData(0, 0, 300, 300));
        }
    }, []);

    useEffect(() => {
        if (!originalData || !canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;

        if (activeFilter === 'Identity') {
            ctx.putImageData(originalData, 0, 0);
            return;
        }

        const src = originalData.data;
        const w = originalData.width;
        const h = originalData.height;
        const outputImg = ctx.createImageData(w, h);
        const dst = outputImg.data;
        const kernel = KERNELS[activeFilter];

        for (let y = 1; y < h - 1; y++) {
            for (let x = 1; x < w - 1; x++) {
                let r = 0, g = 0, b = 0;
                for (let ky = 0; ky < 3; ky++) {
                    for (let kx = 0; kx < 3; kx++) {
                        const idx = ((y + ky - 1) * w + (x + kx - 1)) * 4;
                        r += src[idx] * kernel[ky][kx];
                        g += src[idx + 1] * kernel[ky][kx];
                        b += src[idx + 2] * kernel[ky][kx];
                    }
                }
                const i = (y * w + x) * 4;
                if (activeFilter.includes('Edge')) {
                    dst[i] = Math.abs(r);
                    dst[i + 1] = Math.abs(g);
                    dst[i + 2] = Math.abs(b);
                } else {
                    dst[i] = r;
                    dst[i + 1] = g;
                    dst[i + 2] = b;
                }
                dst[i + 3] = 255;
            }
        }
        ctx.putImageData(outputImg, 0, 0);

    }, [activeFilter, originalData]);


    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {Object.keys(KERNELS).map((k) => (
                            <button
                                key={k}
                                onClick={() => setActiveFilter(k as any)}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    border: '1px solid #dfe6e9',
                                    borderRadius: '4px',
                                    backgroundColor: activeFilter === k ? '#0984e3' : '#fff',
                                    color: activeFilter === k ? '#fff' : '#2d3436',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    textAlign: 'left',
                                }}
                            >
                                {k}
                            </button>
                        ))}
                    </div>

                    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <canvas ref={canvasRef} width={300} height={300} />
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>4. Different Kernels = Different Features</h3>
                <ul>
                    <li>We can change the numbers in the kernel to find different things.</li>
                    <li>Some kernels find <strong>vertical edges</strong>, some find <strong>horizontal lines</strong>.</li>
                    <li><strong>Interact:</strong> Try the buttons to see how different kernels transform the image.</li>
                </ul>
            </ExplainPanel>
        </>
    );
};
