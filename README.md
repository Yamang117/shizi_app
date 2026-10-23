# 拾字 PWA（多國語言版／免費自用）

這個資料夾可直接部署到 GitHub Pages，之後可從手機瀏覽器加入主畫面。此版本可為每本筆記本設定學習語言、解釋語言與例句語言，拍照辨識會依設定切換提示詞。

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

## 本版新增功能

- 建立筆記本時可設定學習語言、解釋語言與例句語言（英文、日文、韓文、繁體中文、法文、西班牙文、德文、義大利文、葡萄牙文、俄文、越南文、泰文、印尼文、阿拉伯文）。
- 拍照辨識依筆記本語言設定組合提示詞，不再固定辨識英文。
- 舊版筆記本會自動補上語言欄位；既有單字及複習進度會保留，舊筆記本的語言預設為英文。
- 辨識提示詞要求較精簡的定義與例句，並限制輸出 token 數，以減少冗長回應；這是速度改善措施，不保證每次請求一定更快。
- 設定中可切換 Gemini 模型；可測試 `gemini-3.5-flash-lite` 的回應速度，再依辨識品質決定是否採用。模型可用性可能變動。

## 重要注意事項

- GitHub Free 的 Pages 網站需要使用公開 repository；網站本身會公開在網路上。不要把 API 金鑰直接寫入程式碼或提交到 repository。
- 拾字目前把單字與 Gemini 金鑰存於該瀏覽器/網站的 `localStorage`。這不是雲端備份；清除網站資料、換裝置或換網址可能導致資料無法沿用，請定期備份（目前版本仍需自行手動整理資料）。
- 拍照辨識需要網路與有效的 Gemini API 金鑰；PWA 快取只讓部分介面離線開啟，不代表 AI 辨識可離線使用。
- 直接把 `index.html` 當本機檔案開啟只能作一般網頁預覽；Service Worker / PWA 安裝需要 HTTPS（GitHub Pages 提供 HTTPS）。
- 免費 Gemini API 方案有模型可用性、頻率與額度限制，可能隨 Google 政策變動。請勿傳送敏感或私密照片。


## 忙碌中 / 503 錯誤處理（本版新增）

- 遇到 408、500、502、503 或 504 等暫時性錯誤，最多請求 3 次，採 1 秒、2 秒的指數退避並加入隨機延遲。
- 對看起來是短時間/每分鐘限流的 429，採相同的有限重試。
- 若訊息顯示每日免費額度已耗盡，不會反覆重試，會提示查看 AI Studio 額度。
- 這只能改善暫時性壅塞時的成功機率，不能保證服務永遠不忙碌，也不能解除每日配額限制。
