/* ============================================================
   patch-qimen.js  ·  陰盤遁甲手機號論斷（外掛模組）
   依賴：data-qimen.js（須先載入）
   掛載：PP.addStatic('奇門手機號論斷', fn)
         用 addStatic 而非 add，因為本模組只需要手機號碼，
         與生辰資料無關，不需要先排盤就能使用。
   樣式：沿用網站既有 CSS 變數 --zhu / --gold / --line / --ser
   ============================================================ */
(function(){
'use strict';

if(!window.QMDATA){ console.warn('[qimen] 找不到 data-qimen.js，模組未載入'); return; }
var D = window.QMDATA;

/* ---------- 基礎表 ---------- */
var GAN=['癸','甲','乙','丙','丁','戊','己','庚','辛','壬'];
var WX={0:'空',1:'水',2:'土',3:'木',4:'木',5:'土',6:'金',7:'金',8:'土',9:'火'};
var JIXING={'戊':3,'己':2,'庚':8,'辛':9,'壬':4,'癸':4};
var RUMU={'甲':[2,5],'乙':[6],'丙':[6],'丁':[8],'戊':[6],'己':[8],'庚':[8],'辛':[4],'壬':[4],'癸':[2,5]};
var KE={'木':'土','土':'水','水':'火','火':'金','金':'木'};
var SHENG={'木':'火','火':'土','土':'金','金':'水','水':'木'};
var LUOSHU=[4,9,2,3,5,7,8,1,6];
var GNAME={1:'坎一',2:'坤二',3:'震三',4:'巽四',5:'中五',6:'乾六',7:'兌七',8:'艮八',9:'離九'};

/* ---------- 樣式（只注入一次；類別一律 qm- 前綴，避免與網站衝突）---------- */
function css(){
  if(document.getElementById('qm-css')) return;
  var s=document.createElement('style');
  s.id='qm-css';
  s.textContent=[
  '.qm-in{display:flex;gap:8px;margin:10px 0 0}',
  '.qm-in input{flex:1;min-width:0;font-family:var(--ser);font-size:20px;letter-spacing:.14em;padding:11px 12px;border:1px solid var(--line);border-radius:2px;background:#fff;color:#241f1c}',
  '.qm-in input:focus{outline:2px solid var(--gold);outline-offset:1px;border-color:var(--gold)}',
  '.qm-in button{font-family:var(--ser);font-size:16px;font-weight:600;letter-spacing:.14em;padding:11px 18px;border:none;border-radius:2px;background:var(--zhu);color:#f7f3ea;cursor:pointer}',
  '.qm-in button:active{opacity:.85}',
  '.qm-err{color:var(--zhu);font-size:13px;margin:7px 0 0;min-height:18px}',
  '.qm-note{font-size:12px;color:#8f8069;line-height:1.8;margin:6px 0 0}',
  '.qm-h{font-size:13px;font-weight:600;letter-spacing:.24em;color:var(--gold);margin:24px 0 10px;padding-bottom:6px;border-bottom:1px solid var(--line);text-indent:.24em}',
  '.qm-sg{display:flex;gap:6px}',
  '.qm-sg .c{flex:1;text-align:center;padding:8px 2px;border:1px solid var(--line);background:#fff;border-radius:2px}',
  '.qm-sg .c b{display:block;font-size:21px;font-weight:600;color:#241f1c}',
  '.qm-sg .c s{display:block;font-size:10px;color:#a08d72;text-decoration:none}',
  '.qm-sg .c em{display:block;font-style:normal;font-size:11px;color:var(--zhu);min-height:15px}',
  '.qm-plate{background:#2b2320;border-radius:3px;padding:8px;display:grid;grid-template-columns:repeat(3,1fr);gap:1px;box-shadow:inset 0 0 0 1px rgba(183,140,57,.35)}',
  '.qm-cell{background:#3a302b;min-height:70px;padding:6px 3px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#a9998a}',
  '.qm-cell .gn{font-size:11px;letter-spacing:.08em}',
  '.qm-cell .nu{font-size:18px;color:#6d5f54;font-weight:600}',
  '.qm-cell.on{background:#4a1a17;color:#f2e6d2;box-shadow:inset 0 0 0 1px var(--gold)}',
  '.qm-cell.on .gn{color:var(--gold);margin-bottom:3px}',
  '.qm-cell.on .st{font-size:12.5px;line-height:1.5;text-align:center;letter-spacing:.03em}',
  '.qm-cell.on .st u{text-decoration:none;color:#f7e9cd;font-weight:600}',
  '.qm-cell.on .st i{font-style:normal;color:#e0c98f}',
  '.qm-cap{font-size:11px;color:#9c8b74;text-align:center;margin:7px 0 0;letter-spacing:.1em}',
  '.qm-card{border:1px solid var(--line);background:#fff;border-radius:2px;padding:14px 15px;margin:11px 0 0}',
  '.qm-card h4{margin:0 0 3px;font-size:19px;color:var(--zhu);letter-spacing:.08em;font-weight:700}',
  '.qm-card .wx{font-size:11px;color:#a08d72;letter-spacing:.14em}',
  '.qm-card p{margin:8px 0 0;font-size:15px;color:#3b332c;line-height:1.8}',
  '.qm-flags{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 0}',
  '.qm-flag{font-size:11px;letter-spacing:.1em;padding:3px 9px;border-radius:2px;border:1px solid var(--zhu);color:var(--zhu)}',
  '.qm-flag.ok{border-color:#4a7a4a;color:#3d6b3d}',
  '.qm-flag.mid{border-color:var(--gold);color:#8a6a24}',
  '.qm-gj{border:1px solid var(--line);border-left:3px solid var(--zhu);background:#fff;padding:14px 15px;border-radius:2px}',
  '.qm-gj .nm{font-size:21px;color:var(--zhu);letter-spacing:.12em;font-weight:700}',
  '.qm-gj .jx{font-size:12px;margin-left:8px;letter-spacing:.12em;color:#8a7a64}',
  '.qm-gj .pr{font-size:11px;color:#a08d72;letter-spacing:.14em;margin:2px 0 0}',
  '.qm-gj p{margin:8px 0 0;font-size:15px;color:#3b332c;line-height:1.8}',
  '.qm-ly{border-bottom:1px solid var(--line)}',
  '.qm-ly summary{list-style:none;cursor:pointer;padding:12px 2px;display:flex;align-items:baseline;gap:9px}',
  '.qm-ly summary::-webkit-details-marker{display:none}',
  '.qm-ly summary::after{content:"\\FF0B";margin-left:auto;color:var(--gold);font-size:14px}',
  '.qm-ly[open] summary::after{content:"\\FF0D"}',
  '.qm-ly .ps{font-size:10px;color:#a08d72;letter-spacing:.08em;white-space:nowrap}',
  '.qm-ly .tt{font-size:15px;color:#241f1c;letter-spacing:.06em}',
  '.qm-ly .vl{color:var(--zhu);font-weight:600}',
  '.qm-ly .bd{padding:0 2px 14px;font-size:15px;color:#3b332c;line-height:1.8}',
  '.qm-ly .rl{font-size:12px;color:#8a7a64;display:block;margin-bottom:4px}',
  '.qm-jie{background:#fff;border:1px dashed var(--gold);border-radius:2px;padding:14px 15px;font-size:15px;color:#3b332c;line-height:1.8}',
  '.qm-zg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:0 0 12px}',
  '.qm-zg button{padding:11px 2px;border:1px solid var(--line);border-radius:2px;background:#fff;color:#3b332c;font-family:var(--ser);font-size:13px;letter-spacing:.06em;cursor:pointer;line-height:1.4}',
  '.qm-zg button:active{opacity:.8}',
  '.qm-zg button.on{background:var(--zhu);color:#f7f3ea;border-color:var(--zhu)}',
  '.qm-zg button.self{border-color:var(--gold);box-shadow:inset 0 0 0 1px var(--gold)}',
  '.qm-zg button.mid{background:#4a1a17;color:#f2e6d2;border-color:#4a1a17}',
  '.qm-zg button.mid.on{background:var(--zhu);border-color:var(--zhu)}',
  '.qm-zg em{display:block;font-style:normal;font-size:10px;color:#a08d72;margin-top:2px}',
  '.qm-zg button.on em,.qm-zg button.mid em{color:rgba(255,255,255,.65)}',
  '.qm-zi{border:1px solid var(--line);background:#fff;border-radius:2px;padding:14px 15px}',
  '.qm-zi h5{margin:0 0 8px;font-size:17px;color:var(--zhu);letter-spacing:.1em;font-weight:700}',
  '.qm-zi h5 span{font-size:11px;color:#a08d72;letter-spacing:.12em;margin-left:8px;font-weight:400}',
  '.qm-zi dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:6px 12px}',
  '.qm-zi dt{font-size:12px;color:#8a7a64;letter-spacing:.1em;white-space:nowrap}',
  '.qm-zi dd{margin:0;font-size:14px;color:#3b332c;line-height:1.75}',
  '.qm-zi p.xs{margin:10px 0 0;padding-top:10px;border-top:1px solid var(--line);font-size:15px;color:#3b332c;line-height:1.85}',
  '.qm-zs{margin:0;padding:0;list-style:none}',
  '.qm-zs li{padding:9px 0;border-bottom:1px solid var(--line);font-size:14px;line-height:1.75;color:#3b332c}',
  '.qm-zs li:last-child{border-bottom:0}',
  '.qm-zs b{color:var(--zhu);font-weight:700;letter-spacing:.08em}',
  '.qm-zs i{font-style:normal;font-size:11px;color:#a08d72;letter-spacing:.1em;margin-left:6px}'
  ].join('');
  document.head.appendChild(s);
}

/* ---------- 版面 ---------- */
function view(){
  return ''+
  '<p class="qm-note">輸入手機號碼（台灣 10 碼、大陸 11 碼皆可），取末七碼落宮，觀處境、心念與門路。號碼僅在本機換算，不上傳、不留存。</p>'+
  '<div class="qm-in">'+
    '<input type="tel" id="qmNum" inputmode="numeric" maxlength="11" placeholder="0912345678" autocomplete="off">'+
    '<button type="button" id="qmGo">起盤</button>'+
  '</div>'+
  '<p class="qm-err" id="qmErr"></p>'+
  '<div id="qmOut" style="display:none">'+
    '<div class="qm-h">四綱</div>'+
    '<div class="qm-sg" id="qmSg"></div>'+
    '<p class="qm-cap" id="qmSgCap">前幾碼為綱，主根源背景，僅取記號，不入盤。</p>'+
    '<div class="qm-h">落宮</div>'+
    '<div class="qm-plate" id="qmPlate"></div>'+
    '<p class="qm-cap" id="qmCap"></p>'+
    '<div class="qm-card" id="qmGong"></div>'+
    '<div class="qm-h">格局</div>'+
    '<div class="qm-gj" id="qmGj"></div>'+
    '<div class="qm-h">逐碼詳解</div>'+
    '<div id="qmLy"></div>'+
    '<div class="qm-h">九宮增運</div>'+
    '<div class="qm-zg" id="qmZg"></div>'+
    '<div id="qmZi"></div>'+
    '<p class="qm-note" style="margin-top:18px">'+
      '取數：一律取末七碼。倒數第7碼定宮位、第6碼引干、第5碼八神、第4碼九星、第3碼八門、第2碼天盤干、最末碼地盤干；其餘前碼作綱。<br>'+
      '判定：六儀擊刑依甲子戊震宮之例；入墓依十天干陰陽順逆十二長生之墓庫；門迫取門五行剋宮五行。<br>'+
      '本模組斷語僅供參考，不構成醫療、法律、投資或人身建議。'+
    '</p>'+
  '</div>';
}

/* ---------- 論斷 ---------- */
function mark(d,gong){
  var g=GAN[d],m=[];
  if(JIXING[g]===gong) m.push('擊刑');
  if(RUMU[g]&&RUMU[g].indexOf(gong)>-1) m.push('入墓');
  return m.join('·');
}

function run(){
  var el=function(i){return document.getElementById(i);};
  var v=(el('qmNum').value||'').replace(/\D/g,'');
  if(v.length<8||v.length>11){
    el('qmErr').textContent='請輸入手機號碼（台灣 10 碼、大陸 11 碼）。';
    el('qmOut').style.display='none'; return;
  }
  el('qmErr').textContent='';

  var all=v.split('').map(Number);
  var k=all.length-7;              /* 末七碼的起點：台灣 3、大陸 4 */
  var t=all.slice(k);              /* 末七碼，落宮用 */
  var n=all.slice(0,k);            /* 前面剩下的，作綱 */
  var gong=t[0],yin=t[1],shen=t[2],xing=t[3],men=t[4],tian=t[5],di=t[6];
  var G=D.gong[gong];

  var sg='';
  for(var i=0;i<n.length;i++) sg+='<div class="c"><b>'+n[i]+'</b><s>'+GAN[n[i]]+'</s><em>'+mark(n[i],gong)+'</em></div>';
  el('qmSg').innerHTML=sg;
  var cap=el('qmSgCap');
  if(cap) cap.textContent='前 '+n.length+' 碼為綱，主根源背景，僅取記號，不入盤。';

  var p='';
  for(var k=0;k<9;k++){
    var c=LUOSHU[k];
    if(c===gong){
      p+='<div class="qm-cell on"><span class="gn">'+GNAME[c]+'宮</span><span class="st">'+
         '<i>'+D.shen[shen].n+'</i> <i>'+D.xing[xing].n+'</i><br>'+
         '<u>'+D.men[men].n+'</u><br><u>'+GAN[tian]+'</u> / <u>'+GAN[di]+'</u></span></div>';
    }else{
      p+='<div class="qm-cell"><span class="gn">'+GNAME[c]+'</span><span class="nu">'+c+'</span></div>';
    }
  }
  el('qmPlate').innerHTML=p;
  el('qmCap').textContent = gong===0 ? '第五碼為 0，落空亡，九宮無實位可入。' : '洛書九宮 · 亮宮為所落之位';

  var fl=[],gt=GAN[tian],gd=GAN[di];
  if(gong===0) fl.push(['空亡宮','']);
  if(JIXING[gt]===gong) fl.push([gt+'擊刑','']);
  if(JIXING[gd]===gong) fl.push([gd+'擊刑','']);
  if(RUMU[gt]&&RUMU[gt].indexOf(gong)>-1) fl.push([gt+'入墓','']);
  if(RUMU[gd]&&RUMU[gd].indexOf(gong)>-1) fl.push([gd+'入墓','']);
  if(JIXING[gt]===gong&&RUMU[gt]&&RUMU[gt].indexOf(gong)>-1) fl.push(['刑墓交加','']);
  if(JIXING[gd]===gong&&RUMU[gd]&&RUMU[gd].indexOf(gong)>-1) fl.push(['刑墓交加','']);
  var mw=WX[men],gw=WX[gong];
  if(mw!=='空'&&gw!=='空'){
    if(KE[mw]===gw) fl.push(['門迫','']);
    else if(KE[gw]===mw) fl.push(['門制','mid']);
    else if(SHENG[mw]===gw) fl.push(['門生宮','ok']);
    else if(SHENG[gw]===mw) fl.push(['宮生門','mid']);
    else if(mw===gw) fl.push(['門宮比和','ok']);
  }
  var fh='';
  for(var f=0;f<fl.length;f++) fh+='<span class="qm-flag '+fl[f][1]+'">'+fl[f][0]+'</span>';
  el('qmGong').innerHTML='<h4>'+G.n+'</h4><span class="wx">五行 '+G.wx+'</span><p>'+G.t+'</p>'+
    (fh?'<div class="qm-flags">'+fh+'</div>':'');

  var gj=D.geju[GAN[tian]+GAN[di]]||['—','平','此組合無專名，依五行生剋參詳。'];
  el('qmGj').innerHTML='<span class="nm">'+gj[0]+'</span><span class="jx">'+gj[1]+'</span>'+
    '<p class="pr">天盤 '+GAN[tian]+' 加 地盤 '+GAN[di]+'</p><p>'+gj[2]+'</p>';

  var L=[
    ['第五碼 · 倒數第7','宮位',G.n,'所處的環境、平台與空間，能否發揮。',G.t],
    ['第六碼 · 倒數第6','引干',D.gan[yin].n,'事情引發的原因與動機。',D.gan[yin].t],
    ['第七碼 · 倒數第5','八神',D.shen[shen].n,'思想、觀念，以及有無神助。',D.shen[shen].t],
    ['第八碼 · 倒數第4','九星',D.xing[xing].n,'個性、運勢，以及事業發展性。',D.xing[xing].t],
    ['第九碼 · 倒數第3','八門',D.men[men].n,'有無門路、做事的途徑與風格。',D.men[men].t],
    ['第十碼 · 倒數第2','天盤干',GAN[tian],'外在的行為與表現。',D.gan[tian].t],
    ['第十一碼 · 倒數第1','地盤干',GAN[di],'內在的想法與根柢。',D.gan[di].t]
  ];
  var lh='';
  for(var j=0;j<L.length;j++){
    lh+='<details class="qm-ly"><summary><span class="ps">'+L[j][0]+'</span>'+
        '<span class="tt">'+L[j][1]+'　<span class="vl">'+L[j][2]+'</span></span></summary>'+
        '<div class="bd"><span class="rl">'+L[j][3]+'</span>'+L[j][4]+'</div></details>';
  }
  el('qmLy').innerHTML=lh;
  drawZeng(gong);
  el('qmOut').style.display='block';
}

/* ---------- 九宮增運 ---------- */
/* 洛書排列：巽4 離9 坤2 ／ 震3 中(八神) 兌7 ／ 艮8 坎1 乾6 */
var ZGRID=[4,9,2,3,'S',7,8,1,6];
var SELF=0;          /* 本命所落之宮，用金框標示 */
var CUR=null;        /* 目前選取 */

function drawZeng(gong){
  SELF=gong; CUR=(gong===0||gong===5)?'S':gong;
  var h='';
  for(var i=0;i<9;i++){
    var c=ZGRID[i];
    if(c==='S'){
      h+='<button type="button" data-z="S" class="mid'+(CUR==='S'?' on':'')+'">八神增運<em>八 神</em></button>';
    }else{
      var g=D.jie[c];
      h+='<button type="button" data-z="'+c+'" class="'+(CUR===c?'on ':'')+(c===SELF?'self':'')+'">'+
         g.n.replace(/[一二三四五六七八九]/,'')+'增運<em>'+g.fw+'</em></button>';
    }
  }
  document.getElementById('qmZg').innerHTML=h;
  showZeng(CUR);
}

function showZeng(key){
  var box=document.getElementById('qmZi');
  if(!box) return;
  var h='';
  if(key==='S'){
    h='<div class="qm-zi"><h5>八神增運<span>依盤中八神調整</span></h5><ul class="qm-zs">';
    Object.keys(D.shenzeng).forEach(function(n){
      var s=D.shenzeng[n];
      h+='<li><b>'+n+'</b><i>'+s.k+'</i><br>'+s.t+'</li>';
    });
    h+='</ul></div>';
  }else{
    var g=D.jie[key];
    if(!g) return;
    h='<div class="qm-zi"><h5>'+g.n+'<span>五行 '+g.wx+(Number(key)===SELF?'　本命所落':'')+'</span></h5>'+
      '<dl><dt>方位</dt><dd>'+g.fw+'</dd>'+
      '<dt>顏色</dt><dd>'+g.ys+'</dd>'+
      '<dt>擺設</dt><dd>'+g.bs+'</dd></dl>'+
      '<p class="xs">'+g.xs+'</p></div>';
  }
  box.innerHTML=h;
  var btns=document.getElementById('qmZg').getElementsByTagName('button');
  for(var i=0;i<btns.length;i++){
    var k=btns[i].getAttribute('data-z');
    if(k===String(key)) btns[i].className+=(btns[i].className.indexOf('on')<0?' on':'');
    else btns[i].className=btns[i].className.replace(/\s*\bon\b/,'');
  }
}

/* ---------- 綁定（用事件委派，不怕外掛何時被插進 DOM）---------- */
document.addEventListener('click',function(e){
  var t=e.target;
  if(t&&t.id==='qmGo'){ e.preventDefault(); run(); return; }
  if(t&&t.getAttribute&&t.getAttribute('data-z')!==null){
    e.preventDefault();
    var k=t.getAttribute('data-z');
    CUR=(k==='S')?'S':Number(k);
    showZeng(CUR);
  }
});
document.addEventListener('keydown',function(e){
  if(e.key==='Enter'&&e.target&&e.target.id==='qmNum'){ e.preventDefault(); run(); }
});

/* ---------- 掛載 ---------- */
css();
if(window.PP&&typeof PP.addStatic==='function'){
  /* 用 addStatic：本模組只需手機號，與生辰無關，不必先排盤 */
  PP.addStatic('奇門手機號論斷', function(){ return view(); });
}else if(window.PP&&typeof PP.add==='function'){
  PP.add('奇門手機號論斷', function(){ return view(); });
}else{
  console.warn('[qimen] 找不到 PP.add，模組待掛載');
  window.QMVIEW=view;   // 備援：可手動取得版面 HTML
}

})();
