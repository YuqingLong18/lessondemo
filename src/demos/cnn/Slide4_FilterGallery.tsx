import React, { useEffect, useRef, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
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

type FilterKey = keyof typeof KERNELS;

const FILTER_LABELS: Record<FilterKey, { en: string; zh: string }> = {
    Identity: { en: 'Identity', zh: '原图' },
    'Vertical Edge': { en: 'Vertical Edge', zh: '垂直边缘' },
    'Horizontal Edge': { en: 'Horizontal Edge', zh: '水平边缘' },
    Sharpen: { en: 'Sharpen', zh: '锐化' },
    Emboss: { en: 'Emboss', zh: '浮雕' },
};

const copy = {
    en: {
        selectFilter: 'Select a Filter',
        uploadPhoto: '📸 Upload Your Photo',
        resizedNote: '(Resized to 300x300)',
        currentFilter: 'Current Filter:',
        title: '4. Filter Gallery',
        bullets: [
            <><strong>Convolution</strong> applies a kernel to every pixel.</>,
            <><strong>Edge Detection:</strong> Finds sudden changes in brightness.</>,
            <><strong>Blur:</strong> Averages neighbors to smooth things out.</>,
            <><strong>Sharpen:</strong> Enhances differences between neighbors.</>,
            <><strong>Try Uploading:</strong> See how these math operations look on your own photos!</>,
        ],
    },
    zh: {
        selectFilter: '选择滤镜',
        uploadPhoto: '📸 上传你的照片',
        resizedNote: '（已缩放到 300x300）',
        currentFilter: '当前滤镜：',
        title: '4. 滤镜画廊',
        bullets: [
            <><strong>卷积</strong>把卷积核应用到每个像素。</>,
            <><strong>边缘检测：</strong>发现亮度的突变。</>,
            <><strong>模糊：</strong>对邻域取平均以平滑。</>,
            <><strong>锐化：</strong>增强邻近像素之间的差异。</>,
            <><strong>尝试上传：</strong>看看这些运算在你的照片上是什么效果！</>,
        ],
    },
};

export const Slide4_FilterGallery: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<FilterKey>('Identity');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { language } = useLanguage();
    const t = copy[language];
    const filterKeys = Object.keys(KERNELS) as FilterKey[];


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
                        <h3>{t.selectFilter}</h3>
                        {filterKeys.map((filterName) => (
                            <button
                                key={filterName}
                                onClick={() => setActiveFilter(filterName)}
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
                                {FILTER_LABELS[filterName][language]}
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
                                {t.uploadPhoto}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            <div style={{ fontSize: '0.7rem', color: '#b2bec3', marginTop: '4px', textAlign: 'center' }}>
                                {t.resizedNote}
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
                            {t.currentFilter} <strong>{FILTER_LABELS[activeFilter][language]}</strong>
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
