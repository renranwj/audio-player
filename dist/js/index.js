//zepto.min.js  工具的类库，相当于一个jQuery库，用法和jQuery也是差不多，但是是移动端的。也就变的更加清亮。
//jQuery中包含的动画，点击事件，ajax请求，全部都在一个文件，我们用的时候，引入一个就好了。
//zepto把他们区分了好多，有一个zepto的主文件，可能就支持绑定事件，Ajax请求等这些，当我们再需要额外的，比如animate，就需要再引入zepto.animate.js  这些其他的文件（从主文件中，抽离的）。我们就可以按需引入，这样每一个zepto就变得更小，更清量。移动端不像pc端的网络较好。

var root = window.player;
// var nowIndex = 0;
var len, dataList;
var audio = root.audioControl;
var control;
var timer;
getData('../mock/data.json');
function getData(url) {
    $.ajax({
        url: url,
        type: 'get',
        success: function (data) {
            // console.log(data);
            dataList = data;
            len = data.length;
            // audio.getAudio(data[0].audio);
            // root.render(data[0]);
            // root.pro.renderAllTime(dataList[0].duration);
            control = new root.indexControl(len);
            // console.log(data);
            root.list.renderList(data);
            root.list.addActive(0);
            bindEvent();
            bindTouch();
            $('body').trigger('play:change', 0);
        },
        error: function () {
            console.log('err');
        }
    });
}

function bindEvent() {
    $('body').on('play:change', function (e, index) { //绑定自定义事件
        root.render(dataList[index]);
        root.list.addActive(index);
        root.pro.renderAllTime(dataList[index].duration);
        audio.getAudio(dataList[index].audio);
        if (audio.status == 'play') {
            rotated(0);
            audio.play();

        }
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            transform: 'rotateZ(' + 0 + 'deg)',
            transition: 'none'
        });
    })
    $('body').on('play:change2', function (e, index) { //绑定自定义事件
        root.render(dataList[index]);
        root.list.addActive(index);
        root.pro.renderAllTime(dataList[index].duration);
        audio.getAudio(dataList[index].audio);
        rotated(0);
        audio.play();
        $('.img-box').attr('data-deg', 0);
        $('.img-box').css({
            transform: 'rotateZ(' + 0 + 'deg)',
            transition: 'none'
        });
    })
    $('.prev').on('click', function () {
        // if(nowIndex == 0) {
        //     nowIndex = len - 1;
        // }else {
        //     nowIndex --;
        // }
        var i = control.prev()
        $('body').trigger('play:change', i);
        // root.render(dataList[i]);
        // audio.getAudio(dataList[i].audio);
        // if(audio.status == 'play') {
        //     audio.play();
        // }
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
        }
    });
    $('.next').on('click', function () {
        // if(nowIndex == len - 1) {
        //     nowIndex = 0;
        // }else {
        //     nowIndex ++;
        // }
        var i = control.next();
        $('body').trigger('play:change', i);
        // root.render(dataList[i]);
        // audio.getAudio(dataList[i].audio);
        // if(audio.status == 'play') {
        //     audio.play();
        // }
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
        }
    });
    $('.play').on('click', function () {
        // console.log(audio);
        if (audio.status == 'play') {
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
        } else {
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotated(deg);
        }
        $('.play').toggleClass('playing'); //class名的切换
    });
    $('.list').on('click', function () {
        root.list.show();

    });
    $('.close').on('click', function () {
        root.list.close();
    });
    $('.wrap div').forEach(function (ele, index) {
        $(ele).on('click', function () {
            root.list.addActive(index);
            audio.indexPlay(dataList[index].audio);
            $('body').trigger('play:change2', index);
            root.pro.start(0);
            root.list.close();

                $('.play').addClass('playing');
            
        })
    })
}

function bindTouch() {
    var bottom = $('.bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    $('.slider').on('touchstart', function (e) {
        root.pro.stop();
    });
    $('.slider').on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per <= 1 && per >= 0) {
            // console.log(per)
            root.pro.upData(per);
        }
    });
    $('.slider').on('touchend', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w;
        if (per <= 1 && per >= 0) {
            var time = per * dataList[control.index].duration;
            audio.toPlay(time);
            audio.play();
            root.pro.start(per);
            audio.status = 'play';
            $('.play').addClass('playing');
        }
    });
}

function rotated(deg) {
    clearInterval(timer);
    // var deg = 0;
    deg = parseInt(deg);//转换成数字
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg', deg);
        $('.img-box').css({
            transform: 'rotateZ(' + deg + 'deg)',
            transition: 'transform 0.2s ease-out'
        });
        // console.log(deg);
    }, 200);
}


//图片，数据的渲染
//暂停，播放，切歌 
//图片旋转
//进度条的拖拽，运动
//列表切歌


