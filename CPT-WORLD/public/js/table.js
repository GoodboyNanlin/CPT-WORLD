var table_data = [
  {
    name: '欧标及公制标准 锥套',
    size: '795.62 KB',
    type: 'PDF 文件',
    time: '[ 2013-08-29 ]'
  },
  {
    name: '欧标及公制标准 皮带轮',
    size: '3.53 MB',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  },
  {
    name: '欧标及公制标准劈开式皮带轮及轮毂',
    size: '452.75 KB',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  },
  {
    name: '欧标及公制标准 胀紧套',
    size: '1.62 MB',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  },
  {
    name: '美标 标准库存孔皮带轮',
    size: '1.81 MB',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  },
  {
    name: '美标 QD TB STB XT锥套及轮毂',
    size: '0 B',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  },
  {
    name: '美标 轻载OK OL AL绳轮',
    size: '178.67 KB',
    type: 'PDF 文件',
    time: '[ 2013-08-24 ]'
  },
  {
    name: '美标 劈开式皮带轮及轮毂',
    size: '452.75 KB',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  },
  {
    name: '美标 多楔带轮',
    size: '503.48 KB',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  },
  {
    name: '美标 可调节皮带轮',
    size: '477.38 KB',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  },
  {
    name: '美标 配TB锥套 3V 5V 8V A B C D 带轮',
    size: '1.63 MB',
    type: 'PDF 文件',
    time: '[ 2013-08-24 ]'
  },
  {
    name: '美标 配QD锥套和STB锥套 A B C D带轮',
    size: '1.99 MB',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  },
  {
    name: '美标 配QD锥套和STB锥套 3V 5V 8V 带轮',
    size: '1.73 MB',
    type: 'PDF 文件',
    time: '[ 2009-03-24 ]'
  }
];

$(function () {
  $('#table').renderTable();
});

;(function ($, window, document, undefined) {

  var RenderTable = function (elem) {
    var self = this;
    this.table = elem.get(0);
    this.tBody = this.table.tBodies[0];
  };

  RenderTable.prototype = {

    eventColor: function (index) {
      if (index % 2 === 0) {
        this.tBody_rows[index].className = 'event-bgColor';
      } else {
        this.tBody_rows[index].className = 'default-bgColor';
      }
    },

    renderDOM: function () {
      for (var i = 0; i < table_data.length; i++) {
        var create_tr = document.createElement('tr');
        var select_td = document.createElement('td');

        select_td.innerHTML = '<a href="Upload/2013082908525996998.pdf"><img src="picture/201706141507.png" width="20" height="20"></a>'

        create_tr.appendChild(select_td);

        for (var property in table_data[i]) {
          var create_td = document.createElement('td');

          create_td.innerHTML = table_data[i][property];
          create_tr.appendChild(create_td);
        }

        this.tBody.appendChild(create_tr);
      }
    },

    inital: function () {
      this.renderDOM();

      var self = this;
      this.tBody_rows = this.tBody.rows;
      this.selectAll = document.getElementById('selectAll');
      this.select_input = this.tBody.getElementsByTagName('input');

      for (var i = 0; i < this.tBody_rows.length; i++) {
        this.eventColor(i);

        this.tBody_rows[i].onmouseover = function () {
          if (!hasClass(this, 'selected-bgColor')) {
            addClass(this, 'hover-bgColor');
          }
        };

        this.tBody_rows[i].onmouseout = function () {
          if (!hasClass(this, 'selected-bgColor')) {
            removeClass(this, 'hover-bgColor');
          }
        };

        this.tBody_rows[i].onclick = function () {
          var index = getIndex(this, self.tBody_rows);

          removeClass(this, 'hover-bgColor');

          self.select(index);
        };
      }

      for (var i = 0; i < this.select_input.length; i++) {
        this.select_input[i].onclick = function () {
          var index = getIndex(this, self.select_input);

          self.select(index);
        };
      }

    },

    constructor: RenderTable
  };

  $.fn.renderTable = function () {
    var renderTable = new RenderTable(this);

    return renderTable.inital();
  };

})(jQuery, window, document, undefined);

function addClass(obj, cls) {
  var clsName = obj.className;

  if (clsName) {
    var arr_clsName = clsName.split(" ");
    var iIndex = arrIndexOf(arr_clsName, cls);

    if (iIndex == -1) {
      obj.className += " " + cls;
    }
  } else {
    obj.className = cls;
  }
};

function removeClass(obj, cls) {
  if (obj.className) {
    var arr_clsName = obj.className.split(" ");
    var iIndex = arrIndexOf(arr_clsName, cls);

    // 如果里面有这个class
    if (iIndex !== -1) {
      arr_clsName.splice(iIndex, 1);

      obj.className = arr_clsName.join(" ");
    }
  }
};

function hasClass(obj, cls) {
  var className = obj.className;

  if (className) {
    var cls_split = className.split(' ');

    if (arrIndexOf(cls_split, cls) === -1) {
      return false;
    } else {
      return true;
    }
  }
};

function arrIndexOf(arr, str) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === str) {
      return i;
    }
  }

  return -1;
};

function stopBubble(ev) {
  var oEvent = ev || window.event;

  if (oEvent.stopPropagation) { // 标准
    oEvent.stopPropagation();
  } else { // IE
    oEvent.cancelBubble = true;
  }
};

function getIndex(obj, nodes) {
  var result = 0;

  for (var i = 0; i < nodes.length; i++) {
    if (obj === nodes[i]) {
      result = i;
    }
  }

  return result;
};