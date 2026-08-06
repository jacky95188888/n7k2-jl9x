/* ============================================================
   patch-liunian.js  ·  流年表補欄（干支／太歲／旬運／旬空）
   ------------------------------------------------------------
   index.html 在 patch-flow.js 那行【下面】加：
     <script src="patch-liunian.js"></script>

   老師需求：「旬空跟他一樣跑」——旬空逐年變動，不是命盤那個固定值。

   演算法（全部只靠西元年，不需曆法庫）：
     六十甲子序 i = (西元年 - 4) mod 60
     干支   = 天干[i mod 10] + 地支[i mod 12]
     旬     = floor(i / 10)                 0甲子 1甲戌 2甲申 3甲午 4甲辰 5甲寅
     旬首支 = (旬 × 10) mod 12
     旬運   = 旬首支序
     旬空   = 旬首支 +10、+11（mod 12）兩支之序

   註：index.html 的 drawFlow 已自帶「太歲」欄（由生年地支逐年遞增），
       演算法與本檔一致，故本檔不重複產生，只補 干支／旬運／旬空 三欄。

   已對老師截圖 2112壬申～2125乙酉 共 14 列驗算，干支／太歲／旬運／旬空全中。
   （歲運、國運兩欄規則未明，未實作，待老師提供。）

   顯示起始年：老師指定 2025 年起才顯示，之前年份留白。
               要改起始年就改 START_YEAR；設成 0 表示全部顯示。
   ============================================================ */
(function () {
'use strict';

var START_YEAR = 2025;

var GAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
var ZHI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

function calc(y) {
  var i = ((y - 4) % 60 + 60) % 60;
  var xun = Math.floor(i / 10);
  var head = (xun * 10) % 12;                 // 旬首地支 index
  var k1 = (head + 10) % 12, k2 = (head + 11) % 12;
  return {
    gz:   GAN[i % 10] + ZHI[i % 12],
    tai:  (i % 12) + 1,
    yun:  head + 1,
    kong: (k1 + 1) + '　' + (k2 + 1),
    kz:   ZHI[k1] + ZHI[k2]
  };
}

function css() {
  if (document.getElementById('ln-style')) return;
  var s = document.createElement('style');
  s.id = 'ln-style';
  s.textContent = [
    '#tl th.ln, #tl td.ln{white-space:nowrap}',
    '#tl td.ln-gz{font-weight:600;letter-spacing:.04em}',
    '#tl td.ln-tai{color:#2f5d8a}',
    '#tl td.ln-kong{color:#8a6a24;letter-spacing:.02em}',
    '.ln-note{font-size:12px;color:#8f8069;line-height:1.8;margin:8px 0 0}'
  ].join('');
  document.head.appendChild(s);
}

/* 在一列 cells 裡找出西元年那一格 */
function findYear(cells) {
  for (var i = 0; i < cells.length; i++) {
    var t = (cells[i].textContent || '').replace(/[^0-9]/g, '');
    if (t.length === 4) {
      var y = parseInt(t, 10);
      if (y >= 1900 && y <= 2200) return { idx: i, y: y };
    }
  }
  return null;
}

function build() {
  var table = document.getElementById('tl');
  if (!table) return;
  if (table.getAttribute('data-ln') === '1') return;   // 已補過就不重複

  var body = table.querySelectorAll('tbody tr');
  if (!body || !body.length) return;

  /* 先用第一列定位「西元年」在第幾格 */
  var probe = null;
  for (var p = 0; p < body.length && !probe; p++) {
    probe = findYear(body[p].children || body[p].cells || []);
  }
  if (!probe) { console.warn('[patch-liunian] 找不到西元年欄，未補欄'); return; }

  /* 表頭 */
  var heads = table.querySelectorAll('thead tr');
  if (heads && heads.length) {
    var hr = heads[heads.length - 1];
    ['干支','旬運','旬空'].forEach(function (t) {
      var th = document.createElement('th');
      th.className = 'ln';
      th.textContent = t;
      hr.appendChild(th);
    });
  }

  /* 每一列 */
  for (var r = 0; r < body.length; r++) {
    var tr = body[r];
    var cells = tr.children || tr.cells || [];
    var f = findYear(cells);
    var y = f ? f.y : null;
    if (y === null) {
      var c = cells[probe.idx];
      var t2 = c ? (c.textContent || '').replace(/[^0-9]/g, '') : '';
      if (t2.length === 4) y = parseInt(t2, 10);
    }
    var vals;
    if (y === null || (START_YEAR && y < START_YEAR)) { vals = ['','','']; }
    else {
      var o = calc(y);
      vals = [o.gz, String(o.yun), o.kong];
      tr.setAttribute('title', y + ' ' + o.gz + '　旬空 ' + o.kz);
    }
    var cls = ['ln ln-gz','ln ln-yun','ln ln-kong'];
    for (var k = 0; k < 3; k++) {
      var td = document.createElement('td');
      td.className = cls[k];
      td.textContent = vals[k];
      tr.appendChild(td);
    }
  }

  table.setAttribute('data-ln', '1');

  /* 說明列 */
  var scroll = table.parentNode;
  var card = scroll && scroll.parentNode;
  if (card && !card.querySelector('.ln-note')) {
    var note = document.createElement('p');
    note.className = 'ln-note';
    note.innerHTML = '旬空依該年干支所屬之旬逐年變動：甲子旬空戌亥、甲戌旬空申酉、甲申旬空午未、' +
                     '甲午旬空辰巳、甲辰旬空寅卯、甲寅旬空子丑。旬運為該旬旬首之地支序。' +
                     (START_YEAR ? '<br>干支、旬運、旬空自 ' + START_YEAR + ' 年起顯示。' : '');
    card.appendChild(note);
  }
}

function hook() {
  if (typeof window.drawFlow !== 'function') return setTimeout(hook, 200);
  if (window.drawFlow.__lnWrapped) return;
  var orig = window.drawFlow;
  var wrapped = function () {
    orig.apply(this, arguments);
    try { css(); build(); }
    catch (e) { console.warn('[patch-liunian] 補欄失敗：', e && e.message); }
  };
  wrapped.__lnWrapped = true;
  window.drawFlow = wrapped;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hook);
} else {
  hook();
}

window.LNcalc = calc;   // 供其他外掛取用
})();
