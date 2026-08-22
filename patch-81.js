/* patch-81.js
   81數理象意 查詢卡片
   套用本頁既有樣式：.lab / input / .go / .duan / .jdu / table
   透過 PP.addStatic 掛載，固定顯示，不隨排盤結果變動
*/
(function(){
  if(!window.PP || !window.DATA81){
    console.warn('patch-81.js 需要 data-81.js 先載入');
    return;
  }

  function renderResult(n){
    const item = window.DATA81[n];
    if(!item) return '<div class="jdu">請輸入 1～81 之間的數字。</div>';
    const [name, luck, desc] = item;
    return ''
      + '<div class="duan">' + n + '　' + name + '　（' + luck + '）</div>'
      + '<div class="jdu">' + desc + '</div>';
  }

  function fullTable(){
    let t = '<table><tr><th>數</th><th>名稱</th><th>吉凶</th><th>象意</th></tr>';
    for(let i = 1; i <= 81; i++){
      const it = window.DATA81[i];
      t += '<tr><td class="n">' + i + '</td><td>' + it[0] + '</td><td>' + it[1] + '</td><td>' + it[2] + '</td></tr>';
    }
    t += '</table>';
    return t;
  }

  PP.addStatic('數 理 象 意', function(){
    return ''
      + '<div class="lab">輸入 數 字 查 詢（1～81）</div>'
      + '<div class="grid" style="grid-template-columns:1fr auto">'
      +   '<div><input id="n81" type="number" inputmode="numeric" min="1" max="81" placeholder="例：37"></div>'
      +   '<div><button class="go" id="go81" style="margin-top:0;height:48px;padding:0 22px">查</button></div>'
      + '</div>'
      + '<div id="out81" style="margin-top:18px"></div>'
      + '<div class="jie">'
      +   '<h3>1～81 全表</h3>'
      +   '<div class="scroll">' + fullTable() + '</div>'
      + '</div>';
  });

  // 掛載後綁定事件（addStatic 的 render 是同步塞進 DOM，掛完立即抓得到元素）
  setTimeout(function bind(){
    const btn = document.getElementById('go81');
    const inp = document.getElementById('n81');
    const out = document.getElementById('out81');
    if(!btn || !inp || !out){ setTimeout(bind, 300); return; }
    function doQuery(){
      let n = parseInt(inp.value, 10);
      if(!n || isNaN(n)) { out.innerHTML = '<div class="jdu">請輸入 1～81 之間的數字。</div>'; return; }
      n = ((n - 1) % 81 + 81) % 81 + 1; // 超過81自動取餘數歸位
      out.innerHTML = renderResult(n);
    }
    btn.addEventListener('click', doQuery);
    inp.addEventListener('keydown', e => { if(e.key === 'Enter') doQuery(); });
  }, 300);
})();
