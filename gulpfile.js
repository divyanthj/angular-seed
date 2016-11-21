'use strict';

var gulp = require('gulp'),

    pug = require('gulp-pug'),

    sass = require('gulp-sass'),

    inject = require('gulp-inject'),

    open = require('gulp-open');


gulp.task('buildpug', function() {

  return gulp.src('src/**/*.pug')

    .pipe(pug({

      'pretty' : true

    }))

    .pipe(gulp.dest('www/'));

});

gulp.task('injectjs', ['buildjs'], function() {

  var target = gulp.src('www/index.html');

  var sources = gulp.src([

    'www/bower_components/angular/angular.js',

    'www/scripts/**/*.js'

  ] , {

    read : false

  });

  return target.pipe(inject(sources , {

    relative : true

  }))

    .pipe(gulp.dest('www/'));

});

gulp.task('buildjs', function() {

  return gulp.src('src/scripts/**/*.js')

    .pipe(gulp.dest('www/scripts/'));

});

gulp.task('buildcss', function() {

  return gulp.src('src/styles/**/*.scss')

    .pipe (sass())

    .pipe(gulp.dest('www/styles/'));

});

gulp.task('watch', function() {

  gulp.watch('src/scripts/**/*.js', ['buildjs']);

  gulp.watch('src/views/**/*.pug', ['buildpug']);

  gulp.watch('src/styles/**/*.scss', ['buildcss']);

});

gulp.task('build', ['buildpug', 'injectjs']);

gulp.task('serve', ['build'], function() {

  gulp.src('www/index.html')
  
    .pipe(open());

});
