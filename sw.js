/* 筠玲易數 · Service Worker
   策略說明（重要）：
   - HTML / JS / JSON 一律「先連網、失敗才用快取」→ 你在 GitHub 改完檔案，使用者重開就是新版，不會卡舊的。
   - 圖片 / 字型 一律「先用快取、背景更新」→ 省流量、開得快。
   - 改版時只要把下面 VERSION 的數字 +1，舊快取會自動清掉。
*/
const VERSION = 'jl-v10-bazi-dashboard';
const CORE = [
  './',
  './index.html',
  './taohua.html',
  './rz.html',
  './data-taohua.js',
  './traditional-zh.js?v=traditional-v1',
  './badge-taohua-v1.svg',
  './assets/celestial-orbit.svg',
  './assets/peach-oracle.svg',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(VERSION).then(c =>
      // 個別加入，任何一支檔案不存在也不會讓整個安裝失敗
      Promise.all(CORE.map(u => c.add(u).catch(() => null)))
    )
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const isAsset = url => /\.(png|jpe?g|webp|svg|gif|ico|woff2?|ttf|otf)$/i.test(url.pathname);

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }
  if (!/^https?:$/.test(url.protocol)) return;

  // 圖片、字型：快取優先，背景默默更新
  if (isAsset(url)) {
    e.respondWith(
      caches.match(req).then(hit => {
        const net = fetch(req).then(res => {
          if (res && res.ok) caches.open(VERSION).then(c => c.put(req, res.clone()));
          return res;
        }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // 其他（HTML / JS / CDN 程式庫）：連網優先，斷線才回快取
  e.respondWith(
    fetch(req).then(res => {
      // 跨網域的 <script> 會回傳 opaque（status 0），res.ok 是 false，
      // 但還是要存起來，不然離線時 lunar-javascript 讀不到，排盤會整個掛掉。
      const storable = res && (res.ok || res.type === 'opaque');
      if (storable) {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() =>
      caches.match(req).then(hit => hit || caches.match('./index.html'))
    )
  );
});
