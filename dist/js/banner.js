const oBanner = document.querySelector("#banner");
const oUl = document.querySelector("#banner .imgbox");
const oBtns = document.querySelectorAll("#banner #order li");
const oTark = document.querySelectorAll("#tark span");
let iNow = 1;
let timer = null;
let isRunning = false;
function carousel() {
    console.log(iNow);
    for (var i = 0; i < oBtns.length; i++) {
        oBtns[i].className = "";
    }
    if (iNow == oBtns.length + 1) {
        oBtns[0].className = "active";
    } else if (iNow == 0) {
        oBtns[oBtns.length - 1].className = "active";
    } else {
        oBtns[iNow-1].className = "active";
    }
    isRunning = true;
    startMove(oUl, { left: iNow * -1260 }, function () {
        if (iNow == oBtns.length+1) {
            iNow = 1;
            oUl.style.left = -1260+"px";
        } else if (iNow == 0) {
            iNow = 6;
            oUl.style.left = iNow * -1260 + "px";
        }
        isRunning = false;
    });
}
function auto(){
    timer = setInterval(function () {
        iNow++;
        carousel();
    }, 2000);
}
auto();

for (var i = 0; i < oBtns.length; i++) {
    oBtns[i].index = i;
    oBtns[i].onclick = function () {
        iNow = this.index + 1;
        carousel();
    };
}
oBanner.onmouseenter = function () {
    clearInterval(timer);
};
oBanner.onmouseleave = function () {
    auto();
};
oTark[0].onclick = function () {
    if (!isRunning) {
        iNow--;
        carousel();
    }
    return false;
};
oTark[1].onclick = function () {
    if (!isRunning) {
        iNow++;
        carousel();
    }
    return false;
};      
// select
var oDiv = document.getElementById("div1");
var aBtns = oDiv.getElementsByTagName("main");
var aDivs = oDiv.getElementsByTagName("div");
//通过循环给所有的按钮添加点击
for(var i = 0, len = aBtns.length; i < len; i++){
    aBtns[i].index = i;
    aBtns[i].onclick = function(){
        //全部取消
        for(var j = 0; j < len; j++){
            aBtns[j].className = '';
            aDivs[j].style.display = 'none';
        }
        //让当前点击的按钮被选中
        this.className = 'active';
        //找出当前按钮对应的div显示出来，通过按钮的下标找到对应div
        aDivs[this.index].style.display = 'block';
    }
}