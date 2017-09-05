var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var include  = require("gulp-include");
var browserSync = require('browser-sync');

gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(include({
      includePaths: [
        __dirname + "/../node_modules",
      ]
    }))
    .on('error', function(){notify("Javascript include error");})
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:watch', function() {
  gulp.watch(['src/js/*.js'], ['js']);
});
