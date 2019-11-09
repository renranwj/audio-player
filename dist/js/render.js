// 页面渲染  img  info  btn+like play

(function ($, root) {
    function renderImg (src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    }
    function renderInfo (data) {
        var str = ` <div class="song-name">${data.song}</div>
        <div class="singer-name">${data.singer}</div>
        <div class="album-name">${data.album}</div>`;
        $('.song-info').html(str);
    }

    function renderIsLike (isLike) {
        if(isLike) {
            $('.like').addClass('liking');
        }else {
            $('.like').removeClass('liking');
        }
    }

    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }


})(window.Zepto, window.player || (window.player = {}));

//将模块化的方法暴露在window上面
//在window上面创建一个属性player。
//如果在之前的js中创建了window.palyer .我们就直接取到window.player，如果没有window.player，就创建一个window.player
//window.zepto多次调用，都会去全局上找，直接将其传入，直接调用就可以了