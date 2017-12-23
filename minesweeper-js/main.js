/**
 * 扫雷js  by nyf
 * 步骤原理：
 * 1、开始布局
 * 2、开始布雷
 * 3、开始计算其他的
 * 4、绑定点击事件
 * @param {String} objName class/id name
 * @param {Number} number 代表的是number*number
 * @param {Number} errorNumber 代表的是number*number
 */
var slPlanugs = function(objName, number, errorNumber) {
  // 定义私有全局变量
  var X_NUMBER = 30,
    Y_NUMBER = 30,
    MAX_NUMBER = X_NUMBER * Y_NUMBER, // 最大的数字
    slDom = getDom(),
    xyArr = [], // 全部坐标
    leiArr = [], // 雷区坐标
    ovBtnLength = 0, // 已经点击的雷
    msg = "..."; // 提示信息

  //开始布局
  this.initDom = function() {
    // i:表示x轴   j:表示y轴
    var htmlStr = "";
    for (var i = 0; i < X_NUMBER; i++) {
      htmlStr += "<div class='tab'>";
      for (var j = 0; j < Y_NUMBER; j++) {
        xyArr.push([i, j]);
        htmlStr += "<div class='btn_" + i + "_" + j + "'>" + "</div>";
      }
      htmlStr += "</div>";
    }
    console.log(xyArr);
    slDom.innerHTML = htmlStr;
  }
  // 生成雷区
  this.setRodam = function() {
    while (errorNumber > 0) {
      var xRodanm = Math.floor(Math.random() * X_NUMBER);
      var yRodanm = Math.floor(Math.random() * X_NUMBER);
      var dom = document.getElementsByClassName("btn_" + xRodanm + "_" + yRodanm)[0];
      if (!dom.getAttribute("data-lei")) {
        // 说明没有布雷
        leiArr.push([xRodanm, yRodanm]);
        dom.innerHTML = "雷";
        dom.setAttribute("data-lei", "0");
        dom.setAttribute("data-num", "-1");
        errorNumber--;
      }
    }
    // 开始遍历数字填充
    var length = xyArr.length;
    for (var i = 0; i < length; i++) {
      var liDom = document.getElementsByClassName("btn_" + xyArr[i][0] + "_" + xyArr[i][1])[0],
        num = 0;
      if (!liDom.getAttribute("data-lei")) {
        // 查看周围八个数据，有几个雷区
        initNumber(xyArr[i][0], xyArr[i][1]);

        function initCom(a, b) {
          if (a >= 0 && b >= 0 && a < X_NUMBER && b < Y_NUMBER && document.getElementsByClassName("btn_" + a + "_" + b)[0].getAttribute("data-lei")) {
            num++;
          }
        }

        function initNumber(i, j) {
          initCom(i - 1, j - 1);
          initCom(i - 1, j);
          initCom(i - 1, j + 1);
          initCom(i, j - 1);
          initCom(i, j + 1);
          initCom(i + 1, j - 1);
          initCom(i + 1, j);
          initCom(i + 1, j + 1);
        }
        var nowDom = document.getElementsByClassName("btn_" + xyArr[i][0] + "_" + xyArr[i][1])[0];
        nowDom.innerHTML = num > 0 ? num : "";
        nowDom.setAttribute("data-num", num);
      }
      // 绑定点击事件
      liDom.addEventListener('mousedown', function(e) {
        if (e.button === 2) {
          // 右键插旗事件
          var classStr = this.getAttribute("class")
          console.log(classStr);
          if (classStr.indexOf("right_hq") > -1) {
            // 已经插旗，取消
            ovBtnLength--;
            removeClass(this, "right_hq");
          } else {
            ovBtnLength++;
            addClass(this, "right_hq");
          }
        } else if (e.button === 0) {
          if (this.getAttribute("data-lei")) { // over
            alert("你踩到雷了，over");
            // 打开所有的
            openAllDom();
          } else {
            // 正常事件
            addClass(this, "active");
            // 处理函数（处理区域附近自动打开：为0的区域自动打开）

            function autoOpen(m, n) {
              // 自动打开周围八个
              this.open = function(a, b) {
                // console.log(a, b);
                if (a >= 0 && b >= 0 && a < X_NUMBER && b < Y_NUMBER) {
                  var dm = document.getElementsByClassName("btn_" + a + "_" + b)[0];
                  if (dm.getAttribute("class").indexOf("active") < 0) {
                    addClass(dm, "active");
                    if (dm.getAttribute("data-num") == "0") {
                      autoOpen(a, b);
                    }
                  }
                }
              }
              this.open(m - 1, n - 1);
              this.open(m - 1, n);
              this.open(m - 1, n + 1);
              this.open(m, n - 1);
              this.open(m, n + 1);
              this.open(m + 1, n - 1);
              this.open(m + 1, n);
              this.open(m + 1, n + 1);
            }
            if (this.getAttribute("data-num") == "0") {
              var ij = (this.getAttribute("class").split(" ")[0]).split("_");
              autoOpen(ij[1], ij[2]);
            }
          }
        }
        // 扫雷是否成功
        var leiLength = leiArr.length,
          flag = false,
          btnLength = 0;
        for (var k = 0; k < leiLength; k++) {
          var doms = document.getElementsByClassName("btn_" + leiArr[k][0] + "_" + leiArr[k][1])[0];
          if (doms.getAttribute("class").indexOf("right_hq") > -1) {
            btnLength++;
          }
        }
        if (ovBtnLength === leiLength && btnLength === ovBtnLength) {
          alert("恭喜你，你成功了");
          openAllDom();
        }
      }, false);
    }
  }
  // 初始化返回id或class对象
  function getDom(e) {
    if (objName.indexOf(".") > -1) {
      return document.getElementsByClassName(objName.slice(1))[0];
    }
    return document.getElementById(objName.slice(1));
  }
  // 添加class
  function addClass(dom, str) {
    var stClass = dom.getAttribute("class");
    if (!(stClass.indexOf(str) > -1)) {
      stClass += " " + str;
    }
    dom.setAttribute("class", stClass);
  }
  // 移除class
  function removeClass(dom, str) {
    var stClass = dom.getAttribute("class"),
      arr = [];
    if (stClass.indexOf(str) > -1) {
      arr = stClass.split(" ");
      arr.splice(arr.indexOf(str), 1);
    }
    dom.setAttribute("class", arr.join(" "));
  }

  function openAllDom() {
    var length = xyArr.length;
    for (var i = 0; i < length; i++) {
      var dom = document.getElementsByClassName("btn_" + xyArr[i][0] + "_" + xyArr[i][1])[0];
      if (dom.getAttribute("data-lei")) {
        addClass(dom, "right_hq");
      } else {
        addClass(dom, "active");
      }
    }
  }
  // 开始执行
  this.initDom();
  // 生成随机的雷区
  this.setRodam();
  // 阻止鼠标右键的默认事件
  document.body.oncontextmenu = function() {
    return false;
  };
}
