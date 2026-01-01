import React, { useState, useEffect, useRef } from 'react';
import { RefreshCcw, Play, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../../components/core/LanguageContext';

export const Module2_LearningRate: React.FC = () => {
    const { language } = useLanguage();
    // Learning Rate: 1 = baby steps, 5 = optimal, 10 = overshoot
    const [learningRate, setLearningRate] = useState(5);
    const [widgetPosition, setWidgetPosition] = useState(0); // -100 (left top) to 0 (bottom) to 100 (right top)
    const [history, setHistory] = useState<number[]>([]);
    const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
    const [message, setMessage] = useState('');
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Initial position high on the left
    const START_POS = -90;

    useEffect(() => {
        resetSimulation();
    }, []);

    const resetSimulation = () => {
        setWidgetPosition(START_POS);
        setHistory([START_POS]);
        setStatus('idle');
        setMessage(language === 'zh' ? '调整滑块以设置学习率，然后点击“开始”！' : 'Adjust the slider to set the Learning Rate, then click GO!');
    };

    const runSimulation = async () => {
        if (status === 'running') return;
        setStatus('running');
        setHistory([START_POS]);
        let currentPos = START_POS;
        let steps = 0;
        const maxSteps = 10;
        const delay = 600;

        // Determine outcome based on LR
        // Small LR (1-3): Too slow
        // Good LR (4-6): Converges
        // Large LR (7-10): Overshoots/Diverges

        const visualizeStep = async () => {
            if (steps >= maxSteps) return;
            steps++;

            // Simple gradient logic simulation relative to LR
            // Gradient is practically just -sign(pos) * steepness
            // Let's model the valley as y = x^2, so gradient = 2x
            // update: x_new = x - lr * gradient
            // We need to scale this to be "perceptually" correct for the demo

            // Simplified demo logic:
            let move = 0;
            if (learningRate <= 3) {
                // Baby steps
                move = 15; // Move slightly towards 0
                currentPos = currentPos + move;
            } else if (learningRate >= 7) {
                // Overshoot
                // If on left (-), move huge to right (+), maybe even further out
                move = Math.abs(currentPos) * 1.5 + (learningRate * 2);
                currentPos = currentPos + move; // Jump to other side

                // If we went from -90 to +something huge, next step goes back to -something huger
                // But for simple "ping pong" effect
                if (currentPos > 100) currentPos = -95; // Bounce back hard
                else if (currentPos < -100) currentPos = 95;
            } else {
                // Just Right
                // Moves proportional to distance to 0, converging
                move = Math.abs(currentPos) * (0.4 + (learningRate * 0.05));
                currentPos = currentPos + move;
                // Clamp close to 0
                if (Math.abs(currentPos) < 5) currentPos = 0;
            }

            setWidgetPosition(currentPos);
            setHistory(prev => [...prev, currentPos]);

            // Check end conditions
            if (Math.abs(currentPos) < 5) {
                setStatus('success');
                setMessage(language === 'zh' ? '完美！这就是**学习率**。' : 'Perfect! This is the **Learning Rate**.');
                return;
            }

            if (learningRate <= 3 && steps === 5) {
                setStatus('failed');
                setMessage(language === 'zh' ? '太慢了！按这个速度，Widget在学会什么是猫之前就已经过时了。' : 'Too slow! At this rate, Widget will be obsolete before he learns what a cat is.');
                return;
            }

            if (learningRate >= 7 && steps === 4) {
                setStatus('failed');
                setMessage(language === 'zh' ? '哎呀！你冲过头了。如果学习率太高，你就会永远来回跳跃。' : 'Oops! You overshot. If your Learning Rate is too high, you\'ll just bounce back and forth forever.');
                return;
            }

            setTimeout(visualizeStep, delay);
        };

        visualizeStep();
    };


    // Drawing the curve and widget
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const centerY = height - 50;
        const centerX = width / 2;

        ctx.clearRect(0, 0, width, height);

        // Draw Valley Curve
        ctx.beginPath();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 4;
        for (let x = -centerX; x <= centerX; x += 5) {
            // Parabola: y = x^2 / scale
            const y = (x * x) / 300;
            if (y > height) continue;
            ctx.lineTo(centerX + x, centerY - y);
        }
        ctx.stroke();

        // Draw Target Zone
        ctx.fillStyle = 'rgba(74, 222, 128, 0.2)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
        ctx.fill();


        // Draw History Path
        if (history.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            history.forEach((pos, i) => {
                const x = (pos / 100) * (centerX - 40); // Scale position to canvas width (padded)
                const y = (x * x) / 300;
                if (i === 0) ctx.moveTo(centerX + x, centerY - y);
                else ctx.lineTo(centerX + x, centerY - y);
            });
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw Widget
        const widgetX = (widgetPosition / 100) * (centerX - 40);
        const widgetY = (widgetX * widgetX) / 300;

        // Draw Widget Body
        const screenX = centerX + widgetX;
        const screenY = centerY - widgetY;

        ctx.save();
        ctx.translate(screenX, screenY);
        // Bobbing animation if running
        if (status === 'running') {
            ctx.rotate(Math.sin(Date.now() / 100) * 0.1);
        }

        ctx.fillStyle = widgetPosition === 0 ? '#22c55e' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(0, -15, 15, 0, Math.PI * 2);
        ctx.fill();
        // Eyes
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(-5, -18, 4, 0, Math.PI * 2);
        ctx.arc(5, -18, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

    }, [widgetPosition, history, status]);


    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {language === 'zh' ? '金发姑娘的步伐 (学习率)' : 'The Goldilocks Steps (Learning Rate)'}
                    </h2>
                    <p className="text-gray-600">
                        {language === 'zh'
                            ? 'Widget找到了正确的方向（下坡）。现在他需要决定跳多远。'
                            : 'Widget has found the right direction (downhill). Now he needs to decide how hard to jump.'}
                    </p>
                </div>

                <div className="relative bg-gray-50 h-96 w-full flex items-center justify-center overflow-hidden">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={384}
                        className="w-full h-full object-contain"
                    />

                    {/* Status Overlay */}
                    {message && (
                        <div className={`absolute top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg font-medium animate-in fade-in slide-in-from-top-4 ${status === 'failed' ? 'bg-red-100 text-red-700' :
                            status === 'success' ? 'bg-green-100 text-green-700' :
                                'bg-white text-gray-600'
                            }`}>
                            <div className="flex items-center gap-2">
                                {status === 'failed' && <AlertTriangle size={20} />}
                                {status === 'success' && <CheckCircle2 size={20} />}
                                {status === 'idle' && <Info size={20} />}
                                {message}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 bg-white border-t border-gray-100">
                    <div className="mb-8">
                        <div className="flex justify-between text-sm font-bold text-gray-500 mb-2">
                            <span>{language === 'zh' ? '婴儿步 (太慢)' : 'Baby Steps'}</span>
                            <span>{language === 'zh' ? '超级跳躍 (太快)' : 'MEGA JUMP'}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={learningRate}
                            onChange={(e) => {
                                setLearningRate(parseInt(e.target.value));
                                resetSimulation();
                            }}
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            disabled={status === 'running' || status === 'success'}
                        />
                        <div className="text-center mt-2 text-gray-400 text-sm">
                            {language === 'zh' ? '跳跃力度 (学习率):' : 'JUMP POWER (Learning Rate):'} {learningRate}
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        {status !== 'idle' && (
                            <button
                                onClick={resetSimulation}
                                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold flex items-center gap-2 transition-all"
                            >
                                <RefreshCcw size={20} />
                                {language === 'zh' ? '重置' : 'Reset'}
                            </button>
                        )}

                        {(status === 'idle' || status === 'failed') && (
                            <button
                                onClick={runSimulation}
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                            >
                                <Play size={20} fill="currentColor" />
                                {language === 'zh' ? '开始！' : 'GO!'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
