const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      babel        = require("gulp-babel"),
      path         = require('path'),
      uglifyCss    = require('gulp-uglifycss'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin     = require('gulp-imagemin'),
      concat       = require('gulp-concat'),
      concatCss    = require('gulp-concat-css'),
      uncss        = require('gulp-uncss');
      htmlmin      = require('gulp-htmlmin');

gulp.task('html', () => {
  return gulp.src(path.join(__dirname, "app/index.html"))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.join(__dirname, 'dist/')))
});

gulp.task('css', () => {
  return gulp.src([path.join(__dirname, "app/public/style.css"), path.join(__dirname, "app/public/icons/css/slate.css")])
    .pipe(concatCss("styles.css"))
    .pipe(autoprefixer())
    .pipe(uglifyCss())
    .pipe(uncss({
      html: ['app/index.html']
    }))
    .pipe(gulp.dest(path.join(__dirname, "dist/css/")))
});

/* ------ Tranfert fonts folder ----- */
gulp.task('fonts', () => {
  return gulp.src(path.join(__dirname, "app/public/icons/font/**/*"))
    .pipe(gulp.dest(path.join(__dirname, 'dist/fonts')))
});

/* ------ Watch news in html, scss, js files. ----- */
gulp.task('watch', ['html', 'css', 'fonts'], () => {
  gulp.watch(['./app/index.html'], ['html']);
  gulp.watch(['./app/public/**/*.css'], ['css']);
});

/* ------ Build application. ----- */
gulp.task('build', ['html', 'css', 'fonts'], () => {
  // Make a build
  // Transpilation es6 to es5
  // Then ... adding some minification.
});

gulp.task('default', ['watch']);