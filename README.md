#pie-shape.js插件

>此插件是本人在第一间公司做项目时开发的，颇有纪念价值。

许多插件实现扇形都是通过canvas来实现，本插件利用`border-radius:50%；`原理制作的半圆形，把它放在一个长方形的DIV中，通过`rotate`半圆形以及`overflow:hidden;`长方形实现遮住超出长方形的半圆形部分来实现扇形。是不是很巧妙？

**特点**:

- 纯js实现，无需jQuery
- 支持AMD模块规范

**缺点**:

- 暂时只支持webkit浏览器
- 代码有待优化，有存在少许bug，如teardown()功能未完全
- 启用transition时，浏览器对webkitTransitionEnd事件支持不流畅

##使用方法

1. 引入`pie-shape.css`
2. 引入`pie-shape.js`
3. js调用：

  ```javascript
  var pie1 = new PieShape({
    parentNode: document.getElementById("test"),
    radius: 100,
    initialAngle: 145,
    transition: false
  });
  ```

##参数配置

`new PieShape(options)`中的`options`配置，`{}`里面是传参格式，冒号：后面是默认值。带*星号的参数是必选的，不过本插件没有必选的参数。

- `parentNode`: {DOM object : <body/>} 扇形父容器div，扇形将创建在该容器内
- `containerId`: {String : ""} 创建扇形容器的ID
- `containerClass`: {String : ""} 添加给创建扇形容器的class
- `position`: {String : "absolute"} 创建扇形容器定位方式，可选absolute | relative
- `backgroundColor`: {String : "yellow"} 创建扇形容器的背景色
- `radius`: {number : 100} 创建扇形的半径
- `transition`: {boolean : true} 扇形改变角度时是否动画过渡显示
- `initialAngle`: {number : 45} 扇形创建后创始角度

返回的对象，提供调用的API有：

- `setAngle(angle)`：@angle: {number} 改变扇形的角度
- `resize(radius)`：@radius: {number} 改变扇形的大小，传入半径
- `get(which)`：@which:{string} 获取扇形的元素，如容器DIV。which可选值："wrap"
- `teardown()`：卸载插件，删除该扇形
