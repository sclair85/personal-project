const {src, dest, parallel, series, watch, prefix} = require('gulp');
const browsersync = require('browser-sync');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const htmlReplace = require('gulp-html-replace');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

function browserSync() {
  return browsersync.init({
    server: {
      baseDir: './dist',
    },
    port: 3000,
  });
}

function htmlTask() {
  return src('src/*.html')
  .pipe(htmlReplace({
    css: 'css/all-styles.css',
    js: 'js/bundle.js',
  }))
  .pipe(dest('dist'))
  .pipe(browsersync.stream);
}

function prefixTask() {
  return src('src/css/global.css')
  .pipe(autoprefixer())
  .pipe(dest('dist/css'))
}

function stylesTask() {
  return src(['src/css/style.css', 'src/css/*.css'])
  .pipe(sourcemaps.init())
  .pipe(autoprefixer())
  .pipe(concat('all-styles.css'))
  .pipe(cleanCss())
  .pipe(sourcemaps.write())
  .pipe(dest('dist/css'))
  .pipe(browsersync.stream);
}

function lintTask() {
  return src('src/js/test.js')
  .pipe(eslint({}))
  .pipe(eslint.format());
}

function scriptsTask() {
  return src(['src/js/app.js', 'src/js/game1.js'])
  .pipe(eslint({}))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
  .pipe(sourcemaps.write())
  .pipe(dest('dist/js'))
  .pipe(browsersync.stream);
}

function imagesTask() {
  return src('src/img/*')
  .pipe(imagemin())
  .pipe(dest('dist/img'))
  .pipe(browsersync.stream);
}

function watchFiles() {
  watch('src/*.html', stylesTask);
  watch('src/css/*.css', stylesTask);
  watch('src/script/*.js', stylesTask);
  watch('src/img/*.js', stylesTask);
}


exports.lint = lintTask;
exports.prefix = prefixTask;
exports.htmlTask = htmlTask;
exports.stylesTask = stylesTask;
exports.scriptsTask = scriptsTask;
exports.imagesTask = imagesTask;
exports.watch = parallel(watchFiles, browserSync);
exports.dev = series(parallel(htmlTask, scriptsTask, stylesTask, imagesTask), parallel(watchFiles, browserSync));
exports.default = parallel(htmlTask, stylesTask, scriptsTask, imagesTask);
