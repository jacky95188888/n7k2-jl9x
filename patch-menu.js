/* ============================================================
   patch-menu.js　功能選單多一顆「八星磁場查詢」
   ------------------------------------------------------------
   只做一件事：在「功能選單」卡裡，複製「專業版」那顆按鈕的
   樣式，做出一顆「八星磁場查詢」，點了去 bxcc.html。

   不藏任何東西、不搬任何東西、不刪任何東西。
   找不到目標就什麼都不做。

   若要還原：把這支的 <script> 那行刪掉即可。
   ============================================================ */
(function(){
'use strict';

var DONE = false;

/* 把元素底下第一個含指定文字的文字節點換掉 */
function swapText(root, from, to){
  var stack = [root], n, i;
  while (stack.length){
    n = stack.pop();
    if (n.nodeType === 3){
      if (n.nodeValue && n.nodeValue.indexOf(from) >= 0){
        n.nodeValue = n.nodeValue.replace(from, to);
        return true;
      }
    } else if (n.childNodes){
      for (i = n.childNodes.length - 1; i >= 0; i--) stack.push(n.childNodes[i]);
    }
  }
  return false;
}

/* 找「專業版」那顆按鈕，拿來當樣式模板。
   條件：含「專業版」，但不含其他按鈕的字，
        也不含「功能選單」四個字（那是整張卡）。 */
function findProButton(){
  var all = document.getElementsByTagName('*'), i, t, hit = [];
  for (i = 0; i < all.length; i++){
    t = all[i].textContent || '';
    if (t.indexOf('專業版') < 0) continue;
    if (t.indexOf('功能選單') >= 0) continue;
    if (t.indexOf('生辰排盤') >= 0) continue;
    if (t.indexOf('手機號') >= 0) continue;
    if (t.indexOf('九宮') >= 0) continue;
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

  /* 換字；換不到就放棄，不要放一顆假的「專業版」上去 */
  if (!swapText(btn, '專業版', '八星磁場查詢')) return;
  swapText(btn, '需密碼解鎖', '手機、車牌、門牌');

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

  /* 插在「專業版」旁邊 */
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
