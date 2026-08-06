/* ============================================================
   patch-qimen.js  ·  陰盤遁甲手機號論斷（外掛模組）
   依賴：data-qimen.js（須先載入）
   掛載：PP.add('奇門手機號論斷', fn)
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
  '.qm-jie{background:#fff;border:1px dashed var(--gold);border-radius:2px;padding:14px 15px;font-size:15px;color:#3b332c;line-height:1.8}'
  ].join('');
  document.head.appendChild(s);
}

/* ---------- 版面 ---------- */
function view(){
  return ''+
  '<p class="qm-note">輸入十一碼手機號碼，取末七碼落宮，觀處境、心念與門路。號碼僅在本機換算，不上傳、不留存。</p>'+
  '<div class="qm-in">'+
    '<input type="tel" id="qmNum" inputmode="numeric" maxlength="11" placeholder="0912345678">'+
    '<button type="button" id="qmGo">起盤</button>'+
  '</div>'+
  '<p class="qm-err" id="qmErr"></p>'+
  '<div id="qmOut" style="display:none">'+
    '<div class="qm-h">四綱</div>'+
    '<div class="qm-sg" id="qmSg"></div>'+
    '<p class="qm-cap">前四碼為綱，主根源背景，僅取記號，不入盤。</p>'+
    '<div class="qm-h">落宮</div>'+
    '<div class="qm-plate" id="qmPlate"></div>'+
    '<p class="qm-cap" id="qmCap"></p>'+
    '<div class="qm-card" id="qmGong"></div>'+
    '<div class="qm-h">格局</div>'+
    '<div class="qm-gj" id="qmGj"></div>'+
    '<div class="qm-h">逐碼詳解</div>'+
    '<div id="qmLy"></div>'+
    '<div class="qm-h">增運建議</div>'+
    '<div class="qm-jie" id="qmJie"></div>'+
    '<p class="qm-note" style="margin-top:18px">'+
      '取數：第五碼定宮位、第六碼引干、第七碼八神、第八碼九星、第九碼八門、第十碼天盤干、第十一碼地盤干。<br>'+
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
  if(v.length!==11){ el('qmErr').textContent='請輸入完整的十一碼手機號碼。'; el('qmOut').style.display='none'; return; }
  el('qmErr').textContent='';

  var n=v.split('').map(Number);
  var gong=n[4],yin=n[5],shen=n[6],xing=n[7],men=n[8],tian=n[9],di=n[10];
  var G=D.gong[gong];

  var sg='';
  for(var i=0;i<4;i++) sg+='<div class="c"><b>'+n[i]+'</b><s>'+GAN[n[i]]+'</s><em>'+mark(n[i],gong)+'</em></div>';
  el('qmSg').innerHTML=sg;

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
  el('qmJie').innerHTML=D.jie[gong].t;
  el('qmOut').style.display='block';
}

/* ---------- 綁定（用事件委派，不怕外掛何時被插進 DOM）---------- */
document.addEventListener('click',function(e){
  var t=e.target;
  if(t&&t.id==='qmGo'){ e.preventDefault(); run(); }
});
document.addEventListener('keydown',function(e){
  if(e.key==='Enter'&&e.target&&e.target.id==='qmNum'){ e.preventDefault(); run(); }
});

/* ---------- 掛載 ---------- */
css();
if(window.PP&&typeof PP.add==='function'){
  PP.add('奇門手機號論斷', function(){ return view(); });
}else{
  console.warn('[qimen] 找不到 PP.add，模組待掛載');
  window.QMVIEW=view;   // 備援：可手動取得版面 HTML
}

})();
