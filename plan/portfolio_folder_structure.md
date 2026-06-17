# Yami 個人作品集專案資料夾結構與管理規範

本文件針對使用 **HTML5 + Bootstrap 5 + GSAP** 技術棧的 Yami 個人作品集網站，規劃了一套清晰、便於維護且符合 SEO 與網頁效能優化（Core Web Vitals）的資料夾結構。

---

## 📁 專案資料夾結構圖

```text
my-portfolio/
│
├── index.html                  # 網站首頁（單頁式主架構）
├── favicon.ico                 # 網站瀏覽器標籤頁圖示
├── robots.txt                  # 搜尋引擎爬蟲隱私與抓取規則設定（SEO 必備）
├── sitemap.xml                 # 網站地圖（加速 Google 索引獨立作品頁）
│
├── projects/                   # 存放所有獨立作品介紹頁的資料夾
│   ├── time-shop.html          # 作品案例 A（如：時光雜貨鋪）
│   └── cafe-diary.html         # 作品案例 B
│
└── assets/                     # 靜態資源總資料夾（CSS、JS、圖片、字型）
    ├── css/
    │   ├── bootstrap.min.css   # Bootstrap 5 核心（若不用 CDN 改放本機）
    │   └── style.css           # 自訂樣式表（融合日系水彩風、手繪感視覺）
    │
    ├── js/
    │   ├── main.js             # 全站通用 JS（控制導覽列、表單驗證等）
    │   └── animation.js        # 專門存放 GSAP 與 ScrollTrigger 動畫腳本的檔案
    │
    ├── fonts/                  # 網頁特殊字型資料夾（若有本地中文字型放這）
    │   └── custom-font.woff2
    │
    └── images/                 # 圖片資源管理總資料夾（核心效能管理區）
        ├── hero-bg.webp        # 首頁第一屏 Hero 區主視覺大圖
        ├── yami-avatar.webp    # About 關於我區塊的 Yami 個人特寫照
        ├── icons/              # 網站小圖示、社群聯絡 icon (建議全面使用 SVG 格式)
        │   ├── instagram.svg
        │   └── mail.svg
        │
        └── portfolio/          # 作品集專用圖片資料夾
            ├── thumb-time.webp # 首頁作品集列表用的「低解析/小尺寸縮圖」
            ├── thumb-cafe.webp
            │
            └── projects/       # 點進內頁後看到的「高解析/清晰原尺寸大圖」
                ├── time-shop-01.webp
                ├── time-shop-02.webp
                └── cafe-diary-01.webp
```

---

## 🛠️ 前端管理與技術規範細節

### 1. 腳本分流與載入順序管理
為了避免動畫邏輯與網站基礎功能（如表單送出、選單切換）互相干擾，且確保 GSAP 插件正確載入，請在 HTML5 的 `</body>` 前嚴格遵守以下引入順序：

```html
<!-- 1. 引入 GSAP 主程式與 ScrollTrigger 插件 (可使用 CDN) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

<!-- 2. 引入全站通用功能 -->
<script src="assets/js/main.js"></script>

<!-- 3. 引入獨立的 GSAP 動畫腳本 -->
<script src="assets/js/animation.js"></script>
```

### 2. 圖片分離機制（效能與 Core Web Vitals 關鍵）
由於插畫作品集內含大量圖檔，為避免首頁載入過慢導致 Google LCP 指標亮紅燈，採取以下策略：
* **首頁列表區（`assets/images/portfolio/`）：** 僅讀取裁切過、體積極小（如 400x400px）的 `thumb-*.webp` 縮圖。
* **獨立作品內頁（`assets/images/portfolio/projects/`）：** 當使用者真正點擊進入個別作品 HTML 後，網頁才讀取精緻完整的高解析大圖（如 `time-shop-01.webp`）。
* **全站圖片防線：** 除首頁第一屏主視覺外，其餘圖片標籤必須一律加上 `loading="lazy"` 延遲載入語法。

### 3. 作品內頁的階層與相對路徑提示
由於獨立作品頁皆存放在 `projects/` 資料夾中，網址階層較首頁深了一層（例如：`yami-art.com/projects/time-shop.html`）。
在編寫內頁 HTML 時，引入 `assets/` 內的資源必須使用 **`../`** 回到上一層路徑：
* **引入樣式表：** `<link rel="stylesheet" href="../assets/css/style.css">`
* **引入大圖：** `<img src="../assets/images/portfolio/projects/time-shop-01.webp" alt="時光雜貨鋪插畫">`
* **回首頁連結：** `<a href="../index.html">返回首頁</a>`
