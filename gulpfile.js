//通过require方法引入gulp模块
const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps")
const connect = require("gulp-connect")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
const rename = require("gulp-rename")
const cleanCss = require("gulp-clean-css")
const babel = require("gulp-babel")
//创建任务 （利用task方法）
gulp.task("hello",function(){
	console.log("hello world");
});
/*//创建默认任务 可以将多个任务放到默认任务里执行
gulp.task("default",function(){
	console.log("default task");
});*/
/*gulp.task("default",["hello"]);*/

//拷贝文件  （通常同时会建立一个dist文件夹 用来存放拷贝的文件）
gulp.task("copy-index",function(){
	gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload());	
});
gulp.task("copy-img",function(){
	gulp.src("img/*.{jpg,png}").pipe(gulp.dest("dist/img"));
});
//全拷贝  文件夹内还有文件夹的话 同时也想获得到其内容的话就用**
gulp.task("copy-all",function(){
	gulp.src("img/**").pipe(gulp.dest("dist/img"));
});
//两个文件夹同时拷贝到某一个文件夹下
gulp.task("data",function(){
	gulp.src(["json/*.json","xml/*.xml"]).pipe(gulp.dest("dist/data"));
});
//排除文件拷贝  !json/data.json
gulp.task("data",function(){
	gulp.src(["xml/*.xml","json/*.json","!json/data.json"]).pipe(gulp.dest("dist/data"));
});
//多任务同时执行
gulp.task("default",["copy-index","copy-img","copy-all","data"],function(){
	console.log("success");
});
gulp.task("copy-js",function(){
	gulp.src("js/**").pipe(gulp.dest("dist/js"));
})
//监听
gulp.task("watch",function(){
	gulp.watch("index.html",["copy-index"]);
	gulp.watch("js/**",["copy-js"]);
	gulp.watch("sass/*",["sass"]);
	
});
gulp.task("sass",function(){
	gulp.src("sass/*")
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(cleanCss())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
});
gulp.task("server",function(){
	connect.server({
		root:"dist",
		livereload:true
		});
});
gulp.task("concat",function(){
	gulp.src(["js/a.js","js/b.js"])
	.pipe(concat("a_b.js"))
	.pipe(uglify())
	.pipe(rename("a_b.min.js"))
	.pipe(gulp.dest("dist/js"))
});
gulp.task("babel",function(){
	gulp.src("js/common.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(gulp.dest("dist/js"));
});

gulp.task("default",["server","watch"]);

