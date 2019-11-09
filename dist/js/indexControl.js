

(function ($, root) {
    function Control(len) {
        this.index = 0;
        this.len = len;
    }
    Control.prototype = {
        prev: function () {
            // if (this.index == 0) {
            //     this.index = len - 1;
            // } else {
            //     this.index --;
            // }
            return this.getIndex(-1);
        },
        next: function () {
            // if (this.index == len - 1) {
            //     this.index = 0;
            // } else {
            //     this.index ++;
            // }
            return this.getIndex(1);
        },
        // 计算改变后的索引
        getIndex: function (val) {
            //当前索引
            var index = this.index;
            //数据长度
            var len = this.len;
            var curIndex = (val + index + len) % len;
            this.index = curIndex;
            //改变后的索引
            return curIndex;
        }
    }

    root.indexControl = Control;  //因为要传参数，所以暴露构造函数

})(window.Zepto, window.player || (window.player = {}));