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
  '.jg-in input{flex:1;height:48px;padding:0 14px;border:1px solid #bda98f;',
    'border-radius:2px;background:#fffefb;font-size:17px;letter-spacing:.08em}',
  '.jg-in button{min-width:92px;height:48px;border:1px solid var(--zhu,#7d1d1d);',
    'background:var(--zhu,#7d1d1d);color:#f7f3ea;font-family:var(--ser,serif);',
    'font-size:15px;letter-spacing:.14em;cursor:pointer}',
  '.jg-err{min-height:1.4em;margin-bottom:10px;color:#a12626;font-size:13px}',
  '.jg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;',
    'background:#cdbfa7;border:1px solid #cdbfa7}',
  '.jg-c{background:#fffdf9;padding:12px 4px;text-align:center;min-height:78px;',
    'display:flex;flex-direction:column;justify-content:center}',
  '.jg-c .jg-p{font-family:var(--ser,serif);font-size:11px;letter-spacing:.06em;color:#85776c}',
  '.jg-c .jg-n{font-family:var(--ser,serif);font-size:27px;font-weight:700;',
    'line-height:1.2;color:#5d2c20;margin-top:2px}',
  '.jg-c.jg-off{background:#f3ede2}',
  '.jg-c.jg-off .jg-n{display:none}',
  '.jg-c.jg-mid{background:#f7efe2}',
  '.jg-note{margin-top:12px;font-size:12px;color:#85776c;line-height:1.8}'
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
function cellHTML(key, r){
  var info = CELL[key];
  var hit = r.cells[key];
  var cls = 'jg-c';
  if (info.off) cls += ' jg-off';
  if (key === 'c') cls += ' jg-mid';
  var body = hit ? ('<div class="jg-n">' + hit.n + '</div>') : '';
  return '<div class="' + cls + '">' +
           '<div class="jg-p">' + info.name + '</div>' +
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
function panel(){
  css();
  return '<div class="jg-in">' +
           '<input id="jg-ph" type="tel" inputmode="numeric" ' +
           'placeholder="輸入手機號碼" autocomplete="off">' +
           '<button id="jg-go" type="button">起 盤</button>' +
         '</div>' +
         '<div class="jg-err" id="jg-err"></div>' +
         '<div id="jg-out"></div>';
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
