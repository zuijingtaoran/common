(function (window, undefined) {
    /**********************  常用方法 ******************************/
    function fn() {
        this.str = arguments[0] || "";

        this.prefix = '~';


    }
    //{0}传参
    fn.prototype = {
        format: function () {
            var arg = arguments[0] || "";
            var arr = arguments[1] || []
            return arg.replace(/\{(\d+)\}/ig,
    function (a, b) {

        return arr[b] || "";
    });

        },

        coder: function () {
            var fh = "",
    dg = "",
    asc = 0;
            var arg = arguments[0] || fh;
            for (i = 0; i < arg.length; i++) {
                dg = arg.substring(i, i + 1);
                try {
                    asc = parseInt(arg.charCodeAt(i));
                    if ((asc < 48) || (asc > 90 && asc < 97) || (asc > 122 && asc < 127) || (asc > 57 && asc < 65)) {
                        var s000 = asc.toString();
                        if (asc < 100) {
                            s000 = "0" + s000;
                        }
                        fh += this.prefix + s000;
                    } else {
                        fh += dg;
                    }
                } catch (e) {
                    console.log(e.toString());
                    fh += dg;
                }

            }
            return encodeURI(encodeURI(fh));

        },

        decoder: function () {
            var fh = "",
    youb = "";
            var str = arguments[0] || fh;
            str = decodeURI(decodeURI(str));
            var array = str.split(this.prefix);
            for (i = 0; i < array.length; i++) {
                if (i > 0) {
                    try {
                        youb = array[i].substring(0, 3);
                        array[i] = array[i].replace(youb, String.fromCharCode(youb));
                    } catch (e) {
                        console.log(e.toString());
                    }
                }
                fh += array[i];
            }

            return fh;

        },
        //获取地址栏参数
        GetQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        },
        is: function () {
            return Object.prototype.toString.call(arguments[0]).slice(8, -1);

            /* 检测对象类型  
            1.基本类型：Undefined / Null / Boolean / Number / String
            2.引用类型：Object / Array / Function / Date / RegExp / Error / Map / Set …
            // http://www.zhufengpeixun.cn/JavaScriptmianshiti/2014-02-28/271.html
            //https://www.zhihu.com/question/37834558
            */
        },
        //原生JavaScript转义html标签
        /*
        innerText（textContent）会获取纯文本内容，忽略html节点标签，而innerHTML会显示标签内容，
        所以我们先将需转义的内容赋值给innerText（textContent），再获取它的innerHTML属性，这时获取到的就是转义后文本内容。
        */
        htmlEncode: function () {
            var html = arguments[0] || "";
            var temp = document.createElement("div");
            (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
            var output = temp.innerHTML;
            temp = null;
            return output;
        },
        htmlDecode: function () {
            var text = arguments[0] || "";
            var temp = document.createElement("div");
            temp.innerHTML = text;
            var output = temp.innerText || temp.textContent;
            temp = null;
            return output;
        },



        ///设置cookie 
        setCookie: function () {
            //@参数:三个变量用来设置新的cookie: 
            //cookie的名称,存储的Cookie值, 
            // 以及Cookie过期的时间. 
            // 这几行是把天数转换为合法的日期 
            if ((typeof arguments[0] === "string") && arguments[0].length > 0) {
                var NameOfCookie = arguments[0];
                var value = arguments[1] || "";
                var expiredays = arguments[2] || 1;
                var ExpireDate = new Date();
                ExpireDate.setTime(ExpireDate.getTime() + (expiredays * 24 * 3600 * 1000));

                // 下面这行是用来存储cookie的,只需简单的为"document.cookie"赋值即可. 
                // 注意日期通过toGMTstring()函数被转换成了GMT时间。 

                document.cookie = NameOfCookie + "=" + escape(value) + ((expiredays == null) ? "" : "; expires=" + ExpireDate.toGMTString());
            } else { alert("Param error!"); }
        },

        ///获取cookie值 
        getCookie: function () {

            var NameOfCookie = arguments[0] || "";
            // 首先我们检查下cookie是否存在. 
            // 如果不存在则document.cookie的长度为0 

            if (document.cookie.length > 0) {
                // 接着我们检查下cookie的名字是否存在于document.cookie 
                // 因为不止一个cookie值存储,所以即使document.cookie的长度不为0也不能保证我们想要的名字的cookie存在 
                //所以我们需要这一步看看是否有我们想要的cookie 
                //如果begin的变量值得到的是-1那么说明不存在 

                begin = document.cookie.indexOf(NameOfCookie + "=");
                if (begin != -1) {

                    // 说明存在我们的cookie. 

                    begin += NameOfCookie.length + 1; //cookie值的初始位置 
                    end = document.cookie.indexOf(";", begin); //结束位置 
                    if (end == -1) end = document.cookie.length; //没有;则end为字符串结束位置 
                    return unescape(document.cookie.substring(begin, end));
                }
            }


            return null;

            // cookie不存在返回null 
        },

        ///删除cookie 
        delCookie: function () {
            // 该函数检查下cookie是否设置，如果设置了则将过期时间调到过去的时间; 
            if (typeof arguments[0] !== "string") return;
            var NameOfCookie = arguments[0];

            if (getCookie(NameOfCookie)) {
                document.cookie = NameOfCookie + "=" + "; expires=Thu, 01-Jan-70 00:00:01 GMT";
            }
        },

        //   原生JavaScript加载样式文件,可设置是否使用缓存
        /***
        @param1 url（网络或本地）
        @param2 传入任何值可重载本样式
        ***/
        loadStyle: function () {
            var url = arguments[0] || "http://bootstrap.kinghack.com/bootstrap/2.3.1/css/bootstrap.css";
            var cache = arguments[1] || "";
            (cache.length === 0) ? (url = url) : (url = url + "?v=" + Math.random())
            try {
                document.createStyleSheet(url)
            } catch (e) {
                var cssLink = document.createElement('link');
                cssLink.rel = 'stylesheet';
                cssLink.type = 'text/css';
                cssLink.href = url;
                var head = document.getElementsByTagName('head')[0];
                head.appendChild(cssLink)
            }
        },
        getUrlState: function (URL) {
            var xmlhttp = new ActiveXObject("microsoft.xmlhttp");
            xmlhttp.Open("GET", URL, false);
            try {
                xmlhttp.Send();
            } catch (e) {
            } finally {
                var result = xmlhttp.responseText;
                if (result) {
                    if (xmlhttp.Status == 200) {
                        return (true);
                    } else {
                        return (false);
                    }
                } else {
                    return (false);
                }
            }
        },
        ip2int: function (ip) {
            var num = 0;
            ip = ip.split(".");
            num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
            num = num >>> 0;
            return num;
        },

        int2iP: function (num) {
            var str;
            var tt = new Array();
            tt[0] = (num >>> 24) >>> 0;
            tt[1] = ((num << 8) >>> 24) >>> 0;
            tt[2] = (num << 16) >>> 24;
            tt[3] = (num << 24) >>> 24;
            str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
            return str;
        },
        isURL: function () {
            var strUrl = arguments[0].toString() || "";
            var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
            if (regular.test(strUrl)) {
                return true;
            }
            else {
                return false;
            }
        },

        // 原生JavaScript获取页面高度
        getPageHeight: function () {
            var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
                        ? a
                        : g.documentElement;
            return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
        },
        //原生JavaScript获取页面scrollLeft
        getPageScrollLeft: function () {
            var a = document;
            return a.documentElement.scrollLeft || a.body.scrollLeft;
        },
        //原生JavaScript获取页面可视宽度
        getPageViewWidth: function () {
            var d = document, a = d.compatMode == "BackCompat"
                        ? d.body
                        : d.documentElement;
            return a.clientWidth;
        },
        //原生JavaScript获取页面宽度
        getPageWidth: function () {
            var g = document, a = g.body, f = g.documentElement, d = g.compatMode == "BackCompat"
                        ? a
                        : g.documentElement;
            return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
        },
        //原生JavaScript获取页面scrollTop
        getPageScrollTop: function () {
            var a = document;
            return a.documentElement.scrollTop || a.body.scrollTop;
        },
        //原生JavaScript获取页面可视高度
        getPageViewHeight: function () {
            var d = document, a = d.compatMode == "BackCompat"
                        ? d.body
                        : d.documentElement;
            return a.clientHeight;
        },
        //原生JavaScript获取网页被卷去的位置
        getScrollXY: function () {
            return document.body.scrollTop ? {
                x: document.body.scrollLeft,
                y: document.body.scrollTop
            } : {
                x: document.documentElement.scrollLeft,
                y: document.documentElement.scrollTop
            }
        },
        //随机数时间戳
        uniqueId: function () {
            var a = Math.random, b = parseInt;
            return Number(new Date()).toString() + b(10 * a()) + b(10 * a()) + b(10 * a());
        }



















    }









    function dateSet() { }

    dateSet.prototype = {
        getWeekName: function () {
            switch (dat.getDay()) {
                case 0: x = "Sunday"; break;
                case 1: x = "Monday"; break;
                case 2: x = "Tuesday"; break;
                case 3: x = "Wednesday"; break;
                case 4: x = "Thursday"; break;
                case 5: x = "Friday"; break;
                case 6: x = "Saturday"; break
            }

        },
        timeFormat: function () {
  var date =Date.parse("2016/11/28")
    , curDate = Date.parse("2016/11/28 12:12:12")
    , year = date.getFullYear()
    , month = date.getMonth() + 1
    , day = date.getDate()
    , hour = date.getHours()
    , minute = date.getMinutes()
    , curYear = curDate.getFullYear()
    , curHour = curDate.getHours()
    , timeStr;
 
  if(year < curYear){
    timeStr = year +'年'+ month +'月'+ day +'日 '+ hour +':'+ minute;
  }else{
    var pastTime = curDate - date
      , pastH = pastTime/3600000;
 
    if(pastH > curHour){
      timeStr = month +'月'+ day +'日 '+ hour +':'+ minute;
    }else if(pastH >= 1){
      timeStr = '今天 ' + hour +':'+ minute +'分';
    }else{
      var pastM = curDate.getMinutes() - minute;
      if(pastM > 1){
        timeStr = pastM +'分钟前';
      }else{
        timeStr = '刚刚';
      }
    }
  }
  return timeStr;
}
    }
    window.fn = fn;
    window.dateSet = dateSet;
    window.sort_down = function (x, y) { if (x > y) { return -1 } if (x < y) { return 1 } };
    window.sort_up = function (x, y) { if (x > y) { return 1 } if (x < y) { return -1 } };
    // 原生JavaScript常用的正则表达式
    window.reg = {
   
//正整数
p_int:/^[0-9]*[1-9][0-9]*$/,
//负整数
m_int:/^-[0-9]*[1-9][0-9]*$/,
//正浮点数
p_float:/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/ ,
//负浮点数
m_float:/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/,
//浮点数
float:/^(-?\d+)(\.\d+)?$/,
//email地址
email:/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
//url地址
url:/^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*(\?\S*)?$/,
//年/月/日（年-月-日、年.月.日）
//yyyyMMdd:/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
//匹配中文字符
chinese:/[\u4e00-\u9fa5]/,
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
pw_format:/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/,

//匹配中国邮政编码
postalcode:/[1-9]\d{5}(?!\d)/,
//匹配身份证
idCard:/\d{15}|\d{18}/,
//匹配国内电话号码
phoneNumber:/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/,
//匹配IP地址
ipAddress:/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/,
//匹配首尾空白字符的正则表达式
hbTrim:/^\s*|\s*$/,
dangerChar: /<|>|\[|\]|\{|\}|『|』|※|○|●|◎|§|△|▲|☆|★|◇|◆|□|▼|㊣|﹋|⊕|⊙|〒|ㄅ|ㄆ|ㄇ|ㄈ|ㄉ|ㄊ|ㄋ|ㄌ|ㄍ|ㄎ|ㄏ|ㄐ|ㄑ|ㄒ|ㄓ|ㄔ|ㄕ|ㄖ|ㄗ|ㄘ|ㄙ|ㄚ|ㄛ|ㄜ|ㄝ|ㄞ|ㄟ|ㄢ|ㄣ|ㄤ|ㄥ|ㄦ|ㄧ|ㄨ|ㄩ|■|▄|▆|\*|@|#|\^|\\/
    }

})(window);

var jg = new fn(); //设置操作符
var ds = new dateSet();



/********************        原生对象添加方法                ***************************/

//数组去重
Array.prototype.distinct = function () {
    var ret = [];
    for (i = 0; i < this.length; i++) {

        for (j = i + 1; j < this.length; j++) {
            if (this[i] === this[j]) {

                this.splice(j, 1);
            }
        }

    }
    return this;


}
Array.prototype.bubbling = function () {
    var type = arguments[0] || "up";
    var array = this;
    for (arr in Array) {
        if (typeof Array[arr] !== "number") return Array;
    }
    var i = 0, len = array.length, j, d;
    for (i = 0; i < len; i++) {
        for (j = 0; j < len; j++) {
            if (type === "down") {
                if (array[i] > array[j]) { d = array[j]; array[j] = array[i]; array[i] = d; }
            }
            else {
                if (array[i] < array[j]) { d = array[j]; array[j] = array[i]; array[i] = d; }
            }
        }
    }
    return array;
}

//字符串前加前缀
String.prototype.prependPrefix = function () {
    var str = this;
    var num = (Number(arguments[0]) || 1) - str.length;
    var prefix = arguments[1] || '0';

    for (i = 0; i < num; i++) { str = prefix + str; }
    return str;
}
//字符串去空格 传参（all,left,right）
String.prototype.trim = function () {
    var type = arguments[0] || "";
    switch (type) {
        case "left":
            return this.replace(/(^\s*)/g, "");
            break;
        case "right":
            return this.replace(/(\s*$)/g, "");
            break;
        default:
            return this.replace(/ /g, "");
            break;
    }

}
//原生JavaScript替换全部
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2)
} 
