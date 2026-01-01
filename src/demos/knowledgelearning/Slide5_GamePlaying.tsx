import React, { useCallback, useMemo, useState } from 'react';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { ConceptStage } from '../../components/core/ConceptStage';
import { useLanguage } from '../../components/core/LanguageContext';

type TreeNode = {
    id: string;
    depth: number;
    children?: TreeNode[];
    value?: number;
};

type LayoutNode = TreeNode & {
    x: number;
    y: number;
};

const LEAF_COUNTS = [2, 1, 2, 1, 2, 1, 2, 1];
const LEAF_TOTAL = LEAF_COUNTS.reduce((sum, count) => sum + count, 0);

const SVG_WIDTH = 760;
const SVG_HEIGHT = 360;
const PADDING_X = 36;
const PADDING_Y = 36;
const LEVEL_GAP = (SVG_HEIGHT - PADDING_Y * 2) / 4;

const randomValue = () => Math.floor(Math.random() * 21) - 10;

const buildTree = (leafValues: number[]) => {
    let leafIndex = 0;
    const level3 = LEAF_COUNTS.map((count, idx) => {
        const children = Array.from({ length: count }, () => {
            const node: TreeNode = {
                id: `L${leafIndex + 1}`,
                depth: 4,
                value: leafValues[leafIndex],
            };
            leafIndex += 1;
            return node;
        });
        return { id: `N3_${idx}`, depth: 3, children } as TreeNode;
    });

    const level2 = Array.from({ length: 4 }, (_, idx) => {
        return {
            id: `N2_${idx}`,
            depth: 2,
            children: [level3[idx * 2], level3[idx * 2 + 1]],
        } as TreeNode;
    });

    const level1 = Array.from({ length: 2 }, (_, idx) => {
        return {
            id: `N1_${idx}`,
            depth: 1,
            children: [level2[idx * 2], level2[idx * 2 + 1]],
        } as TreeNode;
    });

    const root: TreeNode = {
        id: 'N0',
        depth: 0,
        children: [level1[0], level1[1]],
    };

    return root;
};

const collectLeaves = (node: TreeNode, bucket: Set<string>) => {
    if (!node.children || node.children.length === 0) {
        bucket.add(node.id);
        return;
    }
    node.children.forEach((child) => collectLeaves(child, bucket));
};

const minimax = (node: TreeNode, isMax: boolean, scores: Record<string, number>) => {
    if (!node.children || node.children.length === 0) {
        scores[node.id] = node.value ?? 0;
        return node.value ?? 0;
    }

    const childValues = node.children.map((child) => minimax(child, !isMax, scores));
    const best = isMax ? Math.max(...childValues) : Math.min(...childValues);
    scores[node.id] = best;
    return best;
};

const alphaBeta = (
    node: TreeNode,
    isMax: boolean,
    alpha: number,
    beta: number,
    scores: Record<string, number>,
    pruned: Set<string>
) => {
    if (!node.children || node.children.length === 0) {
        scores[node.id] = node.value ?? 0;
        return node.value ?? 0;
    }

    let best = isMax ? -Infinity : Infinity;
    for (let index = 0; index < node.children.length; index += 1) {
        const child = node.children[index];
        const value = alphaBeta(child, !isMax, alpha, beta, scores, pruned);
        if (isMax) {
            best = Math.max(best, value);
            alpha = Math.max(alpha, best);
        } else {
            best = Math.min(best, value);
            beta = Math.min(beta, best);
        }

        if (beta <= alpha) {
            for (let j = index + 1; j < node.children.length; j += 1) {
                collectLeaves(node.children[j], pruned);
            }
            break;
        }
    }

    scores[node.id] = best;
    return best;
};

const layoutTree = (root: TreeNode) => {
    const leaves: TreeNode[] = [];
    const collect = (node: TreeNode) => {
        if (!node.children || node.children.length === 0) {
            leaves.push(node);
            return;
        }
        node.children.forEach((child) => collect(child));
    };
    collect(root);

    const leafSpacing = (SVG_WIDTH - PADDING_X * 2) / (leaves.length - 1);
    const leafX = new Map<string, number>();
    leaves.forEach((leaf, index) => {
        leafX.set(leaf.id, PADDING_X + leafSpacing * index);
    });

    const positioned: LayoutNode[] = [];
    const edges: { from: LayoutNode; to: LayoutNode }[] = [];

    const place = (node: TreeNode): LayoutNode => {
        const y = PADDING_Y + node.depth * LEVEL_GAP;
        if (!node.children || node.children.length === 0) {
            const x = leafX.get(node.id) ?? PADDING_X;
            const layoutNode = { ...node, x, y };
            positioned.push(layoutNode);
            return layoutNode;
        }

        const childLayouts = node.children.map((child) => place(child));
        const x = childLayouts.reduce((sum, child) => sum + child.x, 0) / childLayouts.length;
        const layoutNode = { ...node, x, y };
        positioned.push(layoutNode);
        childLayouts.forEach((child) => edges.push({ from: layoutNode, to: child }));
        return layoutNode;
    };

    const rootLayout = place(root);
    return { nodes: positioned, edges, root: rootLayout, leavesCount: leaves.length };
};

const buildOptimalPath = (node: TreeNode, scores: Record<string, number>, isMax: boolean, path: Set<string>, edges: Set<string>) => {
    path.add(node.id);
    if (!node.children || node.children.length === 0) return;
    const scoredChildren = node.children.filter((child) => scores[child.id] !== undefined);
    let bestChild = scoredChildren[0] ?? node.children[0];
    scoredChildren.forEach((child) => {
        const childScore = scores[child.id] ?? 0;
        const bestScore = scores[bestChild.id] ?? 0;
        if (isMax ? childScore > bestScore : childScore < bestScore) {
            bestChild = child;
        }
    });
    edges.add(`${node.id}-${bestChild.id}`);
    buildOptimalPath(bestChild, scores, !isMax, path, edges);
};

export const Slide5_GamePlaying: React.FC = () => {
    const { language } = useLanguage();
    const [algorithm, setAlgorithm] = useState<'minimax' | 'alphabeta'>('minimax');
    const [evaluated, setEvaluated] = useState(false);
    const [tree, setTree] = useState<TreeNode>(() => buildTree(Array.from({ length: LEAF_TOTAL }, randomValue)));
    const [scores, setScores] = useState<Record<string, number>>({});
    const [pruned, setPruned] = useState<Set<string>>(new Set());

    const t = {
        en: {
            title: 'Assume the opponent plays perfectly',
            minimax: 'Minimax',
            alphaBeta: 'Alpha-Beta',
            evaluate: 'Evaluate Tree',
            reset: 'Reset',
            prune: 'Pruned',
            max: 'MAX',
            min: 'MIN',
            rootValue: 'Root value',
            leaves: 'Leaves',
            explain: `
- Depth 4 tree with randomized leaf values.
- Minimax evaluates every leaf; alpha-beta skips pruned branches.
- Pruning depends on both values and search order.
`,
        },
        zh: {
            title: '假设对手也最优',
            minimax: '极小极大',
            alphaBeta: 'Alpha-Beta 剪枝',
            evaluate: '评估树',
            reset: '重置',
            prune: '已剪枝',
            max: 'MAX',
            min: 'MIN',
            rootValue: '根节点值',
            leaves: '叶子',
            explain: `
- 深度 4 的树，叶子值每次随机生成。
- 极小极大会评估所有叶子，Alpha-Beta 会剪枝。
- 是否剪枝取决于叶子值与搜索顺序。
`,
        },
    };

    const text = t[language];

    const layout = useMemo(() => layoutTree(tree), [tree]);
    const rootScore = evaluated ? scores[layout.root.id] : undefined;
    const optimalPath = useMemo(() => {
        if (!evaluated) return { nodes: new Set<string>(), edges: new Set<string>() };
        const pathNodes = new Set<string>();
        const pathEdges = new Set<string>();
        buildOptimalPath(tree, scores, true, pathNodes, pathEdges);
        return { nodes: pathNodes, edges: pathEdges };
    }, [evaluated, scores, tree]);

    const evaluateTree = useCallback(() => {
        const nextScores: Record<string, number> = {};
        const nextPruned = new Set<string>();
        if (algorithm === 'alphabeta') {
            alphaBeta(tree, true, -Infinity, Infinity, nextScores, nextPruned);
        } else {
            minimax(tree, true, nextScores);
        }
        setScores(nextScores);
        setPruned(nextPruned);
        setEvaluated(true);
    }, [algorithm, tree]);

    const resetTree = useCallback(() => {
        let nextTree = tree;
        let prunedCheck = new Set<string>();

        for (let attempt = 0; attempt < 25; attempt += 1) {
            const values = Array.from({ length: LEAF_TOTAL }, randomValue);
            nextTree = buildTree(values);
            const tempScores: Record<string, number> = {};
            prunedCheck = new Set<string>();
            alphaBeta(nextTree, true, -Infinity, Infinity, tempScores, prunedCheck);
            if (prunedCheck.size > 0) {
                break;
            }
        }

        setTree(nextTree);
        setScores({});
        setPruned(new Set());
        setEvaluated(false);
    }, [tree]);

    return (
        <div className="flex h-full gap-4 w-full">
            <ConceptStage>
                <div className="flex flex-col items-center justify-center w-full h-full">
                    <div className="text-sm text-gray-500 mb-3">{text.title}</div>
                    <svg width={SVG_WIDTH} height={SVG_HEIGHT} className="mb-3">
                        {layout.edges.map((edge) => {
                            const edgeKey = `${edge.from.id}-${edge.to.id}`;
                            const highlight = evaluated && optimalPath.edges.has(edgeKey);
                            return (
                                <line
                                    key={edgeKey}
                                    x1={edge.from.x}
                                    y1={edge.from.y}
                                    x2={edge.to.x}
                                    y2={edge.to.y}
                                    stroke={highlight ? '#22c55e' : '#cbd5e1'}
                                    strokeWidth={highlight ? 3.5 : 2}
                                />
                            );
                        })}

                        {layout.nodes.map((node) => {
                            const isLeaf = !node.children || node.children.length === 0;
                            const isMax = node.depth % 2 === 0;
                            const showPruned = evaluated && algorithm === 'alphabeta' && pruned.has(node.id);
                            const value = node.value;
                            const score = scores[node.id];
                            const highlight = evaluated && optimalPath.nodes.has(node.id);

                            if (isLeaf) {
                                return (
                                    <g key={node.id}>
                                        <rect
                                            x={node.x - 22}
                                            y={node.y - 14}
                                            width={44}
                                            height={28}
                                            rx={7}
                                            fill={showPruned ? '#f3f4f6' : '#fff7ed'}
                                            stroke={highlight ? '#22c55e' : showPruned ? '#d1d5db' : '#f59e0b'}
                                            strokeWidth={highlight ? 2.5 : 1.5}
                                        />
                                        <text x={node.x} y={node.y + 5} textAnchor="middle" fontSize={12} fill={showPruned ? '#9ca3af' : '#92400e'}>
                                            {showPruned ? text.prune : value}
                                        </text>
                                        {showPruned && (
                                            <line x1={node.x - 16} y1={node.y - 9} x2={node.x + 16} y2={node.y + 9} stroke="#9ca3af" strokeWidth={2} />
                                        )}
                                    </g>
                                );
                            }

                            return (
                                <g key={node.id}>
                                    {isMax ? (
                                        <rect
                                            x={node.x - 22}
                                            y={node.y - 16}
                                            width={44}
                                            height={32}
                                            rx={7}
                                            fill={highlight ? '#dcfce7' : '#e2e8f0'}
                                            stroke={highlight ? '#22c55e' : 'transparent'}
                                            strokeWidth={2}
                                        />
                                    ) : (
                                        <circle
                                            cx={node.x}
                                            cy={node.y}
                                            r={20}
                                            fill={highlight ? '#dcfce7' : '#e2e8f0'}
                                            stroke={highlight ? '#22c55e' : 'transparent'}
                                            strokeWidth={2}
                                        />
                                    )}
                                    <text x={node.x} y={node.y + 4} textAnchor="middle" fontSize={11} fill="#1f2937" fontWeight={600}>
                                        {isMax ? text.max : text.min}
                                    </text>
                                    {evaluated && score !== undefined && (
                                        <text x={node.x} y={node.y + 30} textAnchor="middle" fontSize={11} fill="#16a34a">
                                            {score}
                                        </text>
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    <div className="text-xs text-gray-500 mb-3">
                        {text.leaves}: {layout.leavesCount} | {text.rootValue}: {rootScore ?? '--'}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setAlgorithm('minimax');
                                    setEvaluated(false);
                                }}
                                className={`px-4 py-2 rounded-full text-sm border ${algorithm === 'minimax' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600'}`}
                            >
                                {text.minimax}
                            </button>
                            <button
                                onClick={() => {
                                    setAlgorithm('alphabeta');
                                    setEvaluated(false);
                                }}
                                className={`px-4 py-2 rounded-full text-sm border ${algorithm === 'alphabeta' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600'}`}
                            >
                                {text.alphaBeta}
                            </button>
                        </div>
                        <button
                            onClick={evaluateTree}
                            className="px-4 py-2 rounded-full bg-emerald-600 text-white text-sm"
                        >
                            {text.evaluate}
                        </button>
                        <button
                            onClick={resetTree}
                            className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 text-sm"
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
