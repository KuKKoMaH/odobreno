var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var postcss = require('gulp-postcss');

var errorHandle = require('../assets/errorHandler');

var processors = [
  autoprefixer({
    browsers: ['last 4 versions'],
    cascade:  false
  }),
  require('lost'),
  mqpacker({
    sort: require('../assets/sortMediaQueries')
  }),
  csso
];

gulp.task('css', function () {
  return gulp
    .src('src/*.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .on('error', errorHandle)
    // .pipe(postcss(processors))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('build'));
});

gulp.task('sass:watch', function () {
  gulp.watch(config.src.sass + '/**/*.{sass,scss}', ['sass']);
});