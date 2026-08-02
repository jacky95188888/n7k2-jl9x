/* ============================================
   筠玲數字 · 外掛：五行能量 + 陰陽屬性
   --------------------------------------------
   放在 index.html 同一層資料夾即可，主檔不用改。
   ============================================ */
(function () {

  // 數字 → 五行權重（來源：老師 Excel wuxing 表）
  // 順序：木 火 土 金 水
  var WX = {
    1:  [0,   0,   0,   0,   1  ],
    2:  [0,   0,   0.3, 0.4, 0.3],
    3:  [0.4, 0.3, 0.3, 0,   0  ],
    4:  [1,   0,   0,   0,   0  ],
    5:  [0.3, 0,   0.3, 0,   0.4],
    6:  [0,   0.3, 0.3, 0.4, 0  ],
    7:  [0,   1,   0,   0,   0  ],
    8:  [0.4, 0.3, 0.3, 0,   0  ],
    9:  [0,   0.3, 0.3, 0.4, 0  ],
    10: [0,   0,   0,   1,   0  ],
    11: [0,   0.4, 0.3, 0.3, 0  ],
    12: [0.5, 0,   0,   0,   0.5]
  };

  var YY = {
    1:'陽中陽', 2:'陽中陰', 3:'陽中陽', 4:'陽中陰',
    5:'陰中陽', 6:'陰，即陽又陰', 7:'陰中陽', 8:'陰中陰',
    9:'陰中陽', 10:'陰中陰', 11:'陽中陽', 12:'陽中陰'
  };

  var NAME = ['木', '火', '土', '金', '水'];
  var COLOR = ['#4B7A52', '#A82F2A', '#B58A2B', '#7A7F86', '#35586B'];

  function bar(pct, color) {
    return '<div style="height:9px;background:#DED9CC;overflow:hidden">' +
           '<div style="height:9px;width:' + pct + '%;background:' + color + '"></div></div>';
  }

  PP.add('五 行 能 量', function (c) {
    var sum = [0, 0, 0, 0, 0];
    c.ring.forEach(function (n) {
      var w = WX[n];
      if (w) for (var i = 0; i < 5; i++) sum[i] += w[i];
    });

    var total = sum.reduce(function (a, b) { return a + b; }, 0);
    if (total === 0) return '<div class="jdu">此盤無可計算的五行資料。</div>';
    var ideal = total / 5;
    var max = Math.max.apply(null, sum);

    var h = '<table><tr><th>五行</th><th>含量</th><th>比例</th><th></th><th>對照</th></tr>';
    for (var i = 0; i < 5; i++) {
      var pct = sum[i] / total * 100;
      var diff = sum[i] - ideal;
      var mark = Math.abs(diff) < 0.15 ? '平'
               : (diff > 0 ? '旺 +' + diff.toFixed(1) : '弱 ' + diff.toFixed(1));
      h += '<tr><td class="n" style="color:' + COLOR[i] + '">' + NAME[i] + '</td>' +
           '<td>' + sum[i].toFixed(1) + '</td>' +
           '<td>' + pct.toFixed(0) + '%</td>' +
           '<td style="width:34%">' + bar(sum[i] / max * 100, COLOR[i]) + '</td>' +
           '<td>' + mark + '</td></tr>';
    }
    h += '</table>';
    h += '<div class="jdu" style="margin-top:10px">總量 ' + total.toFixed(1) +
         '，理想值每行 ' + ideal.toFixed(1) +
         '。高於理想值為旺，低於為弱，相差不到 0.15 視為平。</div>';

    var zero = [];
    for (var k = 0; k < 5; k++) if (sum[k] === 0) zero.push(NAME[k]);
    if (zero.length) {
      h += '<div class="jdu" style="color:var(--zhu)">此盤缺 ' + zero.join('、') + '。</div>';
    }
    return h;
  });

  PP.add('陰 陽 屬 性', function (c) {
    var h = '<table><tr><th>柱</th><th>先天</th><th>屬性</th><th>後天</th><th>屬性</th></tr>';
    c.ring.forEach(function (n, i) {
      var hn = PP.hou(n);
      h += '<tr><td>' + c.lab[i] + '</td>' +
           '<td class="n">' + n + '</td><td>' + (YY[n] || '—') + '</td>' +
           '<td class="n">' + hn + '</td><td>' + (YY[hn] || '—') + '</td></tr>';
    });
    return h + '</table>';
  });

})();
