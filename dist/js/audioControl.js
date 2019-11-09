// 音频的暂停，播放，获得音频

(function ($, root) {
    function AudioManager () {
        //创建audio对象
        this.audio = new Audio();
        //audio默认状态
        this.status = 'pause';
    }
AudioManager.prototype = {
    play: function () {
        this.audio.play();
        this.status = 'play';
    },
    pause: function () {
        this.audio.pause();
        this.status = 'pause';
    },
    getAudio: function (src) {
        // console.log(src);
        this.audio.src = src;
        this.audio.load();  //加载当前音频，只是加载，没有播放
    },
    toPlay: function (t) {
        this.audio.currentTime = t; 
    },
    indexPlay: function (src) {
        this.audio.src = src;
        this.audio.play();
    }
}

root.audioControl = new AudioManager();

})(window.Zepto, window.player || (window.palyer = {}))


