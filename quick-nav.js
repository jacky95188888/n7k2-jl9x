/* 筠玲易數｜首頁七項目錄控制器
 * 老師確認版：首頁單欄、一排一功能；點擊後進入各自板頁。
 * 本檔取代舊左側「首／柱／宮…」快捷列，不再建立浮動導覽。
 */
(function(){
  'use strict';

  function mountCatalog(){
    if(document.getElementById('jl-catalog-home')) return;

    var home=document.getElementById('jl-home-final');
    if(!home) return;

    var oldQuick=document.getElementById('jl-quick-nav');
    if(oldQuick) oldQuick.remove();

    var catalog=document.createElement('section');
    catalog.id='jl-catalog-home';
    catalog.setAttribute('aria-labelledby','jl-catalog-title');
    catalog.innerHTML=
      '<div class="jl-catalog-heading">'+
        '<small>JUN LING DESTINY DIRECTORY</small>'+
        '<h2 id="jl-catalog-title">選擇您想查看的項目</h2>'+
        '<p>一排一功能・清楚好找・點擊即進入</p>'+
      '</div>'+
      '<div class="jl-catalog-list">'+
        '<a class="jl-catalog-row jl-tone-peach" href="taohua.html">'+
          '<span class="jl-catalog-icon"><img src="badge-taohua-v1.svg" alt=""></span>'+
          '<span class="jl-catalog-copy"><strong>桃花神數</strong><small>感情緣分・一事一問</small></span><b aria-hidden="true">›</b>'+
        '</a>'+
        '<button class="jl-catalog-row jl-tone-bazi" type="button" data-jl-catalog-route="六親">'+
          '<span class="jl-catalog-icon"><img src="badge-shuzibagua-v1.svg" alt=""></span>'+
          '<span class="jl-catalog-copy"><strong>數字八字</strong><small>生辰數卦・格局解析</small></span><b aria-hidden="true">›</b>'+
        '</button>'+
        '<button class="jl-catalog-row jl-tone-qimen" type="button" data-jl-catalog-route="奇門">'+
          '<span class="jl-catalog-icon"><img src="badge-qimen-v1.webp" alt=""></span>'+
          '<span class="jl-catalog-copy"><strong>奇門號碼</strong><small>手機號碼・局勢判讀</small></span><b aria-hidden="true">›</b>'+
        '</button>'+
        '<a class="jl-catalog-row jl-tone-star" href="bxcc.html">'+
          '<span class="jl-catalog-icon"><img src="badge-baxing-v1.webp" alt=""></span>'+
          '<span class="jl-catalog-copy"><strong>九星號碼</strong><small>數字能量・九星解析</small></span><b aria-hidden="true">›</b>'+
        '</a>'+
        '<a class="jl-catalog-row jl-tone-date" href="rz.html">'+
          '<span class="jl-catalog-icon jl-catalog-symbol">吉</span>'+
          '<span class="jl-catalog-copy"><strong>選日子／擇日</strong><small>重要日程・吉日查詢</small></span><b aria-hidden="true">›</b>'+
        '</a>'+
        '<a class="jl-catalog-row jl-tone-course" href="courses.html">'+
          '<span class="jl-catalog-icon jl-catalog-symbol">課</span>'+
          '<span class="jl-catalog-copy"><strong>課程目錄</strong><small>專業課程・分類瀏覽</small></span><b aria-hidden="true">›</b>'+
        '</a>'+
        '<a class="jl-catalog-row jl-tone-product" href="products.html">'+
          '<span class="jl-catalog-icon jl-catalog-symbol">運</span>'+
          '<span class="jl-catalog-copy"><strong>開運產品目錄</strong><small>開運商品・分類選購</small></span><b aria-hidden="true">›</b>'+
        '</a>'+
      '</div>'+
      '<p class="jl-catalog-note">點選項目，即可進入專屬板頁</p>';

    var hero=home.querySelector('.jlf-hero');
    if(hero) hero.insertAdjacentElement('afterend',catalog);
    else home.prepend(catalog);

    catalog.querySelectorAll('[data-jl-catalog-route]').forEach(function(button){
      button.addEventListener('click',function(){
        var route=button.getAttribute('data-jl-catalog-route');
        if(typeof window.jlOpenFeature==='function'){
          window.jlOpenFeature(route);
        }else{
          try{sessionStorage.setItem('jlf-shortcut-route',route);}catch(e){}
          location.href='index.html?route='+encodeURIComponent(route);
        }
      });
    });

    var style=document.createElement('style');
    style.id='jl-catalog-style';
    style.textContent=
      'body.jl-catalog-ready .jlf-section-title,'+
      'body.jl-catalog-ready .jlf-tools,'+
      'body.jl-catalog-ready .jlf-taohua,'+
      'body.jl-catalog-ready .jlf-date{display:none!important}'+
      '#jl-catalog-home{position:relative;overflow:hidden;padding:22px 18px 18px;background:'+
      'radial-gradient(circle at 8% 4%,rgba(239,179,250,.36),transparent 28%),'+
      'radial-gradient(circle at 92% 96%,rgba(226,187,85,.24),transparent 26%),'+
      'linear-gradient(180deg,#fff8ff,#f5e2fb)}'+
      '#jl-catalog-home:before{content:"";position:absolute;inset:0;background:url("assets/celestial-orbit.svg") 112% -40px/250px auto no-repeat;opacity:.11;pointer-events:none}'+
      '.jl-catalog-heading{position:relative;z-index:1;text-align:center;margin-bottom:17px}'+
      '.jl-catalog-heading small{display:block;color:#a77a24;font-size:9px;font-weight:900;letter-spacing:.18em}'+
      '.jl-catalog-heading h2{margin:5px 0 4px!important;padding:0!important;color:#59116e;font-family:"Noto Serif TC",serif;font-size:25px!important;letter-spacing:.08em;text-indent:0!important}'+
      '.jl-catalog-heading h2:after{display:none!important}'+
      '.jl-catalog-heading p{margin:0;color:#746176;font-size:12px;letter-spacing:.08em}'+
      '.jl-catalog-list{position:relative;z-index:1;display:grid;gap:10px;max-width:650px;margin:0 auto}'+
      '.jl-catalog-row{--row:#7a198f;position:relative;overflow:hidden;width:100%;min-height:86px;display:grid;grid-template-columns:68px minmax(0,1fr) 42px;align-items:center;gap:13px;padding:9px 13px 9px 10px;border:1px solid color-mix(in srgb,var(--row) 43%,#e2cee6);border-radius:18px;background:radial-gradient(circle at 95% 8%,color-mix(in srgb,var(--row) 13%,transparent),transparent 34%),linear-gradient(145deg,#fff,#fff8ff);color:#4f2758;text-align:left;text-decoration:none;box-shadow:0 8px 21px color-mix(in srgb,var(--row) 12%,transparent),inset 0 1px #fff;cursor:pointer;font:inherit;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}'+
      '.jl-catalog-row:before{content:"";position:absolute;left:94px;right:56px;top:0;height:2px;background:linear-gradient(90deg,transparent,var(--row),transparent);opacity:.6}'+
      '.jl-catalog-row:hover,.jl-catalog-row:focus-visible{transform:translateY(-2px);border-color:var(--row);box-shadow:0 12px 28px color-mix(in srgb,var(--row) 19%,transparent);outline:none}'+
      '.jl-catalog-icon{width:64px;height:64px;display:grid;place-items:center;border-radius:17px;background:radial-gradient(circle at 34% 25%,color-mix(in srgb,var(--row) 38%,#fff),var(--row));box-shadow:0 7px 15px color-mix(in srgb,var(--row) 30%,transparent),inset 0 1px #ffffff73}'+
      '.jl-catalog-icon img{display:block;width:62px;height:62px;object-fit:contain;filter:drop-shadow(0 5px 8px rgba(55,3,66,.3))}'+
      '.jl-catalog-symbol{border:2px solid #dfbd58;color:#ffe691;font-family:"Noto Serif TC",serif;font-size:27px;font-weight:900;text-shadow:0 2px 5px #35033f}'+
      '.jl-catalog-copy{min-width:0}'+
      '.jl-catalog-copy strong{display:block;color:#4f125d;font-family:"Noto Serif TC",serif;font-size:22px;line-height:1.25;letter-spacing:.06em}'+
      '.jl-catalog-copy small{display:block;margin-top:5px;color:#746276;font-size:12px;line-height:1.35;letter-spacing:.04em}'+
      '.jl-catalog-row>b{width:34px;height:34px;display:grid;place-items:center;border:1px solid #e0bd58;border-radius:50%;background:linear-gradient(145deg,#fff0ba,#d8a93f);color:#542065;font-size:28px;line-height:1;font-family:serif;box-shadow:0 5px 12px rgba(107,60,0,.18)}'+
      '.jl-tone-peach{--row:#c44f89}.jl-tone-bazi{--row:#8b4bb4}.jl-tone-qimen{--row:#9a7022}.jl-tone-star{--row:#5744a7}.jl-tone-date{--row:#388777}.jl-tone-course{--row:#3f719c}.jl-tone-product{--row:#a44e45}'+
      '.jl-catalog-note{position:relative;z-index:1;margin:14px 0 0;text-align:center;color:#6a4b6f;font-size:11px;font-weight:800;letter-spacing:.12em}'+
      '@media(max-width:430px){#jl-catalog-home{padding:18px 12px 15px}.jl-catalog-heading h2{font-size:22px!important}.jl-catalog-list{gap:9px}.jl-catalog-row{min-height:79px;grid-template-columns:59px minmax(0,1fr) 34px;gap:10px;padding:8px 10px 8px 8px;border-radius:16px}.jl-catalog-icon{width:57px;height:57px;border-radius:15px}.jl-catalog-icon img{width:55px;height:55px}.jl-catalog-symbol{font-size:24px}.jl-catalog-copy strong{font-size:20px}.jl-catalog-copy small{font-size:11px}.jl-catalog-row>b{width:31px;height:31px;font-size:25px}.jl-catalog-row:before{left:78px;right:46px}}'+
      '@media(prefers-reduced-motion:reduce){.jl-catalog-row{transition:none}}';
    document.head.appendChild(style);
    document.body.classList.add('jl-catalog-ready');
  }

  function loadTaohuaGuide(){
    if(!document.body.classList.contains('jl-page-taohua')) return;
    if(document.getElementById('th-guide-loader')) return;
    var script=document.createElement('script');
    script.id='th-guide-loader';
    script.src='taohua-guide-v2.js?v=1234-guide-20260828';
    document.body.appendChild(script);
  }

  function boot(){
    mountCatalog();
    loadTaohuaGuide();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',boot);
  }else{
    boot();
  }
})();