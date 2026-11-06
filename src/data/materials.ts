export interface StudySection {
  title: string;
  badge: string;
  color: string;
  content: string[];
  points: { label: string; value: string }[];
}

export const STUDY_MATERIALS: StudySection[] = [
  {
    title: 'Pengertian & Dasar Hukum Qurban',
    badge: 'Qurban',
    color: '#10b981',
    content: [
      'Kata Qurban berasal dari bahasa Arab "Qaraba - Yaqrabu - Qurbanan" yang berarti mendekatkan diri. Maksudnya adalah mendekatkan diri kepada Allah SWT dengan menjalankan perintah-Nya.',
      'Hukum berqurban adalah Sunnah Muakkad (sunnah yang sangat dianjurkan) bagi muslim yang telah baligh, berakal, dan mampu secara finansial.',
      'Dalil utama: QS. Al-Kautsar ayat 2: "Maka dirikanlah shalat karena Tuhanmu; dan berkurbanlah".'
    ],
    points: [
      { label: 'Waktu Pelaksanaan', value: '10 Dzulhijjah (setelah shalat Id) s.d. 13 Dzulhijjah sebelum maghrib (total 4 hari)' },
      { label: 'Porsi Sapi / Unta', value: '1 ekor sapi/kerbau/unta boleh untuk 7 orang patungan' },
      { label: 'Porsi Kambing', value: '1 ekor kambing/domba untuk 1 orang' },
      { label: 'Kondisi Daging', value: 'Afdhal dibagikan dalam kondisi MENTAH (segar)' }
    ]
  },
  {
    title: 'Pengertian & Dasar Hukum Aqiqah',
    badge: 'Aqiqah',
    color: '#0284c7',
    content: [
      'Secara bahasa, Aqiqah berarti memutus atau memotong (juga sebutan rambut yang tumbuh di kepala bayi saat lahir).',
      'Secara syariat, Aqiqah adalah penyembelihan hewan ternak (kambing/domba) sebagai ungkapan rasa syukur kepada Allah SWT atas anugerah kelahiran anak.',
      'Hukumnya adalah Sunnah Muakkad bagi orang tua yang mampu membiayainya.'
    ],
    points: [
      { label: 'Waktu Utama', value: 'Hari ke-7 setelah kelahiran (jika belum mampu: hari ke-14, 21, atau s.d. baligh)' },
      { label: 'Jumlah Anak Laki-Laki', value: '2 ekor kambing / domba yang sepadan' },
      { label: 'Jumlah Anak Perempuan', value: '1 ekor kambing / domba' },
      { label: 'Kondisi Daging', value: 'Sunnah dibagikan dalam kondisi SUDAH DIMASAK (disukai masakan manis)' }
    ]
  },
  {
    title: 'Syarat Sah Fisik & Usia Hewan Ternak',
    badge: 'Syarat Hewan',
    color: '#f59e0b',
    content: [
      'Hewan harus dari jenis Bahimatul An\'am (Unta, Sapi/Kerbau, Kambing/Domba) yang halal dan sehat.',
      'Hewan TIDAK boleh memiliki salah satu dari 4 cacat besar: (1) Buta sebelah yang jelas, (2) Sakit parah/kudis, (3) Pincang jelas tidak bisa berjalan bersama kawanannya, (4) Sangat kurus hingga sumsum tulangnya hilang.'
    ],
    points: [
      { label: 'Usia Unta', value: 'Minimal genap 5 tahun (memasuki tahun ke-6)' },
      { label: 'Usia Sapi / Kerbau', value: 'Minimal genap 2 tahun (memasuki tahun ke-3)' },
      { label: 'Usia Kambing Jawa', value: 'Minimal genap 1 tahun (memasuki tahun ke-2)' },
      { label: 'Usia Domba / Biri-biri', value: 'Minimal 1 tahun atau 6 bulan jika sudah tanggal giginya (jadza\'ah)' }
    ]
  },
  {
    title: 'Tata Cara & Syarat Sah Penyembelihan',
    badge: 'Penyembelihan',
    color: '#8b5cf6',
    content: [
      'Penyembelih harus berakal, muslim, dan berniat karena Allah SWT semata.',
      'Alat sembelih wajib sangat tajam (baja/besi/batu tajam, dilarang memakai kuku, gigi, atau tulang).',
      'Wajib memutus 3 saluran di leher: Saluran nafas (Hulqum), Saluran makan & minum (Mari\'), serta dua urat pembuluh darah di leher kiri dan kanan (Wadajain).',
      'Membaca: "Bismillahi Allahu Akbar" dan menghadapkan hewan ke arah Kiblat dengan membaringkannya di sisi lambung kiri.'
    ],
    points: [
      { label: 'Dilarang', value: 'Memperlihatkan pisau di hadapan hewan atau menyembelih di depan hewan lain' },
      { label: 'Upah Jagal', value: 'TIDAK boleh dibayar dari bagian daging/kulit hewan qurban, harus diberi upah tersendiri' },
      { label: 'Hak Pemilik (Shahibul)', value: 'Maksimal 1/3 bagian untuk dimakan sendiri, 1/3 fakir miskin, 1/3 hadiah' }
    ]
  }
];
