/* ============================================================
   patch-jiugong.js　數字九宮盤（手機號後七碼倒填）
   ------------------------------------------------------------
   老師 8/9 說明 ＋ 8/10 標註順序圖，規則已驗證：

     取號碼末七碼，從【最後一碼】開始倒著填，
     落格順序固定為：
       1 左下(艮八)  2 左中(震三)  3 右下(乾六)
       4 右中(兌七)  5 左上(巽四)  6 右上(坤二)
       7 中宮(中五)
     上中（離九）、下中（坎一）不用 —— 老師：「那格不用」。
     老師：「第七碼永遠是中宮」＝倒數第七碼落中宮，吻合。

   老師確認：九宮格內只列數字，不顯示宮名國字。

   驗證例：0921725239，末七碼 1725239
       2  ·  7
       3  1  5
       9  ·  2
   與老師手稿完全一致。

   index.html 放在 patch-qimen.js 附近即可：
     <script src="patch-jiugong.js"></script>
   ============================================================ */
(function () {
'use strict';

/* 落格順序（第 1 個填到第 7 個） */
var SEQ = ['bl','ml','br','mr','tl','tr','c'];

/* 九宮位置資訊：洛書數、宮名、五行 */
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
  '.jg-in input{flex:1;height:48px;padding:0 14px;border:1px solid #cbb99a;',
    'border-radius:12px;background:linear-gradient(180deg,#fffefa,#faf6ee);font-size:17px;letter-spacing:.08em;',
    'box-shadow:inset 0 1px 0 rgba(255,255,255,.95),0 3px 10px rgba(88,67,39,.06)}',
  '.jg-in button{min-width:92px;height:48px;border:1px solid #9f874f;border-radius:24px;',
    'background:linear-gradient(145deg,#2f6d5f,#1e5148);color:#fffaf0;font-family:var(--ser,serif);',
    'font-size:15px;letter-spacing:.14em;cursor:pointer;box-shadow:0 4px 12px rgba(31,81,72,.18),inset 0 0 0 1px rgba(229,205,143,.26)}',
  '.jg-err{min-height:1.4em;margin-bottom:10px;color:#a12626;font-size:13px}',
  '.jg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;padding:7px;',
    'background:linear-gradient(180deg,rgba(255,253,247,.95),rgba(247,242,232,.92));border:1px solid #d7c7a8;border-radius:15px;',
    'box-shadow:0 8px 24px rgba(76,58,34,.08),inset 0 0 0 1px rgba(255,255,255,.76)}',
  '.jg-c{position:relative;padding:10px 4px;text-align:center;min-height:88px;border:1px solid rgba(188,164,116,.48);border-radius:11px;',
    'display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.92),0 2px 8px rgba(71,57,37,.045)}',
  '.jg-c:after{content:"";position:absolute;inset:4px;border:1px solid rgba(255,255,255,.7);border-radius:8px;pointer-events:none}',
  '.jg-c .jg-n{position:relative;z-index:1;font-family:Arial,sans-serif;font-size:38px;font-weight:900;',
    'line-height:1;color:#2b4942;text-shadow:0 1px 0 rgba(255,255,255,.9)}',
  '.jg-c.jg-mu{background:linear-gradient(145deg,#f4fbf7,#e4f1ea)}',
  '.jg-c.jg-huo{background:linear-gradient(145deg,#fff7f8,#f5e8ec)}',
  '.jg-c.jg-tu{background:linear-gradient(145deg,#fffaf0,#f2e8ce)}',
  '.jg-c.jg-jin{background:linear-gradient(145deg,#f8f9fb,#e9edf3)}',
  '.jg-c.jg-shui{background:linear-gradient(145deg,#f5f9fc,#e4eef5)}',
  '.jg-c.jg-off{filter:none;opacity:.9}',
  '.jg-c.jg-off .jg-n{display:none}',
  '.jg-c.jg-mid{background:linear-gradient(145deg,#3f7869,#245b50);border-color:#c5a95f;',
    'box-shadow:inset 0 0 0 2px rgba(229,204,135,.34),0 4px 12px rgba(39,89,78,.2)}',
  '.jg-c.jg-mid .jg-n{color:#fffaf0;text-shadow:0 2px 5px rgba(20,54,48,.28)}',
  '.jg-note{margin-top:12px;font-size:12px;color:#85776c;line-height:1.8}',
  '.jg-star-card{margin-top:24px;padding:16px 12px 14px;border:1px solid #d7c7a8;border-radius:15px;',
    'background:linear-gradient(180deg,#fffefa,#faf6ee);box-shadow:0 8px 24px rgba(76,58,34,.06)}',
  '.jg-star-title{text-align:center;margin:0 0 12px;color:#3e665c;font-family:var(--ser,serif);font-size:16px;font-weight:700;letter-spacing:.12em}',
  '.jg-axis{text-align:center;color:#6e5835;font-size:14px;font-weight:800;line-height:1.5}',
  '.jg-star-row{display:grid;grid-template-columns:22px minmax(0,1fr) 22px;align-items:center;gap:5px}',
  '.jg-axis-side{writing-mode:vertical-rl;text-orientation:upright;letter-spacing:.1em}',
  '.jg-star-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;background:transparent}',
  '.jg-star-cell{position:relative;min-height:75px;display:flex;align-items:center;justify-content:center;padding:16px 3px 8px;',
    'border:1px solid rgba(188,164,116,.46);border-radius:10px;color:#304b45;text-align:center;font-family:var(--ser,serif);font-size:15px;',
    'font-weight:800;text-shadow:0 1px 0 rgba(255,255,255,.85);box-shadow:inset 0 1px 0 rgba(255,255,255,.9)}',
  '.jg-star-cell.jg-mu{background:linear-gradient(145deg,#f4fbf7,#e4f1ea)}',
  '.jg-star-cell.jg-huo{background:linear-gradient(145deg,#fff7f8,#f5e8ec)}',
  '.jg-star-cell.jg-tu{background:linear-gradient(145deg,#fffaf0,#f2e8ce)}',
  '.jg-star-cell.jg-jin{background:linear-gradient(145deg,#f8f9fb,#e9edf3)}',
  '.jg-star-cell.jg-shui{background:linear-gradient(145deg,#f5f9fc,#e4eef5)}',
  '.jg-star-cell em{position:absolute;right:7px;top:4px;color:#a78335;font-family:Arial,sans-serif;font-size:16px;font-style:normal;font-weight:900;',
    'text-shadow:0 1px 0 rgba(255,255,255,.9)}',
  '.jg-star-note{margin:10px 0 0;text-align:center;color:#85776c;font-size:11px;letter-spacing:.06em}',
  '@media(max-width:390px){.jg-grid{gap:6px;padding:6px}.jg-c{min-height:82px}.jg-star-card{padding-left:8px;padding-right:8px}',
    '.jg-star-row{grid-template-columns:18px minmax(0,1fr) 18px;gap:3px}.jg-star-cell{min-height:68px;font-size:13px}.jg-star-cell em{right:5px;font-size:14px}}'
].join('');

function css(){
  if (document.getElementById('jg-css')) return;
  var s = document.createElement('style');
  s.id = 'jg-css';
  s.appendChild(document.createTextNode(CSS));
  document.head.appendChild(s);
}

/* ---------- 核心：算盤 ---------- */
function compute(raw){
  var d = String(raw || '').replace(/\D/g, '');
  if (d.length < 7) return null;
  var last7 = d.slice(-7);
  var rev = last7.split('').reverse();     /* 從最後一碼開始 */
  var out = {};
  for (var i = 0; i < SEQ.length; i++){
    out[SEQ[i]] = { n: rev[i], ord: i + 1 };
  }
  return { digits: d, last7: last7, cells: out };
}

/* ---------- 畫盤 ---------- */
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
  return '<div class="' + cls + '" aria-label="' + info.name + '">' +
           body +
         '</div>';
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
  if (!r){
    err.textContent = '請輸入至少七位數字。';
    box.innerHTML = '';
    return;
  }
  err.textContent = '';
  box.innerHTML = gridHTML(r) +
    '<p class="jg-note">末七碼 <b>' + r.last7 + '</b>，' +
    '自最後一碼倒填，順序為 左下 → 左中 → 右下 → 右中 → 左上 → 右上 → 中宮。' +
    '第七碼落中宮。離九、坎一兩宮不用。</p>';
}

/* ---------- 面板 ---------- */
function starTable(){
  var stars = [
    ['天輔星',4], ['天英星',9], ['天芮星',2],
    ['天沖星',3], ['天禽星',5], ['天柱星',7],
    ['天任星',8], ['天蓬星',1], ['天心星',6]
  ];
  var cells = '';
  for (var i = 0; i < stars.length; i++){
    var info = null;
    for (var key in CELL){ if (CELL[key].lo === stars[i][1]) { info = CELL[key]; break; } }
    cells += '<div class="jg-star-cell ' + wxClass(info ? info.wx : '土') + '"><span>' + stars[i][0] + '</span><em>' + stars[i][1] + '</em></div>';
  }
  return '<section class="jg-star-card" aria-label="九宮九星對照表">' +
           '<h3 class="jg-star-title">九宮九星對照表</h3>' +
           '<div class="jg-axis">南</div>' +
           '<div class="jg-star-row">' +
             '<div class="jg-axis jg-axis-side">東</div>' +
             '<div class="jg-star-grid">' + cells + '</div>' +
             '<div class="jg-axis jg-axis-side">西</div>' +
           '</div>' +
           '<div class="jg-axis">北</div>' +
           '<p class="jg-star-note">固定九宮星位 · 南上北下 · 東左西右</p>' +
         '</section>';
}

function panel(){
  css();
  return '<div class="jg-in">' +
           '<input id="jg-ph" type="tel" inputmode="numeric" ' +
           'placeholder="輸入手機號碼" autocomplete="off">' +
           '<button id="jg-go" type="button">起 盤</button>' +
         '</div>' +
         '<div class="jg-err" id="jg-err"></div>' +
         '<div id="jg-out"></div>' +
         starTable();
}

/* 事件用委派，面板重繪也不會失效 */
document.addEventListener('click', function(e){
  var t = e.target;
  if (!t) return;
  var btn = t.id === 'jg-go' ? t : (t.closest ? t.closest('#jg-go') : null);
  if (!btn) return;
  e.preventDefault();
  var inp = document.getElementById('jg-ph');
  render(inp ? inp.value : '');
});

document.addEventListener('keydown', function(e){
  if (e.key !== 'Enter') return;
  var t = e.target;
  if (!t || t.id !== 'jg-ph') return;
  e.preventDefault();
  render(t.value);
});

function boot(){
  if (!window.PP || typeof window.PP.addStatic !== 'function') return false;
  if (window.__jgAdded) return true;
  window.__jgAdded = true;
  window.PP.addStatic('奇 門 數 字 九 宮 盤', panel);
  return true;
}

var tries = 0;
(function wait(){
  if (boot()) return;
  if (++tries < 60) setTimeout(wait, 200);
})();

})();
