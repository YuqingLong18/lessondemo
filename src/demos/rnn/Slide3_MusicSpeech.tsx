import React, { useMemo, useState } from 'react';
import { ConceptStage } from '../../components/core/ConceptStage';
import { ExplainPanel } from '../../components/core/ExplainPanel';
import { useLanguage } from '../../components/core/LanguageContext';

const GAMES = {
    music: {
        label: 'Music notes',
        color: '#6c5ce7',
        sequence: ['Do', 'Re', 'Mi', 'Do', 'Do', 'Re', 'Mi', 'Do', 'Mi', 'Fa', 'Sol', null, null, null],
        choices: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
        answers: ['Mi', 'Fa', 'Sol'],
    },
    speech: {
        label: 'Speech syllables',
        color: '#00b894',
        sequence: ['hel', 'lo', 'how', 'are', null],
        choices: ['you', 'we', 'they'],
        answers: ['you'],
    },
};

const copy = {
    en: {
        title: '3. Music and Speech Unfold in Time',
        bullets: [
            'Sound is a sequence of tiny steps.',
            'Fill the missing beats or words using the choices.',
            'The same order creates the same rhythm or phrase.',
        ],
        prompt: 'Complete the sequence:',
        correct: 'Great! Sequence completed.',
        tryAgain: 'Not quite. Adjust the blanks.',
    },
    zh: {
        title: '3. 音乐与语音按时间展开',
        bullets: [
            '声音由一连串微小步骤组成。',
            '用选项补全缺失的拍点或词。',
            '相同顺序会形成相同节奏或短语。',
        ],
        prompt: 'Complete the sequence:',
        correct: 'Great! Sequence completed.',
        tryAgain: 'Not quite. Adjust the blanks.',
    },
};

type GameKey = keyof typeof GAMES;

export const Slide3_MusicSpeech: React.FC = () => {
    const { language } = useLanguage();
    const t = copy[language];
    const [gameKey, setGameKey] = useState<GameKey>('music');
    const [selections, setSelections] = useState<(string | null)[]>(Array(GAMES.music.answers.length).fill(null));
    const [activeBlank, setActiveBlank] = useState(0);

    const game = GAMES[gameKey];
    const blankIndices = useMemo(
        () =>
            game.sequence
                .map((item, index) => (item === null ? index : null))
                .filter((value): value is number => value !== null),
        [game]
    );

    const isComplete = selections.every((value) => value !== null);
    const isAllCorrect = isComplete && selections.every((value, index) => value === game.answers[index]);

    const handleGameChange = (key: GameKey) => {
        setGameKey(key);
        setSelections(Array(GAMES[key].answers.length).fill(null));
        setActiveBlank(0);
    };

    const handleChoice = (choice: string) => {
        const currentTarget = selections[activeBlank] === null ? activeBlank : selections.findIndex((value) => value === null);
        if (currentTarget === -1) return;
        const nextSelections = [...selections];
        nextSelections[currentTarget] = choice;
        setSelections(nextSelections);
        setActiveBlank(Math.min(nextSelections.length - 1, currentTarget + 1));
    };

    const handleBlankClick = (blankIndex: number) => {
        setActiveBlank(blankIndex);
        if (selections[blankIndex] !== null) {
            const nextSelections = [...selections];
            nextSelections[blankIndex] = null;
            setSelections(nextSelections);
        }
    };

    return (
        <>
            <ConceptStage>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', width: '100%', padding: '0 2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        {(Object.keys(GAMES) as GameKey[]).map((key) => {
                            const isActive = key === gameKey;
                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleGameChange(key)}
                                    aria-pressed={isActive}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '999px',
                                        border: '1px solid #b2bec3',
                                        backgroundColor: isActive ? GAMES[key].color : '#ffffff',
                                        color: isActive ? '#ffffff' : '#2d3436',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                    }}
                                >
                                    {GAMES[key].label}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ textAlign: 'center', fontWeight: 600 }}>{t.prompt}</div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                        {game.sequence.map((item, index) => {
                            const blankIndex = blankIndices.indexOf(index);
                            const blankValue = blankIndex >= 0 ? selections[blankIndex] : null;
                            const isActiveBlank = blankIndex === activeBlank;
                            const isCorrect = blankIndex >= 0 && blankValue === game.answers[blankIndex];
                            const isWrong = blankIndex >= 0 && blankValue !== null && blankValue !== game.answers[blankIndex];
                            return (
                                <button
                                    key={`${item ?? 'blank'}-${index}`}
                                    type="button"
                                    onClick={() => {
                                        if (blankIndex >= 0) handleBlankClick(blankIndex);
                                    }}
                                    disabled={blankIndex < 0}
                                    style={{
                                        padding: '0.6rem 0.9rem',
                                        borderRadius: '10px',
                                        backgroundColor:
                                            blankIndex < 0
                                                ? '#f1f2f6'
                                                : isCorrect
                                                ? '#55efc4'
                                                : isWrong
                                                ? '#ff7675'
                                                : '#ffffff',
                                        color: '#2d3436',
                                        border: isActiveBlank ? `2px solid ${game.color}` : '1px solid #dfe6e9',
                                        minWidth: '70px',
                                        textAlign: 'center',
                                        fontWeight: 600,
                                        cursor: blankIndex >= 0 ? 'pointer' : 'default',
                                    }}
                                >
                                    {blankIndex >= 0 ? blankValue ?? '___' : item}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem' }}>
                        {game.choices.map((choice) => (
                            <button
                                key={choice}
                                type="button"
                                onClick={() => handleChoice(choice)}
                                style={{
                                    padding: '0.6rem 1rem',
                                    borderRadius: '999px',
                                    border: `2px solid ${game.color}`,
                                    backgroundColor: '#ffffff',
                                    color: '#2d3436',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    minWidth: '80px',
                                }}
                            >
                                {choice}
                            </button>
                        ))}
                    </div>

                    {isComplete && (
                        <div style={{ textAlign: 'center', fontWeight: 700, color: isAllCorrect ? '#00b894' : '#d63031' }}>
                            {isAllCorrect ? t.correct : t.tryAgain}
                        </div>
                    )}
                </div>
            </ConceptStage>
            <ExplainPanel>
                <h3>{t.title}</h3>
                <ul>
                    {t.bullets.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </ExplainPanel>
        </>
    );
};
