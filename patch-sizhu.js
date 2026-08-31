/* ============================================================
   patch-sizhu.js  ·  四柱八字（插在「先天·後天」卡片上方）
   ------------------------------------------------------------
   index.html 位置：patch-zhu.js 之後

   老師需求：「四柱八字一樣要在盤上面」

   v2 修正：不再依賴 #tp 定位（patch-zhu.js 會重畫該表格），
            改用掃描各 .card 的 h2 標題文字找錨點，
            加上多層 fallback，並把錯誤直接顯示在畫面上。

   子時規則：時辰序 1（子 23-01）取 0 時＝早子時，算當日。
             若採「晚子時算隔天」，把 ZI_NEXT_DAY 改成 true。
   ============================================================ */
(function () {
'use strict';

var ZI_NEXT_DAY = false;

var ZHI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
var GAN_WX = {甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'};
var ZHI_WX = {子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水'};
var COL = {木:'#3d6b3d',火:'#a13a2a',土:'#8a6a24',金:'#7a6f5e',水:'#2f5d8a'};
var CORE_COL = {木:'#89ddb5',火:'#ff9f91',土:'#f3d178',金:'#dce2f3',水:'#8fcaf3'};

function tenGod(dayGan, targetGan) {
  var d = GAN10.indexOf(dayGan), t = GAN10.indexOf(targetGan);
  if (d < 0 || t < 0) return '';
  var de = Math.floor(d / 2), te = Math.floor(t / 2), same = (d % 2) === (t % 2);
  if (de === te) return same ? '比肩' : '劫財';
  if ((te + 1) % 5 === de) return same ? '偏印' : '正印';
  if ((de + 1) % 5 === te) return same ? '食神' : '傷官';
  if ((de + 2) % 5 === te) return same ? '偏財' : '正財';
  if ((te + 2) % 5 === de) return same ? '七殺' : '正官';
  return '';
}

/* 六十甲子納音（繁體）—— lunar-javascript 回傳簡體，故自備此表 */
var GAN10 = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
var NAYIN = ['海中金','爐中火','大林木','路旁土','劍鋒金','山頭火',
             '澗下水','城頭土','白蠟金','楊柳木','泉中水','屋上土',
             '霹靂火','松柏木','長流水','沙中金','山下火','平地木',
             '壁上土','金箔金','覆燈火','天河水','大驛土','釵釧金',
             '桑柘木','大溪水','沙中土','天上火','石榴木','大海水'];
function jiaziIndex(gz) {
  var g = GAN10.indexOf(gz.charAt(0)), z = ZHI.indexOf(gz.charAt(1));
  if (g < 0 || z < 0) return -1;
  for (var i = 0; i < 60; i++) if (i % 10 === g && i % 12 === z) return i;
  return -1;
}
function nayinOf(gz) {
  var i = jiaziIndex(gz);
  return i < 0 ? '' : NAYIN[Math.floor(i / 2)];
}

/* lunar-javascript 的十二長生為簡體字，畫面統一使用繁體。 */
var DI_SHI_TRAD = {
  '长生':'長生','沐浴':'沐浴','冠带':'冠帶','临官':'臨官',
  '帝旺':'帝旺','衰':'衰','病':'病','死':'死','墓':'墓',
  '绝':'絕','胎':'胎','养':'養'
};
function tradDiShi(v) { return DI_SHI_TRAD[v] || v || '—'; }
function ymdZh(v) {
  var a = String(v || '').split('-');
  return a.length === 3 ? (parseInt(a[0],10) + '年' + parseInt(a[1],10) + '月' + parseInt(a[2],10) + '日') : (v || '—');
}


function css() {
  if (document.getElementById('sz-style')) return;
  var s = document.createElement('style');
  s.id = 'sz-style';
  s.textContent = [
    '#sz-card{margin-bottom:6px;padding:0!important;border-color:#d8b550!important;background:#291032!important;isolation:isolate}',
    '#out .card.sz-near-card{margin-top:0;margin-bottom:6px}',
    '#sz-dayun-card{margin-top:0;padding:13px;border-color:#d8bf79;background:linear-gradient(145deg,#fffdf7,#fff8fd)}',
    '#sz-dayun-card .sz-dayun-block{margin-top:0}',
    '#sz-card:before{display:none}',
    '#sz-card .sz-dashboard-head{position:relative;overflow:hidden;min-height:148px;display:grid;grid-template-columns:48px 1fr 78px;align-items:center;gap:12px;padding:22px 20px;color:#fff;background:radial-gradient(circle at 84% 18%,rgba(245,210,104,.24),transparent 25%),linear-gradient(100deg,#26032f 0,#5d0c70 56%,#8b327f 100%),url("hero-bg-v3.webp") 72% 46%/cover no-repeat}',
    '#sz-card .sz-dashboard-head:before{content:"";position:absolute;inset:8px;border:1px solid rgba(239,207,109,.42);border-radius:16px;pointer-events:none}',
    '#sz-card .sz-seal{position:relative;width:48px;height:48px;display:grid;place-items:center;border:1px solid #efd06e;border-radius:50%;color:#f6da80;background:radial-gradient(circle at 34% 25%,#c14bd1,#641078 62%,#33023d);box-shadow:inset 0 0 0 4px rgba(255,255,255,.12),0 8px 18px rgba(24,1,30,.5);font:900 18px var(--ser)}',
    '#sz-card .sz-head-copy{position:relative;min-width:0}',
    '#sz-card .sz-head-copy small{display:block;margin-bottom:5px;color:#f1cf73;font:800 8px sans-serif;letter-spacing:.2em}',
    '#sz-card .sz-head-copy h2{margin:0!important;padding:0!important;color:#fff8e7!important;text-align:left!important;font:900 24px/1.25 var(--ser)!important;letter-spacing:.18em!important;text-indent:0!important;text-shadow:0 3px 12px rgba(24,1,30,.72)}',
    '#sz-card .sz-head-copy h2:after{display:none}',
    '#sz-card .sz-head-copy p{margin:6px 0 0;color:#e8d7eb;font-size:10px;line-height:1.6}',
    '#sz-card .sz-daycore{position:relative;display:grid;place-items:center;min-height:86px;border:1px solid rgba(239,207,109,.62);border-radius:18px;background:linear-gradient(145deg,rgba(255,255,255,.18),rgba(255,255,255,.06));box-shadow:inset 0 1px rgba(255,255,255,.2),0 8px 20px rgba(31,2,38,.28);backdrop-filter:blur(8px)}',
    '#sz-card .sz-daycore small{color:#f1d37b;font-size:8px;letter-spacing:.14em}',
    '#sz-card .sz-daycore strong{font:900 31px/1 var(--ser);text-shadow:0 3px 9px rgba(24,1,30,.55)}',
    '#sz-card .sz-daycore span{color:#f3e6f4;font-size:9px}',
    '#sz-card .sz-dashboard-body{position:relative;padding:18px;background:radial-gradient(circle at 96% 8%,rgba(219,178,66,.16),transparent 24%),url("assets/celestial-orbit.svg") 116% 10%/210px auto no-repeat,linear-gradient(180deg,#fffafc,#f5e6f8)}',
    '#sz-card .sz-pillars{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}',
    '#sz-card .sz-pillar{position:relative;overflow:hidden;min-width:0;padding:11px 6px 10px;border:1px solid var(--wx-line,#d9b9df);border-radius:15px;background:linear-gradient(155deg,#fff,var(--wx-soft,#f7ebfa));box-shadow:0 8px 18px rgba(67,10,80,.08),inset 0 1px #fff;text-align:center}',
    '#sz-card .sz-pillar:after{content:"";position:absolute;right:-18px;bottom:-22px;width:52px;height:52px;border:1px solid color-mix(in srgb,var(--wx,#7a2b88) 22%,transparent);border-radius:50%;box-shadow:0 0 0 8px color-mix(in srgb,var(--wx,#7a2b88) 6%,transparent)}',
    '#sz-card .sz-pillar header{margin:0 0 8px!important;padding:0 0 7px!important;border:0!important;border-bottom:1px solid color-mix(in srgb,var(--wx,#7a2b88) 18%,transparent)!important;border-radius:0!important;background:none!important;box-shadow:none!important;color:var(--wx,#6a2076)!important;font-size:10px!important;font-weight:900;letter-spacing:.1em}',
    '#sz-card .sz-gz{position:relative;z-index:1;display:flex;justify-content:center;gap:2px;color:var(--wx,#651078);font:900 28px/1.1 var(--ser)}',
    '#sz-card .sz-elements{position:relative;z-index:1;margin:5px 0 8px;color:#8d788f;font-size:8px;letter-spacing:.12em}',
    '#sz-card .sz-nayin{position:relative;z-index:1;min-height:30px;display:grid;place-items:center;color:#6e5b70;font-size:9px;line-height:1.4}',
    '#sz-card .sz-stage{position:relative;z-index:1;display:inline-flex;margin-top:5px;padding:4px 7px;border:1px solid color-mix(in srgb,var(--wx,#7a2b88) 28%,#ddd);border-radius:999px;color:var(--wx,#651078);background:rgba(255,255,255,.82);font-size:9px;font-weight:800;white-space:nowrap}',
    '#sz-card .sz-wx-木{--wx:#3b8062;--wx-line:#add6c7;--wx-soft:#eaf8f2}',
    '#sz-card .sz-wx-火{--wx:#a74743;--wx-line:#e4b9b5;--wx-soft:#fff0ed}',
    '#sz-card .sz-wx-土{--wx:#9a7025;--wx-line:#e0ca94;--wx-soft:#fff7df}',
    '#sz-card .sz-wx-金{--wx:#6b7187;--wx-line:#c9cddd;--wx-soft:#f0f2f8}',
    '#sz-card .sz-wx-水{--wx:#356b94;--wx-line:#b5cee1;--wx-soft:#eaf4fb}',
    '#sz-card .sz-summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:10px}',
    '#sz-card .sz-summary>div{min-width:0;padding:11px 10px;border:1px solid #ddc6e1;border-radius:12px;background:rgba(255,255,255,.78);box-shadow:inset 0 1px #fff}',
    '#sz-card .sz-summary>div:nth-child(1){border-color:#dcc17c;background:linear-gradient(145deg,#fff,#fff6d9)}',
    '#sz-card .sz-summary>div:nth-child(2){border-color:#c8bde0;background:linear-gradient(145deg,#fff,#f0ecff)}',
    '#sz-card .sz-summary>div:nth-child(3){border-color:#b9d8cd;background:linear-gradient(145deg,#fff,#edf9f4)}',
    '#sz-card .sz-summary small{display:block;margin-bottom:4px;color:#957a99;font-size:8px;letter-spacing:.12em}',
    '#sz-card .sz-summary strong{display:block;color:#611371;font:900 14px/1.4 var(--ser)}',
    '#sz-card .szyun{position:relative;overflow:hidden;display:grid;grid-template-columns:auto 1fr;gap:4px 13px;align-items:center;margin-top:10px;padding:13px 15px;border:1px solid #d6b34d;border-radius:14px;background:radial-gradient(circle at 94% 10%,rgba(221,180,65,.22),transparent 27%),linear-gradient(135deg,#fff8dc,#fff 46%,#f5e8f8);box-shadow:0 9px 22px rgba(79,13,92,.1)}',
    '#sz-card .szyun:after{content:"運";position:absolute;right:9px;bottom:-20px;color:rgba(111,37,120,.07);font:900 72px/1 var(--ser)}',
    '#sz-card .szyun-k{grid-row:1/3;position:relative;z-index:1;padding:8px 10px;border:1px solid #edcf70;border-radius:999px;background:linear-gradient(145deg,#4b075a,#9f25b7);color:#fff5d6;font-size:10px;font-weight:900;letter-spacing:.12em;white-space:nowrap}',
    '#sz-card .szyun strong{position:relative;z-index:1;color:#5e246c;font:900 16px var(--ser);letter-spacing:.06em}',
    '#sz-card .szyun small{position:relative;z-index:1;color:#806e82;font-size:10px;line-height:1.5}',
    '#sz-card .sz-dayun-block{margin-top:14px;padding:13px;border:1px solid #d8bf79;border-radius:16px;background:linear-gradient(145deg,#fffdf6,#fff7fd)}',
    '#sz-card .sz-dayun-title{display:flex;justify-content:space-between;gap:10px;align-items:end;margin-bottom:8px}',
    '#sz-card .sz-dayun-title h3{margin:0;color:#641174;font:900 16px var(--ser);letter-spacing:.12em}',
    '#sz-card .sz-dayun-title span{color:#8b7888;font-size:9px;text-align:right}',
    '#sz-card .sz-dayun-scroll{overflow-x:auto;padding-bottom:7px;-webkit-overflow-scrolling:touch}',
    '#sz-card .sz-dayun-list{display:grid;grid-template-columns:repeat(8,88px);gap:7px;min-width:max-content}',
    '#sz-card .sz-dayun-item{min-height:116px;padding:8px 4px;border:1px solid #decddd;border-radius:12px;background:linear-gradient(180deg,#fff,#faf2fb);color:#62515e;text-align:center;cursor:pointer}',
    '#sz-card .sz-dayun-item small,#sz-card .sz-dayun-item span,#sz-card .sz-dayun-item em{display:block;font-size:9px}',
    '#sz-card .sz-dayun-item span{margin-top:2px;color:#988793}',
    '#sz-card .sz-dayun-item strong{display:block;margin:6px 0 3px;color:#671078;font:900 23px var(--ser);letter-spacing:.06em}',
    '#sz-card .sz-dayun-item em{color:#a76127;font-style:normal}',
    '#sz-card .sz-dayun-item.is-active{border-color:#c59a30;background:linear-gradient(180deg,#fff7d7,#fff0fb);box-shadow:inset 0 0 0 1px #e1bb57,0 6px 15px rgba(95,17,106,.14)}',
    '#sz-card .sz-flow{margin-top:11px;overflow:hidden;border:1px solid #dfccdf;border-radius:13px;background:#fff}',
    '#sz-card .sz-flow-head{display:flex;justify-content:space-between;gap:8px;padding:9px 11px;background:linear-gradient(90deg,#5c0b6d,#91257f);color:#fff}',
    '#sz-card .sz-flow-head b{font-size:11px}#sz-card .sz-flow-head span{font-size:9px}',
    '#sz-card .sz-flow-grid{display:grid;grid-template-columns:repeat(5,1fr)}',
    '#sz-card .sz-flow-grid>div{padding:8px 2px;text-align:center;border-right:1px solid #eee0ec;border-bottom:1px solid #eee0ec}',
    '#sz-card .sz-flow-grid>div:nth-child(5n){border-right:0}#sz-card .sz-flow-grid>div:nth-last-child(-n+5){border-bottom:0}',
    '#sz-card .sz-flow-grid small,#sz-card .sz-flow-grid span,#sz-card .sz-flow-grid em{display:block;font-size:8px}',
    '#sz-card .sz-flow-grid strong{display:block;margin:2px 0;color:#6a1079;font:900 17px var(--ser)}',
    '#sz-card .sz-flow-grid span{color:#766773}#sz-card .sz-flow-grid em{color:#a9652f;font-style:normal}',
    '#sz-card .sz-dayun-note{margin:9px 1px 0;color:#897b86;font-size:9px;line-height:1.6}',
    '#sz-card .sz-conv{margin-top:10px;padding:9px 12px;border-left:3px solid #c69b32;border-radius:0 10px 10px 0;color:#79667c;background:rgba(255,249,226,.74);font-size:10px;line-height:1.6}',
    '#sz-card .szwarn{margin-top:10px;padding:10px 12px;border:1px solid var(--zhu);background:#fdf6f5;font-size:13px;color:var(--zhu);line-height:1.7}',
    '@media (max-width:420px){#sz-card .sz-dashboard-head{min-height:132px;grid-template-columns:40px 1fr 66px;gap:9px;padding:18px 14px}#sz-card .sz-seal{width:40px;height:40px;font-size:15px}#sz-card .sz-head-copy h2{font-size:19px!important;letter-spacing:.12em!important}#sz-card .sz-head-copy p{font-size:8px}#sz-card .sz-daycore{min-height:74px;border-radius:14px}#sz-card .sz-daycore strong{font-size:26px}#sz-card .sz-dashboard-body{padding:14px 11px}#sz-card .sz-pillars{gap:5px}#sz-card .sz-pillar{padding:9px 3px 8px;border-radius:12px}#sz-card .sz-pillar header{font-size:9px!important}#sz-card .sz-gz{font-size:23px}#sz-card .sz-nayin{font-size:8px}#sz-card .sz-stage{padding:3px 5px;font-size:8px}#sz-card .sz-summary{gap:5px}#sz-card .sz-summary>div{padding:9px 6px}#sz-card .sz-summary strong{font-size:12px}#sz-card .szyun{padding:11px 9px;gap:4px 8px}#sz-card .szyun strong{font-size:14px}#sz-card .sz-dayun-block{padding:10px}#sz-card .sz-dayun-title{align-items:flex-start;flex-direction:column}#sz-card .sz-dayun-title span{text-align:left}#sz-card .sz-flow-grid{grid-template-columns:repeat(2,1fr)}#sz-card .sz-flow-grid>div,#sz-card .sz-flow-grid>div:nth-child(5n),#sz-card .sz-flow-grid>div:nth-last-child(-n+5){border-right:1px solid #eee0ec;border-bottom:1px solid #eee0ec}#sz-card .sz-flow-grid>div:nth-child(2n){border-right:0}#sz-card .sz-flow-grid>div:nth-last-child(-n+2){border-bottom:0}}'
  ].join('');
  document.head.appendChild(s);
}

function findAnchor() {
  var cards = document.querySelectorAll('#out .card');
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].id === 'sz-card') continue;
    var h = cards[i].querySelector('h2');
    if (!h) continue;
    var t = (h.textContent || '').replace(/\s/g, '');
    if (t.indexOf('先天') > -1 && t.indexOf('後天') > -1) return cards[i];
  }
  return null;
}

function hourOf(h) {
  var i = (parseInt(h, 10) || 1) - 1;
  if (i === 0) return ZI_NEXT_DAY ? 23 : 0;
  return i * 2;
}

function safe(fn, dft) {
  try { var v = fn(); return (v === undefined || v === null || v === '') ? dft : v; }
  catch (e) { return dft; }
}

function build() {
  if (!window.PP || !PP.chart) return null;
  var c = PP.chart;

  if (typeof Lunar === 'undefined') {
    return { warn: '曆法元件（lunar-javascript）沒有載入，四柱無法計算。請確認網路後重新整理。' };
  }

  var ec;
  try {
    /*
       chart 同時保存「輸入曆別、農曆日期、換算後國曆日期」。
       四柱一律從已驗證的國曆日期回推 Lunar，避免把農曆 10 月
       再誤當國曆月份而落到前一個農曆月。
    */
    if (c.sy && c.sm && c.sd && typeof Solar !== 'undefined') {
      ec = Solar.fromYmdHms(c.sy, c.sm, c.sd, hourOf(c.h), 0, 0).getLunar().getEightChar();
    } else {
      ec = Lunar.fromYmdHms(c.ly, c.lm, c.ld, hourOf(c.h), 0, 0).getEightChar();
    }
  } catch (e) {
    return { warn: '四柱計算失敗：' + (e && e.message ? e.message : '未知錯誤') };
  }

  var p = [
    { lab:'年 柱', gz: safe(function(){return ec.getYear();}, '') },
    { lab:'月 柱', gz: safe(function(){return ec.getMonth();}, '') },
    { lab:'日 柱', gz: safe(function(){return ec.getDay();}, '') },
    { lab:'時 柱', gz: safe(function(){return ec.getTime();}, '') }
  ];
  for (var i = 0; i < 4; i++) {
    if (!p[i].gz || p[i].gz.length < 2) {
      return { warn: '四柱資料不完整（' + p[i].lab.replace(/\s/g, '') + '取不到），請確認 lunar-javascript 版本。' };
    }
    p[i].ny = nayinOf(p[i].gz);
  }

  var diShi = [
    safe(function(){ return ec.getYearDiShi(); }, ''),
    safe(function(){ return ec.getMonthDiShi(); }, ''),
    safe(function(){ return ec.getDayDiShi(); }, ''),
    safe(function(){ return ec.getTimeDiShi(); }, '')
  ];
  for (i = 0; i < 4; i++) p[i].di = tradDiShi(diShi[i]);

  /* 性別參數依 lunar-javascript 官方定義：男 1、女 0。 */
  var yun = safe(function(){ return ec.getYun(c.sex === '男' ? 1 : 0); }, null);
  var yunInfo = null, daYunInfo = [], activeDaYun = 1;
  if (yun) {
    yunInfo = {
      date: safe(function(){ return yun.getStartSolar().toYmd(); }, ''),
      year: safe(function(){ return yun.getStartYear(); }, 0),
      month: safe(function(){ return yun.getStartMonth(); }, 0),
      day: safe(function(){ return yun.getStartDay(); }, 0),
      forward: safe(function(){ return yun.isForward(); }, true)
    };
    var daYunList = safe(function(){ return yun.getDaYun(9); }, []);
    var currentYear = new Date().getFullYear();
    for (i = 1; i < daYunList.length; i++) {
      var dy = daYunList[i], gz = safe(function(){ return dy.getGanZhi(); }, '');
      var years = safe(function(){ return dy.getLiuNian(); }, []);
      var item = {
        index: i,
        startAge: safe(function(){ return dy.getStartAge(); }, 0),
        endAge: safe(function(){ return dy.getEndAge(); }, 0),
        startYear: safe(function(){ return dy.getStartYear(); }, 0),
        endYear: safe(function(){ return dy.getEndYear(); }, 0),
        gz: gz,
        god: tenGod(ec.getDayGan(), gz.charAt(0)),
        years: []
      };
      for (var j = 0; j < years.length; j++) {
        var ln = years[j], lgz = safe(function(){ return ln.getGanZhi(); }, '');
        item.years.push({
          year: safe(function(){ return ln.getYear(); }, 0),
          age: safe(function(){ return ln.getAge(); }, 0),
          gz: lgz,
          god: tenGod(ec.getDayGan(), lgz.charAt(0))
        });
      }
      if (currentYear >= item.startYear && currentYear <= item.endYear) activeDaYun = i;
      daYunInfo.push(item);
    }
  }

  return {
    p: p,
    xun: safe(function(){ return ec.getDayXun(); }, ''),
    h: c.h, conv: c.conv, yun: yunInfo,
    dayGan: safe(function(){ return ec.getDayGan(); }, ''),
    daYun: daYunInfo, activeDaYun: activeDaYun
  };
}

function flowHtml(d, index) {
  if (!d || !d.daYun || !d.daYun.length) return '<div class="sz-dayun-note">尚無流年資料。</div>';
  var item = null;
  for (var i = 0; i < d.daYun.length; i++) if (d.daYun[i].index === index) item = d.daYun[i];
  if (!item) item = d.daYun[0];
  var h = '<div class="sz-flow-head"><b>' + item.gz + '大運｜' + item.startAge + '–' + item.endAge + '歲</b><span>' + item.startYear + '–' + item.endYear + '</span></div><div class="sz-flow-grid">';
  for (i = 0; i < item.years.length; i++) {
    var y = item.years[i];
    h += '<div><small>' + y.year + '</small><strong>' + y.gz + '</strong><span>' + y.age + '歲</span><em>' + y.god + '</em></div>';
  }
  return h + '</div>';
}

function dayunHtml(d) {
  if (!d.daYun || !d.daYun.length) return '';
  var h = '<div class="sz-dayun-block"><div class="sz-dayun-title"><h3>十年大運</h3><span>左右滑動查看全部；點選大運可切換下方流年</span></div><div class="sz-dayun-scroll"><div class="sz-dayun-list">';
  for (var i = 0; i < d.daYun.length; i++) {
    var x = d.daYun[i], on = x.index === d.activeDaYun ? ' is-active' : '';
    h += '<button type="button" class="sz-dayun-item' + on + '" data-sz-dayun="' + x.index + '"><small>' + x.startAge + '–' + x.endAge + '歲</small><span>' + x.startYear + '–' + x.endYear + '</span><strong>' + x.gz + '</strong><em>' + x.god + '</em></button>';
  }
  h += '</div></div><div class="sz-flow">' + flowHtml(d, d.activeDaYun) + '</div><p class="sz-dayun-note">大運與流年需配合原局強弱、喜忌、刑沖合害綜合判讀，不以單一干支直接論吉凶。</p></div>';
  return h;
}

var lastData = null;

function draw() {
  var d = build();
  lastData = d;
  if (!d) return;

  var card = document.getElementById('sz-card');
  var out = document.getElementById('out');
  if (!card) {
    card = document.createElement('div');
    card.className = 'card';
    card.id = 'sz-card';
    if (out) out.appendChild(card);
    else return;
  }

  var h = '', i, g, z, wx;

  if (d.p) {
    g = d.p[2].gz.charAt(0);
    wx = GAN_WX[g] || '';
    h += '<div class="sz-dashboard-head"><div class="sz-seal">命</div>' +
         '<div class="sz-head-copy"><small>FOUR PILLARS · DESTINY CHART</small><h2>四柱八字</h2><p>年月日時成四柱・先看日主，再讀五行與人生節奏</p></div>' +
         '<div class="sz-daycore"><small>日主核心</small><strong style="color:' + (CORE_COL[wx] || '#f5d978') + '">' + g + '</strong><span>' + wx + '命</span></div></div>' +
         '<div class="sz-dashboard-body"><div class="sz-pillars">';

    for (i = 0; i < 4; i++) {
      g = d.p[i].gz.charAt(0);
      z = d.p[i].gz.charAt(1);
      wx = GAN_WX[g] || ZHI_WX[z] || '';
      h += '<article class="sz-pillar sz-wx-' + wx + '"><header>' + d.p[i].lab.replace(/\s/g,'') + '</header>' +
           '<div class="sz-gz"><span>' + g + '</span><span>' + z + '</span></div>' +
           '<div class="sz-elements">' + (GAN_WX[g] || '—') + '・' + (ZHI_WX[z] || '—') + '</div>' +
           '<div class="sz-nayin">' + (d.p[i].ny || '—') + '</div>' +
           '<span class="sz-stage">' + (d.p[i].di || '—') + '</span></article>';
    }
    h += '</div><div class="sz-summary">' +
         '<div><small>日主五行</small><strong>' + d.p[2].gz.charAt(0) + '・' + (GAN_WX[d.p[2].gz.charAt(0)] || '—') + '</strong></div>' +
         '<div><small>日柱旬</small><strong>' + (d.xun || '—') + '</strong></div>' +
         '<div><small>出生時辰</small><strong>' + (ZHI[(d.h || 1) - 1] || '—') + '時</strong></div></div>';

    if (d.yun && d.yun.date) {
      h += '<div class="szyun"><span class="szyun-k">大運起運</span>' +
           '<strong>' + ymdZh(d.yun.date) + '</strong>' +
           '<small>出生後 ' + d.yun.year + ' 年 ' + d.yun.month + ' 個月 ' + d.yun.day + ' 日起運・' + (d.yun.forward ? '順行' : '逆行') + '</small></div>';
    }

    if (d.conv || ZI_NEXT_DAY) h += '<div class="sz-conv">' +
      (ZI_NEXT_DAY ? '子時採晚子跨日規則。' : '') + (d.conv || '') + '</div>';
    h += '</div>';
  }

  if (d.warn) h += '<div class="szwarn">' + d.warn + '</div>';

  card.innerHTML = h;

  /*
     固定閱讀順序：
     四柱八字 → 先天・後天 → 十年大運 → 六柱環與其他內容。
     直接移動既有節點，不複製、不重建先天後天計算。
  */
  var anchor = findAnchor();
  if (out) {
    out.insertBefore(card, out.firstElementChild);
    if (anchor) {
      card.classList.add('ly-join-top');
      anchor.classList.add('sz-near-card', 'ly-join-bot');
      card.insertAdjacentElement('afterend', anchor);
    }
  }

  var dayunCard = document.getElementById('sz-dayun-card');
  if (d.daYun && d.daYun.length) {
    if (!dayunCard) {
      dayunCard = document.createElement('div');
      dayunCard.className = 'card';
      dayunCard.id = 'sz-dayun-card';
    }
    dayunCard.innerHTML = dayunHtml(d);
    if (anchor) anchor.insertAdjacentElement('afterend', dayunCard);
    else card.insertAdjacentElement('afterend', dayunCard);
  } else if (dayunCard) {
    dayunCard.remove();
  }
}

function go() {
  try { css(); draw(); }
  catch (e) { console.warn('[patch-sizhu] ' + (e && e.message)); }
}

function wrap(name) {
  if (typeof window[name] !== 'function') return false;
  if (window[name].__sz) return true;
  var orig = window[name];
  var f = function () { var r = orig.apply(this, arguments); go(); return r; };
  f.__sz = true;
  window[name] = f;
  return true;
}

var tries = 0;
function hook() {
  var ok = false;
  if (wrap('render')) ok = true;
  if (wrap('drawPillars')) ok = true;
  if (!ok && ++tries < 60) setTimeout(hook, 200);
}

document.addEventListener('click', function (e) {
  var t = e.target;
  var dy = t && t.closest ? t.closest('[data-sz-dayun]') : null;
  if (dy && lastData) {
    var card = dy.closest('#sz-card');
    if (card) {
      var buttons = card.querySelectorAll('[data-sz-dayun]');
      for (var i = 0; i < buttons.length; i++) buttons[i].classList.toggle('is-active', buttons[i] === dy);
      var flow = card.querySelector('.sz-flow');
      if (flow) flow.innerHTML = flowHtml(lastData, parseInt(dy.getAttribute('data-sz-dayun'), 10));
    }
    return;
  }
  if (t && (t.id === 'go' || (t.closest && t.closest('#go')))) {
    setTimeout(go, 120);
    setTimeout(go, 600);
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hook);
} else {
  hook();
}

})();
