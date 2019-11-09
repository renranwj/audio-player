// package-lock.json 只用来存放工具，或者是插件，或者是插件的下载地址
//gulp 减少频繁的IO操作（文件输入，输出），一次将文件全部输入，变成一个文件流。


var gulp = require("gulp");


//压缩html
var htmlClean = require('gulp-htmlclean');

//压缩图片
var imageMin = require('gulp-imagemin');

//压缩js
var uglify = require('gulp-uglify');

//去掉js中的调试语句
var stripDebug = require('gulp-strip-debug');

//将less转换成css
var less = require('gulp-less');

//压缩css
var cssClean = require('gulp-clean-css');

//css中添加前缀
//gulp-postcss autoprefixer(当参数传进去)
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

//开启服务器
var connect = require("gulp-connect");



//判断当前环境变量 （开发环境，生产环境）
var devMod = process.env.NODE_ENV == "development";
console.log(devMod);
//设置环境变量    export NODE_ENV=development



var folder = { //避免因文件夹名称的修改，导致后面所有有关文件夹名称的代码都需要改变
    src: "src/",  //开发目录
    dist: "dist/"   //打包后的目录
}

gulp.task("html", function (done) {
    var page = gulp.src(folder.src + "html/*") // 拿到html文件下的所有文件
        .pipe(connect.reload());  //重新刷新
        if(!devMod) {  //如果是生产环境，再进行压缩
            page.pipe(htmlClean());   //进行html文件的压缩
        }
        page.pipe(gulp.dest(folder.dist + "html/")); //（取到之后放到管道当中）， 在这里我们不做任何处理，直接放到dist文件夹下。
    //gulp.dest()  将文件写入到此文件夹下。如果文件夹不存在，会自动生成。
    done();
});
gulp.task("css", function (done) {
   var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())  //重新刷新
        .pipe(less())   //less转换成css
        .pipe(postCss([autoprefixer({//添加前缀
            // 兼容主流浏览器的最新两个版本
            browsers: ['last 2 versions'],
            // 是否美化属性值
            cascade: true
        })]));
        if(!devMod) {
            page.pipe(cssClean());  //压缩css
        }
        
        page.pipe(gulp.dest(folder.dist + "css/"));
    done();
});
gulp.task("js", function (done) {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload());  //重新刷新
       if(!devMod) {
        page.pipe(stripDebug())   //去掉js中的调试语句
        .pipe(uglify());   //压缩js
       }
        page.pipe(gulp.dest(folder.dist + "js/"));
    done();
})
gulp.task("image", function (done) {
    gulp.src(folder.src + "image/*")
        .pipe(imageMin())   //压缩图片
        .pipe(gulp.dest(folder.dist + "image/"));
    done();
});
//开启服务器
gulp.task('server', function (done) {
    connect.server({
        port: '8888',  //修改端口号
        livereload: true   //自动刷新
    });
    done();
});





//监听文件变化
gulp.task("watch", function () {
    gulp.watch(folder.src + "html/*", gulp.series('html'));//监听src下的html文件，一改变就会执行html任务
    gulp.watch(folder.src + "css/*", gulp.series('css'));
    gulp.watch(folder.src + "js/*", gulp.series('js'));
});





//创建任务
//一执行，就会找到当前的配置文件，入口就是当前的default
gulp.task("default", gulp.series("html", "css", "js", "image", "server", "watch"), function (done) {
    done();
});//默认任务，依赖其他任务



//Vinyl 是描述文件的元数据对象
//四个API
//gulp.src()  创建一个流，用于从文件系统读取 Vinyl 对象。
//gulp.dest()
//gulp.task()
//gulp.watch()

//流操作


//gulp  ->  runner task   任务运行器  流操作  增强工作流程
//webpack  -> moudle bundle  模块打包器  把一切处理看成一个模块





//模块化思想 ： 把同一类功能放在同一个文件中，并且封装起来，并且只对外暴漏接口，（面向对象）
//我们只是关心，这个功能暴露的这个接口，我们如何来调用它，在调用的时候，就不用关心里面是如何实现的





