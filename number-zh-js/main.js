/**
 * 数字转为中文显示
 * @param {string} objClass 传入对象
 */
var numberChange = function(objClass) {
  // 声明私有变量
  var arrInt = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var arrMax = ['', '拾', '佰', '仟'];
  var arrMore = ['', '萬', '亿', '兆'];
  var arrLit = ['角', '分', '毫', '厘'];
  var dom = getDom(),
    number = 0;

  function getDom() {
    if (objClass.startsWith(".")) {
      return document.getElementsByClassName(objClass.slice(1))[0]
    }
    return document.getElementById(objClass);
  }

  // 绑定事件
  var btnDom = getChildren('btn_start'),
    inputDom = getChildren('n_input'),
    resultDom = getChildren('result');

  function getChildren(str) {
    var domChildren = dom.children,
      length = domChildren.length;
    for (var i = 0; i < length; i++) {
      if (domChildren[i].getAttribute('class').indexOf(str) > -1) {
        return domChildren[i];
      }
    }
    return null;
  }
  btnDom.addEventListener('click', function() {
    number = Number(inputDom.value, 10);
    // 执行转换操作
    startChange();
  }, false)

  function startChange() {
    if (!isNaN(number) && number > 0) {
      var numArr = (number + "").split("."),
        strResult = "",
        length0 = numArr[0].length,
        flag = 0; // 数组形式
      for (var i = 0; i < length0; i++) {
        console.log(i + "::;");
        var num = parseInt(numArr[0][i]);
        if (num === 0) { // 判断之前是否有0
          flag++; // 有几个0
          if (i === length0 - 1) {
            flag = 0;
          }
        }
        if (num > 0) {
          console.log(Math.floor((length0 - i) / 4))
          strResult += (flag > 0 ? arrInt[0] : "") + arrInt[num] + (num !== 0 ? arrMax[(length0 - 1 - i) % 4] : "");
        }
        if (flag > 3) {
          flag = 4;
        }
        if ((length0 - 1 - i) % 4 === 0) {
          if (flag <= 4) {
            strResult += arrMore[Math.floor((length0 - i) / 4)];
          }
        }
        if (num > 0) {
          flag = 0;
        }
      }
      if (numArr.length === 2) {

      }
      console.log(strResult);
      resultDom.innerHTML = strResult;
    }
  }
}
