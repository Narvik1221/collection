const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const htmlReplace = require('gulp-html-replace');
const connect = require('gulp-connect');
const cleanCSS = require('gulp-clean-css');
const fileInclude = require('gulp-file-include');

// HTML обработка
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlReplace({
        'css': 'css/style.min.css',
        'js': 'js/main.min.js'
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

// JS обработка - правильный порядок файлов
gulp.task('js', function() {
  return gulp.src([
      'src/js/components/header.js', // Сначала компоненты
      'src/js/main.js'               // Потом основной файл
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

// Сервер
gulp.task('serve', function() {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8080
  });
});

// Наблюдатель
gulp.task('watch', function() {
  gulp.watch('src/**/*.html', gulp.series('html'));
  gulp.watch('src/less/**/*.less', gulp.series('less'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
  gulp.watch('src/fonts/**/*', gulp.series('fonts'));
  gulp.watch('src/img/**/*', gulp.series('images'));
});

gulp.task('build', gulp.parallel('html', 'less', 'js', 'fonts', 'images'));
gulp.task('default', gulp.parallel('build', 'serve', 'watch'));