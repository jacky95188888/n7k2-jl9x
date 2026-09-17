/* 筠玲易數｜八星磁場・手機號碼連續排列 V1
   依老師確認：手機號碼用「完整數字鏈」閱讀，磁場標在相鄰兩數之間。
   不改演算法，只改結果呈現；原本逐組文字解讀保留在下方。
*/
(function(){
  'use strict';
  if(!document.body || !document.body.classList.contains('jl-page-bxcc')) return;

  function injectStyle(){
    if(document.getElementById('bxcc-chain-style')) return;
    var s=document.createElement('style');
    s.id='bxcc-chain-style';
    s.textContent=`
      #out .bx-chain-card{margin:18px 0 14px;padding:16px 12px 14px;border:1.5px solid #c79c42;border-radius:18px;background:radial-gradient(circle at 10% 0,rgba(255,255,255,.9),transparent 28%),linear-gradient(145deg,#fff9ea,#eee0c3);box-shadow:0 10px 24px rgba(88,60,30,.12),inset 0 0 0 1px rgba(255,255,255,.74)}
      #out .bx-chain-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 2px 12px}
      #out .bx-chain-head b{color:#55106c;font-size:15px;letter-spacing:.12em}
      #out .bx-chain-head small{color:#9b7630;font-size:10px;letter-spacing:.08em}
      #out .bx-chain-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;padding:8px 3px 10px;scrollbar-width:thin}
      #out .bx-chain{display:grid;grid-template-rows:auto auto auto;align-items:center;width:max-content;min-width:100%;justify-content:center}
      #out .bx-chain-stars,#out .bx-chain-numbers,#out .bx-chain-gua{display:flex;align-items:center;justify-content:center}
      #out .bx-chain-stars{padding:0 28px;margin-bottom:2px}
      #out .bx-chain-star{width:52px;text-align:center;font-size:11px;font-weight:900;letter-spacing:.03em;white-space:nowrap}
      #out .bx-chain-star.ji{color:#187252}
      #out .bx-chain-star.xiong{color:#a32a3b}
      #out .bx-chain-gap{width:34px;flex:0 0 34px}
      #out .bx-chain-num{position:relative;width:54px;height:54px;display:grid;place-items:center;flex:0 0 54px;border:1.5px solid #c6a35a;border-radius:14px;background:linear-gradient(145deg,#fffef8,#f6ead0);color:#241b1a;font-size:29px;font-weight:900;box-shadow:inset 0 0 0 1px rgba(255,255,255,.75),0 5px 11px rgba(72,52,30,.1)}
      #out .bx-chain-num:after{content:"";position:absolute;inset:4px;border:1px solid rgba(255,255,255,.82);border-radius:10px;pointer-events:none}
      #out .bx-chain-link{width:32px;height:2px;flex:0 0 32px;background:linear-gradient(90deg,#c8a44d,#8a6e2b,#c8a44d);opacity:.8}
      #out .bx-chain-gua{padding-top:4px}
      #out .bx-chain-gua span{width:54px;flex:0 0 54px;text-align:center;color:#7d6a5f;font-size:9.5px;white-space:nowrap}
      #out .bx-chain-gua i{width:32px;flex:0 0 32px}
      #out .bx-chain-note{margin:4px 4px 0;color:#6f6055;font-size:11px;line-height:1.7}
      #out .bx-chain-details{margin-top:12px;border-top:1px solid #dbc99f;padding-top:10px}
      #out .bx-chain-details summary{cursor:pointer;color:#5c176f;font-size:12px;font-weight:900;letter-spacing:.08em;list-style:none}
      #out .bx-chain-details summary::-webkit-details-marker{display:none}
      #out .bx-chain-details summary:after{content:"＋";float:right;color:#a77820}
      #out .bx-chain-details[open] summary:after{content:"－"}
      #out .bx-chain-details .pair{padding:10px 0}
      @media(max-width:390px){
        #out .bx-chain-card{padding:14px 9px 12px}
        #out .bx-chain-star{width:46px;font-size:10px}
        #out .bx-chain-gap{width:28px;flex-basis:28px}
        #out .bx-chain-num{width:48px;height:48px;flex-basis:48px;font-size:26px;border-radius:12px}
        #out .bx-chain-link{width:26px;flex-basis:26px}
        #out .bx-chain-gua span{width:48px;flex-basis:48px;font-size:9px}
        #out .bx-chain-gua i{width:26px;flex-basis:26px}
      }
    `;
    document.head.appendChild(s);
  }

  function parsePair(el){
    var num=el.querySelector('.num');
    var star=el.querySelector('.star');
    if(!num || !star) return null;
    var m=num.textContent.match(/(\d+)\s*[－—–-]\s*(\d+)/);
    if(!m) return null;
    var small=num.querySelector('small');
    var gua=['',''];
    if(small){
      var txt=small.textContent.trim().split(/\s+/);
      gua[0]=txt[0]||''; gua[1]=txt[1]||'';
    }
    return {a:m[1],b:m[2],name:star.textContent.trim(),type:star.classList.contains('ji')?'ji':'xiong',gua:gua};
  }

  function enhance(){
    var out=document.getElementById('out');
    if(!out || out.dataset.chainBusy==='1') return;
    var pairEls=[].slice.call(out.querySelectorAll(':scope > .pair'));
    if(pairEls.length<1) return;

    var pairs=pairEls.map(parsePair).filter(Boolean);
    if(!pairs.length) return;

    var overlap=true;
    for(var i=1;i<pairs.length;i++){
      if(pairs[i].a!==pairs[i-1].b){ overlap=false; break; }
    }
    if(!overlap) return;

    out.dataset.chainBusy='1';
    var existing=out.querySelector(':scope > .bx-chain-card');
    if(existing) existing.remove();

    var nums=[pairs[0].a];
    var gua=[pairs[0].gua[0]];
    pairs.forEach(function(p){ nums.push(p.b); gua.push(p.gua[1]); });

    var card=document.createElement('section');
    card.className='bx-chain-card';
    var stars=pairs.map(function(p){return '<span class="bx-chain-star '+p.type+'">'+p.name+'</span>';}).join('<span class="bx-chain-gap"></span>');
    var numbers=nums.map(function(n){return '<span class="bx-chain-num">'+n+'</span>';}).join('<i class="bx-chain-link"></i>');
    var guas=gua.map(function(g){return '<span>'+g+'</span>';}).join('<i></i>');

    card.innerHTML='<div class="bx-chain-head"><b>手機號碼排列</b><small>相鄰兩數・一格一場</small></div>'+
      '<div class="bx-chain-scroll"><div class="bx-chain">'+
      '<div class="bx-chain-stars">'+stars+'</div>'+
      '<div class="bx-chain-numbers">'+numbers+'</div>'+
      '<div class="bx-chain-gua">'+guas+'</div>'+
      '</div></div>'+
      '<p class="bx-chain-note">依老師確認方式：號碼維持原順序，八星磁場直接標在相鄰兩數之間；左右滑動可看完整號碼。</p>';

    var details=document.createElement('details');
    details.className='bx-chain-details';
    details.innerHTML='<summary>查看逐組白話解讀</summary><div class="bx-chain-detail-body"></div>';
    var detailBody=details.querySelector('.bx-chain-detail-body');
    pairEls.forEach(function(el){ detailBody.appendChild(el); });
    card.appendChild(details);

    out.insertBefore(card,out.firstChild);
    out.dataset.chainBusy='0';
  }

  function boot(){
    injectStyle();
    var out=document.getElementById('out');
    if(!out) return;
    var timer=null;
    var obs=new MutationObserver(function(){
      clearTimeout(timer);
      timer=setTimeout(enhance,30);
    });
    obs.observe(out,{childList:true,subtree:false});
    enhance();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
