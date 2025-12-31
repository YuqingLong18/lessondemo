import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { Sun, CloudRain, Cloud, Droplets, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../components/core/LanguageContext';

export const Slide2_Symbolic: React.FC = () => {
    const [isCloudy, setIsCloudy] = useState(false);
    const [isHumid, setIsHumid] = useState(false);
    const { language } = useLanguage();

    const t = {
        en: {
            factCloudy: 'Fact: Cloudy',
            factHumid: 'Fact: Humid',
            true: 'TRUE',
            false: 'FALSE',
            knowledgeBase: 'KNOWLEDGE BASE',
            ifLabel: 'IF',
            thenLabel: 'THEN',
            cloudy: 'Cloudy',
            humid: 'Humid',
            rain: 'Rain',
            inferenceRain: 'Inference: RAIN',
            noInference: 'No Inference',
            explain: `
- **Symbolic AI** (Good Old-Fashioned AI) relies on explicit rules.
- Humans define the symbols ("Cloudy", "Humid") and the logic.
- **Interact**: Click the "Facts" above. Notice how the logic works perfectly, but only for exactly what we defined.
- *Limitation*: If we change "Cloudy" to "Overcast", the rule breaks!
`
        },
        zh: {
            factCloudy: '事实：多云',
            factHumid: '事实：潮湿',
            true: '真',
            false: '假',
            knowledgeBase: '知识库',
            ifLabel: '如果',
            thenLabel: '那么',
            cloudy: '多云',
            humid: '潮湿',
            rain: '下雨',
            inferenceRain: '推理：下雨',
            noInference: '无推理',
            explain: `
- **符号主义 AI**（经典 AI）依赖显式规则。
- 人类定义符号（“多云”“潮湿”）和逻辑。
- **互动**：点击上方“事实”。注意规则对已定义的情形非常准确，但也非常受限。
- *局限*：如果把“多云”换成“阴天”，规则就失效了！
`
        },
    };
    const text = t[language];

    // The "Expert System" Logic
    const ruleActive = isCloudy && isHumid;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center h-full space-y-8 w-full">

                    {/* Input Layer */}
                    <div className="flex justify-center gap-12 w-full">
                        <div
                            className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${isCloudy ? 'bg-gray-200 border-gray-500' : 'bg-white border-dashed border-gray-300'}`}
                            onClick={() => setIsCloudy(!isCloudy)}
                        >
                            <Cloud size={40} className={isCloudy ? 'text-gray-700' : 'text-gray-300'} />
                            <span className="mt-2 font-mono text-sm">{text.factCloudy}</span>
                            <div className={`mt-2 px-2 py-1 text-xs rounded ${isCloudy ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                {isCloudy ? text.true : text.false}
                            </div>
                        </div>

                        <div
                            className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${isHumid ? 'bg-blue-100 border-blue-500' : 'bg-white border-dashed border-gray-300'}`}
                            onClick={() => setIsHumid(!isHumid)}
                        >
                            <Droplets size={40} className={isHumid ? 'text-blue-600' : 'text-gray-300'} />
                            <span className="mt-2 font-mono text-sm">{text.factHumid}</span>
                            <div className={`mt-2 px-2 py-1 text-xs rounded ${isHumid ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                {isHumid ? text.true : text.false}
                            </div>
                        </div>
                    </div>

                    {/* Inference Engine */}
                    <div className="flex items-center gap-4">
                        <div className="w-1 h-12 border-l-2 border-r-2 border-gray-300"></div>
                        <div className="w-1 h-12 border-l-2 border-r-2 border-gray-300"></div>
                    </div>

                    <div className={`relative p-6 border-4 rounded-xl transition-all duration-500 ${ruleActive ? 'border-green-500 bg-green-50 shadow-xl scale-105' : 'border-gray-300 bg-white'}`}>
                        <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold text-gray-500">{text.knowledgeBase}</div>
                        <p className="font-mono text-lg text-center">
                            <span className="text-purple-600 font-bold">{text.ifLabel}</span> ({text.cloudy} <span className="text-red-500">&</span> {text.humid}) <br />
                            <span className="text-purple-600 font-bold">{text.thenLabel}</span> ({text.rain})
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <ArrowRight size={32} className={`transition-all duration-300 ${ruleActive ? 'text-green-500 translate-y-1' : 'text-gray-300'}`} />
                    </div>

                    {/* Output */}
                    <div className={`flex flex-col items-center p-6 rounded-full transition-all duration-500 ${ruleActive ? 'bg-blue-100 scale-110' : 'bg-gray-50 opacity-50'}`}>
                        {ruleActive ? (
                            <CloudRain size={64} className="text-blue-600 animate-bounce" />
                        ) : (
                            <Sun size={64} className="text-yellow-400" />
                        )}
                        <span className="mt-4 font-bold text-lg">{ruleActive ? text.inferenceRain : text.noInference}</span>
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>
                {text.explain}
            </ExplainPanel>
        </div>
    );
};
