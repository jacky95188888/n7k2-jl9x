/* 筠玲易數全站繁體中文保護層
 * 專門修正外部曆法套件及舊教材資料可能回傳的簡體字。
 * 只轉換畫面文字與無障礙標籤，不改表單值、命理代碼或計算資料。
 */
(function (root) {
  'use strict';

  var PHRASES = {
    '黄历': '黃曆', '农历': '農曆', '阴历': '陰曆', '阳历': '陽曆',
    '万年历': '萬年曆', '公历': '公曆', '处暑': '處暑',
    '惊蛰': '驚蟄', '节气': '節氣', '干支': '干支', '天干': '天干',
    '地支': '地支', '占卦': '占卦', '占问': '占問', '占断': '占斷',
    '后台': '後臺', '平台': '平臺', '台湾': '臺灣', '台北': '臺北',
    '台中': '臺中', '台南': '臺南', '台东': '臺東', '台西': '臺西',
    '里面': '裡面', '心里': '心裡', '家里': '家裡', '万里': '萬里',
    '之后': '之後', '以后': '以後', '随后': '隨後', '背后': '背後',
    '重复': '重複', '复杂': '複雜', '回复': '回覆', '答复': '答覆',
    '签约': '簽約', '签订': '簽訂', '签署': '簽署',
    '抽签': '抽籤', '求签': '求籤', '山岳': '山嶽',
    '皇后': '皇后', '太后': '太后'
  };

  /* 排除「占、干、丑、凶、后、台、里」等需依語境判斷的字，改由上方詞組處理。 */
  var FROM = '处万与业东丝两严丧个丰临为丽举义乌乐乔习乡书买乱争于亏云亚产亩亲亿仅从仓仪们价众优会伞伟传伤伦体余侣侥侧侦侨俩俭债倾偿儿党兰关兴养兽冈册写军农冲决况冻净凉减凑凤凭凯击凿刍划刘则刚创删别剂剑剧劝办务动励劳势勋匀区医华协单卖卢卤卫却厅历厉压厌厕厦厨县叁参双发变叙叶号叹吓听启吴呐员呛呜咏咙响哑哟唤啸喷团园围国图圆圣场坏块坚坛坝坞坟坠垄垒垦垫埘执堆墙壮声壳壶壸处备复够头夸夹夺奋奖妇妈妆姊姗姜娄娇娱婴孙学宁宝实宠审宪宫宽宾对寻导寿将尔尘尝层属岁岂岗岛岭岳峡币帅师帐帘帜带帮并庄庆庐库应庙废广归当录彦彻径径忆忧怀态怂怜总恋恒恳恶恼悦惊惧惨惩惯愤愿懒戏战户扑执扩扫扬扰抚抛抢护报担拟拢拣拥拦拨择挂挚挛挝挞挟挠挡挣挤挥损捡换据掳掴掷掸掺揽搀搁搂搅携摄摆摇摊撑撵敌数斋斩断无旧时旷昙昼显晋晓暂术朴机杀杂权条来杨杰极构枢枪柜标栈栋栏树样桥梦检楼欢欧歼毁毙气汇汉汤沟没沪沦沧泞泪泼泽洁浅浆浇浊测济浓涛涝涟涡涣涤润涧涨渊渔湾湿溃溅滚滞满滤滥滨滩潇潜澜濑灭灯灵灾灿炉炖炼烂烛烟烦烧烨热焕爱爷牍牵犹独狭狮狱猎猪猫玛环现电画畅疗疮疡疯痈痉痒痪瘫癞皑盖盘着睁睐瞒矫矿码砖砚础硕碍礼祷祸离秃秆种积称稳窝窜窍竞笃笋笔笺签简粮紧纠红纤约级纪纬纯纲纳纵纷纸纹纺纽线练组细织终绊绍经绑绒结绕绘给络绝绞统绣继绩绪续绳维综绿缀缓编缘缚缝缩缴网罗罚罢职联聪肃肠肤肾肿胀胆胜胶脉脏脑脚脱脸腊腻腾舆舰舱艺节芜苇苹范茧荐药莲获莹营萧萨蓝虑虚虫虽蚀蚁蚂蚕蛊蛮蜕蝉蝎衔补装袜袭见观规觉览触誉计订认讨让训议讯记讲讳讼诀证评识诈诉词译试诗诚话诞询该详语误诱说请诸读课谁调谅谈谋谐谢谣谦谨谱贝负贡财责贤败账货质贩贪贫贯贵贷贸费贺贼贾资赋赌赎赏赐赔赖赚赛赞赠赵赶趋跃践车轨转轮软轰轻载较辅辆辈辉辑输辕辖辗辙辞边辽达迁过迈运还这进远违连迟迹适选递逻遗遥邮邻郁郑酝酱酿释里鉴针钉钏钓钗钙钝钞钟钢钥钦钧钩钮钱钳钻铁铃铅铠铜铢铣铭银铸铺链销锁锅锋锐错锡锣锦键锻镇镜长门闪闭问闯闲间闻阁阅阔队阳阴阵阶际陆陈陕险随隐难雾霁霉静顶项顺须顾顿颁颂预领颇频颗题颜额风飘飞饥饭饮饯饰饱饲饶馆马驰驱驳驴驶驷驹驻驾骂骆验骑骗骚骡骤鱼鲁鲜鸟鸡鸣鸦鸭鸽鹅鹊鹏麦黄齐齿龄龙龟';
  var TO   = '處萬與業東絲兩嚴喪個豐臨為麗舉義烏樂喬習鄉書買亂爭於虧雲亞產畝親億僅從倉儀們價眾優會傘偉傳傷倫體餘侶僥側偵僑倆儉債傾償兒黨蘭關興養獸岡冊寫軍農沖決況凍淨涼減湊鳳憑凱擊鑿芻劃劉則剛創刪別劑劍劇勸辦務動勵勞勢勳勻區醫華協單賣盧鹵衛卻廳曆厲壓厭廁廈廚縣參參雙發變敘葉號歎嚇聽啟吳吶員嗆嗚詠嚨響啞喲喚嘯噴團園圍國圖圓聖場壞塊堅壇壩塢墳墜壟壘墾墊塒執堆牆壯聲殼壺壼處備復夠頭誇夾奪奮獎婦媽妝姊姍薑婁嬌娛嬰孫學寧寶實寵審憲宮寬賓對尋導壽將爾塵嘗層屬歲豈崗島嶺嶽峽幣帥師帳簾幟帶幫並莊慶廬庫應廟廢廣歸當錄彥徹徑徑憶憂懷態慫憐總戀恆懇惡惱悅驚懼慘懲慣憤願懶戲戰戶撲執擴掃揚擾撫拋搶護報擔擬攏揀擁攔撥擇掛摯攣撾撻挾撓擋掙擠揮損撿換據擄摑擲撣摻攬攙擱摟攪攜攝擺搖攤撐攆敵數齋斬斷無舊時曠曇晝顯晉曉暫術樸機殺雜權條來楊傑極構樞槍櫃標棧棟欄樹樣橋夢檢樓歡歐殲毀斃氣匯漢湯溝沒滬淪滄濘淚潑澤潔淺漿澆濁測濟濃濤澇漣渦渙滌潤澗漲淵漁灣濕潰濺滾滯滿濾濫濱灘瀟潛瀾瀨滅燈靈災燦爐燉煉爛燭煙煩燒燁熱煥愛爺牘牽猶獨狹獅獄獵豬貓瑪環現電畫暢療瘡瘍瘋癰痙癢瘓癱癩皚蓋盤著睜睞瞞矯礦碼磚硯礎碩礙禮禱禍離禿稈種積稱穩窩竄竅競篤筍筆箋籤簡糧緊糾紅纖約級紀緯純綱納縱紛紙紋紡紐線練組細織終絆紹經綁絨結繞繪給絡絕絞統繡繼績緒續繩維綜綠綴緩編緣縛縫縮繳網羅罰罷職聯聰肅腸膚腎腫脹膽勝膠脈臟腦腳脫臉臘膩騰輿艦艙藝節蕪葦蘋範繭薦藥蓮獲瑩營蕭薩藍慮虛蟲雖蝕蟻螞蠶蠱蠻蛻蟬蠍銜補裝襪襲見觀規覺覽觸譽計訂認討讓訓議訊記講諱訟訣證評識詐訴詞譯試詩誠話誕詢該詳語誤誘說請諸讀課誰調諒談謀諧謝謠謙謹譜貝負貢財責賢敗賬貨質販貪貧貫貴貸貿費賀賊賈資賦賭贖賞賜賠賴賺賽贊贈趙趕趨躍踐車軌轉輪軟轟輕載較輔輛輩輝輯輸轅轄輾轍辭邊遼達遷過邁運還這進遠違連遲跡適選遞邏遺遙郵鄰鬱鄭醞醬釀釋裡鑒針釘釧釣釵鈣鈍鈔鐘鋼鑰欽鈞鉤鈕錢鉗鑽鐵鈴鉛鎧銅銖銑銘銀鑄鋪鏈銷鎖鍋鋒銳錯錫鑼錦鍵鍛鎮鏡長門閃閉問闖閒間聞閣閱闊隊陽陰陣階際陸陳陝險隨隱難霧霽黴靜頂項順須顧頓頒頌預領頗頻顆題顏額風飄飛飢飯飲餞飾飽飼饒館馬馳驅駁驢駛駟駒駐駕罵駱驗騎騙騷騾驟魚魯鮮鳥雞鳴鴉鴨鴿鵝鵲鵬麥黃齊齒齡龍龜';
  var CHAR_MAP = Object.create(null);
  for (var i = 0; i < FROM.length && i < TO.length; i++) {
    if ('里岳'.indexOf(FROM.charAt(i)) === -1) CHAR_MAP[FROM.charAt(i)] = TO.charAt(i);
  }
  /* 外部黃曆最常出現、也最需要保證正確的字。 */
  Object.assign(CHAR_MAP, {
    '处':'處','东':'東','动':'動','进':'進','开':'開','词':'詞','讼':'訟','纳':'納',
    '仓':'倉','盖':'蓋','迁':'遷','启':'啟','竖':'豎','殓':'殮','阴':'陰','阳':'陽',
    '将':'將','鸣':'鳴','时':'時','败':'敗','离':'離','医':'醫','约':'約','亲':'親',
    '会':'會','国':'國','历':'曆','岁':'歲','龙':'龍','鸡':'雞','猪':'豬','黄':'黃',
    '总':'總','览':'覽','长':'長','临':'臨','绝':'絕','养':'養','带':'帶','门':'門',
    '冲':'沖','节':'節','气':'氣'
  });

  function text(value) {
    var output = String(value == null ? '' : value);
    Object.keys(PHRASES).sort(function (a, b) { return b.length - a.length; }).forEach(function (from) {
      output = output.split(from).join(PHRASES[from]);
    });
    return output.replace(/[\u3400-\u9fff]/g, function (char) { return CHAR_MAP[char] || char; });
  }

  function skip(node) {
    var parent = node.parentElement;
    return !parent || /^(SCRIPT|STYLE|CODE|PRE|TEXTAREA|NOSCRIPT)$/i.test(parent.tagName) || parent.closest('[data-no-traditional]');
  }

  function convertNode(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      if (skip(node)) return;
      var converted = text(node.nodeValue);
      if (converted !== node.nodeValue) node.nodeValue = converted;
      return;
    }
    if (node.nodeType !== 1) return;
    ['placeholder', 'title', 'aria-label', 'alt'].forEach(function (name) {
      if (!node.hasAttribute(name)) return;
      var current = node.getAttribute(name);
      var converted = text(current);
      if (converted !== current) node.setAttribute(name, converted);
    });
    var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    var current;
    while ((current = walker.nextNode())) convertNode(current);
  }

  function start() {
    convertNode(document.body);
    if (!root.MutationObserver) return;
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === 'characterData') convertNode(mutation.target);
        for (var i = 0; i < mutation.addedNodes.length; i++) convertNode(mutation.addedNodes[i]);
      });
    }).observe(document.body, { subtree: true, childList: true, characterData: true });
  }

  root.JLTrad = { text: text, convert: convertNode };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})(window);
