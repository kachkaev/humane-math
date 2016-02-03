'use strict';

import gulp from 'gulp';

const version = '0.0.1';

gulp.task('compile', () => {
    gulp.src('./src/**/*.es6')
    .pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.es6', ['compile']);
});

gulp.task('default', ['compile', 'watch']);
