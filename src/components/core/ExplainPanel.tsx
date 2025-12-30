import React from 'react';

interface ExplainPanelProps {
    children: React.ReactNode;
}

export const ExplainPanel: React.FC<ExplainPanelProps> = ({ children }) => {
    return (
        <div
            className="explain-panel"
            style={{
                width: '300px', // Fixed width for sidebar logic (can adjust)
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
            <div style={{ fontSize: '1rem', lineHeight: '1.6', color: '#636e72' }}>
                {children}
            </div>
        </div>
    );
};
