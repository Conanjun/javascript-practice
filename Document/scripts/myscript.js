//addLoadevent(displayAbbreviations);
//window.onload=displayAbbreviations;
window.onload = function () {
    displayAbbreviations();
    displayCitation();
    displayAccesskeys();
};
/*
 <dl>
 <dt>Title</dt>
 <dd>Description</dd>
 <dt>Title2</dt>
 <dd>Description<dd>
 </dl>
 */

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

function displayCitation() {
    //alert("into citation");
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    var quotes = document.getElementsByTagName("blockquote");
    for (var i = 0; i < quotes.length; i++) {
        if (!quotes[i].getAttribute("cite")) continue;
        var url = quotes[i].getAttribute("cite");
        //获取引用的所有元素结点
        var quoteChildren = quotes[i].getElementsByTagName('*');
        //获取最后一个元素结点
        if (quoteChildren.length < 1) continue;
        var elem = quoteChildren[quoteChildren.length - 1];
        //alert(elem.nodeName);
        //创建标记
        var link = document.createElement("a");
        var link_text = document.createTextNode("source");
        link.appendChild(link_text);
        link.setAttribute("href", url);
        var superscript = document.createElement("sup");
        superscript.appendChild(link);
        elem.appendChild(superscript);
    }
}

function displayAccesskeys() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //提取元素信息
    var links = document.getElementsByTagName("a");
    var akeys = new Array();
    for (var i = 0; i < links.length; i++) {
        var current_link = links[i];
        if (!current_link.getAttribute("accesskey")) continue;
        var key = current_link.getAttribute("accesskey");
        var text = current_link.lastChild.nodeValue;
        akeys[key] = text;
    }
    //创建列表
    var list = document.createElement("ul");
    for (key in akeys) {
        var text = akeys[key];
        var str = key + ": " + text;
        var item = document.createElement("li");
        var item_text = document.createTextNode(str);
        item.appendChild(item_text);
        list.appendChild(item);
    }
    //创建标题
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Accesskeys");
    header.appendChild(header_text);
    document.body.appendChild(header);
    document.body.appendChild(list);
}

