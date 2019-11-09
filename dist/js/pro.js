(function ($, root) {
    var duration, frameId;
    var lastPer = 0;
    var startTime;
    function renderAllTime(srcTime) {
        // console.log(srcTime);
        duration = srcTime;
        var time = formatTime(srcTime);
        $('.all-time').html(time);
    }
    /***
     * 格式化时间
     */
    function formatTime(t) {
        t = Math.round(t);
        var m = Math.floor(t / 60 );
        var s = t - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }

    function start(t) {
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        // console.log(time)
        lastPer = t == undefined ? lastPer : t;
        function frame() {
            var curTime = new Date().getTime();// 这个是毫秒
            // console.log(curTime)
            // console.log(curTime - time)
            var per = lastPer + (curTime - startTime) / (duration * 1000);
            // console.log(per)
            if(per <= 1) {
                //进度条运动
                upData(per);
            }else {
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);  //根据浏览器刷新页面的频率来刷新
        }
        frame();
    }
    function upData(per) {
        var num = formatTime(per * duration);
         $('.cur-time').html(num);
        var x = (per - 1) * 100;
        $('.top').css({
            transform: `translateX(${x}%)`
        })
    }
    function stop() {
        cancelAnimationFrame(frameId);
        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000);
        // console.log(lastPer);
    }
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        upData: upData
    }



})(window.Zepto, window.player || (window.player = {}))