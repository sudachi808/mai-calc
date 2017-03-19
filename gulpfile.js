'use strict';

var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function() {
    return gulp.src('resources/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css/'));
});

gulp.task('copy', function() {
    gulp.src('node_modules/pressure/dist/pressure.*').pipe(gulp.dest('app/js/vendors/pressure/'));
    gulp.src('node_modules/angular-pressure/angular.pressure.*').pipe(gulp.dest('app/js/vendors/angular-pressure/'));
})

gulp.task('default', ['less', 'copy']);
