var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

gulp.task('lint', function() {
  gulp
    .src(['./src/js/**/*.js', '!./src/js/vendor/*'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('markup', function() {
  gulp
    .src(['./src/**/*.html'])
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('less', function() {
  gulp
    .src('./src/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      cascade: false,
      browsers: ['last 2 versions']
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('fonts', function() {
  gulp
    .src('./node_modules/material-ui/src/less/material-ui-icons/fonts/**')
    .pipe(gulp.dest('./build/fonts'));

  gulp
    .src('./node_modules/material-ui/src/less/material-design-fonticons/fonts/**')
    .pipe(gulp.dest('./build/fonts/mdfonticon'));

});

gulp.task('jsx', function() {
  function rebundle(bundler) {
    return bundler
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('./build/js'))
      .pipe(browserSync.reload({ stream: true }));
  }

  var bundler = browserify('./src/jsx/app.js', {
    cache: {},
    packageCache: {},
    fullPaths: true
  });
  bundler = watchify(bundler);

  bundler.on('update', function() {
    rebundle(bundler);
  });

  bundler.on('log', function(msg) {
    gutil.log('Rebundle:', msg);
  });

  return rebundle(bundler);
});

gulp.task('watch', function() {
  gulp.watch('./src/less/**/*.less', ['less']);
  gulp.watch('./src/**/*.html', ['markup']);
  gulp.watch('./src/js/**/*.js', ['lint']);
});

gulp.task('browserSync', ['markup', 'less', 'fonts', 'lint', 'jsx', 'watch'], function() {

  browserSync({
    server: { baseDir: './build' }
  });
});

gulp.task('default', ['browserSync']);
