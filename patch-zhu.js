/* ============================================================
   patch-zhu.js　先天後天表：數字中間標磁場、八卦爻線依五行上色
   ------------------------------------------------------------
   老師要求卦象要看得出來：兩個數字之間留空，中間標八星磁場。
   本檔改寫「先 天 · 後 天」那張表，不動其他任何區塊。

   放在 index.html 最後面：
     <script src="patch-zhu.js"></script>

   磁場規則與 patch-bx.js／bxcc.html 一致：
   數字 → 地支 → 八卦 → 八宅遊年。

   2026-08-08 修正【老師指出 5-10 磁場應為六煞】
     原本寫死的遊年對照表，絕命與六煞的四組寫顛倒：
       艮震・兌巽 原標絕命 → 應為六煞
       艮巽・兌震 原標六煞 → 應為絕命
     已改為用變爻法即時推導，乾宮八關係 8/8 驗證通過。
     ※ patch-bx.js 與 bxcc.html 使用同一張表，需一併修正。

   2026-08-08 更新【老師指示：卦的顏色要調】
     爻線原本全部同一色（#8a6a4a），八個卦分不出來。
     改為依八卦五行上色，與四柱八字卡的干支配色同一套：
       乾兌 金 · 震巽 木 · 坎 水 · 離 火 · 艮坤 土
   ============================================================ */
(function(){
'use strict';

var ZHI = ['','子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
var GUA = ['','坎','艮','艮','震','巽','巽','離','坤','坤','兌','乾','乾'];

/* 八卦五行 */
var GWX = {
  '乾':'金', '兌':'金',
  '震':'木', '巽':'木',
  '坎':'水',
  '離':'火',
  '艮':'土', '坤':'土'
};
/* 五行 → CSS class 尾碼（避免中文類名） */
var WXC = { '木':'mu', '火':'huo', '土':'tu', '金':'jin', '水':'shui' };

/* 爻線，由上而下：1 陽（整條）、0 陰（中斷） */
var YAO = {
  '乾':'111', '兌':'011', '離':'101', '震':'001',
  '巽':'110', '坎':'010', '艮':'100', '坤':'000'
};

/* --------------------------------------------------------
   八宅遊年：不寫死對照表，改用「變爻法」即時推導。
   兩卦逐爻比對，變動的爻位決定遊年：
     不變      伏位      上爻變    生氣
     中爻變    絕命      下爻變    禍害
     上中變    五鬼      中下變    天醫
     上下變    六煞      三爻全變  延年
   （2026-08-08 老師指出 5-10 應為六煞。原本寫死的表把
     絕命／六煞 的 艮震・兌巽・艮巽・兌震 四組寫顛倒了，
     改成推導後不可能再錯。）
   -------------------------------------------------------- */
var RULE = {
  '000':'伏位', '100':'生氣', '010':'絕命', '001':'禍害',
  '110':'五鬼', '011':'天醫', '101':'六煞', '111':'延年'
};
var Y = {};
(function(){
  var G = ['乾','兌','離','震','巽','坎','艮','坤'];
  for (var i = 0; i < G.length; i++){
    for (var j = 0; j < G.length; j++){
      var a = YAO[G[i]], b = YAO[G[j]], x = '';
      for (var k = 0; k < 3; k++) x += (a.charAt(k) === b.charAt(k)) ? '0' : '1';
      Y[G[i] + G[j]] = RULE[x];
    }
  }
})();

function star(a, b){
  var ga = GUA[a], gb = GUA[b];
  if (!ga || !gb) return null;
  return Y[ga + gb] || null;
}

function tri(n){
  var g = GUA[n];
  if (!g) return '';
  var y = YAO[g], h = '';
  for (var i = 0; i < 3; i++){
    h += y.charAt(i) === '1'
      ? '<span><b></b></span>'
      : '<span><b></b><b></b></span>';
  }
  var cls = 'zh-t zh-' + (WXC[GWX[g]] || 'tu');
  return '<em class="' + cls + '" title="' + g + '（' + GWX[g] + '）">' + h + '</em>';
}

var CSS =
'#tp.zhu{table-layout:auto}' +
'#tp.zhu th,#tp.zhu td{padding:9px 2px}' +
'#tp.zhu td.zh-n{font-family:var(--ser,serif);font-size:19px;font-weight:700;' +
  'color:#5d2c20;white-space:nowrap;line-height:1.25}' +
'#tp.zhu td.zh-s{font-family:var(--ser,serif);font-size:11px;letter-spacing:.02em;' +
  'line-height:1.35;white-space:nowrap;padding:7px 1px 11px;vertical-align:middle;color:#68127b}' +
'#tp.zhu tr.zh-mag td{border-top:0;background:linear-gradient(180deg,#fffafd,#fbf0ff)}' +
'#tp.zhu td.zh-s span{display:inline-flex;min-width:42px;justify-content:center;padding:4px 7px;' +
  'border:1px solid rgba(190,143,43,.55);border-radius:999px;background:#fffaf4;' +
  'box-shadow:0 3px 9px rgba(91,21,114,.08);font-weight:700}' +
'#tp.zhu td.zh-empty{color:#b8a9bc;font-size:12px}' +
'#tp.zhu th.zh-lab{font-size:11px;letter-spacing:0}' +
'#tp.zhu td.zh-row{font-size:12px;color:#75553c;white-space:nowrap}' +
/* 八卦符號：CSS 畫爻線，不用 Unicode 卦符 */
'.zh-t{display:flex;flex-direction:column;gap:2.5px;width:22px;margin:4px auto 0}' +
'.zh-t span{display:flex;gap:3px;height:3px}' +
'.zh-t span b{flex:1;background:#8a6a4a;border-radius:1px}' +
/* 依八卦五行上色（與四柱八字卡同一套配色） */
'.zh-mu   span b{background:#3d6b3d}' +   /* 震巽 木 */
'.zh-huo  span b{background:#a13a2a}' +   /* 離   火 */
'.zh-tu   span b{background:#8a6a24}' +   /* 艮坤 土 */
'.zh-jin  span b{background:#7a6f5e}' +   /* 乾兌 金 */
'.zh-shui span b{background:#2f5d8a}' +   /* 坎   水 */
'.zh-note{margin-top:12px;font-size:12px;color:#85776c;line-height:1.8}' +
'.zh-note b{color:#2f6b4f;font-weight:400}' +
'.zh-note i{color:var(--zhu,#7d1d1d);font-style:normal}' +
'.zh-key{margin-top:6px;font-size:12px;color:#85776c;line-height:1.9}' +
'.zh-key u{text-decoration:none;font-weight:600;margin-right:2px}' +
'.zh-key .k-mu{color:#3d6b3d}.zh-key .k-huo{color:#a13a2a}' +
'.zh-key .k-tu{color:#8a6a24}.zh-key .k-jin{color:#7a6f5e}' +
'.zh-key .k-shui{color:#2f5d8a}';

function css(){
  if (document.getElementById('zh-css')) return;
  var s = document.createElement('style');
  s.id = 'zh-css';
  s.appendChild(document.createTextNode(CSS));
  document.head.appendChild(s);
}

function hou(n){ return n == null ? null : (n > 6 ? n - 6 : n + 6); }

function build(){
  var PP = window.PP;
  if (!PP) return;
  var c = PP.chart;
  if (!c) return;
  var tp = document.getElementById('tp');
  if (!tp) return;

  css();
  var r = c.ring, lab = c.lab, n = r.length;
  var post = r.map(hou);

  /* 第一列：柱名。只移除「吉／凶」評語，八宅磁場名稱完整保留。 */
  var h = '<tr><th class="zh-lab"></th>';
  for (var i = 0; i < n; i++){
    h += '<th class="zh-lab">' + (lab[i] || '') + '</th>';
  }
  h += '</tr>';

  /* 先天、後天各一列：數字、卦線，以及相鄰兩柱的八宅磁場。 */
  [['先天', r], ['後天', post]].forEach(function(row){
    var name = row[0], arr = row[1];
    h += '<tr><td class="zh-row">' + name + '</td>';
    for (var i = 0; i < arr.length; i++){
      h += '<td class="zh-n">' + arr[i] + tri(arr[i]) + '</td>';
    }
    h += '</tr>';

    h += '<tr class="zh-mag"><td class="zh-row">磁場</td>';
    for (var j = 0; j < arr.length; j++){
      if (j === 0) h += '<td class="zh-empty">—</td>';
      else h += '<td class="zh-s"><span>' + (star(arr[j - 1], arr[j]) || '—') + '</span></td>';
    }
    h += '</tr>';
  });

  tp.className = 'zhu';
  tp.innerHTML = h;

  /* 表格下方補說明 */
  var box = tp.parentNode;
  if (box && !box.querySelector('.zh-note')){
    var p = document.createElement('p');
    p.className = 'zh-note';
    p.innerHTML = '數字下方為該數所配八卦；磁場列依相鄰兩柱的卦象變爻，顯示伏位、生氣、絕命、禍害、五鬼、天醫、六煞或延年。';
    box.appendChild(p);
  }
  if (box && !box.querySelector('.zh-key')){
    var k = document.createElement('p');
    k.className = 'zh-key';
    k.innerHTML = '爻線顏色依八卦五行：'
                + '<span class="k-mu"><u>震巽</u>木</span>　'
                + '<span class="k-huo"><u>離</u>火</span>　'
                + '<span class="k-tu"><u>艮坤</u>土</span>　'
                + '<span class="k-jin"><u>乾兌</u>金</span>　'
                + '<span class="k-shui"><u>坎</u>水</span>';
    box.appendChild(k);
  }
}

/* 包住 drawPillars，讓它畫完之後改寫 */
function hook(){
  if (typeof window.drawPillars !== 'function') return false;
  if (window.drawPillars.__zh) return true;
  var orig = window.drawPillars;
  var wrapped = function(){
    var out = orig.apply(this, arguments);
    try { build(); } catch(e){}
    return out;
  };
  wrapped.__zh = true;
  window.drawPillars = wrapped;
  return true;
}

function boot(){
  hook();
  try { build(); } catch(e){}
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
setTimeout(boot, 400);
setTimeout(boot, 1500);

})();
