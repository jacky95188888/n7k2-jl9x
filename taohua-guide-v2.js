/* 桃花神數｜1234 操作示範與四步按鍵引導
 * 僅改善操作說明，不改動 256 組教材資料或解讀邏輯。
 */
(function(){
  'use strict';
  if(!document.body.classList.contains('jl-page-taohua')) return;
  if(document.getElementById('th-demo-guide')) return;

  var manual=document.getElementById('manual-panel');
  var slots=document.getElementById('slots');
  var coins=[].slice.call(document.querySelectorAll('[data-number]'));
  var modeTabs=document.querySelector('.mode-tabs');
  var readButton=document.getElementById('read-manual');
  var clearButton=document.getElementById('clear');
  var undoButton=document.getElementById('undo');
  if(!manual||!slots||!modeTabs||!readButton) return;

  var guideArticles=document.querySelectorAll('.guide article');
  if(guideArticles[1]){
    var guideText=guideArticles[1].querySelector('p');
    if(guideText) guideText.textContent='總共按四次。每一次都從 1、2、3、4 選一個數字，數字可以重複，順序不可調換。';
  }

  var modeButtons=modeTabs.querySelectorAll('[data-mode]');
  if(modeButtons[0]) modeButtons[0].textContent='自己選數字（總共按4次）';
  if(modeButtons[1]) modeButtons[1].textContent='系統取數（只要按1次）';

  coins.forEach(function(button){
    button.textContent=button.getAttribute('data-number');
    button.setAttribute('aria-label','選擇數字 '+button.getAttribute('data-number'));
  });

  if(undoButton) undoButton.textContent='上一步';
  if(clearButton) clearButton.textContent='全部重來';

  var demo=document.createElement('aside');
  demo.id='th-demo-guide';
  demo.className='th-demo';
  demo.innerHTML=
    '<div class="th-demo-head"><span>示</span><div><small>BUTTON DEMONSTRATION</small><strong>先看一次 1234 示範</strong></div></div>'+
    '<p>假設四次取出的順序是：第一次 <b>1</b>、第二次 <b>2</b>、第三次 <b>3</b>、第四次 <b>4</b>，按鍵就照順序按：</p>'+
    '<div class="th-demo-seq" aria-label="1234按鍵示範">'+
      '<i><b>1</b><small>第1次</small></i><em>→</em>'+
      '<i><b>2</b><small>第2次</small></i><em>→</em>'+
      '<i><b>3</b><small>第3次</small></i><em>→</em>'+
      '<i><b>4</b><small>第4次</small></i>'+
    '</div>'+
    '<button type="button" id="th-fill-demo">點我示範填入 1・2・3・4</button>'+
    '<small class="th-demo-note">這只是操作示範；正式問事時，請依實際四次取出的數字依序按下。</small>';
  modeTabs.insertAdjacentElement('beforebegin',demo);

  var status=document.createElement('div');
  status.id='th-draw-status';
  status.className='th-draw-status';
  status.setAttribute('aria-live','polite');
  slots.insertAdjacentElement('beforebegin',status);

  var coinHint=document.createElement('p');
  coinHint.className='th-coin-hint';
  coinHint.textContent='每次從下面選一個數字；選完後會自動進到下一次。';
  slots.insertAdjacentElement('afterend',coinHint);

  var style=document.createElement('style');
  style.id='th-demo-style';
  style.textContent=
    '.th-demo{position:relative;overflow:hidden;margin:0 0 16px;padding:16px;border:1px solid #d9b44c;border-radius:18px;background:radial-gradient(circle at 96% 5%,#edcb6242,transparent 32%),linear-gradient(145deg,#fffdf4,#fff5dc 55%,#fdf1ff);box-shadow:0 8px 20px #5d0d6e14}'+
    '.th-demo:after{content:"1234";position:absolute;right:-4px;bottom:-15px;color:#7414870c;font:900 70px/1 var(--ser);letter-spacing:-.08em;pointer-events:none}'+
    '.th-demo-head{position:relative;z-index:1;display:flex;align-items:center;gap:10px}.th-demo-head>span{width:38px;height:38px;display:grid;place-items:center;border:1px solid #dfbc55;border-radius:50%;color:#ffe58c;background:linear-gradient(145deg,#4d065c,#9c21b4);font:900 15px var(--ser)}'+
    '.th-demo-head small{display:block;color:#a47b25;font-size:8px;font-weight:900;letter-spacing:.13em}.th-demo-head strong{display:block;margin-top:2px;color:#601071;font:900 17px var(--ser);letter-spacing:.06em}'+
    '.th-demo>p{position:relative;z-index:1;margin:12px 0;color:#6d5671;font-size:11px;line-height:1.75}.th-demo>p b{color:#751389;font-size:14px}'+
    '.th-demo-seq{position:relative;z-index:1;display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;align-items:center;gap:5px;margin:10px 0 12px}.th-demo-seq i{min-height:65px;display:grid;place-items:center;padding:6px;border:1px solid #d8b34a;border-radius:13px;background:linear-gradient(145deg,#fff,#fff7de);font-style:normal}.th-demo-seq i b{width:32px;height:32px;display:grid;place-items:center;border-radius:50%;color:#ffe58a;background:linear-gradient(145deg,#5a086a,#9c20b5);font:900 18px var(--ser)}.th-demo-seq i small{color:#79637d;font-size:8px;font-weight:800}.th-demo-seq em{color:#b58a29;font-style:normal;font-weight:900}'+
    '#th-fill-demo{position:relative;z-index:1;width:100%;min-height:44px;border:1px solid #d6aa37;border-radius:999px;color:#fff;background:linear-gradient(105deg,#4d065b,#941dab 58%,#c83bd8);box-shadow:0 7px 15px #5c0c6d25;font:900 12px var(--ser);letter-spacing:.05em;cursor:pointer}'+
    '.th-demo-note{position:relative;z-index:1;display:block;margin-top:8px;color:#806d83;font-size:9px;line-height:1.55;text-align:center}'+
    '.th-draw-status{margin:0 0 10px;padding:11px 12px;border:1px solid #dbb94f;border-radius:13px;color:#621173;background:linear-gradient(145deg,#fff9df,#fff);font:900 13px var(--ser);text-align:center;letter-spacing:.04em}'+
    '.th-draw-status b{display:inline-grid;place-items:center;min-width:27px;height:27px;margin:0 3px;border-radius:50%;color:#ffe58a;background:#711084;font-size:15px}'+
    '.th-coin-hint{margin:9px 0 0;color:#78627c;font-size:10px;font-weight:700;text-align:center}'+
    'body.jl-page-taohua .coin{font-size:0!important}body.jl-page-taohua .coin:after{content:attr(data-number)!important;position:static!important;width:auto!important;height:auto!important;display:block!important;color:#ffe486!important;background:none!important;opacity:1!important;filter:none!important;transform:none!important;font:900 25px var(--ser)!important}'+
    'body.jl-page-taohua .coin[disabled]{cursor:not-allowed;filter:grayscale(.45);opacity:.42;box-shadow:none}'+
    '#read-manual:not(.th-ready){border-color:#d9cbdc;color:#8c7d8f;background:#eee8ef;box-shadow:none}'+
    '@media(max-width:430px){.th-demo{padding:14px 12px}.th-demo-seq{gap:3px}.th-demo-seq i{min-height:59px;padding:5px 2px}.th-demo-seq i b{width:29px;height:29px;font-size:16px}.th-demo-seq em{font-size:10px}.th-demo-head strong{font-size:15px}.th-draw-status{font-size:12px}}';
  document.head.appendChild(style);

  function updateStatus(){
    var count=slots.querySelectorAll('.slot.filled').length;
    coins.forEach(function(button){button.disabled=count>=4;});
    if(count<4){
      status.innerHTML='目前完成 <b>'+count+'</b>／4　現在請選「第 '+(count+1)+' 次」的數字';
      readButton.textContent='請先完成四次取數（'+count+'／4）';
      readButton.classList.remove('th-ready');
    }else{
      status.innerHTML='四次取數已完成 <b>4</b>／4　請按下方「查看解讀」';
      readButton.textContent='四次完成・查看解讀';
      readButton.classList.add('th-ready');
    }
  }

  new MutationObserver(updateStatus).observe(slots,{childList:true,subtree:true});
  updateStatus();

  document.getElementById('th-fill-demo').addEventListener('click',function(){
    if(clearButton) clearButton.click();
    [1,2,3,4].forEach(function(number,index){
      setTimeout(function(){
        var target=document.querySelector('[data-number="'+number+'"]');
        if(target) target.click();
        if(index===3){
          setTimeout(function(){
            status.innerHTML='1234 示範完成：第1次按1 → 第2次按2 → 第3次按3 → 第4次按4';
            manual.scrollIntoView({behavior:'smooth',block:'center'});
          },100);
        }
      },index*180);
    });
  });
})();