(function(){
'use strict';

function boot(){
  if(document.documentElement.dataset.jlHomeClean==='1') return;
  document.documentElement.dataset.jlHomeClean='1';

  const wrap=document.querySelector('.wrap');
  if(!wrap) return;

  /* ===== 舊網站完整收進功能殼 ===== */
  const feature=document.createElement('div');
  feature.id='jl-feature-shell';
  [...wrap.children].forEach(n=>feature.appendChild(n));
  wrap.appendChild(feature);

  const paipan=[...feature.children].find(n=>n.classList&&n.classList.contains('card')) || feature.querySelector('.card');
  const out=feature.querySelector('#out');
  const go=feature.querySelector('#go');

  if(paipan){
    paipan.id=paipan.id||'paipan';
    paipan.classList.add('jl-paipan');
  }

  [...feature.querySelectorAll('.card')].forEach(card=>{
    const t=(card.textContent||'').replace(/\s+/g,'');
    if(t.includes('功能選單')) card.classList.add('jl-old-menu');
  });

  /* ===== 六個紫金 SVG 圖示 ===== */
  const iconBazi=`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="29"/><path d="M32 7v50M7 32h50"/><text x="19" y="23">年</text><text x="39" y="23">月</text><text x="19" y="45">日</text><text x="39" y="45">時</text></svg>`;
  const iconNine=`<svg viewBox="0 0 64 64"><rect x="9" y="9" width="46" height="46" rx="3"/><path d="M24 9v46M40 9v46M9 24h46M9 40h46"/><text x="15" y="20">4</text><text x="30" y="20">9</text><text x="46" y="20">2</text><text x="15" y="36">3</text><text x="30" y="36">5</text><text x="46" y="36">7</text><text x="15" y="52">8</text><text x="30" y="52">1</text><text x="46" y="52">6</text></svg>`;
  const iconQimen=`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28"/><circle cx="32" cy="32" r="18"/><path d="M32 14a18 18 0 1 0 0 36 9 9 0 1 1 0-18 9 9 0 1 0 0-18z"/><circle cx="32" cy="23" r="2.5"/><circle cx="32" cy="41" r="2.5"/><path d="M32 4v7M32 53v7M4 32h7M53 32h7M12 12l5 5M47 47l5 5M52 12l-5 5M17 47l-5 5"/></svg>`;
  const iconLiuqin=`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28"/><text x="32" y="27" text-anchor="middle" class="big">六壬</text><text x="32" y="44" text-anchor="middle" class="big">六親</text></svg>`;
  const iconStar=`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28"/><path d="M15 39l8-15 10 8 8-13 9 20-17 8z"/><circle cx="23" cy="24" r="2"/><circle cx="33" cy="32" r="2"/><circle cx="41" cy="19" r="2"/><circle cx="50" cy="39" r="2"/><circle cx="33" cy="47" r="2"/><circle cx="15" cy="39" r="2"/></svg>`;
  const iconYear=`<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="28"/><path d="M15 46h7V35h7v11h7V26h7v20h7V17"/><path d="M43 17h7v7"/></svg>`;

  /* ===== 新首頁 ===== */
  const home=document.createElement('section');
  home.id='jl-home';
  home.innerHTML=`
    <header class="jl-top">
      <button class="jl-brand" type="button" id="jl-home-btn">
        <span class="jl-seal">筠</span><b>筠玲易數</b>
      </button>
      <nav class="jl-nav">
        <a href="#jl-home">首頁</a>
        <a href="#jl-tools">命理知識</a>
        <a href="#jl-contact">聯絡我們</a>
      </nav>
      <button class="jl-mine" type="button" data-route="四柱">☯ 我的命盤</button>
    </header>

    <section class="jl-hero">
      <div class="jl-hero-copy">
        <div class="jl-kicker">✦ 以數觀象 · 以卦察勢 · 以理明心 ✦</div>
        <h1>筠玲易數</h1>
        <h2>解析命運的軌跡 · 掌握人生的方向</h2>
        <p>結合傳統命理智慧與現代視角<br>協助您了解自己 · 趨吉避凶 · 創造更好的人生</p>
      </div>
      <div class="jl-aura"></div>
      <img class="jl-teacher" src="IMG_0821.png" alt="筠玲老師"
           onerror="this.style.display='none'">
      <div class="jl-hero-quote">
        命，不是定局；<br>
        看懂自己的局，<br>
        才知道下一步怎麼走。
        <b>筠玲老師</b>
      </div>
    </section>

    <div class="jl-section-title">✦ 探索命理智慧 · 開啟人生新局 ✦</div>

    <section class="jl-tools" id="jl-tools">
      <div class="jl-grid">

        <button class="jl-tool" type="button" data-route="四柱">
          <div class="jl-icon">${iconBazi}</div>
          <h3>四柱八字</h3>
          <p>生辰排盤 · 命運解析</p>
          <small>先天 × 後天 × 五行<br>大運 × 流年 × 格局</small>
          <span>進入解析 ›</span>
        </button>

        <button class="jl-tool" type="button" data-route="九宮">
          <div class="jl-icon">${iconNine}</div>
          <h3>紫微／九宮</h3>
          <p>命盤解析 · 宮位星曜</p>
          <small>宮位 × 星曜 × 格局<br>吉凶 × 組合 × 解析</small>
          <span>進入解析 ›</span>
        </button>

        <button class="jl-tool" type="button" data-route="奇門">
          <div class="jl-icon">${iconQimen}</div>
          <h3>奇門遁甲</h3>
          <p>問事決策 · 趨吉避凶</p>
          <small>時間 × 方位 × 局勢<br>開門 × 落宮 × 值符</small>
          <span>進入解析 ›</span>
        </button>

        <button class="jl-tool" type="button" data-route="六親">
          <div class="jl-icon">${iconLiuqin}</div>
          <h3>六壬／六親</h3>
          <p>事情推演 · 事件解析</p>
          <small>關係 × 事件 × 發展<br>占斷 × 判事 × 應驗</small>
          <span>進入解析 ›</span>
        </button>

        <a class="jl-tool" href="bxcc.html">
          <div class="jl-icon">${iconStar}</div>
          <h3>八星磁場</h3>
          <p>數字能量 · 磁場解析</p>
          <small>手機 × 車牌 × 門牌<br>數字 × 能量 × 吉凶</small>
          <span>進入解析 ›</span>
        </a>

        <button class="jl-tool" type="button" data-route="流年">
          <div class="jl-icon">${iconYear}</div>
          <h3>流年運勢</h3>
          <p>年度運勢 · 流月解析</p>
          <small>年度 × 月運 × 日運<br>趨勢 × 提醒 × 建議</small>
          <span>進入解析 ›</span>
        </button>

      </div>
    </section>

    <section class="jl-date">
      <div>
        <h2>擇吉看日</h2>
        <p>結婚 · 開業 · 搬家 · 簽約 · 出行 · 入宅 · 動土 · 祈福</p>
        <p>選一個適合您的好日子，讓事情順利圓滿。</p>
        <a href="rz.html">開始看日子 ›</a>
      </div>
      <div class="jl-calendar"><span>吉</span><b>日</b></div>
    </section>

    <section class="jl-contact" id="jl-contact">
      <div class="jl-consult">
        <img src="IMG_0821.png" alt="" onerror="this.style.display='none'">
        <div>
          <h3>需要進一步命理解讀？</h3>
          <p>筠玲老師提供一對一專業諮詢服務，深入分析您的命盤。</p>
        </div>
      </div>

      <a class="jl-line" href="https://line.me/ti/p/@804kmmmy">
        <i>LINE</i>
        <div>
          <b>加入筠玲老師 LINE</b>
          <span>LINE ID：@804kmmmy</span>
        </div>
        <em>›</em>
      </a>
    </section>

    <footer class="jl-footer">
      <span>✦ 專業可靠</span>
      <span>☆ 經驗豐富</span>
      <span>♡ 用心解盤</span>
      <span>▣ 隱私保密</span>
      <small>© 2026 筠玲易數 · All Rights Reserved.</small>
    </footer>
  `;

  wrap.insertBefore(home,feature);

  /* ===== 功能頁返回首頁 ===== */
  const back=document.createElement('button');
  back.id='jl-back';
  back.type='button';
  back.textContent='← 回到功能首頁';
  feature.insertBefore(back,feature.firstChild);

  function showHome(){
    document.body.classList.remove('jl-feature-mode');
    document.body.classList.add('jl-home-mode');
    window.scrollTo({top:0,behavior:'smooth'});
  }

  function showFeature(target){
    document.body.classList.remove('jl-home-mode');
    document.body.classList.add('jl-feature-mode');
    setTimeout(()=>{
      (target||paipan||feature).scrollIntoView({
        behavior:'smooth',
        block:'start'
      });
    },60);
  }

  back.addEventListener('click',showHome);
  home.querySelector('#jl-home-btn').addEventListener('click',showHome);

  function norm(s){
    return String(s||'').replace(/\s+/g,'');
  }

  function findTarget(term){
    const map={
      九宮:['奇門數字九宮盤','數字九宮盤','九宮盤','九宮'],
      奇門:['奇門遁甲','奇門'],
      六親:['六親對照','六親解析','六親'],
      流年:['流年運勢','流年']
    };

    const words=map[term]||[term];

    const nodes=[
      ...feature.querySelectorAll(
        'h2,h3,h4,summary,#plugs0>.card,#plug>.card,#plugs>.card,#out>.card,.card.pro'
      )
    ];

    for(const node of nodes){
      const txt=norm(node.textContent);
      if(words.some(w=>txt.includes(norm(w)))) return node;
    }

    return null;
  }

  function hasChart(){
    return !!(
      out &&
      !out.classList.contains('hide')
    );
  }

  let note=null;

  if(paipan){
    note=document.createElement('div');
    note.className='jl-note';
    paipan.appendChild(note);
  }

  function setNote(t){
    if(note){
      note.textContent=t;
      note.classList.add('show');
    }
  }

  function clearNote(){
    if(note) note.classList.remove('show');
  }

  function route(term){
    sessionStorage.setItem('jl-route',term);

    if(term==='四柱'){
      setNote('請先輸入出生資料並排盤；完成後會顯示四柱、先天、後天與完整命盤。');
      showFeature(paipan);
      return;
    }

    if(!hasChart()){
      const msg={
        九宮:'九宮分析需要先建立命盤，請先完成生辰排盤。',
        奇門:'奇門遁甲需要先建立命盤，請先完成生辰排盤。',
        六親:'六親分析需要先建立命盤，請先完成生辰排盤。',
        流年:'流年運勢需要先建立命盤，請先完成生辰排盤。'
      };

      setNote(msg[term]||'請先完成生辰排盤。');
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

  home.querySelectorAll('[data-route]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      route(btn.dataset.route);
    });
  });

  if(go){
    go.addEventListener('click',function(){

      const term=sessionStorage.getItem('jl-route');
      if(!term) return;

      let tries=0;

      const timer=setInterval(function(){

        tries++;

        if(hasChart()){

          clearInterval(timer);
          clearNote();

          showFeature(
            term==='四柱'
              ? (out||paipan)
              : (findTarget(term)||out||paipan)
          );

          sessionStorage.removeItem('jl-route');

        }else if(tries>=32){

          clearInterval(timer);

        }

      },250);

    },true);
  }

  /* ===== 唯一一套首頁 CSS ===== */
  const style=document.createElement('style');

  style.id='jl-home-clean-style';

  style.textContent=`

:root{
  --p:#8f24c9;
  --p2:#bd5ae8;
  --deep:#4d0e70;
  --gold:#d7aa49;
  --ink:#4b2857;
  --muted:#806d87;
  --line:#e7c9f4;
}

html,
body{
  overflow-x:hidden;
}

body{
  background:
    linear-gradient(
      180deg,
      #fff 0,
      #fff8ff 45%,
      #f3e3ff 100%
    ) !important;
}

.wrap{
  max-width:760px !important;
  padding:0 14px 34px !important;
}

/* 首頁 / 功能頁完全分離 */
body.jl-home-mode #jl-home{
  display:block !important;
}

body.jl-home-mode #jl-feature-shell{
  display:none !important;
}

body.jl-feature-mode #jl-home{
  display:none !important;
}

body.jl-feature-mode #jl-feature-shell{
  display:block !important;
}

#jl-feature-shell{
  display:none;
}

#jl-feature-shell > header,
#jl-feature-shell > .jl-old-menu{
  display:none !important;
}

#jl-home{
  margin:0 -14px;
  background:#fff;
  overflow:hidden;
}

/* 頂部 */
.jl-top{
  height:48px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 12px;
  background:#fff;
  border-bottom:1px solid #efd9f8;
  position:relative;
  z-index:20;
}

.jl-brand{
  border:0;
  background:none;
  display:flex;
  align-items:center;
  gap:7px;
  color:#5f1686;
  font-family:"Noto Serif TC","Songti TC",serif;
  font-size:16px;
  font-weight:900;
  padding:0;
}

.jl-seal{
  width:26px;
  height:26px;
  border:1.5px solid var(--gold);
  border-radius:50%;
  display:grid;
  place-items:center;
  color:var(--gold);
  font-size:11px;
}

.jl-nav{
  display:flex;
  gap:12px;
  font-size:8px;
  font-weight:800;
}

.jl-nav a{
  color:#62476a;
  text-decoration:none;
}

.jl-nav a:first-child{
  color:var(--p);
}

.jl-mine{
  border:1px solid #e3a8f8;
  border-radius:999px;
  background:
    linear-gradient(
      135deg,
      #851bb8,
      #b63ce4
    );
  color:#fff;
  font-size:8px;
  font-weight:900;
  padding:6px 9px;
}

/* Hero */
.jl-hero{
  height:258px;
  position:relative;
  overflow:hidden;
  background:
    radial-gradient(
      circle at 15% 78%,
      rgba(181,74,226,.22),
      transparent 32%
    ),
    linear-gradient(
      100deg,
      #fff 0 42%,
      #f7e5ff 63%,
      #bb69e3 100%
    );
}

.jl-hero-copy{
  position:relative;
  z-index:4;
  width:55%;
  padding:28px 4px 14px 24px;
}

.jl-kicker{
  color:#6f1d99;
  font-size:7px;
  font-weight:900;
  letter-spacing:.12em;
  white-space:nowrap;
}

.jl-hero h1{
  margin:8px 0 4px !important;
  color:#641095 !important;
  font-family:"Noto Serif TC","Songti TC",serif !important;
  font-size:30px !important;
  line-height:1.08 !important;
  letter-spacing:.06em !important;
  text-indent:0 !important;
}

.jl-hero h2{
  margin:0 !important;
  color:#c06b2f !important;
  font-family:"Noto Serif TC","Songti TC",serif !important;
  font-size:10px !important;
  line-height:1.35 !important;
}

.jl-hero p{
  margin:8px 0 0;
  color:#5f4e65;
  font-size:7px;
  line-height:1.55;
}

.jl-aura{
  position:absolute;
  right:2%;
  top:6%;
  width:52%;
  height:88%;
  border-radius:50%;
  background:
    radial-gradient(
      circle,
      rgba(240,205,255,.85) 0,
      rgba(179,80,220,.28) 43%,
      transparent 70%
    );
}

.jl-teacher{
  position:absolute;
  z-index:3;
  right:3%;
  bottom:-2%;
  height:94%;
  width:auto;
  object-fit:contain;
  object-position:bottom right;
  filter:
    saturate(1.03)
    brightness(1.03)
    drop-shadow(
      0 10px 18px
      rgba(72,16,96,.18)
    );
}

.jl-hero-quote{
  position:absolute;
  z-index:5;
  right:2.5%;
  top:31%;
  width:19%;
  color:#fff;
  font-family:"Noto Serif TC","Songti TC",serif;
  font-size:7px;
  line-height:1.55;
  text-shadow:
    0 2px 6px
    rgba(49,4,66,.55);
}

.jl-hero-quote b{
  display:block;
  margin-top:5px;
  color:#f2cc72;
  font-size:8px;
}

/* 探索標題 */
.jl-section-title{
  height:34px;
  display:flex;
  align-items:center;
  justify-content:center;
  background:
    linear-gradient(
      90deg,
      #fff6ff,
      #efd7ff,
      #fff6ff
    );
  color:#531c6b;
  font-family:"Noto Serif TC","Songti TC",serif;
  font-size:11px;
  font-weight:900;
  letter-spacing:.06em;
}

/* 六宮格 */
.jl-tools{
  padding:7px 8px 8px;
  background:
    linear-gradient(
      180deg,
      #fdf8ff,
      #f6eaff
    );
}

.jl-grid{
  display:grid;
  grid-template-columns:
    repeat(3,minmax(0,1fr));
  gap:6px;
}

.jl-tool{
  min-width:0;
  height:108px;
  padding:7px 3px 5px;
  border:1px solid #dfbbee;
  border-radius:10px;
  background:
    linear-gradient(
      180deg,
      #fff,
      #fffafd
    );
  box-shadow:
    0 5px 13px
    rgba(86,16,119,.07);
  text-align:center;
  color:var(--ink);
  text-decoration:none;
  font:inherit;
  overflow:hidden;
}

.jl-icon{
  width:36px;
  height:36px;
  margin:0 auto 4px;
  border-radius:50%;
  background:
    radial-gradient(
      circle at 35% 25%,
      #b948e7,
      #651492
    );
  border:1.5px solid var(--gold);
  display:grid;
  place-items:center;
}

.jl-icon svg{
  width:31px;
  height:31px;
  fill:none;
  stroke:#f2d277;
  stroke-width:1.7;
}

.jl-icon svg text{
  fill:#f5de91;
  stroke:none;
  font-size:8px;
  font-family:"Noto Serif TC",serif;
  font-weight:800;
}

.jl-icon svg .big{
  font-size:9px;
}

.jl-tool h3{
  margin:0 0 2px;
  color:#67149a;
  font-family:"Noto Serif TC","Songti TC",serif;
  font-size:9.5px;
  white-space:nowrap;
}

.jl-tool p{
  margin:0;
  color:#66566d;
  font-size:6.3px;
  line-height:1.25;
  white-space:nowrap;
}

.jl-tool small{
  display:block;
  margin-top:2px;
  color:#89778f;
  font-size:5.2px;
  line-height:1.18;
}

.jl-tool span{
  display:inline-block;
  margin-top:4px;
  padding:3px 7px;
  border-radius:5px;
  background:
    linear-gradient(
      135deg,
      #7e1bb2,
      #a92fdc
    );
  color:#fff;
  font-size:5.8px;
  font-weight:900;
}

/* 看日子 */
.jl-date{
  height:92px;
  margin:0 8px 7px;
  padding:9px 12px 8px 15px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:9px;
  border:1px solid #d8acf0;
  border-radius:11px;
  background:
    radial-gradient(
      circle at 80% 40%,
      rgba(255,255,255,.68),
      transparent 23%
    ),
    linear-gradient(
      115deg,
      #fdeeff,
      #edd2ff 58%,
      #c77bea
    );
}

.jl-date h2{
  margin:0;
  color:#661099;
  font-family:"Noto Serif TC","Songti TC",serif;
  font-size:16px;
}

.jl-date p{
  margin:2px 0;
  color:#66516e;
  font-size:5.8px;
}

.jl-date a{
  display:inline-block;
  margin-top:3px;
  padding:4px 10px;
  border-radius:999px;
  background:
    linear-gradient(
      135deg,
      #851db9,
      #ad35df
    );
  color:#fff;
  text-decoration:none;
  font-size:6px;
  font-weight:900;
}

.jl-calendar{
  width:52px;
  height:52px;
  border:1px solid var(--gold);
  border-radius:8px;
  background:#fff9ee;
  display:grid;
  place-items:center;
  color:#8a209d;
}

.jl-calendar span{
  font-size:10px;
}

.jl-calendar b{
  font-size:16px;
}

/* LINE */
.jl-contact{
  margin:0 8px 7px;
  padding:6px;
  border:1px solid #deb8f3;
  border-radius:10px;
  background:#fff;
}

.jl-consult{
  display:flex;
  align-items:center;
  gap:6px;
  padding:1px 2px 5px;
}

.jl-consult img{
  width:38px;
  height:44px;
  object-fit:cover;
  object-position:center top;
  border-radius:6px;
}

.jl-consult h3{
  margin:0;
  color:#611091;
  font-size:8px;
}

.jl-consult p{
  margin:2px 0 0;
  color:#75637c;
  font-size:5.5px;
}

.jl-line{
  height:34px;
  display:flex;
  align-items:center;
  gap:7px;
  padding:5px 7px;
  border:1px solid #e5caf4;
  border-radius:8px;
  color:inherit;
  text-decoration:none;
}

.jl-line i{
  width:21px;
  height:21px;
  border-radius:50%;
  display:grid;
  place-items:center;
  background:#2dcc4a;
  color:#fff;
  font-size:4px;
  font-style:normal;
}

.jl-line b{
  color:#611091;
  font-size:7px;
}

.jl-line span{
  color:#75637c;
  font-size:5.5px;
}

.jl-line em{
  margin-left:auto;
  width:20px;
  height:20px;
  border-radius:50%;
  display:grid;
  place-items:center;
  background:
    linear-gradient(
      135deg,
      #821bb6,
      #a62ed9
    );
  color:#fff;
  font-style:normal;
}

/* Footer */
.jl-footer{
  min-height:40px;
  padding:7px 8px 5px;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:4px;
  background:
    linear-gradient(
      90deg,
      #3c0c57,
      #5a117c,
      #3c0c57
    );
  color:#f4e5ff;
  text-align:center;
  font-size:5.4px;
}

.jl-footer small{
  grid-column:1/-1;
  color:#cdb7d8;
  font-size:4.8px;
}

/* 功能頁 */
#jl-back{
  position:sticky;
  top:0;
  z-index:100;
  width:100%;
  border:0;
  padding:11px 14px;
  background:
    linear-gradient(
      90deg,
      #4d0b70,
      #7d1bb3
    );
  color:#fff;
  font-weight:900;
}

.jl-note{
  display:none;
  margin:10px 0 0;
  padding:9px 11px;
  border:1px solid #ddbcf0;
  border-radius:9px;
  background:#f4e4ff;
  color:#683080;
  font-size:10px;
}

.jl-note.show{
  display:block;
}

@media(max-width:600px){
  .jl-nav{
    display:none;
  }
}

`;

  document.head.appendChild(style);

  showHome();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',boot);
}else{
  boot();
}

})();
