import React, { useMemo, useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';

const nodes = [
    { id: 'A', x: 70, y: 140, trueDist: 3 },
    { id: 'B', x: 210, y: 70, trueDist: 2 },
    { id: 'C', x: 210, y: 200, trueDist: 3 },
    { id: 'D', x: 340, y: 40, trueDist: 1 },
    { id: 'E', x: 330, y: 170, trueDist: 2 },
    { id: 'F', x: 420, y: 210, trueDist: 1 },
    { id: 'G', x: 470, y: 120, trueDist: 0 },
];

const edges = [
    ['A', 'B'],
    ['A', 'C'],
    ['B', 'D'],
    ['C', 'D'],
    ['D', 'G'],
    ['C', 'E'],
    ['E', 'F'],
    ['F', 'G'],
];

const misleading = {
    A: 4,
    B: 3.6,
    C: 2.2,
    D: 1.2,
    E: 3.8,
    F: 2.5,
    G: 0,
};

export const Slide4_HeuristicSearch: React.FC = () => {
    const { language } = useLanguage();
    const [accuracy, setAccuracy] = useState(70);
    const [open, setOpen] = useState<string[]>(['A']);
    const [expanded, setExpanded] = useState<string[]>([]);
    const [found, setFound] = useState(false);

    const t = {
        en: {
            heuristic: 'Heuristic accuracy',
            expand: 'Expand Next Node',
            reset: 'Reset Search',
            start: 'Start',
            goal: 'Goal',
            expanded: 'Expanded',
            frontier: 'Frontier',
            estimate: 'h = estimated distance to the goal',
            aim: 'Goal: reach G with the fewest expansions',
            decision: 'Decision rule',
            decisionLine1: 'Pick the frontier node with the smallest h.',
            decisionLine2: 'Orange = frontier (not expanded yet).',
            decisionLine3: 'Blue = expanded (already explored).',
            nextPick: 'Next pick',
            expandedCount: 'Expanded',
            success: 'Success when G is expanded.',
            explain: `
- h is a guess of distance to the goal; smaller h is chosen first.
- Orange nodes are frontier; blue nodes are already expanded.
- Here all paths have the same length, but heuristics change the order and number of expansions.
- Search succeeds when G is selected for expansion.
`,
        },
        zh: {
            heuristic: '启发式准确度',
            expand: '扩展下一个节点',
            reset: '重置搜索',
            start: '起点',
            goal: '目标',
            expanded: '已扩展',
            frontier: '待扩展',
            estimate: 'h = 到目标的估计距离',
            aim: '目标：用最少扩展找到 G',
            decision: '决策规则',
            decisionLine1: '选择 h 最小的待扩展节点。',
            decisionLine2: '橙色 = 待扩展（未探索）。',
            decisionLine3: '蓝色 = 已扩展（已探索）。',
            nextPick: '下一个选择',
            expandedCount: '已扩展',
            success: '当 G 被扩展即成功。',
            explain: `
- h 表示到目标的估计距离，h 越小越先被选中。
- 橙色是待扩展节点，蓝色是已扩展节点。
- 这里路径长度相同，但启发式会改变扩展顺序与数量。
- 当 G 被选为扩展节点时搜索完成。
`,
        },
    };

    const text = t[language];

    const heuristic = useMemo(() => {
        const weight = accuracy / 100;
        return nodes.reduce((acc, node) => {
            acc[node.id] = node.trueDist * weight + misleading[node.id as keyof typeof misleading] * (1 - weight);
            return acc;
        }, {} as Record<string, number>);
    }, [accuracy]);

    const expandNext = () => {
        if (found || open.length === 0) return;
        const next = [...open].sort((a, b) => heuristic[a] - heuristic[b])[0];
        const remaining = open.filter((node) => node !== next);
        const newExpanded = [...expanded, next];

        if (next === 'G') {
            setOpen([]);
            setExpanded(newExpanded);
            setFound(true);
            return;
        }

        const neighbors = edges
            .filter(([from]) => from === next)
            .map(([, to]) => to)
            .filter((node) => !newExpanded.includes(node) && !remaining.includes(node));

        setOpen([...remaining, ...neighbors]);
        setExpanded(newExpanded);
    };

    const reset = () => {
        setOpen(['A']);
        setExpanded([]);
        setFound(false);
    };

    const sortedOpen = [...open].sort((a, b) => heuristic[a] - heuristic[b]);
    const nextPick = sortedOpen[0];
    const nextPickLabel = found || !nextPick ? '--' : `${nextPick} (h=${heuristic[nextPick].toFixed(1)})`;
    const expandedLabel = `${expanded.length}`;

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="relative w-[520px] h-[260px] bg-white border border-gray-200 rounded-2xl shadow-sm">
                        <svg width="520" height="260">
                            {edges.map(([from, to]) => {
                                const start = nodes.find((node) => node.id === from)!;
                                const end = nodes.find((node) => node.id === to)!;
                                return (
                                    <line
                                        key={`${from}-${to}`}
                                        x1={start.x}
                                        y1={start.y}
                                        x2={end.x}
                                        y2={end.y}
                                        stroke="#e5e7eb"
                                        strokeWidth={3}
                                    />
                                );
                            })}

                            {nodes.map((node) => {
                                const isExpanded = expanded.includes(node.id);
                                const isFrontier = open.includes(node.id);
                                const isGoal = node.id === 'G';
                                const fill = isGoal && isExpanded
                                    ? '#3b82f6'
                                    : isGoal
                                    ? '#22c55e'
                                    : isExpanded
                                    ? '#3b82f6'
                                    : isFrontier
                                    ? '#f59e0b'
                                    : '#f3f4f6';
                                const textColor = isGoal || isExpanded || isFrontier ? 'white' : '#374151';
                                return (
                                    <g key={node.id}>
                                        <circle cx={node.x} cy={node.y} r={20} fill={fill} stroke={isGoal ? '#22c55e' : 'transparent'} strokeWidth={2} />
                                        <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize={12} fill={textColor} fontWeight="bold">
                                            {node.id}
                                        </text>
                                        <text x={node.x} y={node.y + 30} textAnchor="middle" fontSize={10} fill="#6b7280">
                                            h={heuristic[node.id].toFixed(1)}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                        <div className="absolute left-4 top-4 text-xs text-gray-500">
                            {text.start} → {text.goal}
                        </div>
                        <div className="absolute right-4 top-4 text-xs text-gray-500">
                            {text.estimate}
                        </div>
                    </div>

                    <div className="mt-4 w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-3 text-xs text-gray-600">
                        <div className="font-semibold text-gray-700 mb-1">{text.decision}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                            <span>{text.decisionLine1}</span>
                            <span>{text.decisionLine2}</span>
                            <span>{text.decisionLine3}</span>
                            <span className="text-gray-500">• {text.success}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-2 text-gray-500">
                            <span>{text.nextPick}: <span className="font-semibold text-gray-800">{nextPickLabel}</span></span>
                            <span>{text.expandedCount}: <span className="font-semibold text-gray-800">{expandedLabel}</span></span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />{text.expanded}</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />{text.frontier}</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />{text.goal}</span>
                        <span className="ml-2 text-gray-400">• {text.aim}</span>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <div className="flex flex-col">
                            <label className="text-xs text-gray-600" htmlFor="heuristic-slider">
                                {text.heuristic}
                            </label>
                            <input
                                id="heuristic-slider"
                                type="range"
                                min={0}
                                max={100}
                                value={accuracy}
                                onChange={(e) => setAccuracy(Number(e.target.value))}
                                className="w-48"
                            />
                        </div>
                        <button
                            onClick={expandNext}
                            className="px-5 py-2 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700"
                        >
                            {text.expand}
                        </button>
                        <button
                            onClick={reset}
                            className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                            {text.reset}
                        </button>
                    </div>
                </div>
            </ConceptStage>
            <ExplainPanel>{text.explain}</ExplainPanel>
        </div>
    );
};
