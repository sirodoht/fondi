var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('styles', function () {
  gulp.src('./front/styles/**/*.scss')
    .pipe(concat('style.scss'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./front/static/css'));
});

gulp.task('styles:watch', function () {
  gulp.watch('./front/styles/**/*.scss', ['styles']);
});

gulp.task('default', function () {
  console.log('# Gulp tasks');
  console.log('gulp styles :: Compiles Sass styles');
});
