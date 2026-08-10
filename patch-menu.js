/* ============================================================
   patch-menu.js　把「八星磁場」卡收起來，改由工具區進入
   ------------------------------------------------------------
   老師 8/10 指示：
     「八星磁場放到功能選單裡面」

   現況：先天後天表已經把磁場標在兩數之間，
        排盤結果裡那張獨立的「八星磁場」卡是重複的。
   做法：把那張卡隱藏，使用者要查詳細的，
        走底下「其他工具 → 八星磁場查詢」（bxcc.html）。

   ★ 只是隱藏，不刪 patch-bx.js。
     想恢復：把這支的 <script> 那行刪掉即可。

   放在 index.html 最後面：
     <script src="patch-menu.js"></script>
   ============================================================ */
(function(){
'use strict';

var DONE = false;

/* 找出那張「八星磁場」卡：
   內文有「八星磁場」，但沒有「看日子」
   （有看日子的是底下的工具卡，不能碰）
   取符合條件裡最外層的那一個，就是整張卡。 */
function findBxCard(){
  var all = document.getElementsByTagName('*');
  var hit = [];
  for (var i = 0; i < all.length; i++){
    var t = all[i].textContent || '';
    if (t.indexOf('八星磁場') < 0) continue;
    if (t.indexOf('看日子') >= 0) continue;   /* 工具卡，跳過 */
    if (t.indexOf('其他工具') >= 0) continue;
    hit.push(all[i]);
  }
  if (!hit.length) return null;

  /* 取最外層：不被其他命中元素包住的那一個 */
  for (var j = 0; j < hit.length; j++){
    var outer = true;
    for (var k = 0; k < hit.length; k++){
      if (j !== k && hit[k].contains && hit[k].contains(hit[j]) && hit[k] !== hit[j]){
        outer = false; break;
      }
    }
    if (outer) return hit[j];
  }
  return hit[0];
}

function hide(){
  if (DONE) return;
  var card = findBxCard();
  if (!card) return;
  card.style.display = 'none';
  card.setAttribute('data-zh-hidden', '1');
  DONE = true;
}

function boot(){
  try { hide(); } catch(e){}
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
