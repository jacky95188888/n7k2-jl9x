/* ============================================
   筠玲數字 · 外掛：萬物類象 + 六親對照
   需搭配 data-leixiang.js
   ============================================ */
(function () {

  var FIELDS = [
    ['八卦', '八卦含義'], ['五行', '五行'], ['陰陽', '陰陽屬性'],
    ['方位', '方位'], ['天時', '天時'], ['顏色', '顏色'],
    ['人物', '人物'], ['人體', '在人體上的像意'], ['經絡', '經絡'],
    ['動靜物', '在動物靜物上的像意'], ['職業', '對應的職業'],
    ['萬物定向', '萬物定向'], ['星體', '星座星體'], ['五角漢字', '五角漢字']
  ];

  var TALK = [
    ['月看性格', '月看性格'], ['磁力性格', '磁力性格'],
    ['時辰性格', '時辰性格'], ['生肖性格', '生肖性格']
  ];

  var pick = 0;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  }

  PP.add('萬 物 類 象', function (c) {
    var L = window.LEIXIANG;
    if (!L) return '<div class="jdu">類象資料檔沒有載入。請確認 data-leixiang.js 與本頁放在同一層資料夾。</div>';

    if (pick >= c.ring.length) pick = 0;

    var h = '<div class="tabs" id="lxtab">';
    c.ring.forEach(function (n, i) {
      h += '<button data-i="' + i + '" aria-pressed="' + (i === pick) + '">' +
           c.lab[i] + ' ' + n + '</button>';
    });
    h += '</div>';

    var num = c.ring[pick];
    var d = L[String(num)];
    if (!d) return h + '<div class="jdu">數字 ' + num + ' 沒有類象資料。</div>';

    h += '<div class="read"><div class="gt">' + num + '</div>' +
         '<div class="gn">' + esc(d['八卦'] || '') + '</div></div>';

    h += '<table>';
    FIELDS.forEach(function (f) {
      var v = d[f[1]];
      if (!v) return;
      h += '<tr><th style="text-align:right;white-space:nowrap;padding-right:8px;vertical-align:top">' +
           f[0] + '</th><td style="text-align:left;line-height:1.7">' + esc(v) + '</td></tr>';
    });
    h += '</table>';

    var extra = '';
    TALK.forEach(function (f) {
      var v = d[f[1]];
      if (!v) return;
      extra += '<h3 style="font-family:var(--ser);font-size:12px;letter-spacing:.2em;' +
               'color:var(--zhu);margin:14px 0 6px">' + f[0] + '</h3>' +
               '<div class="jdu" style="margin-top:0">' + esc(v) + '</div>';
    });
    if (extra) h += '<div class="jie">' + extra + '</div>';

    setTimeout(function () {
      var t = document.getElementById('lxtab');
      if (!t) return;
      t.querySelectorAll('button').forEach(function (b) {
        b.addEventListener('click', function () {
          pick = +b.dataset.i;
          if (window.PP && PP.refresh) PP.refresh();
        });
      });
    }, 0);

    return h;
  });

  PP.add('六 親 對 照', function (c) {
    var Q = window.LIUQIN;
    if (!Q) return '<div class="jdu">六親資料檔沒有載入。</div>';

    var sex = (c.sex === '女') ? '女' : '男';
    var yue = c.slots[1];
    var tbl = Q[sex] && Q[sex][String(yue)];
    if (!tbl) return '<div class="jdu">找不到本命月 ' + yue + ' 的六親對照。</div>';

    var inChart = {};
    c.ring.forEach(function (n, i) { inChart[n] = (inChart[n] || []).concat(c.lab[i]); });

    var h = '<div class="jdu" style="margin-top:0">依 ' + sex +
            '命、本命月 ' + yue + ' 取六親。盤中出現的數字以底色標示。</div>';
    h += '<table><tr><th>數字</th><th>六親</th><th>盤中位置</th></tr>';
    for (var n = 1; n <= 12; n++) {
      var hit = inChart[n];
      var bg = hit ? ' style="background:#DFD8C4"' : '';
      h += '<tr' + bg + '><td class="n">' + n + '</td>' +
           '<td>' + esc(tbl[String(n)] || '—') + '</td>' +
           '<td>' + (hit ? hit.join('、') : '') + '</td></tr>';
    }
    h += '</table>';
    return h;
  });

})();
