/* =========================================================
   筠玲易數｜真正 HTML 首頁｜重建正式版
   MASTER 只當 Hero 藝術素材
   六大卡片 / 按鈕 / LINE / 看日子 全部是真 HTML
   ========================================================= */

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

    if (document.documentElement.dataset.jlRealV1 === '1') return;
    document.documentElement.dataset.jlRealV1 = '1';

    const wrap = document.querySelector('.wrap');

    if (!wrap) {
      console.warn('筠玲易數：找不到 .wrap');
      return;
    }


    /* =====================================================
       1. 保留原網站所有功能
       ===================================================== */

    const feature = document.createElement('div');
    feature.id = 'jl-feature-shell';

    Array.from(wrap.children).forEach(function (node) {
      feature.appendChild(node);
    });

    wrap.appendChild(feature);


    const paipan =
      feature.querySelector('#paipan') ||
      feature.querySelector('.card');

    const out =
      feature.querySelector('#out');

    const go =
      feature.querySelector('#go');


    if (paipan) {
      paipan.id = paipan.id || 'paipan';
    }


    /* 隱藏原本舊的總功能選單 */
    Array.from(
      feature.querySelectorAll('.card')
    ).forEach(function (card) {

      const text =
        (card.textContent || '')
          .replace(/\s+/g, '');

      if (text.includes('功能選單')) {
        card.classList.add('jl-hide-old-menu');
      }

    });



    /* =====================================================
       2. 真正 HTML 首頁
       ===================================================== */

    const home = document.createElement('main');
    home.id = 'jl-home-real';

    home.innerHTML = `

<header class="jl-header">

  <button
    type="button"
    class="jl-brand"
    id="jl-brand-home">

    <span class="jl-seal">筠</span>

    <strong>
      筠玲易數
    </strong>

  </button>


  <nav class="jl-nav">

    <a href="#jl-home-real">
      首頁
    </a>

    <a href="#jl-tools">
      命理知識
    </a>

    <a href="#jl-contact">
      聯絡我們
    </a>

  </nav>


  <button
    type="button"
    class="jl-my"
    data-route="四柱">

    ☯ 我的命盤

  </button>

</header>



<section class="jl-hero">

  <div class="jl-hero-copy">

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
    class="jl-hero-art"
    aria-hidden="true">
  </div>


  <div class="jl-quote">

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



<div class="jl-title">
  ✦ 探索命理智慧 · 開啟人生新局 ✦
</div>



<section
  class="jl-tools"
  id="jl-tools">

  <div class="jl-grid">


    <!-- 四柱八字 -->

    <article class="jl-card">

      <div class="jl-icon">

        <svg viewBox="0 0 100 100">

          <circle
            cx="50"
            cy="50"
            r="42">
          </circle>

          <path
            d="M50 12v76 M12 50h76">
          </path>

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
        data-route="四柱">

        進入解析 ›

      </button>

    </article>



    <!-- 九宮 -->

    <article class="jl-card">

      <div class="jl-icon">

        <svg viewBox="0 0 100 100">

          <rect
            x="20"
            y="20"
            width="60"
            height="60"
            rx="4">
          </rect>

          <path
            d="
              M40 20v60
              M60 20v60
              M20 40h60
              M20 60h60
            ">
          </path>

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
        data-route="九宮">

        進入解析 ›

      </button>

    </article>



    <!-- 奇門 -->

    <article class="jl-card">

      <div class="jl-icon">

        <svg viewBox="0 0 100 100">

          <circle
            cx="50"
            cy="50"
            r="42">
          </circle>

          <circle
            cx="50"
            cy="50"
            r="27">
          </circle>

          <path
            d="
              M50 23
              a27 27 0 1 0 0 54
              a13.5 13.5 0 1 1 0-27
              a13.5 13.5 0 1 0 0-27
            ">
          </path>

          <circle
            cx="50"
            cy="36"
            r="3">
          </circle>

          <circle
            cx="50"
            cy="64"
            r="3">
          </circle>

          <path
            d="
              M50 5v10
              M50 85v10
              M5 50h10
              M85 50h10
              M18 18l7 7
              M75 75l7 7
              M82 18l-7 7
              M25 75l-7 7
            ">
          </path>

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
        data-route="奇門">

        進入解析 ›

      </button>

    </article>



    <!-- 六親 -->

    <article class="jl-card">

      <div class="jl-icon jl-text-icon">

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
        data-route="六親">

        進入解析 ›

      </button>

    </article>



    <!-- 八星 -->

    <article class="jl-card">

      <div class="jl-icon">

        <svg viewBox="0 0 100 100">

          <circle
            cx="50"
            cy="50"
            r="42">
          </circle>

          <path
            d="
              M20 64
              L33 35
              L48 52
              L61 27
              L78 65
              L51 76
              Z
            ">
          </path>

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



    <!-- 流年 -->

    <article class="jl-card">

      <div class="jl-icon">

        <svg viewBox="0 0 100 100">

          <circle
            cx="50"
            cy="50"
            r="42">
          </circle>

          <path
            d="
              M22 73h10V58
              h10v15
              h10V45
              h10v28
              h10V31
            ">
          </path>

          <path
            d="M63 31h9v9">
          </path>

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
        data-route="流年">

        進入解析 ›

      </button>

    </article>


  </div>

</section>



<!-- 擇吉看日 -->

<section class="jl-date">

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


  <div class="jl-calendar">

    <span>
      吉
    </span>

    <strong>
      日
    </strong>

  </div>

</section>



<!-- 老師 / LINE -->

<section
  class="jl-contact"
  id="jl-contact">

  <div class="jl-consult">

    <div class="jl-teacher-mini">
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
    class="jl-line"
    href="https://line.me/ti/p/@804kmmmy">

    <span class="jl-line-circle">
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

  <small>
    © 2026 筠玲易數 · All Rights Reserved.
  </small>

</footer>

`;

    wrap.insertBefore(home, feature);



    /* =====================================================
       3. 功能頁返回
       ===================================================== */

    const back =
      document.createElement('button');

    back.id =
      'jl-back';

    back.type =
      'button';

    back.textContent =
      '← 回到功能首頁';

    feature.insertBefore(
      back,
      feature.firstChild
    );


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


    const brand =
      home.querySelector(
        '#jl-brand-home'
      );

    if (brand) {

      brand.addEventListener(
        'click',
        showHome
      );

    }



    /* =====================================================
       4. 外掛定位
       ===================================================== */

    function clean(text) {

      return String(text || '')
        .replace(/\s+/g, '')
        .replace(/[／/｜|·・]/g, '');

    }


    const featureWords = {

      九宮: [
        '九宮',
        '九宮盤',
        '數字九宮',
        '奇門數字九宮盤'
      ],

      奇門: [
        '奇門遁甲',
        '奇門'
      ],

      六親: [
        '六親',
        '六親解析',
        '六親對照',
        '六壬'
      ],

      流年: [
        '流年運勢',
        '流年'
      ]

    };


    function findFeature(term) {

      const words =
        featureWords[term] ||
        [term];


      const candidates =
        Array.from(
          feature.querySelectorAll(
            '#plugs0 .card,' +
            '#plugs .card,' +
            '#plug .card,' +
            '#out .card,' +
            '.card.pro,' +
            'section.card'
          )
        );


      let best = null;
      let scoreMax = 0;


      candidates.forEach(
        function (card) {

          const text =
            clean(card.textContent);


          let score = 0;


          words.forEach(
            function (word) {

              const key =
                clean(word);


              if (
                text.startsWith(key)
              ) {

                score += 100;

              } else if (
                text.includes(key)
              ) {

                score += 20;

              }

            }
          );


          if (
            score > scoreMax
          ) {

            scoreMax = score;
            best = card;

          }

        }
      );


      return best;

    }



    /* =====================================================
       5. 提示
       ===================================================== */

    let notice = null;


    function showNotice(term) {

      if (!paipan) return;


      if (!notice) {

        notice =
          document.createElement(
            'div'
          );


        notice.id =
          'jl-route-notice';


        paipan.prepend(
          notice
        );

      }


      const names = {

        九宮:
          '紫微／九宮',

        奇門:
          '奇門遁甲',

        六親:
          '六壬／六親',

        流年:
          '流年運勢'

      };


      notice.textContent =
        '請先完成生辰排盤，排盤完成後會自動進入「' +
        (names[term] || term) +
        '」。';


      notice.classList.add(
        'show'
      );

    }


    function clearNotice() {

      if (notice) {

        notice.classList.remove(
          'show'
        );

      }

    }



    /* =====================================================
       6. 真正功能路由
       ===================================================== */

    function openFeature(term) {

      sessionStorage.setItem(
        'jl-pending-feature',
        term
      );


      /* 四柱 */

      if (
        term === '四柱'
      ) {

        showFeature(
          paipan
        );

        return;

      }


      /*
        如果已經排過盤，
        外掛區已存在，
        直接帶過去。
      */

      const target =
        findFeature(term);


      if (target) {

        clearNotice();


        showFeature(
          target
        );


        sessionStorage.removeItem(
          'jl-pending-feature'
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



    /* 真按鈕事件 */

    home
      .querySelectorAll(
        '[data-route]'
      )
      .forEach(
        function (button) {

          button.addEventListener(
            'click',
            function () {

              openFeature(
                button.dataset.route
              );

            }
          );

        }
      );



    /* =====================================================
       7. 排盤後自動帶到指定功能
       ===================================================== */

    if (go) {

      go.addEventListener(
        'click',
        function () {

          const pending =
            sessionStorage.getItem(
              'jl-pending-feature'
            );


          if (!pending) return;


          let count = 0;


          const watcher =
            setInterval(
              function () {

                count++;


                /* 四柱 */

                if (
                  pending === '四柱'
                ) {

                  if (
                    out &&
                    !out.classList.contains(
                      'hide'
                    )
                  ) {

                    clearInterval(
                      watcher
                    );


                    clearNotice();


                    sessionStorage.removeItem(
                      'jl-pending-feature'
                    );


                    showFeature(
                      out
                    );

                  }

                }


                /* 其他外掛 */

                else {

                  const target =
                    findFeature(
                      pending
                    );


                  if (target) {

                    clearInterval(
                      watcher
                    );


                    clearNotice();


                    sessionStorage.removeItem(
                      'jl-pending-feature'
                    );


                    showFeature(
                      target
                    );


                    if (
                      target.animate
                    ) {

                      target.animate(
                        [
                          {
                            boxShadow:
                              '0 0 0 0 rgba(143,36,201,0)'
                          },
                          {
                            boxShadow:
                              '0 0 0 5px rgba(143,36,201,.28)'
                          },
                          {
                            boxShadow:
                              '0 0 0 0 rgba(143,36,201,0)'
                          }
                        ],
                        {
                          duration: 900
                        }
                      );

                    }

                  }

                }


                if (
                  count >= 50
                ) {

                  clearInterval(
                    watcher
                  );

                }

              },

              200
            );

        },

        true
      );

    }



    /* =====================================================
       8. 視覺 CSS
       ===================================================== */

    const style =
      document.createElement(
        'style'
      );


    style.id =
      'jl-real-page-style';


    style.textContent = `

:root{

  --jl-purple:#76119d;

  --jl-purple2:#ba41e4;

  --jl-purple3:#edc5ff;

  --jl-gold:#e3b74e;

  --jl-deep:#3b064c;

  --jl-ink:#5b176b;

}


/* ===== 基礎 ===== */

html,
body{

  overflow-x:
    hidden !important;

}


body{

  background:
    #f9eaff !important;

}


.wrap{

  max-width:
    760px !important;

  margin:
    0 auto !important;

  padding:
    0 !important;

}


/* ===== 首頁 / 功能分離 ===== */

body.jl-home-mode
#jl-home-real{

  display:
    block !important;

}


body.jl-home-mode
#jl-feature-shell{

  display:
    none !important;

}


body.jl-feature-mode
#jl-home-real{

  display:
    none !important;

}


body.jl-feature-mode
#jl-feature-shell{

  display:
    block !important;

}


#jl-feature-shell{

  display:none;

}


#jl-feature-shell
.jl-hide-old-menu{

  display:
    none !important;

}


/* ===== Header ===== */

.jl-header{

  height:48px;

  display:flex;

  align-items:center;

  justify-content:
    space-between;

  padding:
    0 11px;

  background:
    rgba(255,255,255,.97);

  border-bottom:
    1px solid #edcdf8;

}


.jl-brand{

  border:0;

  background:none;

  padding:0;

  display:flex;

  align-items:center;

  gap:6px;

  color:#5c1479;

  font-family:
    "Noto Serif TC",
    serif;

}


.jl-brand strong{

  font-size:16px;

}


.jl-seal{

  width:25px;

  height:25px;

  display:grid;

  place-items:center;

  border:
    1.5px solid
    var(--jl-gold);

  border-radius:50%;

  color:
    var(--jl-gold);

  font-size:10px;

}


.jl-nav{

  display:flex;

  gap:10px;

}


.jl-nav a{

  color:#57395d;

  text-decoration:none;

  font-size:7px;

  font-weight:800;

}


.jl-my{

  border:
    1px solid
    #dc99ef;

  border-radius:
    999px;

  padding:
    6px 9px;

  background:

    linear-gradient(
      135deg,
      #77129c,
      #bb40df
    );

  color:#fff;

  font-size:7px;

  font-weight:900;

}


/* ===== Hero ===== */

.jl-hero{

  position:relative;

  height:260px;

  overflow:hidden;

  background:

    radial-gradient(
      circle at 14% 78%,
      rgba(207,93,244,.40),
      transparent 35%
    ),

    linear-gradient(
      105deg,
      #fffaff 0%,
      #edc7ff 54%,
      #762493 100%
    );

}


.jl-hero-copy{

  position:relative;

  z-index:5;

  width:52%;

  padding:
    27px 0 0 22px;

}


.jl-kicker{

  color:#741b91;

  font-size:7px;

  font-weight:900;

  letter-spacing:.08em;

}


.jl-hero h1{

  margin:
    8px 0 5px !important;

  color:
    #64107e !important;

  font-family:
    "Noto Serif TC",
    serif !important;

  font-size:
    31px !important;

  line-height:
    1 !important;

  text-indent:
    0 !important;

}


.jl-hero h2{

  margin:
    0 !important;

  color:
    #ba632c !important;

  font-size:
    10px !important;

  line-height:
    1.4 !important;

}


.jl-hero p{

  margin-top:9px;

  color:#604b64;

  font-size:6.4px;

  line-height:1.55;

}


/*
MASTER 只裁人物＋紫色背景。
不是整張首頁。
*/

.jl-hero-art{

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


.jl-hero-art::before{

  content:"";

  position:absolute;

  inset:0;

  background:

    linear-gradient(
      90deg,
      #ecc4ff 0%,
      rgba(236,196,255,.25) 25%,
      transparent 55%
    );

}


.jl-quote{

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


.jl-quote b{

  display:block;

  margin-top:4px;

  color:#f1d169;

  font-size:8px;

}


/* ===== 探索標題 ===== */

.jl-title{

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


/* ===== 六卡 ===== */

.jl-tools{

  padding:
    8px 9px 9px;

  background:

    radial-gradient(
      circle at 50% 0,
      #fff,
      #f3dcff
    );

}


.jl-grid{

  display:grid;

  grid-template-columns:
    repeat(3,1fr);

  gap:7px;

}


.jl-card{

  min-width:0;

  height:121px;

  padding:
    7px 3px 6px;

  text-align:center;

  border:
    1px solid #dca6ee;

  border-radius:13px;

  background:

    linear-gradient(
      180deg,
      rgba(255,255,255,.98),
      rgba(255,244,255,.96)
    );

  box-shadow:
    0 6px 14px
    rgba(101,19,128,.10);

}


.jl-icon{

  width:43px;

  height:43px;

  margin:
    0 auto 5px;

  display:grid;

  place-items:center;

  border:
    2px solid
    var(--jl-gold);

  border-radius:50%;

  background:

    radial-gradient(
      circle at 35% 23%,
      #cb53f3,
      #650d89 73%
    );

  box-shadow:
    0 3px 8px
    rgba(86,10,108,.30);

}


.jl-icon svg{

  width:36px;

  height:36px;

  fill:none;

  stroke:#f8d66e;

  stroke-width:2;

}


.jl-icon svg text{

  fill:#f7d873;

  stroke:none;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:13px;

  font-weight:900;

}


.jl-text-icon{

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


.jl-card h3{

  margin:
    0 0 2px;

  color:#65117f;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:10px;

  white-space:nowrap;

}


.jl-card p{

  margin:0;

  color:#5a4b5e;

  font-size:6px;

  white-space:nowrap;

}


.jl-card small{

  display:block;

  margin-top:2px;

  color:#79697c;

  font-size:5px;

  line-height:1.2;

}


.jl-card button,
.jl-card > a{

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


/* ===== 看日子 ===== */

.jl-date{

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


.jl-date h2{

  margin:0;

  color:#63107b;

  font-family:
    "Noto Serif TC",
    serif;

  font-size:17px;

}


.jl-date p{

  margin:
    2px 0;

  color:#5f4c64;

  font-size:5.8px;

}


.jl-date a{

  display:inline-block;

  margin-top:3px;

  padding:
    4px 11px;

  border-radius:
    999px;

  background:#8110a5;

  color:#fff;

  text-decoration:none;

  font-size:6px;

  font-weight:900;

}


.jl-calendar{

  width:54px;

  height:54px;

  display:flex;

  flex-direction:column;

  align-items:center;

  justify-content:center;

  border:
    1px solid
    var(--jl-gold);

  border-radius:9px;

  background:#fff9e9;

  color:#8b1b96;

}


.jl-calendar span{

  font-size:9px;

}


.jl-calendar strong{

  font-size:16px;

}


/* ===== LINE ===== */

.jl-contact{

  margin:
    0 9px 7px;

  padding:6px;

  border:
    1px solid #dbacef;

  border-radius:11px;

  background:#fff;

}


.jl-consult{

  display:flex;

  align-items:center;

  gap:7px;

  padding-bottom:5px;

}


.jl-teacher-mini{

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


.jl-consult h3{

  margin:0;

  color:#65117d;

  font-size:8px;

}


.jl-consult p{

  margin:
    2px 0 0;

  color:#6f6072;

  font-size:5.5px;

}


.jl-line{

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


.jl-line-circle{

  width:22px;

  height:22px;

  display:grid;

  place-items:center;

  border-radius:50%;

  background:#28ca45;

  color:#fff;

  font-size:4px;

}


.jl-line b{

  display:block;

  color:#65117d;

  font-size:7px;

}


.jl-line small{

  display:block;

  color:#756479;

  font-size:5.5px;

}


.jl-line em{

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

.jl-footer{

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


.jl-footer small{

  grid-column:
    1 / -1;

  color:#c5a9ce;

  font-size:4.7px;

}


/* ===== 功能頁 ===== */

#jl-back{

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


#jl-route-notice{

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


#jl-route-notice.show{

  display:block;

}


@media(max-width:430px){

  .jl-nav{

    display:none;

  }


  .jl-grid{

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
