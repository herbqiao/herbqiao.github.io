// 定义日历对象的构造函数
function Calender(main) {
  this.currentDate = new Date();
  this.main = main;
}

Calender.prototype = {
  constructor: Calender,
  // 创建主体内容区域
  showMain: function () {
    var $t = this;

    $t.main = document.createElement("main");
    document.body.appendChild($t.main);
    $t.main.style.width = "600px";
    $t.main.style.height = "600px";
    $t.main.style.backgroundColor = "dimgray";
    $t.main.style.margin = "50px auto";
    $t.main.style.borderRadius = "15px";
  },

  // 创建标题头区域
  showHeader: function () {
    var $t = this;
    // 左控制键
    var prevSpan = document.createElement("span");
    $t.main.appendChild(prevSpan);
    prevSpan.innerHTML = "&lt;";

    // 存放年月信息
    var span = document.createElement("span");
    $t.main.appendChild(span);

    // 右控制键
    var nextSpan = document.createElement("span");
    $t.main.appendChild(nextSpan);
    nextSpan.innerHTML = "&gt;";

    var allSpan = document.querySelectorAll("span");
    var month = $t.currentDate.getMonth() + 1;
    var year = $t.currentDate.getFullYear();

    // 设置左边年月信息
    span.innerHTML = year + "年" + month + "月";

    for (var i = 0; i < allSpan.length; i++) {
      var span = allSpan[i];
      // 设置span的css样式
      span.style.display = "inline-block";
      span.style.width = "33.3%";
      span.style.height = "100px";
      span.style.color = "white";
      span.style.fontSize = "30px";
      span.style.textAlign = "center";
      span.style.lineHeight = "100px";
      span.id = "index" + i;

      // 为左右按键添加事件
      if (i == 0 || i == 2) {
        span.onclick = function () {
          month = $t.currentDate.getMonth();
          year = $t.currentDate.getFullYear();
          if (this.id == "index0") {
            month--;
          } else if (this.id == "index2") {
            month++;
          }
          // 点击完重新设置当前月
          $t.currentDate.setMonth(month);
          // 清空页面
          document.body.innerHTML = "";
          // 重新布局
          $t.showInit();
        };
      }
    }
  },

  // 创建week标题头
  showWeek: function () {
    var $t = this;
    // 创建table标签
    var table = document.createElement("table");
    $t.main.appendChild(table);
    table.style.width = "100%";
    // 往表格里边添加一行
    var tr = table.insertRow();
    var weeks = ["日", "一", "二", "三", "四", "五", "六"];

    for (var i = 0; i < weeks.length; i++) {
      // 往tr插入列
      var td = tr.insertCell();
      td.style.height = "50px";
      td.style.backgroundColor = "goldenrod";
      td.style.textAlign = "center";
      td.innerHTML = weeks[i];
    }
  },

  // 创建容纳日期的容器
  showDate: function () {
    var $t = this;
    var table = document.createElement("table");
    $t.main.appendChild(table);
    table.style.width = "100%";

    // 创建一个句子标签
    var p = document.createElement("p");
    $t.main.appendChild(p);
    p.innerHTML = getSentence();
    p.style.fontSize = "24px";
    p.style.width = "100%";
    p.style.height = "60px";
    p.style.lineHeight = "30px";
    p.style.textAlign = "center";
    p.style.color = "white";

    // 创建日期容器
    for (var i = 0; i < 6; i++) {
      // 创建6行
      var tr = table.insertRow();
      for (var k = 0; k < 7; k++) {
        // 每一行7格
        var td = tr.insertCell();
        td.style.height = "60px";
        td.style.backgroundColor = "orange";
        td.style.textAlign = "center";
        td.style.fontSize = "20px";
        var dayIndex = i * 7 + k;

        // 计算每一个格所对应的日期对象
        var eachDate = getEveryDate(dayIndex);
        // 得到每一个日期的号数
        td.innerHTML = eachDate.getDate();

        // 获取当天日期的值,突出显示当天日期
        var now = new Date();
        var currentDay = now.getDate();
        //console.log(currentDay)
        if (
          eachDate.getMonth() == now.getMonth() &&
          eachDate.getDate() === currentDay
        ) {
          td.style.backgroundColor = "dimgray";
          td.style.color = "white";
        }
        // 判断当前月和推算出来的日期的月份是否一样，不一样则代表不是当前月的日期，则把日期灰色显示
        if (eachDate.getMonth() != $t.currentDate.getMonth()) {
          td.style.backgroundColor = "lightgray";
          td.style.color = "gray";
        }
      }
    }
  },

  // 封装一个方法，待点击切换月份时，初始化页面
  showInit: function () {
    var $t = this;
    $t.showMain();
    $t.showHeader();
    $t.showWeek();
    $t.showDate();
  },
};

var sentences = [
  "我能做到",
  "我是成功的",
  "我有无限的潜力",
  "我有能力克服困难",
  "我是一个乐观的人",
  "我相信自己",
  "我每天都在进步",
  "我是一个有决心的人",
  "我的努力会得到回报",
  "我是一个自信的人",
  "我可以控制自己的情绪",
  "我是一个积极的思考者",
  "我相信自己的能力",
  "我每天都在成长",
  "我有足够的毅力",
  "我可以战胜任何挑战",
  "我的身体和心灵都很强大",
  "我是一个有决心和毅力的人",
  "我每天都在积极地面对生活",
  "我能够克服任何困难",
  "我是一个积极向上的人",
  "我能够取得我想要的成就",
  "我的能力没有限制",
  "我是一个有自信心的人",
  "我可以面对任何挑战",
  "我相信自己的直觉",
  "我是一个积极的行动者",
  "我每天都在努力提升自己",
  "我会把握每一个机会",
  "我有能力改变自己的命运",
  "我是一个积极的思考者和行动者",
  "我每天都在追求自己的梦想",
  "我可以战胜任何困难",
  "我相信自己的能力可以改变世界",
  "我相信自己是一个有价值的人",
  "我是一个积极的人，我吸引着积极的事物",
  "我每天都在成为更好的自己",
  "我有能力实现自己的目标",
  "我是一个自律和坚持不懈的人",
  "我每天都在积极地思考和行动",
  "我相信自己的选择是正确的",
  "我是一个勇敢的人，我敢于追求自己的梦想",
  "我每天都在积极地面对挑战",
  "我有能力克服任何困难",
  "我相信自己的能力可以改变命运",
  "我每天都在追求自己的梦想和目标",
  "我可以战胜任何困难和障碍",
  "我有能力实现自己的梦想和目标",
  "我相信自己，我有克服一切困难的能力",
  "没有什么能阻止我前进",
  "我终将成为我期待的样子",
  "我的生活在我自己的掌控之中",
  "我超级完美",
  "我无条件爱自己，相信自己，支持自己",
  "我聚焦自己，奇迹就会发生",
  "我相信自己可以超越过去的限制",
  "我用我所渴望的美善来看待自己",
  "我的内心充满希望",
  "我准备好了梦想成真",
  "我比以前任何时候都健康",
  "我有能力完成所有日常任务",
  "我的自愈能力很强",
  "我非常有安全感",
  "幸福围绕着我",
  "我有力量度过任何难关",
  "我的潜力永无止境",
  "我相信自己的可塑性",
  "我吸入信心，呼出疑虑",
  "我选择用爱的态度过好今天",
  "我风华正茂，我的未来非常精彩",
  "我永远都有能力对不想要的说不",
  "我接纳所有的情绪，并爱着自己",
  "我的内心平和是我最大的力量",
  "我会将美丽的事物吸引到我的生活中",
  "不必焦虑有人比你提前拥有",
  "我就是此刻我需要成为的人",
];
function getSentence() {
  var now = new Date();
  var start = new Date(1900, 0, 1);
  var diff = now - start;
  var oneDay = 24 * 60 * 60 * 1000;
  var dayCount = Math.floor(diff / oneDay);

  // 选择句子
  var sentenceIndex = dayCount % sentences.length;
  return sentences[sentenceIndex];
}

// 实例化一个Calender对象
var calender = new Calender();
// 定义方法：获取每月一号对应的星期数
function getEveryDate(index) {
  // 获取一号对应的日期
  var firstDate = new Date(calender.currentDate.setDate(1));
  // 获取一号对应的星期几
  var week = firstDate.getDay();

  // 把1号对应的星期设置在正确的位置，获得的是上月倒数第-week天的毫秒数
  var trueWeekTimes = firstDate.setDate(-(week - 1));
  // 计算每一天的毫秒数
  var milliTimes = trueWeekTimes + index * 24 * 60 * 60 * 1000;
  // 把每一天的毫秒数转化为每一天的日期
  var eachDate = new Date(milliTimes);
  return eachDate;
}

function triggerEventAtMidnight() {
  var now = new Date();
  var night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );
  var msToMidnight = night.getTime() - now.getTime() + 100;

  setTimeout(function () {
    // 重新设置定时器，为下一个午夜准备
    triggerEventAtMidnight();
  }, msToMidnight);

  // 跨天重新设置当前年月
  calender.currentDate = now;
  // 清空页面
  document.body.innerHTML = "";
  // 重新布局
  calender.showInit();
}

// 启动定时器
triggerEventAtMidnight();
