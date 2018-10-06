var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

gutil.log("Let's have it!");

gulp.task('default', function(){
	gulp.src('src/sass/*.scss')
		.on('data', function(chunk){
			console.log(chunk.path);
		});

	return gulp.src('src/sass/minimal.scss')
		.pipe(sass()) // Using gulp-sass
		.on('error', function (err) {
			console.log(err.toString());

			this.emit('end');
		})
		.pipe(gulp.dest('assets/css/'))

});

gulp.watch('src/sass/**/*.scss', ['default']);
