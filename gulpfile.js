process.env.NODE_ENV = 'dev';
const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);
/**
 * Gulp Tasks
 */

 gulp.task('sass', () =>  {
   gulp.src('./client/scss/style.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
            .pipe(sourcemaps.write())
            .pipe(autoprefixer({
               browsers: ['last 3 versions'],
               cascade: false
             }))
            .pipe(gulp.dest('./dist/style/'))
            .pipe(browserSync.stream());
 })

gulp.task('watch', function(){
  gulp.watch([ './client/scss/**/*.scss'], ['sass']);
  gulp.watch(['./views/**/*.ejs'], reload);
})

gulp.task('browser-sync', ['nodemon', ], function() {
  browserSync({
    proxy: {
      target: "localhost:8080",
      middleware: [
        require("webpack-dev-middleware")(compiler, {
          noInfo: true, publicPath: webpackConfig.output.publicPath
        }),
        require("webpack-hot-middleware")(compiler)
      ]
    },
    notify: true,
    open: false,
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'index.js',
    ignore: [
      'gulpfile.js',
      'node_modules/',
      // 'client/**/*.js'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);

  });
});

gulp.task('default', ['browser-sync', 'watch'], function () {
  gulp.watch(['public/*.html'], reload);
});
