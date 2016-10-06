'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var uncss = require('gulp-uncss');

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

      script: 'app.js',

      watch: ['app.js']
    })
    .on('start', function onStart() {
      if (!called) {
        cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {

  browserSync({

    proxy: 'http://localhost:8080',
    port: 4000,

    // open the proxied app in chrome
    browser: ['google-chrome']
  });
});

gulp.task('js', function () {
  return gulp.src('private/js/*.js')
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("public/js"))
});

gulp.task('css', function () {
  return gulp.src('private/css/*.css')
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
      stream: true
    }));;
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync', 'js'], function () {
  gulp.watch('private/**/*.js', ['js', browserSync.reload]);
  gulp.watch('private/**/*.css', ['css']);
  gulp.watch('public/**/*.html', ['bs-reload']);
});