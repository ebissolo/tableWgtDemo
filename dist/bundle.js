/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _TableWgt = __webpack_require__(1);

var _TableWgt2 = _interopRequireDefault(_TableWgt);

var _GenericWgt = __webpack_require__(5);

var _GenericWgt2 = _interopRequireDefault(_GenericWgt);

var _data = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.wgts = [];
window.pushWidget = function (wgt) {
	wgts.push(wgt);
};
window.getWidgetById = function (id) {
	for (var i = 0; i < wgts.length; i++) {
		if (wgts[i].id = id) {
			return wgts[i];
		}
	}
};

window.tableWgt = new _TableWgt2.default("tableWgt", {
	width: 500,
	height: 300,
	rowPrototypes: [[// first row
	{
		id: "wgt1",
		cl: "GenericWgt",
		opt: { w: 500, h: 100, x: 0, y: 0, bgcolor: "red", rowOccupied: 0 }
	}], [// second row
	{
		id: "wgt2",
		cl: "GenericWgt",
		opt: { w: 500, h: 100, x: 0, y: 0, bgcolor: "green", rowOccupied: 1 }
	}]]
});

// Add Generic widgets
var wgt1 = new _GenericWgt2.default("wgt1", { w: 800, h: 100, x: 0, y: 0, bgcolor: "red", rowOccupied: 0 }, tableWgt);
var wgt2 = new _GenericWgt2.default("wgt2", { w: 800, h: 100, x: 0, y: 0, bgcolor: "green", rowOccupied: 1 }, tableWgt);

tableWgt.model = _data.model;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TableGeometry = __webpack_require__(2);

var _TableGeometry2 = _interopRequireDefault(_TableGeometry);

var _RowPrototype = __webpack_require__(3);

var _RowPrototype2 = _interopRequireDefault(_RowPrototype);

var _RowPrototypes = __webpack_require__(4);

var _RowPrototypes2 = _interopRequireDefault(_RowPrototypes);

var _GenericWgt = __webpack_require__(5);

var _GenericWgt2 = _interopRequireDefault(_GenericWgt);

var _JMScrollbar = __webpack_require__(6);

var _JMScrollbar2 = _interopRequireDefault(_JMScrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableWgt = function () {
	function TableWgt(id, options) {
		_classCallCheck(this, TableWgt);

		console.log("--> construct Table widget !");

		this.elem = document.getElementById("tableWgt");
		this.width = options.width;
		this.height = options.height;
		this.id = this.elem.id = id;

		this.elem.style.width = this.width + "px";
		this.elem.style.height = this.height + "px";

		this.rowPrototypes = options.rowPrototypes;
		this.globalStrokeWidth = 1;

		document.body.appendChild(this.elem);

		// Ref
		this.m_table = new _TableGeometry2.default();
		this.m_rowPrototypes = [];
		//this.m_protoClonedWgts = [];

		pushWidget(this);
	}

	_createClass(TableWgt, [{
		key: "addScrollbar",
		value: function addScrollbar(scrollbarOptions) {
			var maxContentHeight = 0;
			for (var i = 0; i < this.m_table.rows.length; i++) {
				maxContentHeight += this.m_table.rows[i].height;
			}
			this.scrollbar = new _JMScrollbar2.default(this.elem, { scrollContentWidth: this.width * 2, scrollContentHeight: maxContentHeight });
		}
	}, {
		key: "addWidget",
		value: function addWidget(wgt) {
			if (this.wgts == null) this.wgts = [];
			this.wgts.push(wgt);
		}
	}, {
		key: "getWidgetsOfRow",
		value: function getWidgetsOfRow(idx) {
			var wgts = [];

			for (var i = 0; i < this.wgts.length; i++) {
				if (this.wgts[i].rowOccupied == idx) {
					wgts.push(this.wgts[i]);
				}
			}
			return wgts;
		}
	}, {
		key: "renderRowsPrototypes",
		value: function renderRowsPrototypes() {
			for (var i = 0; i < this.m_table.rows.length; i++) {
				var div = document.createElement("div");
				div.classList.add("row");

				div.style.top = this.m_table.rows[i].top + "px";
				div.style.height = this.m_table.rows[i].height + "px";
				div.style.width = this.width + "px";

				div.setAttribute("row-index", i);

				this.elem.appendChild(div);
			}
		}
	}, {
		key: "defineGeometryAndScrollbar",
		value: function defineGeometryAndScrollbar() {
			var rowNumber = this.wgts.length; // from table widget
			var tableModel = this.model;
			var prototypesHeights = [];

			// Init heights
			for (var i = 0; i < rowNumber; i++) {
				prototypesHeights.push(this.wgts[i].height);
			}

			this.m_table.clear();

			var top = 0;

			// Init rows geometry
			for (var _i = 0; _i < tableModel.length - 1; _i++) {
				var type = parseInt(tableModel[_i + 1]["_t"]);
				var row = { // cpp: TableGeometry::Row& row
					type: null,
					top: 0,
					height: 0
				};

				row.top = top;
				row.type = type;
				row.height = prototypesHeights[type];
				top += row.height;

				this.m_table.rows.push(row);
			}

			this.renderRowsPrototypes();
			if (this.scrollbar == null) {
				// add scrollbar
				this.addScrollbar();
			}
		}
	}, {
		key: "initPrototypesAndGeometry",
		value: function initPrototypesAndGeometry() {
			var rowNumber = this.wgts.length; // from table widget
			//let tableHeight = this.height;

			this.m_rowPrototypes = []; // eq to clear()

			for (var i = 0; i < rowNumber; i++) {
				var proto = new _RowPrototype2.default();
				var protos = new _RowPrototypes2.default();

				this.m_rowPrototypes[i] = protos;

				proto.free = true;
				proto.row = -1;

				var wgts = this.getWidgetsOfRow(i);

				proto.rowWidgets = wgts;
				protos.rows.push(proto); // in runtime it's used qt "push_back"
			}

			this.scrollBy(0);
			this.scrollTo(0);
		}
	}, {
		key: "lowerBound",
		value: function lowerBound(rows, row) {
			for (var i = 0; i < rows.length; i++) {
				if (rows[i].top >= row.top) {
					if (i == 0) {
						return i;
					} else {
						return i - 1;
					}
				}
			}
		}
	}, {
		key: "checkOutOfViewPrototypes",
		value: function checkOutOfViewPrototypes(startIndex, endIndex) {
			for (var i = 0; i < this.m_rowPrototypes.length; i++) {
				var protos = this.m_rowPrototypes[i];
				for (var j = 0; j < protos.rows.length;) {
					var row = protos.rows[j];

					if (row.free) {
						break;
					}

					if (row.row < startIndex) {
						/**
       *  cpp: row.free = true;
      	UninstallRuntimeBackground(row.row);
      	row.freeRow(viewController);
      	viewController->unregisterDelegate(row.row);
      	row.row = -1;
      		protos.rows.push_back(row);
      	r = protos.rows.erase(r);
      	continue;
       */
						row.free = true;
						row.freeRow();
						//row.unregisterDelegate();
						row.row = -1;
						protos.rows.splice(j, 1, row); // cpp: protos.rows.push_back(row); ??
						//      r = protos.rows.erase(r);
						continue;
					}

					if (row.row >= endIndex) {
						for (var k = j; k < protos.rows.length; k++) {
							var _row = protos.rows[k];

							_row.free = true;
							_row.freeRow();
							//row.unregisterDelegate(); //?
							_row.row = -1;
						}
						break;
					}
					j++;
				}
				protos.iterator = 0;
			}
		}
	}, {
		key: "clone",
		value: function clone(wgts, idx) {
			var clones = [];

			console.log("--> cloning widget !");

			for (var i = 0; i < wgts.length; i++) {
				var id = wgts[i].id + idx;
				var cl = wgts[i].cl;
				var opt = wgts[i].opt;

				if (cl == "GenericWgt") {
					cl = _GenericWgt2.default;
				}

				var newInstance = new cl(id, opt, this);
				clones.push(newInstance);
			}
			return clones;
		}
	}, {
		key: "cloneRow",
		value: function cloneRow(rowType, idx) {
			var r = new _RowPrototype2.default();
			r.rowWidgets = this.clone(this.rowPrototypes[rowType], idx);
			return r;
		}
	}, {
		key: "renderRow",
		value: function renderRow(row) {
			console.log("--> row index: " + row.row);

			for (var i = 0; i < row.rowWidgets.length; i++) {
				this.elem.childNodes[row.row].appendChild(row.rowWidgets[i].elem);
			}
		}
	}, {
		key: "clonePrototypes",
		value: function clonePrototypes(startIndex, endIndex) {
			var protos = void 0;
			for (var i = startIndex; i < endIndex; i++) {

				var modelRow = this.model[i + 1];
				var rowType = parseInt(modelRow["_t"]);
				protos = this.m_rowPrototypes[rowType];

				if (protos.iterator == protos.rows.length) {
					// scanIterator
					var r = this.cloneRow(rowType, i);

					protos.rows.push(r);
					protos.iterator = protos.rows.length - 1;
				} else {
					var _row2 = protos.rows[protos.iterator];

					if (!_row2.free && _row2.row != i) {
						var lastRow = protos.rows[protos.rows.length - 1];

						if (lastRow.free) {
							protos.rows.splice(i, 0, lastRow);
							protos.rows.pop(); // cpp: protos.rows.removeLast();
						} else {
							var _r = this.cloneRow(rowType, i);

							protos.rows.splice(i, 0, _r);
						}
					}
				}

				var row = protos.rows[protos.iterator];

				var left = 0; // temp
				var top = this.m_table.rows[i].top;
				var height = this.m_table.rows[i].height;
				var width = this.width;

				var wgts = row.rowWidgets;

				var counter = 0;
				if (row.free) {
					row.free = false;
					row.row = i;

					var rowIndex = i;

					this.renderRow(row);

					// Activation datalinks, multilanguage etc.
					// ...
				}

				protos.iterator++;
			}
		}
	}, {
		key: "scrollBy",
		value: function scrollBy(scrollXPos, scrollYPos) {
			console.log("--> scrollBy() call !!");
		}
	}, {
		key: "scrollTo",
		value: function scrollTo(scrollPos) {
			console.log("--> scrollTo() call !!");

			var viewHeight = this.height;
			var tableModel = this.model;
			var lastRow = this.m_table.rows[this.m_table.rows.length - 1];

			var startPos = scrollPos - this.globalStrokeWidth; // cpp: qreal startPos = _scrollPos - mo.GetGlobalStrokeWidth() - pagePrecachedSize;
			var endPos = scrollPos + viewHeight;

			var dummyStartRow = { // cpp: TableGeometry::Row& row
				type: null,
				top: 0,
				height: 0
			};
			dummyStartRow.top = startPos;

			var startIndex = this.lowerBound(this.m_table.rows, dummyStartRow) - 0; // cpp: qLowerBound(m_table.rows, dummyStartRow) - m_table.rows.begin();
			var endIndex = startIndex;

			for (; endIndex < this.m_table.rows.length && this.m_table.rows[endIndex].top < endPos; endIndex++) {} // Computes endIndex

			console.log("--> startIndex: " + startIndex + " endIndex: " + endIndex);

			startIndex = Math.max(startIndex - 1, 0);

			this.checkOutOfViewPrototypes(startIndex, endIndex);
			this.clonePrototypes(startIndex, endIndex);
		}
	}, {
		key: "onModelChange",
		value: function onModelChange() {
			console.log("--> onModelChange() call !!");

			this.defineGeometryAndScrollbar();
			this.initPrototypesAndGeometry();
		}
	}]);

	return TableWgt;
}();

// Setter/Getter


exports.default = TableWgt;
Object.defineProperty(TableWgt.prototype, "model", {
	get: function get() {
		console.log("--> property get !");
		return this._model;
	},
	set: function set(currentModel) {
		this._model = currentModel;
		console.log("--> property set ! call onModelChange() method !");

		this.onModelChange();
	}
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableGeometry = function () {
	function TableGeometry() {
		_classCallCheck(this, TableGeometry);

		this.rows = [];
	}

	_createClass(TableGeometry, [{
		key: "clear",
		value: function clear() {
			console.log("--> clear rows !");
			this.rows = [];
		}
	}]);

	return TableGeometry;
}();

exports.default = TableGeometry;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RowPrototype = function () {
	function RowPrototype() {
		_classCallCheck(this, RowPrototype);

		this.free = true;
		this.row = 0;
		this.rowWidgets = [];
	}

	_createClass(RowPrototype, [{
		key: "freeRow",
		value: function freeRow() {
			console.log("--> freeRow !");
		}
	}]);

	return RowPrototype;
}();

exports.default = RowPrototype;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RowPrototypes = function RowPrototypes() {
	_classCallCheck(this, RowPrototypes);

	this.rows = [];
	this.iterator = -1;
};

exports.default = RowPrototypes;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GenericWgt = function GenericWgt(id, options, parentWgt) {
	_classCallCheck(this, GenericWgt);

	this.bgcolor = options.bgcolor;
	this.rowOccupied = options.rowOccupied;
	this.parentWgt = parentWgt;

	this.elem = document.createElement("div");

	this.width = options.w;
	this.height = options.h;
	this.x = options.x;
	this.y = options.y;

	this.elem.id = this.id = id;
	this.elem.style.width = options.w + "px";
	this.elem.style.height = options.h + "px";
	this.elem.style.left = options.x + "px";
	this.elem.style.top = options.y + "px";
	this.elem.style.backgroundColor = this.bgcolor;
	this.elem.classList.add("wgt");
	this.elem.appendChild(document.createTextNode("" + this.id));

	this.parentWgt.addWidget(this);
};

exports.default = GenericWgt;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultSettings = function defaultSettings() {
	return {
		handlers: ["keyboard"],
		xRailHeight: 15,
		yRailWidth: 15,
		scrollXPos: 0,
		scrollYPos: 0,
		minScrollbarLength: 30
	};
};

var JMScrollbar = function () {
	function JMScrollbar(element, options) {
		_classCallCheck(this, JMScrollbar);

		console.log("--> scrollbar constructor !");

		this.container = element;
		this.containerWidth = parseFloat(element.style.width);
		this.containerHeight = parseFloat(element.style.height);

		// Default settings
		this.settings = defaultSettings();

		this.setOptions(options);
		this.appendRailsAndThumbs();
		this.bindEvents();
	}

	_createClass(JMScrollbar, [{
		key: "bindEvents",
		value: function bindEvents() {
			for (var key in this.settings.handlers) {
				switch (this.settings.handlers[key]) {
					case "keyboard":
						this.bindKeyboardEvent(this);
						break;
				}
			}
		}
	}, {
		key: "setOptions",
		value: function setOptions(options) {
			for (var opt in options) {
				this[opt] = options[opt];
			}
		}
	}, {
		key: "getThumbSize",
		value: function getThumbSize(size) {
			return parseInt(Math.max(this.settings.minScrollbarLength, size));
		}
	}, {
		key: "setStyles",
		value: function setStyles(xRail, yRail, xRailThumb, yRailThumb) {
			var xRailDim = {
				w: this.containerWidth,
				h: this.settings.xRailHeight,
				left: 0,
				bottom: 0
			};
			var yRailDim = {
				w: this.settings.yRailWidth,
				h: this.containerHeight,
				top: 0,
				right: 0
			};

			// Rails
			xRail.style.width = xRailDim.w + "px";
			xRail.style.height = xRailDim.h + "px";
			xRail.style.left = xRailDim.left + "px";
			xRail.style.bottom = xRailDim.bottom + "px";
			yRail.style.width = yRailDim.w + "px";
			yRail.style.height = yRailDim.h + "px";
			yRail.style.top = yRailDim.top + "px";
			yRail.style.right = yRailDim.right + "px";

			// Thumbs
			xRailThumb.style.width = this.getThumbSize(this.containerWidth * this.containerWidth / this.scrollContentWidth) + "px";
			xRailThumb.style.height = xRailDim.h + "px";
			yRailThumb.style.width = yRailDim.w + "px";
			yRailThumb.style.height = this.getThumbSize(this.containerHeight * this.containerHeight / this.scrollContentHeight) + "px";

			this.railX = {
				el: xRail,
				h: xRailDim.h,
				left: xRailDim.left,
				bottom: xRailDim.bottom
			};
			this.railY = {
				el: yRail,
				w: yRailDim.w,
				top: yRailDim.top,
				right: yRailDim.right
			};
			this.thumbX = {
				el: xRailThumb,
				len: parseFloat(xRailThumb.style.width)
			};
			this.thumbY = {
				el: yRailThumb,
				len: parseFloat(yRailThumb.style.height)
			};
		}
	}, {
		key: "appendRailsAndThumbs",
		value: function appendRailsAndThumbs() {
			var xRail = document.createElement("div");
			var yRail = document.createElement("div");
			var xRailThumb = document.createElement("div");
			var yRailThumb = document.createElement("div");

			xRail.classList.add("x-rail");
			yRail.classList.add("y-rail");
			xRailThumb.classList.add("x-rail-thumb");
			yRailThumb.classList.add("y-rail-thumb");

			this.setStyles(xRail, yRail, xRailThumb, yRailThumb);

			xRail.appendChild(xRailThumb);
			yRail.appendChild(yRailThumb);
			this.container.appendChild(xRail);
			this.container.appendChild(yRail);
		}
	}, {
		key: "updateGeometry",
		value: function updateGeometry(i) {
			console.log("--> update geometry");

			i.railX.el.style.bottom = i.railX.bottom - i.container.scrollTop + "px";
			i.railX.el.style.left = i.railX.left + i.container.scrollLeft + "px";
			i.railY.el.style.right = i.railY.right - i.container.scrollLeft + "px";
			i.railY.el.style.top = i.railY.top + i.container.scrollTop + "px";

			var scrollbarYTop = i.container.scrollTop * (i.thumbY.len - this.containerHeight) / (i.scrollContentHeight - this.containerHeight);
			var scrollbarXLeft = i.container.scrollLeft * (i.thumbY.len - this.containerWidth) / (i.scrollContentWidth - this.containerWidth);

			i.thumbY.el.style.top = -scrollbarYTop + "px";
			i.thumbX.el.style.left = -scrollbarXLeft + "px";
		}
	}, {
		key: "bindKeyboardEvent",
		value: function bindKeyboardEvent(i) {
			var _this = this;

			document.addEventListener("keydown", function (e) {
				e.preventDefault();

				console.log("--> keycode: " + e.keyCode);

				var deltaX = 0;
				var deltaY = 0;

				switch (e.keyCode) {
					case 37:
						// left
						deltaX = -30;
						break;
					case 38:
						// up
						deltaY = 30;
						break;
					case 39:
						// right
						deltaX = 30;
						break;
					case 40:
						// down
						deltaY = -30;
						break;
				}

				_this.container.scrollTop -= deltaY;
				_this.container.scrollLeft += deltaX;
				_this.updateGeometry(i);
			});
		}
	}]);

	return JMScrollbar;
}();

exports.default = JMScrollbar;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
   value: true
});
var model = [];

model[0] = {
   _h: [[["value"], ["text"]], // Row type 0
   [["text"], ["value"]], // Row type 1
   [["fill"], ["fill"]], // Row type 2
   [["btn.fill"], ["btn.fill"]], // Row type 3
   [["stroke-width"], ["fill"]] // Row type 4
   ]
};
model[1] = {
   _t: 0,
   _v: ["10", "This is a Label widget"]
};
model[2] = {
   _t: 1,
   _v: ["This is an other Label widget", "55"]
};
model[3] = {
   _t: 0,
   _v: ["rgb(255,0,0)", "rgb(0,255,0)"]
};
model[4] = {
   _t: 0,
   _v: ["#ff0000", "#00ff00"]
};
model[5] = {
   _t: 1,
   _v: ["#00ff00", "#ffff00"]
};

exports.model = model;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map