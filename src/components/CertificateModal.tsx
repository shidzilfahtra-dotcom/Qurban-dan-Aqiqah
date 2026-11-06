import React from 'react';
import { X, Printer, Award, Sparkles, CheckCircle } from 'lucide-react';
import { GameMode } from '../types/game';

interface CertificateModalProps {
  recipientName: string;
  mode: GameMode;
  members?: string[];
  characterCustomName: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  grade: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  recipientName,
  mode,
  members,
  characterCustomName,
  score,
  correctCount,
  totalQuestions,
  grade,
  onClose,
}) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-amber-50 rounded-3xl shadow-2xl border-8 border-amber-300 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Action Header (Hidden during print) */}
        <div className="bg-emerald-800 text-white px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-300" />
            <span className="font-fun font-bold text-sm md:text-base">
              Piagam Penghargaan Petualang Berkah SMP Kelas 9
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-fun font-bold text-xs md:text-sm shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Body */}
        <div className="p-8 sm:p-12 overflow-y-auto text-center space-y-6 relative bg-gradient-to-b from-amber-50 via-white to-amber-50/70 border-8 border-double border-amber-600/40 m-3 sm:m-4 rounded-2xl">
          {/* Certificate Header Lockup */}
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs uppercase tracking-widest font-extrabold">
                MADRASAH / SEKOLAH MENENGAH PERTAMA (SMP)
              </span>
              <Sparkles className="w-5 h-5" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-fun font-bold text-emerald-950 tracking-wide uppercase pt-1">
              PIAGAM PENGHARGAAN
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-emerald-800 italic">
              Petualang Berkah Materi Qurban &amp; Aqiqah Kelas 9
            </p>
          </div>

          <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />

          {/* Recipient Details */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
              Dianugerahkan dengan penuh kehormatan kepada:
            </p>
            <h2 className="text-2xl sm:text-4xl font-fun font-bold text-emerald-900 border-b-2 border-emerald-300 inline-block px-6 pb-1">
              {recipientName}
            </h2>

            {mode === 'team' && members && members.length > 0 && (
              <p className="text-xs text-slate-600 pt-1 font-medium">
                Anggota Tim: {members.join(', ')}
              </p>
            )}

            <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto pt-2 leading-relaxed">
              Telah berhasil menaklukkan rintangan petualangan bersama karakter andalan{' '}
              <strong className="text-emerald-800 underline decoration-amber-400">
                "{characterCustomName}"
              </strong>{' '}
              serta menjawab soal-soal syariat Qurban dan Aqiqah dengan pemahaman luar biasa.
            </p>
          </div>

          {/* Performance Badges */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto py-2">
            <div className="p-3 bg-white rounded-2xl border-2 border-amber-300 shadow-xs">
              <span className="text-[11px] uppercase font-bold text-slate-500 block">Skor Akhir</span>
              <span className="text-xl sm:text-2xl font-fun font-bold text-emerald-700">
                {score}
              </span>
            </div>

            <div className="p-3 bg-white rounded-2xl border-2 border-emerald-300 shadow-xs">
              <span className="text-[11px] uppercase font-bold text-slate-500 block">Kuis Tepat</span>
              <span className="text-xl sm:text-2xl font-fun font-bold text-emerald-800">
                {correctCount} / {totalQuestions}
              </span>
            </div>

            <div className="p-3 bg-white rounded-2xl border-2 border-amber-300 shadow-xs">
              <span className="text-[11px] uppercase font-bold text-slate-500 block">Predikat</span>
              <span className="text-lg sm:text-xl font-fun font-bold text-amber-700">
                {grade}
              </span>
            </div>
          </div>

          {/* Golden Seal & Signatures */}
          <div className="pt-4 flex items-center justify-between max-w-xl mx-auto text-xs text-slate-600 border-t border-amber-200">
            <div className="text-left space-y-1">
              <span>Tanggal: {currentDate}</span>
              <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Terverifikasi Kurikulum PAI</span>
              </div>
            </div>

            {/* Rosette Seal */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-4 border-amber-600 flex flex-col items-center justify-center text-slate-900 shadow-md transform rotate-12">
              <Award className="w-6 h-6 text-amber-900" />
              <span className="text-[8px] font-bold uppercase tracking-tighter">MUMTAZ</span>
            </div>

            <div className="text-right space-y-1">
              <span className="block font-semibold">Guru Pengampu PAI</span>
              <span className="italic block text-slate-500">Guru PAI Kelas 9 SMP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
