'use strict';

var gulp = require('gulp'),
	wiredep = require('wiredep').stream,
	concat = require('gulp-concat'),
	sass = require('gulp-scss'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;


gulp.task('server', function() {
	browserSync.init({
		notify: false,
		port: 666,
		server: {
			baseDir: 'builds/dev'
		}
	});
});

// Подключаем ссылки на bower components
gulp.task('wiredep', function () {
	gulp.src('builds/dev/*.html')
		.pipe(wiredep())
		.pipe(gulp.dest('builds/dev'));
});

gulp.task('js', function() {
	gulp.src([
			'builds/dev/app/modules/app.js',
			'builds/dev/app/modules/main/*.js',
			'builds/dev/app/modules/**/*.js'])
	    .pipe(ngAnnotate())
	    .pipe(concat('main.js'))
	    .pipe(gulp.dest('builds/dev/app/js'))
	    .pipe(reload({stream: true}));
});


gulp.task('css', function() {
	gulp.src('builds/dev/app/**/*.scss')
		.pipe(sass())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('builds/dev/app/css/'))
		.pipe(reload({stream: true}));
});

gulp.task('html', function() {
	gulp.src('builds/dev/**/*.html');
		//.pipe(reload({stream: true}));
});

gulp.task('watch', function() {
	gulp.watch('builds/dev/**/*.html', ['html']);
	gulp.watch('builds/dev/app/modules/**/*.js', ['js']);
	gulp.watch('builds/dev/**/*.scss', ['css']);
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch([
		'builds/dev/app/*.html',
		'builds/dev/app/template/**/*.html',
		'builds/dev/app/modules/**/*.js',
		'builds/dev/app/css/**/*.css'
	]).on('change', reload);
});

gulp.task('default', [
	'server',
	'js',
	'css',
	'watch',
	'wiredep'
]);