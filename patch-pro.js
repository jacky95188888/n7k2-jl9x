/* 筠玲易數 · 專業版卦義 + 修正外掛
   ------------------------------------------------------------
   index.html 完全不用改，只要加一行：
     <script src="patch-pro.js"></script>
   放在 patch-zi.js 那一行的下面即可。

   本檔做四件事：
     A. 把「八星磁場查詢」按鈕搬進版面容器內（原本溢出到邊緣）
     B. 拿掉「尚未建置」裡已經做好的八星磁場那一列
     C. 補上日期驗證（2/30、4/31、年份超界）
     D. 專業版新增「卦義詳解」——各柱與各運段的斷曰與解讀
   ------------------------------------------------------------ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  /* ========== 樣式 ========== */
  function injectCSS() {
    if ($('pp-style')) return;
    var s = document.createElement('style');
    s.id = 'pp-style';
    s.textContent = [
      /* 次要工具入口：不跟「排盤」搶主色，改成描金外框 */
      '.tool-link{display:block;margin:26px 0 6px;padding:15px;text-align:center;',
      'text-decoration:none;background:#faf8f2;color:var(--zhu,#7d1d1d);',
      'border:1px solid var(--gold,#b78c39);font-family:var(--ser,serif);',
      'font-size:15px;letter-spacing:.28em;text-indent:.28em;}',
      '.tool-link small{display:block;margin-top:5px;font-size:11px;letter-spacing:.1em;',
      'text-indent:0;color:#85776c;}',
      '.tool-link:active{background:#f2ece0;}',

      /* 卦義詳解 */
      '.gx{margin-top:10px;border:1px solid #ddd2c0;background:#fffdf9;}',
      '.gx+.gx{margin-top:8px;}',
      '.gx>summary{padding:13px 14px;cursor:pointer;list-style:none;',
      'font-family:var(--ser,serif);font-size:14px;letter-spacing:.06em;color:#4d3728;}',
      '.gx>summary::-webkit-details-marker{display:none;}',
      '.gx>summary::after{content:"＋";float:right;color:#a08a64;font-size:13px;}',
      '.gx[open]>summary::after{content:"－";}',
      '.gx[open]>summary{border-bottom:1px solid #e6ddcf;background:#faf7f0;}',
      '.gx .gxin{padding:4px 14px 16px;}',
      '.gx b.gxn{display:block;margin:14px 0 8px;font-family:var(--ser,serif);',
      'font-size:14px;letter-spacing:.16em;color:var(--zhu,#7d1d1d);}',
      '.gx .duan{padding:16px 14px;font-size:16px;line-height:2.2;}',
      '.gx .jdu{margin-top:10px;padding:16px 14px;font-size:14px;}',
      '.gxnote{margin:0 0 14px;font-size:12.5px;line-height:1.9;color:#85776c;}',
      '.gxsub{margin:20px 0 8px;font-family:var(--ser,serif);font-size:13px;',
      'letter-spacing:.24em;color:#675848;}'
    ].join('');
    document.head.appendChild(s);
  }

  /* ========== A. 八星按鈕歸位 ========== */
  var TOOLS = {
    'bxcc.html': ['八星磁場查詢', '手機、車牌、門牌　兩數成一場'],
    'rz.html':   ['看　日　子',   '宜忌、方位、吉時、生肖']
  };
  function moveToolLink() {
    var wrap = document.querySelector('.wrap');
    var foot = wrap && wrap.querySelector('footer');
    if (!wrap || !foot) return;
    Object.keys(TOOLS).forEach(function (href) {
      var a = document.querySelector('a[href="' + href + '"]');
      if (!a) return;                       // 該頁還沒做就跳過
      a.removeAttribute('style');
      a.className = 'tool-link';
      a.innerHTML = TOOLS[href][0] + '<small>' + TOOLS[href][1] + '</small>';
      wrap.insertBefore(a, foot);
    });
  }

  /* ========== B. 清掉已完成的待辦列 ========== */
  function pruneTodo() {
    var card = document.querySelector('.card.todo');
    if (!card) return;
    var items = card.querySelectorAll('.tlist li');
    for (var i = 0; i < items.length; i++) {
      var b = items[i].querySelector('b');
      if (b && b.textContent.indexOf('八星磁場') >= 0) {
        items[i].parentNode.removeChild(items[i]);
      }
    }
    if (!card.querySelectorAll('.tlist li').length) card.style.display = 'none';
  }

  /* ========== C. 日期驗證 ========== */
  function realDate(y, m, d) {
    if (m < 1 || m > 12 || d < 1 || d > 31) return false;
    var probe = new Date(2000, m - 1, d);          // 用平年試月日組合
    if (probe.getMonth() !== m - 1) return false;   // 2/30、4/31 之類直接擋掉
    if (m === 2 && d === 29) {                      // 2/29 另外看該年是否閏年
      return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    }
    return true;
  }

  function guardDate() {
    var go = $('go');
    if (!go) return;
    // 用捕獲階段搶在原本的 click 之前檢查；不合格就中止，不讓錯誤日期進引擎
    go.addEventListener('click', function (e) {
      var calBtn = document.querySelector('#cal button[aria-pressed="true"]');
      var mode = calBtn ? calBtn.dataset.c : 'ad';
      var y = parseInt($('y').value, 10);
      var m = +$('m').value, d = +$('d').value;
      var msg = '';

      if (!y || isNaN(y)) {
        msg = '請輸入年份。';
      } else {
        var ad = (mode === 'roc') ? y + 1911 : y;
        if (ad < 1900 || ad > 2100) {
          msg = (mode === 'roc')
            ? '民國年請輸入 1 至 189 之間。'
            : '年份請輸入 1900 至 2100 之間。';
        } else if (mode !== 'lun' && !realDate(ad, m, d)) {
          msg = '這一天不存在（' + ad + ' 年 ' + m + ' 月沒有 ' + d + ' 日），請重新選擇。';
        } else if (mode === 'lun' && d > 30) {
          msg = '農曆日最大為 30。';
        }
      }

      if (msg) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if ($('err')) $('err').textContent = msg;
      }
    }, true);
  }

  /* ========== D. 專業版卦義詳解 ========== */
  function pairBlock(a, b) {
    var P = window.PP || {};
    var name = P.gname ? (P.gname(a, b) || '') : '';
    var g = P.gua ? P.gua(a, b) : null;
    var h = '<b class="gxn">' + a + ' - ' + b + '　' + (name || '（無對應卦）') + '</b>';
    if (!g) {
      h += '<div class="jdu">這一組沒有對應的卦義資料。</div>';
      return h;
    }
    if (g[2]) h += '<div class="duan">' + g[2] + '</div>';
    if (g[1]) h += '<div class="jdu">' + g[1] + '</div>';
    return h;
  }

  function guaSection() {
    var P = window.PP;
    if (!P) return '';
    var c = P.chart;
    if (!c) return '';

    var h = '<h2 style="margin-top:22px">卦 義 詳 解</h2>';

    if (!window.GUA169) {
      return h + '<div class="jdu">卦義資料檔（gua169.js）沒有載入，' +
             '請確認它與本頁放在同一層資料夾。</div>';
    }

    h += '<p class="gxnote">每一柱、每一運段各含前後兩卦。' +
         '斷曰為原文，詳細解讀供對照參考；實際論命仍以命理師判讀為準。</p>';

    /* 各柱 */
    h += '<div class="gxsub">各 柱</div>';
    (c.wins || []).forEach(function (w, i) {
      var lab = (c.lab && c.lab[i]) ? c.lab[i] : ('第' + (i + 1) + '柱');
      h += '<details class="gx"><summary>' + lab + '　' + w[0] + '-' + w[1] + '-' + w[2] +
           '　' + (P.gname(w[0], w[1]) || '') + '</summary><div class="gxin">' +
           pairBlock(w[0], w[1]) + pairBlock(w[1], w[2]) +
           '</div></details>';
    });

    /* 各運段 */
    var b = c.bounds || [], sg = c.segs || [], prev = 0;
    if (b.length) {
      h += '<div class="gxsub">各 運 段</div>';
      b.forEach(function (x, i) {
        var g = sg[i] || sg[sg.length - 1];
        if (!g) return;
        var age = (prev + (prev ? 0 : 1)) + '–' + (x - 1);
        prev = x;
        h += '<details class="gx"><summary>第 ' + (i + 1) + ' 運段　' + age + ' 歲　' +
             g[0] + '-' + g[1] + '-' + g[2] +
             '　' + (P.gname(g[0], g[1]) || '') + '</summary><div class="gxin">' +
             pairBlock(g[0], g[1]) + pairBlock(g[1], g[2]) +
             '</div></details>';
      });
    }
    return h;
  }

  function hookPro() {
    if (typeof window.drawPro !== 'function') return;
    if (window.drawPro.__ppWrapped) return;
    var orig = window.drawPro;
    var wrapped = function () {
      orig.apply(this, arguments);
      try {
        var box = $('proout');
        if (box) box.insertAdjacentHTML('beforeend', guaSection());
      } catch (err) {
        console.warn('[patch-pro] 卦義詳解產生失敗：', err && err.message);
      }
    };
    wrapped.__ppWrapped = true;
    window.drawPro = wrapped;
  }

  /* ========== 啟動 ========== */
  function boot() {
    injectCSS();
    moveToolLink();
    pruneTodo();
    guardDate();
    hookPro();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
