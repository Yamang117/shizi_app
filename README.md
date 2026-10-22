# 拾字 PWA（免費自用版）

這個資料夾可直接部署到 GitHub Pages，之後可從手機瀏覽器加入主畫面。

## 檔案

- `index.html`：拾字應用程式本體。
- `manifest.webmanifest`：App 名稱、圖示與開啟方式。
- `service-worker.js`：快取靜態介面，提供有限的離線開啟能力。
- `icon-192.png`、`icon-512.png`、`apple-touch-icon.png`：應用程式圖示。

## GitHub Pages 快速部署

1. 登入 GitHub，建立新的 **Public** repository，名稱建議為 `shizi`。
2. 將這個資料夾裡的檔案全部上傳至 repository 最上層（不要把整個 ZIP 當成唯一檔案上傳）。最上層應直接看到 `index.html`、`manifest.webmanifest`、`service-worker.js` 和三個 PNG 圖示。
3. 打開 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選擇 **Deploy from a branch**。
5. Branch 選 `main`，資料夾選 `/(root)`，按 **Save**。
6. 等待部署完成，在 Pages 畫面點 **Visit site**。專案網址通常形如 `https://你的GitHub帳號.github.io/shizi/`。
7. 先在手機瀏覽器開啟該 HTTPS 網址一次，確認首頁可載入且設定可儲存。
8. Android：Chrome 選單中找「安裝應用程式」或「加到主畫面」。iPhone：用 Safari 開啟，點分享按鈕，再選「加入主畫面」。

## 重要注意事項

- GitHub Free 的 Pages 網站需要使用公開 repository；網站本身會公開在網路上。不要把 API 金鑰直接寫入程式碼或提交到 repository。
- 拾字目前把單字與 Gemini 金鑰存於該瀏覽器/網站的 `localStorage`。這不是雲端備份；清除網站資料、換裝置或換網址可能導致資料無法沿用，請定期備份（目前版本仍需自行手動整理資料）。
- 拍照辨識需要網路與有效的 Gemini API 金鑰；PWA 快取只讓部分介面離線開啟，不代表 AI 辨識可離線使用。
- 直接把 `index.html` 當本機檔案開啟只能作一般網頁預覽；Service Worker / PWA 安裝需要 HTTPS（GitHub Pages 提供 HTTPS）。
- 免費 Gemini API 方案有模型可用性、頻率與額度限制，可能隨 Google 政策變動。請勿傳送敏感或私密照片。
