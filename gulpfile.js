var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
    react = require('gulp-react'),
    concat = require('gulp-concat');

gulp.task('build', function() {
   return gulp.src([
       './src/js/crud.create.component.js',
       './src/js/crud.update.component.js',
       './src/js/crud.delete.component.js',
       './src/js/crud.table.component.js',
   ])
   .pipe(react())
   .pipe(uglify())
   .pipe(concat('crud.component.js'))
   .pipe(gulp.dest('./dist/js/'));
});