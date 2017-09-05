var gulp = require('gulp');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task('html', function () {
  return gulp.src('src/*.pug')
    .pipe(plumber({errorHandler: notify.onError(function(error){return error.message;})}))
    .pipe(pug({
      pretty: true,
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('html:watch', function() {
  gulp.watch([
    'src/*.pug',
  ], ['html']);
});
