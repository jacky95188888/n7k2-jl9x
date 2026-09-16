/* 筠玲易數 · PWA 外掛
   只要在 index.html 底部加一行 <script src="patch-pwa.js"></script> 就好，
   <head> 完全不用動。這支會自己補上 manifest、圖示、狀態列顏色，並註冊 Service Worker。
*/
(function () {
  'use strict';
  var head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return;

  function add(tag, attrs) {
    for (var k in attrs) {
      if (k === 'rel' || k === 'name') {
        var sel = tag + '[' + k + '="' + attrs[k] + '"]';
        if (document.querySelector(sel)) return;
      }
    }
    var el = document.createElement(tag);
    for (var a in attrs) el.setAttribute(a, attrs[a]);
    head.appendChild(el);
  }

  add('link', { rel: 'manifest', href: 'manifest.json' });
  add('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' });
  add('link', { rel: 'icon', type: 'image/png', href: 'icon-192.png' });
  add('meta', { name: 'theme-color', content: '#8C2F26' });
  add('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' });
  add('meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' });
  add('meta', { name: 'apple-mobile-web-app-title', content: '筠玲易數' });
  add('meta', { name: 'mobile-web-app-capable', content: 'yes' });

  var toneTheme = document.createElement('link');
  toneTheme.rel = 'stylesheet';
  toneTheme.href = 'tone-deepen-v1.css?v=20260916-11';
  head.appendChild(toneTheme);

  var premiumDepth = document.createElement('link');
  premiumDepth.rel = 'stylesheet';
  premiumDepth.href = 'premium-depth-v1.css?v=20260916-11';
  head.appendChild(premiumDepth);

  var jiugongLuxury = document.createElement('link');
  jiugongLuxury.rel = 'stylesheet';
  jiugongLuxury.href = 'jiugong-luxury-v5.css?v=20260916-11';
  head.appendChild(jiugongLuxury);

  var qimenMasterV10 = document.createElement('link');
  qimenMasterV10.rel = 'stylesheet';
  qimenMasterV10.href = 'qimen-master-v10.css?v=20260916-11';
  head.appendChild(qimenMasterV10);

  // 全站 V11：最後載入，統一處理所有仍過淡、過白、過平的區塊；特殊九宮母版排除。
  var globalMasterV11 = document.createElement('link');
  globalMasterV11.rel = 'stylesheet';
  globalMasterV11.href = 'global-master-v11.css?v=20260916-11';
  head.appendChild(globalMasterV11);

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js?v=20260916-11').catch(function (err) {
        console.warn('[PWA] Service Worker 註冊失敗：', err && err.message);
      });
    });
  }
})();
