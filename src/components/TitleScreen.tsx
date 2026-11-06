import React from 'react';
import { SoundSystem } from '../utils/audio';

interface TitleScreenProps {
  onStart?: () => void;
  onStartGame?: () => void;
  onOpenStudyGuide: () => void;
  onOpenLeaderboard: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStart,
  onStartGame,
  onOpenStudyGuide,
  onOpenLeaderboard,
  isMuted,
  onToggleMute,
}) => {
  const handleStart = () => {
    if (onStart) onStart();
    else if (onStartGame) onStartGame();
  };
  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center p-6 bg-linear-to-b from-sky-400 via-teal-500 to-emerald-800 text-white overflow-hidden select-none">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="islamic-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="40" cy="40" r="16" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
        </svg>
      </div>

      {/* Floating clouds & stars */}
      <div className="absolute top-10 left-12 w-28 h-10 bg-white/30 rounded-full blur-xs animate-float" />
      <div className="absolute top-20 right-16 w-36 h-12 bg-white/25 rounded-full blur-xs animate-float" style={{ animationDelay: '1.5s' }} />

      {/* Top Header Utilities */}
      <div className="w-full max-w-5xl flex justify-between items-center z-10 pt-2">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PAI SMP KELAS 9 • KURIKULUM MERDEKA</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            className="w-10 h-10 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/20 hover:bg-slate-900/60 flex items-center justify-center transition-all cursor-pointer shadow-md"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? (
              <svg className="w-5 h-5 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Leaderboard button */}
          <button
            type="button"
            onClick={onOpenLeaderboard}
            className="px-3.5 py-2 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/20 hover:bg-slate-900/60 font-fun text-xs font-bold text-amber-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <span>🏆</span>
            <span className="hidden sm:inline">Papan Juara</span>
          </button>
        </div>
      </div>

      {/* Main Centerpiece Lockup */}
      <div className="flex flex-col items-center text-center max-w-3xl z-10 my-auto px-4">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-300/40 text-emerald-300 font-bold text-xs tracking-wider mb-4 shadow-lg backdrop-blur-sm">
          <span>✨ GAME EDUKASI RINTANGAN &amp; KUIS BERKAH ✨</span>
        </div>

        {/* Title Lockup */}
        <h1 className="font-fun text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md leading-none mb-3">
          PETUALANG <span className="text-amber-300 underline decoration-amber-400 decoration-wavy decoration-2">BERKAH</span>
        </h1>
        <h2 className="font-fun text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-100 drop-shadow-sm mb-4">
          Qurban &amp; Aqiqah SMP Kelas 9
        </h2>

        <p className="text-sm sm:text-base text-emerald-50/90 max-w-xl font-medium leading-relaxed mb-6">
          Lewati rintangan bebatuan, pagar, dan lumpur bersama karakter pilihanmu! Jawab pertanyaan kuis di setiap pos checkpoint:
          <span className="block mt-1 font-bold text-amber-200">
            Benar = +100 Poin &nbsp;•&nbsp; Salah = -50 Poin
          </span>
        </p>

        {/* Character Showcase Teaser */}
        <div className="flex justify-center items-center gap-3 sm:gap-5 mb-8">
          <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
            <span className="text-4xl sm:text-5xl drop-shadow-md animate-bounce" style={{ animationDuration: '2.5s' }}>🐑</span>
            <span className="text-[11px] font-bold text-white/90 font-fun mt-1">Domba</span>
          </div>
          <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
            <span className="text-4xl sm:text-5xl drop-shadow-md animate-bounce" style={{ animationDuration: '2.2s' }}>🐐</span>
            <span className="text-[11px] font-bold text-white/90 font-fun mt-1">Etawa</span>
          </div>
          <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
            <span className="text-4xl sm:text-5xl drop-shadow-md animate-bounce" style={{ animationDuration: '2.8s' }}>🐂</span>
            <span className="text-[11px] font-bold text-white/90 font-fun mt-1">Lembu</span>
          </div>
          <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
            <span className="text-4xl sm:text-5xl drop-shadow-md animate-bounce" style={{ animationDuration: '2.4s' }}>🐪</span>
            <span className="text-[11px] font-bold text-white/90 font-fun mt-1">Unta</span>
          </div>
          <div className="flex flex-col items-center transform hover:scale-110 transition-transform">
            <span className="text-4xl sm:text-5xl drop-shadow-md animate-bounce" style={{ animationDuration: '2.6s' }}>👳</span>
            <span className="text-[11px] font-bold text-white/90 font-fun mt-1">Santri</span>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => {
              SoundSystem.playJump();
              handleStart();
            }}
            className="w-full sm:w-auto px-10 py-4 rounded-3xl bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-fun font-extrabold text-xl shadow-2xl hover:shadow-amber-500/50 active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-amber-200 cursor-pointer glow-green"
          >
            <span>🎮 MULAI MAIN SEKARANG</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            type="button"
            onClick={onOpenStudyGuide}
            className="w-full sm:w-auto px-6 py-4 rounded-3xl bg-white/20 hover:bg-white/30 text-white font-fun font-bold text-base shadow-lg backdrop-blur-md border border-white/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>📖 Pelajari Materi Dulu</span>
          </button>
        </div>
      </div>

      {/* Control Hints Bar */}
      <div className="z-10 pb-2 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/15 text-xs text-emerald-100 font-medium shadow-inner">
          <span className="flex items-center gap-1 font-bold text-white">
            <kbd className="px-2 py-0.5 rounded-md bg-white/20 border border-white/30 text-[10px]">SPASI</kbd> / <kbd className="px-2 py-0.5 rounded-md bg-white/20 border border-white/30 text-[10px]">W</kbd> Lompat
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 font-bold text-white">
            <kbd className="px-2 py-0.5 rounded-md bg-white/20 border border-white/30 text-[10px]">S</kbd> / <kbd className="px-2 py-0.5 rounded-md bg-white/20 border border-white/30 text-[10px]">↓</kbd> Meluncur
          </span>
          <span>•</span>
          <span>Mendukung Layar Sentuh Chromebook &amp; HP</span>
        </div>
      </div>
    </div>
  );
};
