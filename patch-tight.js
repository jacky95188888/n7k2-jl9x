/* ============================================================
   patch-tight.js　先天·後天表：收緊行距、去掉中間橫線
   ------------------------------------------------------------
   老師 8/9 18:14 指示：
     「中間是不是可以縮小空間」
     「先天後天靠近數字卦一點」
     「就中間不要有空橫紋」
     「就盡量放在同一框」

   本檔只加 CSS，不改任何邏輯、不動 patch-zhu.js。
   若日後要調鬆一點，改下面 GAP 那幾個數字即可。

   放在 index.html 最後面，務必排在 patch-zhu.js 之後：
     <script src="patch-zhu.js"></script>
     <script src="patch-tight.js"></script>
   ============================================================ */
(function(){
'use strict';

var CSS = [
  /* 1. 整張表的框線全部拿掉（含先天/後天中間那條） */
  '#tp.zhu, #tp.zhu tr, #tp.zhu th, #tp.zhu td{',
  '  border:0 !important;',
  '  background:transparent !important;',
  '}',

  /* 2. 只留表頭底下那一條細線，當作年月日時的分隔 */
  '#tp.zhu tr:first-child th{',
  '  border-bottom:1px solid var(--line,#d3c6b0) !important;',
  '  padding-bottom:5px !important;',
  '}',

  /* 3. 上下留白大幅縮小，先天後天貼近 */
  '#tp.zhu th, #tp.zhu td{',
  '  padding:2px 2px !important;',
  '}',

  /* 4. 數字與它下面的爻線收在一起 */
  '#tp.zhu td.zh-n{',
  '  line-height:1.0 !important;',
  '  padding-top:4px !important;',
  '  padding-bottom:4px !important;',
  '}',
  '#tp.zhu .zh-t{',
  '  margin:1px auto 0 !important;',
  '  gap:2px !important;',
  '}',

  /* 5. 中間磁場字垂直置中，不要撐高 */
  '#tp.zhu td.zh-s{',
  '  padding:2px 1px !important;',
  '  line-height:1.2 !important;',
  '}',

  /* 6. 左邊「先天／後天」兩字也跟著收 */
  '#tp.zhu td.zh-row{',
  '  padding:2px 4px 2px 0 !important;',
  '  line-height:1.1 !important;',
  '}',

  /* 7. 說明文字與表格之間的距離也收一點 */
  '.zh-note{ margin-top:8px !important; }'
].join('\n');

function inject(){
  if (document.getElementById('zh-tight')) return;
  var s = document.createElement('style');
  s.id = 'zh-tight';
  s.appendChild(document.createTextNode(CSS));
  document.head.appendChild(s);
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', inject);
} else {
  inject();
}
setTimeout(inject, 600);

})();
