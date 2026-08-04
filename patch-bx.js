/* 筠玲易數 · 八星磁場（命盤版）
   ------------------------------------------------------------
   index.html 加一行即可：
     <script src="patch-bx.js"></script>
   放在 patch-pro.js 那一行下面。

   算法：數字 → 地支 → 八卦 → 八宅遊年
     1子 2丑 3寅 4卯 5辰 6巳 7午 8未 9申 10酉 11戌 12亥
     子坎　丑寅艮　卯震　辰巳巽　午離　未申坤　酉兌　戌亥乾
   磁場標在「相鄰兩數之間」，先天排一列、後天排一列。
   已用老師兩張排盤截圖驗算，14 組全中。
   ------------------------------------------------------------ */
(function () {
  'use strict';

  /* 數字 → 卦 */
  var ZHI = '子丑寅卯辰巳午未申酉戌亥';
  var Z2G = {
    '子': '坎', '丑': '艮', '寅': '艮', '卯': '震',
    '辰': '巽', '巳': '巽', '午': '離', '未': '坤',
    '申': '坤', '酉': '兌', '戌': '乾', '亥': '乾'
  };
  function gua(n) {
    n = Number(n);
    if (!(n >= 1 && n <= 12)) return null;
    return Z2G[ZHI.charAt(n - 1)];
  }
  function zhi(n) {
    n = Number(n);
    return (n >= 1 && n <= 12) ? ZHI.charAt(n - 1) : '';
  }

  /* 八宅遊年表 */
  var T = {};
  function put(a, b, s) { T[a + b] = s; T[b + a] = s; }
  '乾坤艮兌坎離震巽'.split('').forEach(function (g) { T[g + g] = '伏位'; });
  /* 西四卦（吉） */
  put('乾', '兌', '生氣'); put('乾', '艮', '天醫'); put('乾', '坤', '延年');
  put('坤', '艮', '生氣'); put('坤', '兌', '天醫'); put('艮', '兌', '延年');
  /* 東四卦（吉） */
  put('坎', '巽', '生氣'); put('坎', '震', '天醫'); put('坎', '離', '延年');
  put('離', '震', '生氣'); put('離', '巽', '天醫'); put('震', '巽', '延年');
  /* 東西相犯（凶） */
  put('乾', '巽', '禍害'); put('乾', '坎', '六煞'); put('乾', '震', '五鬼'); put('乾', '離', '絕命');
  put('坤', '震', '禍害'); put('坤', '離', '六煞'); put('坤', '巽', '五鬼'); put('坤', '坎', '絕命');
  put('艮', '離', '禍害'); put('艮', '震', '六煞'); put('艮', '坎', '五鬼'); put('艮', '巽', '絕命');
  put('兌', '坎', '禍害'); put('兌', '巽', '六煞'); put('兌', '離', '五鬼'); put('兌', '震', '絕命');

  function star(a, b) {
    var ga = gua(a), gb = gua(b);
    if (!ga || !gb) return null;
    return T[ga + gb] || null;
  }

  var JI = { '生氣': 1, '延年': 1, '天醫': 1, '伏位': 1 };
  var MEAN = {
    '生氣': '貴人、機會、活力', '延年': '領導、專業、守成',
    '天醫': '財富、健康、貴人', '伏位': '穩定、蓄勢、耐久',
    '禍害': '口舌、是非、爭執', '六煞': '桃花、情緒、牽絆',
    '五鬼': '機變、小人、起伏', '絕命': '極端、衝勁、成敗兩極'
  };

  /* ---------- 樣式 ---------- */
  function css() {
    if (document.getElementById('bx-style')) return;
    var s = document.createElement('style');
    s.id = 'bx-style';
    s.textContent = [
      '.bxwrap{overflow-x:auto;-webkit-overflow-scrolling:touch;padding:4px 0 2px;}',
      '.bxgrid{display:grid;justify-content:center;align-items:center;',
      'row-gap:6px;min-width:min-content;margin:0 auto;}',
      '.bxn{font-family:var(--ser,serif);font-size:21px;font-weight:700;',
      'text-align:center;padding:0 6px;color:#5d2c20;white-space:nowrap;}',
      '.bxn.h{color:#6d6156;font-size:19px;}',
      '.bxs{font-family:var(--ser,serif);font-size:11.5px;letter-spacing:.04em;',
      'text-align:center;padding:0 3px;white-space:nowrap;}',
      '.bxs.ji{color:#2f6b4f;}',
      '.bxs.xiong{color:var(--zhu,#7d1d1d);}',
      '.bxrow{font-family:var(--ser,serif);font-size:10.5px;color:#9a8d7d;',
      'text-align:right;padding-right:8px;white-space:nowrap;}',
      '.bxlab{font-family:var(--ser,serif);font-size:10px;color:#9a8d7d;',
      'text-align:center;padding-top:2px;white-space:nowrap;}',
      '.bxtally{margin-top:16px;padding-top:14px;border-top:1px solid #e6ddcf;',
      'font-size:13px;line-height:1.9;color:#5b5147;}',
      '.bxtally b{color:var(--zhu,#7d1d1d);}',
      '.bxnote{margin-top:10px;font-size:12px;line-height:1.85;color:#85776c;}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ---------- 產生面板 ---------- */
  function panel(c) {
    css();
    var r = (c && c.ring) || [];
    var lab = (c && c.lab) || [];
    if (r.length < 2) return '';

    var P = window.PP || {};
    var hou = P.hou || function (n) { return n > 6 ? n - 6 : n + 6; };
    var xian = r.slice();
    var hend = r.map(hou);

    var n = xian.length;
    var cols = 2 * n - 1;                 // 數字與磁場交錯
    var h = '<div class="bxwrap"><div class="bxgrid" style="grid-template-columns:auto repeat(' + cols + ',auto)">';

    function starRow(arr, tag) {
      var out = '<div class="bxrow">' + tag + '</div>';
      for (var i = 0; i < n; i++) {
        out += '<div></div>';             // 數字位置留空
        if (i < n - 1) {
          var s = star(arr[i], arr[i + 1]);
          out += s
            ? '<div class="bxs ' + (JI[s] ? 'ji' : 'xiong') + '">' + s + '</div>'
            : '<div class="bxs">—</div>';
        }
      }
      return out;
    }
    function numRow(arr, tag, cls) {
      var out = '<div class="bxrow">' + tag + '</div>';
      for (var i = 0; i < n; i++) {
        out += '<div class="bxn' + (cls ? ' ' + cls : '') + '">' + arr[i] + '</div>';
        if (i < n - 1) out += '<div></div>';
      }
      return out;
    }
    function labRow() {
      var out = '<div class="bxrow"></div>';
      for (var i = 0; i < n; i++) {
        out += '<div class="bxlab">' + (lab[i] || '') + '</div>';
        if (i < n - 1) out += '<div></div>';
      }
      return out;
    }

    h += starRow(xian, '磁場');
    h += numRow(xian, '先天');
    h += numRow(hend, '後天', 'h');
    h += starRow(hend, '磁場');
    h += labRow();
    h += '</div></div>';

    /* 統計 */
    var all = [], i;
    for (i = 0; i < n - 1; i++) {
      var a = star(xian[i], xian[i + 1]); if (a) all.push(a);
      var b = star(hend[i], hend[i + 1]); if (b) all.push(b);
    }
    if (all.length) {
      var cnt = {}, ji = 0;
      all.forEach(function (s) { cnt[s] = (cnt[s] || 0) + 1; if (JI[s]) ji++; });
      var names = Object.keys(cnt).sort(function (x, y) { return cnt[y] - cnt[x]; });
      var top = names[0];
      h += '<div class="bxtally">共 <b>' + all.length + '</b> 組：吉星 <b>' + ji +
           '</b>、凶星 <b>' + (all.length - ji) + '</b>。主導磁場 <b>' + top +
           '</b>（' + cnt[top] + ' 組）——' + (MEAN[top] || '') + '。</div>';
    }

    /* 地支對照，方便老師核對 */
    var pairs = [];
    for (i = 0; i < n; i++) {
      var z = zhi(xian[i]);
      if (z) pairs.push(xian[i] + z + gua(xian[i]));
    }
    h += '<div class="bxnote">取數方式：數字轉地支、地支配卦，兩卦以八宅遊年取星，磁場標在相鄰兩數中間。<br>' +
         '本盤先天：' + pairs.join('　') + '</div>';

    return h;
  }

  function boot() {
    var P = window.PP;
    if (!P || typeof P.add !== 'function') {
      return setTimeout(boot, 200);       // 主程式還沒載完就等一下
    }
    P.add('八 星 磁 場', panel);
  }
  boot();
})();
