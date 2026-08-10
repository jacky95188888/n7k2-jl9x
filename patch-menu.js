/* ============================================================
   patch-menu.js　功能選單多一顆「八星磁場查詢」
   ------------------------------------------------------------
   只做一件事：複製「專 業 版」那顆按鈕的樣式，
   做出一顆「八星磁場查詢」，點了去 bxcc.html。

   ★ 重點：頁面標題寫成「專 業 版」（字中間有空格），
     所以比對前一律先把空白去掉，否則永遠找不到。

   不藏、不搬、不刪任何東西。找不到就什麼都不做。
   ============================================================ */
(function(){
'use strict';

var DONE = false;

/* 去掉所有空白（含全形空格）再比對 */
function norm(s){
  return (s || '').replace(/[\s\u3000\u00a0]+/g, '');
}
function has(el, word){
  return norm(el && el.textContent).indexOf(word) >= 0;
}

/* 找出按鈕裡的文字節點：內容（去空白後）含指定字的那一個 */
function findTextNode(root, word){
  var stack = [root], n, i;
  while (stack.length){
    n = stack.pop();
    if (n.nodeType === 3){
      if (norm(n.nodeValue).indexOf(word) >= 0) return n;
    } else if (n.childNodes){
      for (i = n.childNodes.length - 1; i >= 0; i--) stack.push(n.childNodes[i]);
    }
  }
  return null;
}

/* 找「專 業 版」那顆選單按鈕當樣式模板 */
function findProButton(){
  var all = document.getElementsByTagName('*'), i, hit = [];
  for (i = 0; i < all.length; i++){
    if (!has(all[i], '專業版')) continue;
    if (has(all[i], '功能選單')) continue;   /* 整張卡 */
    if (has(all[i], '生辰排盤')) continue;   /* 按鈕區塊 */
    if (has(all[i], '手機號')) continue;
    if (has(all[i], '九宮')) continue;
    if (has(all[i], '輸入密碼')) continue;   /* 下方的解鎖區，不是選單按鈕 */
    hit.push(all[i]);
  }
  if (!hit.length) return null;

  /* 取最外層的那一顆＝整顆按鈕（標題＋副標都包進去） */
  var best = hit[0];
  for (i = 1; i < hit.length; i++){
    if (hit[i].contains && hit[i].contains(best)) best = hit[i];
  }
  return best;
}

function addButton(){
  if (DONE) return;
  if (document.getElementById('zh-bx-btn')){ DONE = true; return; }

  var tpl = findProButton();
  if (!tpl || !tpl.parentNode) return;

  var btn = tpl.cloneNode(true);
  btn.id = 'zh-bx-btn';

  /* 換標題；換不到就放棄，不要放一顆假的「專業版」上去 */
  var t1 = findTextNode(btn, '專業版');
  if (!t1) return;
  t1.nodeValue = '八星磁場查詢';

  /* 換副標（有就換，沒有不強求） */
  var t2 = findTextNode(btn, '需密碼解鎖');
  if (t2) t2.nodeValue = '手機、車牌、門牌';

  /* 清掉複製過來的行為與重複 id */
  btn.removeAttribute('onclick');
  var inner = btn.getElementsByTagName('*');
  for (var i = 0; i < inner.length; i++){
    inner[i].removeAttribute('onclick');
    inner[i].removeAttribute('id');
  }

  /* 點了去 bxcc.html */
  if (btn.tagName === 'A'){
    btn.setAttribute('href', 'bxcc.html');
  } else {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', function(e){
      if (e && e.preventDefault) e.preventDefault();
      window.location.href = 'bxcc.html';
    });
  }

  tpl.parentNode.insertBefore(btn, tpl.nextSibling);
  DONE = true;
}

function boot(){
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
