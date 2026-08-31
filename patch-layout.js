/* ============================================================
   patch-layout.js  ·  版面動線重整
   ------------------------------------------------------------
   index.html 加在【所有 patch 的最後面】：
     <script src="patch-layout.js"></script>
   （放在 patch-pwa.js 之前即可，不需改動任何既有的行）

   解決四個問題：
     1. 首頁沒有功能選單，所有入口都要排盤後往下滑才找得到
        → 最上面加一張「功 能 選 單」，六個入口一次看到
     2. 外掛全部擠在「流年」後面 → 先講人，再講運
     3. 查字卡卡在排盤按鈕與結果中間 → 移出主動線
     4. 八星磁場查詢／看日子 兩個出入口散在頁尾 → 收成一張導覽卡

   作法：不搬動 DOM，改用 flex 的 order 排序。
   每次排盤後重新套用，外掛重繪也不會亂掉。

   ── 2026/08/10 修改兩處（老師 8/10 指示）──────────────
   ★ 修改 1：ORDER 補上「四柱八字」，排在「先天後天」前面
      原本 ORDER 沒有這一項，rankOf 回傳 90，
      導致四柱八字被排到整頁最後面，跟先天後天分居頭尾。
   ★ 修改 2：新增 join()，把四柱八字卡的下緣與
      先天後天卡的上緣接起來，中間不留框線與空隙。
      只改樣式，不搬動也不刪除任何元素。
   ============================================================ */
(function () {
'use strict';

/* ---------- 想要的閱讀順序（依卡片標題關鍵字比對）----------
   改順序只要調整這個陣列，不必動任何其他地方。          */
var ORDER = [
  ['四柱八字'],      /* ★ 新增：四柱要緊接在數字盤上面 */
  ['先天','後天'],   /* 數字盤 */
  ['十年大運'],       /* 傳統八字大運，緊接先天後天 */
  ['六柱環'],
  ['五行能量'],
  ['陰陽斷'],
  ['陰陽屬性'],
  ['萬物類象'],
  ['六親對照'],
  ['六親全覽'],
  ['八星磁場'],
  ['大運分段'],
  ['流年'],
  ['奇門手機號'],
  ['奇門數字九宮'],
  ['尚未建置'],
  ['專業版']
];

/* ---------- 要藏起來的卡片（老師說不要的）---------- */
var HIDE = ['五角漢字'];

/* ---------- 要接在一起的兩張卡（上面那張, 下面那張）---------- */
var JOIN = [['四柱八字'], ['先天','後天']];

function css(){
  if (document.getElementById('ly-css')) return;
  var s = document.createElement('style');
  s.id = 'ly-css';
  s.appendChild(document.createTextNode([
    /* 讓 #out 變成可排序的容器，外掛容器透明化 */
    /* 注意：一定要用 :not(.hide)，否則 ID 優先權會壓過 .hide{display:none}，
       導致還沒排盤時整個結果區就被顯示出來（一堆空卡片）。 */
    '#out:not(.hide){display:flex;flex-direction:column}',
    '#out:not(.hide) > #plug,#out:not(.hide) > #plugs{display:contents}',
    '#out > .card{width:100%}',
    /* ★ 接在一起的兩張卡 */
    '#out .card.ly-join-top{margin-bottom:0!important;border-bottom:0!important;',
      'padding-bottom:10px!important;box-shadow:none!important}',
    '#out .card.ly-join-bot{margin-top:0!important;border-top:0!important;',
      'padding-top:10px!important}',
    '#out .card.ly-join-bot > h2{margin-top:4px}',
    /* 首頁功能選單 */
    '#ly-menu .ly-m{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '#ly-menu .ly-m a{display:block;padding:15px 8px;text-align:center;text-decoration:none;',
      'border:1px solid var(--line,#d3c6b0);border-radius:3px;background:#fffdf9;',
      'font-family:var(--ser,serif);font-size:16px;letter-spacing:.16em;color:#4d3728;cursor:pointer}',
    '#ly-menu .ly-m a small{display:block;margin-top:5px;font-size:11px;letter-spacing:.04em;color:#85776c}',
    '#ly-menu .ly-m a:active{background:#f3ede2}',
    '#ly-menu .ly-m a.main{grid-column:1 / -1;background:var(--zhu,#7d1d1d);color:#f7f3ea;border-color:var(--zhu,#7d1d1d)}',
    '#ly-menu .ly-m a.main small{color:rgba(255,255,255,.7)}',
    '#ly-menu .ly-hint{margin:10px 0 0;font-size:12px;color:var(--zhu,#7d1d1d);text-align:center;min-height:18px}',
    /* 導覽卡 */
    '.ly-nav{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
    '.ly-nav a{display:block;padding:14px 8px;text-align:center;text-decoration:none;',
      'border:1px solid var(--gold,#b78c39);border-radius:3px;background:#fffdf9;',
      'font-family:var(--ser,serif);font-size:15px;letter-spacing:.14em;color:var(--zhu,#7d1d1d)}',
    '.ly-nav a small{display:block;margin-top:4px;font-size:11px;letter-spacing:.04em;color:#85776c}',
    '.ly-nav a:active{background:#f5efe2}',
    '@media (max-width:360px){.ly-nav{grid-template-columns:1fr}}'
  ].join('')));
  document.head.appendChild(s);
}

function titleOf(card){
  var h = card.querySelector('h2');
  return h ? (h.textContent || '').replace(/\s/g, '') : '';
}

function match(t, keys){
  for (var k = 0; k < keys.length; k++){
    if (t.indexOf(keys[k]) < 0) return false;
  }
  return true;
}

function rankOf(t){
  for (var i = 0; i < ORDER.length; i++){
    if (match(t, ORDER[i])) return i + 1;
  }
  return 90;                 /* 沒列到的排在後面、導覽卡之前 */
}

/* ---------- 首頁功能選單 ---------- */
var MENU = [
  {k:'paipan', c:'main', n:'生 辰 排 盤', d:'六柱、卦義、大運流年'},
  {k:'qimen',  n:'手機號論斷',   d:'奇門．末七碼落宮'},
  {k:'jiugong',n:'數字九宮盤',   d:'後七碼倒填九宮'},
  {k:'pro',    n:'專 業 版',     d:'需密碼解鎖'},
  {h:'bxcc.html', n:'八星磁場查詢', d:'手機、車牌、門牌'},
  {h:'rz.html',   n:'看 日 子',     d:'宜忌、方位、吉時'}
];

function menu(){
  if (document.getElementById('ly-menu')) return;
  var wrap = document.querySelector('.wrap');
  if (!wrap) return;
  var first = wrap.querySelector('.card');
  if (!first) return;

  var card = document.createElement('div');
  card.className = 'card';
  card.id = 'ly-menu';
  var h = '<h2>功 能 選 單</h2><div class="ly-m">';
  for (var i = 0; i < MENU.length; i++){
    var m = MENU[i];
    var tag = m.h ? '<a href="' + m.h + '"' : '<a href="#" data-ly="' + m.k + '"';
    h += tag + (m.c ? ' class="' + m.c + '"' : '') + '>' + m.n +
         '<small>' + m.d + '</small></a>';
  }
  h += '</div><p class="ly-hint" id="ly-hint"></p>';
  card.innerHTML = h;
  wrap.insertBefore(card, first);
}

function hint(msg){
  var p = document.getElementById('ly-hint');
  if (!p) return;
  p.textContent = msg || '';
  if (msg) setTimeout(function(){ if (p.textContent === msg) p.textContent = ''; }, 4000);
}

function findCard(keys){
  var all = document.querySelectorAll('.card');
  for (var i = 0; i < all.length; i++){
    if (all[i].id === 'ly-menu') continue;
    if (match(titleOf(all[i]), keys) && all[i].offsetParent !== null) return all[i];
  }
  return null;
}

function jump(key){
  var target = null;
  if (key === 'paipan'){
    target = document.getElementById('cal');
    if (target && target.parentNode) target = target.parentNode;
  } else if (key === 'qimen'){
    target = findCard(['奇門手機號']);
    if (!target) return hint('手機號論斷載入中，請稍候再試。');
  } else if (key === 'jiugong'){
    target = findCard(['奇門數字九宮']);
    if (!target) return hint('數字九宮盤載入中，請稍候再試。');
  } else if (key === 'pro'){
    target = findCard(['專業版']);
    if (!target) return hint('請先在上方輸入生辰、按「排盤」，專業版才會出現。');
  }
  if (!target) return;
  if (target.scrollIntoView) target.scrollIntoView({behavior:'smooth', block:'start'});
}

/* ---------- 把頁尾兩個連結收成一張導覽卡 ---------- */
function nav(out){
  var card = document.getElementById('ly-nav-card');
  if (card) return card;
  /* 保險：直接掃一次容器，避免重複建立 */
  var ex = out.querySelectorAll('.card');
  for (var e = 0; e < ex.length; e++){
    if (ex[e].id === 'ly-nav-card') return ex[e];
  }

  var links = [];
  var all = document.getElementsByTagName('a');
  for (var i = 0; i < all.length; i++){
    var h = all[i].getAttribute('href') || '';
    if (h === 'bxcc.html' || h === 'rz.html') links.push(all[i]);
  }
  if (!links.length) return null;

  card = document.createElement('div');
  card.className = 'card';
  card.id = 'ly-nav-card';
  card.innerHTML = '<h2>其 他 工 具</h2><div class="ly-nav">' +
    '<a href="bxcc.html">八星磁場查詢<small>手機、車牌、門牌</small></a>' +
    '<a href="rz.html">看日子<small>宜忌、方位、吉時</small></a>' +
    '</div>';
  out.appendChild(card);

  /* 原本的裸連結收起來，不重複出現 */
  for (i = 0; i < links.length; i++){
    /* 選單卡裡的連結不能碰 */
    if (links[i].closest && links[i].closest('#ly-menu')) continue;
    if (links[i].closest && links[i].closest('#ly-nav-card')) continue;
    links[i].style.display = 'none';
  }
  return card;
}

/* ---------- ★ 把兩張卡接成一塊 ---------- */
function join(out){
  var cards = out.querySelectorAll('.card'), i;
  /* 先清掉上一輪的標記，避免重繪後殘留 */
  for (i = 0; i < cards.length; i++){
    cards[i].classList.remove('ly-join-top');
    cards[i].classList.remove('ly-join-bot');
  }

  var top = null, bot = null;
  for (i = 0; i < cards.length; i++){
    var t = titleOf(cards[i]);
    if (cards[i].style.display === 'none') continue;
    if (!top && match(t, JOIN[0])) top = cards[i];
    if (!bot && match(t, JOIN[1])) bot = cards[i];
  }
  /* 兩張都在、而且是不同的卡，才接起來 */
  if (!top || !bot || top === bot) return;

  top.classList.add('ly-join-top');
  bot.classList.add('ly-join-bot');
}

function apply(){
  css();
  menu();
  var out = document.getElementById('out');
  if (!out) return;

  var cards = out.querySelectorAll('.card');
  for (var i = 0; i < cards.length; i++){
    var c = cards[i];
    if (c.id === 'ly-nav-card') continue;
    var t = titleOf(c);

    var hide = false;
    for (var h = 0; h < HIDE.length; h++){
      if (t.indexOf(HIDE[h]) > -1) hide = true;
    }
    if (hide){ c.style.display = 'none'; continue; }

    c.style.order = rankOf(t);
  }

  var n = nav(out);
  if (n) n.style.order = 99;

  join(out);                 /* ★ 排序完再接卡 */

  /* 排盤區外面那些常駐卡（#plugs0）若含要藏的，一併處理 */
  var st = document.getElementById('plugs0');
  if (st){
    var sc = st.querySelectorAll('.card');
    for (var j = 0; j < sc.length; j++){
      var tt = titleOf(sc[j]);
      for (var k = 0; k < HIDE.length; k++){
        if (tt.indexOf(HIDE[k]) > -1) sc[j].style.display = 'none';
      }
    }
  }
}

function go(){
  try { apply(); } catch(e){ console.warn('[patch-layout] ' + (e && e.message)); }
}

/* 包住 render，外掛每次重繪後重新套用順序 */
function wrap(name){
  if (typeof window[name] !== 'function') return false;
  if (window[name].__ly) return true;
  var orig = window[name];
  var f = function(){ var r = orig.apply(this, arguments); setTimeout(go, 0); return r; };
  f.__ly = true;
  window[name] = f;
  return true;
}

var tries = 0;
function hook(){
  var ok = false;
  if (wrap('render')) ok = true;
  if (wrap('runPlugins')) ok = true;
  if (!ok && ++tries < 60) return setTimeout(hook, 200);
  go();
}

document.addEventListener('click', function(e){
  var t = e.target;
  var a = t && t.closest ? t.closest('[data-ly]') : null;
  if (a){ e.preventDefault(); jump(a.getAttribute('data-ly')); return; }
  if (t && (t.id === 'go' || (t.closest && t.closest('#go')))){
    setTimeout(go, 150);
    setTimeout(go, 700);
  }
});

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', hook);
} else {
  hook();
}
setTimeout(go, 1200);

})();
