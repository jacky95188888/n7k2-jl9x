/* ============================================================
   patch-merge.js　四柱八字 ＋ 先天後天 併成同一張卡
   ------------------------------------------------------------
   老師 8/10 指示：
     「四柱八字跟先天後天中間不要有格線，要同一個欄位」

   做法：從 #tp 往上爬，找到「同一層兄弟裡有四柱卡」的那一層，
        把先天後天卡的內容整段搬進四柱卡，再移除空卡。
        兩張卡之間的邊框與間距自然消失。

   不改 patch-sizhu.js、不改 patch-zhu.js、不改 index.html 結構。
   若要還原：把這支的 <script> 那行刪掉即可。

   放在 index.html 最後面，務必排在其他 patch 之後：
     <script src="patch-sizhu.js"></script>
     <script src="patch-zhu.js"></script>
     <script src="patch-tight.js"></script>
     <script src="patch-merge.js"></script>
   ============================================================ */
(function(){
'use strict';

var DONE = false;

var CSS = [
  /* 四柱與先天後天之間，用一條淡線分隔，不是卡的邊框 */
  '.zh-gap{',
  '  height:1px;',
  '  margin:16px 0 12px;',
  '  background:var(--line,#d3c6b0);',
  '  opacity:.5;',
  '}',
  /* 搬進來的第一個元素不要再帶自己的上外距 */
  '.zh-merged .zh-moved:first-of-type{ margin-top:0 !important; }'
].join('\n');

function css(){
  if (document.getElementById('zh-merge-css')) return;
  var s = document.createElement('style');
  s.id = 'zh-merge-css';
  s.appendChild(document.createTextNode(CSS));
  document.head.appendChild(s);
}

/* 四柱卡的特徵字 */
function isSizhu(el){
  var t = (el && el.textContent) || '';
  return t.indexOf('日柱旬') >= 0 ||
         (t.indexOf('日主') >= 0 && t.indexOf('時辰') >= 0);
}

/* 從 #tp 一層一層往上爬，
   直到某一層的「兄弟」裡出現四柱卡，那一層就是先天後天卡 */
function locate(tp){
  var el = tp, guard = 0;
  while (el && el.parentNode && guard++ < 30){
    var kids = el.parentNode.children || [];
    for (var i = 0; i < kids.length; i++){
      if (kids[i] === el) continue;
      if (isSizhu(kids[i])) return { zhu: el, sizhu: kids[i] };
    }
    el = el.parentNode;
    if (el === document.body) break;
  }
  return null;
}

function merge(){
  if (DONE) return;

  var tp = document.getElementById('tp');
  if (!tp) return;

  var found = locate(tp);
  if (!found) return;

  var zhuCard = found.zhu, sizhuCard = found.sizhu;

  /* 已經在同一張卡裡，不用做 */
  if (sizhuCard === zhuCard || sizhuCard.contains(tp)){ DONE = true; return; }

  css();

  /* 中間補一條淡線 */
  var gap = document.createElement('div');
  gap.className = 'zh-gap';
  sizhuCard.appendChild(gap);

  /* 內容整段搬過去 */
  while (zhuCard.firstChild){
    var node = zhuCard.firstChild;
    if (node.nodeType === 1){
      node.className = ((node.className || '') + ' zh-moved').replace(/^\s+/, '');
    }
    sizhuCard.appendChild(node);
  }

  /* 移除空掉的卡 */
  if (zhuCard.parentNode) zhuCard.parentNode.removeChild(zhuCard);

  sizhuCard.className = ((sizhuCard.className || '') + ' zh-merged').replace(/^\s+/, '');
  DONE = true;
}

function boot(){
  try { merge(); } catch(e){}
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
setTimeout(boot, 500);
setTimeout(boot, 1200);
setTimeout(boot, 2500);

})();
