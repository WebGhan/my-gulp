const { watch, series, src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const less = require('gulp-less');

sass.compiler = require('node-sass');

// 压缩js
function compressJs() {
  return src('js/**/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist/js/'));
}
watch('js/**/*.js', compressJs)

// 压缩css
function compressCss() {
  return src('css/**/*.css')
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist/css/'));
}
watch('css/**/*.css', compressCss)

// 处理scss
function handleScss() {
  return src('scss/**/*.scss')
    // 可设置输出格式 CSS output style (nested | expanded | compact | compressed)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist/css/'));
}
watch('scss/**/*.scss', handleScss)

// 处理less
function handleLess() {
  return src('less/**/*.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest('dist/css/'));
}
watch('less/**/*.less', handleLess)

exports.build = series(compressJs, compressCss, handleScss, handleLess);