'use strict';

var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function() {
    return gulp.src('resources/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css/'));
});

gulp.task('default', ['less']);
