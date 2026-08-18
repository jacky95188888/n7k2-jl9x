/* =========================================================
   筠玲易數｜真正 HTML 首頁｜正式重建版
   ---------------------------------------------------------
   核心原則：
   1. MASTER 不再整張當首頁
   2. 沒有 hotspot / 沒有透明熱區
   3. 六張功能卡全部是真 HTML
   4. 圖示全部是真 SVG
   5. 按鈕全部是真 button / a
   6. 原本排盤 / 九宮 / 奇門 / 六親 / 流年核心保留
   7. MASTER 只裁 Hero 右側人物＋紫色背景藝術
   ========================================================= */

(function(){
'use strict';

function onReady(fn){
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', fn);
  }else{
    fn();
  }
}

onReady(function(){

  if(document.documentElement.dataset.jlHtmlHome === '1'){
    return;
  }

  document.documentElement.dataset.jlHtmlHome = '1';

  const wrap = document.querySelector('.wrap');

  if(!wrap){
    console.warn('筠玲易數：找不到 .wrap');
    return;
  }


  /* =====================================================
     1. 保留原本網站全部功能
     ===================================================== */

  const featureShell = document.createElement('div');
  featureShell.id = 'jl-feature-shell';

  Array.from(wrap.children).forEach(function(node){
    featureShell.appendChild(node);
  });

  wrap.appendChild(featureShell);


  const paipan =
    featureShell.querySelector('#paipan') ||
    featureShell.querySelector('.card');

  const out =
    featureShell.querySelector('#out');

  const go =
    featureShell.querySelector('#go');


  if(paipan){
    paipan.id = paipan.id || 'paipan';
  }


  /* 舊功能選單隱藏，避免跟新首頁重複 */
  Array.from(
    featureShell.querySelectorAll('.card')
  ).forEach(function(card){

    const txt = String(card.textContent || '')
      .replace(/\s+/g,'');

    if(txt.includes('功能選單')){
      card.classList.add('jl-old-menu-hidden');
    }

  });



  /* =====================================================
     2. 真正 HTML 首頁
     ===================================================== */

  const home = document.createElement('main');
  home.id = 'jl-html-home';

  home.innerHTML = `

<header class="jlh-header">

  <button
    type="button"
    class="jlh-brand"
    id="jlh-brand">

    <span class="jlh-seal">
      筠
    </span>

    <strong>
      筠玲易數
    </strong>

  </button>


  <nav class="jlh-nav">

    <a href="#jl-html-home">
      首頁
    </a>

    <a href="#jlh-tools">
      命理知識
    </a>

    <a href="#jlh-contact">
      聯絡我們
    </a>

  </nav>


  <button
    type="button"
    class="jlh-my"
    data-jlh-route="四柱">

    ☯ 我的命盤

  </button>

</header>



<section class="jlh-hero">

  <div class="jlh-hero-copy">

    <div class="jlh-kicker">
      ✦ 以數觀象 · 以卦察勢 · 以理明心 ✦
    </div>

    <h1>
      筠玲易數
    </h1>

    <h2>
      解析命運的軌跡 · 掌握人生的方向
    </h2>

    <p>
      結合傳統命理智慧與現代視角
      <br>
      協助您了解自己 · 趨吉避凶 · 創造更好的人生
    </p>

  </div>


  <!--
    MASTER 只在這裡當「局部背景藝術」
    不負責首頁卡片或按鈕
  -->

  <div class="jlh-hero-art"></div>


  <div class="jlh-quote">

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



<div class="jlh-section-title">
  ✦ 探索命理智慧 · 開啟人生新局 ✦
</div>



<section
  class="jlh-tools"
  id="jlh-tools">

  <div class="jlh-grid">


    <!-- 四柱八字 -->

    <article class="jlh-card">

      <div class="jlh-icon">

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <circle cx="50" cy="50" r="42"></circle>

          <path d="M50 12v76M12 50h76"></path>

          <text x="29" y="39">年</text>
          <text x="61" y="39">月</text>

          <text x="29" y="70">日</text>
          <text x="61" y="70">時</text>

        </svg>

      </div>


      <h3>
        四柱八字
      </h3>


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
        data-jlh-route="四柱">

        進入解析 ›

      </button>

    </article>



    <!-- 紫微 / 九宮 -->

    <article class="jlh-card">

      <div class="jlh-icon">

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            rx="4">
          </rect>

          <path d="
            M40 20v60
            M60 20v60
            M20 40h60
            M20 60h60
          "></path>


          <text x="28" y="35">4</text>
          <text x="48" y="35">9</text>
          <text x="68" y="35">2</text>

          <text x="28" y="55">3</text>
          <text x="48" y="55">5</text>
          <text x="68" y="55">7</text>

          <text x="28" y="75">8</text>
          <text x="48" y="75">1</text>
          <text x="68" y="75">6</text>

        </svg>

      </div>


      <h3>
        紫微／九宮
      </h3>


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
        data-jlh-route="九宮">

        進入解析 ›

      </button>

    </article>



    <!-- 奇門遁甲 -->

    <article class="jlh-card">

      <div class="jlh-icon">

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <circle cx="50" cy="50" r="42"></circle>

          <circle cx="50" cy="50" r="27"></circle>

          <path d="
            M50 23
            a27 27 0 1 0 0 54
            a13.5 13.5 0 1 1 0-27
            a13.5 13.5 0 1 0 0-27
          "></path>


          <circle cx="50" cy="36" r="3"></circle>
          <circle cx="50" cy="64" r="3"></circle>


          <path d="
            M50 5v10
            M50 85v10
            M5 50h10
            M85 50h10

            M18 18l7 7
            M75 75l7 7

            M82 18l-7 7
            M25 75l-7 7
          "></path>

        </svg>

      </div>


      <h3>
        奇門遁甲
      </h3>


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
        data-jlh-route="奇門">

        進入解析 ›

      </button>

    </article>



    <!-- 六壬 / 六親 -->

    <article class="jlh-card">

      <div class="jlh-icon jlh-text-icon">

        <strong>
          六壬
        </strong>

        <strong>
          六親
        </strong>

      </div>


      <h3>
        六壬／六親
      </h3>


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
        data-jlh-route="六親">

        進入解析 ›

      </button>

    </article>



    <!-- 八星磁場 -->

    <article class="jlh-card">

      <div class="jlh-icon">

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <circle cx="50" cy="50" r="42"></circle>

          <path d="
            M20 64
            L33 35
            L48 52
            L61 27
            L78 65
            L51 76
            Z
          "></path>

          <circle cx="33" cy="35" r="3"></circle>
          <circle cx="48" cy="52" r="3"></circle>
          <circle cx="61" cy="27" r="3"></circle>
          <circle cx="78" cy="65" r="3"></circle>
          <circle cx="51" cy="76" r="3"></circle>

        </svg>

      </div>


      <h3>
        八星磁場
      </h3>


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

    <article class="jlh-card">

      <div class="jlh-icon">

        <svg viewBox="0 0 100 100" aria-hidden="true">

          <circle cx="50" cy="50" r="42"></circle>

          <path d="
            M22 73h10V58
            h10v15
            h10V45
            h10v28
            h10V31
          "></path>

          <path d="M63 31h9v9"></path>

        </svg>

      </div>


      <h3>
        流年運勢
      </h3>


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
        data-jlh-route="流年">

        進入解析 ›

      </button>

    </article>


  </div>

</section>



<section class="jlh-date">

  <div>

    <h2>
      擇吉看日
    </h2>


    <p>
      結婚 · 開業 · 搬家 · 簽約 · 出行 · 入宅 · 動土 · 祈福
    </p>


    <p>
      選一個適合您的好日子，讓事情順利圓滿。
    </p>


    <a href="rz.html">
      開始看日子 ›
    </a>

  </div>


  <div class="jlh-calendar">

    <span>
      吉
    </span>

    <strong>
      日
    </strong>

  </div>

</section>



<section
  class="jlh-contact"
  id="jlh-contact">

  <div class="jlh-consult">

    <div class="jlh-mini-teacher">
    </div>


    <div>

      <h3>
        需要進一步命理解讀？
      </h3>


      <p>
        筠玲老師提供一對一專業諮詢服務，
        深入分析您的命盤。
      </p>

    </div>

  </div>


  <a
    class="jlh-line"
    href="https://line.me/ti/p/@804kmmmy">

    <span class="jlh-line-icon">
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



<footer class="jlh-footer">

  <span>
    ✦ 專業可靠
  </span>

  <span>
    ☆ 經驗豐富
  </span>

  <span>
    ♡ 用心解盤
  </span>

  <span>
    ▣ 隱私保密
  </span>


  <small>
    © 2026 筠玲易數 · All Rights Reserved.
  </small>

</footer>

`;

  wrap.insertBefore(
    home,
    featureShell
  );



  /* =====================================================
     3. 功能頁返回首頁
     ===================================================== */

  const back = document.createElement('button');

  back.id = 'jlh-back';
  back.type = 'button';
  back.textContent = '← 回到功能首頁';

  featureShell.insertBefore(
    back,
    featureShell.firstChild
  );



  function showHome(){

    document.body.classList.remove(
      'jlh-feature-mode'
    );

    document.body.classList.add(
      'jlh-home-mode'
    );

    window.scrollTo({
      top:0,
      behavior:'smooth'
    });

  }



  function showFeature(target){

    document.body.classList.remove(
      'jlh-home-mode'
    );

    document.body.classList.add(
      'jlh-feature-mode'
    );

    setTimeout(function(){

      const el =
        target ||
        paipan ||
        featureShell;

      if(el){

        el.scrollIntoView({
          behavior:'smooth',
          block:'start'
        });

      }

    },80);

  }



  back.addEventListener(
    'click',
    showHome
  );


  const brand =
    home.querySelector('#jlh-brand');

  if(brand){

    brand.addEventListener(
      'click',
      showHome
    );

  }



  /* =====================================================
     4. 外掛卡片定位
     ===================================================== */

  function cleanText(text){

    return String(text || '')
      .replace(/\s+/g,'')
      .replace(/[／/｜|·・]/g,'');

  }


  const aliases = {

    九宮:[
      '九宮',
      '九宮盤',
      '數字九宮',
      '奇門數字九宮盤'
    ],

    奇門:[
      '奇門遁甲',
      '奇門'
    ],

    六親:[
      '六親',
      '六親解析',
      '六親對照',
      '六壬'
    ],

    流年:[
      '流年運勢',
      '流年'
    ]

  };


  function findPluginCard(term){

    const words =
      aliases[term] ||
      [term];


    const candidates =
      Array.from(
        featureShell.querySelectorAll(
          '#plugs0 .card,' +
          '#plugs .card,' +
          '#plug .card,' +
          '#out .card,' +
          '.card.pro,' +
          'section.card'
        )
      );


    let best = null;
    let bestScore = 0;


    candidates.forEach(function(card){

      const text =
        cleanText(
          card.textContent
        );


      let score = 0;


      words.forEach(function(word){

        const key =
          cleanText(word);


        if(text.startsWith(key)){

          score += 100;

        }else if(text.includes(key)){

          score += 20;

        }

      });


      if(score > bestScore){

        bestScore = score;
        best = card;

      }

    });


    return best;

  }



  /* =====================================================
     5. 提示訊息
     ===================================================== */

  let notice = null;


  function showNotice(term){

    if(!paipan) return;


    if(!notice){

      notice =
        document.createElement('div');

      notice.id =
        'jlh-route-notice';

      paipan.prepend(
        notice
      );

    }


    const names = {

      九宮:'紫微／九宮',

      奇門:'奇門遁甲',

      六親:'六壬／六親',

      流年:'流年運勢'

    };


    notice.textContent =
      '請先完成生辰排盤，排盤完成後會自動進入「' +
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



  /* =====================================================
     6. 真正功能路由
     ===================================================== */

  function openFeature(term){

    sessionStorage.setItem(
      'jlh-pending-feature',
      term
    );


    /* 四柱直接進排盤 */

    if(term === '四柱'){

      showFeature(
        paipan
      );

      return;

    }


    /*
      如果之前已排盤，
      外掛卡片已經存在，
      直接帶到該功能。
    */

    const target =
      findPluginCard(term);


    if(target){

      clearNotice();

      showFeature(
        target
      );


      sessionStorage.removeItem(
        'jlh-pending-feature'
      );


      return;

    }


    /*
      尚未排盤
    */

    showNotice(term);

    showFeature(
      paipan
    );

  }



  home
    .querySelectorAll(
      '[data-jlh-route]'
    )
    .forEach(function(button){

      button.addEventListener(
        'click',
        function(){

          openFeature(
            button.dataset.jlhRoute
          );

        }
      );

    });



  /* =====================================================
     7. 排盤完成後自動跳到指定功能
     ===================================================== */

  if(go){

    go.addEventListener(
      'click',
      function(){

        const pending =
          sessionStorage.getItem(
            'jlh-pending-feature'
          );


        if(!pending){
          return;
        }


        let count = 0;


        const timer =
          setInterval(function(){

            count++;


            /*
              四柱：
              等 #out 顯示後直接帶到結果。
            */

            if(pending === '四柱'){

              if(
                out &&
                !out.classList.contains('hide')
              ){

                clearInterval(timer);

                clearNotice();


                sessionStorage.removeItem(
                  'jlh-pending-feature'
                );


                showFeature(
                  out
                );

              }

            }


            /*
              九宮 / 奇門 / 六親 / 流年：
              等 runPlugins() 產生卡片。
            */

            else{

              const target =
                findPluginCard(
                  pending
                );


              if(target){

                clearInterval(timer);

                clearNotice();


                sessionStorage.removeItem(
                  'jlh-pending-feature'
                );


                showFeature(
                  target
                );


                if(target.animate){

                  target.animate(
                    [
                      {
                        boxShadow:
                          '0 0 0 0 rgba(145,38,194,0)'
                      },
                      {
                        boxShadow:
                          '0 0 0 5px rgba(145,38,194,.25)'
                      },
                      {
                        boxShadow:
                          '0 0 0 0 rgba(145,38,194,0)'
                      }
                    ],
                    {
                      duration:900
                    }
                  );

                }

              }

            }


            if(count >= 50){

              clearInterval(timer);

            }

          },200);

      },
      true
    );

  }



  /* =====================================================
     8. CSS
     ===================================================== */

  const style =
    document.createElement('style');

  style.id =
    'jlh-real-style';


  style.textContent = `

:root{

  --jlh-purple:#76129c;

  --jlh-purple2:#b83fe2;

  --jlh-gold:#e0b44b;

  --jlh-deep:#3d064d;

}


/* ===== 基礎 ===== */

html,
body{

  overflow-x:hidden !important;

}


body{

  background:#f8eaff !important;

}


.wrap{

  max-width:
    760px !important;

  margin:
    0 auto !important;

  padding:
    0 !important;

}


/* ===== 首頁 / 功能頁分離 ===== */

body.jlh-home-mode
#jl-html-home{

  display:
    block !important;

}


body.jlh-home-mode
#jl-feature-shell{

  display:
    none !important;

}


body.jlh-feature-mode
#jl-html-home{

  display:
    none !important;

}


body.jlh-feature-mode
#jl-feature-shell{

  display:
    block !important;

}


#jl-feature-shell{

  display:none;

}


#jl-feature-shell
.jl-old-menu-hidden{

  display:
    none !important;

}


/* ===== Header ===== */

.jlh-header{

  height:48px;

  display:flex;

  align-items:center;

  justify-content:
    space-between;

  padding:
    0 11px;

  background:
    #fff;

  border-bottom:
    1px solid #ebc7f7;

}


.jlh-brand{

  border:0;

  background:none;

  padding:0;

  display:flex;

  align-items:center;

  gap:6px;

  color:#5e117c;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

}


.jlh-brand strong{

  font-size:16px;

}


.jlh-seal{

  width:25px;

  height:25px;

  display:grid;

  place-items:center;

  border:
    1.5px solid
    var(--jlh-gold);

  border-radius:50%;

  color:
    var(--jlh-gold);

  font-size:10px;

}


.jlh-nav{

  display:flex;

  gap:10px;

}


.jlh-nav a{

  color:#583b5e;

  text-decoration:none;

  font-size:7px;

  font-weight:800;

}


.jlh-my{

  border:
    1px solid #d98df0;

  border-radius:999px;

  padding:
    6px 9px;

  background:

    linear-gradient(
      135deg,
      #75119b,
      #b83fe1
    );

  color:#fff;

  font-size:7px;

  font-weight:900;

}


/* ===== Hero ===== */

.jlh-hero{

  position:relative;

  height:260px;

  overflow:hidden;

  background:

    radial-gradient(
      circle at 16% 78%,
      rgba(205,91,245,.38),
      transparent 35%
    ),

    linear-gradient(
      105deg,
      #fffaff 0%,
      #edc5ff 54%,
      #762591 100%
    );

}


.jlh-hero-copy{

  position:relative;

  z-index:5;

  width:52%;

  padding:
    27px 0 0 22px;

}


.jlh-kicker{

  color:#741b91;

  font-size:7px;

  font-weight:900;

  letter-spacing:.08em;

}


.jlh-hero h1{

  margin:
    8px 0 5px !important;

  color:#63107f !important;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif !important;

  font-size:
    31px !important;

  line-height:
    1 !important;

  text-indent:
    0 !important;

}


.jlh-hero h2{

  margin:
    0 !important;

  color:#ba632c !important;

  font-size:
    10px !important;

  line-height:
    1.4 !important;

}


.jlh-hero p{

  margin-top:9px;

  color:#5f4b64;

  font-size:6.4px;

  line-height:1.55;

}


/*
  MASTER 只拿來裁右側人物 / 紫色背景。
  沒有整張圖片首頁。
*/

.jlh-hero-art{

  position:absolute;

  right:0;

  top:0;

  width:60%;

  height:100%;

  z-index:2;

  background-image:
    url("home-master-v2.webp");

  background-repeat:
    no-repeat;

  background-size:
    184% auto;

  background-position:
    82% 0%;

}


.jlh-hero-art::before{

  content:"";

  position:absolute;

  inset:0;

  background:

    linear-gradient(
      90deg,
      #ecc3ff 0%,
      rgba(236,195,255,.23) 25%,
      transparent 55%
    );

}


.jlh-quote{

  position:absolute;

  right:2.5%;

  top:34%;

  width:18%;

  z-index:6;

  color:#fff;

  font-size:6.5px;

  line-height:1.6;

  text-shadow:
    0 2px 5px
    rgba(45,4,58,.65);

}


.jlh-quote b{

  display:block;

  margin-top:4px;

  color:#f1d169;

  font-size:8px;

}


/* ===== 探索標題 ===== */

.jlh-section-title{

  height:34px;

  display:flex;

  align-items:center;

  justify-content:center;

  color:#561567;

  background:

    linear-gradient(
      90deg,
      #fff8ff,
      #ebcbff,
      #fff8ff
    );

  font-family:
    "Noto Serif TC",
    serif;

  font-size:11px;

  font-weight:900;

}


/* ===== 六大功能 ===== */

.jlh-tools{

  padding:
    8px 9px 9px;

  background:

    radial-gradient(
      circle at 50% 0,
      #fff,
      #f3dcff
    );

}


.jlh-grid{

  display:grid;

  grid-template-columns:
    repeat(3,1fr);

  gap:7px;

}


.jlh-card{

  min-width:0;

  height:121px;

  padding:
    7px 3px 6px;

  text-align:center;

  border:
    1px solid #dba6ee;

  border-radius:13px;

  background:

    linear-gradient(
      180deg,
      rgba(255,255,255,.98),
      rgba(255,244,255,.96)
    );

  box-shadow:
    0 6px 14px
    rgba(102,19,129,.1);

}


.jlh-icon{

  width:43px;

  height:43px;

  margin:
    0 auto 5px;

  display:grid;

  place-items:center;

  border:
    2px solid var(--jlh-gold);

  border-radius:50%;

  background:

    radial-gradient(
      circle at 35% 23%,
      #ca53f2,
      #660d8b 73%
    );

  box-shadow:
    0 3px 8px
    rgba(86,10,108,.30);

}


.jlh-icon svg{

  width:36px;

  height:36px;

  fill:none;

  stroke:#f7d66e;

  stroke-width:2;

}


.jlh-icon svg text{

  fill:#f6d873;

  stroke:none;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:13px;

  font-weight:900;

}


.jlh-text-icon{

  display:flex;

  flex-direction:column;

  justify-content:center;

  color:#f6d36b;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:10px;

  line-height:1.1;

}


.jlh-card h3{

  margin:
    0 0 2px;

  color:#65117f;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:10px;

  white-space:nowrap;

}


.jlh-card p{

  margin:0;

  color:#5a4b5e;

  font-size:6px;

  white-space:nowrap;

}


.jlh-card small{

  display:block;

  margin-top:2px;

  color:#79697c;

  font-size:5px;

  line-height:1.2;

}


.jlh-card button,
.jlh-card > a{

  display:inline-block;

  margin-top:4px;

  border:0;

  border-radius:6px;

  padding:
    4px 8px;

  background:

    linear-gradient(
      135deg,
      #711095,
      #a92bd2
    );

  color:#fff;

  text-decoration:none;

  font-size:5.7px;

  font-weight:900;

}


/* ===== 擇吉看日 ===== */

.jlh-date{

  height:94px;

  margin:
    0 9px 7px;

  padding:
    10px 15px;

  display:flex;

  align-items:center;

  justify-content:
    space-between;

  border:
    1px solid #d49be8;

  border-radius:12px;

  background:

    radial-gradient(
      circle at 82% 42%,
      rgba(255,255,255,.45),
      transparent 28%
    ),

    linear-gradient(
      110deg,
      #f9e0ff,
      #c876e6
    );

}


.jlh-date h2{

  margin:0;

  color:#63107b;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:17px;

}


.jlh-date p{

  margin:
    2px 0;

  color:#5f4c64;

  font-size:5.8px;

}


.jlh-date a{

  display:inline-block;

  margin-top:3px;

  padding:
    4px 11px;

  border-radius:999px;

  background:#8110a5;

  color:#fff;

  text-decoration:none;

  font-size:6px;

  font-weight:900;

}


.jlh-calendar{

  width:54px;

  height:54px;

  display:flex;

  flex-direction:column;

  align-items:center;

  justify-content:center;

  border:
    1px solid var(--jlh-gold);

  border-radius:9px;

  background:#fff9e9;

  color:#8b1b96;

}


.jlh-calendar span{

  font-size:9px;

}


.jlh-calendar strong{

  font-size:16px;

}


/* ===== LINE ===== */

.jlh-contact{

  margin:
    0 9px 7px;

  padding:6px;

  border:
    1px solid #dbacef;

  border-radius:11px;

  background:#fff;

}


.jlh-consult{

  display:flex;

  align-items:center;

  gap:7px;

  padding-bottom:5px;

}


.jlh-mini-teacher{

  width:38px;

  height:45px;

  flex:0 0 auto;

  border-radius:7px;

  background-image:
    url("home-master-v2.webp");

  background-repeat:
    no-repeat;

  background-size:
    430% auto;

  background-position:
    68% 1%;

}


.jlh-consult h3{

  margin:0;

  color:#65117d;

  font-size:8px;

}


.jlh-consult p{

  margin:
    2px 0 0;

  color:#6f6072;

  font-size:5.5px;

}


.jlh-line{

  height:33px;

  display:flex;

  align-items:center;

  gap:7px;

  padding:
    5px 7px;

  border:
    1px solid #e3c2ef;

  border-radius:8px;

  color:inherit;

  text-decoration:none;

}


.jlh-line-icon{

  width:22px;

  height:22px;

  display:grid;

  place-items:center;

  border-radius:50%;

  background:#28ca45;

  color:#fff;

  font-size:4px;

}


.jlh-line b{

  display:block;

  color:#65117d;

  font-size:7px;

}


.jlh-line small{

  display:block;

  color:#756479;

  font-size:5.5px;

}


.jlh-line em{

  margin-left:auto;

  width:20px;

  height:20px;

  display:grid;

  place-items:center;

  border-radius:50%;

  background:#8b19b3;

  color:#fff;

  font-style:normal;

}


/* ===== Footer ===== */

.jlh-footer{

  min-height:42px;

  display:grid;

  grid-template-columns:
    repeat(4,1fr);

  gap:4px;

  padding:
    7px 8px 5px;

  background:

    linear-gradient(
      90deg,
      #350442,
      #62107a,
      #350442
    );

  color:#f2ddf9;

  text-align:center;

  font-size:5.5px;

}


.jlh-footer small{

  grid-column:
    1 / -1;

  color:#c5a9ce;

  font-size:4.7px;

}


/* ===== 功能頁 ===== */

#jlh-back{

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
      #4e0965,
      #8118a7
    );

  color:#fff;

  font-weight:900;

}


#jlh-route-notice{

  display:none;

  margin:
    10px 0;

  padding:
    10px 12px;

  border:
    1px solid #d9a5ec;

  border-radius:9px;

  background:#f8eaff;

  color:#64117e;

  font-size:11px;

  font-weight:700;

  line-height:1.6;

}


#jlh-route-notice.show{

  display:block;

}


@media(max-width:430px){

  .jlh-nav{
    display:none;
  }

  .jlh-grid{
    grid-template-columns:
      repeat(3,1fr);
  }

}

`;


  document.head.appendChild(
    style
  );


  showHome();

});

})();
