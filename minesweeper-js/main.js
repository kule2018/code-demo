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
    xyArr = [];
  msg = "..."; // 提示信息

  //开始布局
  this.initDom = function() {
    // i:表示x轴   j:表示y轴
    var htmlStr = "";
    for (var i = 0; i < X_NUMBER; i++) {
      for (var j = 0; j < Y_NUMBER; j++) {
        htmlStr += "<div class='btn_" + i + "_" + j + "'>" + "</div>";
      }
      htmlStr += "</div>";
    }
    slDom.innerHTML = htmlStr;
  }
  // 生成雷区
  this.setRodam = function() {
    while (errorNumber > 0) {
      var xRodanm = Math.floor(Math.random() * X_NUMBER);
      var yRodanm = Math.floor(Math.random() * X_NUMBER);
      console.log(xRodanm, yRodanm);
      var dom = document.getElementsByClassName("btn_" + xRodanm + "_" + yRodanm)[0];
      if (!dom.getAttribute("data-lei")) {
        // 说明没有布雷
        dom.setAttribute("data-lei", "0");
        errorNumber--;
      }
    }
    // 开始遍历数字填充
    for (var i = 0; i < X_NUMBER; i++) {
      for (var j = 0; j < Y_NUMBER; j++) {
        var liDom = document.getElementsByClassName("btn_" + i + "_" + j),
          num = 0;
        if (!liDom.getAttribute("data-lei")) {
          // 查看周围八个数据，有几个雷区
          if (i % X_NUMBER === 0) { // 第一排
            if (j === 0) { // 第一个
              if (document.getElementsByClassName("btn_" + i + "_" + j + 1).getAttribute("data-lei")) {
                num++;
              }
              if (document.getElementsByClassName("btn_" + i + 1 + "_" + j + 1).getAttribute("data-lei")) {
                num++;
              }
              if (document.getElementsByClassName("btn_" + i + 1 + "_" + j).getAttribute("data-lei")) {
                num++;
              }
            } else if (j % Y_NUMBER === 0) { // 最后一个
              if (document.getElementsByClassName("btn_" + i + "_" + j - 1).getAttribute("data-lei")) {
                num++;
              }
              if (document.getElementsByClassName("btn_" + i - 1 + "_" + j - 1).getAttribute("data-lei")) {
                num++;
              }
              if (document.getElementsByClassName("btn_" + i - 1 + "_" + j).getAttribute("data-lei")) {
                num++;
              }
            } else {

            }
          }

          function initNumber(i, j) {
            if (document.getElementsByClassName("btn_" + i - 1 + "_" + j - 1).getAttribute("data-lei")) {
              num++;
            }
            if (document.getElementsByClassName("btn_" + i - 1 + "_" + j).getAttribute("data-lei")) {
              num++;
            }
            if (document.getElementsByClassName("btn_" + i - 1 + "_" + j + 1).getAttribute("data-lei")) {
              num++;
            }

            if (document.getElementsByClassName("btn_" + i + "_" + j - 1).getAttribute("data-lei")) {
              num++;
            }
            if (document.getElementsByClassName("btn_" + i + "_" + j + 1).getAttribute("data-lei")) {
              num++;
            }

            if (document.getElementsByClassName("btn_" + i + 1 + "_" + j + 1).getAttribute("data-lei")) {
              num++;
            }
            if (document.getElementsByClassName("btn_" + i + 1 + "_" + j + 1).getAttribute("data-lei")) {
              num++;
            }
            if (document.getElementsByClassName("btn_" + i + 1 + "_" + j + 1).getAttribute("data-lei")) {
              num++;
            }
          }
        }
      }
    }
  }
  // 初始化返回id或class对象
  function getDom(e) {
    if (objName.indexOf(".") > -1) {
      return document.getElementsByClassName(objName.slice(1))[0];
    }
    return document.getElementById(objName.slice(1));
  }

  // 开始执行
  this.initDom();
  // 生成随机的雷区
  this.setRodam();
}
