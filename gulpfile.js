'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var del = require('del');

gulp.task('less', function() {
    return gulp.src('resources/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('app/css/'));
});

gulp.task('copy', function() {
    gulp.src('node_modules/angular/angular.js').pipe(gulp.dest('app/js/vendors/angular/'));
    gulp.src('node_modules/pressure/dist/pressure.*').pipe(gulp.dest('app/js/vendors/pressure/'));
    gulp.src('node_modules/angular-pressure/angular.pressure.*').pipe(gulp.dest('app/js/vendors/angular-pressure/'));
    gulp.src('node_modules/angular-touch/angular-touch.*').pipe(gulp.dest('app/js/vendors/angular-touch/'));
    gulp.src('node_modules/decimal.js/*.js').pipe(gulp.dest('app/js/vendors/decimal.js/'));
})

gulp.task('clean', function() {
    del([
        'app/css/*.css',
        'app/js/vendors/**/*'
    ]);
});

gulp.task('copy:docs', function(){
    gulp.src('app/**/*').pipe(gulp.dest('docs'));
});

gulp.task('default', ['less', 'copy']);
