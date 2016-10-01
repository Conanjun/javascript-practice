window.onload = function () {
    //styleHeaderSiblings();
    styleElementSibling("h1", "intro");
    displayAbbreviations();
    stripeTables();
    highlightRows();
    //var headers=document.getElementsByTagName("h1");
    //viewNextSibling(headers[0]);
};

function styleHeaderSiblings() {
    if (!document.getElementsByTagName) return false;
    var headers = document.getElementsByTagName("h1");
    var elem;
    for (var i = 0; i < headers.length; i++) {
        elem = getNextElement(headers[i].nextSibling);
        //修改style属性达到效果
        // elem.style.fontWeight="bold";
        //elem.style.fontSize="1.2em";
        //修改class属性达到效果
        elem.className = "intro";
    }
}
//styleheaderSibling的抽象
function styleElementSibling(tag, theclass) {
    if (!document.getElementsByTagName) return false;
    var elems = document.getElementsByTagName(tag);
    var elem;
    for (var i = 0; i < elems.length; i++) {
        elem = getNextElement(elems[i].nextSibling);
        //修改style属性达到效果
        // elem.style.fontWeight="bold";
        //elem.style.fontSize="1.2em";
        //修改class属性达到效果
        //elem.className = "intro";
        addClass(elem, theclass);
    }
}

//为元素添加新的属性名字
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    }
    else {
        var newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function getNextElement(node) {
    if (node.nodeType == 1) {
        return node;
    }
    if (node.nextSibling) {
        return getNextElement(node.nextSibling);
    }
    return null;
}

function viewNextSibling(node) {
    alert(node.nodeName);
    if (node.nextSibling) {
        viewNextSibling(node.nextSibling)
    }
}

function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for (var i = 0; i < tables.length; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                //修改style属性
                //rows[j].style.backgroundColor = "#ffc";
                //修改设置class属性
                addClass(rows[j], "odd");
                odd = false;
            }
            else {
                odd = true;
            }
        }
    }
}

function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].onmouseover = function () {
            this.style.fontWeight = "bold";
        };
        rows[i].onmouseout = function () {
            this.style.fontWeight = "normal";
        };
    }
}

function displayAbbreviations() {
    //alert("into abbr");
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //获取文档中所有的abbr元素，提取保存到一个数组defs
    var abbreviation = document.getElementsByTagName("abbr");
    if (abbreviation.length < 1) return false;
    var defs = new Array();
    for (var i = 0; i < abbreviation.length; i++) {
        var current_abbr = abbreviation[i];
        if (current_abbr.childNodes.length < 1) continue;//防止IE浏览器无法识别abbr元素
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    //根据defs创建dl元素
    var dlist = document.createElement("dl");
    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    //将dl元素插入文本
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    document.body.appendChild(header);
    document.body.appendChild(dlist);
}
