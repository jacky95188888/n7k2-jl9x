/* ============================================
   筠玲數字 · 外掛：五角漢字查字
   輸入一個字，反查它屬於哪個數字。
   需搭配 data-leixiang.js
   ============================================ */
(function () {

  var BUSHOU = {
    1:  '訁 言 子',
    2:  '氵 冫（水旁、冰旁）',
    3:  '走 辶 山',
    4:  '木',
    5:  '艸 艹 禾（草花禾苗）',
    6:  '日 火',
    7:  '電 馬 心',
    8:  '田 土',
    9:  '土 丘 阝（坤、嶺）',
    10: '钅 刂 忄 亻 扌 戈 犬 十',
    11: '钅 刂 忄 亻 扌 戈 犬 十',
    12: '宀 彳 人'
  };

  var index = null;
  var result = null;
  var lastQ = '';

  function build() {
    var L = window.LEIXIANG;
    if (!L) return null;
    var idx = {};
    for (var k in L) {
      var s = L[k]['五角漢字'];
      if (!s) continue;
      for (var i = 0; i < s.length; i++) {
        var ch = s.charAt(i);
        var code = ch.charCodeAt(0);
        if (code < 0x4e00 || code > 0x9fff) continue;
        if (!idx[ch]) idx[ch] = [];
        if (idx[ch].indexOf(+k) < 0) idx[ch].push(+k);
      }
    }
    return idx;
  }

  function query(q) {
    if (!index) index = build();
    if (!index) return;
    lastQ = q;
    var chars = [];
    for (var i = 0; i < q.length; i++) {
      var ch = q.charAt(i);
      var c = ch.charCodeAt(0);
      if (c >= 0x4e00 && c <= 0x9fff) chars.push(ch);
    }
    result = chars.map(function (ch) {
      return { ch: ch, nums: (index[ch] || []).sort(function (a, b) { return a - b; }) };
    });
    PP.refresh();
  }

  PP.addStatic('五 角 漢 字 · 查 字', function () {
    var L = window.LEIXIANG;
    if (!L) return '<div class="jdu">類象資料檔沒有載入。</div>';
    if (!index) index = build();

    var h = '<div class="lock"><input id="ziq" type="text" placeholder="輸入姓名或字，例如 李錢楊"' +
            ' value="' + (lastQ || '') + '" autocomplete="off">' +
            '<button id="zigo">查字</button></div>';

    if (result && result.length) {
      h += '<table style="margin-top:14px"><tr><th>字</th><th>數字</th><th>八卦</th><th>五行</th></tr>';
      result.forEach(function (r) {
        if (!r.nums.length) {
          h += '<tr><td class="n">' + r.ch + '</td>' +
               '<td colspan="3" style="color:var(--ink2);font-size:12px">' +
               '字表中沒有，請看下方部首對照自行判斷</td></tr>';
          return;
        }
        r.nums.forEach(function (n, i) {
          var d = L[String(n)] || {};
          h += '<tr>' + (i === 0
                 ? '<td class="n" rowspan="' + r.nums.length + '">' + r.ch + '</td>'
                 : '') +
               '<td class="n">' + n + '</td>' +
               '<td style="font-size:12px">' + (d['八卦'] || '') + '</td>' +
               '<td style="font-size:12px">' + (d['五行'] || '') + '</td></tr>';
        });
      });
      h += '</table>';
      h += '<div class="jdu">一個字對到多個數字是正常的，' +
           '因為部首與字義可能同時指向不同卦。取名時看整體搭配，不是只看單字。</div>';
    } else {
      h += '<div class="jdu" style="margin-top:12px">' +
           '字表收錄 ' + Object.keys(index || {}).length +
           ' 個常用字與部首。查不到的字，可對照下方部首判斷。</div>';
    }

    h += '<div class="jie"><h3>部 首 對 照</h3><table>';
    for (var n = 1; n <= 12; n++) {
      var d = L[String(n)] || {};
      h += '<tr><td class="n">' + n + '</td>' +
           '<td style="text-align:left;font-size:13px">' + (BUSHOU[n] || '') + '</td>' +
           '<td style="font-size:11px;color:var(--ink2)">' + (d['五行'] || '') + '</td></tr>';
    }
    h += '</table></div>';

    setTimeout(function () {
      var b = document.getElementById('zigo');
      var q = document.getElementById('ziq');
      if (!b || !q) return;
      b.addEventListener('click', function () { query(q.value.trim()); });
      q.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') query(q.value.trim());
      });
    }, 0);

    return h;
  });

})();
