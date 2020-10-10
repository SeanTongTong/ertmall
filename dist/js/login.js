var oDiv = document.getElementById("div1");
var aBtns = oDiv.getElementsByTagName("p");
var aDivs = oDiv.getElementsByTagName("form");

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