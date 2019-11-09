(function ($, root) {
    function renderList(data) {
        console.log(data)
        var str = $(`<div class="list-wrap">
        <div class="play-list">播放列表</div>
        <div class="wrap">
        <div class="xue song">${data[0].singer} - ${data[0].song}</div>
        <div class="chen song">${data[1].singer} - ${data[1].song}</div>
        <div class="shape song">${data[2].singer} - ${data[2].song}</div>
        </div>
        <div class="close">关闭</div>
      </div>`);
        //   console.log(str);
        $('body').append(str);
    }
    function show() {
        $('.list-wrap').addClass('show');
    }
    function close() {
        $('.list-wrap').removeClass('show');
    }
    function addActive(index) {
        $('.active').removeClass('active');
        $('.wrap').children().eq(index).addClass('active');
    }

    root.list = {
        renderList: renderList,
        show: show,
        close: close,
        addActive: addActive
    }


})(window.Zepto, window.player || (window.player = {}))









