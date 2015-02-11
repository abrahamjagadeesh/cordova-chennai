//check for 3d translate support
function CheckSupport() {
	this.tempElem = document.createElement("div");
	this.checkKit = function (cssProp) {
		var self = this;
		var properties = false;
        ['', '-webkit-', '-ms-', '-moz-'].forEach(function (v) {
			var CSS = v + cssProp.toLowerCase();
			if (self.tempElem.style[CSS] !== undefined && typeof (self.tempElem.style[CSS]) === 'string') {
				properties = {
					type: v,
					value: CSS
				};
			}
		});
		return properties;
	};
	this.checkProp = function () {
		var translate3D = "translate3d(0px, 0px, 0px)",
			regex,
			asSupport,
			support3d;

		this.tempElem.style.cssText = "-moz-transform:" + translate3D + "; -ms-transform:" + translate3D + "; -o-transform:" + translate3D + "; -webkit-transform:" + translate3D + "; transform:" + translate3D;

		regex = /translate3d\(0px, 0px, 0px\)/g;
		//log(this.tempElem.style.cssText);
		asSupport = this.tempElem.style.cssText.match(regex);
		support3d = (asSupport !== null && asSupport.length === 1);
		return support3d;
	};
}

//var tr = new CheckSupport('Transform');
//log(tr.checkKit());
//log(tr.tempElem);

document.addEventListener("DOMContentLoaded", function () {

	swipeFunc = {
		vars: {
			"divPosition": -105,
			"proxytransform": new CheckSupport().checkKit('Transform').value,
			"sliding": false
		},
		touches: {
			"touchstart": {
				"x": -1,
				"y": -1
			},
			"touchmove": {
				"x": -1,
				"y": -1
			},
			"touchend": false,
			"direction": "undetermined"
		},
		touchHandler: function (event, elem) {
			var touch;
			if (typeof event !== 'undefined') {
				event.preventDefault();
				if (typeof event.touches !== 'undefined') {
					touch = event.touches[0];
					switch (event.type) {
					case 'touchstart':

						var a = elem[0].style[swipeFunc.vars.proxytransform];
						var b = (a.indexOf("("));
						var c = (a.indexOf("px"));
						var d = (a.slice(b + 1, c));
						swipeFunc.vars.divPosition = parseInt(d);

						swipeFunc.touches['touchstart'].x = touch.pageX - swipeFunc.vars.divPosition;
						swipeFunc.touches['touchstart'].y = touch.pageY - swipeFunc.vars.divPosition;

						swipeFunc.vars.sliding = true;

					case 'touchmove':
						swipeFunc.touches['touchmove'].x = touch.pageX;
						swipeFunc.touches['touchmove'].y = touch.pageY;
						var X = swipeFunc.touches['touchmove'].x - swipeFunc.touches['touchstart'].x;
						var Y = swipeFunc.touches['touchmove'].y - swipeFunc.touches['touchstart'].y;

						//						if ((Y > 10 || Y < -10) && swipeFunc.vars.sliding === false) {
						//							console.log('disable')
						//						}

						swipeFunc.move(X, elem);

						break;
					case 'touchend':
						//						var MX = swipeFunc.touches['touchmove'].x;
						//						var SX = swipeFunc.touches['touchstart'].x;
						//						var MY = swipeFunc.touches['touchmove'].y;
						//						var SY = swipeFunc.touches['touchstart'].y;
						//
						//						//left up right down
						//						console.log(
						//							(function () {
						//								return (MY < SY && MX < SX) ? ((MX < MY && SX > SY) ? "left" : "up") : ((MY < SY && MX > SX) ? "right" : "down");
						//							}())
						//						);

						break;
					default:
						break;
					}
				}
			}
		},
		move: function (metre, elem) {
			var pxToMove = metre;
			if (pxToMove > 0) {
				pxToMove = 0;
			} else if (pxToMove < -500) {
				pxToMove = -500;
			}
			elem[0].style[this.vars.proxytransform] = "translate3d(" + pxToMove + "px,0,0)";
		}
	};


}, false);