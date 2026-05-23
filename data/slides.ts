export type SlideType =
  | "cover"
  | "agenda"
  | "content"
  | "demo"
  | "theory"
  | "closing"
  | "notes";

export type Slide = {
  id: number;
  section: string;
  timing: string;
  type: SlideType;
  title: string;
  subtitle?: string;
  bullets?: string[];
  highlight?: string;
  speakers?: { a: string; b: string };
  terms?: string[];
  figmaZone?: string;
  icon?: string;
};

export const slides: Slide[] = [
  {
    id: 1,
    section: "Giriş",
    timing: "0:00",
    type: "cover",
    title: "Figma Sunum & Demo",
    subtitle: "Mobil programlamada neden koddan önce tasarım gelir?",
    bullets: [
      "15 dakika · 4 canlı demo · 2 konuşmacı",
      "Auto Layout → Components → Prototype → Dev Mode",
    ],
    speakers: {
      a: "Kişi A — Canlı Figma demoları",
      b: "Kişi B — Teori ve teknik vurgu",
    },
    icon: "◆",
  },
  {
    id: 2,
    section: "Ajanda",
    timing: "0:00",
    type: "agenda",
    title: "Sunum Akışı",
    subtitle: "15 dakika · 5 bölüm",
    bullets: [
      "0–3 dk · Giriş & Bulut tabanlı iş birliği",
      "3–6 dk · Auto Layout (Flexbox mantığı)",
      "6–9 dk · Components & Variants",
      "9–12 dk · Prototyping & Smart Animate",
      "12–15 dk · Dev Mode & kapanış",
    ],
    icon: "▣",
  },
  {
    id: 3,
    section: "Bölüm 1",
    timing: "0:00 – 1:30",
    type: "content",
    title: "Neden Figma?",
    subtitle: "Tasarım, geliştirmenin ön koşulu",
    bullets: [
      "UX kararları kod mimarisinden önce netleşir",
      "Çoklu ekran boyutu ve platform farkları tasarımda çözülür",
      "Yazılımcı belirsiz mockup yerine ölçülebilir spec alır",
    ],
    highlight: "Mobil programlamada neden koddan önce tasarım gelir?",
    terms: ["Design Handoff", "Single Source of Truth"],
    icon: "?",
  },
  {
    id: 4,
    section: "Bölüm 1",
    timing: "1:30 – 3:00",
    type: "content",
    title: "Bulut Tabanlı Devrim",
    subtitle: "Kurulum yok · Gerçek zamanlı iş birliği",
    bullets: [
      "Tarayıcı veya masaüstü — anında başla",
      "Canlı imleçler: aynı dosyada eşzamanlı düzenleme",
      "Versiyon karmaşası yok — tek doğru kaynak",
    ],
    highlight: "Tek bir dosya, sıfır versiyon karmaşası.",
    terms: ["Single Source of Truth", "Scalability"],
    icon: "☁",
  },
  {
    id: 5,
    section: "Bölüm 2",
    timing: "3:00 – 4:30",
    type: "theory",
    title: "Constraints & Auto Layout",
    subtitle: "CSS Flexbox’un Figma karşılığı",
    bullets: [
      "Constraints — öğenin üst/alt/sol/sağ davranışı",
      "Auto Layout — içerik uzadıkça kapsayıcı büyür",
      "HUG / FILL — yazılımdaki wrap & flex-grow",
    ],
    highlight: "Yazılımcı sabit genişlik vermek zorunda kalmaz.",
    icon: "⊞",
  },
  {
    id: 6,
    section: "Bölüm 2 · Demo",
    timing: "4:30 – 6:00",
    type: "demo",
    title: "DEMO 1 — Auto Layout",
    subtitle: "Buton metne göre kendini düzenler",
    speakers: {
      a: "DEMO 1 bölgesinde butonu seç → metni “Kayıt Ol ve Topluluğa Katıl” yap",
      b: "İçeriğe göre otomatik genişlemeyi anlat; sabit width gerekmediğini vurgula",
    },
    highlight: "Canlı: metin değişince buton adapte olur.",
    figmaZone: "DEMO 1 · Auto Layout",
    icon: "1",
  },
  {
    id: 7,
    section: "Bölüm 3",
    timing: "6:00 – 7:00",
    type: "theory",
    title: "Components & Variants",
    subtitle: "Merkezi tasarım sistemi",
    bullets: [
      "Master Component — tek kaynak, tüm instance’lar",
      "Variant — default, hover, disabled tek bileşende",
      "Design System — yüzlerce öğe tek kütüphanede",
    ],
    highlight: "50 ekranı tek tek gezmiyoruz.",
    terms: ["Single Source of Truth", "Scalability"],
    icon: "◇",
  },
  {
    id: 8,
    section: "Bölüm 3 · Demo",
    timing: "7:00 – 9:00",
    type: "demo",
    title: "DEMO 2 — Master Component",
    subtitle: "Renk değişimi tüm ekranlara yansır",
    speakers: {
      a: "6 ekrana zoom — hepsinin anında turuncu olduğunu göster",
      b: "Button/Primary master rengini maviden turuncuya çevir",
    },
    highlight: "Bir rengi saniyeler içinde güncelliyoruz.",
    figmaZone: "DEMO 2 · Components",
    icon: "2",
  },
  {
    id: 9,
    section: "Bölüm 4",
    timing: "9:00 – 10:00",
    type: "theory",
    title: "Prototyping",
    subtitle: "Kod yazmadan akışı test et",
    bullets: [
      "Ekranlar arası geçişler prototipte tanımlanır",
      "Kullanıcı testleri erken aşamada mümkün",
      "Animasyon spec’i yazılımcıya hazır iletilir",
    ],
    highlight: "Hangi buton, hangi sayfaya, nasıl animasyonla?",
    icon: "▶",
  },
  {
    id: 10,
    section: "Bölüm 4 · Demo",
    timing: "10:00 – 12:00",
    type: "demo",
    title: "DEMO 3 — Smart Animate",
    subtitle: "Prototype modunda canlı geçiş",
    speakers: {
      a: "Ana Sayfa → Detay bağlantısı · Smart Animate",
      b: "Play ile simülatörde tıkla; slide/fade geçişini göster",
    },
    highlight: "Yumuşak geçişler spec olarak iletilir.",
    figmaZone: "DEMO 3 · Prototype",
    icon: "3",
  },
  {
    id: 11,
    section: "Bölüm 5",
    timing: "12:00 – 13:00",
    type: "theory",
    title: "Dev Mode",
    subtitle: "CSS · Swift · Kotlin — hazır spec",
    bullets: [
      "Platforma göre kod blokları sağ panelde",
      "Padding, renk, font — dp/px otomatik",
      "“Bu butonun rengi neydi?” sorusu tarihe karışır",
    ],
    highlight: "Kodun yaklaşık %30’u burada hazır.",
    terms: ["Design Handoff"],
    icon: "</>",
  },
  {
    id: 12,
    section: "Bölüm 5 · Demo",
    timing: "13:00 – 15:00",
    type: "demo",
    title: "DEMO 4 — Dev Mode",
    subtitle: "Kotlin/Compose veya SwiftUI",
    speakers: {
      a: "Dev Mode aç → Button/Primary seç",
      b: "Kod paneli + padding ölçümü (örn. 16dp)",
    },
    highlight: "Font ve renk için sormaya gerek yok.",
    figmaZone: "DEMO 4 · Dev Mode",
    icon: "4",
  },
  {
    id: 13,
    section: "Kapanış",
    timing: "15:00",
    type: "closing",
    title: "Teşekkürler",
    subtitle: "Sorularınız?",
    bullets: [
      "Single Source of Truth",
      "Design Handoff",
      "Scalability",
    ],
    highlight: "Profesyonel Figma iş akışı — tasarım ve kod tek çizgide.",
    icon: "✓",
  },
  {
    id: 14,
    section: "Ek",
    timing: "—",
    type: "notes",
    title: "Konuşmacı & Teknik Notlar",
    bullets: [
      "Sunum: bu sayfa · Figma: yan sekme · Ctrl+Tab ile geçiş",
      "Demolar önceden hazır — sıfırdan çizme",
      "G → ajanda · N → notlar · F → tam ekran · T → zamanlayıcı",
    ],
    terms: ["Single Source of Truth", "Design Handoff", "Scalability"],
    icon: "⚙",
  },
];

export const totalSlides = slides.length;
