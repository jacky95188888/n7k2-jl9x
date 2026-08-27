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
    { key:'日子', label:'擇吉看日', mark:'日', href:'rz.html' },
    { key:'桃花', label:'桃花神數', mark:'桃', href:'taohua.html' }
  ];

  var style=document.createElement('style');
  style.id='jl-quick-nav-style';
  style.textContent=[
    '#jl-quick-nav{position:fixed;left:max(7px,env(safe-area-inset-left));top:50%;z-index:9500;transform:translateY(-50%);display:flex;flex-direction:column;gap:6px;padding:8px 6px;border:1px solid #e1bd5f;border-radius:999px;background:linear-gradient(180deg,#33043eea,#681078ed);box-shadow:0 12px 30px #2b023a55,inset 0 1px #ffffff2e;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}',
    '#jl-quick-nav:before{content:"工作";padding:2px 0 4px;color:#f1d986;font:800 8px/1 sans-serif;letter-spacing:.16em;text-align:center}',
    '#jl-quick-nav button,#jl-quick-nav a{position:relative;width:40px;height:40px;display:grid;place-items:center;padding:0;border:1px solid #e4c56788;border-radius:50%;color:#f3dda0;background:#ffffff0d;box-shadow:inset 0 0 0 3px #ffffff08;text-decoration:none;font:900 14px "Noto Serif TC","Songti TC",serif;cursor:pointer}',
    '#jl-quick-nav span{position:absolute;left:49px;top:50%;transform:translateY(-50%);width:max-content;padding:7px 10px;border:1px solid #e2c362;border-radius:999px;color:#f5dfa0;background:#3c0448f2;font:800 11px/1 sans-serif;opacity:0;visibility:hidden}',
    '#jl-quick-nav button:hover span,#jl-quick-nav a:hover span{opacity:1;visibility:visible}',
    '#jl-quick-toggle{display:none!important}',
    '@media(max-width:760px){#jl-quick-nav{left:max(4px,env(safe-area-inset-left));gap:4px;padding:7px 5px}#jl-quick-nav:before{display:none}#jl-quick-nav button,#jl-quick-nav a{width:36px;height:36px;font-size:12px}#jl-quick-toggle{position:absolute!important;right:-28px;top:50%;display:grid!important;width:23px!important;height:42px!important;transform:translateY(-50%)!important;border:1px solid #dfbe61!important;border-left:0!important;border-radius:0 999px 999px 0!important;color:#f6dda0!important;background:#5d0b6d!important}#jl-quick-nav.jl-collapsed{transform:translate(calc(-100% - 5px),-50%)}}'
  ].join('');
  document.head.appendChild(style);

  var nav=document.createElement('nav');
  nav.id='jl-quick-nav';
  var toggle=document.createElement('button');
  toggle.id='jl-quick-toggle'; toggle.type='button'; toggle.textContent='›'; nav.appendChild(toggle);
  if(window.matchMedia('(max-width:760px)').matches) nav.classList.add('jl-collapsed');
  toggle.addEventListener('click',function(){ nav.classList.toggle('jl-collapsed'); });
  items.forEach(function(item){
    var node=item.route?document.createElement('button'):document.createElement('a');
    if(item.route){ node.type='button'; node.addEventListener('click',function(){ if(typeof window.jlOpenFeature==='function') window.jlOpenFeature(item.route); else location.href='index.html?route='+encodeURIComponent(item.route); }); }
    else node.href=item.href;
    node.innerHTML=item.mark+'<span>'+item.label+'</span>'; nav.appendChild(node);
  });
  document.body.appendChild(nav);
})();

/* 天衡｜四大命書首頁區塊：直接由 index.html 已載入的 quick-nav.js 建立 */
(function(){
  'use strict';
  if(!/\/index\.html$|\/$/.test(location.pathname) || document.getElementById('th-life-books')) return;
  var host=document.querySelector('.wrap') || document.body;
  var section=document.createElement('section');
  section.id='th-life-books';
  section.innerHTML='<div class="th-book-head"><small>TIANHENG LIFE GUIDANCE</small><h2>四大命書</h2><p>從感情、事業、健康到財富，把命盤化成能真正讀懂的人生建議。</p></div><div class="th-book-grid"><article><b>緣</b><h3>感情命書</h3><p>看見你的情感模式、相處盲點與關係走向。</p><button data-book="love">免費展開</button></article><article><b>業</b><h3>事業命書</h3><p>解析工作天賦、職涯節奏與近期行動方向。</p><button data-book="career">免費展開</button></article><article><b>養</b><h3>健康命書</h3><p>從生活節奏出發，整理值得留意的身心平衡提醒。</p><button data-book="health">免費展開</button></article><article><b>財</b><h3>財富命書</h3><p>理解你的金錢性格、累積方式與財務決策傾向。</p><button data-book="wealth">免費展開</button></article></div><div id="th-book-reading" hidden></div><div class="th-book-foot"><p>目前四大命書全數免費開放。付費功能尚未啟用。</p><a href="https://line.me/R/ti/p/@788ldzke" rel="noopener">LINE 諮詢 @788ldzke</a></div>';
  var css=document.createElement('style');
  css.textContent='#th-life-books{margin:28px 0;padding:26px 18px;border:1px solid #cdbb91;background:linear-gradient(145deg,#fffdf8,#f3ead8);box-shadow:0 14px 40px #50350e14}.th-book-head{text-align:center}.th-book-head small{color:#9b762f;letter-spacing:.18em;font-size:10px}.th-book-head h2{margin:8px 0 10px;font-size:25px}.th-book-head p{margin:0 auto 20px;max-width:420px;color:#716354}.th-book-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.th-book-grid article{padding:18px 14px;border:1px solid #ddcfb0;background:#fffefa;text-align:center}.th-book-grid article>b{display:grid;place-items:center;width:42px;height:42px;margin:auto;border:1px solid #b18a3d;border-radius:50%;color:#8a2323;font:700 20px serif}.th-book-grid h3{margin:10px 0 6px;color:#4b3525}.th-book-grid p{min-height:54px;margin:0 0 12px;color:#75695e;font-size:13px;line-height:1.7}.th-book-grid button{width:100%;padding:11px;border:0;background:#7d1d1d;color:#fff;font-weight:700;letter-spacing:.12em}.th-book-foot{text-align:center;margin-top:18px}.th-book-foot p{font-size:12px;color:#7b6d60}.th-book-foot a{display:inline-block;padding:10px 18px;border:1px solid #9d7b3c;color:#6f5120;text-decoration:none}#th-book-reading{margin-top:14px;padding:18px;border-left:3px solid #a77d30;background:#fff;color:#55483d;line-height:1.9}@media(max-width:430px){.th-book-grid{grid-template-columns:1fr}.th-book-grid p{min-height:0}}';
  document.head.appendChild(css);
  host.appendChild(section);
  var texts={love:'感情命書｜先理解自己在關係裡真正需要的是安全感、空間，還是被理解。命理內容適合作為自我整理與關係反思，不取代現實溝通。',career:'事業命書｜把天賦、工作節奏與目前處境一起看，重點不是預言職位，而是找出更適合你的選擇與行動順序。',health:'健康命書｜此區提供生活節奏與身心平衡的命理提醒，不做疾病診斷；若有身體不適，仍應尋求合格醫療專業協助。',wealth:'財富命書｜從金錢性格與決策習慣理解自己的財務模式，內容不構成投資建議，重要財務決策仍應依實際風險與能力評估。'};
  section.addEventListener('click',function(e){var b=e.target.closest('[data-book]');if(!b)return;var r=document.getElementById('th-book-reading');r.hidden=false;r.textContent=texts[b.dataset.book]||'';r.scrollIntoView({behavior:'smooth',block:'center'});});
})();
