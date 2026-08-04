/* ============================================================
   patch-liuqin.js　五行含量 · 陰陽斷 · 六親全覽
   ------------------------------------------------------------
   需先載入 data-liuqin.js。放在 index.html 的 patch-guayi.js 之後：
     <script src="data-liuqin.js"></script>
     <script src="patch-liuqin.js"></script>

   資料全部取自老師 Excel（wuxing / numlike / liuqin 三個分頁），
   五行含量與陰陽斷已用範例盤驗算，數值完全吻合。
   ============================================================ */
(function(){
'use strict';

var CSS =
'.lq-bar{margin:0 0 12px}' +
'.lq-bar .t{display:flex;justify-content:space-between;font-size:13px;' +
  'font-family:var(--ser,serif);color:#4d3728;margin-bottom:5px}' +
'.lq-bar .t b{font-size:15px;color:#5d2c20}' +
'.lq-track{position:relative;height:13px;background:#efe7d8;border:1px solid var(--line,#d3c6b0)}' +
'.lq-fill{position:absolute;left:0;top:0;bottom:0;background:var(--zhu,#7d1d1d)}' +
'.lq-fill.low{background:#a9a08c}' +
'.lq-ideal{position:absolute;top:-3px;bottom:-3px;width:2px;background:var(--gold,#b78c39)}' +
'.lq-legend{font-size:12px;color:#85776c;line-height:1.8;margin:14px 0 0}' +
'.lq-verdict{margin-top:16px;padding:14px;background:#fcfaf6;' +
  'border-left:4px solid var(--gold,#b78c39);font-size:14px;line-height:1.9;color:#3d3128}' +
'.lq-verdict b{color:var(--zhu,#7d1d1d);font-family:var(--ser,serif);letter-spacing:.1em}' +
'.lq-note{font-size:12px;color:#85776c;line-height:1.8;margin:0 0 14px}' +
'td.lq-x{color:#8a7f70}' +
'td.lq-me{color:var(--zhu,#7d1d1d);font-weight:700}';

function css(){
  if (document.getElementById('lq-css')) return;
  var s = document.createElement('style');
  s.id = 'lq-css';
  s.appendChild(document.createTextNode(CSS));
  document.head.appendChild(s);
}

function esc(s){
  return String(s == null ? '' : s).replace(/[&<>]/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];
  });
}

/* ---------- 五行含量 ---------- */
/* 權重欄位順序：水 金 土 木 火 */
var ORDER = [
  {k:3, name:'木', say:'曲直'},
  {k:4, name:'火', say:'炎上'},
  {k:2, name:'土', say:'承載'},
  {k:1, name:'金', say:'變革'},
  {k:0, name:'水', say:'潤下'}
];

function wuxingPanel(c){
  var D = window.JL_WUXING;
  if (!D) return '<div class="jdu">data-liuqin.js 沒有載入。</div>';

  var sum = [0, 0, 0, 0, 0];
  c.ring.forEach(function(n){
    var w = D.weight[n];
    if (!w) return;
    for (var i = 0; i < 5; i++) sum[i] = Math.round((sum[i] + w[i]) * 100) / 100;
  });
  var ideal = Math.round(sum.reduce(function(a, b){ return a + b; }, 0) / 5 * 100) / 100;
  var top = Math.max(ideal * 2, Math.max.apply(null, sum)) || 1;

  var h = '<p class="lq-note">含量由六柱先天數累加而得，金線為理想值 '
        + ideal.toFixed(1) + '。低於理想值代表該五行偏弱。</p>';

  ORDER.forEach(function(o){
    var v = sum[o.k];
    var pct = Math.min(100, v / top * 100);
    var ipct = Math.min(100, ideal / top * 100);
    h += '<div class="lq-bar">'
       +   '<div class="t"><span>' + o.name + '　<span style="font-size:11px;color:#85776c">'
       +     o.say + '</span></span><b>' + v.toFixed(1) + '</b></div>'
       +   '<div class="lq-track">'
       +     '<div class="lq-fill' + (v < ideal ? ' low' : '') + '" style="width:' + pct + '%"></div>'
       +     '<div class="lq-ideal" style="left:' + ipct + '%"></div>'
       +   '</div>'
       + '</div>';
  });

  var yang = 0;
  c.ring.forEach(function(n){
    var s = String(D.yy[n] || '');
    if (s.charAt(0) === '陽') yang++;
  });
  var yin = c.ring.length - yang;
  var key = yang + '陽' + yin + '陰';
  var say = D.verdict[key];

  h += '<div class="lq-verdict"><b>' + (c.sex || '') + '性占　' + esc(key) + '</b><br>'
     + (say ? esc(say) : '此組合對照表中沒有對應說法。') + '</div>';

  var weak = ORDER.filter(function(o){ return sum[o.k] < ideal; }).map(function(o){ return o.name; });
  if (weak.length){
    h += '<p class="lq-legend">偏弱：' + weak.join('、')
       + '。命理上多以此為補強方向，實際仍以命理師判讀為準。</p>';
  }
  return h;
}

/* ---------- 六親全覽 ---------- */
function liuqinPanel(c){
  var L = window.JL_LIUQIN;
  if (!L) return '<div class="jdu">data-liuqin.js 沒有載入。</div>';

  var me = c.slots[1];              /* 月柱＝本人 */
  var tbl = L[c.sex === '女' ? '女' : '男'];
  if (!tbl || me == null) return '';
  var row = tbl[me];
  if (!row) return '';

  /* 實數＝有出現在六柱環中；虛數＝沒出現，無天運地運 */
  var wins = c.wins, ring = c.ring;
  var first = {};
  ring.forEach(function(n, i){ if (!(n in first)) first[n] = i; });

  var h = '<p class="lq-note">以月柱 <b>' + me + '</b> 為本人。'
        + '有出現在六柱中的數字為實數卦，有卦體與天地運；'
        + '沒出現的為虛數卦，只論六親，不論天地運。</p>';

  h += '<table><tr><th>數</th><th>六親</th><th>卦類</th><th>卦體</th><th>天運</th><th>地運</th></tr>';
  for (var n = 1; n <= 12; n++){
    var real = (n in first);
    var w = real ? wins[first[n]] : null;
    var isMe = (n === me);
    h += '<tr>'
       + '<td class="n">' + n + '</td>'
       + '<td class="' + (isMe ? 'lq-me' : '') + '">' + (isMe ? '本人' : esc(row[n] || '—')) + '</td>'
       + '<td class="' + (real ? '' : 'lq-x') + '">' + (real ? '實數卦' : '虛數卦') + '</td>'
       + (real
          ? '<td class="n">' + w[0] + '-' + w[1] + '-' + w[2] + '</td>'
            + '<td>' + (w[1] - w[0]) + '</td><td>' + (w[1] - w[2]) + '</td>'
          : '<td class="lq-x">—</td><td class="lq-x">—</td><td class="lq-x">—</td>')
       + '</tr>';
  }
  h += '</table>';
  return h;
}

/* ---------- 掛載 ---------- */
function boot(){
  if (!window.PP || !window.PP.add) return false;
  if (boot.done) return true;
  boot.done = true;
  css();
  window.PP.add('陰 陽 斷', function(c){
    try { return wuxingPanel(c); }
    catch(e){ return '<div class="jdu">五行含量發生錯誤：' + esc(e.message) + '</div>'; }
  });
  window.PP.add('六 親 全 覽', function(c){
    try { return liuqinPanel(c); }
    catch(e){ return '<div class="jdu">六親全覽發生錯誤：' + esc(e.message) + '</div>'; }
  });
  return true;
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
setTimeout(boot, 500);

})();
