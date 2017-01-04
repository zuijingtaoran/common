﻿(function (window) { function fn() { this.str = arguments; this.prefix = "~" } fn.prototype.format = function () { var arg = arguments[0] || ""; var arr = arguments[1] || []; return arg.replace(/\{(\d+)\}/ig, function (a, b) { return arr[b] || "" }) }; fn.prototype.coder = function () { var fh = "", dg = "", asc = 0; var arg = arguments[0] || fh; for (i = 0; i < arg.length; i++) { dg = arg.substring(i, i + 1); try { asc = parseInt(arg.charCodeAt(i)); if ((asc < 48) || (asc > 90 && asc < 97) || (asc > 122 && asc < 127) || (asc > 57 && asc < 65)) { var s000 = asc.toString(); if (asc < 100) { s000 = "0" + s000 } fh += this.prefix + s000 } else { fh += dg } } catch (e) { console.log(e.toString()); fh += dg } } return encodeURI(encodeURI(fh)) }; fn.prototype.decoder = function () { var fh = "", youb = ""; var str = arguments[0] || fh; str = decodeURI(decodeURI(str)); var array = str.split(this.prefix); for (i = 0; i < array.length; i++) { if (i > 0) { try { youb = array[i].substring(0, 3); array[i] = array[i].replace(youb, String.fromCharCode(youb)) } catch (e) { console.log(e.toString()) } } fh += array[i] } return fh }; fn.prototype.GetQueryString = function (name) { var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); var r = window.location.search.substr(1).match(reg); if (r != null) { return unescape(r[2]) } return null }; fn.prototype.is = function () { return Object.prototype.toString.call(arguments[0]).slice(8, -1) }; window.fn = fn; function dateSet() { this.str = arguments || ""; this.dat = new Date() } dateSet.prototype.getWeekName = function () { switch (dat.getDay()) { case 0: x = "Sunday"; break; case 1: x = "Monday"; break; case 2: x = "Tuesday"; break; case 3: x = "Wednesday"; break; case 4: x = "Thursday"; break; case 5: x = "Friday"; break; case 6: x = "Saturday"; break } }; window.dateSet = dateSet; window.sort_down = function (x, y) { if (x > y) { return -1 } if (x < y) { return 1 } }; window.sort_up = function (x, y) { if (x > y) { return 1 } if (x < y) { return -1 } } })(window); Array.prototype.distinct = function () { var ret = []; for (i = 0; i < this.length; i++) { for (j = i + 1; j < this.length; j++) { if (this[i] === this[j]) { this.splice(j, 1) } } } return this }; Array.prototype.bubbling = function () { var type = arguments[0] || "up"; var array = this; for (arr in Array) { if (typeof Array[arr] !== "number") { return Array } } var i = 0, len = array.length, j, d; for (i = 0; i < len; i++) { for (j = 0; j < len; j++) { if (type === "down") { if (array[i] > array[j]) { d = array[j]; array[j] = array[i]; array[i] = d } } else { if (array[i] < array[j]) { d = array[j]; array[j] = array[i]; array[i] = d } } } } return array }; String.prototype.prependPrefix = function () { var str = this; var num = (Number(arguments[0]) || 1) - str.length; var prefix = arguments[1] || "0"; for (i = 0; i < num; i++) { str = prefix + str } return str }; String.prototype.trim = function () { var type = arguments[0] || ""; switch (type) { case "left": return this.replace(/(^\s*)/g, ""); break; case "right": return this.replace(/(\s*$)/g, ""); break; default: return this.replace(/ /g, ""); break } };