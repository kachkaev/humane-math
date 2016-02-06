import gulp from 'gulp';
import eslint from 'gulp-eslint';

const version = '0.0.1'; // eslint-disable-line

gulp.task('lint', () => {
    gulp.src('./src/*.es6')
        .pipe(eslint())
        .pipe(eslint.formatEach('compact', process.stderr));});

gulp.task('compile', () => {
    gulp.src('./src/**/*.es6')
    .pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.es6', ['compile']);
});

gulp.task('default', ['compile', 'watch']);
