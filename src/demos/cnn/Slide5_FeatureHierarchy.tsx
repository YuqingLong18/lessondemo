import React, { useState, useEffect } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';
import cuteDogImg from '../../assets/cute_dog.png';
import cuteCatImg from '../../assets/cute_cat.png';

// Import Feature Assets
import featEdges from '../../assets/feat_edges.png';
import featCatEar from '../../assets/feat_cat_ear.png';
import featDogEar from '../../assets/feat_dog_ear.png';
import featCatShape from '../../assets/feat_cat_shape.png';
import featDogShape from '../../assets/feat_dog_shape.png';

type InputType = 'cat' | 'dog';

const copy = {
    en: {
        catInput: 'Cat Input 🐱',
        dogInput: 'Dog Input 🐶',
        input: 'Input',
        simpleFeatures: 'Simple Features',
        partialFeatures: 'Partial Features',
        highLevelFeatures: 'High Level Features',
        output: 'Output',
        cat: 'Cat',
        dog: 'Dog',
        catEars: 'Cat Ears',
        dogEars: 'Dog Ears',
        title: '5. Feature Hierarchy',
        bullets: (earLabel: string, classLabel: string) => [
            <>
                <strong>Simple Features</strong>: The first layers detect fuzzy edges and lines (shown as abstract sketches).
            </>,
            <>
                <strong>Partial Features</strong>: Deeper layers combine these into recognizable parts like <strong>{earLabel}</strong>.
            </>,
            <>
                <strong>High Level Features</strong>: The final layers see the whole shape, ready to classify it as a <strong>{classLabel}</strong>!
            </>,
        ],
    },
    zh: {
        catInput: '猫输入 🐱',
        dogInput: '狗输入 🐶',
        input: '输入',
        simpleFeatures: '简单特征',
        partialFeatures: '局部特征',
        highLevelFeatures: '高层特征',
        output: '输出',
        cat: '猫',
        dog: '狗',
        catEars: '猫耳',
        dogEars: '狗耳',
        title: '5. 特征层级',
        bullets: (earLabel: string, classLabel: string) => [
            <>
                <strong>简单特征</strong>：前几层检测模糊的边缘和线条（以抽象草图表示）。
            </>,
            <>
                <strong>局部特征</strong>：更深层把这些组合成可识别的部件，如<strong>{earLabel}</strong>。
            </>,
            <>
                <strong>高层特征</strong>：最后几层看到整体形状，准备将其分类为<strong>{classLabel}</strong>！
            </>,
        ],
    },
};

export const Slide5_FeatureHierarchy: React.FC = () => {
    const [input, setInput] = useState<InputType>('cat');
    const [activeStage, setActiveStage] = useState(0); // 0: Input, 1: Simple, 2: Partial, 3: High, 4: Out
    const { language } = useLanguage();
    const t = copy[language];

    useEffect(() => {
        const timers = [600, 1200, 1800, 2400].map((delay, index) =>
            window.setTimeout(() => setActiveStage(index + 1), delay)
        );

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
        };
    }, [input]);

    const handleInputChange = (nextInput: InputType) => {
        setActiveStage(0);
        setInput(nextInput);
    };

    const currentImg = input === 'cat' ? cuteCatImg : cuteDogImg;
    const earLabel = input === 'cat' ? t.catEars : t.dogEars;
    const classLabel = input === 'cat' ? t.cat : t.dog;
    const bullets = t.bullets(earLabel, classLabel);

    // Perspectve container style
    const stageStyle: React.CSSProperties = {
        perspective: '1000px',
        width: '100%',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    };

    // The main 3D axis - tilted (POLISHED: Steeper angles, wider gap)
    const axisStyle: React.CSSProperties = {
        transformStyle: 'preserve-3d',
        transform: 'rotateY(-25deg) rotateX(20deg)',
        display: 'flex',
        alignItems: 'center',
        gap: '120px',
    };

    // Helper to render a layer of feature maps
    const renderLayer = (
        name: string,
        count: number,
        size: number,
        stageIndex: number,
        offsetStep: number,
        featureImg: string
    ) => {
        const isActive = activeStage >= stageIndex;
        // POLISHED: Increased offset spacing for clearer separation
        const adjustedOffsetStr = (i: number) => `translateZ(${i * (offsetStep * 1.5)}px)`;

        return (
            <div style={{ position: 'relative', width: size, height: size, transformStyle: 'preserve-3d' }}>
                <div
                    style={{
                        position: 'absolute',
                        top: -60, // POLISHED: Moved higher
                        width: '200px',
                        left: '50%',
                        marginLeft: '-100px',
                        textAlign: 'center',
                        fontSize: '0.9rem',
                        color: isActive ? '#2d3436' : '#b2bec3',
                        fontWeight: 'bold',
                        transform: 'translateY(-20px)',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {name}
                </div>
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backgroundColor: isActive ? 'white' : 'rgba(178, 190, 195, 0.3)',
                            border: `1px solid ${isActive ? '#0984e3' : '#636e72'}`,
                            transform: adjustedOffsetStr(i),
                            transition: 'all 0.5s',
                            boxShadow: isActive ? '5px 5px 15px rgba(9, 132, 227, 0.15)' : 'none', // POLISHED: Better shadow
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Show specific feature asset */}
                        {isActive && (
                            <img
                                src={featureImg}
                                style={{
                                    width: '90%',
                                    height: '90%',
                                    objectFit: 'contain',
                                    opacity: 0.9,
                                }}
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>

                    {/* Controls */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', zIndex: 10 }}>
                        <button
                            onClick={() => handleInputChange('cat')}
                            style={{
                                padding: '0.6rem 1.2rem',
                                border: input === 'cat' ? '2px solid #e17055' : '1px solid #dfe6e9',
                                borderRadius: '8px',
                                backgroundColor: input === 'cat' ? '#ffeaa7' : '#fff',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                boxShadow: input === 'cat' ? '0 4px 10px rgba(225, 112, 85, 0.3)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            {t.catInput}
                        </button>
                        <button
                            onClick={() => handleInputChange('dog')}
                            style={{
                                padding: '0.6rem 1.2rem',
                                border: input === 'dog' ? '2px solid #0984e3' : '1px solid #dfe6e9',
                                borderRadius: '8px',
                                backgroundColor: input === 'dog' ? '#74b9ff' : '#fff',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                boxShadow: input === 'dog' ? '0 4px 10px rgba(9, 132, 227, 0.3)' : 'none',
                                transition: 'all 0.2s'
                            }}
                        >
                            {t.dogInput}
                        </button>
                    </div>

                    <div style={stageStyle}>
                        <div style={axisStyle}>

                            {/* 1. INPUT IMAGE */}
                            <div style={{
                                width: '100px',
                                height: '100px',
                                transform: 'translateZ(20px)',
                                transition: 'all 0.5s',
                                opacity: activeStage >= 0 ? 1 : 0.5
                            }}>
                                <div style={{ marginBottom: '10px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold', transform: 'translateY(-10px)' }}>{t.input}</div>
                                <img
                                    src={currentImg}
                                    style={{ width: '100%', height: '100%', border: '3px solid #2d3436', borderRadius: '4px', backgroundColor: 'white', boxShadow: '5px 5px 15px rgba(0,0,0,0.2)' }}
                                />
                            </div>

                            {/* 2. Simple Features (Edges) */}
                            {renderLayer(t.simpleFeatures, 6, 80, 1, 15, featEdges)}

                            {/* 3. Partial Features (Ears) */}
                            {renderLayer(t.partialFeatures, 6, 50, 2, 10, input === 'cat' ? featCatEar : featDogEar)}

                            {/* 4. High Level Features (Shapes) */}
                            {renderLayer(t.highLevelFeatures, 10, 30, 3, 6, input === 'cat' ? featCatShape : featDogShape)}

                            {/* 5. OUTPUT: Fully Connected */}
                            <div style={{
                                width: '80px',
                                height: '100px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                gap: '10px',
                                transform: 'rotateY(15deg)',
                                marginLeft: '20px'
                            }}>
                                <div style={{ textAlign: 'center', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '5px' }}>{t.output}</div>

                                {/* Cat Prob */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span style={{ fontSize: '1rem' }}>🐱</span>
                                    <div style={{
                                        flex: 1, height: '10px', background: '#dfe6e9', borderRadius: '2px', overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: activeStage >= 4 && input === 'cat' ? '95%' : '10%',
                                            height: '100%',
                                            background: '#e17055',
                                            transition: 'width 0.5s'
                                        }} />
                                    </div>
                                </div>

                                {/* Dog Prob */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span style={{ fontSize: '1rem' }}>🐶</span>
                                    <div style={{
                                        flex: 1, height: '10px', background: '#dfe6e9', borderRadius: '2px', overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: activeStage >= 4 && input === 'dog' ? '98%' : '10%',
                                            height: '100%',
                                            background: '#0984e3',
                                            transition: 'width 0.5s'
                                        }} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>{t.title}</h3>
                <ul>
                    {bullets.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </ExplainPanel>
        </>
    );
};
