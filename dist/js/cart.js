console.log("加载成功");
require.config({
    paths: {
        "jquery": "jquery-1.11.3",
        "jquery-cookie": "jquery.cookie",
        "goodsCart": "goodsCart"
    },
    shim: {
        //设置依赖关系  先引入jquery.js  然后在隐去jquery-cookie
        "jquery-cookie": ["jquery"],
    }
})

require(["goodsCart"], function(goodsCart){
    goodsCart.download();
    // goodsCart.downloada();
    goodsCart.cartHover();
    goodsCart.shopping();
});
