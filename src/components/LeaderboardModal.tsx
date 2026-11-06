import React, { useState } from 'react';
import { X, Trophy, Medal, Trash2, Users, User } from 'lucide-react';
import { HighScoreEntry, GameMode } from '../types/game';

interface LeaderboardModalProps {
  entries: HighScoreEntry[];
  onClear: () => void;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  entries,
  onClear,
  onClose,
}) => {
  const [filterMode, setFilterMode] = useState<GameMode | 'all'>('all');

  const filtered = entries.filter((e) => {
    if (filterMode === 'all') return true;
    return e.mode === filterMode;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-amber-400 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Trophy className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="text-xl font-fun font-bold">Papan Juara Petualang Berkah</h2>
              <p className="text-xs text-amber-100">Rekor Nilai Tertinggi SMP Kelas 9</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between px-6 py-3 bg-amber-50/60 border-b border-amber-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-xl font-fun font-bold text-xs cursor-pointer transition-all ${
                filterMode === 'all'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('solo')}
              className={`px-3 py-1.5 rounded-xl font-fun font-bold text-xs cursor-pointer transition-all flex items-center gap-1 ${
                filterMode === 'solo'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Individu</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('team')}
              className={`px-3 py-1.5 rounded-xl font-fun font-bold text-xs cursor-pointer transition-all flex items-center gap-1 ${
                filterMode === 'team'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Tim</span>
            </button>
          </div>

          {entries.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Rekor</span>
            </button>
          )}
        </div>

        {/* Leaderboard Table / Cards */}
        <div className="p-6 overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <Medal className="w-12 h-12 mx-auto text-slate-300" />
              <p className="font-fun font-bold text-base">Belum Ada Rekor Tercatat</p>
              <p className="text-xs">Jadilah yang pertama menuntaskan petualangan dan menorehkan nama!</p>
            </div>
          ) : (
            filtered.map((entry, idx) => {
              const rank = idx + 1;
              let rankBadge = 'bg-slate-100 text-slate-700';
              if (rank === 1) rankBadge = 'bg-amber-400 text-amber-950 font-bold';
              else if (rank === 2) rankBadge = 'bg-slate-300 text-slate-900 font-bold';
              else if (rank === 3) rankBadge = 'bg-amber-700/20 text-amber-900 font-bold';

              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 bg-white shadow-2xs hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-fun text-sm ${rankBadge}`}
                    >
                      {rank}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="text-slate-800 font-fun text-sm md:text-base">
                          {entry.playerNameOrTeam}
                        </strong>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          {entry.mode === 'team' ? 'Tim' : 'Individu'}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-700 font-medium block">
                        Karakter: {entry.characterName} &bull; Tepat: {entry.correctCount} / Salah: {entry.wrongCount}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-fun font-bold text-lg text-emerald-700 tabular-nums block">
                      {entry.score} Pts
                    </span>
                    <span className="text-[11px] text-slate-400 block">{entry.date}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-fun font-bold text-sm rounded-2xl shadow-sm transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
