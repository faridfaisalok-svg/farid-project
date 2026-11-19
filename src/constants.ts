export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1920;
export const VIDEO_FPS = 30;
export const VIDEO_DURATION_FRAMES = 2048; // ~68.27 seconds

export const COLORS = {
  primary: '#16A34A',      // Vibrant leaf green
  primaryLight: '#4ADE80', // Mint/light green
  primaryDark: '#0E391D',  // Deep forest green
  accentYellow: '#FACC15', // Gold / bright yellow
  accentOrange: '#FB923C', // Warm orange
  accentCyan: '#38BDF8',   // Fresh water blue
  bgDark: '#07160C',       // Rich dark forest background
  bgCard: 'rgba(15, 33, 21, 0.88)',
  textWhite: '#FFFFFF',
  textYellow: '#FFE600',
  textGreen: '#86EFAC',
  textOrange: '#FDBA74',
};

export interface SubtitleCue {
  text: string;
  startFrame: number;
  endFrame: number;
  highlightWords?: string[];
  highlightColor?: string;
}

export const SUBTITLES: SubtitleCue[] = [
  // Scene 1: Intro
  {
    text: 'Halo teman-teman, kenalin saya Bambang!',
    startFrame: 0,
    endFrame: 75,
    highlightWords: ['teman-teman,', 'Bambang!'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'Punya tanaman layu dan susah tumbuh di pekarangan rumah?',
    startFrame: 75,
    endFrame: 168,
    highlightWords: ['tanaman', 'layu', 'susah', 'tumbuh'],
    highlightColor: '#F87171', // Red warning
  },

  // Scene 2: Bongkar Rahasia Dapur
  {
    text: 'Jangan buru-buru menyerah,',
    startFrame: 168,
    endFrame: 225,
    highlightWords: ['Jangan', 'menyerah,'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'karena hari ini saya mau bongkar rahasia',
    startFrame: 225,
    endFrame: 300,
    highlightWords: ['bongkar', 'rahasia'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'bikin tanaman subur lebat cuma pakai bahan sisa dari dapur!',
    startFrame: 300,
    endFrame: 407,
    highlightWords: ['subur', 'lebat', 'sisa', 'dapur!'],
    highlightColor: COLORS.primaryLight,
  },

  // Scene 3: Bahan 1 & 2
  {
    text: 'Kalian pasti sering buang cangkang telur dan kulit pisang, kan?',
    startFrame: 407,
    endFrame: 504,
    highlightWords: ['cangkang', 'telur', 'kulit', 'pisang,'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'Mulai sekarang, kumpulin aja.',
    startFrame: 504,
    endFrame: 588,
    highlightWords: ['Mulai', 'sekarang,', 'kumpulin', 'aja.'],
    highlightColor: COLORS.primaryLight,
  },

  // Scene 4: Cangkang Telur (Kalsium)
  {
    text: 'Tahu nggak, cangkang telur itu kaya banget kalsium',
    startFrame: 588,
    endFrame: 675,
    highlightWords: ['cangkang', 'telur', 'kaya', 'kalsium'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'yang bikin batang dan akar tanaman jadi super kokoh.',
    startFrame: 675,
    endFrame: 759,
    highlightWords: ['batang', 'akar', 'super', 'kokoh.'],
    highlightColor: COLORS.primaryLight,
  },

  // Scene 5: Kulit Pisang (Kalium)
  {
    text: 'Terus, kulit pisang adalah sumber kalium alami paling juara',
    startFrame: 759,
    endFrame: 860,
    highlightWords: ['kulit', 'pisang', 'kalium', 'alami', 'juara'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'buat merangsang bunga dan buah biar cepat muncul.',
    startFrame: 860,
    endFrame: 963,
    highlightWords: ['bunga', 'buah', 'cepat', 'muncul.'],
    highlightColor: COLORS.accentOrange,
  },

  // Scene 6: Tutorial - Jemur & Tumbuk
  {
    text: 'Cara pakainya gampang banget.',
    startFrame: 963,
    endFrame: 1020,
    highlightWords: ['gampang', 'banget.'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'Jemur cangkang telur dan kulit pisang sampai benar-benar kering,',
    startFrame: 1020,
    endFrame: 1128,
    highlightWords: ['Jemur', 'benar-benar', 'kering,'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'lalu tumbuk sampai hancur menjadi serpihan kecil.',
    startFrame: 1128,
    endFrame: 1218,
    highlightWords: ['tumbuk', 'hancur', 'serpihan', 'kecil.'],
    highlightColor: COLORS.primaryLight,
  },

  // Scene 7: Tabur di Akar
  {
    text: 'Setelah itu, kalian tinggal taburkan bubuknya secara merata di atas tanah,',
    startFrame: 1218,
    endFrame: 1318,
    highlightWords: ['taburkan', 'bubuknya', 'merata'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'tepat di sekitar area akar tanaman.',
    startFrame: 1318,
    endFrame: 1418,
    highlightWords: ['sekitar', 'area', 'akar', 'tanaman.'],
    highlightColor: COLORS.primaryLight,
  },

  // Scene 8: Siram Air & Nutrisi Meresap
  {
    text: 'Nanti pas disiram air, nutrisinya akan meresap perlahan ke dalam tanah',
    startFrame: 1418,
    endFrame: 1525,
    highlightWords: ['disiram', 'air,', 'nutrisinya', 'meresap'],
    highlightColor: COLORS.accentCyan,
  },
  {
    text: 'dan bikin media tanam kalian makin gembur.',
    startFrame: 1525,
    endFrame: 1630,
    highlightWords: ['media', 'tanam', 'makin', 'gembur.'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'Daun-daun pasti jadi lebih hijau dan segar.',
    startFrame: 1630,
    endFrame: 1715,
    highlightWords: ['Daun-daun', 'lebih', 'hijau', 'segar.'],
    highlightColor: COLORS.primaryLight,
  },

  // Scene 9: Outro
  {
    text: 'Bertani di rumah itu ternyata gampang, murah, dan asyik banget, kan?',
    startFrame: 1715,
    endFrame: 1838,
    highlightWords: ['gampang,', 'murah,', 'asyik', 'banget,'],
    highlightColor: COLORS.accentYellow,
  },
  {
    text: 'Yuk, langsung cobain trik organik ini sekarang juga di rumah!',
    startFrame: 1838,
    endFrame: 1944,
    highlightWords: ['langsung', 'cobain', 'trik', 'organik'],
    highlightColor: COLORS.primaryLight,
  },
  {
    text: 'Sampai jumpa di tips pertanian seru lainnya bareng Bambang!',
    startFrame: 1944,
    endFrame: 2048,
    highlightWords: ['tips', 'pertanian', 'bareng', 'Bambang!'],
    highlightColor: COLORS.accentYellow,
  },
];
