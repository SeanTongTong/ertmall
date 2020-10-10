define(["jquery", "jquery-cookie"], function($){

    function download(){
        $.ajax({
            url: "../data/cart.json",
            success: function(obj){
                var arr = obj;
                for(var i = 0; i < arr.length; i++){
                    $(`
                    <li class="J_xm-recommend-list span4">    
                        <img src="${arr[i].img}"> 
                        <section>
                            <span><a href="">${arr[i].title}</a></span><br />
                            <span class="xm-recommend-price">${arr[i].price[0].now}元</span><br />
                            <span class="xm-recommend-tips">   
                                <a href="" class="btn" id="${arr[i].id}">加入购物车</a>  
                            </span>
                        </section>        
                    </li>`).appendTo($("#J_miRecommendBox .xm-recommend ul.row"))
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    function cartHover(){
        //添加加入购物车操作
        $("#J_miRecommendBox .xm-recommend ul.row").on("click", ".J_xm-recommend-list .xm-recommend-tips a.btn", function(){
            //获取当前的商品列表
            var id = this.id;
            console.log(id);
            //进行购物车操作   goods键，json格式字符串为值
            var first = $.cookie("goods") == null ? true : false;

            if(first){
                //直接创建cookie
                // console.log("${id}");
                var cookieStr = `[{"id":${id},"num":1}]`;
                console.log(cookieStr);
                $.cookie("goods", cookieStr, {
                    expires: 7
                })
            }else{
                var same = false; //假设没有添加过
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        //如果之前添加过，数量+1
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }

                if(!same){
                    //如果没有添加过，新增商品数据
                    var obj = {id:id, num:1};
                    cookieArr.push(obj);
                }

                //最后，存回cookie中
                $.cookie("goods", JSON.stringify(cookieArr), {
                    expires: 7
                })
            }
            // alert($.cookie("goods"));
            shopping();
            return false;
            alert(false);
        })

        
    }
   /*  function downloada(){
        $.ajax({
            url: "../data/cart.json",
            success: function(obj){
                var arr = obj;
                for(var i = 0; i < arr.length; i++){
                    $(`
                    <tr class="content_tr" id="${arr[i].id}">
                        <td><input type="checkbox" id="check${arr[i].id}" class="checks"></td>
                        <td>
                            <img src="${arr[i].img}" alt="">
                            <span>${arr[i].title}</span>
                        </td>
                        <td>
                            <div class="content">
                                <span>${arr[i].can}</span>
                            </div>
                        </td>
                        <td>
                            <s class="historys">￥${arr[i].price[0].hostory}</s><br />
                            <em class="nows price">￥${arr[i].price[0].now}</em>
                        </td>
                        <td>
                            <div class="jian goods_btn"><a href="">-</a></div>
                            <input class="goods_btn" type="text" value="2">
                            <div class="jia goods_btn"><a href="">+</a></div>
                        </td>
                        <td>
                            <label for="nows count1 prices">￥${(arr[i].price[0].now*2).toFixed(2)}</label>
                        </td>
                        <td id="delete"><a href="">删除</a></td>
                    </tr>`).appendTo($("table .shuju"))
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    } */
    /* ${arr[i].num} arr[i].num*/
    function shopping(){
        var a = document.getElementsByTagName("a");
        a.onclick = function(){
            return false;
        }
        goods_msg();
        var cookieStr = $.cookie("goods");
            // console.log(cookieStr);
            if(!cookieStr){
                return;
            }
        function goods_msg(){
            //下载所有的商品数据      
            $.ajax({
                url:"../data/cart.json",
                success:function(arr){
                    // console.log(arr.length);
                    var cookieArr = JSON.parse(cookieStr) ; 
                    // console.log(cookieArr.length); 
                    var newArr = [];
                    for(var i = 0;i < arr.length; i++){
                        for(var j = 0;j < cookieArr.length ;j++){
                            if( cookieArr[j].id == arr[i].id){
                                arr[i].num = cookieArr[j].num;
                                newArr.push(arr[i]);
                                break;
                            }
                        }
                    }
                   
                    //处理数据，将数据添加在页面上
                    $("#J_cartListBody .shuju").html("");
                    var str = ``;
                    for(var i = 0;i < newArr.length;i++){
                        str +=
                        ` <tr class="content_tr" id="${newArr[i].id}">
                        <td><input type="checkbox" id="check${newArr[i].id}" class="checks"></td>
                        <td>
                            <img src="${newArr[i].img}" alt="">
                            <span>${newArr[i].title}</span>
                        </td>
                        <td>
                            <div class="content">
                                <span>${newArr[i].can}</span>
                            </div>
                        </td>
                        <td>
                            <s class="historys">￥${newArr[i].price[0].hostory}</s><br />
                            ￥<em class="nows price">${newArr[i].price[0].now}</em>
                        </td>
                        <td>
                            <div class="jian goods_btn"><a>-</a></div>
                            <input class="goods_btn id sum" type="text" value="${cookieArr[i].num}">
                            <div class="jia goods_btn"><a>+</a></div>
                        
                        </td>
                        <td>
                            ￥<label for="nows count1" class="prices">${(newArr[i].price[0].now*cookieArr[i].num).toFixed(2)}</label>
                        </td>
                        <td id="delete"><a href="">删除</a></td>
                    </tr> `/* .appendTo($("#J_miRecommendBox .shuju")); */
                    };
                    // console.log(str);
                    $("#J_cartListBody .shuju").append(str);
                    var trs = $(".content_tr");
                    var total = 0;
                    for(var i=0;i<trs.length;i++){
                        var money=parseFloat($(".prices").html());
                        console.log(money);
                        total += money;
                        console.log(total);
                    }
                    $("#total").html(`${total}`)
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        }
        goods_num();
         //处理数量
         $("table").on("click","#delete",function(){
            var id = $(this).closest("tr").remove().attr("id");//删除页面上的节点
            var cookieArr = JSON.parse($.cookie("goods"));
            for(var i = 0; i < cookieArr.length;i++){
                if( cookieArr[i].id == id){
                    cookieArr.splice(i,1);
                    break;
                }
            }
            if ( cookieArr.length){
                $.cookie("goods",JSON.stringify( cookieArr),{
                    fexpires:7
                })
            }else{
                $.cookie("goods" ,null);
            }
            goods_num();
        })
         //给+-添加点击
         $("table").on("click",".goods_btn a",function(){
            var id = $(this).closest("tr").attr("id");
            // console.log(id);
            var cookieArr = JSON.parse($.cookie( "goods"));
            for(var i = 0;i < cookieArr.length;i++){
                if( cookieArr[i].id == id){
                    break;
                }
            }
            if(this.innerHTML == "+"){
                cookieArr[i].num++;
                $(this).parent(".jia").prev(".sum").val(`${cookieArr[i].num}`);
            }else{
                cookieArr[i].num == 1 ? alert("数量为1, 不能再减了"):cookieArr[i].num--;
                $(this).parent(".jian").next(".sum").val(`${cookieArr[i].num}`);
            }
            $.cookie(" goods" , JSON.stringify(cookieArr),{
                expires:7
            })
            goods_num();
        })
        function goods_num(){
            var cookieStr = $.cookie("goods");
            var sum = 0;
            if( cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0; i < cookieArr.length;i++){
                    sum += cookieArr[i].num;
                    // console.log(sum);
                }
            }
            $(".goods_num" ).html(sum);
        }
        all();
        //全选
        function all(){
            // querySelector
            // .getElementsByTagName('tbody').
            //获取元素，获取全选按钮和下面小的复选框
            var cekall = document.getElementById('selects');
            var inp = new Array();
            inp = document.getElementsByClassName('checks');
            cekall.onclick = function(){
                for(var i=0; i< inp.length; i++){
                    inp[i].checked = this.checked;
                    inp[i].onclick = function(){
                        if(!this.checked){
                            cekall.checked = false;
                        }else{
                            var unchecked = document.querySelector(".concent_tr input:not(:checked)");
                            console.log(unchecked);
                            if(unchecked === null){
                                cekall.checked = true;
                            }
                        }
                    }
                }
            }  
        }
    }
    
    
    return {
        download:download,
        // downloada:downloada,
        cartHover: cartHover,
        shopping: shopping
    }
    
    
})