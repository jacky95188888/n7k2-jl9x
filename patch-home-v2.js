/* =========================================================
   筠玲易數｜紫曜典藏版首頁 V3
   ---------------------------------------------------------
   功能：
   1. 新首頁與舊功能正式分流
   2. 首頁只顯示六大入口＋看日子＋LINE
   3. 點四柱／九宮／奇門／六親／流年會正常反應
   4. 需要命盤的功能，未排盤時先進生辰排盤
   5. 排盤後自動嘗試帶到對應結果
   6. 八星磁場直接進 bxcc.html
   7. 看日子直接進 rz.html
   8. 原本 data-*.js / gua169.js / 計算引擎完全不改
   ========================================================= */

(function () {
  'use strict';

  function boot() {
    if (document.body.classList.contains('jl-v3-ready')) return;

    document.body.classList.add(
      'jl-v3-ready',
      'jl-home-mode'
    );

    /* =====================================================
       1. 樣式
       ===================================================== */

    const style = document.createElement('style');

    style.id = 'jl-v3-style';

    style.textContent = `

    :root{
      --jl-purple:#8c22c7;
      --jl-purple2:#b644e6;
      --jl-purple3:#efd8ff;

      --jl-deep:#4d0b70;
      --jl-deep2:#2e063f;

      --jl-gold:#d8a53e;
      --jl-gold2:#f5d77c;

      --jl-paper:#fffafd;
      --jl-lav:#f7ebff;

      --jl-ink:#44244e;
      --jl-muted:#796b80;
      --jl-line:#e5c6f5;

      --jl-shadow:
        0 16px 38px rgba(88,18,125,.13);
    }


    /* ============================
       全站底色
       ============================ */

    body.jl-v3-ready{
      background:
        radial-gradient(
          circle at 15% 0%,
          rgba(212,126,248,.25),
          transparent 27%
        ),
        linear-gradient(
          180deg,
          #ffffff 0%,
          #fbf4ff 55%,
          #f3e5ff 100%
        ) !important;

      color:var(--jl-ink);
    }


    body.jl-v3-ready .wrap{
      max-width:760px !important;
      margin:0 auto !important;
      padding:0 16px 42px !important;
    }


    /* 原本最上方 Hero 收掉 */
    body.jl-v3-ready .wrap > header{
      display:none !important;
    }


    /* 原本 HTML 最底下兩個獨立連結收掉 */
    body.jl-v3-ready > a[href="rz.html"],
    body.jl-v3-ready > a[href="bxcc.html"]{
      display:none !important;
    }



    /* =====================================================
       2. 首頁／功能頁真正分流
       ===================================================== */

    body.jl-home-mode .wrap > :not(.jl-v3-home){
      display:none !important;
    }

    body.jl-home-mode .jl-v3-home{
      display:block !important;
    }


    body.jl-feature-mode .jl-v3-home{
      display:none !important;
    }

    body.jl-feature-mode .wrap > *{
      display:none !important;
    }

    body.jl-feature-mode .wrap > .jl-feature-show{
      display:block !important;
    }



    /* =====================================================
       3. 首頁
       ===================================================== */

    .jl-v3-home{
      margin:0 -16px 22px;
      background:#fff;
      overflow:hidden;
    }



    /* ---------- 頂部 ---------- */

    .jl-v3-top{
      min-height:64px;

      display:flex;
      align-items:center;
      justify-content:space-between;

      gap:10px;

      padding:0 16px;

      position:sticky;
      top:0;
      z-index:70;

      background:rgba(255,255,255,.92);

      border-bottom:
        1px solid #ead4f8;

      backdrop-filter:
        blur(12px);
    }


    .jl-v3-brand{
      display:flex;
      align-items:center;

      gap:8px;

      border:0;
      background:none;

      color:#5e1685;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:21px;
      font-weight:900;

      letter-spacing:.08em;

      cursor:pointer;
    }


    .jl-v3-brandmark{
      width:32px;
      height:32px;

      border:
        1.5px solid var(--jl-gold);

      border-radius:50%;

      display:grid;
      place-items:center;

      color:var(--jl-gold);

      font-size:14px;
    }


    .jl-v3-nav{
      display:flex;
      gap:13px;

      font-size:10px;
      font-weight:800;

      color:#5c4066;
    }


    .jl-v3-nav a:first-child{
      color:var(--jl-purple);
    }


    .jl-v3-mine{
      border:0;

      padding:8px 12px;

      border-radius:999px;

      color:#fff;

      font-size:10px;
      font-weight:900;

      background:
        linear-gradient(
          135deg,
          #831ab9,
          #ae35df
        );

      box-shadow:
        0 7px 17px rgba(124,25,173,.20);

      cursor:pointer;
    }



    /* =====================================================
       4. 老師主視覺
       ===================================================== */

    .jl-v3-hero{
      min-height:420px;

      position:relative;
      overflow:hidden;

      background:
        radial-gradient(
          circle at 18% 80%,
          rgba(157,51,213,.18),
          transparent 28%
        ),
        linear-gradient(
          90deg,
          #fff 0 48%,
          rgba(249,230,255,.88) 64%,
          rgba(178,76,221,.28) 100%
        );
    }


    .jl-v3-hero::after{
      content:"";

      position:absolute;

      right:0;
      top:0;

      width:60%;
      height:100%;

      background:
        linear-gradient(
          90deg,
          #fff 0%,
          rgba(255,255,255,.1) 20%,
          transparent 47%
        ),
        url("hero.jpeg");

      background-size:auto 100%;

      background-position:
        right center;

      background-repeat:no-repeat;
    }


    .jl-v3-hero-copy{
      position:relative;

      z-index:2;

      width:58%;

      padding:
        42px
        12px
        36px
        38px;
    }


    .jl-v3-kicker{
      color:#71209b;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:10px;
      font-weight:900;

      letter-spacing:.2em;

      white-space:nowrap;
    }


    .jl-v3-hero h1{
      margin:
        13px
        0
        7px !important;

      color:#641094 !important;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif !important;

      font-size:50px !important;

      font-weight:900 !important;

      line-height:1.1 !important;

      letter-spacing:.07em !important;

      text-indent:0 !important;
    }


    .jl-v3-tagline{
      color:#c16b29;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:15px;

      font-weight:900;

      letter-spacing:.03em;
    }


    .jl-v3-desc{
      max-width:330px;

      margin-top:15px;

      color:#5e4b64;

      font-size:11px;

      line-height:1.9;
    }


    .jl-v3-quote{
      max-width:300px;

      margin-top:14px;

      padding:
        10px
        13px;

      border-left:
        3px solid var(--jl-gold);

      background:
        rgba(255,255,255,.72);

      color:#6c4c73;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:10.5px;

      line-height:1.8;
    }



    /* =====================================================
       5. 探索命理智慧
       ===================================================== */

    .jl-v3-title{
      padding:
        13px
        14px;

      text-align:center;

      color:#501b68;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:17px;

      font-weight:900;

      letter-spacing:.1em;

      background:
        linear-gradient(
          90deg,
          #fff5ff,
          #f0d7ff,
          #fff5ff
        );

      border-top:
        1px solid #ecd6f7;

      border-bottom:
        1px solid #e5c7f4;
    }



    /* =====================================================
       6. 六大入口
       ===================================================== */

    .jl-v3-tools{
      padding:14px;

      background:
        radial-gradient(
          circle at 50% 38%,
          rgba(216,136,255,.17),
          transparent 45%
        ),
        linear-gradient(
          180deg,
          #fdf8ff,
          #f6e9ff
        );
    }


    .jl-v3-grid{
      display:grid;

      grid-template-columns:
        repeat(3,1fr);

      gap:9px;
    }


    .jl-v3-card{
      min-height:162px;

      border:
        1px solid #e1bef2;

      border-radius:15px;

      padding:
        13px
        8px;

      background:
        linear-gradient(
          180deg,
          #fff,
          #fffafd
        );

      box-shadow:
        0 8px 18px rgba(88,17,119,.08);

      color:var(--jl-ink);

      text-align:center;

      cursor:pointer;

      appearance:none;

      transition:
        transform .16s ease,
        box-shadow .16s ease;
    }


    button.jl-v3-card{
      width:100%;
      font:inherit;
    }


    .jl-v3-card:active{
      transform:
        scale(.985);
    }


    .jl-v3-icon{
      width:60px;
      height:60px;

      margin:
        0
        auto
        8px;

      border:
        2px solid var(--jl-gold);

      border-radius:50%;

      display:grid;
      place-items:center;

      background:
        radial-gradient(
          circle at 35% 25%,
          #b148e9,
          #651392
        );

      color:#f5dc8a;

      box-shadow:
        0 7px 15px rgba(91,14,126,.2);

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:17px;

      font-weight:900;
    }


    .jl-v3-card h3{
      margin:
        0
        0
        4px;

      color:#68149a;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:15px;
    }


    .jl-v3-card p{
      margin:0;

      color:#66566d;

      font-size:9.7px;

      line-height:1.55;
    }


    .jl-v3-meta{
      margin-top:5px;

      color:#8a7890;

      font-size:8.8px;

      line-height:1.5;
    }


    .jl-v3-enter{
      display:inline-block;

      margin-top:8px;

      padding:
        5px
        11px;

      border-radius:7px;

      background:
        linear-gradient(
          135deg,
          #7d1bb1,
          #a52fd8
        );

      color:#fff;

      font-size:8.8px;

      font-weight:900;
    }



    /* =====================================================
       7. 看日子
       ===================================================== */

    .jl-v3-date{
      position:relative;

      min-height:170px;

      margin:
        0
        14px
        11px;

      padding:
        27px
        38%
        24px
        26px;

      overflow:hidden;

      border:
        1px solid #d7acf0;

      border-radius:17px;

      background:
        radial-gradient(
          circle at 82% 50%,
          rgba(255,255,255,.73),
          transparent 24%
        ),
        linear-gradient(
          110deg,
          #fcecff,
          #edd1ff 60%,
          #bf73ea
        );

      box-shadow:
        0 10px 25px rgba(88,16,122,.11);
    }


    .jl-v3-date::after{
      content:"吉日";

      position:absolute;

      right:8%;
      top:50%;

      transform:
        translateY(-50%)
        rotate(-4deg);

      width:100px;
      height:100px;

      display:grid;
      place-items:center;

      border:
        1px solid var(--jl-gold);

      border-radius:14px;

      background:#fff9ee;

      color:#7a1d9b;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:23px;

      font-weight:900;

      box-shadow:
        0 10px 23px rgba(87,15,119,.15);
    }


    .jl-v3-date h3{
      margin:0;

      color:#661099;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:27px;

      letter-spacing:.07em;
    }


    .jl-v3-date p{
      margin:
        7px
        0
        0;

      color:#634f6b;

      font-size:9.8px;

      line-height:1.7;
    }


    .jl-v3-datebtn{
      display:inline-block;

      margin-top:10px;

      padding:
        7px
        18px;

      border-radius:999px;

      background:
        linear-gradient(
          135deg,
          #851db9,
          #ad35df
        );

      color:#fff;

      font-size:9.8px;

      font-weight:900;
    }



    /* =====================================================
       8. 老師諮詢＋LINE
       ===================================================== */

    .jl-v3-contact{
      margin:
        0
        14px
        12px;

      padding:11px;

      display:grid;

      grid-template-columns:
        1.05fr
        .95fr;

      gap:9px;

      border:
        1px solid #ddb7f2;

      border-radius:15px;

      background:
        linear-gradient(
          90deg,
          #fff,
          #fbf2ff
        );

      box-shadow:
        0 8px 20px rgba(87,15,121,.08);
    }


    .jl-v3-contactbox{
      min-height:92px;

      padding:
        11px
        12px;

      border:
        1px solid #e6cef5;

      border-radius:12px;

      background:#fff;
    }


    .jl-v3-contact h3{
      margin:0;

      color:#611091;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:14px;
    }


    .jl-v3-contact p{
      margin:
        5px
        0
        0;

      color:#74627c;

      font-size:9.3px;

      line-height:1.6;
    }


    .jl-v3-line{
      display:flex;

      align-items:center;
      justify-content:center;

      gap:7px;

      margin-top:8px;

      padding:7px;

      border-radius:999px;

      background:
        linear-gradient(
          135deg,
          #821bb6,
          #a62ed9
        );

      color:#fff;

      font-size:9px;

      font-weight:900;
    }


    .jl-v3-linebadge{
      width:23px;
      height:23px;

      border-radius:50%;

      display:grid;
      place-items:center;

      background:#2bcf49;

      font-size:7px;
    }



    /* =====================================================
       9. Footer
       ===================================================== */

    .jl-v3-footer{
      display:grid;

      grid-template-columns:
        repeat(4,1fr);

      gap:5px;

      padding:
        13px
        14px;

      background:
        linear-gradient(
          90deg,
          #3c0c57,
          #5a117c,
          #3c0c57
        );

      color:#f5e6ff;

      text-align:center;

      font-size:8.8px;
    }


    .jl-v3-copy{
      grid-column:1/-1;

      margin-top:4px;

      color:#cdb6d8;

      font-size:7.5px;
    }



    /* =====================================================
       10. 排盤卡統一紫曜 UI
       ===================================================== */

    body.jl-v3-ready .jl-v3-paipan{
      margin-top:20px !important;

      padding:
        22px
        17px !important;

      scroll-margin-top:60px !important;

      border:
        1px solid #dbb8f0 !important;

      border-top:
        4px solid var(--jl-purple) !important;

      border-radius:
        20px !important;

      background:
        linear-gradient(
          180deg,
          #fff,
          #fdf9ff
        ) !important;

      box-shadow:
        var(--jl-shadow) !important;
    }


    body.jl-v3-ready .jl-v3-paipan::before{
      content:
        "生辰排盤 · 建立我的命盤";

      display:block;

      margin-bottom:17px;

      text-align:center;

      color:#611091;

      font-family:
        "Noto Serif TC",
        "Songti TC",
        serif;

      font-size:19px;

      font-weight:900;

      letter-spacing:.1em;
    }


    body.jl-v3-ready .jl-v3-paipan .seg{
      overflow:hidden !important;

      border:
        1px solid #c996e5 !important;

      border-radius:
        11px !important;

      background:
        #faf0ff !important;
    }


    body.jl-v3-ready
    .jl-v3-paipan
    .seg
    button[aria-pressed="true"]{

      background:
        linear-gradient(
          135deg,
          #7f19b3,
          #aa33df
        ) !important;

      color:#fff !important;
    }


    body.jl-v3-ready
    .jl-v3-paipan
    input,

    body.jl-v3-ready
    .jl-v3-paipan
    select{

      border-color:
        #d9b7eb !important;

      border-radius:
        9px !important;

      background:#fff !important;
    }


    body.jl-v3-ready
    .jl-v3-paipan
    .go{

      border-radius:
        11px !important;

      background:
        linear-gradient(
          135deg,
          #7e1ab2,
          #ab32df
        ) !important;

      box-shadow:
        0 10px 22px
        rgba(118,24,163,.18) !important;
    }



    /* 功能入口提示 */

    .jl-v3-note{
      display:none;

      margin:
        12px
        0
        0;

      padding:
        10px
        12px;

      border:
        1px solid #ddbcf0;

      border-radius:10px;

      background:#f4e4ff;

      color:#683080;

      font-size:11px;

      line-height:1.7;
    }


    .jl-v3-note.show{
      display:block;
    }



    /* =====================================================
       11. 返回首頁
       ===================================================== */

    #jl-v3-back{
      position:sticky;

      top:0;

      z-index:90;

      display:block;

      width:100%;

      padding:
        12px
        15px;

      border:0;

      background:
        linear-gradient(
          90deg,
          #4d0b70,
          #7d1bb3
        );

      color:#fff;

      font-weight:900;

      letter-spacing:.08em;

      cursor:pointer;
    }



    /* =====================================================
       12. 手機
       ===================================================== */

    @media(max-width:600px){

      .jl-v3-nav{
        display:none;
      }


      .jl-v3-hero{
        min-height:525px;
      }


      .jl-v3-hero::after{
        width:100%;
        height:58%;

        top:auto;
        bottom:0;

        background:
          linear-gradient(
            180deg,
            #fff 0%,
            rgba(255,255,255,.15) 18%,
            transparent 45%
          ),
          url("hero.jpeg");

        background-size:
          auto 100%;

        background-position:
          right bottom;

        background-repeat:no-repeat;
      }


      .jl-v3-hero-copy{
        width:100%;

        padding:
          27px
          20px
          270px;
      }


      .jl-v3-hero h1{
        font-size:
          38px !important;
      }


      .jl-v3-kicker{
        font-size:9px;
      }


      .jl-v3-desc{
        max-width:290px;

        font-size:10.3px;
      }


      .jl-v3-quote{
        max-width:275px;

        font-size:9.8px;
      }


      .jl-v3-title{
        font-size:14px;
      }


      .jl-v3-tools{
        padding:10px;
      }


      .jl-v3-grid{
        gap:7px;
      }


      .jl-v3-card{
        min-height:150px;

        padding:
          11px
          6px;
      }


      .jl-v3-icon{
        width:52px;
        height:52px;

        font-size:14px;
      }


      .jl-v3-card h3{
        font-size:13px;
      }


      .jl-v3-card p{
        font-size:8.7px;
      }


      .jl-v3-meta{
        font-size:7.8px;
      }


      .jl-v3-enter{
        padding:
          5px
          9px;

        font-size:8px;
      }


      .jl-v3-date{
        margin:
          0
          10px
          10px;

        min-height:155px;

        padding:
          20px
          42%
          18px
          18px;
      }


      .jl-v3-date h3{
        font-size:23px;
      }


      .jl-v3-date::after{
        width:82px;
        height:82px;

        right:5%;

        font-size:20px;
      }


      .jl-v3-contact{
        margin:
          0
          10px
          10px;

        grid-template-columns:1fr;
      }


      .jl-v3-footer{
        font-size:8px;
      }

    }

    `;

    document.head.appendChild(style);



    /* =====================================================
       13. 找到原本排盤卡
       ===================================================== */

    const wrap =
      document.querySelector('.wrap');

    if (!wrap) return;


    const directCards =
      wrap.querySelectorAll(':scope > .card');


    if (!directCards.length) return;


    const paipan =
      directCards[0];


    paipan.id =
      paipan.id || 'paipan';


    paipan.classList.add(
      'jl-v3-paipan'
    );


    const note =
      document.createElement('div');


    note.className =
      'jl-v3-note';


    paipan.appendChild(note);



    /* =====================================================
       14. 建立新版首頁
       ===================================================== */

    const home =
      document.createElement('section');


    home.className =
      'jl-v3-home';


    home.innerHTML = `

      <div class="jl-v3-top">

        <button
          type="button"
          class="jl-v3-brand"
          id="jl-home-logo"
        >
          <span class="jl-v3-brandmark">
            筠
          </span>

          <span>
            筠玲易數
          </span>
        </button>


        <nav class="jl-v3-nav">

          <a href="#jl-tools">
            首頁
          </a>

          <a href="#jl-contact">
            關於老師
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
          class="jl-v3-mine"
          id="jl-mine"
        >
          ☯ 我的命盤
        </button>

      </div>



      <section class="jl-v3-hero">

        <div class="jl-v3-hero-copy">

          <div class="jl-v3-kicker">
            ✦ 以數觀象 · 以卦察勢 · 以理明心 ✦
          </div>


          <h1>
            筠玲易數
          </h1>


          <div class="jl-v3-tagline">
            解析命運的軌跡 · 掌握人生的方向
          </div>


          <div class="jl-v3-desc">
            結合傳統命理智慧與現代視角，
            協助您了解自己、趨吉避凶，
            創造更好的人生。
          </div>


          <div class="jl-v3-quote">
            命，不是定局；
            看懂自己的局，
            才知道下一步怎麼走。
            <br>
            <b>— 筠玲老師</b>
          </div>

        </div>

      </section>



      <div class="jl-v3-title">

        ✦
        探索命理智慧 · 開啟人生新局
        ✦

      </div>



      <section
        class="jl-v3-tools"
        id="jl-tools"
      >

        <div class="jl-v3-grid">


          <button
            type="button"
            class="jl-v3-card"
            data-route="四柱"
          >

            <div class="jl-v3-icon">
              四柱
            </div>

            <h3>
              四柱八字
            </h3>

            <p>
              生辰排盤 · 命運解析
            </p>

            <div class="jl-v3-meta">
              先天 × 後天 × 五行
              <br>
              大運 × 流年 × 格局
            </div>

            <span class="jl-v3-enter">
              進入解析 ›
            </span>

          </button>



          <button
            type="button"
            class="jl-v3-card"
            data-route="九宮"
          >

            <div class="jl-v3-icon">
              九宮
            </div>

            <h3>
              紫微／九宮
            </h3>

            <p>
              命盤解析 · 宮位星曜
            </p>

            <div class="jl-v3-meta">
              宮位 × 星曜 × 格局
              <br>
              吉凶 × 組合 × 解析
            </div>

            <span class="jl-v3-enter">
              進入解析 ›
            </span>

          </button>



          <button
            type="button"
            class="jl-v3-card"
            data-route="奇門"
          >

            <div class="jl-v3-icon">
              奇門
            </div>

            <h3>
              奇門遁甲
            </h3>

            <p>
              問事決策 · 趨吉避凶
            </p>

            <div class="jl-v3-meta">
              時間 × 方位 × 局勢
              <br>
              開門 × 落宮 × 值符
            </div>

            <span class="jl-v3-enter">
              進入解析 ›
            </span>

          </button>



          <button
            type="button"
            class="jl-v3-card"
            data-route="六親"
          >

            <div class="jl-v3-icon">
              六親
            </div>

            <h3>
              六壬／六親
            </h3>

            <p>
              事情推演 · 事件解析
            </p>

            <div class="jl-v3-meta">
              關係 × 事件 × 發展
              <br>
              占斷 × 判事 × 應驗
            </div>

            <span class="jl-v3-enter">
              進入解析 ›
            </span>

          </button>



          <a
            href="bxcc.html"
            class="jl-v3-card"
          >

            <div class="jl-v3-icon">
              八星
            </div>

            <h3>
              八星磁場
            </h3>

            <p>
              數字能量 · 磁場解析
            </p>

            <div class="jl-v3-meta">
              手機 × 車牌 × 門牌
              <br>
              數字 × 能量 × 吉凶
            </div>

            <span class="jl-v3-enter">
              進入解析 ›
            </span>

          </a>



          <button
            type="button"
            class="jl-v3-card"
            data-route="流年"
          >

            <div class="jl-v3-icon">
              流年
            </div>

            <h3>
              流年運勢
            </h3>

            <p>
              年度運勢 · 流月解析
            </p>

            <div class="jl-v3-meta">
              年度 × 月運 × 日運
              <br>
              趨勢 × 提醒 × 建議
            </div>

            <span class="jl-v3-enter">
              進入解析 ›
            </span>

          </button>


        </div>

      </section>



      <section class="jl-v3-date">

        <h3>
          擇吉看日
        </h3>


        <p>
          結婚 · 開業 · 搬家 ·
          簽約 · 出行 · 入宅 ·
          動土 · 祈福
        </p>


        <p>
          選一個適合您的好日子，
          讓事情順利圓滿。
        </p>


        <a
          href="rz.html"
          class="jl-v3-datebtn"
        >
          開始看日子 ›
        </a>

      </section>



      <section
        class="jl-v3-contact"
        id="jl-contact"
      >


        <div class="jl-v3-contactbox">

          <h3>
            需要進一步命理解讀？
          </h3>


          <p>
            筠玲老師提供一對一專業諮詢服務，
            深入分析您的命盤。
          </p>

        </div>



        <div class="jl-v3-contactbox">

          <h3>
            加入筠玲老師 LINE
          </h3>


          <p>
            LINE ID：
            <b>
              @804kmmmy
            </b>
          </p>


          <a
            href="https://line.me/ti/p/@804kmmmy"
            class="jl-v3-line"
          >

            <span class="jl-v3-linebadge">
              LINE
            </span>

            <span>
              @804kmmmy ›
            </span>

          </a>

        </div>


      </section>



      <footer class="jl-v3-footer">

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


        <div class="jl-v3-copy">
          © 2026 筠玲易數
          · All Rights Reserved.
        </div>

      </footer>

    `;


    wrap.insertBefore(
      home,
      paipan
    );



    /* =====================================================
       15. 基本工具函式
       ===================================================== */

    function normalize(str) {

      return String(str || '')
        .replace(/\s+/g, '');

    }



    function getWrapChild(node) {

      if (!node) return null;


      let current = node;


      while (
        current &&
        current.parentElement !== wrap
      ) {

        current =
          current.parentElement;

      }


      if (
        current &&
        current.parentElement === wrap
      ) {

        return current;

      }


      return null;

    }



    function clearFeature() {

      wrap
        .querySelectorAll(
          '.jl-feature-show'
        )
        .forEach(function (el) {

          el.classList.remove(
            'jl-feature-show'
          );

        });

    }



    /* =====================================================
       16. 回首頁
       ===================================================== */

    function enterHome() {

      clearFeature();


      document.body.classList.remove(
        'jl-feature-mode'
      );


      document.body.classList.add(
        'jl-home-mode'
      );


      window.scrollTo({
        top:0,
        behavior:'smooth'
      });

    }



    /* =====================================================
       17. 建立返回首頁按鈕
       ===================================================== */

    function ensureBackButton() {

      let back =
        document.getElementById(
          'jl-v3-back'
        );


      if (!back) {

        back =
          document.createElement(
            'button'
          );


        back.id =
          'jl-v3-back';


        back.type =
          'button';


        back.textContent =
          '← 回到功能首頁';


        back.addEventListener(
          'click',
          enterHome
        );


        wrap.insertBefore(
          back,
          wrap.firstChild
        );

      }


      return back;

    }



    /* =====================================================
       18. 進功能模式
       ===================================================== */

    function enterFeature(
      target,
      showResult
    ) {

      clearFeature();


      document.body.classList.remove(
        'jl-home-mode'
      );


      document.body.classList.add(
        'jl-feature-mode'
      );


      let block =
        getWrapChild(target);


      if (!block) {

        block = paipan;

      }


      block.classList.add(
        'jl-feature-show'
      );


      /*
        如果不是排盤卡，
        同時保留排盤入口，
        使用者仍能修改出生資料
      */

      if (block !== paipan) {

        paipan.classList.add(
          'jl-feature-show'
        );

      }


      if (showResult) {

        const out =
          document.getElementById(
            'out'
          );


        if (out) {

          out.classList.add(
            'jl-feature-show'
          );

        }

      }


      const back =
        ensureBackButton();


      back.classList.add(
        'jl-feature-show'
      );


      setTimeout(function () {

        block.scrollIntoView({
          behavior:'smooth',
          block:'start'
        });

      }, 80);

    }



    /* =====================================================
       19. 找命理功能區塊
       ===================================================== */

    function findTarget(term) {

      const alias = {

        '九宮':[
          '奇門數字九宮盤',
          '數字九宮盤',
          '九宮盤',
          '九宮'
        ],


        '奇門':[
          '奇門遁甲',
          '奇門'
        ],


        '六親':[
          '六親對照',
          '六親解析',
          '六親'
        ],


        '流年':[
          '流年運勢',
          '流年'
        ],


        '四柱':[
          '四柱八字',
          '四柱'
        ]

      };


      const words =
        alias[term] || [term];



      /*
        先找標題
      */

      const headings =
        document.querySelectorAll(
          'h1,h2,h3,h4,summary'
        );


      for (
        let i = 0;
        i < headings.length;
        i++
      ) {

        const txt =
          normalize(
            headings[i].textContent
          );


        for (
          let j = 0;
          j < words.length;
          j++
        ) {

          if (
            txt.indexOf(
              normalize(words[j])
            ) !== -1
          ) {

            return headings[i];

          }

        }

      }



      /*
        再找外掛卡片
      */

      const cards =
        document.querySelectorAll(
          '#plugs0 > .card,' +
          '#plug > .card,' +
          '#plugs > .card,' +
          '#out > .card,' +
          '.card.pro'
        );


      for (
        let i = 0;
        i < cards.length;
        i++
      ) {

        const txt =
          normalize(
            cards[i].textContent
          );


        for (
          let j = 0;
          j < words.length;
          j++
        ) {

          if (
            txt.indexOf(
              normalize(words[j])
            ) !== -1
          ) {

            return cards[i];

          }

        }

      }


      return null;

    }



    /* =====================================================
       20. 判斷是否已排盤
       ===================================================== */

    function hasChart() {

      const out =
        document.getElementById(
          'out'
        );


      if (!out) return false;


      return !out.classList.contains(
        'hide'
      );

    }



    /* =====================================================
       21. 點六大入口
       ===================================================== */

    function openRoute(term) {

      sessionStorage.setItem(
        'jl-v3-route',
        term
      );


      /*
        四柱一定先到生辰排盤
      */

      if (term === '四柱') {

        note.textContent =
          '請輸入出生資料並排盤，完成後會顯示四柱、先天、後天與完整命盤。';


        note.classList.add(
          'show'
        );


        enterFeature(
          paipan,
          false
        );


        return;

      }



      /*
        九宮／奇門／六親／流年
        沒有命盤時先去排盤
      */

      if (!hasChart()) {

        const msg = {

          '九宮':
            '九宮分析需要先建立命盤，請先完成生辰排盤。',

          '奇門':
            '奇門遁甲需要先建立命盤，請先完成生辰排盤。',

          '六親':
            '六親分析需要先建立命盤，請先完成生辰排盤。',

          '流年':
            '流年運勢需要先建立命盤，請先完成生辰排盤。'

        };


        note.textContent =
          msg[term] ||
          '請先完成生辰排盤。';


        note.classList.add(
          'show'
        );


        enterFeature(
          paipan,
          false
        );


        return;

      }



      /*
        已經排盤
      */

      const target =
        findTarget(term);


      if (target) {

        note.classList.remove(
          'show'
        );


        enterFeature(
          target,
          true
        );

      }
      else {

        const out =
          document.getElementById(
            'out'
          );


        note.textContent =
          '命盤已建立，但「' +
          term +
          '」區塊目前尚未找到。' +
          '這不是按鈕沒反應，' +
          '而是對應外掛還沒有生成完成。';


        note.classList.add(
          'show'
        );


        enterFeature(
          out || paipan,
          true
        );

      }

    }



    /* =====================================================
       22. 六大卡片事件
       ===================================================== */

    home
      .querySelectorAll(
        '[data-route]'
      )
      .forEach(function (button) {

        button.addEventListener(
          'click',
          function () {

            openRoute(
              button.getAttribute(
                'data-route'
              )
            );

          }
        );

      });



    /* =====================================================
       23. 我的命盤
       ===================================================== */

    const mine =
      home.querySelector(
        '#jl-mine'
      );


    if (mine) {

      mine.addEventListener(
        'click',
        function () {

          openRoute(
            '四柱'
          );

        }
      );

    }



    /* =====================================================
       24. Logo 回首頁
       ===================================================== */

    const logo =
      home.querySelector(
        '#jl-home-logo'
      );


    if (logo) {

      logo.addEventListener(
        'click',
        enterHome
      );

    }



    /* =====================================================
       25. 排盤完成後，自動前往原本選的功能
       ===================================================== */

    const go =
      document.getElementById(
        'go'
      );


    if (go) {

      go.addEventListener(
        'click',
        function () {

          const term =
            sessionStorage.getItem(
              'jl-v3-route'
            );


          if (!term) return;


          note.classList.remove(
            'show'
          );


          let tries = 0;


          const timer =
            setInterval(
              function () {

                tries++;


                const out =
                  document.getElementById(
                    'out'
                  );


                const ready =
                  out &&
                  !out.classList.contains(
                    'hide'
                  );


                if (ready) {

                  /*
                    四柱：
                    直接顯示整個結果
                  */

                  if (
                    term === '四柱'
                  ) {

                    clearInterval(
                      timer
                    );


                    sessionStorage.removeItem(
                      'jl-v3-route'
                    );


                    enterFeature(
                      out,
                      true
                    );


                    return;

                  }



                  /*
                    其他功能：
                    等外掛生成
                  */

                  const target =
                    findTarget(
                      term
                    );


                  if (target) {

                    clearInterval(
                      timer
                    );


                    sessionStorage.removeItem(
                      'jl-v3-route'
                    );


                    enterFeature(
                      target,
                      true
                    );


                    return;

                  }

                }



                /*
                  最多等約 7 秒
                */

                if (tries >= 28) {

                  clearInterval(
                    timer
                  );


                  if (ready) {

                    enterFeature(
                      out,
                      true
                    );

                  }

                }

              },
              250
            );

        },
        true
      );

    }

  }



  /* =======================================================
     啟動
     ======================================================= */

  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      boot
    );

  }
  else {

    boot();

  }

})();
