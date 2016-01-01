/** pie-shape.js扇形插件
 * 详细参数配置请看RADME.md
 * git地址：http://git.oschina.net/luozt007/pie-shape.js
 */

(function(global, undefined) {
  var PieShape = function(options) {
    var
      o = options || {},
      wrap = document.createElement("div"),
      half1 = document.createElement("div"),
      half2 = document.createElement("div"),
      halfSpan1 = document.createElement("span"),
      halfSpan2 = document.createElement("span");

    o = {
      containerId: o.containerId || "",
      containerClass: o.containerClass || "",
      position: o.position || "absolute",
      backgroundColor: o.backgroundColor || "yellow",
      parentNode: o.parentNode || document.getElementsByTagName("body")[0],
      radius: undefined !== o.radius ? o.radius : 100,
      transition: undefined !== o.transition ? o.transition : true,
      initialAngle: undefined !== o.initialAngle ? o.initialAngle : 45
    };

    var r = o.radius;

    // 处理html元素
    o.containerId && (wrap.id = o.containerId),
      wrap.className = "pieshape-wrap" + " " + o.containerClass,
      wrap.style.width = r * 2 + "px",
      wrap.style.height = r * 2 + "px",
      wrap.style.borderRadius = r + "px",
      wrap.style.position = o.position;

    half1.className = "pieshape-half-1",
      half2.className = "pieshape-half-2";

    halfSpan1.style.borderRadius = r + "px " + r + "px 0 0",

      halfSpan2.style.borderRadius = "0 0 " + r + "px " + r + "px",

      halfSpan1.style.backgroundColor = halfSpan2.style.backgroundColor = o.backgroundColor,

      halfSpan1.style.webkitTransform = halfSpan2.style.webkitTransform = "rotateZ(-180deg)";

    o.transition && (
        halfSpan1.style.webkitTransition = halfSpan2.style.webkitTransition = "-webkit-transform linear .3s"
      ),

      halfSpan2.classList.add("hide"),

      half1.appendChild(halfSpan1),
      half2.appendChild(halfSpan2),
      wrap.appendChild(half1),
      wrap.appendChild(half2);

    o.parentNode.appendChild(wrap);


    // 保存元素
    this._options = o,
      this._wrap = wrap,
      this._halfSpan1 = halfSpan1,
      this._halfSpan2 = halfSpan2;

    if ("undefined" === typeof PieShape._initialized) {
      PieShape.prototype.setAngle = function(angle) {
          var _this = this;
          var pie1 = this._halfSpan1,
            pie2 = this._halfSpan2,
            pie2Hide = pie2.classList.contains("hide"),
            transition = this._options.transition;

          if (transition && this._ontransition)
            this._ontransition[0].removeEventListener("webkitTransitionEnd", this._ontransition[1], false);

          if (0 <= angle && 180 >= angle) {
            if (pie2Hide) {
              pie1.style.webkitTransform = "rotateZ(" + (-180 + angle) + "deg)";
            } else {
              var handlePie = function() {
                  pie2.classList.add("hide"),
                    pie1.style.webkitTransform = "rotateZ(" + (-180 + angle) + "deg)",
                    _this._ontransition = null;

                  removeEvent && pie2.removeEventListener("webkitTransitionEnd", handlePie, false);
                },
                removeEvent;

              pie2.style.webkitTransform = "rotateZ(-180deg)";

              if (transition)
                removeEvent = true,
                pie2.addEventListener("webkitTransitionEnd", handlePie, false),
                this._ontransition = [pie2, handlePie];
              else
                removeEvent = false,
                handlePie();
            }
          } else if (360 >= angle) {
            pie1.style.webkitTransform = "rotateZ(0)";
            var showPie2 = function() {
                pie2.classList.remove("hide"),
                  pie2.style.webkitTransform = "rotateZ(" + (-180 + angle - 180) + "deg)",
                  _this._ontransition = null;

                removeEvent && pie1.removeEventListener("webkitTransitionEnd", showPie2, false);
              },
              removeEvent;

            if (transition && pie2Hide)
              removeEvent = true,
              pie1.addEventListener("webkitTransitionEnd", showPie2, false),
              this._ontransition = [pie1, showPie2];
            else
              removeEvent = false,
              showPie2();
          }
        },

        PieShape.prototype.resize = function(radius) {
          var wrap = this._wrap,
            halfSpan1 = this._halfSpan1,
            halfSpan2 = this._halfSpan2,
            r = radius;

          wrap.style.width = r * 2 + "px",
            wrap.style.height = r * 2 + "px",

            halfSpan1.style.borderRadius = r + "px " + r + "px 0 0",

            halfSpan2.style.borderRadius = "0 0 " + r + "px " + r + "px",

            this._options.radius = radius;
        },

        PieShape.prototype.get = function(which) {
          var el;
          switch (which) {
            case "wrap":
              el = this._wrap;
              break;
            default:
              throw ("argument not match");
          }
          return el;
        },

        PieShape.prototype.teardown = function() {
          this._wrap.parentNode.removeChild(this._wrap),
            this._wrap = this._halfSpan1 = this._halfSpan2 = this.get = this.teardown = this.resize = this.setAngle = null;
        },

        PieShape._initialized = true;
    }

    this.setAngle(o.initialAngle);
  };

  if ("function" === typeof define && define.amd) {
    define([], function() {
      return PieShape;
    });
  } else {
    global.PieShape = PieShape;
  }

})("undefined" !== typeof window ? window : this);