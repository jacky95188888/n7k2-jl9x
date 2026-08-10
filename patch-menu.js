/* ============================================================
   patch-menu.js　把「八星磁場」搬進首頁的「功能選單」
   ------------------------------------------------------------
   老師 8/10 指示：
     「八星磁場放到功能選單裡面」

   做法兩件事：
     1. 在首頁「功能選單」卡裡，複製一顆現有按鈕的樣式，
        新增「八星磁場查詢」，點了去 bxcc.html
     2. 排盤結果裡那張獨立的「八星磁場」卡隱藏
        （先天後天表已經把磁場標在兩數之間，重複了）

   ★ 用複製現有按鈕的方式，樣式一定跟其他按鈕一致，
     不用自己寫 CSS，也不會因為改版走樣。

   ★ 只是隱藏，不刪 patch-bx.js。
     想恢復：把這支的 <script> 那行刪掉即可。

   放在 index.html 最後面：
     <script src="patch-menu.js"></script>
   ============================================================ */
(function(){
'use strict';

var ADDED = false;
var HIDDEN = false;

/* ---------- 工具：把某元素底下的文字換掉 ---------- */
function swapText(root, from, to){
  var stack = [root], n, i, done = false;
  while (stack.length){
    n = stack.pop();
    if (n.nodeType === 3){
      if (!done && n.nodeValue && n.nodeValue.indexOf(from) >= 0){
        n.nodeValue = n.nodeValue.replace(from, to);
        done = true;
      }
    } else if (n.childNodes){
      for (i = 0; i < n.childNodes.length; i++) stack.push(n.childNodes[i]);
    }
  }
  return done;
}

/* ---------- 找「功能選單」那張卡 ---------- */
function findMenuCard(){
  var all = document.getElementsByTagName('*');
  var hit = [], i, t;
  for (i = 0; i < all.length; i++){
    t = all[i].textContent || '';
    if (t.indexOf('功能選單') < 0) continue;
    if (t.indexOf('專業版') < 0) continue;
    hit.push(all[i]);
  }
  if (!hit.length) return null;
  /* 取最內層的那一個＝剛好包住選單的卡 */
  var best = hit[0];
  for (i = 1; i < hit.length; i++){
    if (best.contains && best.contains(hit[i])) best = hit[i];
  }
  return best;
}

/* ---------- 找「專業版」那顆按鈕，拿來當模板 ---------- */
function findProButton(card){
  var all = card.getElementsByTagName('*'), i, t, hit = [];
  for (i = 0; i < all.length; i++){
    t = all[i].textContent || '';
    if (t.indexOf('專業版') < 0) continue;
    if (t.indexOf('功能選單') >= 0) continue;
    /* 若同時含到別顆按鈕的字，代表這是外面的容器，不是按鈕本身 */
    if (t.indexOf('生辰排盤') >= 0) continue;
    if (t.indexOf('手機號') >= 0) continue;
    if (t.indexOf('九宮') >= 0) continue;
    hit.push(all[i]);
  }
  if (!hit.length) return null;
  /* 取最外層的那一顆＝整顆按鈕（含副標） */
  var best = hit[0];
  for (i = 1; i < hit.length; i++){
    if (hit[i].contains && hit[i].contains(best)) best = hit[i];
  }
  return best;
}

function addButton(){
  if (ADDED) return;
  if (document.getElementById('zh-bx-btn')) { ADDED = true; return; }

  var card = findMenuCard();
  if (!card) return;

  var tpl = findProButton(card);
  if (!tpl) return;

  var btn = tpl.cloneNode(true);
  btn.id = 'zh-bx-btn';

  /* 換掉文字 */
  if (!swapText(btn, '專業版', '八星磁場查詢')) return;
  swapText(btn, '需密碼解鎖', '手機、車牌、門牌');

  /* 清掉複製過來的行為，改成連到 bxcc.html */
  btn.removeAttribute('onclick');
  btn.removeAttribute('id-orig');
  if (btn.tagName === 'A'){
    btn.setAttribute('href', 'bxcc.html');
  } else {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', function(e){
      e.preventDefault();
      window.location.href = 'bxcc.html';
    });
  }
  /* 內層若還有 onclick 一併清掉 */
  var inner = btn.getElementsByTagName('*');
  for (var i = 0; i < inner.length; i++){
    inner[i].removeAttribute('onclick');
    inner[i].removeAttribute('id');
  }

  if (tpl.parentNode) tpl.parentNode.insertBefore(btn, tpl.nextSibling);
  ADDED = true;
}

/* 判斷某元素是不是我們新增那顆按鈕，或在它裡面 */
function inNewButton(el){
  var n = el, guard = 0;
  while (n && guard++ < 30){
    if (n.id === 'zh-bx-btn') return true;
    n = n.parentNode;
  }
  return false;
}

/* ---------- 隱藏排盤結果裡那張「八星磁場」卡 ---------- */
function hideBxCard(){
  if (HIDDEN) return;
  var all = document.getElementsByTagName('*'), i, t, hit = [];
  var newBtn = document.getElementById('zh-bx-btn');
  for (i = 0; i < all.length; i++){
    t = all[i].textContent || '';
    if (t.indexOf('八星磁場') < 0) continue;
    /* 包住新按鈕的容器（選單、按鈕區塊）絕對不能藏 */
    if (newBtn && all[i].contains && all[i].contains(newBtn)) continue;
    if (t.indexOf('看日子') >= 0) continue;     /* 工具卡，不碰 */
    if (t.indexOf('功能選單') >= 0) continue;   /* 選單卡，不碰 */
    if (t.indexOf('其他工具') >= 0) continue;
    if (inNewButton(all[i])) continue;          /* 自己新增的按鈕，不碰 */
    hit.push(all[i]);
  }
  if (!hit.length) return;

  /* 取最外層的那一個＝整張卡 */
  for (var j = 0; j < hit.length; j++){
    var outer = true;
    for (var k = 0; k < hit.length; k++){
      if (j !== k && hit[k].contains && hit[k] !== hit[j] && hit[k].contains(hit[j])){
        outer = false; break;
      }
    }
    if (outer){
      hit[j].style.display = 'none';
      HIDDEN = true;
      return;
    }
  }
}

function boot(){
  /* 先藏卡再加按鈕：這樣搜尋「八星磁場」時，
     頁面上還沒有我們自己加的那顆按鈕，不會互相干擾 */
  try { hideBxCard(); } catch(e){}
  try { addButton(); } catch(e){}
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
setTimeout(boot, 600);
setTimeout(boot, 1500);
setTimeout(boot, 3000);

})();
