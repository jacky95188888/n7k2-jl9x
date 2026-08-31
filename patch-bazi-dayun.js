(function(){
  'use strict';

  const STEMS='甲乙丙丁戊己庚辛壬癸';
  const HOUR_MID=[0,2,4,6,8,10,12,14,16,18,20,22];
  const esc=s=>String(s==null?'':s).replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]));

  function tenGod(dayGan,targetGan){
    const d=STEMS.indexOf(dayGan),t=STEMS.indexOf(targetGan);
    if(d<0||t<0)return '';
    const de=Math.floor(d/2),te=Math.floor(t/2),same=(d%2)===(t%2);
    if(de===te)return same?'比肩':'劫財';
    if((te+1)%5===de)return same?'偏印':'正印';
    if((de+1)%5===te)return same?'食神':'傷官';
    if((de+2)%5===te)return same?'偏財':'正財';
    if((te+2)%5===de)return same?'七殺':'正官';
    return '';
  }

  function getBazi(chart){
    if(!chart||typeof Solar==='undefined')return null;
    const hour=HOUR_MID[Math.max(0,Math.min(11,(+chart.h||1)-1))];
    const solar=Solar.fromYmdHms(+chart.sy,+chart.sm,+chart.sd,hour,0,0);
    const lunar=solar.getLunar();
    const ec=lunar.getEightChar();
    const gender=chart.sex==='女'?0:1;
    const yun=ec.getYun(gender);
    return {solar,lunar,ec,yun,hour,chart};
  }

  function pillar(ec,key,label){
    const gz=ec['get'+key]();
    const gan=gz.charAt(0),zhi=gz.charAt(1);
    const ssGan=ec['get'+key+'ShiShenGan']();
    const ssZhi=ec['get'+key+'ShiShenZhi']();
    const hide=ec['get'+key+'HideGan']();
    const hidden=hide.map((g,i)=>esc(g)+(ssZhi[i]?' <small>'+esc(ssZhi[i])+'</small>':'')).join('<br>');
    return '<article class="bzy-pillar">'
      +'<b>'+label+'</b><span class="bzy-ss">'+esc(ssGan)+'</span>'
      +'<strong><i>'+esc(gan)+'</i><i>'+esc(zhi)+'</i></strong>'
      +'<span class="bzy-hide">'+hidden+'</span>'
      +'<span>'+esc(ec['get'+key+'DiShi']())+'</span>'
      +'<small>'+esc(ec['get'+key+'NaYin']())+'</small>'
      +'</article>';
  }

  function flowHtml(data,index){
    const dayGan=data.ec.getDayGan();
    const all=data.yun.getDaYun(10);
    const dy=all[index]||all[1];
    if(!dy)return '<p class="bzy-empty">尚無流年資料。</p>';
    const title=(dy.getGanZhi()||'童限')+'大運｜'+dy.getStartAge()+'–'+dy.getEndAge()+'歲';
    return '<div class="bzy-flow-head"><b>'+esc(title)+'</b><span>'+dy.getStartYear()+'–'+dy.getEndYear()+'</span></div>'
      +'<div class="bzy-flow-grid">'+dy.getLiuNian().map(ln=>{
        const gz=ln.getGanZhi();
        return '<div><small>'+ln.getYear()+'</small><strong>'+esc(gz)+'</strong><span>'+ln.getAge()+'歲</span><em>'+esc(tenGod(dayGan,gz.charAt(0)))+'</em></div>';
      }).join('')+'</div>';
  }

  function render(chart){
    try{
      const d=getBazi(chart);
      if(!d)return '<div class="jdu">八字換算元件尚未載入，請重新整理後再排盤。</div>';
      const ec=d.ec,yun=d.yun,dayGan=ec.getDayGan();
      const all=yun.getDaYun(10),dayun=all.slice(1,9);
      const currentYear=new Date().getFullYear();
      let active=dayun.findIndex(x=>currentYear>=x.getStartYear()&&currentYear<=x.getEndYear());
      if(active<0)active=0;
      const activeIndex=active+1;
      const start=yun.getStartSolar();
      const startText=yun.getStartYear()+'年'+yun.getStartMonth()+'個月'+yun.getStartDay()+'天後起運';

      return '<section class="bzy-wrap" data-bzy-active="'+activeIndex+'">'
        +'<div class="bzy-note"><b>傳統八字四柱</b><span>依節氣排月柱；時柱依所選時辰換算</span></div>'
        +'<div class="bzy-pillars">'
          +pillar(ec,'Year','年柱')+pillar(ec,'Month','月柱')+pillar(ec,'Day','日柱')+pillar(ec,'Time','時柱')
        +'</div>'
        +'<div class="bzy-start">'
          +'<div><small>起運</small><b>'+esc(startText)+'</b></div>'
          +'<div><small>交運日期</small><b>'+start.getYear()+'年'+start.getMonth()+'月'+start.getDay()+'日</b></div>'
          +'<div><small>行運方向</small><b>'+(yun.isForward()?'順行':'逆行')+'</b></div>'
        +'</div>'
        +'<h3 class="bzy-subtitle">十年大運</h3>'
        +'<p class="bzy-help">左右滑動查看全部大運；點選任一大運，下方會顯示該十年的流年。</p>'
        +'<div class="bzy-dayun-scroll"><div class="bzy-dayun">'
          +dayun.map((dy,i)=>{
            const gz=dy.getGanZhi();
            const on=(i+1)===activeIndex?' is-active':'';
            return '<button type="button" class="bzy-dayun-item'+on+'" data-bzy-index="'+(i+1)+'">'
              +'<small>'+dy.getStartAge()+'–'+dy.getEndAge()+'歲</small>'
              +'<span>'+dy.getStartYear()+'–'+dy.getEndYear()+'</span>'
              +'<strong>'+esc(gz)+'</strong><em>'+esc(tenGod(dayGan,gz.charAt(0)))+'</em>'
              +'</button>';
          }).join('')
        +'</div></div>'
        +'<h3 class="bzy-subtitle">大運流年</h3>'
        +'<div class="bzy-flow" id="bzy-flow">'+flowHtml(d,activeIndex)+'</div>'
        +'<p class="bzy-disclaimer">本區為排盤資料展示；大運、流年吉凶仍需配合原局強弱、喜忌與刑沖合害綜合判讀。</p>'
      +'</section>';
    }catch(err){
      return '<div class="jdu">八字大運暫時無法顯示：'+esc(err&&err.message?err.message:err)+'</div>';
    }
  }

  function installStyle(){
    if(document.getElementById('bzy-style'))return;
    const s=document.createElement('style');
    s.id='bzy-style';
    s.textContent=`
      .bzy-wrap{color:#3e293e}.bzy-note{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:14px;padding:12px 14px;border:1px solid #ead3a0;border-radius:14px;background:linear-gradient(110deg,#fffaf0,#fff4fd)}
      .bzy-note b{color:#641174;font-family:var(--ser);font-size:15px}.bzy-note span{color:#7d6c78;font-size:11px;text-align:right}
      .bzy-pillars{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid #d9bedc;border-radius:18px;overflow:hidden;background:#fff}
      .bzy-pillar{min-width:0;padding:10px 4px;text-align:center;border-right:1px solid #eadbeb;background:linear-gradient(180deg,#fff,#fff9ff)}.bzy-pillar:last-child{border-right:0}
      .bzy-pillar>b{display:block;color:#6a5b67;font-size:12px}.bzy-pillar .bzy-ss{display:block;min-height:22px;color:#a15d22;font-size:11px}
      .bzy-pillar strong{display:flex;flex-direction:column;margin:3px 0 7px;font-family:var(--ser);font-size:29px;line-height:1.25}.bzy-pillar strong i{font-style:normal}.bzy-pillar strong i:first-child{color:#681078}.bzy-pillar strong i:last-child{color:#b53862}
      .bzy-pillar .bzy-hide{display:block;min-height:68px;padding-top:7px;border-top:1px dashed #e2d3df;color:#5c4e58;font-size:11px;line-height:1.55}.bzy-hide small{color:#987b8f;font-size:9px}
      .bzy-pillar>span:not(.bzy-ss):not(.bzy-hide){display:block;margin-top:6px;color:#8a6220;font-size:11px}.bzy-pillar>small{display:block;margin-top:4px;color:#8a7d86;font-size:9px}
      .bzy-start{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:12px 0}.bzy-start>div{padding:10px;border:1px solid #eadbc2;border-radius:12px;background:#fffaf3}.bzy-start small{display:block;color:#927c85;font-size:9px}.bzy-start b{display:block;margin-top:3px;color:#5b244f;font-size:11px;line-height:1.5}
      .bzy-subtitle{margin:18px 0 4px;color:#681078;font-family:var(--ser);font-size:16px;letter-spacing:.14em}.bzy-help{margin:0 0 8px;color:#897985;font-size:10px}
      .bzy-dayun-scroll{overflow-x:auto;padding-bottom:6px;-webkit-overflow-scrolling:touch}.bzy-dayun{display:grid;grid-template-columns:repeat(8,92px);gap:7px;min-width:max-content}
      .bzy-dayun-item{min-height:126px;padding:8px 5px;border:1px solid #ddc9dd;border-radius:13px;background:linear-gradient(180deg,#fff,#fbf3fb);color:#5d4b59;text-align:center;cursor:pointer}.bzy-dayun-item small,.bzy-dayun-item span{display:block;font-size:9px}.bzy-dayun-item span{margin-top:3px;color:#9a8794}.bzy-dayun-item strong{display:block;margin:7px 0 4px;color:#651077;font-family:var(--ser);font-size:24px;letter-spacing:.08em}.bzy-dayun-item em{color:#aa642c;font-size:10px;font-style:normal}.bzy-dayun-item.is-active{border-color:#c69a32;background:linear-gradient(180deg,#fff8dd,#fff0f9);box-shadow:inset 0 0 0 1px #e2bb58,0 7px 18px #6b116b1f}
      .bzy-flow{border:1px solid #dfcce0;border-radius:15px;overflow:hidden;background:#fff}.bzy-flow-head{display:flex;justify-content:space-between;gap:8px;padding:10px 12px;background:linear-gradient(90deg,#681078,#9a267e);color:#fff}.bzy-flow-head b{font-size:12px}.bzy-flow-head span{font-size:10px}
      .bzy-flow-grid{display:grid;grid-template-columns:repeat(5,1fr)}.bzy-flow-grid>div{padding:9px 3px;text-align:center;border-right:1px solid #eee0ec;border-bottom:1px solid #eee0ec}.bzy-flow-grid>div:nth-child(5n){border-right:0}.bzy-flow-grid>div:nth-last-child(-n+5){border-bottom:0}.bzy-flow-grid small,.bzy-flow-grid span,.bzy-flow-grid em{display:block;font-size:9px}.bzy-flow-grid strong{display:block;margin:2px 0;color:#71117e;font-family:var(--ser);font-size:18px}.bzy-flow-grid span{color:#766672}.bzy-flow-grid em{color:#ad652d;font-style:normal}
      .bzy-disclaimer{margin:12px 2px 0;color:#8c7e88;font-size:10px;line-height:1.7}
      @media(max-width:430px){.bzy-note{align-items:flex-start;flex-direction:column}.bzy-note span{text-align:left}.bzy-pillar strong{font-size:25px}.bzy-start{grid-template-columns:1fr}.bzy-flow-grid{grid-template-columns:repeat(2,1fr)}.bzy-flow-grid>div,.bzy-flow-grid>div:nth-child(5n),.bzy-flow-grid>div:nth-last-child(-n+5){border-right:1px solid #eee0ec;border-bottom:1px solid #eee0ec}.bzy-flow-grid>div:nth-child(2n){border-right:0}.bzy-flow-grid>div:nth-last-child(-n+2){border-bottom:0}}
    `;
    document.head.appendChild(s);
  }

  document.addEventListener('click',function(e){
    const btn=e.target.closest('.bzy-dayun-item');
    if(!btn||!window.PP||!PP.chart)return;
    const wrap=btn.closest('.bzy-wrap');
    if(!wrap)return;
    wrap.querySelectorAll('.bzy-dayun-item').forEach(x=>x.classList.toggle('is-active',x===btn));
    const d=getBazi(PP.chart);
    const flow=wrap.querySelector('.bzy-flow');
    if(d&&flow)flow.innerHTML=flowHtml(d,+btn.dataset.bzyIndex);
  });

  installStyle();
  function register(){
    if(window.PP&&typeof PP.add==='function')PP.add('八字四柱・大運流年',render);
    else setTimeout(register,80);
  }
  register();
})();
