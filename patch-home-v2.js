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
  if(paipan && !paipan.querySelector('.jli-paipan-tag')){
    const tag=document.createElement('span');
    tag.className='jli-paipan-tag';
    tag.textContent='生辰定盤';
    paipan.prepend(tag);
  }

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


    <!-- 數字八字卦 -->

    <article class="jlf-card">

      <div class="jlf-badge">
        <img src="badge-shuzibagua-v1.svg" alt="數字八字卦紫金徽章">
      </div>

      <h3>數字八字卦</h3>

      <p>
        生辰數卦 · 格局解析
      </p>

      <small>
        數字 × 八卦 × 五行
        <br>
        本命 × 格局 × 解讀
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


<a class="jlf-taohua" href="taohua.html" aria-label="進入桃花神數">

  <img src="badge-taohua-v1.svg" alt="桃花神數紫金徽章">

  <div>
    <small>NEW · 四枚玉錢 × 256 組教材</small>
    <strong class="jlf-taohua-title">桃花神數</strong>
    <p>一事一問 · 四次取數 · 教材原判與白話提醒</p>
  </div>

  <b>開始起數 ›</b>

</a>


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
      <button type="button" data-jli-route="六親">數字八字卦</button>
      <a href="bxcc.html">八星磁場</a>
      <button type="button" data-jli-route="流年">流年運勢</button>
    </nav>`;
  feature.insertBefore(innerHead,back);

  const routeGuide=document.createElement('section');
  routeGuide.id='jli-guide';
  routeGuide.innerHTML=`
    <div class="jli-guide-head">
      <span id="jli-guide-mark">命</span>
      <div><small id="jli-guide-kicker">專業命理解析</small><h2 id="jli-guide-title">從出生時間看見命盤結構</h2></div>
    </div>
    <p id="jli-guide-desc"></p>
    <div class="jli-guide-tags" id="jli-guide-tags"></div>
    <div class="jli-guide-foot">
      <div><b>操作方式</b><span id="jli-guide-how"></span></div>
      <div><b>隱私安心</b><span id="jli-guide-safe"></span></div>
    </div>`;
  back.insertAdjacentElement('afterend',routeGuide);

  /* 專業盤與一般客戶解讀分層：不碰原計算，只整理閱讀入口。 */
  const readingPanel=document.createElement('section');
  readingPanel.id='jli-reading';
  readingPanel.innerHTML=`
    <div class="jli-reading-tabs" role="tablist" aria-label="命盤閱讀方式">
      <button type="button" class="on" data-jli-reading="chart" aria-selected="true"><i>盤</i><span>專業盤<small>完整盤表資料</small></span></button>
      <button type="button" data-jli-reading="plain" aria-selected="false"><i>解</i><span>白話解讀<small>一般人也能理解</small></span></button>
    </div>
    <div class="jli-reading-body" hidden>
      <div class="jli-reading-title"><span id="jli-reading-mark">解</span><div><small>一般客戶閱讀模式</small><h2 id="jli-reading-title">先看重點，再理解命盤</h2></div></div>
      <p id="jli-reading-lead"></p>
      <div class="jli-reading-points" id="jli-reading-points"></div>
      <div class="jli-pro-preview">
        <div class="jli-pro-lock">專</div>
        <div><small>PROFESSIONAL REPORT</small><h3>完整專業版解讀</h3><p id="jli-pro-desc"></p></div>
        <div class="jli-pro-tags" id="jli-pro-tags"></div>
        <button type="button" id="jli-open-pro">查看專業分析模組</button>
      </div>
      <p class="jli-reading-note">命理內容適合自我理解與人生規劃參考，重要醫療、法律及投資決策仍應諮詢相關專業人士。</p>
    </div>`;
  routeGuide.insertAdjacentElement('afterend',readingPanel);

  /* 數字八字卦與奇門各自使用專屬工作台，避免一進入口就誤以為是四柱排盤。 */
  const moduleHub=document.createElement('section');
  moduleHub.id='jli-module-hub';
  moduleHub.hidden=true;
  readingPanel.insertAdjacentElement('afterend',moduleHub);

  const moduleMeta={
    六親:{
      eyebrow:'DIGITAL BAGUA · PROFESSIONAL WORKSPACE',
      title:'數字八字卦專業分析',
      desc:'生辰表單只負責換算六柱數字；完成後依序閱讀本命數卦、五行陰陽、六親斷、萬物類象與 169 卦義。這裡不混入四柱八字解讀。',
      items:[
        ['生辰取數','先建立六柱數字','birth','取'],
        ['六親斷','父母、手足、伴侶與子女關係','六親全覽','親'],
        ['169 卦義','0～12 兩數組合的卦義詳解','卦義詳解','169'],
        ['萬物類象','五行、人物、職業與事物象意','萬物類象','象']
      ]
    },
    奇門:{
      eyebrow:'QIMEN · DECISION WORKSPACE',
      title:'奇門遁甲專業分析',
      desc:'奇門入口分為手機數字落宮與 81 象意兩套工具；可直接選擇需要的分析，不再顯示四柱生辰排盤。',
      items:[
        ['奇門手機排盤','末七碼落宮、門路與逐碼詳解','奇門手機號論斷','奇'],
        ['81 象意查詢','1～81 數理吉凶與完整象意','數理象意','81']
      ]
    }
  };

  function setModuleHub(term){
    const meta=moduleMeta[term];
    moduleHub.hidden=!meta;
    if(!meta){ moduleHub.innerHTML=''; return; }
    moduleHub.innerHTML='<div class="jli-module-intro"><small>'+meta.eyebrow+'</small><h2>'+meta.title+'</h2><p>'+meta.desc+'</p></div>'+
      '<div class="jli-module-grid">'+meta.items.map(function(item){
        return '<button type="button" data-jli-module="'+item[2]+'"><i>'+item[3]+'</i><span><b>'+item[0]+'</b><small>'+item[1]+'</small></span><em>進入 ›</em></button>';
      }).join('')+'</div>';
  }


  function showHome(){

    sessionStorage.removeItem('jlf-pending');


    document.body.classList.remove(
      'jlf-feature-mode'
    );

    document.body.classList.add(
      'jlf-home-mode'
    );

    document.dispatchEvent(
      new CustomEvent('jl:route-change',{detail:{route:'home'}})
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


  /*
   * 每個入口只顯示自己的專業內容。
   * 這份清單刻意採白名單，避免新插件或「其他工具」被誤塞進八字頁。
   */
  const routeTitles={
    四柱:['四柱八字','六柱環','先天後天'],
    九宮:['奇門數字九宮盤'],
    奇門:['奇門手機號論斷','數理象意','81數理象意'],
    六親:['五行能量','陰陽屬性','陰陽斷','六親對照','六親全覽','萬物類象','卦義詳解','169卦義','卦體一覽'],
    流年:['大運分段','流年一至九九']
  };

  const innerMeta={
    四柱:{title:'四柱八字',desc:'以出生年月日時建立命盤，理解五行配置與人生節奏。',icon:'badge-bazi-v1.webp',mark:'柱',kicker:'生辰命盤・四柱根基',guide:'從出生時間看見命盤結構',detail:'四柱八字是整體命盤的根基，從年、月、日、時四柱整理干支、五行與先後天配置，建立後續解讀的共同基準。',tags:['四柱干支','五行配置','先天後天'],how:'選擇曆別與出生年月日時，再設定性別及關注重點後按「排盤」。',safe:'出生資料僅用於本頁換算，不會主動上傳或公開。'},
    九宮:{title:'紫微／九宮',desc:'以數字落宮觀察宮位能量、格局與人生方向。',icon:'badge-jiugong-v1.webp',mark:'宮',kicker:'數字落宮・格局觀察',guide:'用九宮位置整理數字能量',detail:'將手機號碼後七碼倒序落入九宮，觀察數字所在宮位、組合關係與能量分布，適合用來理解格局重點。',tags:['後七碼','九宮落位','格局組合'],how:'輸入可使用的手機號碼後按「起盤」，系統會自動取碼並排列九宮。',safe:'號碼只在目前裝置換算，不上傳、不留存。'},
    奇門:{title:'奇門遁甲',desc:'由時間、方位與數字落宮，分析處境與決策方向。',icon:'badge-qimen-v1.webp',mark:'奇',kicker:'問事決策・趨吉避凶',guide:'從手機數字觀察處境與門路',detail:'取手機號碼末七碼落宮，配合奇門的宮位與門路關係，整理當下環境、念頭及可行方向，作為問事決策參考。',tags:['末七碼','門路判讀','決策參考'],how:'輸入台灣或大陸手機號碼，確認號碼後按「起盤」查看專屬論斷。',safe:'號碼僅在本機計算，不上傳、不留存。'},
    六親:{title:'數字八字卦',desc:'由生辰數字對照八卦、五行與本命格局，整理個人特質與人生課題。',icon:'badge-shuzibagua-v1.svg',mark:'卦',kicker:'生辰數卦・格局解析',guide:'從數字與八卦看見本命結構',detail:'依生辰排盤延伸數字、八卦、五行與陰陽配置，集中呈現本命格局、能量互動及重要課題，不混入其他入口的內容。',tags:['生辰數字','八卦五行','本命格局'],how:'先完成生辰排盤，系統會接續顯示數字八字卦專屬分析。',safe:'生辰資料只用於本次命盤換算，不會主動上傳。'},
    流年:{title:'流年運勢',desc:'查看年度與流月節奏，掌握不同階段的重要趨勢。',icon:'badge-liunian-v1.webp',mark:'運',kicker:'大運流年・階段節奏',guide:'掌握不同年份的運勢起伏',detail:'依生辰命盤延伸大運分段與逐年節奏，整理不同人生階段的重心及變化，作為年度規劃與重要決策參考。',tags:['大運分段','年度節奏','趨勢提醒'],how:'先完成生辰排盤，再查看大運區間與各年份的專屬趨勢。',safe:'命盤資料僅供頁面即時計算與閱讀，不會主動公開。'}
  };

  const readingMeta={
    四柱:{title:'把四柱八字轉成看得懂的人生線索',lead:'專業盤保留干支、五行與六柱資料；白話模式則依序說明「命盤核心、能量分布、人生節奏」，讓第一次接觸命理的人也知道從哪裡開始看。',points:[['日主核心','先辨認命盤的核心性質與主要行事傾向。'],['五行分布','查看哪些能量偏強、偏弱，以及彼此如何支持或牽制。'],['人生節奏','結合大運與流年，理解不同階段的重心與轉折。']],pro:'付費版將整合老師判讀，提供不只盤面名稱，而是有原因、有重點、有行動方向的完整報告。',tags:['命格核心','喜用忌神','十神六親','大運流年','事業財運','感情家庭']},
    九宮:{title:'從數字落宮看懂格局重點',lead:'九宮盤不只呈現數字位置，白話模式會整理主要宮位、能量集中處及組合關係，協助客戶理解這些排列與自身課題的關聯。',points:[['主要宮位','先看能量集中在哪些宮位，以及代表的生活面向。'],['組合關係','再看數字之間形成支持、重複或牽制的格局。'],['應用方向','把盤面轉成工作、人際與日常選擇的觀察重點。']],pro:'專業版將提供宮位逐項解釋、重要組合及老師的格局判讀。',tags:['宮位能量','數字組合','格局吉凶','人生課題','改善方向']},
    奇門:{title:'把奇門盤勢整理成可行的決策方向',lead:'專業盤顯示落宮與門路；白話模式則分成「目前處境、可利用條件、需要避開的風險」，避免客戶只看到一張盤卻不知道如何使用。',points:[['目前處境','整理當下環境與問題所處的位置。'],['81 象意','可依 1～81 數理查詢吉凶、名稱與完整象意。'],['風險提醒','結合門路與象意，指出容易受阻或不宜躁進的環節。']],pro:'已整合奇門手機排盤、落宮門路、逐碼詳解及 1～81 數理象意查詢，可直接切換使用。',tags:['奇門排盤','81象意','時間方位','門路分析','行動策略']},
    六親:{title:'把數字八字卦整理成清楚的本命線索',lead:'專業盤保留數字、八卦、五行與格局資料；白話模式依序整理本命結構、能量互動及可實際理解的人生課題。',points:[['本命結構','先確認生辰數字所對應的八卦與主要格局。'],['六親與類象','分開查看六親關係、五行陰陽及萬物類象，不與四柱內容混用。'],['169 卦義','依 0～12 的兩數組合查閱完整卦義與專業判讀。']],pro:'已整合本命數卦、五行陰陽、六親斷、萬物類象與 169 卦義，完成生辰取數後即可逐項閱讀。',tags:['生辰數字','六親斷','169卦義','萬物類象','五行陰陽']},
    流年:{title:'把大運流年整理成清楚的時間軸',lead:'專業表格保留太歲、歲運、旬運與旬空；白話模式會先標示運勢階段從何時開始，再說明重要年份、轉折與可採取的準備。',points:[['起運時間','清楚標示大運從哪一年開始，以及目前走到哪個階段。'],['年度重點','整理每一年的主要課題，而不是只列出專業數字。'],['提前規劃','分辨適合推進、整理、觀察或保守的時間。']],pro:'專業版將提供大運總覽、逐年重點、十二個月節奏與老師的規劃建議。',tags:['起運年份','大運階段','年度趨勢','流月提醒','重要時機']}
  };

  function setReadingMeta(term){
    const m=readingMeta[term] || readingMeta.四柱;
    readingPanel.querySelector('#jli-reading-mark').textContent=(innerMeta[term]||innerMeta.四柱).mark;
    readingPanel.querySelector('#jli-reading-title').textContent=m.title;
    readingPanel.querySelector('#jli-reading-lead').textContent=m.lead;
    readingPanel.querySelector('#jli-reading-points').innerHTML=m.points.map(function(point,index){return '<article><b><em>0'+(index+1)+'</em>'+point[0]+'</b><p>'+point[1]+'</p></article>';}).join('');
    readingPanel.querySelector('#jli-pro-desc').textContent=m.pro;
    readingPanel.querySelector('#jli-pro-tags').innerHTML=m.tags.map(function(tag){return '<span>'+tag+'</span>';}).join('');
  }

  readingPanel.querySelectorAll('[data-jli-reading]').forEach(function(btn){
    btn.addEventListener('click',function(){
      const plain=btn.dataset.jliReading==='plain';
      readingPanel.querySelectorAll('[data-jli-reading]').forEach(function(item){
        const active=item===btn;
        item.classList.toggle('on',active);
        item.setAttribute('aria-selected',active?'true':'false');
      });
      readingPanel.querySelector('.jli-reading-body').hidden=!plain;
      if(plain){ readingPanel.scrollIntoView({behavior:'smooth',block:'start'}); }
      else{
        const term=sessionStorage.getItem('jlf-active-route') || '四柱';
        const target=moduleMeta[term] ? moduleHub : (term==='四柱' ? paipan : findPlugin(term));
        (target || paipan || feature).scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  readingPanel.querySelector('#jli-open-pro').addEventListener('click',function(){
    const term=sessionStorage.getItem('jlf-active-route') || '四柱';
    const target=moduleMeta[term] ? moduleHub : (term==='四柱' ? paipan : findPlugin(term));
    (target || paipan || feature).scrollIntoView({behavior:'smooth',block:'start'});
  });

  function setInnerMeta(term){
    const m=innerMeta[term] || innerMeta.四柱;
    document.body.dataset.jliRoute=term;
    innerHead.querySelector('#jli-title').textContent=m.title;
    innerHead.querySelector('#jli-desc').textContent=m.desc;
    innerHead.querySelector('#jli-icon').src=m.icon;
    routeGuide.querySelector('#jli-guide-mark').textContent=m.mark;
    routeGuide.querySelector('#jli-guide-kicker').textContent=m.kicker;
    routeGuide.querySelector('#jli-guide-title').textContent=m.guide;
    routeGuide.querySelector('#jli-guide-desc').textContent=m.detail;
    routeGuide.querySelector('#jli-guide-how').textContent=m.how;
    routeGuide.querySelector('#jli-guide-safe').textContent=m.safe;
    routeGuide.querySelector('#jli-guide-tags').innerHTML=m.tags.map(function(tag){return '<span>'+tag+'</span>';}).join('');
    innerHead.querySelectorAll('[data-jli-route]').forEach(function(btn){
      btn.classList.toggle('on',btn.dataset.jliRoute===term);
    });
    sessionStorage.setItem('jlf-active-route',term);
    setReadingMeta(term);
    setModuleHub(term);
    readingPanel.querySelector('.jli-reading-body').hidden=true;
    readingPanel.querySelectorAll('[data-jli-reading]').forEach(function(btn){
      const active=btn.dataset.jliReading==='chart';
      btn.classList.toggle('on',active);
      btn.setAttribute('aria-selected',active?'true':'false');
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

  function findPluginByTitle(title){
    const wanted=clean(title);
    const selectors='#plugs0 .card,#plugs .card,#plug .card,#out .card,.card.pro,section.card';
    return [...feature.querySelectorAll(selectors)].find(function(card){
      const heading=card.querySelector('h2,h3');
      return clean(heading ? heading.textContent : card.textContent).includes(wanted);
    }) || null;
  }

  moduleHub.addEventListener('click',function(event){
    const btn=event.target.closest('[data-jli-module]');
    if(!btn) return;
    const module=btn.dataset.jliModule;
    const term=sessionStorage.getItem('jlf-active-route') || '四柱';
    if(module==='birth'){
      if(paipan) paipan.classList.remove('jli-route-hidden');
      showNotice(term);
      showFeature(paipan);
      return;
    }
    const target=findPluginByTitle(module);
    const ready=target && (!out || !out.classList.contains('hide') || !out.contains(target));
    if(ready){
      target.classList.remove('jli-route-hidden');
      clearNotice();
      showFeature(target);
    }else{
      showNotice(term);
      if(paipan) paipan.classList.remove('jli-route-hidden');
      showFeature(paipan);
    }
  });

  function cardTitle(card){
    if(!card) return '';
    const heading=card.querySelector(':scope > h2,:scope > h3') || card.querySelector('h2,h3');
    return clean(heading ? heading.textContent : '');
  }

  function cardMatchesRoute(card,term){
    const title=cardTitle(card);
    return (routeTitles[term] || []).some(function(name){
      return title.includes(clean(name));
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

    /* 入口頁永遠不混入待辦、專業版密碼區或其他工具選單。 */
    feature.querySelectorAll('.todo,.card.pro,#ly-menu,#ly-nav-card,.jl-old-menu-final').forEach(function(node){
      node.classList.add('jli-route-hidden');
    });

    if(term==='四柱'){
      if(paipan) paipan.classList.remove('jli-route-hidden');
      if(out && !out.classList.contains('hide')){
        cards.forEach(function(card){
          if(out.contains(card) && cardMatchesRoute(card,'四柱')){
            card.classList.remove('jli-route-hidden');
          }
        });
      }
      return;
    }

    const matches=(term==='九宮' || term==='奇門')
      ? findPlugins(term)
      : cards.filter(function(card){
          return (!out || !out.classList.contains('hide') || !out.contains(card)) &&
            cardMatchesRoute(card,term);
        });
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

      六親:'數字八字卦',

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

    document.dispatchEvent(
      new CustomEvent('jl:route-change',{detail:{route:term}})
    );

    setInnerMeta(term);

    applyRouteView(term);

    sessionStorage.setItem(
      'jlf-pending',
      term
    );

    if(moduleMeta[term]){
      clearNotice();
      showFeature(moduleHub);
      return;
    }


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

  window.jlOpenFeature=openFeature;

  var shortcutRoute='';
  try{
    shortcutRoute=new URLSearchParams(location.search).get('route') || sessionStorage.getItem('jlf-shortcut-route') || '';
    sessionStorage.removeItem('jlf-shortcut-route');
  }catch(e){}
  if(shortcutRoute && innerMeta[shortcutRoute]){
    setTimeout(function(){ openFeature(shortcutRoute); },120);
  }

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
  position:relative;
  overflow:hidden;
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

  border-top:1px solid rgba(205,151,220,.34);
  border-bottom:1px solid rgba(205,151,220,.34);
  box-shadow:inset 0 1px rgba(255,255,255,.72);
}

.jlf-section-title::before,
.jlf-section-title::after{
  content:"✦";
  position:absolute;
  top:50%;
  transform:translateY(-50%);
  color:#b58a28;
  opacity:.48;
  font-size:7px;
}

.jlf-section-title::before{left:22px}
.jlf-section-title::after{right:22px}



/* 六大卡片 */

.jlf-tools{
  padding:
    8px 9px 9px;

  background:
    radial-gradient(circle at 8% 15%,rgba(185,91,211,.16),transparent 27%),
    radial-gradient(circle at 94% 82%,rgba(224,181,76,.15),transparent 25%),
    linear-gradient(180deg,#fff8ff,#f3dcf8);

  border-bottom:1px solid rgba(195,139,205,.3);
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
  position:relative;
  overflow:hidden;
  height:154px;

  padding:
    7px 3px 6px;

  text-align:center;

  border:
    1px solid color-mix(in srgb,var(--card-accent,#a465bd) 42%,#dcc7e1);

  border-radius:13px;

  background:
    linear-gradient(
      180deg,
      #fff 0%,
      #fff8ff 100%
    );

  box-shadow:
    0 9px 21px
    color-mix(in srgb,var(--card-accent,#a465bd) 15%,transparent),
    inset 0 1px rgba(255,255,255,.9);
}

.jlf-card::before{
  content:"";
  position:absolute;
  inset:0;
  background:
    linear-gradient(135deg,rgba(255,255,255,.88),transparent 46%),
    url("assets/celestial-orbit.svg") 132% 128%/88px 88px no-repeat;
  opacity:.42;
  pointer-events:none;
}

.jlf-card::after{
  content:"";
  position:absolute;
  left:14%;right:14%;top:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--card-accent,#c78fda),transparent);
  opacity:.85;
}

.jlf-card>*{position:relative;z-index:1}

.jlf-card:nth-child(1){--card-accent:#a465bd;background:radial-gradient(circle at 50% 8%,#eed3f8,transparent 27%),linear-gradient(180deg,#fff,#f7e7fc)}
.jlf-card:nth-child(2){--card-accent:#4f83a6;background:radial-gradient(circle at 50% 8%,#d9edf8,transparent 27%),linear-gradient(180deg,#fff,#eaf5fc)}
.jlf-card:nth-child(3){--card-accent:#b28331;background:radial-gradient(circle at 50% 8%,#f9e5ad,transparent 27%),linear-gradient(180deg,#fff,#fff4d8)}
.jlf-card:nth-child(4){--card-accent:#b44f79;background:radial-gradient(circle at 50% 8%,#f6d7e5,transparent 27%),linear-gradient(180deg,#fff,#fde8f0)}
.jlf-card:nth-child(5){--card-accent:#3e8b78;background:radial-gradient(circle at 50% 8%,#d2eee5,transparent 27%),linear-gradient(180deg,#fff,#e6f7f1)}
.jlf-card:nth-child(6){--card-accent:#7c5bab;background:radial-gradient(circle at 50% 8%,#e2d9f7,transparent 27%),linear-gradient(180deg,#fff,#eee9fb)}


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
  font-size:11px;
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

  font-size:7.5px;

  white-space:nowrap;
}


.jlf-card small{
  display:block;

  margin-top:2px;

  color:#78677b;

  font-size:6.5px;

  line-height:1.2;
}


.jlf-card button,
.jlf-card > a{
  width:90px;
  max-width:94%;
  height:38px;

  display:inline-flex;
  align-items:center;
  justify-content:center;

  margin-top:5px;

  border:1px solid rgba(241,203,102,.62);

  border-radius:999px;

  padding:0 10px;

  background:
    linear-gradient(
      135deg,
      #6e0c90,
      #a92bd1
    );

  color:#fff;

  text-decoration:none;

  font-size:9px;
  letter-spacing:.06em;

  font-weight:900;

  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.22),
    0 5px 11px rgba(82,9,105,.26);
}


/* 桃花神數新功能 */

.jlf-taohua{
  position:relative;
  overflow:hidden;
  min-height:90px;
  margin:0 9px 8px;
  padding:12px 13px;
  display:grid;
  grid-template-columns:68px 1fr auto;
  align-items:center;
  gap:10px;
  border:1px solid #d9ad3d;
  border-radius:17px;
  color:#fff4ff;
  background:radial-gradient(circle at 88% 22%,#df62ec75 0,transparent 29%),linear-gradient(108deg,#25022e,#68117a 58%,#3b0446);
  box-shadow:0 8px 19px #4c075d2d,inset 0 1px #ffffff2b;
  text-decoration:none;
}

.jlf-taohua:before{content:"";position:absolute;inset:6px;border:1px solid #e6c55a45;border-radius:12px;pointer-events:none}
.jlf-taohua img{position:relative;z-index:1;width:66px;height:66px;filter:drop-shadow(0 7px 10px #19011f99)}
.jlf-taohua div{position:relative;z-index:1;min-width:0}
.jlf-taohua small{display:block;color:#f1d2f6;font-size:7px;font-weight:900;letter-spacing:.13em;text-shadow:0 1px 3px #210026}
.jlf-taohua-title{display:block;margin:3px 0 2px;color:#ffe48b;font-family:"Noto Serif TC",serif;font-size:18px;font-weight:900;line-height:1.25;letter-spacing:.14em;text-shadow:0 2px 5px #210026}
.jlf-taohua p{margin:0;color:#fff4ff;font-size:8px;font-weight:700;line-height:1.55;text-shadow:0 1px 3px #210026}
.jlf-taohua b{position:relative;z-index:1;padding:9px 12px;border:1px solid #f2d36e;border-radius:999px;color:#ffe691;background:#5a0c69;font-size:9px;font-weight:900;white-space:nowrap;box-shadow:inset 0 1px #ffffff35,0 4px 12px #21002655}
.jlf-taohua:hover b,.jlf-taohua:focus-visible b{color:#561067;background:#f7df87}.jlf-taohua:focus-visible{outline:3px solid #e3c65e;outline-offset:2px}



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
    linear-gradient(90deg,rgba(255,249,253,.97) 0 42%,rgba(248,222,251,.58) 59%,rgba(75,11,90,.08) 79%),
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

  background:
    radial-gradient(circle at 94% 6%,rgba(221,181,72,.17),transparent 27%),
    linear-gradient(145deg,#fff,#f8eafa 62%,#fff8e8);

  box-shadow:0 8px 20px rgba(92,14,112,.1),inset 0 1px #fff;
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

/* 專屬專業工作台 */
#jli-module-hub{
  position:relative;
  overflow:hidden;
  margin:14px 0 18px;
  padding:18px;
  border:1px solid #d6a9df;
  border-radius:22px;
  background:
    radial-gradient(circle at 90% 5%,color-mix(in srgb,var(--route-b,#d5aa3d) 24%,transparent) 0,transparent 25%),
    url("assets/celestial-orbit.svg") 118% -42px/230px auto no-repeat,
    linear-gradient(145deg,#fffdfd,var(--route-pale,#fff5ff) 58%,color-mix(in srgb,var(--route-soft,#f5e6ff) 76%,#fff));
  box-shadow:0 14px 34px color-mix(in srgb,var(--route-a,#651078) 11%,transparent),inset 0 1px #fff;
}
#jli-module-hub:after{content:"";position:absolute;left:18px;right:18px;top:0;height:2px;background:linear-gradient(90deg,transparent,var(--route-b,#d5aa3d),transparent)}
#jli-module-hub[hidden]{display:none!important}
.jli-module-intro{padding:4px 4px 16px;border-bottom:1px solid #ead9ec}
.jli-module-intro small{display:block;color:var(--route-b,#a27b22);font-size:10px;font-weight:900;letter-spacing:.16em}
.jli-module-intro h2{margin:7px 0;color:var(--route-a,#5e126e);font-family:"Noto Serif TC",serif;font-size:25px;letter-spacing:.1em}
.jli-module-intro p{margin:0;color:#6e6070;font-size:13px;line-height:1.85}
.jli-module-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:14px}
.jli-module-grid button{
  min-height:98px;padding:12px;border:1px solid #d8b2df;border-radius:16px;
  display:grid;grid-template-columns:42px minmax(0,1fr);grid-template-rows:1fr auto;gap:4px 10px;
  text-align:left;background:linear-gradient(145deg,#fff,#fff8ff);color:var(--route-a,#551064);
  box-shadow:0 7px 18px color-mix(in srgb,var(--route-a,#651078) 8%,transparent);cursor:pointer;
}
.jli-module-grid button:nth-child(1){border-color:#b8d9cf;background:radial-gradient(circle at 96% 8%,#bde5d851,transparent 27%),linear-gradient(145deg,#fff,#ecf9f5)}
.jli-module-grid button:nth-child(2){border-color:#e3ce92;background:radial-gradient(circle at 96% 8%,#f2d36b50,transparent 27%),linear-gradient(145deg,#fff,#fff7df)}
.jli-module-grid button:nth-child(3){border-color:#d3bee1;background:linear-gradient(145deg,#fff,#f4efff)}
.jli-module-grid button:nth-child(4){border-color:#dfbed0;background:linear-gradient(145deg,#fff,#fff0f6)}
.jli-module-grid button:hover,.jli-module-grid button:focus-visible{border-color:#c49a32;transform:translateY(-1px);box-shadow:0 10px 24px #67127724;outline:none}
.jli-module-grid i{grid-row:1/3;width:42px;height:42px;display:grid;place-items:center;border:2px solid #d8b44c;border-radius:50%;background:radial-gradient(circle at 35% 28%,color-mix(in srgb,var(--route-a,#71118a) 55%,#d45ddd),var(--route-a,#71118a) 72%);color:#ffe687;font-style:normal;font-size:13px;font-weight:900;box-shadow:0 5px 12px color-mix(in srgb,var(--route-a,#651078) 34%,transparent)}
.jli-module-grid span{min-width:0}.jli-module-grid b{display:block;font-size:14px;letter-spacing:.04em}.jli-module-grid small{display:block;margin-top:4px;color:#786b79;font-size:10px;line-height:1.5}
.jli-module-grid em{grid-column:2;color:#a07a20;font-style:normal;font-size:10px;font-weight:900;letter-spacing:.08em}
.jli-pro-preview button:not([disabled]){cursor:pointer;background:linear-gradient(100deg,#681078,#b71bc5);color:#fff;border-color:#d9b453;box-shadow:0 8px 18px #67127728}

@media(max-width:430px){
  #jli-module-hub{padding:14px;border-radius:18px}
  .jli-module-grid{grid-template-columns:1fr}
  .jli-module-grid button{min-height:88px}
  .jli-module-intro h2{font-size:21px}
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
