var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');

gulp.task('html', function () {
  return gulp.src('src/[^_]*.pug')
    .pipe(plumber({ errorHandler: require('../assets/errorHandler') }))
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('html:watch', function () {
  watch('src/**/*.pug', function () {
    gulp.run('html');
  });
});
