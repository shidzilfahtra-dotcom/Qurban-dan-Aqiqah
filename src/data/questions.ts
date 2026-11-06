import { Question } from '../types/game';

export const QUESTIONS: Question[] = [
  // --- Kategori Qurban: Pengertian & Hukum ---
  {
    id: 1,
    category: 'qurban',
    difficulty: 'mudah',
    question: 'Secara bahasa, kata "Qurban" berasal dari bahasa Arab "Qaraba - Yaqrabu - Qurbanan" yang artinya...',
    options: ['Menjauhkan diri', 'Mendekatkan diri', 'Menyembelih hewan', 'Memberi sedekah'],
    correctIndex: 1,
    explanation: 'Qurban secara bahasa bermakna "dekat" atau "mendekatkan diri" kepada Allah SWT dengan menjalankan perintah-Nya.',
    quranHadithReference: 'Q.S. Al-Kautsar: 2',
  },
  {
    id: 2,
    category: 'qurban',
    difficulty: 'mudah',
    question: 'Apakah hukum asal melaksanakan ibadah penyembelihan hewan Qurban bagi umat Islam yang mampu?',
    options: ['Fardhu \'Ain', 'Fardhu Kifayah', 'Sunnah Muakkad (sangat dianjurkan)', 'Makruh'],
    correctIndex: 2,
    explanation: 'Hukum ibadah qurban menurut mayoritas ulama adalah Sunnah Muakkad (sunnah yang sangat diutamakan bagi yang memiliki kelapangan rezeki).',
  },
  {
    id: 3,
    category: 'qurban',
    difficulty: 'sedang',
    question: 'Surat dalam Al-Qur\'an yang menjadi landasan utama perintah berqurban adalah...',
    options: ['Q.S. Al-Ikhlas ayat 1-2', 'Q.S. Al-Kautsar ayat 1-2', 'Q.S. Al-Baqarah ayat 183', 'Q.S. Al-Ma\'un ayat 1-3'],
    correctIndex: 1,
    explanation: 'Dalam Q.S. Al-Kautsar ayat 2 Allah SWT berfirman: "Fa shalli li rabbika wan-har" (Maka laksanakanlah shalat karena Tuhanmu, dan berkurbanlah).',
    quranHadithReference: 'Q.S. Al-Kautsar ayat 2',
  },
  {
    id: 4,
    category: 'qurban',
    difficulty: 'sedang',
    question: 'Penyembelihan hewan qurban dilaksanakan pada tanggal...',
    options: [
      '1 Muharram sampai 10 Muharram',
      '1 Ramadhan sampai 1 Syawal',
      '10 Dzulhijjah setelah shalat Id sampai 13 Dzulhijjah sebelum maghrib',
      'Setiap hari Jumat di bulan Dzulhijjah'
    ],
    correctIndex: 2,
    explanation: 'Waktu penyembelihan qurban adalah 4 hari: Hari Raya Idul Adha (10 Dzulhijjah) ditambah Hari Tasyrik (11, 12, dan 13 Dzulhijjah) sebelum matahari terbenam.',
  },
  {
    id: 5,
    category: 'qurban',
    difficulty: 'mudah',
    question: 'Hari Tasyrik yang diperbolehkan untuk menyembelih hewan qurban adalah tanggal...',
    options: ['1, 2, dan 3 Syawal', '11, 12, dan 13 Dzulhijjah', '27, 28, dan 29 Rajab', '9, 10, dan 11 Muharram'],
    correctIndex: 1,
    explanation: 'Hari Tasyrik adalah tanggal 11, 12, dan 13 Dzulhijjah. Pada hari-hari ini kaum muslimin diharamkan berpuasa dan boleh menyembelih hewan qurban.',
  },

  // --- Kategori Syarat Hewan Qurban ---
  {
    id: 6,
    category: 'syarat_hewan',
    difficulty: 'mudah',
    question: 'Satu ekor sapi atau kerbau yang sehat boleh diniatkan untuk qurban sebanyak...',
    options: ['1 orang', '3 orang', '5 orang', '7 orang'],
    correctIndex: 3,
    explanation: 'Berdasarkan hadits riwayat Jabir bin Abdillah RA, satu ekor sapi atau unta boleh diniatkan secara patungan untuk 7 orang keluarga/jamaah.',
  },
  {
    id: 7,
    category: 'syarat_hewan',
    difficulty: 'mudah',
    question: 'Satu ekor kambing atau domba qurban hanya mencukupi untuk pahala qurban...',
    options: ['1 orang', '2 orang', '3 orang', '7 orang'],
    correctIndex: 0,
    explanation: 'Satu ekor kambing atau domba diperuntukkan bagi 1 orang yang berqurban (meskipun pahalanya boleh diniatkan untuk seluruh anggota keluarganya).',
  },
  {
    id: 8,
    category: 'syarat_hewan',
    difficulty: 'sedang',
    question: 'Berapakah batas minimal usia hewan SAPI atau KERBAU agar sah dijadikan hewan qurban?',
    options: ['Minimal 6 bulan', 'Minimal 1 tahun', 'Minimal 2 tahun (memasuki tahun ke-3)', 'Minimal 5 tahun'],
    correctIndex: 2,
    explanation: 'Syarat umur sapi/kerbau qurban adalah minimal genap berusia 2 tahun dan telah memasuki tahun ke-3 (musinnah).',
  },
  {
    id: 9,
    category: 'syarat_hewan',
    difficulty: 'sedang',
    question: 'Berapakah batas minimal usia seekor UNTA agar sah disembelih untuk qurban?',
    options: ['Minimal 1 tahun', 'Minimal 2 tahun', 'Minimal 3 tahun', 'Minimal 5 tahun (memasuki tahun ke-6)'],
    correctIndex: 3,
    explanation: 'Unta yang sah dijadikan qurban minimal telah berumur 5 tahun genap dan menginjak tahun ke-6.',
  },
  {
    id: 10,
    category: 'syarat_hewan',
    difficulty: 'sedang',
    question: 'Berapa batas usia minimal kambing jawa/kacang agar sah menjadi hewan qurban?',
    options: ['Minimal 6 bulan', 'Minimal 1 tahun (menginjak tahun ke-2)', 'Minimal 3 tahun', 'Minimal 4 tahun'],
    correctIndex: 1,
    explanation: 'Kambing jenis ma\'iz (kambing kacang/jawa) disyaratkan minimal berumur 1 tahun genap dan telah masuk tahun ke-2.',
  },
  {
    id: 11,
    category: 'syarat_hewan',
    difficulty: 'sulit',
    question: 'Manakah di antara kondisi hewan berikut yang MENYEBABKAN TIDAK SAH dijadikan hewan qurban?',
    options: [
      'Bulu hewan warnanya belang hitam dan putih',
      'Tanduk hewan berukuran sedikit panjang',
      'Hewan buta sebelah matanya secara jelas atau pincang parah',
      'Hewan berkelamin jantan yang gemuk'
    ],
    correctIndex: 2,
    explanation: 'Rasulullah SAW menyebutkan 4 cacat yang tidak boleh untuk qurban: buta sebelah yang jelas, sakit yang parah, pincang yang nyata, dan sangat kurus hingga hilang sumsumnya.',
  },
  {
    id: 12,
    category: 'syarat_hewan',
    difficulty: 'sedang',
    question: 'Jika seseorang menyembelih hewan qurban sebelum selesai pelaksanaan Shalat Idul Adha, maka status sembelihan tersebut adalah...',
    options: [
      'Tetap sah sebagai qurban berkah',
      'Tidak sah sebagai qurban, hanya bernilai daging sembelihan biasa',
      'Diterima tetapi pahalanya berkurang separuh',
      'Wajib diulang saat hari tasyrik tanpa perlu beli hewan baru'
    ],
    correctIndex: 1,
    explanation: 'Barang siapa yang menyembelih sebelum shalat Idul Adha, maka sesungguhnya ia hanya menyembelih untuk dirinya sendiri (sedekah daging biasa), bukan qurban.',
  },

  // --- Kategori Aqiqah: Pengertian & Ketentuan ---
  {
    id: 13,
    category: 'aqiqah',
    difficulty: 'mudah',
    question: 'Secara bahasa, "Aqiqah" berarti memutus atau memotong. Secara istilah syariat, Aqiqah adalah...',
    options: [
      'Menyembelih hewan ternak untuk perayaan panen raya',
      'Penyembelihan hewan ternak sebagai rasa syukur atas kelahiran anak',
      'Membagikan makanan kepada tetangga saat pindah rumah',
      'Menyembelih hewan saat hari raya Idul Fitri'
    ],
    correctIndex: 1,
    explanation: 'Aqiqah adalah penyembelihan hewan ternak yang dilakukan sebagai ungkapan rasa syukur kepada Allah SWT atas kelahiran anak.',
  },
  {
    id: 14,
    category: 'aqiqah',
    difficulty: 'mudah',
    question: 'Berapakah jumlah kambing yang disunnahkan untuk aqiqah seorang BAYI LAKI-LAKI?',
    options: ['1 ekor kambing', '2 ekor kambing', '3 ekor kambing', '7 ekor kambing'],
    correctIndex: 1,
    explanation: 'Berdasarkan sunnah Rasulullah SAW, aqiqah untuk bayi laki-laki adalah 2 ekor kambing/domba yang sepadan.',
  },
  {
    id: 15,
    category: 'aqiqah',
    difficulty: 'mudah',
    question: 'Berapakah jumlah kambing yang disunnahkan untuk aqiqah seorang BAYI PEREMPUAN?',
    options: ['1 ekor kambing', '2 ekor kambing', 'Setengah ekor kambing', 'Bebas berapa saja'],
    correctIndex: 0,
    explanation: 'Berdasarkan hadits dari Aisyah RA, untuk anak perempuan diaqiqahi dengan 1 ekor kambing.',
  },
  {
    id: 16,
    category: 'aqiqah',
    difficulty: 'sedang',
    question: 'Hari yang paling utama dan dianjurkan untuk menyelenggarakan aqiqah bayi adalah hari ke-... setelah kelahiran.',
    options: ['Hari ke-3', 'Hari ke-7', 'Hari ke-40', 'Hari ke-100'],
    correctIndex: 1,
    explanation: 'Waktu yang paling afdhal untuk aqiqah adalah pada hari ke-7 setelah kelahiran bayi, dibarengi mencukur rambut dan memberi nama yang baik.',
  },
  {
    id: 17,
    category: 'aqiqah',
    difficulty: 'sedang',
    question: 'Amalan sunnah apa sajakah yang dianjurkan menyertai prosesi aqiqah pada hari ke-7 kelahiran bayi?',
    options: [
      'Mencukur rambut bayi, menimbang rambutnya dengan nilai emas/perak untuk sedekah, dan memberi nama baik',
      'Memandikan bayi di sungai tujuh mata air',
      'Mengarak bayi keliling kampung',
      'Membuat api unggun perayaan'
    ],
    correctIndex: 0,
    explanation: 'Sunnah pada hari ke-7 adalah: menyembelih hewan aqiqah, mencukur rambut bayi, bersedekah seberat timbangan rambut dengan emas/perak, dan memberinya nama yang baik.',
  },
  {
    id: 18,
    category: 'aqiqah',
    difficulty: 'mudah',
    question: 'Siapakah yang utamanya berkewajiban atau dibebankan sunnah menyelenggarakan aqiqah untuk anak?',
    options: ['Kakek dan Nenek', 'Paman si anak', 'Orang tua kandung anak (terutama sang Ayah)', 'Guru sekolah'],
    correctIndex: 2,
    explanation: 'Beban pensyariatan aqiqah berada di pundak orang tua kandung (ayah) yang menanggung nafkah anak tersebut.',
  },

  // --- Kategori Perbandingan Qurban vs Aqiqah ---
  {
    id: 19,
    category: 'perbandingan',
    difficulty: 'sedang',
    question: 'Bagaimana sunnah pembagian daging AQIQAH dibandingkan dengan daging QURBAN?',
    options: [
      'Keduanya wajib dibagikan dalam keadaan hidup',
      'Daging Qurban afdal dibagikan mentah, sedangkan daging Aqiqah sunnah dibagikan dalam kondisi sudah dimasak (matang)',
      'Daging Qurban harus dimasak pedas, daging aqiqah mentah',
      'Daging Aqiqah tidak boleh dimakan oleh keluarga sendiri'
    ],
    correctIndex: 1,
    explanation: 'Sunnah daging Qurban dibagikan dalam keadaan MENTAH agar penerima leluasa mengolahnya, sedangkan daging Aqiqah disunnahkan dibagikan sudah MATANG (biasanya masakan manis) agar menyenangkan penerima.',
  },
  {
    id: 20,
    category: 'perbandingan',
    difficulty: 'mudah',
    question: 'Perbedaan waktu pelaksanaan antara Qurban dan Aqiqah adalah...',
    options: [
      'Qurban terikat tanggal 10-13 Dzulhijjah, sedangkan Aqiqah terikat dengan momen kelahiran anak',
      'Qurban di malam hari, Aqiqah di siang hari',
      'Qurban boleh kapan saja, Aqiqah hanya saat Idul Fitri',
      'Tidak ada perbedaan waktu sama sekali'
    ],
    correctIndex: 0,
    explanation: 'Ibadah qurban memiliki waktu khusus yaitu 10 Dzulhijjah dan 3 hari Tasyrik. Sedangkan aqiqah disesuaikan dengan waktu kelahiran anak (terutama hari ke-7).',
  },
  {
    id: 21,
    category: 'perbandingan',
    difficulty: 'sedang',
    question: 'Bagi orang yang berqurban (shahibul qurban) bukan karena nadzar, bagian daging yang boleh ia konsumsi maksimal adalah...',
    options: ['Seluruhnya tanpa sisa', 'Maksimal 1/3 (sepertiga) bagian', 'Hanya bagian hatinya saja', 'Sama sekali tidak boleh makan'],
    correctIndex: 1,
    explanation: 'Shahibul qurban sunnah mengambil maksimal 1/3 bagian untuk dirinya dan keluarga, 1/3 disedekahkan fakir miskin, dan 1/3 untuk hadiah/tetangga.',
  },
  {
    id: 22,
    category: 'perbandingan',
    difficulty: 'sulit',
    question: 'Jika seseorang bernadzar: "Jika saya lulus SMP, saya bernadzar akan berqurban 1 ekor kambing". Apakah orang tersebut boleh memakan daging qurban nadzarnya?',
    options: [
      'Boleh makan sepuasnya',
      'Haram / tidak boleh memakan sedikit pun daging qurban nadzar tersebut (wajib dibagikan seluruhnya)',
      'Boleh makan setengah bagian',
      'Boleh jika disetujui panitia masjid'
    ],
    correctIndex: 1,
    explanation: 'Pada qurban wajib karena NADZAR, orang yang berqurban dan orang yang wajib dinafkahinya HARAM memakan daging qurban tersebut; semuanya harus disedekahkan.',
  },

  // --- Kategori Tata Cara Penyembelihan ---
  {
    id: 23,
    category: 'tata_cara',
    difficulty: 'sedang',
    question: 'Saat menyembelih hewan qurban atau aqiqah, pisau yang digunakan harus...',
    options: ['Tumpul agar hewan tenang', 'Sangat tajam agar proses cepat dan tidak menyiksa hewan', 'Bergigi gergaji', 'Bebas terbuat dari kuku atau gigi'],
    correctIndex: 1,
    explanation: 'Rasulullah SAW memerintahkan berlaku ihsan kepada hewan: "Hendaklah salah seorang di antara kalian menajamkan pisaunya dan menyenangkan hewan sembelihannya".',
  },
  {
    id: 24,
    category: 'tata_cara',
    difficulty: 'sedang',
    question: 'Ucapan dzikir wajib / sunnah muakkad yang harus diucapkan saat menyembelih hewan adalah...',
    options: ['Alhamdulillahirobbil \'alamin', 'Bismillahi Allahu Akbar', 'Subhanallah wal hamdulillah', 'Astaghfirullahal \'azim'],
    correctIndex: 1,
    explanation: 'Disunnahkan membaca: "Bismillahi Allahu Akbar" (Dengan nama Allah, Allah Maha Besar) serta membaca shalawat dan doa penerimaan sembelihan.',
  },
  {
    id: 25,
    category: 'tata_cara',
    difficulty: 'sulit',
    question: 'Dalam proses penyembelihan secara syar\'i, 3 saluran di leher hewan yang WAJIB terputus adalah...',
    options: [
      'Saluran nafas (hulqum), saluran makan/minum (mari\'), dan dua urat leher (wadajain)',
      'Saluran telinga, saluran lidah, dan saluran ekor',
      'Tulang leher belakang, sumsum, dan lidah',
      'Hanya kulit luar leher saja'
    ],
    correctIndex: 0,
    explanation: 'Syarat sah penyembelihan adalah terputusnya Hulqum (saluran pernafasan), Mari\' (saluran makanan/minuman), dan Wadajain (dua pembuluh darah di leher kiri dan kanan).',
  },
  {
    id: 26,
    category: 'tata_cara',
    difficulty: 'sedang',
    question: 'Hewan yang akan disembelih disunnahkan direbahkan ke arah lambung kiri menghadap ke arah...',
    options: ['Arah Timur', 'Arah Barat bebas', 'Arah Kiblat (Ka\'bah)', 'Arah Utara'],
    correctIndex: 2,
    explanation: 'Disunnahkan merebahkan hewan sembelihan pada sisi kirinya dan menghadapkannya ke arah Kiblat dengan penuh kelembutan.',
  },

  // --- Kategori Hikmah & Sejarah ---
  {
    id: 27,
    category: 'hikmah',
    difficulty: 'mudah',
    question: 'Ibadah qurban mengenang peristiwa agung ketaatan dan keikhlasan nabi siapa bersama putranya?',
    options: [
      'Nabi Adam AS dan Habil',
      'Nabi Nuh AS dan Kan\'an',
      'Nabi Ibrahim AS dan Nabi Ismail AS',
      'Nabi Musa AS dan Nabi Harun AS'
    ],
    correctIndex: 2,
    explanation: 'Ibadah qurban berakar dari peristiwa ujian ketakwaan Nabi Ibrahim AS yang diperintahkan menyembelih putranya Nabi Ismail AS, lalu Allah menggantinya dengan sembelihan domba besar dari surga.',
  },
  {
    id: 28,
    category: 'hikmah',
    difficulty: 'mudah',
    question: 'Salah satu hikmah sosial dari pelaksanaan ibadah Qurban adalah...',
    options: [
      'Menumbuhkan rasa bangga dan pamer kekayaan',
      'Memupuk rasa empati dan kepedulian berbagi gizi kepada fakir miskin',
      'Menghabiskan tabungan tanpa tujuan',
      'Membuat persaingan antar warga kampung'
    ],
    correctIndex: 1,
    explanation: 'Hikmah sosial qurban adalah menebarkan kebahagiaan, memperkuat ukhuwah islamiyah, dan memberikan kenikmatan daging bergizi bagi kaum dhuafa dan fakir miskin.',
  },
  {
    id: 29,
    category: 'hikmah',
    difficulty: 'sedang',
    question: 'Salah satu hikmah dilaksanakannya Aqiqah bagi seorang anak adalah...',
    options: [
      'Menghilangkan status gadai pada bayi dan mendoakan keselamatan serta keshalihan anak',
      'Menghilangkan kewajiban shalat anak kelak',
      'Supaya anak menjadi terkenal di media sosial',
      'Mewajibkan anak untuk berpuasa sejak umur 1 tahun'
    ],
    correctIndex: 0,
    explanation: 'Rasulullah SAW bersabda: "Setiap anak tergadai dengan aqiqahnya, disembelihkan hewan pada hari ketujuh, dicukur rambutnya, dan diberi nama." (HR. Abu Dawud & At-Tirmidzi).',
  },
  {
    id: 30,
    category: 'tata_cara',
    difficulty: 'sedang',
    question: 'Bolehkah memberikan upah menyembelih hewan qurban berupa kulit atau daging dari hewan qurban tersebut?',
    options: [
      'Boleh dan sangat dianjurkan sebagai pengganti uang tunai',
      'Tidak boleh menjadikannya sebagai upah jagal, jagal harus diberi upah tersendiri (namun boleh diberi sebagai sedekah biasa)',
      'Boleh asalkan kulitnya sudah dibersihkan',
      'Wajib memberikan seluruh kepala hewan kepada jagal'
    ],
    correctIndex: 1,
    explanation: 'Berdasarkan sabda Rasulullah SAW kepada Ali bin Abi Thalib RA, tidak boleh memberikan upah bagi tukang jagal dari bagian hewan qurban, melainkan upah diambil dari dana lain.',
  },
  {
    id: 31,
    category: 'syarat_hewan',
    difficulty: 'mudah',
    question: 'Jenis hewan apakah yang boleh dijadikan hewan Qurban dan Aqiqah (dikenal sebagai Bahimatul An\'am)?',
    options: [
      'Ayam, Bebek, dan Burung Unta',
      'Unta, Sapi/Kerbau, dan Kambing/Domba',
      'Kuda, Rusa, dan Kelinci',
      'Semua hewan yang halal dimakan'
    ],
    correctIndex: 1,
    explanation: 'Hewan yang sah untuk qurban dan aqiqah khusus dari jenis Bahimatul An\'am (hewan ternak berkaki empat tertentu), yaitu Unta, Sapi, Kerbau, Kambing, dan Domba.',
  },
];
