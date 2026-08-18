/* 筠玲易數｜首頁規格鎖定版
   正式母版：
   亮紫金色＋老師右側主視覺＋六大功能＋擇吉看日＋LINE
   首頁與舊功能完全分離，避免新舊頁面重疊
*/

(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(function () {

    /* 防止重複執行 */
    if (document.body.dataset.jlExactHome === '1') return;
    document.body.dataset.jlExactHome = '1';

    const wrap = document.querySelector('.wrap');

    if (!wrap) {
      console.warn('筠玲首頁：找不到 .wrap');
      return;
    }


    /* ======================================================
       01. 把原本網站完整收進「功能頁」
       ====================================================== */

    const feature = document.createElement('div');

    feature.id = 'jl-feature-shell';

    const oldChildren = Array.from(wrap.children);

    oldChildren.forEach(function (el) {
      feature.appendChild(el);
    });

    wrap.appendChild(feature);


    /* ======================================================
       02. 找出原本排盤主要區塊
       ====================================================== */

    const cards = Array.from(
      feature.querySelectorAll(':scope > .card')
    );

    const paipan =
      cards[0] ||
      feature.querySelector('.card');

    const out =
      feature.querySelector('#out');

    const go =
      feature.querySelector('#go');


    if (paipan) {
      paipan.id = paipan.id || 'paipan';
      paipan.classList.add('jl-paipan');
    }


    /* ======================================================
       03. 隱藏舊功能選單
       ====================================================== */

    Array.from(
      feature.querySelectorAll('.card')
    ).forEach(function (card) {

      const txt = (card.textContent || '')
        .replace(/\s+/g, '');

      if (txt.includes('功能選單')) {
        card.classList.add('jl-hide-old-menu');
      }

    });


    /* ======================================================
       04. 建立正式新版首頁
       ====================================================== */

    const home = document.createElement('section');

    home.id = 'jl-home';

    home.innerHTML = `

<header class="jl-header">

  <div class="jl-logo">

    <span class="jl-logo-mark">
      筠
    </span>

    <strong>
      筠玲易數
    </strong>

  </div>


  <nav class="jl-nav">

    <a href="#jl-home">
      首頁
    </a>

    <a href="#jl-about">
      關於老師
    </a>

    <a href="#jl-tools">
      命理知識
    </a>

    <a href="#jl-faq">
      常見問題
    </a>

    <a href="#jl-contact">
      聯絡我們
    </a>

  </nav>


  <button
    class="jl-my"
    type="button"
    data-route="四柱">

    ☯ 我的命盤

  </button>

</header>



<section class="jl-hero">


  <div class="jl-hero-left">

    <div class="jl-kicker">

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



  <div
    class="jl-hero-right"
    aria-hidden="true">
  </div>



  <div class="jl-quote">

    命，不是定局；

    <br>

    看懂自己的局，

    <br>

    才知道下一步

    <br>

    怎麼走。

    <br>

    <b>
      筠玲老師
    </b>

  </div>


</section>



<div class="jl-main-title">

  ✦ 探索命理智慧 · 開啟人生新局 ✦

</div>



<section
  class="jl-tools"
  id="jl-tools">


  <div class="jl-grid">


    <!-- 四柱八字 -->

    <button
      class="jl-tool"
      type="button"
      data-route="四柱">


      <div class="jl-icon">

        年 月

        <br>

        日 時

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


      <span>
        進入解析 ›
      </span>


    </button>



    <!-- 九宮 -->

    <button
      class="jl-tool"
      type="button"
      data-route="九宮">


      <div class="jl-icon jl-nine">

        4　9　2

        <br>

        3　5　7

        <br>

        8　1　6

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


      <span>
        進入解析 ›
      </span>


    </button>



    <!-- 奇門 -->

    <button
      class="jl-tool"
      type="button"
      data-route="奇門">


      <div class="jl-icon">
        ☯
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


      <span>
        進入解析 ›
      </span>


    </button>



    <!-- 六壬六親 -->

    <button
      class="jl-tool"
      type="button"
      data-route="六親">


      <div class="jl-icon">

        六壬

        <br>

        六親

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


      <span>
        進入解析 ›
      </span>


    </button>



    <!-- 八星磁場 -->

    <a
      class="jl-tool"
      href="bxcc.html">


      <div class="jl-icon">

        ✦

        <br>

        ✦ ✦

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


      <span>
        進入解析 ›
      </span>


    </a>



    <!-- 流年 -->

    <button
      class="jl-tool"
      type="button"
      data-route="流年">


      <div class="jl-icon">
        ↗
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


      <span>
        進入解析 ›
      </span>


    </button>


  </div>

</section>



<!-- 擇吉看日 -->

<section class="jl-date">


  <div class="jl-date-copy">


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



  <div class="jl-date-art">


    <div class="jl-calendar">

      吉

      <br>

      日

    </div>


  </div>


</section>



<!-- 老師與 LINE -->

<section
  class="jl-contact"
  id="jl-contact">


  <div class="jl-teacher-mini">


    <div class="jl-mini-photo">
    </div>


    <div>


      <h3>
        需要進一步命理解讀？
      </h3>


      <p>

        筠玲老師提供一對一專業諮詢服務

        <br>

        深入分析您的命盤，為您解答人生困惑

      </p>


    </div>


  </div>



  <div class="jl-line-card">


    <div class="jl-line-dot">

      LINE

    </div>


    <div>


      <strong>

        加入筠玲老師 LINE

      </strong>


      <div>

        LINE ID：@804kmmmy

      </div>


    </div>


    <a
      href="https://line.me/ti/p/@804kmmmy">

      ›

    </a>


  </div>


</section>



<footer class="jl-footer">


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


  <div>

    © 2026 筠玲易數 · All Rights Reserved.

  </div>


</footer>

`;


    wrap.insertBefore(home, feature);



    /* ======================================================
       05. 功能頁返回首頁
       ====================================================== */

    const back = document.createElement('button');

    back.id = 'jl-back';

    back.type = 'button';

    back.textContent = '← 回到功能首頁';

    feature.insertBefore(
      back,
      feature.firstChild
    );



    /* ======================================================
       06. 首頁 / 功能頁切換
       ====================================================== */

    function showHome() {

      document.body.classList.remove(
        'jl-feature-mode'
      );

      document.body.classList.add(
        'jl-home-mode'
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }



    function showFeature(target) {

      document.body.classList.remove(
        'jl-home-mode'
      );

      document.body.classList.add(
        'jl-feature-mode'
      );


      setTimeout(function () {

        const el =
          target ||
          paipan ||
          feature;

        if (el) {

          el.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

        }

      }, 80);

    }


    back.addEventListener(
      'click',
      showHome
    );



    /* ======================================================
       07. 找功能位置
       ====================================================== */

    function norm(s) {

      return String(s || '')
        .replace(/\s+/g, '');

    }



    function findTarget(term) {

      const map = {

        九宮: [
          '奇門數字九宮盤',
          '數字九宮盤',
          '九宮盤',
          '九宮'
        ],

        奇門: [
          '奇門遁甲',
          '奇門'
        ],

        六親: [
          '六親對照',
          '六親解析',
          '六親'
        ],

        流年: [
          '流年運勢',
          '流年'
        ]

      };


      const words =
        map[term] || [term];


      const nodes =
        Array.from(
          feature.querySelectorAll(
            'h2,h3,h4,summary,.card'
          )
        );


      for (const node of nodes) {

        const txt =
          norm(node.textContent);


        for (const w of words) {

          if (
            txt.includes(norm(w))
          ) {

            return node;

          }

        }

      }


      return null;

    }



    /* ======================================================
       08. 判斷是否已經完成排盤
       ====================================================== */

    function hasChart() {

      if (!out) return false;

      return !out.classList.contains(
        'hide'
      );

    }



    /* ======================================================
       09. 排盤提示
       ====================================================== */

    let note = null;


    if (paipan) {

      note =
        document.createElement('div');

      note.className =
        'jl-note';

      paipan.appendChild(note);

    }



    function setNote(text) {

      if (!note) return;

      note.textContent = text;

      note.classList.add('show');

    }



    function clearNote() {

      if (!note) return;

      note.classList.remove('show');

    }



    /* ======================================================
       10. 六大功能路由
       ====================================================== */

    function route(term) {

      sessionStorage.setItem(
        'jl-route',
        term
      );


      /* 四柱直接進排盤 */

      if (term === '四柱') {

        setNote(
          '請先輸入出生資料並排盤；完成後會顯示四柱、先天、後天與完整命盤。'
        );

        showFeature(paipan);

        return;

      }



      /* 其他功能需要先建立命盤 */

      if (!hasChart()) {


        const messages = {

          九宮:
            '九宮分析需要先建立命盤，請先完成生辰排盤。',

          奇門:
            '奇門遁甲需要先建立命盤，請先完成生辰排盤。',

          六親:
            '六親分析需要先建立命盤，請先完成生辰排盤。',

          流年:
            '流年運勢需要先建立命盤，請先完成生辰排盤。'

        };


        setNote(
          messages[term] ||
          '請先完成生辰排盤。'
        );


        showFeature(paipan);

        return;

      }



      clearNote();


      showFeature(
        findTarget(term) ||
        out ||
        paipan
      );

    }



    home
      .querySelectorAll('[data-route]')
      .forEach(function (btn) {

        btn.addEventListener(
          'click',
          function () {

            route(
              btn.dataset.route
            );

          }
        );

      });



    /* ======================================================
       11. 排盤完成後自動前往指定功能
       ====================================================== */

    if (go) {

      go.addEventListener(
        'click',
        function () {


          const term =
            sessionStorage.getItem(
              'jl-route'
            );


          if (!term) return;


          let tries = 0;


          const timer =
            setInterval(function () {


              tries++;


              if (hasChart()) {


                clearInterval(timer);


                clearNote();


                if (term === '四柱') {

                  showFeature(
                    out ||
                    paipan
                  );

                } else {

                  showFeature(
                    findTarget(term) ||
                    out ||
                    paipan
                  );

                }


                sessionStorage.removeItem(
                  'jl-route'
                );


                return;

              }


              if (tries >= 30) {

                clearInterval(timer);

              }


            }, 250);


        },
        true
      );

    }



    /* ======================================================
       12. 正式紫曜首頁 CSS
       ====================================================== */

    const style =
      document.createElement('style');


    style.textContent = `

:root{

  --jl-purple:#901fcf;

  --jl-purple2:#b943ea;

  --jl-deep:#4e0a71;

  --jl-gold:#d7a43c;

  --jl-ink:#44244f;

  --jl-muted:#76697e;

}



body{

  background:

    linear-gradient(
      180deg,
      #ffffff,
      #fbf4ff 48%,
      #f1e0ff
    ) !important;

}



.wrap{

  max-width:760px !important;

  padding:

    0 16px 38px !important;

}



/* 最重要：
   首頁時舊功能完全消失 */

body.jl-home-mode
#jl-home{

  display:block !important;

}



body.jl-home-mode
#jl-feature-shell{

  display:none !important;

}



/* 功能模式反過來 */

body.jl-feature-mode
#jl-home{

  display:none !important;

}



body.jl-feature-mode
#jl-feature-shell{

  display:block !important;

}



#jl-feature-shell{

  display:none;

}



#jl-feature-shell
.jl-hide-old-menu{

  display:none !important;

}



/* =============================
   首頁
   ============================= */

#jl-home{

  margin:0 -16px;

  background:#ffffff;

  overflow:hidden;

}



/* =============================
   HEADER
   ============================= */

.jl-header{

  height:66px;

  display:flex;

  align-items:center;

  justify-content:
    space-between;

  gap:10px;

  padding:0 16px;

  background:#ffffff;

  border-bottom:
    1px solid #edd9f8;

}



.jl-logo{

  display:flex;

  align-items:center;

  gap:8px;

  color:#5d1685;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

}



.jl-logo strong{

  font-size:20px;

  letter-spacing:.08em;

}



.jl-logo-mark{

  width:31px;

  height:31px;

  border:
    1.5px solid
    var(--jl-gold);

  border-radius:50%;

  display:grid;

  place-items:center;

  color:
    var(--jl-gold);

  font-size:13px;

}



.jl-nav{

  display:flex;

  gap:13px;

  font-size:9px;

  font-weight:800;

  color:#583b61;

}



.jl-nav a{

  color:inherit;

  text-decoration:none;

}



.jl-nav a:first-child{

  color:
    var(--jl-purple);

}



.jl-my{

  border:0;

  padding:8px 12px;

  border-radius:999px;

  color:#ffffff;

  background:

    linear-gradient(
      135deg,
      var(--jl-purple),
      var(--jl-purple2)
    );

  font-weight:900;

  font-size:9px;

}



/* =============================
   HERO
   ============================= */

.jl-hero{

  min-height:390px;

  position:relative;

  overflow:hidden;

  background:

    radial-gradient(
      circle at 16% 80%,
      rgba(178,70,224,.16),
      transparent 28%
    ),

    linear-gradient(
      90deg,
      #ffffff 0 45%,
      #f8e8ff 62%,
      #d89df4 100%
    );

}



.jl-hero-left{

  position:relative;

  z-index:3;

  width:56%;

  padding:
    40px 18px
    30px 36px;

}



.jl-kicker{

  color:#6f1c99;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

  font-size:9px;

  font-weight:900;

  letter-spacing:.18em;

}



.jl-hero h1{

  margin:
    10px 0 6px !important;

  color:
    #641095 !important;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif !important;

  font-size:
    45px !important;

  line-height:
    1.1 !important;

  letter-spacing:
    .06em !important;

  text-indent:
    0 !important;

}



.jl-hero h2{

  margin:0 !important;

  color:
    #bd6a2a !important;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif !important;

  font-size:
    16px !important;

}



.jl-hero-left p{

  margin-top:16px;

  color:#5d4c63;

  font-size:10px;

  line-height:1.8;

}



/*
  老師照片：

  只使用 hero.jpeg 右側，
  不把舊圖片左側文字
  再顯示一次。
*/

.jl-hero-right{

  position:absolute;

  right:0;

  top:0;

  width:58%;

  height:100%;

  overflow:hidden;

  background-image:

    linear-gradient(
      90deg,
      #f8e8ff 0%,
      rgba(248,232,255,.20)
      18%,
      transparent 36%
    ),

    url("hero.jpeg");

  background-size:
    auto 100%;

  background-position:
    right center;

  background-repeat:
    no-repeat;

}



.jl-quote{

  position:absolute;

  z-index:4;

  right:3%;

  top:24%;

  width:24%;

  color:#ffffff;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

  font-size:11px;

  line-height:1.9;

  text-shadow:

    0 2px 6px
    rgba(56,7,75,.55);

}



.jl-quote b{

  display:block;

  margin-top:8px;

  color:#f2c967;

  font-size:13px;

}



/* =============================
   探索標題
   ============================= */

.jl-main-title{

  padding:12px;

  text-align:center;

  color:#511c69;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

  font-size:15px;

  font-weight:900;

  letter-spacing:.09em;

  background:

    linear-gradient(
      90deg,
      #fff5ff,
      #edd4ff,
      #fff5ff
    );

}



/* =============================
   六大功能
   ============================= */

.jl-tools{

  padding:
    10px 12px 12px;

  background:

    linear-gradient(
      180deg,
      #fdf8ff,
      #f6e9ff
    );

}



.jl-grid{

  display:grid;

  grid-template-columns:
    repeat(3,1fr);

  gap:8px;

}



.jl-tool{

  min-height:160px;

  padding:12px 7px;

  border:
    1px solid #e0bef1;

  border-radius:14px;

  background:#ffffff;

  box-shadow:

    0 7px 16px
    rgba(84,15,116,.07);

  text-align:center;

  color:
    var(--jl-ink);

  text-decoration:none;

  font:inherit;

  cursor:pointer;

}



.jl-icon{

  width:57px;

  height:57px;

  margin:
    0 auto 8px;

  border-radius:50%;

  display:grid;

  place-items:center;

  border:
    2px solid
    var(--jl-gold);

  background:

    radial-gradient(
      circle at 35% 25%,
      #b24ae8,
      #661493
    );

  color:#f5dc88;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

  font-size:13px;

  font-weight:900;

  line-height:1.1;

}



.jl-nine{

  font-size:10px;

  line-height:1.25;

}



.jl-tool h3{

  margin:0 0 4px;

  color:#68149a;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

  font-size:14px;

}



.jl-tool p{

  margin:0;

  color:#66566d;

  font-size:8.8px;

}



.jl-tool small{

  display:block;

  margin-top:5px;

  color:#88778e;

  font-size:7.8px;

  line-height:1.45;

}



.jl-tool span{

  display:inline-block;

  margin-top:7px;

  padding:5px 10px;

  border-radius:7px;

  background:

    linear-gradient(
      135deg,
      #7e1bb2,
      #a72fda
    );

  color:#ffffff;

  font-size:8px;

  font-weight:900;

}



/* =============================
   擇吉看日
   ============================= */

.jl-date{

  margin:
    0 12px 12px;

  min-height:165px;

  padding:
    22px 18px
    20px 24px;

  display:flex;

  align-items:center;

  justify-content:
    space-between;

  gap:10px;

  border:
    1px solid #d8acf0;

  border-radius:16px;

  background:

    radial-gradient(
      circle at 82% 40%,
      rgba(255,255,255,.65),
      transparent 25%
    ),

    linear-gradient(
      115deg,
      #fcecff,
      #edd1ff 58%,
      #c27ae9
    );

}



.jl-date-copy{

  max-width:70%;

}



.jl-date h2{

  margin:0;

  color:#661099;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

  font-size:25px;

}



.jl-date p{

  margin:6px 0;

  color:#66516e;

  font-size:9px;

  line-height:1.6;

}



.jl-date a{

  display:inline-block;

  margin-top:7px;

  padding:
    7px 18px;

  border-radius:999px;

  background:

    linear-gradient(
      135deg,
      #851db9,
      #ad35df
    );

  color:#ffffff;

  text-decoration:none;

  font-size:9px;

  font-weight:900;

}



.jl-date-art{

  width:100px;

  height:100px;

  display:flex;

  align-items:center;

  justify-content:center;

}



.jl-calendar{

  width:80px;

  height:80px;

  border:
    1px solid
    var(--jl-gold);

  border-radius:12px;

  display:grid;

  place-items:center;

  background:#fff9ee;

  color:#7a1d9b;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

  font-size:18px;

  font-weight:900;

  line-height:1.1;

}



/* =============================
   LINE
   ============================= */

.jl-contact{

  margin:
    0 12px 12px;

  padding:10px;

  border:
    1px solid #deb8f3;

  border-radius:15px;

  background:#ffffff;

}



.jl-teacher-mini{

  display:flex;

  gap:10px;

  align-items:center;

  margin-bottom:9px;

}



.jl-mini-photo{

  width:62px;

  height:76px;

  border-radius:10px;

  flex:0 0 auto;

  background-image:
    url("hero.jpeg");

  background-size:
    auto 220%;

  background-position:
    78% 35%;

  background-repeat:
    no-repeat;

}



.jl-contact h3{

  margin:0;

  color:#611091;

  font-family:
    "Noto Serif TC",
    "Songti TC",
    serif;

  font-size:13px;

}



.jl-contact p{

  margin:
    4px 0 0;

  color:#75637c;

  font-size:8.8px;

  line-height:1.55;

}



.jl-line-card{

  display:flex;

  align-items:center;

  gap:9px;

  padding:
    10px 12px;

  border:
    1px solid #e4caf4;

  border-radius:12px;

  background:#ffffff;

}



.jl-line-dot{

  width:30px;

  height:30px;

  border-radius:50%;

  display:grid;

  place-items:center;

  background:#2bcf49;

  color:#ffffff;

  font-size:7px;

  font-weight:900;

}



.jl-line-card strong{

  display:block;

  color:#611091;

  font-size:11px;

}



.jl-line-card div div{

  font-size:9px;

  color:#745f7b;

  margin-top:2px;

}



.jl-line-card a{

  margin-left:auto;

  width:28px;

  height:28px;

  border-radius:50%;

  display:grid;

  place-items:center;

  background:

    linear-gradient(
      135deg,
      #821bb6,
      #a62ed9
    );

  color:#ffffff;

  text-decoration:none;

}



/* =============================
   Footer
   ============================= */

.jl-footer{

  display:grid;

  grid-template-columns:
    repeat(4,1fr);

  gap:5px;

  padding:12px;

  background:

    linear-gradient(
      90deg,
      #3c0c57,
      #5a117c,
      #3c0c57
    );

  color:#f4e5ff;

  text-align:center;

  font-size:8px;

}



.jl-footer div{

  grid-column:
    1 / -1;

  color:#ccb6d8;

  font-size:7px;

  margin-top:4px;

}



/* =============================
   功能頁返回
   ============================= */

#jl-back{

  position:sticky;

  top:0;

  z-index:80;

  width:100%;

  border:0;

  padding:
    12px 15px;

  background:

    linear-gradient(
      90deg,
      #4d0b70,
      #7d1bb3
    );

  color:#ffffff;

  font-weight:900;

  letter-spacing:.08em;

}



.jl-note{

  display:none;

  margin:
    12px 0 0;

  padding:
    10px 12px;

  border:
    1px solid #ddbcf0;

  border-radius:10px;

  background:#f4e4ff;

  color:#683080;

  font-size:10.5px;

  line-height:1.65;

}



.jl-note.show{

  display:block;

}



/* =============================
   手機版
   ============================= */

@media(max-width:600px){


  .jl-nav{

    display:none;

  }


  .jl-header{

    height:64px;

  }


  .jl-logo strong{

    font-size:19px;

  }


  .jl-hero{

    min-height:500px;

  }


  .jl-hero-left{

    width:100%;

    padding:
      28px 18px 280px;

  }


  .jl-hero h1{

    font-size:
      38px !important;

  }


  .jl-hero h2{

    font-size:
      15px !important;

  }


  /*
    手機版：
    老師固定在下半部，
    不再跟左側文字重疊
  */

  .jl-hero-right{

    top:auto;

    bottom:0;

    width:100%;

    height:58%;

    background-size:
      auto 100%;

    background-position:
      right bottom;

    background-image:

      linear-gradient(
        180deg,
        #f8e8ff 0%,
        rgba(248,232,255,.08)
        18%,
        transparent 38%
      ),

      url("hero.jpeg");

  }


  .jl-quote{

    right:4%;

    top:auto;

    bottom:20%;

    width:26%;

    font-size:9.5px;

  }


  /*
    參考圖在寬螢幕是 3×2。
    一般手機仍盡量維持 3 欄。
  */

  .jl-grid{

    grid-template-columns:
      repeat(3,1fr);

  }


}



/* 很窄的手機才改 2 欄 */

@media(max-width:430px){

  .jl-grid{

    grid-template-columns:
      repeat(2,1fr);

  }

}

`;


    document.head.appendChild(
      style
    );


    /* 預設只顯示新首頁 */
    showHome();


  });

})();
/* =========================================================
   筠玲易數 V4｜母版比例＋紫曜色調修正
   只調整視覺，不碰命理計算
   ========================================================= */
(function () {
  'use strict';

  function applyJLV4() {
    if (document.getElementById('jl-v4-master-style')) return;

    const style = document.createElement('style');
    style.id = 'jl-v4-master-style';

    style.textContent = `

/* =========================================
   0. 手機首頁總體密度
   ========================================= */

@media (max-width:600px){

  body{
    overflow-x:hidden !important;
  }

  #jl-home{
    max-width:100% !important;
  }


  /* =======================================
     1. 最上方品牌列
     ======================================= */

  .jl-header{
    height:46px !important;
    min-height:46px !important;
    padding:0 10px !important;
  }

  .jl-logo-mark{
    width:24px !important;
    height:24px !important;
    font-size:10px !important;
  }

  .jl-logo strong{
    font-size:15px !important;
    letter-spacing:.05em !important;
  }

  .jl-my{
    padding:6px 10px !important;
    font-size:8px !important;
  }


  /* =======================================
     2. Hero
     母版重點：
     不再一張 Hero 佔半頁
     ======================================= */

  .jl-hero{
    min-height:255px !important;
    height:255px !important;

    background:
      radial-gradient(
        circle at 15% 72%,
        rgba(185,72,232,.26),
        transparent 34%
      ),
      linear-gradient(
        90deg,
        #fff8ff 0%,
        #f9eaff 43%,
        #e6b9ff 72%,
        #a84ee0 100%
      ) !important;
  }


  .jl-hero-left{
    width:54% !important;

    padding:
      22px
      4px
      15px
      18px !important;
  }


  .jl-kicker{
    font-size:7px !important;
    letter-spacing:.12em !important;
    white-space:nowrap !important;
  }


  .jl-hero h1{
    margin:
      8px
      0
      4px !important;

    font-size:
      29px !important;

    line-height:
      1.08 !important;
  }


  .jl-hero h2{
    font-size:
      10.5px !important;

    line-height:
      1.45 !important;

    color:
      #bf6a2d !important;
  }


  .jl-hero-left p{
    margin-top:
      8px !important;

    font-size:
      7.5px !important;

    line-height:
      1.55 !important;

    max-width:
      230px !important;
  }


  /* =======================================
     3. 老師照片
     用紫色光影統一色調
     ======================================= */

  .jl-hero-right{
    top:0 !important;
    bottom:auto !important;

    right:0 !important;

    width:58% !important;
    height:255px !important;

    opacity:.96 !important;

    background-image:

      linear-gradient(
        90deg,
        #f9eaff 0%,
        rgba(246,219,255,.38) 16%,
        rgba(189,89,231,.10) 46%,
        rgba(94,15,125,.18) 100%
      ),

      url("hero.jpeg") !important;

    background-size:
      auto 100% !important;

    background-position:
      right center !important;

    background-repeat:
      no-repeat !important;

    filter:
      saturate(1.12)
      contrast(.98)
      brightness(1.05)
      hue-rotate(4deg) !important;
  }


  /*
    再蓋一層紫粉柔光，
    讓米黃背景不要那麼突兀
  */

  .jl-hero::after{
    content:"";

    position:absolute;
    inset:0;

    z-index:2;

    pointer-events:none;

    background:

      radial-gradient(
        circle at 76% 43%,
        rgba(236,179,255,.08),
        transparent 27%
      ),

      linear-gradient(
        90deg,
        transparent 48%,
        rgba(191,76,226,.10) 72%,
        rgba(91,12,123,.18) 100%
      );
  }


  .jl-hero-left,
  .jl-quote{
    position:relative;
    z-index:4 !important;
  }


  /* =======================================
     4. 老師右側語錄
     ======================================= */

  .jl-quote{
    position:absolute !important;

    right:2.5% !important;
    top:31% !important;

    width:22% !important;

    font-size:
      7.5px !important;

    line-height:
      1.55 !important;

    color:
      #fff8ff !important;
  }


  .jl-quote b{
    margin-top:
      4px !important;

    font-size:
      9px !important;

    color:
      #f4cd71 !important;
  }


  /* =======================================
     5. 探索命理橫幅
     ======================================= */

  .jl-main-title{
    height:35px !important;

    display:flex !important;
    align-items:center !important;
    justify-content:center !important;

    padding:0 5px !important;

    font-size:
      11px !important;

    letter-spacing:
      .06em !important;
  }


  /* =======================================
     6. 六大功能
     強制 3 × 2
     ======================================= */

  .jl-tools{
    padding:
      7px
      8px
      8px !important;
  }


  .jl-grid{
    display:grid !important;

    grid-template-columns:
      repeat(3,minmax(0,1fr)) !important;

    gap:
      6px !important;
  }


  .jl-tool{
    min-width:0 !important;

    min-height:
      108px !important;

    height:
      108px !important;

    padding:
      7px
      3px
      5px !important;

    border-radius:
      10px !important;
  }


  .jl-icon{
    width:
      35px !important;

    height:
      35px !important;

    margin:
      0 auto 4px !important;

    border-width:
      1.5px !important;

    font-size:
      8px !important;

    line-height:
      1.05 !important;
  }


  .jl-nine{
    font-size:
      6px !important;

    line-height:
      1.1 !important;
  }


  .jl-tool h3{
    margin:
      0 0 2px !important;

    font-size:
      9.5px !important;

    white-space:
      nowrap !important;
  }


  .jl-tool p{
    font-size:
      6.5px !important;

    line-height:
      1.35 !important;

    white-space:
      nowrap !important;
  }


  .jl-tool small{
    margin-top:
      2px !important;

    font-size:
      5.5px !important;

    line-height:
      1.25 !important;
  }


  .jl-tool span{
    margin-top:
      4px !important;

    padding:
      3px
      7px !important;

    border-radius:
      5px !important;

    font-size:
      6px !important;
  }


  /* =======================================
     7. 擇吉看日
     母版是短橫幅，不是大卡
     ======================================= */

  .jl-date{
    min-height:
      92px !important;

    height:
      92px !important;

    margin:
      0
      8px
      7px !important;

    padding:
      10px
      11px
      9px
      16px !important;

    border-radius:
      11px !important;
  }


  .jl-date-copy{
    max-width:
      70% !important;
  }


  .jl-date h2{
    font-size:
      16px !important;
  }


  .jl-date p{
    margin:
      3px
      0 !important;

    font-size:
      6px !important;

    line-height:
      1.35 !important;
  }


  .jl-date a{
    margin-top:
      3px !important;

    padding:
      4px
      11px !important;

    font-size:
      6.5px !important;
  }


  .jl-date-art{
    width:
      62px !important;

    height:
      62px !important;
  }


  .jl-calendar{
    width:
      52px !important;

    height:
      52px !important;

    border-radius:
      8px !important;

    font-size:
      12px !important;
  }


  /* =======================================
     8. 老師＋LINE
     ======================================= */

  .jl-contact{
    margin:
      0
      8px
      7px !important;

    padding:
      6px
      7px !important;

    border-radius:
      10px !important;
  }


  .jl-teacher-mini{
    margin-bottom:
      5px !important;

    gap:
      6px !important;
  }


  .jl-mini-photo{
    width:
      38px !important;

    height:
      46px !important;

    border-radius:
      6px !important;

    filter:
      saturate(1.08)
      brightness(1.04)
      hue-rotate(3deg);
  }


  .jl-contact h3{
    font-size:
      9px !important;
  }


  .jl-contact p{
    margin-top:
      2px !important;

    font-size:
      6px !important;

    line-height:
      1.4 !important;
  }


  .jl-line-card{
    padding:
      5px
      7px !important;

    border-radius:
      8px !important;
  }


  .jl-line-dot{
    width:
      20px !important;

    height:
      20px !important;

    font-size:
      4px !important;
  }


  .jl-line-card strong{
    font-size:
      7.5px !important;
  }


  .jl-line-card div div{
    font-size:
      6px !important;
  }


  .jl-line-card a{
    width:
      20px !important;

    height:
      20px !important;
  }


  /* =======================================
     9. Footer
     ======================================= */

  .jl-footer{
    min-height:
      40px !important;

    padding:
      7px
      8px
      5px !important;

    font-size:
      5.5px !important;
  }


  .jl-footer div{
    margin-top:
      2px !important;

    font-size:
      5px !important;
  }


}


/* =========================================
   430 以下仍維持 3 欄
   不要再變成兩欄
   ========================================= */

@media(max-width:430px){

  .jl-grid{
    grid-template-columns:repeat(3,minmax(0,1fr)) !important;
    gap:6px !important;
    padding:0 6px !important;
  }

  .jl-tool{
    min-width:0 !important;
    min-height:108px !important;
    height:108px !important;
    padding:7px 3px 5px !important;
    border-radius:10px !important;
  }

  .jl-icon{
    width:35px !important;
    height:35px !important;
    margin:0 auto 4px !important;
    font-size:8px !important;
  }

  .jl-nine{
    font-size:6px !important;
  }

  .jl-tool h3{
    font-size:9.5px !important;
    margin:0 0 2px !important;
    white-space:nowrap !important;
  }

  .jl-tool p{
    font-size:6.5px !important;
    line-height:1.35 !important;
    margin:2px 0 !important;
  }

  .jl-tool small{
    font-size:5.5px !important;
    line-height:1.25 !important;
    margin-top:2px !important;
  }

  .jl-tool span{
    font-size:6px !important;
    padding:3px 7px !important;
    margin-top:4px !important;
  }

}

`;

    document.head.appendChild(style);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyJLV4);
  } else {
    applyJLV4();
  }

})();
