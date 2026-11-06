import React, { useState } from 'react';
import { Question, TeamMember } from '../types/game';
import { SoundSystem } from '../utils/audio';

interface QuestionModalProps {
  gateNumber: number;
  question: Question;
  activeMember?: TeamMember;
  onAnswer: (isCorrect: boolean) => void;
  onClose: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  gateNumber,
  question,
  activeMember,
  onAnswer,
  onClose,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIndex(idx);
    const correct = idx === question.correctIndex;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      SoundSystem.playCorrect();
    } else {
      SoundSystem.playWrong();
    }

    onAnswer(correct);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'qurban':
        return { label: 'Ibadah Qurban', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'aqiqah':
        return { label: 'Ibadah Aqiqah', bg: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'syarat_hewan':
        return { label: 'Syarat Sah Hewan', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'perbandingan':
        return { label: 'Perbandingan Qurban & Aqiqah', bg: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'tata_cara':
        return { label: 'Tata Cara Sembelih', bg: 'bg-rose-100 text-rose-800 border-rose-300' };
      default:
        return { label: 'Hikmah & Syariat', bg: 'bg-teal-100 text-teal-800 border-teal-300' };
    }
  };

  const badge = getCategoryBadge(question.category);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-fun text-xl font-bold text-amber-300 shadow-inner">
              #{gateNumber}
            </span>
            <div>
              <h2 className="text-lg md:text-xl font-fun font-bold leading-tight">
                Pos Ujian Berkah ke-{gateNumber}
              </h2>
              <p className="text-xs text-emerald-100">Materi PAI SMP Kelas 9: Qurban &amp; Aqiqah</p>
            </div>
          </div>

          {/* Active member badge in team mode */}
          {activeMember && (
            <div className="bg-white/20 px-3 py-1.5 rounded-xl border border-white/30 text-right">
              <span className="text-[10px] uppercase tracking-wider text-emerald-200 block font-semibold">
                Giliran Anggota:
              </span>
              <span className="text-sm font-bold text-white font-fun">
                {activeMember.name}
              </span>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Category & Points Preview */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badge.bg}`}>
              {badge.label}
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Tepat: <strong>+100 Poin</strong>
              </span>
              <span className="text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                Salah: <strong>-50 Poin</strong>
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-base md:text-lg font-semibold text-slate-800 leading-relaxed">
              {question.question}
            </p>
            {question.quranHadithReference && (
              <span className="inline-block mt-2 text-xs font-medium text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-md">
                Ref: {question.quranHadithReference}
              </span>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              let stateStyles = 'bg-white hover:bg-emerald-50/70 border-slate-200 text-slate-800 hover:border-emerald-300';

              if (isAnswered) {
                if (idx === question.correctIndex) {
                  stateStyles = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                } else if (idx === selectedIndex) {
                  stateStyles = 'bg-rose-100 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-400';
                } else {
                  stateStyles = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-start gap-3.5 transition-all cursor-pointer disabled:cursor-default ${stateStyles}`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-fun font-bold text-sm shrink-0 shadow-xs ${
                      isAnswered && idx === question.correctIndex
                        ? 'bg-emerald-600 text-white'
                        : isAnswered && idx === selectedIndex
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-sm md:text-base pt-0.5 leading-snug flex-1">
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Answer Feedback & Educational Explanation */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl border-2 animate-in zoom-in-95 duration-200 ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  : 'bg-rose-50 border-rose-400 text-rose-900'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{isCorrect ? '🌟' : '💡'}</span>
                <h4 className="font-fun font-bold text-base md:text-lg">
                  {isCorrect ? 'MUMTAZ! Jawaban Tepat (+100 Poin)' : 'Kurang Tepat! Poin Berkurang (-50 Poin)'}
                </h4>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-slate-700 bg-white/70 p-3 rounded-xl border border-slate-200/50">
                <strong className="text-slate-900 block mb-1">Pembahasan Materi:</strong>
                {question.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {isAnswered && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-fun font-bold text-base rounded-2xl shadow-lg border-b-4 border-emerald-800 transition-transform cursor-pointer flex items-center gap-2"
            >
              <span>Lanjutkan Petualangan!</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
