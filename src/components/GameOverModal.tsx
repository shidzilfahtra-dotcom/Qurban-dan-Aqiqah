import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, RotateCcw, Home, Star, CheckCircle, XCircle } from 'lucide-react';
import { GameMode, TeamMember } from '../types/game';

interface GameOverModalProps {
  score: number;
  correctAnswersCount: number;
  wrongAnswersCount: number;
  collectibleBonus: number;
  mode: GameMode;
  recipientName: string;
  characterCustomName: string;
  teamMembers?: TeamMember[];
  onOpenCertificate: () => void;
  onPlayAgain: () => void;
  onHome: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  correctAnswersCount,
  wrongAnswersCount,
  collectibleBonus,
  mode,
  recipientName,
  characterCustomName,
  teamMembers,
  onOpenCertificate,
  onPlayAgain,
  onHome,
}) => {
  useEffect(() => {
    // Confetti celebration burst
    const end = Date.now() + 1500;
    const colors = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // Determine grade & praise
  let grade = 'Mumtaz (Istimewa)';
  let stars = 3;
  if (score >= 450) {
    grade = 'Mumtaz (Sangat Memuaskan)';
    stars = 3;
  } else if (score >= 250) {
    grade = 'Jayyid Jiddan (Baik Sekali)';
    stars = 2;
  } else {
    grade = 'Jayyid (Cukup & Perlu Belajar Lagi)';
    stars = 1;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 text-center text-white relative">
          <div className="w-16 h-16 rounded-3xl bg-amber-400/30 border-2 border-amber-300 mx-auto flex items-center justify-center mb-2 shadow-inner">
            <Trophy className="w-9 h-9 text-amber-300" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-fun font-bold">
            Alhamdulillah, Selesai!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium">
            Petualangan Rintangan Qurban &amp; Aqiqah Berhasil Dituntaskan
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Hero & Character Card */}
          <div className="text-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
              {mode === 'team' ? 'Nama Tim / Kelompok:' : 'Nama Siswa:'}
            </span>
            <h3 className="text-xl sm:text-2xl font-fun font-bold text-slate-800">
              {recipientName}
            </h3>
            <span className="inline-block mt-1 text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Karakter Andalan: {characterCustomName}
            </span>

            {/* Stars rating */}
            <div className="flex justify-center gap-1.5 mt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < stars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-fun font-bold text-amber-700 block mt-1">
              Predikat: {grade}
            </span>
          </div>

          {/* Points Breakdown */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2.5">
            <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-900 border-b border-emerald-200 pb-1.5">
              Rincian Perolehan Poin:
            </h4>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Jawaban Kuis Tepat ({correctAnswersCount} x +100)
              </span>
              <strong className="text-emerald-700 font-bold">
                +{correctAnswersCount * 100}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 text-rose-800">
                <XCircle className="w-4 h-4 text-rose-600" />
                Jawaban Kuis Kurang Tepat ({wrongAnswersCount} x -50)
              </span>
              <strong className="text-rose-600 font-bold">
                -{wrongAnswersCount * 50}
              </strong>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-700">Bonus Rumput &amp; Bintang di Jalan</span>
              <strong className="text-amber-600 font-bold">
                +{collectibleBonus}
              </strong>
            </div>

            <div className="border-t border-emerald-200 pt-2 flex items-center justify-between">
              <span className="font-fun font-bold text-base text-slate-800">Total Skor Akhir:</span>
              <span className="font-fun font-bold text-2xl text-emerald-700 tabular-nums">
                {score} Poin
              </span>
            </div>
          </div>

          {/* Team Members Breakdown (if team mode) */}
          {mode === 'team' && teamMembers && teamMembers.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700">
                Kontribusi Anggota Tim:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {teamMembers.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-bold text-slate-800">
                      <span>{m.name}</span>
                      <span className="text-emerald-700 font-fun font-bold">
                        +{m.pointsContributed} Pts
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Karakter: {m.customCharacterName} • Benar: {m.correctAnswers}/{m.questionsAnswered}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificate CTA banner */}
          <button
            type="button"
            onClick={onOpenCertificate}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-fun font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 cursor-pointer border-2 border-amber-300"
          >
            <Award className="w-5 h-5" />
            <span>Lihat &amp; Cetak Piagam Sertifikat Juara</span>
          </button>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onHome}
            className="flex-1 py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-fun font-bold text-sm border border-slate-300 transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Menu Utama</span>
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className="flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-fun font-bold text-sm shadow-md transition-transform cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Main Lagi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
