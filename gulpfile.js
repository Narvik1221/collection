const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const connect = require('gulp-connect');
const cleanCSS = require('gulp-clean-css');
const fileInclude = require('gulp-file-include');

// HTML обработка
gulp.task('html', function() {
  return gulp.src('src/pages/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

// LESS компиляция
gulp.task('less', function() {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload());
});

// JS обработка
gulp.task('js', function() {
  return gulp.src([
      'src/js/components/*.js',
      'src/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(connect.reload());
});

// Копирование шрифтов
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts/'));
});

// Копирование изображений
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img/'));
});

// Копирование данных
gulp.task('data', function() {
  return gulp.src('src/data/**/*')
    .pipe(gulp.dest('dist/data/'));
});

// Сервер
gulp.task('serve', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8080,
    fallback: 'dist/index.html'
  });
});

// Наблюдатель
gulp.task('watch', function() {
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/less/**/*.less', gulp.series('less'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/fonts/**/*', gulp.series('fonts'));
  gulp.watch('src/img/**/*', gulp.series('images'));
  gulp.watch('src/data/**/*', gulp.series('data'));
});

// ОДНА задача build (уберите дубликаты)
gulp.task('build', gulp.parallel('html', 'less', 'js', 'fonts', 'images', 'data'));
gulp.task('default', gulp.parallel('build', 'serve', 'watch'));