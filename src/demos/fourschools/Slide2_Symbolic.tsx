import React, { useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { Sun, CloudRain, Cloud, Droplets, ArrowRight } from 'lucide-react';

export const Slide2_Symbolic: React.FC = () => {
    const [isCloudy, setIsCloudy] = useState(false);
    const [isHumid, setIsHumid] = useState(false);

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
                            <span className="mt-2 font-mono text-sm">Fact: Cloudy</span>
                            <div className={`mt-2 px-2 py-1 text-xs rounded ${isCloudy ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                {isCloudy ? 'TRUE' : 'FALSE'}
                            </div>
                        </div>

                        <div
                            className={`flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${isHumid ? 'bg-blue-100 border-blue-500' : 'bg-white border-dashed border-gray-300'}`}
                            onClick={() => setIsHumid(!isHumid)}
                        >
                            <Droplets size={40} className={isHumid ? 'text-blue-600' : 'text-gray-300'} />
                            <span className="mt-2 font-mono text-sm">Fact: Humid</span>
                            <div className={`mt-2 px-2 py-1 text-xs rounded ${isHumid ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                                {isHumid ? 'TRUE' : 'FALSE'}
                            </div>
                        </div>
                    </div>

                    {/* Inference Engine */}
                    <div className="flex items-center gap-4">
                        <div className="w-1 h-12 border-l-2 border-r-2 border-gray-300"></div>
                        <div className="w-1 h-12 border-l-2 border-r-2 border-gray-300"></div>
                    </div>

                    <div className={`relative p-6 border-4 rounded-xl transition-all duration-500 ${ruleActive ? 'border-green-500 bg-green-50 shadow-xl scale-105' : 'border-gray-300 bg-white'}`}>
                        <div className="absolute -top-3 left-4 bg-white px-2 text-sm font-bold text-gray-500">KNOWLEDGE BASE</div>
                        <p className="font-mono text-lg text-center">
                            <span className="text-purple-600 font-bold">IF</span> (Cloudy <span className="text-red-500">&</span> Humid) <br />
                            <span className="text-purple-600 font-bold">THEN</span> (Rain)
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
                        <span className="mt-4 font-bold text-lg">{ruleActive ? 'Inference: RAIN' : 'No Inference'}</span>
                    </div>

                </div>
            </ConceptStage>
            <ExplainPanel>
                {`
- **Symbolic AI** (Good Old-Fashioned AI) relies on explicit rules.
- Humans define the symbols ("Cloudy", "Humid") and the logic.
- **Interact**: Click the "Facts" above. Notice how the logic works perfectly, but only for exactly what we defined.
- *Limitation*: If we change "Cloudy" to "Overcast", the rule breaks!
`}
            </ExplainPanel>
        </div>
    );
};
