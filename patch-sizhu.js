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
/* 地支轉數字（子1 … 亥12），與網站其他區塊一致 */
function zhiNum(s) {
  var o = [];
  for (var i = 0; i < s.length; i++) {
    var k = ZHI.indexOf(s.charAt(i));
    if (k > -1) o.push(k + 1);
  }
  return o.join('、');
}

function css() {
  if (document.getElementById('sz-style')) return;
  var s = document.createElement('style');
  s.id = 'sz-style';
  s.textContent = [
    '#sz-card table{table-layout:fixed}',
    '#sz-card td.szg,#sz-card td.szz{font-family:var(--ser);font-size:26px;font-weight:700;line-height:1.25;padding:10px 4px}',
    '#sz-card td.szz{padding-top:0}',
    '#sz-card td.szg small,#sz-card td.szz small{display:block;font-size:10px;font-weight:400;letter-spacing:.1em;color:#9c8b74;margin-top:2px}',
    '#sz-card td.szny{font-size:12px;color:#7a6f5e;letter-spacing:.06em}',
    '#sz-card .szfoot{margin-top:14px;font-size:12.5px;line-height:1.9;color:#7a6f5e}',
    '#sz-card .szfoot b{color:#5b5147;font-weight:600}',
    '#sz-card .szwarn{margin-top:10px;padding:10px 12px;border:1px solid var(--zhu);background:#fdf6f5;font-size:13px;color:var(--zhu);line-height:1.7}',
    '@media (max-width:420px){#sz-card td.szg,#sz-card td.szz{font-size:22px}}'
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
    ec = Lunar.fromYmdHms(c.ly, c.lm, c.ld, hourOf(c.h), 0, 0).getEightChar();
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

  return {
    p: p,
    xun:  safe(function(){ return ec.getDayXun(); }, ''),
    kong: safe(function(){ return ec.getDayXunKong(); }, ''),
    h: c.h, conv: c.conv
  };
}

function draw() {
  var d = build();
  if (!d) return;

  var card = document.getElementById('sz-card');
  if (!card) {
    card = document.createElement('div');
    card.className = 'card';
    card.id = 'sz-card';
    var anchor = findAnchor();
    var out = document.getElementById('out');
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(card, anchor);
    } else if (out && out.firstChild) {
      out.insertBefore(card, out.firstChild);
    } else if (out) {
      out.appendChild(card);
    } else {
      return;
    }
  }

  var h = '<h2>四 柱 八 字</h2>', i, g, z;

  if (d.p) {
    h += '<table><tr>';
    for (i = 0; i < 4; i++) h += '<th>' + d.p[i].lab + '</th>';
    h += '</tr><tr>';
    for (i = 0; i < 4; i++) {
      g = d.p[i].gz.charAt(0);
      h += '<td class="szg" style="color:' + (COL[GAN_WX[g]] || '#5d2c20') + '">' + g +
           '<small>' + (GAN_WX[g] || '') + '</small></td>';
    }
    h += '</tr><tr>';
    for (i = 0; i < 4; i++) {
      z = d.p[i].gz.charAt(1);
      h += '<td class="szz" style="color:' + (COL[ZHI_WX[z]] || '#5d2c20') + '">' + z +
           '<small>' + (ZHI_WX[z] || '') + '</small></td>';
    }
    h += '</tr><tr>';
    for (i = 0; i < 4; i++) h += '<td class="szny">' + (d.p[i].ny || '—') + '</td>';
    h += '</tr></table>';

    h += '<div class="szfoot"><b>日主</b>　' + d.p[2].gz.charAt(0) +
         '（' + (GAN_WX[d.p[2].gz.charAt(0)] || '') + '）';
    if (d.xun)  h += '　　<b>日柱旬</b>　' + d.xun;
    if (d.kong) {
      var kn = zhiNum(d.kong);
      h += '　　<b>旬空</b>　' + d.kong + (kn ? '（' + kn + '）' : '');
    }
    h += '<br>時辰　' + (ZHI[(d.h || 1) - 1] || '') + '時' +
         (ZI_NEXT_DAY ? '（子時以晚子計，跨日）' : '');
    if (d.conv) h += '<br>' + d.conv;
    h += '</div>';
  }

  if (d.warn) h += '<div class="szwarn">' + d.warn + '</div>';

  card.innerHTML = h;
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
