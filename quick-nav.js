/* 筠玲易數｜全站左側工作快捷列 */
(function () {
  'use strict';
  if (document.getElementById('jl-quick-nav')) return;

  var items = [
    { key:'home', label:'功能首頁', mark:'首', href:'index.html' },
    { key:'四柱', label:'四柱八字', mark:'柱', route:'四柱' },
    { key:'九宮', label:'紫微九宮', mark:'宮', route:'九宮' },
    { key:'奇門', label:'奇門遁甲', mark:'奇', route:'奇門' },
    { key:'六親', label:'數字八字卦', mark:'卦', route:'六親' },
    { key:'八星', label:'八星磁場', mark:'星', href:'bxcc.html' },
    { key:'流年', label:'流年運勢', mark:'運', route:'流年' },
    { key:'日子', label:'擇吉看日', mark:'日', href:'rz.html' }
  ];

  var style=document.createElement('style');
  style.id='jl-quick-nav-style';
  style.textContent=[
    '#jl-quick-nav{position:fixed;left:max(7px,env(safe-area-inset-left));top:50%;z-index:9500;transform:translateY(-50%);display:flex;flex-direction:column;gap:6px;padding:8px 6px;border:1px solid #e1bd5f;border-radius:999px;background:linear-gradient(180deg,#33043eea,#681078ed);box-shadow:0 12px 30px #2b023a55,inset 0 1px #ffffff2e;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}',
    '#jl-quick-nav:before{content:"工作";padding:2px 0 4px;color:#f1d986;font:800 8px/1 sans-serif;letter-spacing:.16em;text-align:center}',
    '#jl-quick-nav button,#jl-quick-nav a{position:relative;width:40px;height:40px;display:grid;place-items:center;padding:0;border:1px solid #e4c56788;border-radius:50%;color:#f3dda0;background:#ffffff0d;box-shadow:inset 0 0 0 3px #ffffff08;text-decoration:none;font:900 14px "Noto Serif TC","Songti TC",serif;cursor:pointer;transition:transform .18s ease,background .18s ease,color .18s ease}',
    '#jl-quick-nav button:hover,#jl-quick-nav a:hover,#jl-quick-nav button:focus-visible,#jl-quick-nav a:focus-visible,#jl-quick-nav .is-active{transform:translateX(3px);color:#fff;background:linear-gradient(135deg,#8a1ca6,#ca3cdd);border-color:#f1d375;outline:0;box-shadow:0 5px 13px #22012d88,inset 0 1px #ffffff50}',
    '#jl-quick-nav span{position:absolute;left:49px;top:50%;transform:translateY(-50%) translateX(-5px);width:max-content;max-width:150px;padding:7px 10px;border:1px solid #e2c362;border-radius:999px;color:#f5dfa0;background:#3c0448f2;box-shadow:0 5px 15px #25012f55;font:800 11px/1 sans-serif;letter-spacing:.06em;opacity:0;visibility:hidden;pointer-events:none;transition:.18s ease}',
    '#jl-quick-nav button:hover span,#jl-quick-nav a:hover span,#jl-quick-nav button:focus-visible span,#jl-quick-nav a:focus-visible span{opacity:1;visibility:visible;transform:translateY(-50%) translateX(0)}',
    '@media(max-width:760px){#jl-quick-nav{left:max(4px,env(safe-area-inset-left));gap:4px;padding:6px 4px}#jl-quick-nav:before{display:none}#jl-quick-nav button,#jl-quick-nav a{width:35px;height:35px;font-size:12px}#jl-quick-nav span{left:42px}}',
    '@media(max-height:610px){#jl-quick-nav{gap:2px;padding:4px 3px}#jl-quick-nav button,#jl-quick-nav a{width:31px;height:31px;font-size:11px}}',
    '@media(prefers-reduced-motion:reduce){#jl-quick-nav button,#jl-quick-nav a,#jl-quick-nav span{transition:none}}'
  ].join('');
  document.head.appendChild(style);

  var nav=document.createElement('nav');
  nav.id='jl-quick-nav';
  nav.setAttribute('aria-label','工作快捷鍵');

  function routeUrl(route){ return 'index.html?route='+encodeURIComponent(route); }

  items.forEach(function(item){
    var node;
    if(item.route){
      node=document.createElement('button');
      node.type='button';
      node.dataset.jlQuickRoute=item.route;
      node.addEventListener('click',function(){
        if(typeof window.jlOpenFeature==='function') window.jlOpenFeature(item.route);
        else{
          try{ sessionStorage.setItem('jlf-shortcut-route',item.route); }catch(e){}
          location.href=routeUrl(item.route);
        }
      });
    }else{
      node=document.createElement('a');
      node.href=item.href;
    }
    node.dataset.jlQuickKey=item.key;
    node.setAttribute('aria-label',item.label);
    node.title=item.label;
    node.innerHTML=item.mark+'<span>'+item.label+'</span>';
    nav.appendChild(node);
  });
  document.body.appendChild(nav);

  function setActive(key){
    nav.querySelectorAll('[data-jl-quick-key]').forEach(function(node){
      var active=node.dataset.jlQuickKey===key;
      node.classList.toggle('is-active',active);
      if(active) node.setAttribute('aria-current','page');
      else node.removeAttribute('aria-current');
    });
  }
  if(document.body.classList.contains('jl-page-bxcc')) setActive('八星');
  else if(document.body.classList.contains('jl-page-rz')) setActive('日子');
  else setActive(document.body.classList.contains('jlf-feature-mode')?'':'home');
  document.addEventListener('jl:route-change',function(event){
    setActive(event.detail&&event.detail.route?event.detail.route:'home');
  });
})();
