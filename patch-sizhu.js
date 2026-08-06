/* ============================================================
   patch-sizhu.js  ·  四柱八字（插在「先天·後天」卡片上方）
   ------------------------------------------------------------
   index.html 在 patch-zhu.js 那行【下面】加：
     <script src="patch-sizhu.js"></script>

   老師需求：「四柱八字一樣要在盤上面」

   資料來源：lunar-javascript 1.6.12（index.html 已載入）
   由農曆年月日 + 時辰序還原 Lunar 物件，取 EightChar。
   年柱依立春分界、月柱依節氣分界，由函式庫處理，不自行推算。

   子時規則：時辰序 1（子 23-01）取 0 時，即「早子時，算當日」。
             老師若採「晚子時算隔天」，把 ZI_NEXT_DAY 改成 true。
   ============================================================ */
(function () {
'use strict';

var ZI_NEXT_DAY = false;

var ZHI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
var GAN_WX = {甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'};
var ZHI_WX = {子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水'};
var WX_COLOR = {木:'#3d6b3d',火:'#a13a2a',土:'#8a6a24',金:'#7a6f5e',水:'#2f5d8a'};

function css() {
  if (document.getElementById('sz-style')) return;
  var s = document.createElement('style');
  s.id = 'sz-style';
  s.textContent = [
    '#sz-card table{table-layout:fixed}',
    '#sz-card td.sz-g,#sz-card td.sz-z{font-family:var(--ser);font-size:26px;font-weight:700;line-height:1.3;padding:10px 4px}',
    '#sz-card td.sz-z{padding-top:0}',
    '#sz-card td.sz-g small,#sz-card td.sz-z small{display:block;font-size:10px;font-weight:400;letter-spacing:.1em;color:#9c8b74;margin-top:2px}',
    '#sz-card td.sz-ny{font-size:12px;color:#7a6f5e;letter-spacing:.06em}',
    '#sz-card .sz-foot{margin-top:14px;font-size:12.5px;line-height:1.9;color:#7a6f5e}',
    '#sz-card .sz-foot b{color:#5b5147;font-weight:600}',
    '#sz-card .sz-warn{margin-top:10px;font-size:12px;color:#a12626;line-height:1.7}',
    '@media (max-width:420px){#sz-card td.sz-g,#sz-card td.sz-z{font-size:22px}}'
  ].join('');
  document.head.appendChild(s);
}

/* 時辰序 1-12 → 小時 */
function hourOf(h) {
  var i = (parseInt(h, 10) || 1) - 1;      // 0=子
  if (i === 0) return ZI_NEXT_DAY ? 23 : 0;
  return i * 2;
}

function safe(fn, dft) {
  try { var v = fn(); return (v === undefined || v === null || v === '') ? dft : v; }
  catch (e) { return dft; }
}

function build() {
  if (!window.PP || !PP.chart) return;
  var c = PP.chart;
  if (typeof Lunar === 'undefined') { render(null, '換算元件（lunar-javascript）沒有載入，四柱無法計算。'); return; }

  var ec, lun;
  try {
    lun = Lunar.fromYmdHms(c.ly, c.lm, c.ld, hourOf(c.h), 0, 0);
    ec = lun.getEightChar();
  } catch (e) {
    render(null, '四柱計算失敗：' + (e && e.message ? e.message : '未知錯誤'));
    return;
  }

  var pillars = [
    { lab: '年 柱', gz: safe(function(){return ec.getYear();}, ''),  ny: safe(function(){return ec.getYearNaYin();}, '') },
    { lab: '月 柱', gz: safe(function(){return ec.getMonth();}, ''), ny: safe(function(){return ec.getMonthNaYin();}, '') },
    { lab: '日 柱', gz: safe(function(){return ec.getDay();}, ''),   ny: safe(function(){return ec.getDayNaYin();}, '') },
    { lab: '時 柱', gz: safe(function(){return ec.getTime();}, ''),  ny: safe(function(){return ec.getTimeNaYin();}, '') }
  ];
  for (var i = 0; i < pillars.length; i++) {
    if (!pillars[i].gz || pillars[i].gz.length < 2) { render(null, '四柱資料不完整，請確認 lunar-javascript 版本。'); return; }
  }

  var kong = safe(function(){ return ec.getDayXunKong(); }, '');
  var xun  = safe(function(){ return ec.getDayXun(); }, '');

  render({ p: pillars, kong: kong, xun: xun, h: c.h, conv: c.conv }, '');
}

function render(data, warn) {
  var tp = document.getElementById('tp');
  if (!tp) return;
  var host = tp.parentNode;                       // 先天·後天 那張 .card
  while (host && host.className.indexOf('card') < 0) host = host.parentNode;
  if (!host || !host.parentNode) return;

  var card = document.getElementById('sz-card');
  if (!card) {
    card = document.createElement('div');
    card.className = 'card';
    card.id = 'sz-card';
    host.parentNode.insertBefore(card, host);     // 插在「先天·後天」前面
  }

  var h = '<h2>四 柱 八 字</h2>';

  if (data) {
    var p = data.p;
    h += '<table><tr>';
    for (var i = 0; i < 4; i++) h += '<th>' + p[i].lab + '</th>';
    h += '</tr><tr>';
    for (i = 0; i < 4; i++) {
      var g = p[i].gz.charAt(0);
      h += '<td class="sz-g" style="color:' + (WX_COLOR[GAN_WX[g]] || '#5d2c20') + '">' +
           g + '<small>' + (GAN_WX[g] || '') + '</small></td>';
    }
    h += '</tr><tr>';
    for (i = 0; i < 4; i++) {
      var z = p[i].gz.charAt(1);
      h += '<td class="sz-z" style="color:' + (WX_COLOR[ZHI_WX[z]] || '#5d2c20') + '">' +
           z + '<small>' + (ZHI_WX[z] || '') + '</small></td>';
    }
    h += '</tr><tr>';
    for (i = 0; i < 4; i++) h += '<td class="sz-ny">' + (p[i].ny || '—') + '</td>';
    h += '</tr></table>';

    h += '<div class="sz-foot">';
    h += '<b>日主</b>　' + p[2].gz.charAt(0) + '（' + (GAN_WX[p[2].gz.charAt(0)] || '') + '）';
    if (data.xun)  h += '　　<b>日柱旬</b>　' + data.xun;
    if (data.kong) h += '　　<b>旬空</b>　' + data.kong;
    h += '<br>時辰　' + (ZHI[(data.h || 1) - 1] || '') + '時' +
         (ZI_NEXT_DAY ? '（子時以晚子計，跨日）' : '') ;
    if (data.conv) h += '<br>' + data.conv;
    h += '</div>';
  }

  if (warn) h += '<div class="sz-warn">' + warn + '</div>';

  card.innerHTML = h;
}

function hook() {
  if (typeof window.drawPillars !== 'function') return setTimeout(hook, 200);
  if (window.drawPillars.__szWrapped) return;
  var orig = window.drawPillars;
  var wrapped = function () {
    orig.apply(this, arguments);
    try { css(); build(); }
    catch (e) { console.warn('[patch-sizhu] 產生失敗：', e && e.message); }
  };
  wrapped.__szWrapped = true;
  window.drawPillars = wrapped;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hook);
} else {
  hook();
}

})();
