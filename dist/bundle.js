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
		opt: { w: 500, h: 140, x: 0, y: 0, bgcolor: "green", rowOccupied: 1 }
	}]]
});

// Add Generic widgets
var wgt1 = new _GenericWgt2.default("wgt1", { w: 800, h: 100, x: 0, y: 0, bgcolor: "red", rowOccupied: 0 }, tableWgt);
var wgt2 = new _GenericWgt2.default("wgt2", { w: 800, h: 140, x: 0, y: 0, bgcolor: "green", rowOccupied: 1 }, tableWgt);

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

var _perfectScrollbar = __webpack_require__(6);

var _perfectScrollbar2 = _interopRequireDefault(_perfectScrollbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableWgt = function () {
	function TableWgt(id, options) {
		_classCallCheck(this, TableWgt);

		console.log("--> construct Table widget !");

		this.elem = document.getElementById("tableWgt");
		this.width = options.width;
		this.height = options.height;
		this.left = options.left;
		this.top = options.top;
		this.id = this.elem.id = id;
		this.clusterSize = 4;

		this.elem.style.width = this.width + "px";
		this.elem.style.height = this.height + "px";

		this.rowPrototypes = options.rowPrototypes;
		this.globalStrokeWidth = 1;

		document.body.appendChild(this.elem);

		// Ref
		this.m_table = new _TableGeometry2.default();
		this.m_rowPrototypes = [];

		pushWidget(this);
	}

	_createClass(TableWgt, [{
		key: "addScrollbar",
		value: function addScrollbar(scrollbarOptions) {
			var _this = this;

			var maxContentHeight = 0;
			for (var i = 0; i < this.m_table.rows.length; i++) {
				maxContentHeight += this.m_table.rows[i].height;
			}

			this.scrollbar = new _perfectScrollbar2.default(this.elem);

			this.elem.addEventListener("ps-scroll-y", function () {
				clearTimeout(_this.timer);
				_this.scrollTo(_this.elem.scrollTop);
			});
		}
	}, {
		key: "addWidget",
		value: function addWidget(wgt) {
			if (this.wgts == null) this.wgts = [];
			this.wgts.push(wgt);
		}

		/**
   * @param  {} idx
   */

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
			var totalHeight = 0;

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

				totalHeight += row.height;
			}

			// render a contentArea
			var div = document.createElement("div");
			div.id = this.id + "_contentArea";
			div.style.height = totalHeight + "px";
			this.elem.appendChild(div);

			if (this.scrollbar == null) {
				// add scrollbar
				this.addScrollbar();
			}
		}
	}, {
		key: "initPrototypesAndGeometry",
		value: function initPrototypesAndGeometry() {
			var rowNumber = this.wgts.length; // from table widget

			this.m_rowPrototypes = [];

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
				if (rows[i].top > row.top) {
					return i;
				}
			}
		}

		/**
   * @param  {} startIndex
   * @param  {} endIndex
   */

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
						row.free = true;
						row.freeRow(); // do nothing by now ?? doubt
						row.row = -1;
						protos.rows.push(row);
						protos.rows.shift();
						continue;
					}

					if (row.row >= endIndex) {
						for (var k = j; k < protos.rows.length; k++) {
							var _row = protos.rows[k];

							_row.free = true;
							_row.freeRow(); // do nothing by now ?? doubt
							_row.row = -1;
						}
						break;
					}
					j++;
				}
				protos.iterator = 0;
			}
		}

		/**
   * @param  {} rowType
   * @param  {} idx
   */

	}, {
		key: "cloneRow",
		value: function cloneRow(rowType, idx) {
			var r = new _RowPrototype2.default();
			var wgts = this.rowPrototypes[rowType];

			for (var i = 0; i < wgts.length; i++) {
				var id = wgts[i].id + idx;
				var cl = wgts[i].cl;
				var opt = wgts[i].opt;

				// Hard code
				if (cl == "GenericWgt") {
					cl = _GenericWgt2.default;
				}

				r.rowWidgets.push(new cl(id, opt, this));
			}
			return r;
		}
	}, {
		key: "deleteRowElements",
		value: function deleteRowElements() {
			var contentArea = document.getElementById(this.id + "_contentArea");
			var childrenLen = contentArea.childNodes.length;
			for (var i = 0; i < childrenLen; i++) {
				contentArea.removeChild(contentArea.firstChild);
			}
		}

		/**
   * @param  {} rows
   */

	}, {
		key: "renderRowElements",
		value: function renderRowElements(rows) {
			var contentArea = document.getElementById(this.id + "_contentArea");
			var fragment = document.createDocumentFragment();

			for (var row in rows) {
				var proto = rows[row];
				var rowElem = document.createElement("div");

				rowElem.classList.add("row");

				// bounds
				rowElem.style.width = this.width + "px";
				rowElem.style.height = this.m_table.rows[proto.row].height + "px";
				rowElem.style.left = this.elem.scrollLeft + "px";
				rowElem.style.top = this.m_table.rows[proto.row].top + "px";

				// append widgets
				for (var j = 0; j < proto.rowWidgets.length; j++) {
					rowElem.appendChild(proto.rowWidgets[j].elem);
				}

				fragment.appendChild(rowElem);
			}
			contentArea.appendChild(fragment);
		}

		/**
   * @param  {} startIndex
   * @param  {} endIndex
   */

	}, {
		key: "clonePrototypes",
		value: function clonePrototypes(startIndex, endIndex) {
			var isChanged = false;
			var rowsToRender = [];

			for (var i = startIndex; i < endIndex; i++) {

				var modelRow = this.model[i + 1];
				var rowType = parseInt(modelRow["_t"]);
				var protos = this.m_rowPrototypes[rowType];

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
							var _r = this.cloneRow(rowType, i); // reinstance with used id !!!

							protos.rows.pop();
							protos.rows.unshift(_r);
						} else {
							var _r2 = this.cloneRow(rowType, i);

							protos.rows.splice(protos.iterator, 0, _r2); // replace row proto
						}
					}
				}

				var row = protos.rows[protos.iterator];

				if (row.free) {
					row.free = false;
					row.row = i;
					isChanged = true;
				}

				rowsToRender.push(row);
				protos.iterator++;
			}

			if (isChanged) {

				// Log
				console.log("------------- indexes in view:");
				for (var _i2 = startIndex; _i2 < endIndex; _i2++) {
					console.log("" + _i2);
				}
				console.log("------------------------------");

				this.deleteRowElements();
				this.renderRowElements(rowsToRender);
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

			var startPos = scrollPos - this.globalStrokeWidth; // cpp: qreal startPos = _scrollPos - mo.GetGlobalStrokeWidth() - pagePrecachedSize; ?? doubt
			var endPos = scrollPos + viewHeight;

			var dummyStartRow = { // cpp: TableGeometry::Row& row
				type: null,
				top: 0,
				height: 0
			};
			dummyStartRow.top = startPos;

			var startIndex = this.lowerBound(this.m_table.rows, dummyStartRow); // cpp: qLowerBound(m_table.rows, dummyStartRow) - m_table.rows.begin();
			var endIndex = startIndex;

			for (; endIndex < this.m_table.rows.length && this.m_table.rows[endIndex].top < endPos; endIndex++) {} // Computes endIndex 

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
		return this._model;
	},
	set: function set(currentModel) {
		this._model = currentModel;
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
			// this.rowWidgets = [];
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
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * perfect-scrollbar v1.3.0
 * (c) 2018 Hyunje Jun
 * @license MIT
 */
(function (global, factory) {
  ( false ? undefined : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
})(undefined, function () {
  'use strict';

  function get(element) {
    return getComputedStyle(element);
  }

  function set(element, obj) {
    for (var key in obj) {
      var val = obj[key];
      if (typeof val === 'number') {
        val = val + "px";
      }
      element.style[key] = val;
    }
    return element;
  }

  function div(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
  }

  var elMatches = typeof Element !== 'undefined' && (Element.prototype.matches || Element.prototype.webkitMatchesSelector || Element.prototype.msMatchesSelector);

  function matches(element, query) {
    if (!elMatches) {
      throw new Error('No element matching method supported');
    }

    return elMatches.call(element, query);
  }

  function remove(element) {
    if (element.remove) {
      element.remove();
    } else {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }

  function queryChildren(element, selector) {
    return Array.prototype.filter.call(element.children, function (child) {
      return matches(child, selector);
    });
  }

  var cls = {
    main: 'ps',
    element: {
      thumb: function thumb(x) {
        return "ps__thumb-" + x;
      },
      rail: function rail(x) {
        return "ps__rail-" + x;
      },
      consuming: 'ps__child--consume'
    },
    state: {
      focus: 'ps--focus',
      clicking: 'ps--clicking',
      active: function active(x) {
        return "ps--active-" + x;
      },
      scrolling: function scrolling(x) {
        return "ps--scrolling-" + x;
      }
    }
  };

  /*
   * Helper methods
   */
  var scrollingClassTimeout = { x: null, y: null };

  function addScrollingClass(i, x) {
    var classList = i.element.classList;
    var className = cls.state.scrolling(x);

    if (classList.contains(className)) {
      clearTimeout(scrollingClassTimeout[x]);
    } else {
      classList.add(className);
    }
  }

  function removeScrollingClass(i, x) {
    scrollingClassTimeout[x] = setTimeout(function () {
      return i.isAlive && i.element.classList.remove(cls.state.scrolling(x));
    }, i.settings.scrollingThreshold);
  }

  function setScrollingClassInstantly(i, x) {
    addScrollingClass(i, x);
    removeScrollingClass(i, x);
  }

  var EventElement = function EventElement(element) {
    this.element = element;
    this.handlers = {};
  };

  var prototypeAccessors = { isEmpty: { configurable: true } };

  EventElement.prototype.bind = function bind(eventName, handler) {
    if (typeof this.handlers[eventName] === 'undefined') {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
    this.element.addEventListener(eventName, handler, false);
  };

  EventElement.prototype.unbind = function unbind(eventName, target) {
    var this$1 = this;

    this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
      if (target && handler !== target) {
        return true;
      }
      this$1.element.removeEventListener(eventName, handler, false);
      return false;
    });
  };

  EventElement.prototype.unbindAll = function unbindAll() {
    var this$1 = this;

    for (var name in this$1.handlers) {
      this$1.unbind(name);
    }
  };

  prototypeAccessors.isEmpty.get = function () {
    var this$1 = this;

    return Object.keys(this.handlers).every(function (key) {
      return this$1.handlers[key].length === 0;
    });
  };

  Object.defineProperties(EventElement.prototype, prototypeAccessors);

  var EventManager = function EventManager() {
    this.eventElements = [];
  };

  EventManager.prototype.eventElement = function eventElement(element) {
    var ee = this.eventElements.filter(function (ee) {
      return ee.element === element;
    })[0];
    if (!ee) {
      ee = new EventElement(element);
      this.eventElements.push(ee);
    }
    return ee;
  };

  EventManager.prototype.bind = function bind(element, eventName, handler) {
    this.eventElement(element).bind(eventName, handler);
  };

  EventManager.prototype.unbind = function unbind(element, eventName, handler) {
    var ee = this.eventElement(element);
    ee.unbind(eventName, handler);

    if (ee.isEmpty) {
      // remove
      this.eventElements.splice(this.eventElements.indexOf(ee), 1);
    }
  };

  EventManager.prototype.unbindAll = function unbindAll() {
    this.eventElements.forEach(function (e) {
      return e.unbindAll();
    });
    this.eventElements = [];
  };

  EventManager.prototype.once = function once(element, eventName, handler) {
    var ee = this.eventElement(element);
    var onceHandler = function onceHandler(evt) {
      ee.unbind(eventName, onceHandler);
      handler(evt);
    };
    ee.bind(eventName, onceHandler);
  };

  function createEvent(name) {
    if (typeof window.CustomEvent === 'function') {
      return new CustomEvent(name);
    } else {
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(name, false, false, undefined);
      return evt;
    }
  }

  var processScrollDiff = function processScrollDiff(i, axis, diff, useScrollingClass, forceFireReachEvent) {
    if (useScrollingClass === void 0) useScrollingClass = true;
    if (forceFireReachEvent === void 0) forceFireReachEvent = false;

    var fields;
    if (axis === 'top') {
      fields = ['contentHeight', 'containerHeight', 'scrollTop', 'y', 'up', 'down'];
    } else if (axis === 'left') {
      fields = ['contentWidth', 'containerWidth', 'scrollLeft', 'x', 'left', 'right'];
    } else {
      throw new Error('A proper axis should be provided');
    }

    processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
  };

  function processScrollDiff$1(i, diff, ref, useScrollingClass, forceFireReachEvent) {
    var contentHeight = ref[0];
    var containerHeight = ref[1];
    var scrollTop = ref[2];
    var y = ref[3];
    var up = ref[4];
    var down = ref[5];
    if (useScrollingClass === void 0) useScrollingClass = true;
    if (forceFireReachEvent === void 0) forceFireReachEvent = false;

    var element = i.element;

    // reset reach
    i.reach[y] = null;

    // 1 for subpixel rounding
    if (element[scrollTop] < 1) {
      i.reach[y] = 'start';
    }

    // 1 for subpixel rounding
    if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
      i.reach[y] = 'end';
    }

    if (diff) {
      element.dispatchEvent(createEvent("ps-scroll-" + y));

      if (diff < 0) {
        element.dispatchEvent(createEvent("ps-scroll-" + up));
      } else if (diff > 0) {
        element.dispatchEvent(createEvent("ps-scroll-" + down));
      }

      if (useScrollingClass) {
        setScrollingClassInstantly(i, y);
      }
    }

    if (i.reach[y] && (diff || forceFireReachEvent)) {
      element.dispatchEvent(createEvent("ps-" + y + "-reach-" + i.reach[y]));
    }
  }

  function toInt(x) {
    return parseInt(x, 10) || 0;
  }

  function isEditable(el) {
    return matches(el, 'input,[contenteditable]') || matches(el, 'select,[contenteditable]') || matches(el, 'textarea,[contenteditable]') || matches(el, 'button,[contenteditable]');
  }

  function outerWidth(element) {
    var styles = get(element);
    return toInt(styles.width) + toInt(styles.paddingLeft) + toInt(styles.paddingRight) + toInt(styles.borderLeftWidth) + toInt(styles.borderRightWidth);
  }

  var env = {
    isWebKit: typeof document !== 'undefined' && 'WebkitAppearance' in document.documentElement.style,
    supportsTouch: typeof window !== 'undefined' && ('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch),
    supportsIePointer: typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
    isChrome: typeof navigator !== 'undefined' && /Chrome/i.test(navigator && navigator.userAgent)
  };

  var updateGeometry = function updateGeometry(i) {
    var element = i.element;

    i.containerWidth = element.clientWidth;
    i.containerHeight = element.clientHeight;
    i.contentWidth = i.settings.scrollContentWidth != null ? i.settings.scrollContentWidth : element.scrollWidth;
    i.contentHeight = i.settings.scrollContentHeight != null ? i.settings.scrollContentHeight : element.scrollHeight;

    if (!element.contains(i.scrollbarXRail)) {
      // clean up and append
      queryChildren(element, cls.element.rail('x')).forEach(function (el) {
        return remove(el);
      });
      document.body.appendChild(i.scrollbarXRail);
    }
    if (!element.contains(i.scrollbarYRail)) {
      // clean up and append
      queryChildren(element, cls.element.rail('y')).forEach(function (el) {
        return remove(el);
      });
      document.body.appendChild(i.scrollbarYRail);
    }

    if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
      i.scrollbarXActive = true;
      i.railXWidth = i.containerWidth - i.railXMarginWidth;
      i.railXRatio = i.containerWidth / i.railXWidth;
      i.scrollbarXWidth = getThumbSize(i, toInt(i.railXWidth * i.containerWidth / i.contentWidth));
      i.scrollbarXLeft = toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
    } else {
      i.scrollbarXActive = false;
    }

    if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
      i.scrollbarYActive = true;
      i.railYHeight = i.containerHeight - i.railYMarginHeight;
      i.railYRatio = i.containerHeight / i.railYHeight;
      i.scrollbarYHeight = getThumbSize(i, toInt(i.railYHeight * i.containerHeight / i.contentHeight));
      i.scrollbarYTop = toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
    } else {
      i.scrollbarYActive = false;
    }

    if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
      i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
    }
    if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
      i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
    }

    updateCss(element, i);

    if (i.scrollbarXActive) {
      i.scrollbarXRail.classList.add(cls.state.active('x'));
    } else {
      i.scrollbarXRail.classList.remove(cls.state.active('x'));
      i.scrollbarXWidth = 0;
      i.scrollbarXLeft = 0;
      element.scrollLeft = 0;
    }
    if (i.scrollbarYActive) {
      i.scrollbarYRail.classList.add(cls.state.active('y'));
    } else {
      i.scrollbarYRail.classList.remove(cls.state.active('y'));
      i.scrollbarYHeight = 0;
      i.scrollbarYTop = 0;
      element.scrollTop = 0;
    }
  };

  function getThumbSize(i, thumbSize) {
    if (i.settings.minScrollbarLength) {
      thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
    }
    if (i.settings.maxScrollbarLength) {
      thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
    }
    return thumbSize;
  }

  function updateCss(element, i) {
    var xRailOffset = { width: i.railXWidth };
    if (i.isRtl) {
      xRailOffset.left = i.containerLeft;
      // i.negativeScrollAdjustment +
      // element.scrollLeft +
      // i.containerWidth -
      // i.contentWidth;
    } else {
      xRailOffset.left = i.containerLeft; // + element.scrollLeft;
    }
    if (i.isScrollbarXUsingBottom) {
      xRailOffset.bottom = window.innerHeight - i.containerTop - i.containerHeight; // i.scrollbarXBottom - element.scrollTop; fixed position !!
    } else {
      xRailOffset.top = i.containerTop + i.containerHeight; // + i.scrollbarXTop + element.scrollTop; fixed position !!
    }
    set(i.scrollbarXRail, xRailOffset);

    var yRailOffset = { top: element.scrollTop, height: i.railYHeight };
    if (i.isScrollbarYUsingRight) {
      if (i.isRtl) {
        yRailOffset.right = window.innerWidth - i.containerLeft - i.containerWidth; // -
        // i.contentWidth -
        // (i.negativeScrollAdjustment + element.scrollLeft) -
        // i.scrollbarYRight -
        // i.scrollbarYOuterWidth;
      } else {
        yRailOffset.right = window.innerWidth - i.containerLeft - i.containerWidth; // + i.scrollbarYRight - element.scrollLeft;
      }
    } else {
      if (i.isRtl) {
        yRailOffset.left = i.containerLeft + i.containerWidth; // +
        // i.negativeScrollAdjustment +
        // element.scrollLeft +
        // i.containerWidth * 2 -
        // i.contentWidth -
        // i.scrollbarYLeft -
        // i.scrollbarYOuterWidth;
      } else {
        yRailOffset.left = i.containerLeft + i.containerWidth; // + i.scrollbarYLeft + element.scrollLeft;
      }
    }
    yRailOffset.top = i.containerTop;

    set(i.scrollbarYRail, yRailOffset);

    set(i.scrollbarX, {
      left: i.scrollbarXLeft,
      width: i.scrollbarXWidth - i.railBorderXWidth
    });
    set(i.scrollbarY, {
      top: i.scrollbarYTop,
      height: i.scrollbarYHeight - i.railBorderYWidth
    });
  }

  var clickRail = function clickRail(i) {
    i.event.bind(i.scrollbarY, 'mousedown', function (e) {
      return e.stopPropagation();
    });
    i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
      var positionTop = e.pageY - window.pageYOffset - i.scrollbarYRail.getBoundingClientRect().top;
      var direction = positionTop > i.scrollbarYTop ? 1 : -1;

      i.element.scrollTop += direction * i.containerHeight;
      updateGeometry(i);

      e.stopPropagation();
    });

    i.event.bind(i.scrollbarX, 'mousedown', function (e) {
      return e.stopPropagation();
    });
    i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
      var positionLeft = e.pageX - window.pageXOffset - i.scrollbarXRail.getBoundingClientRect().left;
      var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

      i.element.scrollLeft += direction * i.containerWidth;
      updateGeometry(i);

      e.stopPropagation();
    });
  };

  var dragThumb = function dragThumb(i) {
    bindMouseScrollHandler(i, ['containerWidth', 'contentWidth', 'pageX', 'railXWidth', 'scrollbarX', 'scrollbarXWidth', 'scrollLeft', 'x', 'scrollbarXRail']);
    bindMouseScrollHandler(i, ['containerHeight', 'contentHeight', 'pageY', 'railYHeight', 'scrollbarY', 'scrollbarYHeight', 'scrollTop', 'y', 'scrollbarYRail']);
  };

  function bindMouseScrollHandler(i, ref) {
    var containerHeight = ref[0];
    var contentHeight = ref[1];
    var pageY = ref[2];
    var railYHeight = ref[3];
    var scrollbarY = ref[4];
    var scrollbarYHeight = ref[5];
    var scrollTop = ref[6];
    var y = ref[7];
    var scrollbarYRail = ref[8];

    var element = i.element;

    var startingScrollTop = null;
    var startingMousePageY = null;
    var scrollBy = null;

    function mouseMoveHandler(e) {
      element[scrollTop] = startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
      addScrollingClass(i, y);
      updateGeometry(i);

      e.stopPropagation();
      e.preventDefault();
    }

    function mouseUpHandler() {
      removeScrollingClass(i, y);
      i[scrollbarYRail].classList.remove(cls.state.clicking);
      i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    }

    i.event.bind(i[scrollbarY], 'mousedown', function (e) {
      startingScrollTop = element[scrollTop];
      startingMousePageY = e[pageY];
      scrollBy = (i[contentHeight] - i[containerHeight]) / (i[railYHeight] - i[scrollbarYHeight]);

      i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
      i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

      i[scrollbarYRail].classList.add(cls.state.clicking);

      e.stopPropagation();
      e.preventDefault();
    });
  }

  var keyboard = function keyboard(i) {
    var element = i.element;

    var elementHovered = function elementHovered() {
      return matches(element, ':hover');
    };
    var scrollbarFocused = function scrollbarFocused() {
      return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus');
    };

    function shouldPreventDefault(deltaX, deltaY) {
      var scrollTop = element.scrollTop;
      if (deltaX === 0) {
        if (!i.scrollbarYActive) {
          return false;
        }
        if (scrollTop === 0 && deltaY > 0 || scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0) {
          return !i.settings.wheelPropagation;
        }
      }

      var scrollLeft = element.scrollLeft;
      if (deltaY === 0) {
        if (!i.scrollbarXActive) {
          return false;
        }
        if (scrollLeft === 0 && deltaX < 0 || scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0) {
          return !i.settings.wheelPropagation;
        }
      }
      return true;
    }

    i.event.bind(i.ownerDocument, 'keydown', function (e) {
      if (e.isDefaultPrevented && e.isDefaultPrevented() || e.defaultPrevented) {
        return;
      }

      if (!elementHovered() && !scrollbarFocused()) {
        return;
      }

      var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
      if (activeElement) {
        if (activeElement.tagName === 'IFRAME') {
          activeElement = activeElement.contentDocument.activeElement;
        } else {
          // go deeper if element is a webcomponent
          while (activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
          }
        }
        if (isEditable(activeElement)) {
          return;
        }
      }

      var deltaX = 0;
      var deltaY = 0;

      switch (e.which) {
        case 37:
          // left
          if (e.metaKey) {
            deltaX = -i.contentWidth;
          } else if (e.altKey) {
            deltaX = -i.containerWidth;
          } else {
            deltaX = -30;
          }
          break;
        case 38:
          // up
          if (e.metaKey) {
            deltaY = i.contentHeight;
          } else if (e.altKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = 30;
          }
          break;
        case 39:
          // right
          if (e.metaKey) {
            deltaX = i.contentWidth;
          } else if (e.altKey) {
            deltaX = i.containerWidth;
          } else {
            deltaX = 30;
          }
          break;
        case 40:
          // down
          if (e.metaKey) {
            deltaY = -i.contentHeight;
          } else if (e.altKey) {
            deltaY = -i.containerHeight;
          } else {
            deltaY = -30;
          }
          break;
        case 32:
          // space bar
          if (e.shiftKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = -i.containerHeight;
          }
          break;
        case 33:
          // page up
          deltaY = i.containerHeight;
          break;
        case 34:
          // page down
          deltaY = -i.containerHeight;
          break;
        case 36:
          // home
          deltaY = i.contentHeight;
          break;
        case 35:
          // end
          deltaY = -i.contentHeight;
          break;
        default:
          return;
      }

      if (i.settings.suppressScrollX && deltaX !== 0) {
        return;
      }
      if (i.settings.suppressScrollY && deltaY !== 0) {
        return;
      }

      element.scrollTop -= deltaY;
      element.scrollLeft += deltaX;
      updateGeometry(i);

      if (shouldPreventDefault(deltaX, deltaY)) {
        e.preventDefault();
      }
    });
  };

  var wheel = function wheel(i) {
    var element = i.element;

    function shouldPreventDefault(deltaX, deltaY) {
      var isTop = element.scrollTop === 0;
      var isBottom = element.scrollTop + element.offsetHeight === (i.settings.scrollContentHeight != null ? i.settings.scrollContentHeight : element.scrollHeight);
      var isLeft = element.scrollLeft === 0;
      var isRight = element.scrollLeft + element.offsetWidth === (i.settings.scrollContentWidth != null ? i.settings.scrollContentWidth : element.scrollWidth);

      var hitsBound;

      // pick axis with primary direction
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        hitsBound = isTop || isBottom;
      } else {
        hitsBound = isLeft || isRight;
      }

      return hitsBound ? !i.settings.wheelPropagation : true;
    }

    function getDeltaFromEvent(e) {
      var deltaX = e.deltaX;
      var deltaY = -1 * e.deltaY;

      if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
        // OS X Safari
        deltaX = -1 * e.wheelDeltaX / 6;
        deltaY = e.wheelDeltaY / 6;
      }

      if (e.deltaMode && e.deltaMode === 1) {
        // Firefox in deltaMode 1: Line scrolling
        deltaX *= 10;
        deltaY *= 10;
      }

      if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
          // IE in some mouse drivers
          deltaX = 0;
          deltaY = e.wheelDelta;
        }

      if (e.shiftKey) {
        // reverse axis with shift key
        return [-deltaY, -deltaX];
      }
      return [deltaX, deltaY];
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      // FIXME: this is a workaround for <select> issue in FF and IE #571
      if (!env.isWebKit && element.querySelector('select:focus')) {
        return true;
      }

      if (!element.contains(target)) {
        return false;
      }

      var cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        var style = get(cursor);
        var overflow = [style.overflow, style.overflowX, style.overflowY].join('');

        // if scrollable
        if (overflow.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (!(cursor.scrollTop === 0 && deltaY > 0) && !(cursor.scrollTop === maxScrollTop && deltaY < 0)) {
              return true;
            }
          }
          var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (!(cursor.scrollLeft === 0 && deltaX < 0) && !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function mousewheelHandler(e) {
      var ref = getDeltaFromEvent(e);
      var deltaX = ref[0];
      var deltaY = ref[1];

      if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
        return;
      }

      var shouldPrevent = false;
      if (!i.settings.useBothWheelAxes) {
        // deltaX will only be used for horizontal scrolling and deltaY will
        // only be used for vertical scrolling - this is the default
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else if (i.scrollbarYActive && !i.scrollbarXActive) {
        // only vertical scrollbar is active and useBothWheelAxes option is
        // active, so let's scroll vertical bar using both mouse wheel axes
        if (deltaY) {
          element.scrollTop -= deltaY * i.settings.wheelSpeed;
        } else {
          element.scrollTop += deltaX * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      } else if (i.scrollbarXActive && !i.scrollbarYActive) {
        // useBothWheelAxes and only horizontal bar is active, so use both
        // wheel axes for horizontal bar
        if (deltaX) {
          element.scrollLeft += deltaX * i.settings.wheelSpeed;
        } else {
          element.scrollLeft -= deltaY * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      }

      updateGeometry(i);

      shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
      if (shouldPrevent && !e.ctrlKey) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    if (typeof window.onwheel !== 'undefined') {
      i.event.bind(element, 'wheel', mousewheelHandler);
    } else if (typeof window.onmousewheel !== 'undefined') {
      i.event.bind(element, 'mousewheel', mousewheelHandler);
    }
  };

  var touch = function touch(i) {
    if (!env.supportsTouch && !env.supportsIePointer) {
      return;
    }

    var element = i.element;

    function shouldPrevent(deltaX, deltaY) {
      var scrollTop = element.scrollTop;
      var scrollLeft = element.scrollLeft;
      var magnitudeX = Math.abs(deltaX);
      var magnitudeY = Math.abs(deltaY);

      if (magnitudeY > magnitudeX) {
        // user is perhaps trying to swipe up/down the page

        if (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight || deltaY > 0 && scrollTop === 0) {
          // set prevent for mobile Chrome refresh
          return window.scrollY === 0 && deltaY > 0 && env.isChrome;
        }
      } else if (magnitudeX > magnitudeY) {
        // user is perhaps trying to swipe left/right across the page

        if (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth || deltaX > 0 && scrollLeft === 0) {
          return true;
        }
      }

      return true;
    }

    function applyTouchMove(differenceX, differenceY) {
      element.scrollTop -= differenceY;
      element.scrollLeft -= differenceX;

      updateGeometry(i);
    }

    var startOffset = {};
    var startTime = 0;
    var speed = {};
    var easingLoop = null;

    function getTouch(e) {
      if (e.targetTouches) {
        return e.targetTouches[0];
      } else {
        // Maybe IE pointer
        return e;
      }
    }

    function shouldHandle(e) {
      if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
        return false;
      }
      if (e.targetTouches && e.targetTouches.length === 1) {
        return true;
      }
      if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
        return true;
      }
      return false;
    }

    function touchStart(e) {
      if (!shouldHandle(e)) {
        return;
      }

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = new Date().getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      if (!element.contains(target)) {
        return false;
      }

      var cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        var style = get(cursor);
        var overflow = [style.overflow, style.overflowX, style.overflowY].join('');

        // if scrollable
        if (overflow.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (!(cursor.scrollTop === 0 && deltaY > 0) && !(cursor.scrollTop === maxScrollTop && deltaY < 0)) {
              return true;
            }
          }
          var maxScrollLeft = cursor.scrollLeft - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (!(cursor.scrollLeft === 0 && deltaX < 0) && !(cursor.scrollLeft === maxScrollLeft && deltaX > 0)) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function touchMove(e) {
      if (shouldHandle(e)) {
        var touch = getTouch(e);

        var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

        var differenceX = currentOffset.pageX - startOffset.pageX;
        var differenceY = currentOffset.pageY - startOffset.pageY;

        if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
          return;
        }

        applyTouchMove(differenceX, differenceY);
        startOffset = currentOffset;

        var currentTime = new Date().getTime();

        var timeGap = currentTime - startTime;
        if (timeGap > 0) {
          speed.x = differenceX / timeGap;
          speed.y = differenceY / timeGap;
          startTime = currentTime;
        }

        if (shouldPrevent(differenceX, differenceY)) {
          e.preventDefault();
        }
      }
    }
    function touchEnd() {
      if (i.settings.swipeEasing) {
        clearInterval(easingLoop);
        easingLoop = setInterval(function () {
          if (i.isInitialized) {
            clearInterval(easingLoop);
            return;
          }

          if (!speed.x && !speed.y) {
            clearInterval(easingLoop);
            return;
          }

          if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
            clearInterval(easingLoop);
            return;
          }

          applyTouchMove(speed.x * 30, speed.y * 30);

          speed.x *= 0.8;
          speed.y *= 0.8;
        }, 10);
      }
    }

    if (env.supportsTouch) {
      i.event.bind(element, 'touchstart', touchStart);
      i.event.bind(element, 'touchmove', touchMove);
      i.event.bind(element, 'touchend', touchEnd);
    } else if (env.supportsIePointer) {
      if (window.PointerEvent) {
        i.event.bind(element, 'pointerdown', touchStart);
        i.event.bind(element, 'pointermove', touchMove);
        i.event.bind(element, 'pointerup', touchEnd);
      } else if (window.MSPointerEvent) {
        i.event.bind(element, 'MSPointerDown', touchStart);
        i.event.bind(element, 'MSPointerMove', touchMove);
        i.event.bind(element, 'MSPointerUp', touchEnd);
      }
    }
  };

  var defaultSettings = function defaultSettings() {
    return {
      handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
      maxScrollbarLength: null,
      minScrollbarLength: null,
      scrollingThreshold: 1000,
      scrollXMarginOffset: 0,
      scrollYMarginOffset: 0,
      suppressScrollX: false,
      suppressScrollY: false,
      swipeEasing: true,
      useBothWheelAxes: false,
      wheelPropagation: true,
      wheelSpeed: 1
    };
  };

  var handlers = {
    'click-rail': clickRail,
    'drag-thumb': dragThumb,
    keyboard: keyboard,
    wheel: wheel,
    touch: touch
  };

  var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
    var this$1 = this;
    if (userSettings === void 0) userSettings = {};

    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('no element is specified to initialize PerfectScrollbar');
    }

    this.element = element;

    element.classList.add(cls.main);

    this.settings = defaultSettings();
    for (var key in userSettings) {
      this$1.settings[key] = userSettings[key];
    }

    this.containerWidth = null;
    this.containerHeight = null;
    this.contentWidth = null;
    this.contentHeight = null;
    this.containerLeft = parseFloat(element.style.left);
    this.containerTop = parseFloat(element.style.top);

    var focus = function focus() {
      return element.classList.add(cls.state.focus);
    };
    var blur = function blur() {
      return element.classList.remove(cls.state.focus);
    };

    this.isRtl = get(element).direction === 'rtl';
    this.isNegativeScroll = function () {
      var originalScrollLeft = element.scrollLeft;
      var result = null;
      element.scrollLeft = -1;
      result = element.scrollLeft < 0;
      element.scrollLeft = originalScrollLeft;
      return result;
    }();
    this.negativeScrollAdjustment = this.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
    this.event = new EventManager();
    this.ownerDocument = element.ownerDocument || document;

    this.scrollbarXRail = div(cls.element.rail('x'));

    //TEST
    document.body.appendChild(this.scrollbarXRail);
    this.scrollbarX = div(cls.element.thumb('x'));
    this.scrollbarXRail.appendChild(this.scrollbarX);

    this.scrollbarX.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarX, 'focus', focus);
    this.event.bind(this.scrollbarX, 'blur', blur);
    this.scrollbarXActive = null;
    this.scrollbarXWidth = null;
    this.scrollbarXLeft = null;
    var railXStyle = get(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
    if (isNaN(this.scrollbarXBottom)) {
      this.isScrollbarXUsingBottom = false;
      this.scrollbarXTop = toInt(railXStyle.top);
    } else {
      this.isScrollbarXUsingBottom = true;
    }
    this.railBorderXWidth = toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
    // Set rail to display:block to calculate margins
    set(this.scrollbarXRail, { display: 'block' });
    this.railXMarginWidth = toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
    set(this.scrollbarXRail, { display: '' });
    this.railXWidth = null;
    this.railXRatio = null;

    this.scrollbarYRail = div(cls.element.rail('y'));

    //TEST
    this.event.bind(this.element, "mouseenter", function () {
      this$1.scrollbarXRail.style.backgroundColor = "#eee";
      this$1.scrollbarYRail.style.backgroundColor = "#eee";
      this$1.scrollbarXRail.style.opacity = 0.9;
      this$1.scrollbarYRail.style.opacity = 0.9;
    });

    // TEST
    document.body.appendChild(this.scrollbarYRail);
    this.scrollbarY = div(cls.element.thumb('y'));
    this.scrollbarYRail.appendChild(this.scrollbarY);

    this.scrollbarY.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarY, 'focus', focus);
    this.event.bind(this.scrollbarY, 'blur', blur);
    this.scrollbarYActive = null;
    this.scrollbarYHeight = null;
    this.scrollbarYTop = null;
    var railYStyle = get(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(railYStyle.right, 10);
    if (isNaN(this.scrollbarYRight)) {
      this.isScrollbarYUsingRight = false;
      this.scrollbarYLeft = toInt(railYStyle.left);
    } else {
      this.isScrollbarYUsingRight = true;
    }
    this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
    this.railBorderYWidth = toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
    set(this.scrollbarYRail, { display: 'block' });
    this.railYMarginHeight = toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
    set(this.scrollbarYRail, { display: '' });
    this.railYHeight = null;
    this.railYRatio = null;

    this.reach = {
      x: element.scrollLeft <= 0 ? 'start' : element.scrollLeft >= this.contentWidth - this.containerWidth ? 'end' : null,
      y: element.scrollTop <= 0 ? 'start' : element.scrollTop >= this.contentHeight - this.containerHeight ? 'end' : null
    };

    this.isAlive = true;

    this.settings.handlers.forEach(function (handlerName) {
      return handlers[handlerName](this$1);
    });

    this.lastScrollTop = element.scrollTop; // for onScroll only
    this.lastScrollLeft = element.scrollLeft; // for onScroll only
    this.event.bind(this.element, 'scroll', function (e) {
      return this$1.onScroll(e);
    });
    updateGeometry(this);
  };

  PerfectScrollbar.prototype.update = function update() {
    if (!this.isAlive) {
      return;
    }

    // Recalcuate negative scrollLeft adjustment
    this.negativeScrollAdjustment = this.isNegativeScroll ? this.element.scrollWidth - this.element.clientWidth : 0;

    // Recalculate rail margins
    set(this.scrollbarXRail, { display: 'block' });
    set(this.scrollbarYRail, { display: 'block' });
    this.railXMarginWidth = toInt(get(this.scrollbarXRail).marginLeft) + toInt(get(this.scrollbarXRail).marginRight);
    this.railYMarginHeight = toInt(get(this.scrollbarYRail).marginTop) + toInt(get(this.scrollbarYRail).marginBottom);

    // Hide scrollbars not to affect scrollWidth and scrollHeight
    set(this.scrollbarXRail, { display: 'none' });
    set(this.scrollbarYRail, { display: 'none' });

    updateGeometry(this);

    processScrollDiff(this, 'top', 0, false, true);
    processScrollDiff(this, 'left', 0, false, true);

    set(this.scrollbarXRail, { display: '' });
    set(this.scrollbarYRail, { display: '' });
  };

  PerfectScrollbar.prototype.onScroll = function onScroll(e) {
    if (!this.isAlive) {
      return;
    }

    updateGeometry(this);
    processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
    processScrollDiff(this, 'left', this.element.scrollLeft - this.lastScrollLeft);

    this.lastScrollTop = this.element.scrollTop;
    this.lastScrollLeft = this.element.scrollLeft;
  };

  PerfectScrollbar.prototype.destroy = function destroy() {
    if (!this.isAlive) {
      return;
    }

    this.event.unbindAll();
    remove(this.scrollbarX);
    remove(this.scrollbarY);
    remove(this.scrollbarXRail);
    remove(this.scrollbarYRail);
    this.removePsClasses();

    // unset elements
    this.element = null;
    this.scrollbarX = null;
    this.scrollbarY = null;
    this.scrollbarXRail = null;
    this.scrollbarYRail = null;

    this.isAlive = false;
  };

  PerfectScrollbar.prototype.removePsClasses = function removePsClasses() {
    this.element.className = this.element.className.split(' ').filter(function (name) {
      return !name.match(/^ps([-_].+|)$/);
    }).join(' ');
  };

  return PerfectScrollbar;
});

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
model[6] = {
   _t: 0,
   _v: ["#00ff00", "#ffff00"]
};
model[7] = {
   _t: 0,
   _v: ["#00ff00", "#ffff00"]
};
model[8] = {
   _t: 1,
   _v: ["#00ff00", "#ffff00"]
};
model[9] = {
   _t: 1,
   _v: ["#00ff00", "#ffff00"]
};
model[10] = {
   _t: 1,
   _v: ["#00ff00", "#ffff00"]
};
model[11] = {
   _t: 0,
   _v: ["#00ff00", "#ffff00"]
};
model[12] = {
   _t: 0,
   _v: ["#00ff00", "#ffff00"]
};
model[13] = {
   _t: 1,
   _v: ["#00ff00", "#ffff00"]
};
model[14] = {
   _t: 1,
   _v: ["#00ff00", "#ffff00"]
};
model[15] = {
   _t: 0,
   _v: ["#00ff00", "#ffff00"]
};

exports.model = model;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map