window.onload = function () {
    //setTimeoutTest(1);
    positionMessage();
    //moveMessage();
    //moveElement("message",200,300,10);
}

function setTimeoutTest(number) {
    alert(number);
    number++;
    //timeer=setTimeout(setTimeoutTest(number),1000); //这种没有加""的并没有按1s的间隔执行，而是立即执行，因为函数()的关系，解释为调用函数的关系，假如没有参数，则不加()时可以正确延时
    //此处为正确的传参方式
    var temp = "setTimeoutTest(" + number + ")";
    timer = setTimeout(temp, 1000);
}


function positionMessage() {
    if (!document.getElementById) return false;
    if (!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "100px";
    moveElement("message", 125, 25, 10);
    if(!document.getElementById("message2")) return false;
    var elem2=document.getElementById("message2");
    elem2.style.position="absolute";
    elem2.style.left="50px";
    elem2.style.top="50px";
    moveElement("message2",125,125,20);
}

/*
 function moveMessage() {
 if (!document.getElementById) return false;
 if (!document.getElementById("message")) return false;
 var elem = document.getElementById("message");
 var xpos = parseInt(elem.style.left);
 var ypos = parseInt(elem.style.top);
 if (xpos == 200 && ypos == 300) {
 return true;
 }
 if (xpos < 200) xpos++;
 if (xpos > 200) xpos--;
 if (ypos < 300) ypos++;
 if (ypos > 300) ypos--;
 elem.style.left = xpos + "px";
 elem.style.top = ypos + "px";
 //movement设置为全局变量
 movement=setTimeout("moveMessage()",10);
 }
 */

//moveMessage函数的抽象

function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) xpos++;
    if (xpos > final_x) xpos--;
    if (ypos < final_y) ypos++;
    if (ypos > final_y) ypos--;
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    //movement为全局变量,setTimeout第一个参数为计算表达式或函数表达式，为字符串类型
    //moveElement("message",200,300,10);
    var temp = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";//注意单引号,message为字符串变量，拼接的时候需要''
    //alert(temp);
    movement = setTimeout(temp, 10);
}
