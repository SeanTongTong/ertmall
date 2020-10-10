var oSm = document.getElementById("small");
var oSide = document.getElementById("side");
var oBig = document.getElementById("big");
var oImg = oBig.getElementsByTagName("img")[0];
oSm.onmouseenter = function(){
    oSide.style.display="block";
    oBig.style.display="block";
}
oSm.onmouseleave = function(){
    oSide.style.display="none";
    oBig.style.display="none";
}
oSm.onmousemove = function(ev){
    var e = ev || window.event;
    var x = e.clientX-this.offsetLeft-100;
    var y = e.clientY-this.offsetTop-100;
    x = Math.max(x,0);
    x = Math.min(x,400);
    y = Math.max(y,0);
    y = Math.min(y,400);
    oSide.style.left = x +"px";
    oSide.style.top = y +"px";
    oImg.style.left = x*(-3) +"px";
    oImg.style.top = y*(-3) +"px";
}
/* $(function(){
    $("#small").mouseenter(function(){
      $("#mark,#big").show();
    }).mouseleave(function(){
      $("#mark,#big").hide();
    }).mousemove(function(ev){
      var l = ev.clientX - $(this).offset().left - 100;
      var t = ev.clientY - $(this).offset().top - 100;
      //限制出界
      l = Math.max(0, l);
      l = Math.min(400, l);
      t = Math.max(0, t);
      t = Math.min(400, t);

      $("#mark").css({
        left: l,
        top: t
      })
      $("#big img").css({
        left: -3 * l,
        top: -3 * t
      })
    })
  }) */