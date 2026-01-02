import React from 'react';

interface ConceptStageProps {
    children: React.ReactNode;
}

export const ConceptStage: React.FC<ConceptStageProps> = ({ children }) => {
    return (
        <div
            className="concept-stage"
            style={{
                flex: 1,
                minHeight: 0,
                minWidth: 0,
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                border: '1px solid #eee',
                position: 'relative',
                overflow: 'hidden', // Contain visualizations
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {children}
        </div>
    );
};
