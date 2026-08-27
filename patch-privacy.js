/* 筠玲易數 · 個資告知外掛
   第一次按下排盤時告知，同意後記在本機不再跳。
   頁尾會留一個「隱私與個資說明」連結，隨時可以再打開。
   全程不用 alert / confirm / prompt，iframe 內也能正常運作。
*/
(function () {
  'use strict';

  var KEY = 'jl_privacy_ack_v1';

  // localStorage 在某些隱私模式下會直接丟例外，全部包起來
  function readAck() {
    try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }
  function writeAck() {
    try { localStorage.setItem(KEY, '1'); } catch (e) { /* 記不住就每次問，不影響使用 */ }
  }

  var CSS = [
    '.jlp-mask{position:fixed;top:0;left:0;right:0;bottom:0;inset:0;z-index:99999;background:rgba(23,19,15,.72);',
    'display:flex;align-items:center;justify-content:center;padding:20px;',
    '-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);}',
    '.jlp-card{width:100%;max-width:420px;max-height:86vh;overflow:auto;',
    'background:radial-gradient(circle at 100% 0,#f4d67655,transparent 28%),linear-gradient(145deg,#fff,#fff4ff);color:#43204c;border:1px solid #dfbd59;border-radius:18px;',
    'box-shadow:0 22px 55px rgba(54,4,65,.45),inset 0 1px #fff;padding:26px 22px 20px;',
    'font-family:"Noto Serif TC","Songti TC",serif;line-height:1.85;',
    'animation:jlp-in .28s ease-out;}',
    '@keyframes jlp-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}',
    '@media (prefers-reduced-motion:reduce){.jlp-card{animation:none}}',
    '.jlp-eyebrow{font-size:11px;letter-spacing:.32em;color:#a07925;margin:0 0 6px;}',
    '.jlp-title{font-size:19px;font-weight:700;color:#611174;margin:0 0 14px;letter-spacing:.05em;}',
    '.jlp-rule{height:1px;border:0;margin:0 0 16px;',
    'background:linear-gradient(90deg,#C9A227,rgba(201,162,39,0));}',
    '.jlp-card p{font-size:14px;margin:0 0 12px;}',
    '.jlp-card ul{font-size:14px;margin:0 0 14px;padding-left:1.15em;}',
    '.jlp-card li{margin:0 0 7px;}',
    '.jlp-card b{color:#6b147d;}',
    '.jlp-note{font-size:12px;color:#6B6259;margin:0 0 18px;}',
    '.jlp-btn{display:block;width:100%;padding:13px;border:1px solid #e4c35f;border-radius:999px;',
    'background:linear-gradient(135deg,#510665,#8e18ae 55%,#bd31d8);color:#fff;font-size:15px;letter-spacing:.12em;cursor:pointer;',
    'font-family:inherit;}',
    '.jlp-btn:hover{background:linear-gradient(135deg,#430451,#7c1398 55%,#a728c1);}',
    '.jlp-btn:focus-visible,.jlp-link:focus-visible{outline:2px solid #C9A227;outline-offset:2px;}',
    '.jlp-foot{position:relative;overflow:hidden;width:min(calc(100% - 28px),620px);margin:14px auto 22px;padding:18px 16px;text-align:center;',
    'border:1px solid rgba(218,180,72,.72);border-radius:18px;background:radial-gradient(circle at 88% 24%,rgba(213,92,228,.28),transparent 28%),url("assets/celestial-orbit.svg") 105% 52%/150px no-repeat,linear-gradient(105deg,#270230,#641078 58%,#34043e);',
    'box-shadow:0 12px 26px rgba(71,8,85,.2),inset 0 1px rgba(255,255,255,.2);}',
    '.jlp-foot:before{content:"隱私安心 · 本機運算 · 不留紀錄";display:block;margin-bottom:5px;color:#efd987;font-size:10px;font-weight:800;letter-spacing:.14em;}',
    '.jlp-link{font-size:12px;color:#fff3ff;text-decoration:none;border-bottom:1px solid #E1C45D;',
    'padding-bottom:2px;cursor:pointer;background:none;border-left:0;border-right:0;border-top:0;',
    'font-family:inherit;}'
  ].join('');

  var HTML =
    '<div class="jlp-card" role="dialog" aria-modal="true" aria-label="關於你輸入的生辰" >' +
      '<p class="jlp-eyebrow">筠玲易數</p>' +
      '<h2 class="jlp-title jlp-t">關於你輸入的生辰</h2>' +
      '<hr class="jlp-rule">' +
      '<p>排盤需要你的<b>出生年月日與時辰</b>。這幾項屬於個人資料，先說清楚我們怎麼處理：</p>' +
      '<ul>' +
        '<li><b>全部在你的手機裡算完</b>，不會上傳到任何伺服器。</li>' +
        '<li><b>不建立會員、不留存紀錄</b>，關掉頁面資料就沒了。</li>' +
        '<li>只在你按下排盤的當下使用，用途僅限於命理分析。</li>' +
        '<li>不會提供給第三方，也不做廣告追蹤。</li>' +
      '</ul>' +
      '<p class="jlp-note">依個人資料保護法第八條告知。你可以隨時關閉頁面停止使用；' +
      '若替他人排盤，請先取得對方同意。</p>' +
      '<button class="jlp-btn jlp-ok" type="button">我了解，開始排盤</button>' +
    '</div>';

  function ensureStyle() {
    if (document.getElementById('jlp-style')) return;
    var s = document.createElement('style');
    s.id = 'jlp-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function open(remember, afterClose) {
    if (document.querySelector('.jlp-mask')) return;
    ensureStyle();
    var mask = document.createElement('div');
    mask.className = 'jlp-mask';
    mask.innerHTML = HTML;
    document.body.appendChild(mask);
    var prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function close() {
      if (remember) writeAck();
      document.body.style.overflow = prevOverflow;
      if (mask.parentNode) mask.parentNode.removeChild(mask);
      document.removeEventListener('keydown', onKey);
      if (typeof afterClose === 'function') afterClose();
    }
    function onKey(e) { if (e.key === 'Escape' && !remember) close(); }

    mask.querySelector('.jlp-ok').addEventListener('click', close);
    if (!remember) {
      mask.querySelector('.jlp-ok').textContent = '關閉';
      mask.addEventListener('click', function (e) { if (e.target === mask) close(); });
    }
    document.addEventListener('keydown', onKey);
    setTimeout(function () { mask.querySelector('.jlp-ok').focus(); }, 60);
  }

  function addFooterLink() {
    if (document.getElementById('jlp-foot')) return;
    var d = document.createElement('div');
    d.className = 'jlp-foot';
    d.id = 'jlp-foot';
    d.innerHTML = '<button class="jlp-link" type="button">隱私與個資說明</button>';
    d.querySelector('button').addEventListener('click', function () { open(false); });
    document.body.appendChild(d);
  }

  function boot() {
    ensureStyle();
    addFooterLink();
    document.addEventListener('click', function (e) {
      var go = e.target && e.target.closest ? e.target.closest('#go') : null;
      if (!go || readAck() || go.dataset.jlpReplay === '1') return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      open(true, function () {
        go.dataset.jlpReplay = '1';
        go.click();
        delete go.dataset.jlpReplay;
      });
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
