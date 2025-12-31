import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface ExplainPanelProps {
    children: React.ReactNode;
}

export const ExplainPanel: React.FC<ExplainPanelProps> = ({ children }) => {
    // If children is a string, we treat it as markdown.
    // If it's a React element (like <li>), we try to extract text or just keep it simplified.
    // However, existing usage passes <li>...</li>.
    // To support the new requirement "rendering in markdown format", we should ideally pass a markdown string.
    // But to be backward compatible and solve the immediate request, we can check type.

    // Actually, to support "better formula display", the user likely wants to write markdown strings in the usage.
    // So we should allow `children` to be a string of markdown.

    const content = typeof children === 'string' ? (
        <ReactMarkdown
            rehypePlugins={[rehypeKatex]}
            components={{
                p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2" {...props} />,
                li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                strong: ({ node, ...props }) => <span className="font-bold text-gray-800" {...props} />,
                em: ({ node, ...props }) => <span className="italic text-gray-700" {...props} />,
            }}
        >
            {children}
        </ReactMarkdown>
    ) : (
        // Fallback for Component-based children (old usage <li>...</li>)
        // We might want to wrap this in a prose class if we had Tailwind typography, 
        // but explicit styles are fine.
        <ul className="list-disc pl-5">
            {children}
        </ul>
    );

    return (
        <div
            className="explain-panel"
            style={{
                width: '300px',
                flexShrink: 0,
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <div className="text-gray-600 text-sm leading-relaxed">
                {content}
            </div>
        </div>
    );
};
