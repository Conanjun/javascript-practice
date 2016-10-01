window.onload = function () {
    preparePlaceholder()
    prepareGalley();
}

/*
 <img id="placeholder" src="images/Koala.jpg" alt="my image gallery" />
 <p id="description">Image Description</p>
 */
function preparePlaceholder() {
    //检测浏览器是否支持
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/Koala.jpg");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("Image Description");

    description.appendChild(desctext);
//document.getElementsByTagName("body")[0].appendChild(placeholder);
//document.getElementsByTagName("body")[0].appendChild(description);
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

//addLoadEvent(prepareGalley);
//window.onload=addLoadEvent(prepareGalley);

//在元素后插入新元素
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }
    else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addLoadEvent(func) {
    var oldonload = window.onload;
    //该处理函数未绑定任何函数
    if (typeof window.onload != 'function') {
        whidow.onload = func;
    }
    //该处理函数已经绑定一些函数，追加新函数到window.onload
    else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

function prepareGalley() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    //为每个link设置onclick事件处理函数
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return showPic(this) ? false : true;
        }
    }
}

function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src", source);
    if (document.getElementById("description")) {
        var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
        var description = document.getElementById("description");
        if (description.firstChild.nodeType == 3) {
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}