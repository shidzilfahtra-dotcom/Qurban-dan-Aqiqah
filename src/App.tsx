import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, BookOpen, RotateCcw, Home } from 'lucide-react';
import { GameMode, PlayerProfile, TeamMember, Question, HighScoreEntry } from './types/game';
import { CHARACTERS } from './data/characters';
import { QUESTIONS } from './data/questions';
import { SoundSystem } from './utils/audio';

import { TitleScreen } from './components/TitleScreen';
import { CharacterSelect } from './components/CharacterSelect';
import { GameCanvas } from './components/GameCanvas';
import { QuestionModal } from './components/QuestionModal';
import { StudyGuideModal } from './components/StudyGuideModal';
import { GameOverModal } from './components/GameOverModal';
import { CertificateModal } from './components/CertificateModal';
import { LeaderboardModal } from './components/LeaderboardModal';

type Screen = 'title' | 'select' | 'playing' | 'gameover';

export default function App() {
  // Screen & Navigation
  const [currentScreen, setCurrentScreen] = useState<Screen>('title');
  const [gameMode, setGameMode] = useState<GameMode>('solo');

  // Solo Player
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>({
    name: 'Ahmad Zaky',
    characterId: 'sheep',
    customCharacterName: 'Si Domba Juara',
    accessoryColor: '#10b981',
  });

  // Team
  const [teamName, setTeamName] = useState('Regu Al-Ikhlas 9A');
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [activeTeamMemberIdx, setActiveTeamMemberIdx] = useState(0);

  // Active Game State
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
  const [collectibleBonus, setCollectibleBonus] = useState(0);

  // Gates & Questions
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);
  const [currentGateNumber, setCurrentGateNumber] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const totalGates = 5;

  // Pausing & Modals
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showStudyGuide, setShowStudyGuide] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  // Leaderboard entries
  const [leaderboard, setLeaderboard] = useState<HighScoreEntry[]>([]);

  // Init audio and saved records
  useEffect(() => {
    SoundSystem.init();
    setIsMuted(SoundSystem.isMuted());

    try {
      const saved = localStorage.getItem('petualang_berkah_leaderboard');
      if (saved) {
        setLeaderboard(JSON.parse(saved));
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    SoundSystem.setMuted(next);
  };

  // Start new run with shuffled questions
  const startNewRun = (mode: GameMode) => {
    // Shuffle question bank
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    setSessionQuestions(shuffled);
    setScore(0);
    setCorrectAnswersCount(0);
    setWrongAnswersCount(0);
    setCollectibleBonus(0);
    setCurrentGateNumber(1);
    setActiveQuestion(null);
    setIsPaused(false);
    setActiveTeamMemberIdx(0);
    setCurrentScreen('playing');
  };

  // Solo Start
  const handleConfirmSolo = (profile: PlayerProfile) => {
    setPlayerProfile(profile);
    setGameMode('solo');
    startNewRun('solo');
  };

  // Team Start
  const handleConfirmTeam = (name: string, members: TeamMember[]) => {
    setTeamName(name);
    setTeamMembers(members);
    setGameMode('team');
    startNewRun('team');
  };

  // When player reaches a gate
  const handleReachGate = (gateNumber: number, question: Question) => {
    setCurrentGateNumber(gateNumber);
    setActiveQuestion(question);
    setIsPaused(true);
  };

  // Score delta from Question Modal
  // Correct: +100 | Wrong: -50 (exact requirement!)
  const handleAnswerQuestion = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 100);
      setCorrectAnswersCount((prev) => prev + 1);

      if (gameMode === 'team' && teamMembers.length > 0) {
        setTeamMembers((prev) => {
          const next = [...prev];
          const curr = next[activeTeamMemberIdx % next.length];
          if (curr) {
            curr.questionsAnswered += 1;
            curr.correctAnswers += 1;
            curr.pointsContributed += 100;
          }
          return next;
        });
      }
    } else {
      setScore((prev) => Math.max(0, prev - 50));
      setWrongAnswersCount((prev) => prev + 1);

      if (gameMode === 'team' && teamMembers.length > 0) {
        setTeamMembers((prev) => {
          const next = [...prev];
          const curr = next[activeTeamMemberIdx % next.length];
          if (curr) {
            curr.questionsAnswered += 1;
            curr.pointsContributed = Math.max(0, curr.pointsContributed - 50);
          }
          return next;
        });
      }
    }
  };

  const handleCloseQuestionModal = () => {
    setActiveQuestion(null);
    setIsPaused(false);

    // In team mode, pass baton to next member!
    if (gameMode === 'team' && teamMembers.length > 0) {
      setActiveTeamMemberIdx((prev) => (prev + 1) % teamMembers.length);
    }
  };

  // Score change from collectibles / obstacles in canvas
  const handleScoreChange = (newScore: number, delta: number) => {
    setScore(newScore);
    if (delta > 0) {
      setCollectibleBonus((prev) => prev + delta);
    }
  };

  // When player finishes course
  const handleFinishCourse = () => {
    setCurrentScreen('gameover');

    // Save to leaderboard
    const recipient = gameMode === 'solo' ? playerProfile.name : teamName;
    const charName =
      gameMode === 'solo'
        ? playerProfile.customCharacterName
        : teamMembers[0]?.customCharacterName || 'Pahlawan Tim';

    let grade = 'Mumtaz';
    if (score < 250) grade = 'Jayyid';
    else if (score < 450) grade = 'Jayyid Jiddan';

    const newEntry: HighScoreEntry = {
      id: Date.now().toString(),
      mode: gameMode,
      playerNameOrTeam: recipient,
      members: gameMode === 'team' ? teamMembers.map((m) => m.name) : undefined,
      characterName: charName,
      score,
      correctCount: correctAnswersCount,
      wrongCount: wrongAnswersCount,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      grade,
    };

    setLeaderboard((prev) => {
      const updated = [newEntry, ...prev].sort((a, b) => b.score - a.score).slice(0, 20);
      try {
        localStorage.setItem('petualang_berkah_leaderboard', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleClearLeaderboard = () => {
    setLeaderboard([]);
    try {
      localStorage.removeItem('petualang_berkah_leaderboard');
    } catch {}
  };

  // Determine current active character details
  const activeCharType =
    gameMode === 'solo'
      ? playerProfile.characterId
      : teamMembers[activeTeamMemberIdx % (teamMembers.length || 1)]?.characterId || 'sheep';

  const activeCustomName =
    gameMode === 'solo'
      ? playerProfile.customCharacterName
      : teamMembers[activeTeamMemberIdx % (teamMembers.length || 1)]?.customCharacterName ||
        'Pahlawan Tim';

  const activeAccessoryColor =
    gameMode === 'solo'
      ? playerProfile.accessoryColor
      : teamMembers[activeTeamMemberIdx % (teamMembers.length || 1)]?.accessoryColor || '#10b981';

  const activeCharDef = CHARACTERS.find((c) => c.id === activeCharType) || CHARACTERS[0];

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-900 font-sans">
      {/* 1. TITLE SCREEN */}
      {currentScreen === 'title' && (
        <TitleScreen
          onStart={() => setCurrentScreen('select')}
          onOpenStudyGuide={() => setShowStudyGuide(true)}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* 2. CHARACTER & MODE SELECTION */}
      {currentScreen === 'select' && (
        <CharacterSelect
          onConfirmSolo={handleConfirmSolo}
          onConfirmTeam={handleConfirmTeam}
          onBack={() => setCurrentScreen('title')}
        />
      )}

      {/* 3. PLAYING VIEWPORT */}
      {currentScreen === 'playing' && (
        <div className="relative w-full h-full">
          {/* 60fps Isolated Game Canvas */}
          <GameCanvas
            characterType={activeCharType}
            customCharacterName={activeCustomName}
            accessoryColor={activeAccessoryColor}
            currentScore={score}
            onScoreChange={handleScoreChange}
            onReachGate={handleReachGate}
            onFinishCourse={handleFinishCourse}
            isPaused={isPaused}
            questions={sessionQuestions}
            currentGateIndex={currentGateNumber}
            totalGates={totalGates}
          />

          {/* Minimalist, Low-Occlusion Game HUD (Overhead perimeter bar) */}
          <div className="absolute top-0 inset-x-0 p-3 sm:p-4 flex items-center justify-between pointer-events-none z-30">
            {/* Player / Team Status Cluster */}
            <div className="pointer-events-auto flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-xl text-white">
              <span className="text-2xl">
                {activeCharType === 'sheep'
                  ? '🐑'
                  : activeCharType === 'goat'
                  ? '🐐'
                  : activeCharType === 'cow'
                  ? '🐂'
                  : activeCharType === 'camel'
                  ? '🐫'
                  : '👳'}
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-fun font-bold text-amber-300">
                    {activeCustomName}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: activeAccessoryColor }}
                    title="Warna Aksesoris"
                  />
                </div>
                <span className="text-[10px] text-slate-300 block font-medium">
                  {gameMode === 'solo'
                    ? playerProfile.name
                    : `${teamName} • Giliran: ${
                        teamMembers[activeTeamMemberIdx % teamMembers.length]?.name || 'Siswa'
                      }`}
                </span>
              </div>
            </div>

            {/* Gate Progress Pill */}
            <div className="pointer-events-auto bg-emerald-600/90 backdrop-blur-md px-4 py-1.5 rounded-2xl border-2 border-emerald-300 shadow-xl text-white font-fun font-bold text-xs sm:text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
              <span>
                Pos {Math.min(currentGateNumber, totalGates)} / {totalGates}
              </span>
            </div>

            {/* Score & HUD Controls Cluster */}
            <div className="pointer-events-auto flex items-center gap-2">
              {/* Score Badge */}
              <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-xl flex items-center gap-2 text-white">
                <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
                  Skor:
                </span>
                <span className="font-fun font-bold text-lg sm:text-xl text-amber-300 tabular-nums">
                  {score}
                </span>
              </div>

              {/* Study Guide quick button */}
              <button
                type="button"
                onClick={() => setShowStudyGuide(true)}
                className="p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 shadow-lg cursor-pointer transition-all active:scale-95"
                title="Buka Kitab Panduan Qurban & Aqiqah"
              >
                <BookOpen className="w-5 h-5 text-emerald-400" />
              </button>

              {/* Pause Toggle */}
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 shadow-lg cursor-pointer transition-all active:scale-95"
                title={isPaused ? 'Lanjutkan' : 'Jeda Permainan'}
              >
                {isPaused ? <Play className="w-5 h-5 text-amber-400" /> : <Pause className="w-5 h-5" />}
              </button>

              {/* Sound Toggle */}
              <button
                type="button"
                onClick={handleToggleMute}
                className="p-2.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/20 shadow-lg cursor-pointer transition-all active:scale-95 hidden sm:flex"
                title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Pause Modal Overlay */}
          {isPaused && !activeQuestion && (
            <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-40">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border-4 border-emerald-400">
                <h3 className="font-fun font-bold text-2xl text-slate-800">
                  Permainan Dijeda
                </h3>
                <p className="text-xs text-slate-600">
                  Ambil nafas sejenak atau pelajari materi di Kitab Panduan!
                </p>

                <div className="space-y-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsPaused(false)}
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-fun font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Lanjutkan Main</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowStudyGuide(true)}
                    className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-fun font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Buka Kitab Panduan</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPaused(false);
                      startNewRun(gameMode);
                    }}
                    className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-fun font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Rintangan Ini</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPaused(false);
                      setCurrentScreen('title');
                    }}
                    className="w-full py-2.5 rounded-2xl bg-transparent text-slate-500 hover:text-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Kembali ke Menu Utama</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. ACTIVE QUESTION CHECKPOINT MODAL */}
      {activeQuestion && (
        <QuestionModal
          gateNumber={currentGateNumber}
          question={activeQuestion}
          activeMember={
            gameMode === 'team'
              ? teamMembers[activeTeamMemberIdx % (teamMembers.length || 1)]
              : undefined
          }
          onAnswer={handleAnswerQuestion}
          onClose={handleCloseQuestionModal}
        />
      )}

      {/* 5. GAME OVER / COMPLETION MODAL */}
      {currentScreen === 'gameover' && (
        <GameOverModal
          score={score}
          correctAnswersCount={correctAnswersCount}
          wrongAnswersCount={wrongAnswersCount}
          collectibleBonus={collectibleBonus}
          mode={gameMode}
          recipientName={gameMode === 'solo' ? playerProfile.name : teamName}
          characterCustomName={
            gameMode === 'solo'
              ? playerProfile.customCharacterName
              : teamMembers[0]?.customCharacterName || 'Pahlawan Tim'
          }
          teamMembers={gameMode === 'team' ? teamMembers : undefined}
          onOpenCertificate={() => setShowCertificate(true)}
          onPlayAgain={() => startNewRun(gameMode)}
          onHome={() => setCurrentScreen('title')}
        />
      )}

      {/* 6. PRINTABLE / DOWNLOADABLE CERTIFICATE */}
      {showCertificate && (
        <CertificateModal
          recipientName={gameMode === 'solo' ? playerProfile.name : teamName}
          mode={gameMode}
          members={gameMode === 'team' ? teamMembers.map((m) => m.name) : undefined}
          characterCustomName={
            gameMode === 'solo'
              ? playerProfile.customCharacterName
              : teamMembers[0]?.customCharacterName || 'Pahlawan Tim'
          }
          score={score}
          correctCount={correctAnswersCount}
          totalQuestions={totalGates}
          grade={score >= 450 ? 'Mumtaz (Istimewa)' : score >= 250 ? 'Jayyid Jiddan' : 'Jayyid'}
          onClose={() => setShowCertificate(false)}
        />
      )}

      {/* 7. STUDY GUIDE HANDBOOK */}
      {showStudyGuide && (
        <StudyGuideModal onClose={() => setShowStudyGuide(false)} />
      )}

      {/* 8. LEADERBOARD MODAL */}
      {showLeaderboard && (
        <LeaderboardModal
          entries={leaderboard}
          onClear={handleClearLeaderboard}
          onClose={() => setShowLeaderboard(false)}
        />
      )}
    </div>
  );
}
