/* =========================================================
   筠玲易數｜MASTER 首頁正式版
   ---------------------------------------------------------
   首頁：
   - 完全使用 MASTER 視覺
   - 六大入口可點
   - 看日子可點
   - LINE 可點
   - 我的命盤可點

   功能：
   - 原本排盤、九宮、奇門、六親、流年全部保留
   - 不改 data-*.js
   - 不改 gua169.js
   - 不改原本計算核心
   ========================================================= */

(function () {
  'use strict';

  function boot() {

    if (
      document.documentElement.dataset.jlMasterV2 === '1'
    ) {
      return;
    }

    document.documentElement.dataset.jlMasterV2 = '1';


    const wrap =
      document.querySelector('.wrap');


    if (!wrap) {
      console.warn('筠玲易數：找不到 .wrap');
      return;
    }



    /* =====================================================
       1. 原本網站全部收進功能殼
       ===================================================== */

    const feature =
      document.createElement('div');


    feature.id =
      'jl-feature-shell';


    const oldChildren =
      Array.from(wrap.children);


    oldChildren.forEach(function (node) {

      feature.appendChild(node);

    });


    wrap.appendChild(feature);



    /* =====================================================
       2. 找原本排盤區
       ===================================================== */

    const directCards =
      Array.from(feature.children)
        .filter(function (node) {

          return (
            node.classList &&
            node.classList.contains('card')
          );

        });


    const paipan =
      directCards[0] ||
      feature.querySelector('.card');


    const out =
      feature.querySelector('#out');


    const go =
      feature.querySelector('#go');


    if (paipan) {

      paipan.id =
        paipan.id || 'paipan';

    }



    /* =====================================================
       3. 舊功能選單不要再重複出現
       ===================================================== */

    Array
      .from(
        feature.querySelectorAll('.card')
      )
      .forEach(function (card) {

        const text =
          (card.textContent || '')
            .replace(/\s+/g, '');


        if (
          text.includes('功能選單')
        ) {

          card.classList.add(
            'jl-old-menu'
          );

        }

      });



    /* =====================================================
       4. 建立 MASTER 首頁
       ===================================================== */

    const home =
      document.createElement('section');


    home.id =
      'jl-master-home';


    home.innerHTML = `

<div
  class="jl-master-canvas"
  aria-label="筠玲易數首頁">

  <img
    class="jl-master-img"
    src="home-master-v2.webp"
    alt="筠玲易數紫曜典藏版">


  <!-- 我的命盤 -->
  <button
    type="button"
    class="jl-hotspot jl-hot-my"
    data-route="四柱"
    aria-label="我的命盤">
  </button>


  <!-- 第一排 -->

  <button
    type="button"
    class="jl-hotspot jl-hot-bazi"
    data-route="四柱"
    aria-label="四柱八字">
  </button>


  <button
    type="button"
    class="jl-hotspot jl-hot-jiugong"
    data-route="九宮"
    aria-label="紫微九宮">
  </button>


  <button
    type="button"
    class="jl-hotspot jl-hot-qimen"
    data-route="奇門"
    aria-label="奇門遁甲">
  </button>


  <!-- 第二排 -->

  <button
    type="button"
    class="jl-hotspot jl-hot-liuqin"
    data-route="六親"
    aria-label="六壬六親">
  </button>


  <a
    class="jl-hotspot jl-hot-baxing"
    href="bxcc.html"
    aria-label="八星磁場">
  </a>


  <button
    type="button"
    class="jl-hotspot jl-hot-liunian"
    data-route="流年"
    aria-label="流年運勢">
  </button>


  <!-- 看日子 -->

  <a
    class="jl-hotspot jl-hot-date"
    href="rz.html"
    aria-label="擇吉看日">
  </a>


  <!-- LINE -->

  <a
    class="jl-hotspot jl-hot-line"
    href="https://line.me/ti/p/@804kmmmy"
    aria-label="加入筠玲老師LINE">
  </a>

</div>

`;


    wrap.insertBefore(
      home,
      feature
    );



    /* =====================================================
       5. 功能頁返回首頁
       ===================================================== */

    const back =
      document.createElement('button');


    back.id =
      'jl-back-home';


    back.type =
      'button';


    back.textContent =
      '← 回到功能首頁';


    feature.insertBefore(
      back,
      feature.firstChild
    );



    /* =====================================================
       6. 首頁 / 功能頁切換
       ===================================================== */

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

        const element =
          target ||
          paipan ||
          feature;


        if (element) {

          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

        }

      }, 60);

    }



    back.addEventListener(
      'click',
      showHome
    );



    /* =====================================================
       7. 找外掛功能
       ===================================================== */

    function normalize(text) {

      return String(text || '')
        .replace(/\s+/g, '');

    }



    function findTarget(term) {

      const aliases = {

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
        aliases[term] || [term];


      const nodes =
        Array.from(
          feature.querySelectorAll(
            'h2,' +
            'h3,' +
            'h4,' +
            'summary,' +
            '#plugs0 > .card,' +
            '#plug > .card,' +
            '#plugs > .card,' +
            '#out > .card,' +
            '.card.pro'
          )
        );


      for (
        let i = 0;
        i < nodes.length;
        i++
      ) {

        const text =
          normalize(
            nodes[i].textContent
          );


        for (
          let j = 0;
          j < words.length;
          j++
        ) {

          if (
            text.includes(
              normalize(words[j])
            )
          ) {

            return nodes[i];

          }

        }

      }


      return null;

    }



    /* =====================================================
       8. 判斷是否已排盤
       ===================================================== */

    function hasChart() {

      return !!(
        out &&
        !out.classList.contains('hide')
      );

    }



    /* =====================================================
       9. 排盤提示
       ===================================================== */

    let note = null;


    if (paipan) {

      note =
        document.createElement('div');


      note.className =
        'jl-master-note';


      paipan.appendChild(note);

    }



    function setNote(text) {

      if (!note) return;


      note.textContent =
        text;


      note.classList.add(
        'show'
      );

    }



    function clearNote() {

      if (!note) return;


      note.classList.remove(
        'show'
      );

    }



    /* =====================================================
       10. 六大功能路由
       ===================================================== */

    function route(term) {

  sessionStorage.setItem(
    'jl-master-route',
    term
  );

  clearNote();

  /* 四柱八字 */
  if (term === '四柱') {

    showFeature(paipan);

    return;
  }

  /* 紫微 / 九宮 */
  if (term === '九宮') {

    const target = findTarget('九宮');

    if (target) {

      showFeature(target);

    } else {

      setNote(
        '請先完成生辰排盤，再查看九宮分析。'
      );

      showFeature(paipan);
    }

    return;
  }

  /* 奇門遁甲 */
  if (term === '奇門') {

    const target = findTarget('奇門');

    if (target) {

      showFeature(target);

    } else {

      setNote(
        '請先完成生辰排盤，再查看奇門遁甲。'
      );

      showFeature(paipan);
    }

    return;
  }

  /* 六壬 / 六親 */
  if (term === '六親') {

    const target = findTarget('六親');

    if (target) {

      showFeature(target);

    } else {

      setNote(
        '請先完成生辰排盤，再查看六親分析。'
      );

      showFeature(paipan);
    }

    return;
  }

  /* 流年運勢 */
  if (term === '流年') {

    const target = findTarget('流年');

    if (target) {

      showFeature(target);

    } else {

      setNote(
        '請先完成生辰排盤，再查看流年運勢。'
      );

      showFeature(paipan);
    }

    return;
  }

}



    /* =====================================================
       11. 首頁按鈕事件
       ===================================================== */

    home
      .querySelectorAll(
        '[data-route]'
      )
      .forEach(function (button) {

        button.addEventListener(
          'click',
          function () {

            route(
              button.dataset.route
            );

          }
        );

      });



    /* =====================================================
       12. 排盤完成後自動前往功能
       ===================================================== */

    if (go) {

      go.addEventListener(
        'click',
        function () {

          const term =
            sessionStorage.getItem(
              'jl-master-route'
            );


          if (!term) return;


          let tries = 0;


          const timer =
            setInterval(
              function () {

                tries++;


                if (
                  hasChart()
                ) {

                  clearInterval(
                    timer
                  );


                  clearNote();


                  if (
                    term === '四柱'
                  ) {

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
                    'jl-master-route'
                  );


                  return;

                }


                if (
                  tries >= 32
                ) {

                  clearInterval(
                    timer
                  );

                }

              },

              250
            );

        },

        true
      );

    }



    /* =====================================================
       13. MASTER 首頁 CSS
       ===================================================== */

    const style =
      document.createElement('style');


    style.id =
      'jl-master-v2-style';


    style.textContent = `

html,
body{
  overflow-x:hidden !important;
}


body{
  margin:0 !important;
  background:#1b0828 !important;
}


.wrap{
  max-width:1024px !important;
  margin:0 auto !important;
  padding:0 !important;
}


/* 首頁只顯示 MASTER */

body.jl-home-mode
#jl-master-home{
  display:block !important;
}


body.jl-home-mode
#jl-feature-shell{
  display:none !important;
}


/* 功能頁只顯示舊功能 */

body.jl-feature-mode
#jl-master-home{
  display:none !important;
}


body.jl-feature-mode
#jl-feature-shell{
  display:block !important;
}


#jl-feature-shell{
  display:none;
}


/* 隱藏舊總功能選單 */

#jl-feature-shell
> .jl-old-menu{
  display:none !important;
}


/* MASTER */

#jl-master-home{
  width:100%;
  margin:0;
  padding:0;
  background:#2d0d47;
}


.jl-master-canvas{
  position:relative;
  width:100%;
  line-height:0;
}


.jl-master-img{
  display:block;
  width:100%;
  height:auto;

  user-select:none;
  -webkit-user-drag:none;
}


/* 透明點擊區 */

.jl-hotspot{
  position:absolute;

  display:block;

  border:0;

  margin:0;
  padding:0;

  background:transparent;

  cursor:pointer;

  z-index:20;

  border-radius:14px;

  -webkit-tap-highlight-color:
    rgba(255,255,255,.15);
}


.jl-hotspot:focus-visible{

  outline:
    3px solid #ffd761;

  outline-offset:
    2px;

}


/* =====================================================
   MASTER 1024 × 1536 座標
   ===================================================== */


/* 我的命盤 */

.jl-hot-my{
  left:84.0%;
  top:1.0%;
  width:13.5%;
  height:3.3%;
}


/* 第一排 */

.jl-hot-bazi{
  left:5.0%;
  top:35.1%;
  width:29.3%;
  height:18.8%;
}


.jl-hot-jiugong{
  left:35.3%;
  top:35.1%;
  width:29.3%;
  height:18.8%;
}


.jl-hot-qimen{
  left:65.6%;
  top:35.1%;
  width:29.3%;
  height:18.8%;
}


/* 第二排 */

.jl-hot-liuqin{
  left:5.0%;
  top:55.6%;
  width:29.3%;
  height:18.8%;
}


.jl-hot-baxing{
  left:35.3%;
  top:55.6%;
  width:29.3%;
  height:18.8%;
}


.jl-hot-liunian{
  left:65.6%;
  top:55.6%;
  width:29.3%;
  height:18.8%;
}


/* 擇吉看日 */

.jl-hot-date{
  left:2.8%;
  top:77.0%;
  width:94.4%;
  height:9.9%;
}


/* LINE */

.jl-hot-line{
  left:37.0%;
  top:88.5%;
  width:59.0%;
  height:6.8%;
}


/* 返回功能首頁 */

#jl-back-home{

  position:sticky;

  top:0;

  z-index:100;

  width:100%;

  border:0;

  padding:
    12px 16px;

  background:

    linear-gradient(
      90deg,
      #4d0b70,
      #7d1bb3
    );

  color:#fff;

  font-weight:900;

  letter-spacing:.08em;

}


/* 排盤提示 */

.jl-master-note{

  display:none;

  margin:
    10px 0 0;

  padding:
    9px 11px;

  border:
    1px solid #ddbcf0;

  border-radius:9px;

  background:#f4e4ff;

  color:#683080;

  font-size:10px;

  line-height:1.6;

}


.jl-master-note.show{
  display:block;
}

`;


    document.head.appendChild(
      style
    );


    /* 預設首頁 */
    showHome();

  }



  if (
    document.readyState ===
    'loading'
  ) {

    document.addEventListener(
      'DOMContentLoaded',
      boot
    );

  } else {

    boot();

  }

})();
