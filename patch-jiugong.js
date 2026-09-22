/* ============================================================
   patch-jiugong.js　奇門手機號碼預測盤（手機號後七碼倒填）
   規則不變；2026-09-16 僅升級五行配色、層次與手機辨識度
   ============================================================ */
(function () {
'use strict';

var SEQ = ['bl','ml','br','mr','tl','tr','c'];
var CELL = {
  tl:{lo:4, name:'巽四宮', wx:'木'},
  tc:{lo:9, name:'離九宮', wx:'火', off:true},
  tr:{lo:2, name:'坤二宮', wx:'土'},
  ml:{lo:3, name:'震三宮', wx:'木'},
  c :{lo:5, name:'中五宮', wx:'土'},
  mr:{lo:7, name:'兌七宮', wx:'金'},
  bl:{lo:8, name:'艮八宮', wx:'土'},
  bc:{lo:1, name:'坎一宮', wx:'水', off:true},
  br:{lo:6, name:'乾六宮', wx:'金'}
};

var CSS = [
  '.jg-in{display:flex;gap:10px;margin-bottom:16px}',
  '.jg-in input{flex:1;height:48px;padding:0 14px;border:1px solid #b99a6b;border-radius:12px;background:linear-gradient(180deg,#fffefb,#fff8ef);font-size:17px;letter-spacing:.08em;box-shadow:inset 0 1px 0 #fff,0 4px 14px rgba(91,56,18,.09)}',
  '.jg-in button{min-width:92px;height:48px;border:1px solid #d0a84f;border-radius:24px;background:linear-gradient(135deg,#9b007d,#d000b8 55%,#7d006e);color:#fff;font-family:var(--ser,serif);font-size:15px;font-weight:800;letter-spacing:.14em;cursor:pointer;box-shadow:0 7px 18px rgba(151,0,126,.25),inset 0 1px 0 rgba(255,255,255,.3)}',
  '.jg-err{min-height:1.4em;margin-bottom:10px;color:#a12626;font-size:13px}',
  '.jg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:8px;background:linear-gradient(145deg,#fffdf8,#f8eddf);border:1px solid #d5b77a;border-radius:17px;box-shadow:0 10px 28px rgba(92,55,20,.12),inset 0 0 0 1px rgba(255,255,255,.9)}',
  '.jg-c{position:relative;padding:10px 4px;text-align:center;min-height:90px;border:1px solid rgba(129,91,37,.24);border-radius:13px;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.78),0 4px 11px rgba(61,42,19,.10)}',
  '.jg-c:after{content:"";position:absolute;inset:4px;border:1px solid rgba(255,255,255,.62);border-radius:9px;pointer-events:none}',
  '.jg-c .jg-n{position:relative;z-index:1;font-family:Arial,sans-serif;font-size:40px;font-weight:900;line-height:1;color:#203b36;text-shadow:0 1px 0 rgba(255,255,255,.8),0 2px 5px rgba(0,0,0,.08)}',
  '.jg-c.jg-mu{background:linear-gradient(145deg,#c9f5dc,#78d8a5 58%,#b8efd1);border-color:#55b985}',
  '.jg-c.jg-huo{background:linear-gradient(145deg,#ffd2d9,#ff8fa2 58%,#ffc0ca);border-color:#e56f83}',
  '.jg-c.jg-tu{background:linear-gradient(145deg,#fff0b7,#f4c85f 58%,#ffe5a0);border-color:#d3a53b}',
  '.jg-c.jg-jin{background:linear-gradient(145deg,#f8f4ff,#d9d5ee 58%,#eee9fa);border-color:#b9b0d0}',
  '.jg-c.jg-shui{background:linear-gradient(145deg,#cdeeff,#7cc7ee 58%,#b7e3fa);border-color:#62afd8}',
  '.jg-c.jg-off{opacity:.58;filter:saturate(.72)}',
  '.jg-c.jg-off .jg-n{display:none}',
  '.jg-c.jg-mid{background:linear-gradient(145deg,#176f61,#07594f 55%,#0c433d);border:2px solid #d9b85d;box-shadow:inset 0 0 0 2px rgba(255,224,138,.28),0 7px 17px rgba(4,74,64,.30)}',
  '.jg-c.jg-mid:after{border-color:rgba(255,225,139,.42)}',
  '.jg-c.jg-mid .jg-n{color:#fffdf4;font-size:42px;text-shadow:0 2px 6px rgba(0,0,0,.28)}',
  '.jg-note{margin-top:12px;font-size:12px;color:#75655b;line-height:1.8}',
  '.jg-star-card{margin-top:24px;padding:17px 12px 15px;border:1px solid #d5b77a;border-radius:17px;background:linear-gradient(180deg,#fffefa,#fbf3e7);box-shadow:0 10px 28px rgba(76,58,34,.09)}',
  '.jg-star-title{text-align:center;margin:0 0 12px;color:#6f2164;font-family:var(--ser,serif);font-size:17px;font-weight:800;letter-spacing:.12em}',
  '.jg-axis{text-align:center;color:#765a2b;font-size:14px;font-weight:900;line-height:1.5}',
  '.jg-star-row{display:grid;grid-template-columns:22px minmax(0,1fr) 22px;align-items:center;gap:5px}',
  '.jg-axis-side{writing-mode:vertical-rl;text-orientation:upright;letter-spacing:.1em}',
  '.jg-star-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;background:transparent}',
  '.jg-star-cell{position:relative;min-height:77px;display:flex;align-items:center;justify-content:center;padding:16px 3px 8px;border:1px solid rgba(129,91,37,.25);border-radius:11px;color:#253f3a;text-align:center;font-family:var(--ser,serif);font-size:15px;font-weight:900;text-shadow:0 1px 0 rgba(255,255,255,.8);box-shadow:inset 0 1px 0 rgba(255,255,255,.75),0 3px 9px rgba(61,42,19,.08)}',
  '.jg-star-cell.jg-mu{background:linear-gradient(145deg,#d5f7e3,#8bdcaf);border-color:#62bd8c}',
  '.jg-star-cell.jg-huo{background:linear-gradient(145deg,#ffdbe0,#ff9cad);border-color:#e97e91}',
  '.jg-star-cell.jg-tu{background:linear-gradient(145deg,#fff1bd,#f3cd70);border-color:#d6ad4c}',
  '.jg-star-cell.jg-jin{background:linear-gradient(145deg,#faf7ff,#ddd9ee);border-color:#bbb3d0}',
  '.jg-star-cell.jg-shui{background:linear-gradient(145deg,#d8f2ff,#8dceed);border-color:#6cb3d6}',
  '.jg-star-cell em{position:absolute;right:7px;top:4px;color:#8a5d0d;font-family:Arial,sans-serif;font-size:17px;font-style:normal;font-weight:900;text-shadow:0 1px 0 rgba(255,255,255,.85)}',
  '.jg-star-note{margin:10px 0 0;text-align:center;color:#7b6a5f;font-size:11px;letter-spacing:.06em}',
  '@media(max-width:390px){.jg-grid{gap:7px;padding:7px}.jg-c{min-height:84px}.jg-c .jg-n{font-size:38px}.jg-c.jg-mid .jg-n{font-size:40px}.jg-star-card{padding-left:8px;padding-right:8px}.jg-star-row{grid-template-columns:18px minmax(0,1fr) 18px;gap:3px}.jg-star-cell{min-height:70px;font-size:13px}.jg-star-cell em{right:5px;font-size:14px}}'
].join('');

function css(){
  if (document.getElementById('jg-css')) return;
  var s = document.createElement('style');
  s.id = 'jg-css';
  s.appendChild(document.createTextNode(CSS));
  document.head.appendChild(s);
}

function compute(raw){
  var d = String(raw || '').replace(/\D/g, '');
  if (d.length < 7) return null;
  var last7 = d.slice(-7);
  var rev = last7.split('').reverse();
  var out = {};
  for (var i = 0; i < SEQ.length; i++) out[SEQ[i]] = { n: rev[i], ord: i + 1 };
  return { digits: d, last7: last7, cells: out };
}

function wxClass(wx){
  return {木:'jg-mu',火:'jg-huo',土:'jg-tu',金:'jg-jin',水:'jg-shui'}[wx] || 'jg-tu';
}

function cellHTML(key, r){
  var info = CELL[key];
  var hit = r.cells[key];
  var cls = 'jg-c ' + wxClass(info.wx);
  if (info.off) cls += ' jg-off';
  if (key === 'c') cls += ' jg-mid';
  var body = hit ? ('<div class="jg-n">' + hit.n + '</div>') : '';
  return '<div class="' + cls + '" aria-label="' + info.name + '">' + body + '</div>';
}

function gridHTML(r){
  var order = ['tl','tc','tr','ml','c','mr','bl','bc','br'], h = '';
  for (var i = 0; i < order.length; i++) h += cellHTML(order[i], r);
  return '<div class="jg-grid">' + h + '</div>';
}

function render(raw){
  var box = document.getElementById('jg-out');
  var err = document.getElementById('jg-err');
  if (!box || !err) return;
  var r = compute(raw);
  if (!r){ err.textContent = '請輸入至少七位數字。'; box.innerHTML = ''; return; }
  err.textContent = '';
  box.innerHTML = gridHTML(r) + '<p class="jg-note">末七碼 <b>' + r.last7 + '</b>，自最後一碼倒填，順序為 左下 → 左中 → 右下 → 右中 → 左上 → 右上 → 中宮。第七碼落中宮。離九、坎一兩宮不用。</p>';
}

function starTable(){
  var stars = [['天輔星',4],['天英星',9],['天芮星',2],['天沖星',3],['天禽星',5],['天柱星',7],['天任星',8],['天蓬星',1],['天心星',6]];
  var cells = '';
  for (var i = 0; i < stars.length; i++){
    var info = null;
    for (var key in CELL){ if (CELL[key].lo === stars[i][1]) { info = CELL[key]; break; } }
    cells += '<div class="jg-star-cell ' + wxClass(info ? info.wx : '土') + '"><span>' + stars[i][0] + '</span><em>' + stars[i][1] + '</em></div>';
  }
  return '<section class="jg-star-card" aria-label="九宮九星對照表"><h3 class="jg-star-title">九宮九星對照表</h3><div class="jg-axis">南</div><div class="jg-star-row"><div class="jg-axis jg-axis-side">東</div><div class="jg-star-grid">' + cells + '</div><div class="jg-axis jg-axis-side">西</div></div><div class="jg-axis">北</div><p class="jg-star-note">固定九宮星位 · 南上北下 · 東左西右</p></section>';
}

function panel(){
  css();
  return '<div class="jg-in"><input id="jg-ph" type="tel" inputmode="numeric" placeholder="輸入手機號碼" autocomplete="off"><button id="jg-go" type="button">起 盤</button></div><div class="jg-err" id="jg-err"></div><div id="jg-out"></div>' + starTable();
}

document.addEventListener('click', function(e){
  var t=e.target;if(!t)return;var btn=t.id==='jg-go'?t:(t.closest?t.closest('#jg-go'):null);if(!btn)return;e.preventDefault();var inp=document.getElementById('jg-ph');render(inp?inp.value:'');
});
document.addEventListener('keydown', function(e){
  if(e.key!=='Enter')return;var t=e.target;if(!t||t.id!=='jg-ph')return;e.preventDefault();render(t.value);
});
function boot(){
  if(!window.PP||typeof window.PP.addStatic!=='function')return false;if(window.__jgAdded)return true;window.__jgAdded=true;window.PP.addStatic('奇 門 手 機 號 碼 預 測 盤',panel);return true;
}
var tries=0;(function wait(){if(boot())return;if(++tries<60)setTimeout(wait,200);})();
})();