<p align="center"><img src="finans.png" width="96" alt="Expense Journal logo"></p>

# Expense Journal (Harcamalarım)

[![CI](https://github.com/lprvy/expense-journal/actions/workflows/ci.yml/badge.svg)](https://github.com/lprvy/expense-journal/actions/workflows/ci.yml)

Günlük gelir ve giderlerini not defteri gibi tutabileceğin, Expo (React Native) ile yazılmış bir mobil uygulama.
A notebook-style daily income and expense tracker built with Expo (React Native).

**Diller / Languages:** Türkçe, English (Ayarlar → Dil / Settings → Language)

- [Türkçe Kurulum](#türkçe-kurulum)
- [English Setup](#english-setup)

---

## Türkçe Kurulum

### Gereksinimler
- [Node.js](https://nodejs.org/) 20 veya üzeri
- npm (Node.js ile birlikte gelir)
- Telefonda test için: [Expo Go](https://expo.dev/go) (Android / iOS)
- İsteğe bağlı: Android Studio (emülatör) veya Xcode (iOS simülatörü, sadece macOS)

### 1. Projeyi indir
```bash
git clone https://github.com/lprvy/expense-journal.git
cd expense-journal
```

### 2. Bağımlılıkları kur
```bash
npm install
```

### 3. Uygulamayı başlat
```bash
npx expo start
```
Terminalde çıkan QR kodu telefondaki **Expo Go** ile okut. Ya da:
- `a` tuşu → Android emülatöründe açar
- `i` tuşu → iOS simülatöründe açar (macOS)
- `w` tuşu → tarayıcıda açar

### 4. Dil seçimi
Uygulama ilk açılışta telefonun diline göre Türkçe ya da İngilizce başlar. Değiştirmek için alttaki menüden **Ayarlar** (dişli simgesi) → **Dil** bölümünden seçim yap. Seçim kaydedilir.

### 5. APK oluşturma (isteğe bağlı)
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
Derleme bitince EAS bir indirme bağlantısı verir.

### Kullanım
- Miktarı ve açıklamayı yaz, **+ GELİR** veya **- GİDER** butonuna bas.
- Açıklamaya `#market` gibi etiket ekleyerek harcamalarını grupla.
- Not alanına doğrudan `#gider 150 #market ekmek` biçiminde de yazabilirsin. Kuruşlu tutarlar için virgül ya da nokta kullanabilirsin: `#gider 150,75`.
- Özet, geçmiş aylar ve ayarlar sayfalarına alttaki menüden ya da sağa/sola kaydırarak geç.

---

## English Setup

### Requirements
- [Node.js](https://nodejs.org/) 20 or newer
- npm (comes with Node.js)
- To test on a phone: [Expo Go](https://expo.dev/go) (Android / iOS)
- Optional: Android Studio (emulator) or Xcode (iOS simulator, macOS only)

### 1. Clone the project
```bash
git clone https://github.com/lprvy/expense-journal.git
cd expense-journal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the app
```bash
npx expo start
```
Scan the QR code shown in the terminal with **Expo Go** on your phone. Or press:
- `a` to open on an Android emulator
- `i` to open on the iOS simulator (macOS)
- `w` to open in the browser

### 4. Choosing a language
On first launch the app picks Turkish or English based on your phone's language. To change it, open **Settings** (gear icon) from the bottom bar and pick an option under **Language**. Your choice is saved.

### 5. Building an APK (optional)
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
When the build finishes, EAS gives you a download link.

### Usage
- Enter an amount and a description, then tap **+ INCOME** or **- EXPENSE**.
- Add tags like `#market` to the description to group your spending.
- You can also type straight into the note area, e.g. `#gider 150 #market bread` (`#gelir` = income, `#gider` = expense). Decimals work with a comma or a dot: `#gider 150,75`.
- Switch between the summary, past months and settings pages from the bottom bar or by swiping.

---

## Geliştirme / Development
```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm test           # Jest: not ayrıştırıcı testleri / note parser tests
```
Her push'ta GitHub Actions bu üç adımı çalıştırır. / GitHub Actions runs all three on every push.

## Proje Yapısı / Project Structure
```
app/                 Ekranlar / Screens (expo-router)
src/db/              Not ve ayar kayıtları / Notes & settings storage
src/i18n/            Çeviriler / Translations (tr, en)
src/utils/           Ayrıştırıcı ve sabitler / Parser & constants
tests/               Jest testleri / Jest tests
app.json             Expo yapılandırması / Expo config
```

## Lisans / License

MIT
