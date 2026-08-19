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

  const paipan=feature.querySelector('#paipan') || feature.querySelector('.card');
  const out=feature.querySelector('#out');
  const go=feature.querySelector('#go');

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

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <circle class="ring2" cx="50" cy="50" r="35"></circle>
          <circle cx="50" cy="50" r="19"></circle>
          <path d="M50 31a19 19 0 1 0 0 38a9.5 9.5 0 1 1 0-19a9.5 9.5 0 1 0 0-19"></path>
          <circle cx="50" cy="40.5" r="2.4"></circle>
          <circle cx="50" cy="59.5" r="2.4"></circle>
          <path d="M31 23h14m10 0h14M31 77h14m10 0h14M23 31v14m0 10v14M77 31v14m0 10v14"></path>

        </svg>

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

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <rect
            class="ring2"
            x="22"
            y="22"
            width="56"
            height="56"
            rx="4">
          </rect>

          <path
            d="
              M41 22v56
              M59 22v56
              M22 41h56
              M22 59h56
            ">
          </path>

          <text x="29" y="36">4</text>
          <text x="48" y="36">9</text>
          <text x="67" y="36">2</text>

          <text x="29" y="55">3</text>
          <text x="48" y="55">5</text>
          <text x="67" y="55">7</text>

          <text x="29" y="74">8</text>
          <text x="48" y="74">1</text>
          <text x="67" y="74">6</text>

        </svg>

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

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <polygon
            class="ring2"
            points="50,15 76,24 85,50 76,76 50,85 24,76 15,50 24,24">
          </polygon>

          <circle
            cx="50"
            cy="50"
            r="22">
          </circle>

          <path
            d="
              M50 28
              a22 22 0 1 0 0 44
              a11 11 0 1 1 0-22
              a11 11 0 1 0 0-22
            ">
          </path>

          <circle cx="50" cy="39" r="2.5"></circle>
          <circle cx="50" cy="61" r="2.5"></circle>

        </svg>

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
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle class="ring2" cx="50" cy="50" r="35"></circle>
          <path d="M29 62L40 37L53 52L68 31L75 66L54 73Z"></path>
          <circle cx="29" cy="62" r="3.4"></circle>
          <circle cx="40" cy="37" r="3.4"></circle>
          <circle cx="53" cy="52" r="3.4"></circle>
          <circle cx="68" cy="31" r="3.4"></circle>
          <circle cx="75" cy="66" r="3.4"></circle>
          <circle cx="54" cy="73" r="3.4"></circle>
        </svg>
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

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <circle class="ring2" cx="50" cy="50" r="35"></circle>
          <path d="M50 24l3.6 10.4L64 38l-10.4 3.6L50 52l-3.6-10.4L36 38l10.4-3.6ZM31 49l2.6 7.4L41 59l-7.4 2.6L31 69l-2.6-7.4L21 59l7.4-2.6ZM68 51l3 8.5L80 62.5l-9 3L68 74l-3-8.5L56 62.5l9-3Z"></path>
          <circle cx="49" cy="67" r="3.5"></circle>

        </svg>

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

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <circle
            class="ring2"
            cx="50"
            cy="50"
            r="35">
          </circle>

          <path
            d="
              M26 70h10V58
              h10v12
              h10V45
              h10v25
              h10V31
            ">
          </path>

          <path d="M67 31h9v9"></path>

        </svg>

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


  function findPlugin(term){
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

    return list.find(card=>{
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
    }) || null;
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


    const target=
      findPlugin(term);


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

  width:46px;
  height:46px;

  margin:
    0 auto 5px;

  display:grid;
  place-items:center;

  border-radius:50%;

  border:
    2px solid
    var(--gold);

  background:
    radial-gradient(
      circle at 34% 25%,
      #d06af2 0,
      #8d25ba 37%,
      #4b075f 78%
    );

  box-shadow:
    inset
    0 0 0 2px
    rgba(255,235,163,.18),

    inset
    0 0 13px
    rgba(255,203,104,.18),

    0 4px 10px
    rgba(72,6,92,.30),

    0 0 0 1px
    rgba(120,42,144,.18);
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
  content:"";

  position:absolute;
  inset:3px;

  border-radius:50%;

  border:
    1px solid
    rgba(255,226,126,.46);

  pointer-events:none;
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
