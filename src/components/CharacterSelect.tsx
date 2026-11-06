import React, { useState } from 'react';
import { User, Users, Check, Sparkles, ArrowLeft, Play, Shield } from 'lucide-react';
import { CharacterType, GameMode, PlayerProfile, TeamMember } from '../types/game';
import { CHARACTERS, ACCESSORY_COLORS } from '../data/characters';

interface CharacterSelectProps {
  onConfirmSolo: (player: PlayerProfile) => void;
  onConfirmTeam: (teamName: string, members: TeamMember[]) => void;
  onBack: () => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  onConfirmSolo,
  onConfirmTeam,
  onBack,
}) => {
  const [mode, setMode] = useState<GameMode>('solo');

  // Solo State
  const [soloPlayerName, setSoloPlayerName] = useState('Ahmad Zaky');
  const [soloCharType, setSoloCharType] = useState<CharacterType>('sheep');
  const [soloCharCustomName, setSoloCharCustomName] = useState('Si Domba Juara');
  const [soloAccessoryColor, setSoloAccessoryColor] = useState(ACCESSORY_COLORS[0].value);

  // Team State
  const [teamName, setTeamName] = useState('Regu Al-Ikhlas 9A');
  const [teamMemberCount, setTeamMemberCount] = useState<number>(3);
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 'm1',
      name: 'Fatih Al-Ghifari',
      characterId: 'sheep',
      customCharacterName: 'Shaun Si Tangkas',
      accessoryColor: ACCESSORY_COLORS[0].value,
      questionsAnswered: 0,
      correctAnswers: 0,
      pointsContributed: 0,
    },
    {
      id: 'm2',
      name: 'Aisyah Humaira',
      characterId: 'goat',
      customCharacterName: 'Etawa Super Barakah',
      accessoryColor: ACCESSORY_COLORS[1].value,
      questionsAnswered: 0,
      correctAnswers: 0,
      pointsContributed: 0,
    },
    {
      id: 'm3',
      name: 'Rizky Ramadhan',
      characterId: 'cow',
      customCharacterName: 'Lembu Perkasa Tujuh',
      accessoryColor: ACCESSORY_COLORS[3].value,
      questionsAnswered: 0,
      correctAnswers: 0,
      pointsContributed: 0,
    },
    {
      id: 'm4',
      name: 'Hafiz Pratama',
      characterId: 'camel',
      customCharacterName: 'Unta Safar Al-Mukarramah',
      accessoryColor: ACCESSORY_COLORS[4].value,
      questionsAnswered: 0,
      correctAnswers: 0,
      pointsContributed: 0,
    },
  ]);

  const [activeEditingMemberIdx, setActiveEditingMemberIdx] = useState<number>(0);

  // Character preview selection helper
  const selectedSoloChar = CHARACTERS.find((c) => c.id === soloCharType) || CHARACTERS[0];

  // Handle Team member change
  const updateMember = (idx: number, updates: Partial<TeamMember>) => {
    setMembers((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], ...updates };
      return next;
    });
  };

  const handleStartGame = () => {
    if (mode === 'solo') {
      const trimmedPlayer = soloPlayerName.trim() || 'Petualang Cerdas';
      const trimmedChar = soloCharCustomName.trim() || selectedSoloChar.name;
      onConfirmSolo({
        name: trimmedPlayer,
        characterId: soloCharType,
        customCharacterName: trimmedChar,
        accessoryColor: soloAccessoryColor,
      });
    } else {
      const trimmedTeam = teamName.trim() || 'Tim Cerdas Cermat 9';
      const activeList = members.slice(0, teamMemberCount).map((m, i) => ({
        ...m,
        name: m.name.trim() || `Anggota ${i + 1}`,
        customCharacterName: m.customCharacterName.trim() || `Karakter ${i + 1}`,
      }));
      onConfirmTeam(trimmedTeam, activeList);
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-y-auto bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-4 sm:p-6 md:p-8 select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation / Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all cursor-pointer border border-white/15"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>

          <h2 className="text-xl sm:text-2xl font-fun font-bold text-amber-300 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Pilih Mode &amp; Karakter</span>
          </h2>

          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Mode Selector (Individu vs Team) */}
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <button
            type="button"
            onClick={() => setMode('solo')}
            className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
              mode === 'solo'
                ? 'bg-emerald-600/90 border-emerald-400 shadow-xl shadow-emerald-900/40 text-white'
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            <User className="w-7 h-7" />
            <span className="font-fun font-bold text-base md:text-lg">Main Individu</span>
            <span className="text-xs opacity-80">1 Pemain Mandiri</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('team')}
            className={`p-4 rounded-3xl border-2 flex flex-col items-center gap-2 transition-all cursor-pointer ${
              mode === 'team'
                ? 'bg-emerald-600/90 border-emerald-400 shadow-xl shadow-emerald-900/40 text-white'
                : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Users className="w-7 h-7" />
            <span className="font-fun font-bold text-base md:text-lg">Main Tim / Kelompok</span>
            <span className="text-xs opacity-80">2-4 Siswa Estafet</span>
          </button>
        </div>

        {/* --- SOLO MODE SETTINGS --- */}
        {mode === 'solo' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Player Name and Custom Character Name Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/5 p-5 rounded-3xl border border-white/10">
              <div>
                <label className="block text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">
                  Nama Lengkap / Panggilan Siswa:
                </label>
                <input
                  type="text"
                  value={soloPlayerName}
                  onChange={(e) => setSoloPlayerName(e.target.value)}
                  placeholder="Contoh: Ahmad Zaky (Kelas 9A)"
                  maxLength={28}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border-2 border-slate-700 focus:border-emerald-400 focus:outline-hidden text-white font-medium text-sm transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                  Beri Nama Karakter Pilihanmu Sendiri:
                </label>
                <input
                  type="text"
                  value={soloCharCustomName}
                  onChange={(e) => setSoloCharCustomName(e.target.value)}
                  placeholder="Contoh: Si Domba Juara, Sang Etawa Barakah"
                  maxLength={28}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border-2 border-slate-700 focus:border-amber-400 focus:outline-hidden text-white font-medium text-sm transition-colors"
                />
              </div>
            </div>

            {/* Character Cards Carousel */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-emerald-300 font-bold mb-3">
                Pilih Jenis Karakter Bertema Qurban &amp; Aqiqah:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CHARACTERS.map((char) => {
                  const isSelected = soloCharType === char.id;
                  return (
                    <div
                      key={char.id}
                      onClick={() => {
                        setSoloCharType(char.id);
                        if (!soloCharCustomName || soloCharCustomName === selectedSoloChar.name) {
                          setSoloCharCustomName(char.defaultCustomName);
                        }
                      }}
                      className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'bg-gradient-to-br from-emerald-900/60 to-emerald-800/40 border-emerald-400 ring-2 ring-emerald-400/50 shadow-lg'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-3xl">
                            {char.id === 'sheep'
                              ? '🐑'
                              : char.id === 'goat'
                              ? '🐐'
                              : char.id === 'cow'
                              ? '🐂'
                              : char.id === 'camel'
                              ? '🐫'
                              : '👳'}
                          </span>
                          <div>
                            <h3 className="font-fun font-bold text-lg text-white leading-tight">
                              {char.name}
                            </h3>
                            <span className="text-xs text-amber-300 font-medium">
                              {char.title}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed mb-3">
                          {char.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
                        <span>{char.specialTrait}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accessory Color Swatches */}
            <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-300 font-bold block mb-1">
                  Warna Syal &amp; Aksesoris Karakter:
                </span>
                <span className="text-xs text-slate-400">Pilih warna pita/syal berkah karakter kamu</span>
              </div>
              <div className="flex items-center gap-3">
                {ACCESSORY_COLORS.map((col) => (
                  <button
                    key={col.value}
                    type="button"
                    onClick={() => setSoloAccessoryColor(col.value)}
                    className={`w-9 h-9 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                      soloAccessoryColor === col.value ? 'scale-120 ring-3 ring-white' : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: col.value }}
                    title={col.name}
                  >
                    {soloAccessoryColor === col.value && <Check className="w-4 h-4 text-white stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TEAM MODE SETTINGS --- */}
        {mode === 'team' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Team Name & Member Count */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white/5 p-5 rounded-3xl border border-white/10">
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">
                  Nama Tim / Kelompok PAI Kelas 9:
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Contoh: Regu Abu Bakar, Tim Barakah 9B"
                  maxLength={30}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border-2 border-slate-700 focus:border-emerald-400 focus:outline-hidden text-white font-medium text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                  Jumlah Anggota Tim:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 4].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => {
                        setTeamMemberCount(cnt);
                        if (activeEditingMemberIdx >= cnt) {
                          setActiveEditingMemberIdx(cnt - 1);
                        }
                      }}
                      className={`py-3 rounded-2xl font-fun font-bold text-sm border cursor-pointer transition-all ${
                        teamMemberCount === cnt
                          ? 'bg-amber-500 text-slate-950 border-amber-300'
                          : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {cnt} Siswa
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Member Tabs */}
            <div className="flex gap-2 border-b border-white/15 pb-2 overflow-x-auto">
              {Array.from({ length: teamMemberCount }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveEditingMemberIdx(idx)}
                  className={`px-4 py-2.5 rounded-2xl font-fun font-bold text-sm whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                    activeEditingMemberIdx === idx
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>
                    Anggota {idx + 1}: {members[idx].name || 'Siswa'}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Member Customization Box */}
            {members[activeEditingMemberIdx] && (
              <div className="p-5 bg-white/5 rounded-3xl border border-white/10 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">
                      Nama Siswa (Anggota {activeEditingMemberIdx + 1}):
                    </label>
                    <input
                      type="text"
                      value={members[activeEditingMemberIdx].name}
                      onChange={(e) => updateMember(activeEditingMemberIdx, { name: e.target.value })}
                      placeholder={`Nama Anggota ${activeEditingMemberIdx + 1}`}
                      maxLength={24}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border-2 border-slate-700 focus:border-emerald-400 focus:outline-hidden text-white font-medium text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                      Beri Nama Karakter Milik Siswa Ini:
                    </label>
                    <input
                      type="text"
                      value={members[activeEditingMemberIdx].customCharacterName}
                      onChange={(e) =>
                        updateMember(activeEditingMemberIdx, { customCharacterName: e.target.value })
                      }
                      placeholder="Nama Panggilan Hewan Pilihan"
                      maxLength={24}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border-2 border-slate-700 focus:border-amber-400 focus:outline-hidden text-white font-medium text-sm"
                    />
                  </div>
                </div>

                {/* Character selection for this member */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-bold mb-2">
                    Pilih Karakter untuk {members[activeEditingMemberIdx].name}:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {CHARACTERS.map((char) => {
                      const isSel = members[activeEditingMemberIdx].characterId === char.id;
                      return (
                        <button
                          key={char.id}
                          type="button"
                          onClick={() =>
                            updateMember(activeEditingMemberIdx, {
                              characterId: char.id,
                              customCharacterName: char.defaultCustomName,
                            })
                          }
                          className={`p-3 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            isSel
                              ? 'bg-emerald-700/80 border-emerald-400 shadow-lg text-white'
                              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800'
                          }`}
                        >
                          <span className="text-2xl">
                            {char.id === 'sheep'
                              ? '🐑'
                              : char.id === 'goat'
                              ? '🐐'
                              : char.id === 'cow'
                              ? '🐂'
                              : char.id === 'camel'
                              ? '🐫'
                              : '👳'}
                          </span>
                          <span className="font-fun font-bold text-xs truncate max-w-full">
                            {char.animalType}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scarf color for this member */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-slate-300 font-semibold">Warna Aksesoris:</span>
                  <div className="flex items-center gap-2">
                    {ACCESSORY_COLORS.map((col) => (
                      <button
                        key={col.value}
                        type="button"
                        onClick={() =>
                          updateMember(activeEditingMemberIdx, { accessoryColor: col.value })
                        }
                        className={`w-7 h-7 rounded-full cursor-pointer transition-transform ${
                          members[activeEditingMemberIdx].accessoryColor === col.value
                            ? 'scale-125 ring-2 ring-white'
                            : 'hover:scale-110'
                        }`}
                        style={{ backgroundColor: col.value }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Start Game Action */}
        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={handleStartGame}
            className="px-10 py-4.5 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 active:scale-95 text-white font-fun font-bold text-xl shadow-2xl border-b-6 border-emerald-800 transition-all cursor-pointer flex items-center gap-3 glow-green"
          >
            <Play className="w-6 h-6 fill-white text-white" />
            <span>Mulai Petualangan Barakah!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
