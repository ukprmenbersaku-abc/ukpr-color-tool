
import { Palette } from '../types';

// --- Type Definitions ---
type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

// --- Color Name Map ---
const colorNameMap: { [key: string]: string } = {
  // --- Basic Colors ---
  '赤': '#ff0000', 'あか': '#ff0000', 'red': '#ff0000',
  '青': '#0000ff', 'あお': '#0000ff', 'blue': '#0000ff',
  '緑': '#008000', 'みどり': '#008000', 'green': '#008000',
  '黄色': '#ffff00', 'きいろ': '#ffff00', 'yellow': '#ffff00',
  '黒': '#000000', 'くろ': '#000000', 'black': '#000000',
  '白': '#ffffff', 'しろ': '#ffffff', 'white': '#ffffff',
  'オレンジ': '#ffa500', 'orange': '#ffa500',
  '紫': '#800080', 'むらさき': '#800080', 'purple': '#800080',
  'ピンク': '#ffc0cb', 'pink': '#ffc0cb',
  '茶色': '#a52a2a', 'ちゃいろ': '#a52a2a', 'brown': '#a52a2a',
  '灰色': '#808080', 'グレー': '#808080', 'gray': '#808080', 'grey': '#808080',
  '水色': '#add8e6', 'みずいろ': '#add8e6', 'lightblue': '#add8e6',
  '黄緑': '#9acd32', 'きみどり': '#9acd32', 'yellowgreen': '#9acd32',
  '紺': '#000080', 'こん': '#000080', 'navy': '#000080',
  'シアン': '#00ffff', 'cyan': '#00ffff',
  'マゼンタ': '#ff00ff', 'magenta': '#ff00ff',
  'シルバー': '#c0c0c0', 'silver': '#c0c0c0',
  'ゴールド': '#ffd700', 'gold': '#ffd700',

  // --- Mixed / Nuance / Standard Fashion Colors (New) ---
  // Brown / Beige / Earth Tones
  'ベージュ': '#f5f5dc', 'beige': '#f5f5dc',
  'アイボリー': '#fffff0', 'ivory': '#fffff0',
  'オフホワイト': '#f8f8ff', 'offwhite': '#f8f8ff',
  'キャメル': '#c19a6b', 'camel': '#c19a6b',
  'サンド': '#c2b280', 'sand': '#c2b280',
  'モカ': '#967969', 'mocha': '#967969',
  'チョコレート': '#d2691e', 'chocolate': '#d2691e',
  'ココア': '#875f3b', 'cocoa': '#875f3b',
  'テラコッタ': '#e2725b', 'terracotta': '#e2725b',
  '黄土色': '#c39143', 'おうどいろ': '#c39143', 'ochre': '#c39143',
  'カーキ': '#f0e68c', 'khaki': '#f0e68c', // Web khaki matches typical light khaki
  'オリーブ': '#808000', 'olive': '#808000',
  'マスタード': '#ffdb58', 'mustard': '#ffdb58',
  'クリーム': '#fffdd0', 'cream': '#fffdd0',
  'グレージュ': '#b5b5a7', 'greige': '#b5b5a7', // Gray + Beige mix

  // Red / Pink / Purple Variations
  'ワインレッド': '#b30046', 'winered': '#b30046',
  'ボルドー': '#800000', 'bordeaux': '#800000',
  'バーガンディ': '#800020', 'burgundy': '#800020',
  'マルーン': '#800000', 'maroon': '#800000',
  'ローズ': '#ff007f', 'rose': '#ff007f',
  'サーモンピンク': '#ff8c69', 'salmonpink': '#ff8c69',
  'コーラル': '#ff7f50', 'coral': '#ff7f50',
  'モーヴ': '#e0b0ff', 'mauve': '#e0b0ff',
  'ライラック': '#c8a2c8', 'lilac': '#c8a2c8',
  'ラベンダー': '#e6e6fa', 'lavender': '#e6e6fa',
  'バイオレット': '#ee82ee', 'violet': '#ee82ee',
  'オーキッド': '#da70d6', 'orchid': '#da70d6',

  // Blue / Green Variations
  'ターコイズ': '#40e0d0', 'turquoise': '#40e0d0',
  'ティール': '#008080', 'teal': '#008080',
  'アクア': '#00ffff', 'aqua': '#00ffff',
  'ミント': '#98ff98', 'mint': '#98ff98',
  'ライム': '#00ff00', 'lime': '#00ff00',
  'ピーコックグリーン': '#00a497', 'peacockgreen': '#00a497',
  'スカイブルー': '#87ceeb', 'skyblue': '#87ceeb',
  'ロイヤルブルー': '#4169e1', 'royalblue': '#4169e1',
  'インディゴ': '#4b0082', 'indigo': '#4b0082',
  'ミッドナイトブルー': '#191970', 'midnightblue': '#191970',

  // Grey / Dark Variations
  'チャコール': '#36454f', 'charcoal': '#36454f',
  'チャコールグレー': '#36454f', 'charcoalgray': '#36454f',
  'スレート': '#708090', 'slate': '#708090',
  'アッシュ': '#b2beb5', 'ash': '#b2beb5',

  // --- Vivid Colors (Expanded) ---
  'ビビッドレッド': '#ff0000', 'vivid red': '#ff0000',
  'スカーレット': '#ff2400', 'scarlet': '#ff2400',
  'ルビー': '#e0115f', 'ruby': '#e0115f',
  'ビビッドピンク': '#ff00ff', 'vivid pink': '#ff00ff',
  'ホットピンク': '#ff69b4', 'hotpink': '#ff69b4',
  'ショッキングピンク': '#fc0fc0', 'shocking pink': '#fc0fc0',
  'ビビッドオレンジ': '#ff5e00', 'vivid orange': '#ff5e00',
  'ビビッドイエロー': '#ffea00', 'vivid yellow': '#ffea00',
  'レモンイエロー': '#fff700', 'lemon yellow': '#fff700',
  'ビビッドグリーン': '#00ff00', 'vivid green': '#00ff00',
  'エメラルドグリーン': '#50c878', 'emerald green': '#50c878',
  'ビビッドブルー': '#0000ff', 'vivid blue': '#0000ff',
  'コバルトブルー': '#0047ab', 'cobalt blue': '#0047ab',
  'エレクトリックブルー': '#7df9ff', 'electric blue': '#7df9ff',
  'ビビッドパープル': '#9f00ff', 'vivid purple': '#9f00ff',
  'ネオングリーン': '#39ff14', 'neon green': '#39ff14',

  // --- Pastel Colors (Expanded) ---
  'パステルピンク': '#ffd1dc', 'pastel pink': '#ffd1dc',
  'ベビーピンク': '#f4c2c2', 'babypink': '#f4c2c2',
  'シェルピンク': '#fbd8d0', 'shell pink': '#fbd8d0',
  'さくら色': '#fef4f4', 'sakura pink': '#fef4f4',
  'パステルブルー': '#aec6cf', 'pastel blue': '#aec6cf',
  'ベビーブルー': '#89cff0', 'babyblue': '#89cff0',
  'パウダーブルー': '#b0e0e6', 'powder blue': '#b0e0e6',
  'パステルグリーン': '#c1e1c1', 'pastel green': '#c1e1c1',
  'ミントグリーン': '#98ff98', 'mintgreen': '#98ff98',
  'ペールグリーン': '#98fb98', 'palegreen': '#98fb98',
  'パステルイエロー': '#fdfd96', 'pastel yellow': '#fdfd96',
  'クリームイエロー': '#fdfd96', 'creamyellow': '#fdfd96',
  'レモンシフォン': '#fffacd', 'lemonchiffon': '#fffacd',
  'パステルパープル': '#b19cd9', 'pastel purple': '#b19cd9',
  'ペールパープル': '#d8bfd8', 'palepurple': '#d8bfd8',
  'パステルオレンジ': '#ffb347', 'pastel orange': '#ffb347',
  'ペールオレンジ': '#ffcc99', 'paleorange': '#ffcc99',
  'ピーチ': '#ffe5b4', 'peach': '#ffe5b4',
  'アプリコット': '#fbceb1', 'apricot': '#fbceb1',
  
  // --- Japanese Traditional Colors (Original Set) ---
  // Reds / Pinks
  '撫子色': '#eebbcb', 'なでしこいろ': '#eebbcb', 'nadeshiko': '#eebbcb',
  '桜色': '#fef4f4', 'さくらいろ': '#fef4f4', 'sakura': '#fef4f4',
  '茜色': '#b7282e', 'あかねいろ': '#b7282e', 'akane': '#b7282e',
  '紅': '#d70035', 'くれない': '#d70035', 'kurenai': '#d70035',
  '紅色': '#d71345', 'べにいろ': '#d71345', 'beni': '#d71345',
  '朱色': '#eb6101', 'しゅいろ': '#eb6101', 'shu': '#eb6101',
  '珊瑚色': '#f58f98', 'さんごいろ': '#f58f98', 'sango': '#f58f98',
  '桃色': '#f09199', 'ももいろ': '#f09199', 'momo': '#f09199',
  '躑躅色': '#e95295', 'つつじいろ': '#e95295', 'tsutsuji': '#e95295',
  '牡丹色': '#e7609e', 'ぼたんいろ': '#e7609e', 'botan': '#e7609e',
  '今様色': '#d0576b', 'いまよういろ': '#d0576b', 'imayou': '#d0576b',
  '中紅': '#db4d69', 'なかべに': '#db4d69', 'nakabeni': '#db4d69',
  '薔薇色': '#e95464', 'ばらいろ': '#e95464', 'bara': '#e95464',
  '韓紅': '#e9546b', 'からくれない': '#e9546b', 'karakurenai': '#e9546b',
  '銀朱': '#c85554', 'ぎんしゅ': '#c85554', 'ginshu': '#c85554',
  '赤紅': '#cb4042', 'あかべに': '#cb4042', 'akabeni': '#cb4042',
  '鴇色': '#f4b3c2', 'ときいろ': '#f4b3c2', 'toki': '#f4b3c2',
  '長春色': '#c97586', 'ちょうしゅんいろ': '#c97586', 'choushun': '#c97586',
  '梅染': '#b48a76', 'うめぞめ': '#b48a76', 'umezome': '#b48a76',
  '蘇芳': '#9e3d3f', 'すおう': '#9e3d3f', 'suou': '#9e3d3f',
  '臙脂': '#9f353a', 'えんじ': '#9f353a', 'enji': '#9f353a',

  // Oranges / Yellows
  '山吹色': '#f8b500', 'やまぶきいろ': '#f8b500', 'yamabuki': '#f8b500',
  '杏色': '#f7b977', 'あんずいろ': '#f7b977', 'anzu': '#f7b977',
  '柿色': '#ed6d3d', 'かきいろ': '#ed6d3d', 'kaki': '#ed6d3d',
  '橙色': '#ee7800', 'だいだいいろ': '#ee7800', 'daidai': '#ee7800',
  '蜜柑色': '#f08300', 'みかんいろ': '#f08300', 'mikan': '#f08300',
  '金赤': '#ea5506', 'きんあか': '#ea5506', 'kinaka': '#ea5506',
  '琥珀色': '#bf783a', 'こはくいろ': '#bf783a', 'kohaku': '#bf783a',
  '黄金': '#e6b422', 'こがね': '#e6b422', 'kogane': '#e6b422',
  '鬱金色': '#fabf14', 'うこんいろ': '#fabf14', 'ukon': '#fabf14',
  '向日葵色': '#fcc800', 'ひまわりいろ': '#fcc800', 'himawari': '#fcc800',
  '芥子色': '#d0af4c', 'からしいろ': '#d0af4c', 'karashi': '#d0af4c',
  '淡黄': '#f8e58c', 'たんこう': '#f8e58c', 'tankou': '#f8e58c',
  '刈安色': '#f5e56b', 'かりやすいろ': '#f5e56b', 'kariyasu': '#f5e56b',
  '黄檗色': '#fcf16e', 'きはだいろ': '#fcf16e', 'kihada': '#fcf16e',
  '玉子色': '#fcd575', 'たまごいろ': '#fcd575', 'tamago': '#fcd575',
  
  // Greens
  '萌葱色': '#006e54', 'もえぎいろ': '#006e54', 'moegi': '#006e54',
  '千歳緑': '#316745', 'ちとせみどり': '#316745', 'chitosemidori': '#316745',
  '抹茶色': '#a69425', 'まっちゃいろ': '#a69425', 'maccha': '#a69425',
  '鶯色': '#6c6f25', 'うぐいすいろ': '#6c6f25', 'uguisu': '#6c6f25',
  '若竹色': '#78a355', 'わかたけいろ': '#78a355', 'wakatake': '#78a355',
  '青磁色': '#7ebea5', 'せいじいろ': '#7ebea5', 'seiji': '#7ebea5',
  '常磐色': '#007b43', 'ときわいろ': '#007b43', 'tokiwa': '#007b43',
  '緑青色': '#47885e', 'ろくしょういろ': '#47885e', 'rokushou': '#47885e',
  '白緑': '#d6e9ca', 'びゃくろく': '#d6e9ca', 'byakuroku': '#d6e9ca',
  '老竹色': '#769164', 'おいたけいろ': '#769164', 'oitake': '#769164',
  '海松色': '#726d40', 'みるいろ': '#726d40', 'miru': '#726d40',
  '翡翠色': '#38b48b', 'ひすいいろ': '#38b48b', 'hisui': '#38b48b',
  '青竹色': '#7ebeab', 'あおたけいろ': '#7ebeab', 'aotake': '#7ebeab',
  '若草色': '#c3d825', 'わかくさいろ': '#c3d825', 'wakakusa': '#c3d825',
  '柳色': '#a8c97f', 'やなぎいろ': '#a8c97f', 'yanagi': '#a8c97f',
  '苔色': '#69821b', 'こけいろ': '#69821b', 'koke': '#69821b',
  '松葉色': '#42602d', 'まつばいろ': '#42602d', 'matsuba': '#42602d',

  // Blues / Purples
  '浅葱色': '#00a3af', 'あさぎいろ': '#00a3af', 'asagi': '#00a3af',
  '瑠璃色': '#1e50a2', 'るりいろ': '#1e50a2', 'ruri': '#1e50a2',
  '桔梗色': '#5654a2', 'ききょういろ': '#5654a2', 'kikyou': '#5654a2',
  '藤色': '#bbbcde', 'ふじいろ': '#bbbcde', 'fuji': '#bbbcde',
  '菖蒲色': '#674196', 'しょうぶいろ': '#674196', 'shoubu': '#674196',
  '江戸紫': '#745399', 'えどむらさき': '#745399', 'edomurasaki': '#745399',
  '藍色': '#274a78', 'あいいろ': '#274a78', 'ai': '#274a78',
  '群青色': '#4c6cb3', 'ぐんじょういろ': '#4c6cb3', 'gunjou': '#4c6cb3',
  '縹色': '#2792c3', 'はなだいろ': '#2792c3', 'hanada': '#2792c3',
  '納戸色': '#008899', 'なんどいろ': '#008899', 'nando': '#008899',
  '鉄紺': '#17184b', 'てつこん': '#17184b', 'tetsukon': '#17184b',
  '勝色': '#464a67', 'かちいろ': '#464a67', 'kachi': '#464a67',
  '露草色': '#38a1db', 'つゆくさいろ': '#38a1db', 'tsuyukusa': '#38a1db',
  '水浅葱': '#80aba9', 'みずあさぎ': '#80aba9', 'mizuasagi': '#80aba9',
  '新橋色': '#59b9c6', 'しんばしいろ': '#59b9c6', 'shinbashi': '#59b9c6',
  '瓶覗': '#a2d7dd', 'かめのぞき': '#a2d7dd', 'kamenozoki': '#a2d7dd',
  '空色': '#a0d8ef', 'そらいろ': '#a0d8ef', 'sora': '#a0d8ef',
  '紫苑色': '#867ba9', 'しおんいろ': '#867ba9', 'shion': '#867ba9',
  '古代紫': '#895b8a', 'こだいむらさき': '#895b8a', 'kodaimurasaki': '#895b8a',
  '京紫': '#9d5b8b', 'きょうむらさき': '#9d5b8b', 'kyomurasaki': '#9d5b8b',
  '二藍': '#915c8b', 'ふたあい': '#915c8b', 'futaai': '#915c8b',
  '茄子紺': '#824880', 'なすこん': '#824880', 'nasukon': '#824880',
  '菫色': '#7058a3', 'すみれいろ': '#7058a3', 'sumire': '#7058a3',

  // Browns / Grays / Beiges
  '檜皮色': '#9d8976', 'ひわだいろ': '#9d8976', 'hiwada': '#9d8976',
  '小豆色': '#954e2a', 'あずきいろ': '#954e2a', 'azuki': '#954e2a',
  '墨色': '#333333', 'すみいろ': '#333333', 'sumi': '#333333',
  '月白': '#eaf4fc', 'げっぱく': '#eaf4fc', 'geppaku': '#eaf4fc',
  '白練': '#f3f3f3', 'しろねり': '#f3f3f3', 'shironeri': '#f3f3f3',
  '胡粉色': '#fffffc', 'ごふんいろ': '#fffffc', 'gofun': '#fffffc',
  '利休鼠': '#888e7e', 'りきゅうねずみ': '#888e7e', 'rikyunezumi': '#888e7e',
  '銀鼠': '#afafb0', 'ぎんねず': '#afafb0', 'ginnezu': '#afafb0',
  '鳩羽色': '#95859c', 'はとばいろ': '#95859c', 'hatoba': '#95859c',
  '煤竹色': '#6f514c', 'すすたけいろ': '#6f514c', 'susutake': '#6f514c',
  '鳶色': '#95483f', 'とびいろ': '#95483f', 'tobi': '#95483f',
  '海老茶': '#773c30', 'えびちゃ': '#773c30', 'ebicha': '#773c30',
  '団十郎茶': '#9f563a', 'だんじゅうろうちゃ': '#9f563a', 'danjurocha': '#9f563a',
  '弁柄色': '#8f2e14', 'べんがらいろ': '#8f2e14', 'bengara': '#8f2e14',
  '栗色': '#762f07', 'くりいろ': '#762f07', 'kuri': '#762f07',
  '香色': '#efcd9a', 'こういろ': '#efcd9a', 'kou': '#efcd9a',
  '亜麻色': '#d6c6af', 'あまいろ': '#d6c6af', 'ama': '#d6c6af',
  '生成色': '#fbfaf5', 'きなりいろ': '#fbfaf5', 'kinari': '#fbfaf5',
};

export const getColorByName = (name: string): string | null => {
  const normalizedName = name.toLowerCase().trim();
  return colorNameMap[normalizedName] || null;
};

// --- Validation ---
export const isValidHex = (hex: string): boolean => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);

// --- Color Conversion ---
const hexToRgb = (hex: string): RGB | null => {
  if (!isValidHex(hex)) return null;
  let normalizedHex = hex.startsWith('#') ? hex.slice(1) : hex;
  if (normalizedHex.length === 3) {
    normalizedHex = normalizedHex.split('').map(char => char + char).join('');
  }
  const r = parseInt(normalizedHex.substring(0, 2), 16);
  const g = parseInt(normalizedHex.substring(2, 4), 16);
  const b = parseInt(normalizedHex.substring(4, 6), 16);
  return { r, g, b };
};

const rgbToHex = ({ r, g, b }: RGB): string => {
  const toHex = (c: number) => `0${Math.round(c).toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s, l };
};

const hslToRgb = ({ h, s, l }: HSL): RGB => {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    h /= 360;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
};

// --- Contrast Calculation ---
export const getContrastYIQ = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
};

// --- Palette Generation ---
export const generatePalettes = (baseHex: string): Palette[] => {
  const baseRgb = hexToRgb(baseHex);
  if (!baseRgb) return [];

  const baseHsl = rgbToHsl(baseRgb);

  const palettes: Palette[] = [
    {
      name: '補色 (Complementary)',
      description: '色相環の反対側に位置する色。強いコントラストが生まれます。',
      colors: [
        baseHex,
        rgbToHex(hslToRgb({ h: (baseHsl.h + 180) % 360, s: baseHsl.s, l: baseHsl.l })),
      ],
    },
    {
      name: 'トライアド (Triadic)',
      description: '色相環を3等分する位置にある3色。バランスの取れた配色です。',
      colors: [
        baseHex,
        rgbToHex(hslToRgb({ h: (baseHsl.h + 120) % 360, s: baseHsl.s, l: baseHsl.l })),
        rgbToHex(hslToRgb({ h: (baseHsl.h + 240) % 360, s: baseHsl.s, l: baseHsl.l })),
      ],
    },
    {
      name: '類似色 (Analogous)',
      description: '色相環で隣り合う色。統一感があり、目に優しい配色です。',
      colors: [
        rgbToHex(hslToRgb({ h: (baseHsl.h - 30 + 360) % 360, s: baseHsl.s, l: baseHsl.l })),
        baseHex,
        rgbToHex(hslToRgb({ h: (baseHsl.h + 30) % 360, s: baseHsl.s, l: baseHsl.l })),
      ],
    },
    {
      name: 'シェード (Shades)',
      description: 'ベースの色に黒を混ぜた色。深みと重厚感を与えます。',
      colors: Array.from({ length: 4 }, (_, i) => {
        const l = Math.max(0, baseHsl.l - (i * 0.15));
        return rgbToHex(hslToRgb({ ...baseHsl, l }));
      }),
    },
    {
      name: 'ティント (Tints)',
      description: 'ベースの色に白を混ぜた色。明るく軽やかな印象を与えます。',
      colors: Array.from({ length: 4 }, (_, i) => {
        const l = Math.min(1, baseHsl.l + (i * 0.15));
        return rgbToHex(hslToRgb({ ...baseHsl, l }));
      }),
    },
    {
        name: 'テトラード (Tetradic)',
        description: '色相環で長方形を形成する4色。豊かで多様な表現が可能です。',
        colors: [
            baseHex,
            rgbToHex(hslToRgb({ h: (baseHsl.h + 90) % 360, s: baseHsl.s, l: baseHsl.l })),
            rgbToHex(hslToRgb({ h: (baseHsl.h + 180) % 360, s: baseHsl.s, l: baseHsl.l })),
            rgbToHex(hslToRgb({ h: (baseHsl.h + 270) % 360, s: baseHsl.s, l: baseHsl.l })),
        ]
    }
  ];

  return palettes;
};
