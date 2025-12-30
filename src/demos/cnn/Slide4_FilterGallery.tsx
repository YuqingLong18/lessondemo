import React, { useEffect, useRef, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import cuteDogImg from '../../assets/cute_dog.png';

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

    // Load Image
    useEffect(() => {
        const img = new Image();
        img.src = cuteDogImg;
        img.onload = () => {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 300;
            tempCanvas.height = 300;
            const ctx = tempCanvas.getContext('2d');
            if (ctx) {
                // Draw image to fit 300x300
                ctx.drawImage(img, 0, 0, 300, 300);
                setOriginalData(ctx.getImageData(0, 0, 300, 300));
            }
        };
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = 300;
                tempCanvas.height = 300;
                const ctx = tempCanvas.getContext('2d');
                if (ctx) {
                    ctx.drawImage(img, 0, 0, 300, 300);
                    setOriginalData(ctx.getImageData(0, 0, 300, 300));
                    setActiveFilter('Identity'); // Reset filter to show raw image first
                }
            };
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>

                    {/* Controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '180px' }}>
                        <h3>Select a Filter</h3>
                        {Object.keys(KERNELS).map((filterName) => (
                            <button
                                key={filterName}
                                onClick={() => setActiveFilter(filterName as keyof typeof KERNELS)}
                                style={{
                                    padding: '0.5rem',
                                    backgroundColor: activeFilter === filterName ? '#0984e3' : 'white',
                                    color: activeFilter === filterName ? 'white' : '#2d3436',
                                    border: '1px solid #dfe6e9',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {filterName}
                            </button>
                        ))}

                        <div style={{ marginTop: '1rem', borderTop: '1px solid #ecf0f1', paddingTop: '1rem' }}>
                            <label
                                style={{
                                    display: 'block',
                                    padding: '0.5rem',
                                    backgroundColor: '#6c5ce7',
                                    color: 'white',
                                    textAlign: 'center',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem'
                                }}
                            >
                                📸 Upload Your Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            <div style={{ fontSize: '0.7rem', color: '#b2bec3', marginTop: '4px', textAlign: 'center' }}>
                                (Resized to 300x300)
                            </div>
                        </div>
                    </div>

                    {/* Canvas */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <canvas
                            ref={canvasRef}
                            width={300}
                            height={300}
                            style={{
                                border: '4px solid #2d3436',
                                borderRadius: '4px',
                                boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                backgroundColor: '#fff'
                            }}
                        />
                        <div style={{ marginTop: '1rem', color: '#636e72' }}>
                            Current Filter: <strong>{activeFilter}</strong>
                        </div>
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>4. Filter Gallery</h3>
                <ul>
                    <li><strong>Convolution</strong> applies a kernel to every pixel.</li>
                    <li><strong>Edge Detection:</strong> Finds sudden changes in brightness.</li>
                    <li><strong>Blur:</strong> Averages neighbors to smooth things out.</li>
                    <li><strong>Sharpen:</strong> Enhances differences between neighbors.</li>
                    <li><strong>Try Uploading:</strong> See how these math operations look on your own photos!</li>
                </ul>
            </ExplainPanel>
        </>
    );
};
