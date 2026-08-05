/* ============================================================
   patch-zhu.js　先天後天表：數字中間標磁場
   ------------------------------------------------------------
   老師要求卦象要看得出來：兩個數字之間留空，中間標八星磁場。
   本檔改寫「先 天 · 後 天」那張表，不動其他任何區塊。

   放在 index.html 最後面：
     <script src="patch-zhu.js"></script>

   磁場規則與 patch-bx.js／bxcc.html 一致：
   數字 → 地支 → 八卦 → 八宅遊年。
   ============================================================ */
(function(){
'use strict';

var ZHI = ['','子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
var GUA = ['','坎','艮','艮','震','巽','巽','離','坤','坤','兌','乾','乾'];

var GROUPS = {
  '生氣':[['乾','兌'],['坤','艮'],['離','震'],['坎','巽']],
  '天醫':[['乾','艮'],['坤','兌'],['震','坎'],['巽','離']],
  '延年':[['乾','坤'],['艮','兌'],['震','巽'],['坎','離']],
  '絕命':[['乾','離'],['坤','坎'],['艮','震'],['兌','巽']],
  '五鬼':[['乾','震'],['坤','巽'],['艮','坎'],['兌','離']],
  '六煞':[['乾','坎'],['坤','離'],['艮','巽'],['兌','震']],
  '禍害':[['乾','巽'],['坤','震'],['艮','離'],['兌','坎']]
};
var JI = {'生氣':1,'天醫':1,'延年':1,'伏位':1};
var Y = {};
(function(){
  ['乾','坤','艮','兌','坎','離','震','巽'].forEach(function(g){ Y[g+g] = '伏位'; });
  Object.keys(GROUPS).forEach(function(name){
    GROUPS[name].forEach(function(p){
      Y[p[0]+p[1]] = name;
      Y[p[1]+p[0]] = name;
    });
  });
})();

function star(a, b){
  var ga = GUA[a], gb = GUA[b];
  if (!ga || !gb) return null;
  return Y[ga + gb] || null;
}

/* 爻線，由上而下：1 陽（整條）、0 陰（中斷） */
var YAO = {
  '乾':'111', '兌':'011', '離':'101', '震':'001',
  '巽':'110', '坎':'010', '艮':'100', '坤':'000'
};

function tri(n){
  var g = GUA[n];
  if (!g) return '';
  var y = YAO[g], h = '';
  for (var i = 0; i < 3; i++){
    h += y.charAt(i) === '1'
      ? '<span><b></b></span>'
      : '<span><b></b><b></b></span>';
  }
  return '<em class="zh-t">' + h + '</em>';
}

var CSS =
'#tp.zhu{table-layout:auto}' +
'#tp.zhu th,#tp.zhu td{padding:9px 2px}' +
'#tp.zhu td.zh-n{font-family:var(--ser,serif);font-size:19px;font-weight:700;' +
  'color:#5d2c20;white-space:nowrap;line-height:1.25}' +
'#tp.zhu td.zh-s{font-family:var(--ser,serif);font-size:11px;letter-spacing:.02em;' +
  'line-height:1.35;white-space:nowrap;padding:9px 1px;vertical-align:middle}' +
'#tp.zhu td.zh-s.ji{color:#2f6b4f}' +
'#tp.zhu td.zh-s.xiong{color:var(--zhu,#7d1d1d)}' +
'#tp.zhu th.zh-lab{font-size:11px;letter-spacing:0}' +
'#tp.zhu td.zh-row{font-size:12px;color:#75553c;white-space:nowrap}' +
/* 八卦符號：CSS 畫爻線，不用 Unicode 卦符 */
'.zh-t{display:flex;flex-direction:column;gap:2.5px;width:22px;margin:4px auto 0}' +
'.zh-t span{display:flex;gap:3px;height:3px}' +
'.zh-t span b{flex:1;background:#8a6a4a;border-radius:1px}' +
'.zh-note{margin-top:12px;font-size:12px;color:#85776c;line-height:1.8}' +
'.zh-note b{color:#2f6b4f;font-weight:400}' +
'.zh-note i{color:var(--zhu,#7d1d1d);font-style:normal}';

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

  /* 第一列：柱名，磁場欄留空 */
  var h = '<tr><th class="zh-lab"></th>';
  for (var i = 0; i < n; i++){
    h += '<th class="zh-lab">' + (lab[i] || '') + '</th>';
    if (i < n - 1) h += '<th class="zh-lab"></th>';
  }
  h += '</tr>';

  /* 先天、後天各一列，數字之間夾磁場 */
  [['先天', r], ['後天', post]].forEach(function(row){
    var name = row[0], arr = row[1];
    h += '<tr><td class="zh-row">' + name + '</td>';
    for (var i = 0; i < arr.length; i++){
      h += '<td class="zh-n">' + arr[i] + tri(arr[i]) + '</td>';
      if (i < arr.length - 1){
        var s = star(arr[i], arr[i + 1]);
        h += '<td class="zh-s ' + (s ? (JI[s] ? 'ji' : 'xiong') : '') + '">'
           + (s || '') + '</td>';
      }
    }
    h += '</tr>';
  });

  tp.className = 'zhu';
  tp.innerHTML = h;

  /* 表格下方補一行說明 */
  var box = tp.parentNode;
  if (box && !box.querySelector('.zh-note')){
    var p = document.createElement('p');
    p.className = 'zh-note';
    p.innerHTML = '數字下方為該數所配八卦（數轉地支、地支配卦）。'
                + '磁場標在兩數之間，即該兩數所成之卦。'
                + '<b>綠為四吉</b>：生氣、天醫、延年、伏位；'
                + '<i>紅為四凶</i>：絕命、五鬼、六煞、禍害。';
    box.appendChild(p);
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
