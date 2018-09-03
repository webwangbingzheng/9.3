var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var minjs = require('gulp-uglify');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mock = require('./mock/index.js');

// css编译压缩
gulp.task('sass', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
});
// 压缩js
gulp.task('js', function() {
    return gulp.src('./src/js/*.js')
        .pipe(minjs())
        .pipe(gulp.dest('./src/bulid'))
});
// 创建服务
gulp.task('server', function() {
    return gulp.src('./src/')
        .pipe(server({
            port: 8001,
            // open: true,
            middleware: function(req, res) {
                if (req.url === '/favicon.ico') {
                    res.end('');
                    return;
                }
                var pathname = url.parse(req.url).pathname;
                if (/^\/api/.test(pathname)) {
                    res.end(mock(pathname));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
// watch刷新
gulp.task('watch', function() {
        return gulp.src('./src/sass/*.scss', gulp.series('sass'));
    })
    // 按顺序执行
gulp.task('default', gulp.series('sass', 'js', 'server', 'watch'));