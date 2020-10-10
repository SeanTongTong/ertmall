function goods_msg(){
    //下载所有的商品数据      
    $. ajax({
        url:"../data/cart.json",
        success:function(arr){
            var cookieArr = JSON.parse(cookieStr) ;  
            var newArr = [];
            for(var i = 0;i < arr.length; i++){
                for(var j = 0;j < cookieArr.length;j ++){
                    if( cookieArr[j].id == arr[i].id){
                        arr[i].num = cookieArr[j].num;
                        newArr.push(arr[i]);
                        break;
                    }
                }
            }
           
            //处理数据，将数据添加在页面上
            var str = ``;
            for(var i = 0;i < newArr.length;i++){
                str += ` <tr class="content_tr" id="${newArr[i].id}">
                <td><input type="checkbox" id="check" class="checks"></td>
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
                    <em class="nows">￥${newArr[i].price[0].now}</em>
                </td>
                <td>
                    <div class="jian goods_btn"><a href="">-</a></div>
                    <input class="goods_btn prices" type="text" value="${newArr[i].num}">
                    <div class="jia goods_btn"><a href="">+</a></div>
                </td>
                <td>
                    <label for="nows count1">￥${(newArr[i].price[0].now*newArr[i].num).toFixed(2)}</label>
                </td>
                <td id="delete"><a href="">删除</a></td>
            </tr> `;
            }
            console.log(str);
            $("div").after(str);
        },
        error:function(msg){
            console.log(msg);
        }
    })
}