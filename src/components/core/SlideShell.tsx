import React from 'react';
import { useLanguage } from './LanguageContext';

interface SlideShellProps {
  title: string;
  subConcept?: string;
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  children: React.ReactNode;
}

export const SlideShell: React.FC<SlideShellProps> = ({
  title,
  subConcept,
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onReset,
  children,
}) => {
  const { language, setLanguage } = useLanguage();
  const slideLabel = language === 'zh' ? `第 ${currentSlide + 1} / ${totalSlides} 页` : `Slide ${currentSlide + 1} / ${totalSlides}`;
  const resetLabel = language === 'zh' ? '重置' : 'Reset';

  return (
    <div
      className="slide-shell"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa', // Light neutral background
        color: '#2d3436', // Dark readable text
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: '1rem 2rem',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexShrink: 0,
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
          {title}
          {subConcept && (
            <span style={{ fontSize: '1rem', fontWeight: 400, color: '#636e72', marginLeft: '0.8rem' }}>
              · {subConcept}
            </span>
          )}
        </h1>
      </header>

      {/* Main Content Area */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          position: 'relative',
          padding: '2rem',
          gap: '2rem',
        }}
      >
        {children}
      </main>

      {/* Footer / Controls */}
      <footer
        style={{
          padding: '1rem 2rem',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
          backgroundColor: '#fff',
        }}
      >
        <div className="nav-controls" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={onPrev} disabled={currentSlide === 0} style={buttonStyle}>
            ◀
          </button>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{slideLabel}</span>
          <button onClick={onNext} disabled={currentSlide === totalSlides - 1} style={buttonStyle}>
            ▶
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div
            role="group"
            aria-label="Language toggle"
            style={{
              display: 'flex',
              border: '1px solid #b2bec3',
              borderRadius: '999px',
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}
          >
            <button
              type="button"
              onClick={() => setLanguage('zh')}
              aria-pressed={language === 'zh'}
              style={{
                ...toggleButtonStyle,
                backgroundColor: language === 'zh' ? '#0984e3' : 'transparent',
                color: language === 'zh' ? '#fff' : '#636e72',
              }}
            >
              中文
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              aria-pressed={language === 'en'}
              style={{
                ...toggleButtonStyle,
                backgroundColor: language === 'en' ? '#0984e3' : 'transparent',
                color: language === 'en' ? '#fff' : '#636e72',
              }}
            >
              English
            </button>
          </div>

          <button onClick={onReset} style={{ ...buttonStyle, borderColor: '#d63031', color: '#d63031' }}>
            {resetLabel}
          </button>
        </div>
      </footer>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  cursor: 'pointer',
  backgroundColor: 'white',
  border: '1px solid #b2bec3',
  borderRadius: '4px',
  fontSize: '0.9rem',
};

const toggleButtonStyle: React.CSSProperties = {
  padding: '0.4rem 0.9rem',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  fontSize: '0.85rem',
  fontWeight: 600,
};
