/* =========================================================
   筠玲易數｜真 HTML 首頁｜自查正式版
   禁止：整頁設計圖、透明座標按鈕
   保留：原排盤與外掛功能核心
   ========================================================= */
(function(){
'use strict';

function boot(){
  if(document.documentElement.dataset.jlFinalHome==='1') return;
  document.documentElement.dataset.jlFinalHome='1';

  const wrap=document.querySelector('.wrap');
  if(!wrap) return;

  /* 原網站完整收進功能層 */
  const feature=document.createElement('div');
  feature.id='jl-feature-shell-final';
  [...wrap.children].forEach(n=>feature.appendChild(n));
  wrap.appendChild(feature);

  const out=feature.querySelector('#out');
  const go=feature.querySelector('#go');
  const paipan=(go && go.closest('.card')) || feature.querySelector('#paipan') || feature.querySelector('.card');

  if(paipan) paipan.id=paipan.id || 'paipan';

  /* 舊總入口不重複顯示 */
  [...feature.querySelectorAll('.card')].forEach(card=>{
    const t=(card.textContent||'').replace(/\s+/g,'');
    if(t.includes('功能選單')) card.classList.add('jl-old-menu-final');
  });

  const home=document.createElement('main');
  home.id='jl-home-final';

  home.innerHTML=`
<header class="jlf-header">
  <button class="jlf-brand" type="button" id="jlf-home">
    <span class="jlf-seal">筠</span>
    <strong>筠玲易數</strong>
  </button>

  <nav class="jlf-nav">
    <a href="#jl-home-final">首頁</a>
    <a href="#jlf-tools">命理知識</a>
    <a href="#jlf-contact">聯絡我們</a>
  </nav>

  <button class="jlf-my" type="button" data-jlf-route="四柱">
    ☯ 我的命盤
  </button>
</header>


<section class="jlf-hero">

  <div class="jlf-hero-art" role="img" aria-label="筠玲老師"></div>

  <div class="jlf-hero-copy">

    <div class="jlf-kicker">
      ✦ 以數觀象 · 以卦察勢 · 以理明心 ✦
    </div>

    <h1>筠玲易數</h1>

    <h2>
      解析命運的軌跡 · 掌握人生的方向
    </h2>

    <p>
      結合傳統命理智慧與現代視角
      <br>
      協助您了解自己 · 趨吉避凶 · 創造更好的人生
    </p>

  </div>


  <div class="jlf-quote">
    命，不是定局；
    <br>
    看懂自己的局，
    <br>
    才知道下一步怎麼走。

    <b>
      筠玲老師
    </b>
  </div>

</section>


<div class="jlf-section-title">
  ✦ 探索命理智慧 · 開啟人生新局 ✦
</div>


<section class="jlf-tools" id="jlf-tools">

  <div class="jlf-grid">


    <!-- 四柱八字 -->

    <article class="jlf-card">

      <div class="jlf-badge">
        <img src="badge-bazi-v1.webp" alt="四柱八字 年月日時徽章">
      </div>

      <h3>四柱八字</h3>

      <p>
        生辰排盤 · 命運解析
      </p>

      <small>
        先天 × 後天 × 五行
        <br>
        大運 × 流年 × 格局
      </small>

      <button
        type="button"
        data-jlf-route="四柱">

        進入解析 ›

      </button>

    </article>


    <!-- 紫微 / 九宮 -->

    <article class="jlf-card">

      <div class="jlf-badge">
        <img src="badge-jiugong-v1.webp" alt="紫微九宮 洛書九宮徽章">
      </div>

      <h3>紫微／九宮</h3>

      <p>
        命盤解析 · 宮位星曜
      </p>

      <small>
        宮位 × 星曜 × 格局
        <br>
        吉凶 × 組合 × 解析
      </small>

      <button
        type="button"
        data-jlf-route="九宮">

        進入解析 ›

      </button>

    </article>


    <!-- 奇門遁甲 -->

    <article class="jlf-card">

      <div class="jlf-badge">
        <img src="badge-qimen-v1.webp" alt="奇門遁甲 太極八卦徽章">
      </div>

      <h3>奇門遁甲</h3>

      <p>
        問事決策 · 趨吉避凶
      </p>

      <small>
        時間 × 方位 × 局勢
        <br>
        開門 × 落宮 × 值符
      </small>

      <button
        type="button"
        data-jlf-route="奇門">

        進入解析 ›

      </button>

    </article>


    <!-- 六壬 / 六親 -->

    <article class="jlf-card">

      <div class="jlf-badge">
        <img src="badge-liuren-v1.webp" alt="六壬六親文字徽章">
      </div>

      <h3>六壬／六親</h3>

      <p>
        事情推演 · 事件解析
      </p>

      <small>
        關係 × 事件 × 發展
        <br>
        占斷 × 判事 × 應驗
      </small>

      <button
        type="button"
        data-jlf-route="六親">

        進入解析 ›

      </button>

    </article>


    <!-- 八星磁場 -->

    <article class="jlf-card">

      <div class="jlf-badge">
        <img src="badge-baxing-v1.webp" alt="八星磁場 星象連線徽章">
      </div>

      <h3>八星磁場</h3>

      <p>
        數字能量 · 磁場解析
      </p>

      <small>
        手機 × 車牌 × 門牌
        <br>
        數字 × 能量 × 吉凶
      </small>

      <a href="bxcc.html">
        進入解析 ›
      </a>

    </article>


    <!-- 流年運勢 -->

    <article class="jlf-card">

      <div class="jlf-badge">
        <img src="badge-liunian-v1.webp" alt="流年運勢 上升趨勢徽章">
      </div>

      <h3>流年運勢</h3>

      <p>
        年度運勢 · 流月解析
      </p>

      <small>
        年度 × 月運 × 日運
        <br>
        趨勢 × 提醒 × 建議
      </small>

      <button
        type="button"
        data-jlf-route="流年">

        進入解析 ›

      </button>

    </article>


  </div>

</section>


<section class="jlf-date">

  <div class="jlf-date-copy">

    <h2>
      擇吉看日
    </h2>

    <p>
      結婚 · 開業 · 搬家 · 簽約 · 出行 · 入宅 · 動土 · 祈福
    </p>

    <p>
      選一個適合您的好日子，讓重要的事情更順利、更圓滿。
    </p>

    <a href="rz.html">
      開始看日子 ›
    </a>

  </div>


  <div class="jlf-date-scene" aria-hidden="true">

    <div class="jlf-window"></div>

    <div class="jlf-vase">
      <i></i>
      <i></i>
      <i></i>
    </div>

    <div class="jlf-calendar">
      <span>吉</span>
      <b>日</b>
    </div>

  </div>

</section>


<section class="jlf-contact" id="jlf-contact">

  <div class="jlf-consult">

    <div class="jlf-mini-teacher" role="img" aria-label="筠玲老師"></div>

    <div>

      <h3>
        需要進一步命理解讀？
      </h3>

      <p>
        筠玲老師提供一對一專業諮詢服務，深入分析您的命盤。
      </p>

    </div>

  </div>


  <a
    class="jlf-line"
    href="https://line.me/ti/p/@804kmmmy">

    <span class="jlf-line-icon">
      LINE
    </span>

    <div>

      <b>
        加入筠玲老師 LINE
      </b>

      <small>
        LINE ID：@804kmmmy
      </small>

    </div>

    <em>
      ›
    </em>

  </a>

</section>


<footer class="jlf-footer">

  <span>✦ 專業可靠</span>

  <span>☆ 經驗豐富</span>

  <span>♡ 用心解盤</span>

  <span>▣ 隱私保密</span>

  <small>
    © 2026 筠玲易數 · All Rights Reserved.
  </small>

</footer>
`;

  wrap.insertBefore(home,feature);


  /* 返回首頁 */

  const back=document.createElement('button');

  back.id='jlf-back';

  back.type='button';

  back.textContent='← 回到功能首頁';

  feature.insertBefore(
    back,
    feature.firstChild
  );

  const innerHead=document.createElement('header');
  innerHead.id='jli-head';
  innerHead.innerHTML=`
    <div class="jli-top">
      <button class="jli-brand" type="button"><span>筠</span><b>筠玲易數<small>命理智慧・人生方向</small></b></button>
      <button class="jli-home" type="button">返回首頁</button>
    </div>
    <div class="jli-hero">
      <div><em>命理排盤・專業解析</em><h1 id="jli-title">四柱八字</h1><p id="jli-desc">以出生年月日時建立命盤，理解五行配置與人生節奏。</p></div>
      <img id="jli-icon" src="badge-bazi-v1.webp" alt="">
    </div>
    <nav class="jli-steps" aria-label="內頁功能導覽">
      <button type="button" data-jli-route="四柱">四柱八字</button>
      <button type="button" data-jli-route="九宮">紫微九宮</button>
      <button type="button" data-jli-route="奇門">奇門遁甲</button>
      <button type="button" data-jli-route="六親">六壬六親</button>
      <a href="bxcc.html">八星磁場</a>
      <button type="button" data-jli-route="流年">流年運勢</button>
    </nav>`;
  feature.insertBefore(innerHead,back);


  function showHome(){

    sessionStorage.removeItem('jlf-pending');


    document.body.classList.remove(
      'jlf-feature-mode'
    );

    document.body.classList.add(
      'jlf-home-mode'
    );

    window.scrollTo({
      top:0,
      behavior:'smooth'
    });

  }


  function showFeature(target){

    document.body.classList.remove(
      'jlf-home-mode'
    );

    document.body.classList.add(
      'jlf-feature-mode'
    );

    setTimeout(()=>{

      (
        target ||
        paipan ||
        feature
      ).scrollIntoView({
        behavior:'smooth',
        block:'start'
      });

    },60);

  }


  back.addEventListener(
    'click',
    showHome
  );

  innerHead.querySelector('.jli-home').addEventListener('click',showHome);
  innerHead.querySelector('.jli-brand').addEventListener('click',showHome);


  home
    .querySelector('#jlf-home')
    .addEventListener(
      'click',
      showHome
    );



  /* 功能定位 */

  function clean(s){

    return String(s || '')
      .replace(/\s+/g,'')
      .replace(/[／/｜|·・]/g,'');

  }


  const routeTitles={
    九宮:['奇門數字九宮盤'],
    奇門:['奇門手機號論斷'],
    六親:['六親對照','六親全覽'],
    流年:['流年一至九九']
  };

  const innerMeta={
    四柱:{title:'四柱八字',desc:'以出生年月日時建立命盤，理解五行配置與人生節奏。',icon:'badge-bazi-v1.webp'},
    九宮:{title:'紫微／九宮',desc:'以數字落宮觀察宮位能量、格局與人生方向。',icon:'badge-jiugong-v1.webp'},
    奇門:{title:'奇門遁甲',desc:'由時間、方位與數字落宮，分析處境與決策方向。',icon:'badge-qimen-v1.webp'},
    六親:{title:'六壬／六親',desc:'從命盤關係理解六親互動、事件發展與人生課題。',icon:'badge-liuren-v1.webp'},
    流年:{title:'流年運勢',desc:'查看年度與流月節奏，掌握不同階段的重要趨勢。',icon:'badge-liunian-v1.webp'}
  };

  function setInnerMeta(term){
    const m=innerMeta[term] || innerMeta.四柱;
    innerHead.querySelector('#jli-title').textContent=m.title;
    innerHead.querySelector('#jli-desc').textContent=m.desc;
    innerHead.querySelector('#jli-icon').src=m.icon;
    innerHead.querySelectorAll('[data-jli-route]').forEach(function(btn){
      btn.classList.toggle('on',btn.dataset.jliRoute===term);
    });
  }


  function findPlugins(term){
    const direct={
      九宮:'#jg-ph',
      奇門:'#qmNum'
    };
    if(direct[term]){
      const field=feature.querySelector(direct[term]);
      const exact=field && field.closest('.card');
      if(exact && !(out && out.classList.contains('hide') && out.contains(exact))){
        return [exact];
      }
    }

    const names=routeTitles[term] || [term];
    const selectors=
      '#plugs0 .card,' +
      '#plugs .card,' +
      '#plug .card,' +
      '#out .card,' +
      '.card.pro,' +
      'section.card';

    const list=[
      ...feature.querySelectorAll(selectors)
    ];

    return list.filter(card=>{
      if(
        out &&
        out.classList.contains('hide') &&
        out.contains(card)
      ){
        return false;
      }

      const heading=card.querySelector('h2,h3');
      const text=clean(
        heading ? heading.textContent : card.textContent
      );

      return names.some(name=>
        text.includes(clean(name))
      );
    });
  }

  function findPlugin(term){
    return findPlugins(term)[0] || null;
  }

  function isNamedPlugin(card){
    const heading=card.querySelector('h2,h3');
    const text=clean(heading ? heading.textContent : '');
    return Object.keys(routeTitles).some(function(key){
      return routeTitles[key].some(function(name){ return text.includes(clean(name)); });
    });
  }

  function hideEmptyCards(){
    feature.querySelectorAll('.card').forEach(function(card){
      const hasUseful=card.querySelector('input,select,button,table,svg,canvas,img,[id^="qm"],[id^="jg"]');
      const hasText=clean(card.textContent).length>0;
      card.classList.toggle('jli-empty-card',!hasUseful&&!hasText);
    });
  }

  function applyRouteView(term){
    hideEmptyCards();
    const cards=[...feature.querySelectorAll('.card')];
    cards.forEach(function(card){ card.classList.add('jli-route-hidden'); });

    if(term==='四柱'){
      if(paipan) paipan.classList.remove('jli-route-hidden');
      if(out && !out.classList.contains('hide')){
        cards.forEach(function(card){
          if(out.contains(card) && !isNamedPlugin(card) &&
             !card.classList.contains('todo') && !card.classList.contains('pro') &&
             !card.classList.contains('jl-old-menu-final')){
            card.classList.remove('jli-route-hidden');
          }
        });
      }
      return;
    }

    const matches=findPlugins(term);
    matches.forEach(function(card){ card.classList.remove('jli-route-hidden'); });
    if(!matches.length && paipan) paipan.classList.remove('jli-route-hidden');
  }


  /* 提示 */

  let notice=null;


  function showNotice(term){

    if(!paipan) return;


    if(!notice){

      notice=
        document.createElement('div');

      notice.id=
        'jlf-route-notice';

      paipan.prepend(
        notice
      );

    }


    const names={

      九宮:'紫微／九宮',

      奇門:'奇門遁甲',

      六親:'六壬／六親',

      流年:'流年運勢'

    };


    notice.textContent=
      '請先完成生辰排盤，完成後會自動進入「' +
      (names[term] || term) +
      '」。';


    notice.classList.add(
      'show'
    );

  }


  function clearNotice(){

    if(notice){

      notice.classList.remove(
        'show'
      );

    }

  }



  /* 真功能路由 */

  function openFeature(term){

    setInnerMeta(term);

    applyRouteView(term);

    sessionStorage.setItem(
      'jlf-pending',
      term
    );


    if(
      term==='四柱'
    ){

      showFeature(
        paipan
      );

      return;

    }


    const target=findPlugin(term);


    if(target){

      clearNotice();

      sessionStorage.removeItem(
        'jlf-pending'
      );

      showFeature(
        target
      );

      return;

    }


    showNotice(
      term
    );


    showFeature(
      paipan
    );

  }

  innerHead.querySelectorAll('[data-jli-route]').forEach(function(btn){
    btn.addEventListener('click',function(){ openFeature(btn.dataset.jliRoute); });
  });

  setTimeout(hideEmptyCards,300);
  setTimeout(hideEmptyCards,1200);


  home
    .querySelectorAll(
      '[data-jlf-route]'
    )
    .forEach(btn=>{

      btn.addEventListener(
        'click',
        ()=>openFeature(
          btn.dataset.jlfRoute
        )
      );

    });



  /* 排盤完成後導向 */

  if(go){

    go.addEventListener(
      'click',
      function(){

        const pending=
          sessionStorage.getItem(
            'jlf-pending'
          );


        if(!pending) return;


        let tries=0;


        const timer=
          setInterval(
            function(){

              tries++;


              if(
                pending==='四柱'
              ){

                if(
                  out &&
                  !out.classList.contains(
                    'hide'
                  )
                ){

                  clearInterval(
                    timer
                  );

                  clearNotice();

                  sessionStorage.removeItem(
                    'jlf-pending'
                  );

                  applyRouteView('四柱');

                  showFeature(
                    out
                  );

                }

              }

              else{

                const target=
                  findPlugin(
                    pending
                  );


                if(target){

                  clearInterval(
                    timer
                  );

                  clearNotice();

                  sessionStorage.removeItem(
                    'jlf-pending'
                  );

                  applyRouteView(pending);

                  showFeature(
                    target
                  );

                }

              }


              if(
                tries>=50
              ){

                clearInterval(
                  timer
                );

              }

            },

            200
          );

      },

      true
    );

  }



  /* CSS */

  const style=
    document.createElement(
      'style'
    );


  style.id=
    'jlf-style';


  style.textContent=`

:root{
  --p:#76129c;
  --p2:#b83fe2;
  --p3:#f0d4ff;
  --gold:#e1b84f;
  --gold2:#f6da7e;
  --deep:#330340;
  --ink:#5a146b;
  --muted:#77677b;
}


html,
body{
  overflow-x:hidden !important;
}


body{
  background:#f7e8ff !important;
}


body.jlf-home-mode .wrap{
  max-width:760px !important;
  margin:0 auto !important;
  padding:0 !important;
}

body.jlf-feature-mode .wrap{
  max-width:560px !important;
  margin:0 auto !important;
  padding:0 18px !important;
}



/* 首頁 / 功能頁分離 */

body.jlf-home-mode
#jl-home-final{
  display:block !important;
}


body.jlf-home-mode
#jl-feature-shell-final{
  display:none !important;
}


body.jlf-feature-mode
#jl-home-final{
  display:none !important;
}


body.jlf-feature-mode
#jl-feature-shell-final{
  display:block !important;
}


#jl-feature-shell-final{
  display:none;
}


#jl-feature-shell-final
.jl-old-menu-final{
  display:none !important;
}


#jl-home-final{
  background:
    linear-gradient(
      180deg,
      #fff 0,
      #fbf2ff 55%,
      #f3dcff 100%
    );
}



/* Header */

.jlf-header{
  width:100%;
  height:48px;
  aspect-ratio:auto;
  margin:0;

  display:flex;
  align-items:center;
  justify-content:space-between;

  padding:0 11px;

  background:
    rgba(255,255,255,.97);

  border-bottom:
    1px solid #e7c4f4;
}


.jlf-brand{
  border:0;
  background:none;
  padding:0;

  display:flex;
  align-items:center;
  gap:6px;

  color:#5e1278;

  font-family:
    "Noto Serif TC",
    serif;
}


.jlf-brand strong{
  font-size:16px;
}


.jlf-seal{
  width:25px;
  height:25px;

  display:grid;
  place-items:center;

  border:
    1.5px solid
    var(--gold);

  border-radius:50%;

  color:
    var(--gold);

  font-size:10px;

  box-shadow:
    0 0 10px
    rgba(225,184,79,.16);
}


.jlf-nav{
  display:flex;
  gap:10px;
}


.jlf-nav a{
  font-size:7px;

  color:#523557;

  text-decoration:none;

  font-weight:800;
}


.jlf-my{
  border:
    1px solid #d88bee;

  border-radius:
    999px;

  padding:
    6px 10px;

  background:
    linear-gradient(
      135deg,
      #6f0d92,
      #b32ed9
    );

  color:#fff;

  font-size:7px;

  font-weight:900;

  box-shadow:
    0 4px 10px
    rgba(82,8,105,.18);
}



/* Hero */

.jlf-hero{
  position:relative;

  height:270px;

  overflow:hidden;

  background:
    linear-gradient(90deg,rgba(255,248,255,.24),transparent 55%),
    url("hero-bg-v3.webp") center/cover no-repeat;
}

.jlf-hero::before{
  content:"";
  position:absolute;
  inset:0;
  height:auto;
  background:linear-gradient(90deg,rgba(255,247,255,.60) 0 38%,rgba(255,247,255,.10) 58%,transparent 72%);
  pointer-events:none;
}

.jlf-hero::after{
  content:"";
  position:absolute;
  right:0;
  top:0;
  width:22%;
  height:100%;
  background:
    repeating-linear-gradient(0deg,rgba(244,211,132,.14) 0 2px,transparent 2px 31px),
    linear-gradient(90deg,transparent,rgba(39,3,52,.62));
  border-left:1px solid rgba(246,218,126,.18);
  pointer-events:none;
}


.jlf-hero-art{
  display:none;
}

.jlf-hero-art::before{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(90deg,rgba(239,210,255,.55),transparent 32%);
  border-radius:inherit;
}


.jlf-hero-copy{
  position:relative;

  z-index:5;

  width:53%;

  padding:
    28px 0 0 22px;
}


.jlf-kicker{
  font-size:7px;

  color:#70178d;

  font-weight:900;

  letter-spacing:.08em;
}


.jlf-hero h1{
  margin:
    8px 0 5px !important;

  color:
    #601078 !important;

  font-family:
    "Noto Serif TC",
    serif !important;

  font-size:
    32px !important;

  line-height:
    1 !important;

  text-indent:
    0 !important;
}


.jlf-hero h2{
  margin:
    0 !important;

  color:
    #bc662f !important;

  font-size:
    10px !important;

  line-height:
    1.42 !important;
}


.jlf-hero p{
  margin-top:10px;

  color:#5f4a64;

  font-size:6.5px;

  line-height:1.55;
}


.jlf-quote{
  position:absolute;

  z-index:6;

  right:2.5%;
  top:34%;

  width:17.5%;

  color:#fff;

  font-size:6.5px;

  line-height:1.62;

  text-shadow:
    0 2px 5px
    rgba(38,3,50,.72);
}


.jlf-quote b{
  display:block;

  margin-top:4px;

  color:#f1d16b;

  font-size:8px;
}



/* 標題 */

.jlf-section-title{
  height:34px;

  display:flex;
  align-items:center;
  justify-content:center;

  background:
    linear-gradient(
      90deg,
      #fff8ff,
      #edccff,
      #fff8ff
    );

  color:#50135f;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:11px;

  font-weight:900;
}



/* 六大卡片 */

.jlf-tools{
  padding:
    8px 9px 9px;
}


.jlf-grid{
  display:grid;

  grid-template-columns:
    repeat(
      3,
      minmax(0,1fr)
    );

  gap:7px;
}


.jlf-card{
  height:124px;

  padding:
    7px 3px 6px;

  text-align:center;

  border:
    1px solid #d8a1ea;

  border-radius:13px;

  background:
    linear-gradient(
      180deg,
      #fff 0%,
      #fff8ff 100%
    );

  box-shadow:
    0 6px 15px
    rgba(96,16,125,.10);
}


.jlf-badge{
  position:relative;

  width:50px;
  height:50px;

  margin:
    0 auto 5px;

  display:grid;
  place-items:center;

  border:0;
  background:transparent;
}

.jlf-badge::before{
  content:"";
  position:absolute;
  inset:-8px;
  border-radius:50%;
  background:radial-gradient(circle,rgba(245,211,104,.26),transparent 64%);
  filter:blur(3px);
  z-index:-1;
}


.jlf-badge::after{
  content:none;
}

.jlf-badge img{
  display:block;
  width:100%;
  height:100%;
  object-fit:contain;
  filter:drop-shadow(0 5px 6px rgba(70,7,89,.34));
}


.jlf-badge svg{
  width:38px;
  height:38px;

  fill:none;

  stroke:
    var(--gold2);

  stroke-width:1.8;

  filter:
    drop-shadow(
      0 1px 1px
      rgba(42,2,51,.5)
    );
}


.jlf-badge svg text{
  fill:
    var(--gold2);

  stroke:none;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:13px;

  font-weight:900;
}

.jlf-badge svg .badge-char{
  font-size:15px;
  text-anchor:middle;
  dominant-baseline:middle;
}

.jlf-badge svg .badge-word{
  font-size:15px;
  letter-spacing:2px;
  text-anchor:middle;
}

.jlf-badge svg .trigram{
  font-family:serif;
  font-size:10px;
  text-anchor:middle;
}


.jlf-badge .ring2{
  stroke:
    rgba(246,218,126,.9);
}


.jlf-badge-text{
  display:flex;

  flex-direction:column;

  justify-content:center;

  color:
    var(--gold2);

  font-family:
    "Noto Serif TC",
    serif;

  font-size:10px;

  line-height:1.08;

  text-shadow:
    0 1px 2px
    #3b0646;
}


.jlf-card h3{
  margin:
    0 0 2px;

  color:#61117a;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:10px;

  white-space:nowrap;
}


.jlf-card p{
  margin:0;

  color:#57485c;

  font-size:6px;

  white-space:nowrap;
}


.jlf-card small{
  display:block;

  margin-top:2px;

  color:#78677b;

  font-size:5px;

  line-height:1.2;
}


.jlf-card button,
.jlf-card > a{
  width:76px;
  height:20px;

  display:inline-flex;
  align-items:center;
  justify-content:center;

  margin-top:4px;

  border:1px solid rgba(241,203,102,.62);

  border-radius:999px;

  padding:0 8px;

  background:
    linear-gradient(
      135deg,
      #6e0c90,
      #a92bd1
    );

  color:#fff;

  text-decoration:none;

  font-size:5.7px;

  font-weight:900;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.22),
    0 4px 9px rgba(82,9,105,.22);
}



/* 擇吉看日 */

.jlf-date{
  min-height:126px;

  margin:
    0 9px 7px;

  display:flex;

  overflow:hidden;

  border:
    1px solid #d19ae5;

  border-radius:12px;

  background:
    linear-gradient(90deg,rgba(255,244,255,.92) 0 43%,rgba(255,244,255,.28) 62%,transparent 78%),
    url("date-banner-v3.webp") center/cover no-repeat;

  box-shadow:
    0 6px 15px
    rgba(100,17,128,.10);
}


.jlf-date-copy{
  position:relative;

  z-index:3;

  width:56%;

  padding:
    15px 0 13px 17px;
}


.jlf-date h2{
  margin:0;

  color:#601078;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:20px;
}


.jlf-date p{
  margin:
    2px 0;

  color:#5c4960;

  font-size:6.4px;
  line-height:1.45;
}


.jlf-date a{
  width:98px;
  height:26px;

  display:inline-flex;
  align-items:center;
  justify-content:center;

  margin-top:3px;

  padding:0 14px;

  border-radius:
    999px;

  border:1px solid rgba(244,214,124,.74);

  background:linear-gradient(135deg,#6e0c90,#a92bd1);

  color:#fff;

  text-decoration:none;

  font-size:7px;

  font-weight:900;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.24),
    0 5px 12px rgba(82,9,105,.22);
}


.jlf-date-scene{
  display:none;
}


.jlf-window{
  position:absolute;

  right:0;
  top:0;

  width:100%;
  height:70%;

  background:
    radial-gradient(
      circle at 75% 28%,
      rgba(255,248,210,.7),
      transparent 13%
    ),

    linear-gradient(
      165deg,
      transparent 0 42%,
      rgba(86,33,116,.28)
      43% 50%,
      transparent 51% 58%,
      rgba(72,24,99,.18)
      59% 66%,
      transparent 67%
    );
}


.jlf-vase{
  position:absolute;

  right:11%;
  bottom:12%;

  width:20px;
  height:28px;

  border-radius:
    7px 7px 10px 10px;

  background:
    linear-gradient(
      145deg,
      #fff8ef,
      #e4c5ee
    );

  box-shadow:
    0 4px 7px
    rgba(65,7,83,.16);
}


.jlf-vase i{
  position:absolute;

  bottom:22px;
  left:9px;

  width:1px;
  height:27px;

  background:#6e3f61;

  transform-origin:bottom;
}


.jlf-vase i:nth-child(1){
  transform:
    rotate(-24deg);
}


.jlf-vase i:nth-child(2){
  transform:
    rotate(4deg);
}


.jlf-vase i:nth-child(3){
  transform:
    rotate(28deg);
}


.jlf-calendar{
  position:absolute;

  left:8%;
  bottom:11%;

  width:46px;
  height:49px;

  border:
    1px solid
    var(--gold);

  border-radius:7px;

  background:#fff9e8;

  display:flex;

  flex-direction:column;

  align-items:center;

  justify-content:center;

  color:#82178f;

  box-shadow:
    0 4px 9px
    rgba(61,8,76,.16);
}


.jlf-calendar span{
  font-size:8px;
}


.jlf-calendar b{
  font-size:15px;
}



/* 諮詢 / LINE */

.jlf-contact{
  margin:
    0 9px 7px;

  padding:6px;

  border:
    1px solid #d9aaeb;

  border-radius:11px;

  background:#fff;
}


.jlf-consult{
  display:flex;

  align-items:center;

  gap:7px;

  padding-bottom:5px;
}


.jlf-mini-teacher{
  width:38px;
  height:45px;
  flex:0 0 auto;
  border-radius:7px;
  background-image:url("hero-bg-v3.webp");
  background-repeat:no-repeat;
  background-size:auto 185%;
  background-position:70% 38%;
}


.jlf-consult h3{
  margin:0;

  color:#61117a;

  font-size:8px;
}


.jlf-consult p{
  margin:
    2px 0 0;

  color:#6d5d70;

  font-size:5.5px;
}


.jlf-line{
  height:33px;

  display:flex;

  align-items:center;

  gap:7px;

  padding:
    5px 7px;

  border:
    1px solid #dfbdec;

  border-radius:8px;

  color:inherit;

  text-decoration:none;
}


.jlf-line-icon{
  width:22px;
  height:22px;

  display:grid;

  place-items:center;

  border-radius:50%;

  background:#29c747;

  color:#fff;

  font-size:4px;
}


.jlf-line b{
  display:block;

  color:#61117a;

  font-size:7px;
}


.jlf-line small{
  display:block;

  color:#746278;

  font-size:5.5px;
}


.jlf-line em{
  margin-left:auto;

  width:20px;
  height:20px;

  display:grid;

  place-items:center;

  border-radius:50%;

  background:#8517aa;

  color:#fff;

  font-style:normal;
}



/* Footer */

.jlf-footer{
  position:relative;
  min-height:42px;
  margin:0;
  aspect-ratio:auto;

  display:grid;

  grid-template-columns:
    repeat(4,1fr);

  gap:4px;

  padding:
    7px 8px 5px;

  background:
    linear-gradient(
      90deg,
      #32033e,
      #600f76,
      #32033e
    );

  color:#f1ddf8;

  text-align:center;

  font-size:5.5px;
}


.jlf-footer::before{
  content:none;
}


.jlf-footer small{
  grid-column:
    1/-1;

  color:#c3a8cc;

  font-size:4.7px;
}



/* 功能頁 */

#jlf-back{
  position:sticky;

  top:0;

  z-index:100;

  width:100%;

  border:0;

  padding:
    11px 14px;

  background:
    linear-gradient(
      90deg,
      #4b085f,
      #7c169f
    );

  color:#fff;

  font-weight:900;
}


#jlf-route-notice{
  display:none;

  margin:
    10px 0;

  padding:
    10px 12px;

  border:
    1px solid #d5a1e8;

  border-radius:9px;

  background:#f8eaff;

  color:#611179;

  font-size:11px;

  font-weight:700;

  line-height:1.6;
}


#jlf-route-notice.show{
  display:block;
}



/* 手機維持 3 欄 */

@media(max-width:430px){

  .jlf-nav{
    display:none;
  }

  .jlf-grid{
    grid-template-columns:
      repeat(
        3,
        minmax(0,1fr)
      );
  }

}

`;


  document.head.appendChild(
    style
  );


  showHome();

}


if(
  document.readyState==='loading'
){

  document.addEventListener(
    'DOMContentLoaded',
    boot
  );

}else{

  boot();

}

})();
