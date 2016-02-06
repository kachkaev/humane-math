import gulp from 'gulp';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import jsdoc from 'gulp-jsdoc3';
import jsdocConfig from './.jsdoc.json';

const version = '0.0.1'; // eslint-disable-line

gulp.task('lint', () => {
    gulp.src('./src/*.js')
        .pipe(eslint())
        .pipe(eslint.formatEach('compact', process.stderr));});

gulp.task('build', () => {
    gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('doc', ['build'], function (cb) {
    gulp.src(['README.md', './build/**/*.js'])
        .pipe(jsdoc(jsdocConfig, cb));
});

gulp.task('default', ['build', 'doc', 'watch']);
