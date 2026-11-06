import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { STUDY_MATERIALS } from '../data/materials';

interface StudyGuideModalProps {
  onClose: () => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'tabel' | 'syarat_hewan'>('ringkasan');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-400 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-amber-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-fun font-bold text-white">
                Kitab Panduan Cerdas Qurban &amp; Aqiqah
              </h2>
              <p className="text-xs text-emerald-200">
                Materi Lengkap Pendidikan Agama Islam Kelas 9 SMP
              </p>
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

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('ringkasan')}
            className={`px-4 py-2.5 rounded-t-2xl font-fun font-bold text-sm transition-all cursor-pointer border-t border-x ${
              activeTab === 'ringkasan'
                ? 'bg-white text-emerald-800 border-slate-200 -mb-px shadow-xs'
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Ringkasan Materi
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tabel')}
            className={`px-4 py-2.5 rounded-t-2xl font-fun font-bold text-sm transition-all cursor-pointer border-t border-x ${
              activeTab === 'tabel'
                ? 'bg-white text-emerald-800 border-slate-200 -mb-px shadow-xs'
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Tabel Perbandingan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('syarat_hewan')}
            className={`px-4 py-2.5 rounded-t-2xl font-fun font-bold text-sm transition-all cursor-pointer border-t border-x ${
              activeTab === 'syarat_hewan'
                ? 'bg-white text-emerald-800 border-slate-200 -mb-px shadow-xs'
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800'
            }`}
          >
            Syarat Sah &amp; Cacat Hewan
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'ringkasan' && (
            <div className="space-y-5">
              {STUDY_MATERIALS.map((sec, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-fun font-bold text-lg text-slate-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <span>{sec.title}</span>
                    </h3>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: sec.color }}
                    >
                      {sec.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {sec.content.map((p, pIdx) => (
                      <p key={pIdx}>&bull; {p}</p>
                    ))}
                  </div>

                  {sec.points && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {sec.points.map((pt, ptIdx) => (
                        <div
                          key={ptIdx}
                          className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs"
                        >
                          <span className="text-xs font-bold text-emerald-700 block">
                            {pt.label}:
                          </span>
                          <span className="text-xs text-slate-800 font-medium">
                            {pt.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'tabel' && (
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-600">
                Pahami perbedaan utama antara ibadah Qurban dan Aqiqah untuk menjawab soal kuis dengan tepat (+100 poin!):
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-emerald-800 text-white font-fun">
                    <tr>
                      <th className="p-3.5">Faktor Pembeda</th>
                      <th className="p-3.5 bg-emerald-700">Ibadah Qurban</th>
                      <th className="p-3.5 bg-teal-800">Ibadah Aqiqah</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800 bg-slate-50">Tujuan &amp; Makna</td>
                      <td className="p-3.5 text-slate-700">Mendekatkan diri kepada Allah &amp; meneladani Nabi Ibrahim AS</td>
                      <td className="p-3.5 text-slate-700">Ungkapan rasa syukur atas kelahiran anak &amp; melepas gadai bayi</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800 bg-slate-50">Waktu Pelaksanaan</td>
                      <td className="p-3.5 text-slate-700 font-medium">
                        10 Dzulhijjah (setelah shalat Id) s.d. 13 Dzulhijjah (4 hari)
                      </td>
                      <td className="p-3.5 text-slate-700 font-medium">
                        Hari ke-7 setelah kelahiran (atau ke-14, 21, dst.)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800 bg-slate-50">Jenis &amp; Jumlah Hewan</td>
                      <td className="p-3.5 text-slate-700">
                        1 ekor Unta/Sapi (untuk 7 orang) atau 1 Kambing/Domba (1 orang)
                      </td>
                      <td className="p-3.5 text-slate-700">
                        Laki-laki: 2 ekor kambing/domba. Perempuan: 1 ekor kambing/domba
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800 bg-slate-50">Kondisi Daging Dibagikan</td>
                      <td className="p-3.5 text-emerald-800 font-bold bg-emerald-50/50">
                        Afdhal dalam keadaan MENTAH (segar)
                      </td>
                      <td className="p-3.5 text-teal-800 font-bold bg-teal-50/50">
                        Sunnah dalam keadaan SUDAH DIMASAK (matang manis)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800 bg-slate-50">Hak Makan Pemilik</td>
                      <td className="p-3.5 text-slate-700">
                        Boleh makan maks 1/3 bagian (kecuali qurban nadzar, haram makan)
                      </td>
                      <td className="p-3.5 text-slate-700">
                        Orang tua dan keluarga boleh ikut menikmati daging aqiqah
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-800 bg-slate-50">Amalan Penyerta</td>
                      <td className="p-3.5 text-slate-700">Shalat Idul Adha &amp; Takbiran Tasyrik</td>
                      <td className="p-3.5 text-slate-700">Mencukur rambut bayi, sedekah emas/perak, memberi nama baik</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'syarat_hewan' && (
            <div className="space-y-6">
              {/* Usia Minimal */}
              <div>
                <h4 className="font-fun font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Batas Minimal Umur Hewan Ternak (Musinnah):</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <span className="text-2xl mb-1 block">🐫</span>
                    <strong className="text-amber-900 font-fun block text-base">Unta</strong>
                    <span className="text-xs text-amber-800">Minimal genap <strong>5 tahun</strong> (masuk tahun ke-6)</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
                    <span className="text-2xl mb-1 block">🐂</span>
                    <strong className="text-orange-900 font-fun block text-base">Sapi / Kerbau</strong>
                    <span className="text-xs text-orange-800">Minimal genap <strong>2 tahun</strong> (masuk tahun ke-3)</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-2xl mb-1 block">🐐</span>
                    <strong className="text-emerald-900 font-fun block text-base">Kambing Jawa</strong>
                    <span className="text-xs text-emerald-800">Minimal genap <strong>1 tahun</strong> (masuk tahun ke-2)</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                    <span className="text-2xl mb-1 block">🐑</span>
                    <strong className="text-teal-900 font-fun block text-base">Domba / Biri-biri</strong>
                    <span className="text-xs text-teal-800">Minimal <strong>1 tahun</strong> atau 6 bulan bila sudah tanggal gigi</span>
                  </div>
                </div>
              </div>

              {/* 4 Cacat yang Tidak Boleh */}
              <div className="p-5 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-3">
                <h4 className="font-fun font-bold text-base text-rose-900 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>4 Cacat yang Menyebabkan Hewan TIDAK SAH (Hadits Shahih):</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-950 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                    <span><strong>Buta Sebelah atau Kedua Matanya</strong> yang jelas kerusakannya.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                    <span><strong>Sakit Parah</strong> yang nyata gejalanya (kudisan akut, lemas tak berdaya).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                    <span><strong>Pincang yang Sangat Nyata</strong> hingga tidak mampu berjalan bersama rombongan kawanan hewan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                    <span><strong>Sangat Kurus Kering</strong> hingga hilang sumsum pada tulang-tulangnya.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-fun font-bold rounded-2xl shadow-md transition-colors cursor-pointer"
          >
            Tutup Panduan &amp; Lanjut Main
          </button>
        </div>
      </div>
    </div>
  );
};
