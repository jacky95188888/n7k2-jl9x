/* ============================================================
   patch-jiugong.js  ·  奇門數字九宮盤（老師的排法）
   ------------------------------------------------------------
   index.html 加一行（放在 patch-qimen.js 下面）：
     <script src="patch-jiugong.js"></script>

   這是老師自己的排盤法，與「奇門手機號論斷」那支不同：
   那支是一碼對一個角色（宮位／引干／八神／九星／八門／天地盤干），
   這支是把數字直接填進九宮格。

   ── 規則（老師 2026-08-09 口述＋手稿）────────────────
   1. 取手機號【後七碼】
   2. 從【最後一碼】倒著往回數，得到第 1～7 順位
   3. 七個順位填進九宮格的固定位置：
        順位5  順位6   ✕
        順位2  順位7  順位4
        順位1  順位3   ✕
      → 第 7 順位（也就是倒數第七碼）永遠落中宮
   4. 右上、右下兩格不用（老師：「那格不用，奇門數字只跑 7 個數字」）

   以 0921725239 驗算，七格與老師手稿完全相符。
   ============================================================ */
(function () {
'use strict';

/* 順位 → 九宮格位置索引（0=左上 … 8=右下）。位置固定不變。 */
var SLOT = { 1:6, 2:3, 3:7, 4:5, 5:0, 6:1, 7:4 };

/* 九宮格各位置的宮名（後天八卦方位） */
var PALACE = ['巽四宮','離九宮','坤二宮',
              '震三宮','中五宮','兌七宮',
              '艮八宮','坎一宮','乾六宮'];
var DIR    = ['東南','正南','西南',
              '正東','中央','正西',
              '東北','正北','西北'];

function css(){
  if (document.getElementById('jg-css')) return;
  var s = document.createElement('style');
  s.id = 'jg-css';
  s.appendChild(document.createTextNode([
    '.jg-note{font-size:12px;color:#8f8069;line-height:1.8;margin:0 0 12px}',
    '.jg-in{display:flex;gap:8px;margin:0 0 14px}',
    '.jg-in input{flex:1;min-width:0;font-family:var(--ser);font-size:20px;letter-spacing:.14em;',
      'padding:11px 12px;border:1px solid var(--line);border-radius:2px;background:#fff;color:#241f1c}',
    '.jg-in input:focus{outline:2px solid var(--gold);outline-offset:1px;border-color:var(--gold)}',
    '.jg-in button{font-family:var(--ser);font-size:16px;font-weight:600;letter-spacing:.14em;',
      'padding:11px 18px;border:none;border-radius:2px;background:var(--zhu);color:#f7f3ea;cursor:pointer}',
    '.jg-err{color:var(--zhu);font-size:13px;margin:0 0 10px;min-height:18px}',
    /* 九宮格 */
    '.jg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--line);',
      'border:1px solid var(--line);border-radius:3px;overflow:hidden}',
    '.jg-c{background:#fffefb;min-height:92px;display:flex;flex-direction:column;',
      'align-items:center;justify-content:center;padding:8px 4px;position:relative}',
    '.jg-c .p{font-size:10px;letter-spacing:.1em;color:#a08d72;margin-bottom:3px}',
    '.jg-c .n{font-family:var(--ser);font-size:34px;font-weight:700;color:#5d2c20;line-height:1}',
    '.jg-c .o{font-size:11px;color:#8a7a64;letter-spacing:.06em;margin-top:5px}',
    '.jg-c.mid{background:#f7efe2;box-shadow:inset 0 0 0 2px var(--gold)}',
    '.jg-c.mid .n{color:var(--zhu)}',
    '.jg-c.off{background:#f2ece0}',
    '.jg-c.off .x{font-size:20px;color:#c9bda6}',
    '.jg-c.off .p{color:#c0b39c}',
    '.jg-seq{margin:12px 0 0;font-size:13px;color:#5b5147;line-height:2}',
    '.jg-seq b{color:var(--zhu);font-weight:600}',
    '.jg-seq span{display:inline-block;margin-right:10px;white-space:nowrap}',
    '@media (max-width:380px){.jg-c{min-height:80px}.jg-c .n{font-size:28px}}'
  ].join('')));
  document.head.appendChild(s);
}

function view(){
  return ''+
  '<p class="jg-note">取手機號後七碼，自最後一碼倒數填入九宮，倒數第七碼落中宮。'+
  '右上、右下兩格不用，奇門數字只跑七個數字。號碼僅在本機換算，不上傳、不留存。</p>'+
  '<div class="jg-in">'+
    '<input type="tel" id="jgNum" inputmode="numeric" maxlength="11" placeholder="0921725239" autocomplete="off">'+
    '<button type="button" id="jgGo">排 盤</button>'+
  '</div>'+
  '<p class="jg-err" id="jgErr"></p>'+
  '<div id="jgOut" style="display:none">'+
    '<div class="jg-grid" id="jgGrid"></div>'+
    '<p class="jg-seq" id="jgSeq"></p>'+
  '</div>';
}

function run(){
  var el = function(i){ return document.getElementById(i); };
  var v = (el('jgNum').value || '').replace(/\D/g, '');
  if (v.length < 7){
    el('jgErr').textContent = '請輸入手機號碼，至少要有七碼。';
    el('jgOut').style.display = 'none';
    return;
  }
  el('jgErr').textContent = '';

  var last7 = v.slice(-7);                 /* 後七碼 */
  var rev = last7.split('').reverse();     /* 由最後一碼倒數 */

  var cell = ['','','','','','','','',''];
  for (var i = 1; i <= 7; i++) cell[SLOT[i]] = { n: rev[i-1], o: i };

  var h = '';
  for (var k = 0; k < 9; k++){
    var c = cell[k];
    if (!c){
      h += '<div class="jg-c off"><span class="p">' + PALACE[k] + '</span>' +
           '<span class="x">✕</span><span class="o">不用</span></div>';
    } else {
      h += '<div class="jg-c' + (k === 4 ? ' mid' : '') + '">' +
           '<span class="p">' + PALACE[k] + '　' + DIR[k] + '</span>' +
           '<span class="n">' + c.n + '</span>' +
           '<span class="o">第 ' + c.o + '　倒數第 ' + c.o + ' 碼</span></div>';
    }
  }
  document.getElementById('jgGrid').innerHTML = h;

  var s = '<b>後七碼</b>　' + last7 + '<br><b>倒數順序</b>　';
  for (i = 0; i < 7; i++){
    s += '<span>' + (i+1) + '：' + rev[i] + (i === 6 ? '（中宮）' : '') + '</span>';
  }
  document.getElementById('jgSeq').innerHTML = s;

  el('jgOut').style.display = 'block';
}

document.addEventListener('click', function(e){
  var t = e.target;
  if (t && t.id === 'jgGo'){ e.preventDefault(); run(); }
});
document.addEventListener('keydown', function(e){
  if (e.key === 'Enter' && e.target && e.target.id === 'jgNum'){ e.preventDefault(); run(); }
});

css();
if (window.PP && typeof PP.addStatic === 'function'){
  PP.addStatic('奇門數字九宮盤', function(){ return view(); });
} else if (window.PP && typeof PP.add === 'function'){
  PP.add('奇門數字九宮盤', function(){ return view(); });
} else {
  console.warn('[patch-jiugong] 找不到 PP，模組待掛載');
  window.JGVIEW = view;
}

})();
