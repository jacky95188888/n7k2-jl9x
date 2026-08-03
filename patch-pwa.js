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
        // 已經有同名的就不重複加，避免蓋掉你手寫的設定
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

  // Service Worker：只在 https（GitHub Pages）或 localhost 下註冊
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.warn('[PWA] Service Worker 註冊失敗：', err && err.message);
      });
    });
  }
})();
