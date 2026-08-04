/* ============================================================
   patch-guayi.js　專業版．卦義詳解
   ------------------------------------------------------------
   在專業版加入：每一柱、每一運段的卦序、卦名、八卦符號、
   斷曰四句、詳細解讀。文字全部取自 gua169.js，不另行編寫。

   放在 index.html 的 patch-pro.js 之後：
     <script src="patch-guayi.js"></script>

   八卦符號以 CSS 爻線繪製，不使用 Unicode 卦符，
   避免部分手機把 ☰ 顯示成彩色圖示。
   ============================================================ */
(function(){
'use strict';

/* ---------- 數字 → 地支 → 八卦 ----------
   與八星磁場頁同一套：1子坎 2丑艮 3寅艮 4卯震 5辰巽
   6巳巽 7午離 8未坤 9申坤 10酉兌 11戌乾 12亥乾      */
var ZHI = ['','子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
var GUA = ['','坎','艮','艮','震','巽','巽','離','坤','坤','兌','乾','乾'];

/* 爻線，由上而下：1 陽（整條）、0 陰（中斷） */
var YAO = {
  '乾':'111', '兌':'011', '離':'101', '震':'001',
  '巽':'110', '坎':'010', '艮':'100', '坤':'000'
};

/* ---------- 樣式 ---------- */
var CSS =
'.gy-wrap{margin-top:6px}' +
'.gy-item{margin:0 0 10px;border:1px solid var(--line,#d3c6b0);background:#fffdf9}' +
'.gy-item[open]{border-color:#bda98f}' +
'.gy-sum{list-style:none;cursor:pointer;padding:13px 14px;display:flex;' +
  'align-items:center;gap:11px;font-family:var(--ser,serif);font-size:14px;' +
  'color:#4d3728;background:#f6f2e9}' +
'.gy-sum::-webkit-details-marker{display:none}' +
'.gy-item[open] .gy-sum{border-bottom:1px solid var(--line,#d3c6b0)}' +
'.gy-tag{flex:0 0 auto;min-width:38px;padding:2px 6px;text-align:center;' +
  'border:1px solid var(--zhu,#7d1d1d);color:var(--zhu,#7d1d1d);' +
  'font-size:11px;letter-spacing:.08em}' +
'.gy-body{flex:1 1 auto;min-width:0;letter-spacing:.06em}' +
'.gy-body i{display:block;font-style:normal;font-size:11.5px;' +
  'letter-spacing:.02em;color:#85776c;font-family:var(--sans,sans-serif)}' +
'.gy-chev{flex:0 0 auto;color:#a3927c;font-size:12px}' +
'.gy-item[open] .gy-chev{color:var(--zhu,#7d1d1d)}' +
'.gy-inner{padding:16px 14px 18px}' +
'.gy-gua{padding:14px 0;border-top:1px dashed #ddd2c0}' +
'.gy-gua:first-child{padding-top:0;border-top:0}' +
'.gy-head{display:flex;align-items:center;gap:14px;margin-bottom:12px}' +
'.gy-name{font-family:var(--ser,serif);font-size:19px;letter-spacing:.1em;color:#5d2c20}' +
'.gy-name em{display:block;font-style:normal;font-size:11px;letter-spacing:.14em;' +
  'color:#85776c;font-family:var(--sans,sans-serif);margin-top:2px}' +
/* 八卦符號 */
'.gy-tri{display:flex;flex-direction:column;gap:4px;flex:0 0 auto}' +
'.gy-tri span{display:flex;gap:5px;width:40px;height:5px}' +
'.gy-tri span b{flex:1;background:var(--zhu,#7d1d1d);border-radius:1px}' +
'.gy-pair{display:flex;align-items:center;gap:10px;flex:0 0 auto}' +
'.gy-pair small{font-family:var(--ser,serif);font-size:11px;color:#85776c;' +
  'letter-spacing:.1em;text-align:center;display:block;margin-top:5px}' +
'.gy-note{margin:0 0 10px;font-size:12px;color:#85776c;line-height:1.8}';

function injectCSS(){
  if (document.getElementById('gy-css')) return;
  var s = document.createElement('style');
  s.id = 'gy-css';
  s.appendChild(document.createTextNode(CSS));
  document.head.appendChild(s);
}

/* ---------- 小工具 ---------- */
function esc(s){
  return String(s == null ? '' : s).replace(/[&<>]/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];
  });
}
function nl2br(s){ return esc(String(s == null ? '' : s).replace(/^\s+|\s+$/g,'')).replace(/\n/g, '<br>'); }

function seq(a, b){ return a * 13 + b + 1; }

function guaOf(a, b){
  var G = window.GUA169;
  if (!G) return null;
  return G[a + '-' + b] || null;
}

/* 畫一個八卦：三條爻線 */
function triHTML(n){
  var g = GUA[n];
  if (!g) return '';
  var y = YAO[g], h = '';
  for (var i = 0; i < 3; i++){
    h += y.charAt(i) === '1'
      ? '<span><b></b></span>'
      : '<span><b></b><b></b></span>';
  }
  return '<div class="gy-pair"><div>'
       + '<div class="gy-tri">' + h + '</div>'
       + '<small>' + ZHI[n] + g + '</small>'
       + '</div></div>';
}

/* 一卦的完整區塊 */
function guaBlock(a, b){
  var g = guaOf(a, b);
  var head = '<div class="gy-head">'
           + triHTML(a) + triHTML(b)
           + '<div class="gy-name">' + (g ? esc(g[0]) : esc(a + '-' + b))
           + '<em>第 ' + seq(a, b) + ' 卦　' + a + ' - ' + b + '</em></div>'
           + '</div>';
  if (!g){
    return '<div class="gy-gua">' + head
         + '<div class="jdu">這一組在 gua169.js 裡查不到資料。</div></div>';
  }
  return '<div class="gy-gua">' + head
       + '<div class="duan">' + nl2br(g[2]) + '</div>'
       + '<div class="jdu">' + nl2br(g[1]) + '</div>'
       + '</div>';
}

/* 一個可展開的項目 */
function item(tag, title, sub, a, b, c){
  return '<details class="gy-item">'
       + '<summary class="gy-sum">'
       +   '<span class="gy-tag">' + esc(tag) + '</span>'
       +   '<span class="gy-body">' + esc(title) + '<i>' + esc(sub) + '</i></span>'
       +   '<span class="gy-chev">▾</span>'
       + '</summary>'
       + '<div class="gy-inner">' + guaBlock(a, b) + guaBlock(b, c) + '</div>'
       + '</details>';
}

/* ---------- 產生整區 ---------- */
function buildHTML(){
  var PP = window.PP;
  if (!PP) return '';
  var c = PP.chart;
  if (!c) return '';
  if (!window.GUA169){
    return '<div class="jdu">解盤資料檔沒有載入，無法顯示卦義。</div>';
  }

  var h = '';

  /* 六柱 */
  h += '<h2 style="margin-top:18px">柱 卦 詳 解</h2>';
  h += '<p class="gy-note">每一柱有兩卦：左卦為天運方向，右卦為地運方向。點開看斷曰與詳解。</p>';
  h += '<div class="gy-wrap">';
  c.wins.forEach(function(w, i){
    var lab = (c.lab && c.lab[i]) ? c.lab[i] : ('第' + (i + 1) + '柱');
    var n1 = window.PP.gname(w[0], w[1]) || '';
    var n2 = window.PP.gname(w[1], w[2]) || '';
    h += item(lab + ' 柱',
              w[0] + ' - ' + w[1] + ' - ' + w[2],
              n1 + '　' + n2,
              w[0], w[1], w[2]);
  });
  h += '</div>';

  /* 運段 */
  h += '<h2 style="margin-top:22px">運 段 卦 詳 解</h2>';
  h += '<p class="gy-note">依大運分界排列，每段同樣有天運、地運兩卦。</p>';
  h += '<div class="gy-wrap">';
  var prev = 0;
  c.bounds.forEach(function(x, i){
    var g = c.segs[i] || c.segs[c.segs.length - 1];
    var n1 = window.PP.gname(g[0], g[1]) || '';
    var n2 = window.PP.gname(g[1], g[2]) || '';
    var age = (prev + (prev ? 0 : 1)) + '–' + (x - 1) + ' 歲';
    h += item('運 ' + (i + 1),
              g[0] + ' - ' + g[1] + ' - ' + g[2] + '　' + age,
              n1 + '　' + n2,
              g[0], g[1], g[2]);
    prev = x;
  });
  h += '</div>';

  return h;
}

/* ---------- 掛進專業版 ---------- */
function append(){
  var box = document.getElementById('proout');
  if (!box || box.classList.contains('hide')) return;
  if (box.querySelector('.gy-wrap')) return;   /* 已經加過 */
  injectCSS();
  var html = buildHTML();
  if (!html) return;
  var d = document.createElement('div');
  d.innerHTML = html;
  while (d.firstChild) box.appendChild(d.firstChild);
}

/* drawPro 是全域函式宣告，包一層讓它畫完之後補上卦義 */
function hook(){
  if (typeof window.drawPro !== 'function') return false;
  if (window.drawPro.__gy) return true;
  var orig = window.drawPro;
  var wrapped = function(){
    var r = orig.apply(this, arguments);
    try { append(); } catch(e){
      var box = document.getElementById('proout');
      if (box) box.insertAdjacentHTML('beforeend',
        '<div class="jdu">卦義區塊發生錯誤：' + esc(e.message) + '</div>');
    }
    return r;
  };
  wrapped.__gy = true;
  window.drawPro = wrapped;
  return true;
}

/* 若專業版已經解鎖過，補畫一次 */
function boot(){
  hook();
  try { append(); } catch(e){}
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
/* 保險：其他 patch 可能較晚覆寫 drawPro */
setTimeout(boot, 400);
setTimeout(boot, 1500);

/* ---------- 順手：八星磁場已建置，從「尚未建置」移除 ---------- */
setTimeout(function(){
  var ul = document.querySelector('.todo .tlist');
  if (!ul) return;
  [].slice.call(ul.querySelectorAll('li')).forEach(function(li){
    var b = li.querySelector('b');
    if (b && b.textContent.indexOf('八星磁場') >= 0) li.parentNode.removeChild(li);
  });
}, 300);

})();
