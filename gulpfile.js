'use strict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sass = require('gulp-scss'),
	uglify = require('gulp-uglify'),
	ngAnnotate = require('gulp-ng-annotate'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

gulp.task('js', function() {
	gulp.src([
		'bower_components/angular/angular.js',
		'bower_components/angular-route/angular-route.js',
		'bower_components/angular-bootstrap/ui-bootstrap.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
		'bower_components/angular-resource/angular-resource.min.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js'
		])
		.pipe(concat('libs.js'))
		.pipe(gulp.dest('builds/dev'));
	gulp.src([
		'builds/dev/app/**/*.js',
		'!builds/dev/app/**/*_test.js'
		])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('builds/dev'))
		.pipe(reload({stream: true}));
});

gulp.task('css', function() {
	gulp.src([
		'bower_components/bootstrap/dist/css/bootstrap.css',
		'bower_components/bootstrap/dist/css/bootstrap-theme.css',
		'bower_components/angular-bootstrap/ui-bootstrap-csp.css',
		'bower_components/angular/angular-csp.css'
		])
		.pipe(concat('theme.css'))
		.pipe(gulp.dest('builds/dev'));
	gulp.src('builds/dev/app/**/*.scss')
		.pipe(sass())
		.pipe(concat('app.css'))
		.pipe(gulp.dest('builds/dev'))
		.pipe(reload({stream: true}));
});

gulp.task('html', function() {
	gulp.src('builds/dev/**/*.html')
		.pipe(reload({stream: true}));
});

gulp.task('watch', function() {
	gulp.watch('builds/dev/**/*.html', ['html']).on('change', reload);
	gulp.watch('builds/dev/**/*.js', ['js']).on('change', reload);
	gulp.watch('builds/dev/**/*.scss', ['css']).on('change', reload);
});

gulp.task('server', function() {
	browserSync.init({
		notify: false,
		port: 666,
		server: {
			baseDir: 'builds/dev'
		}
	});
});

gulp.task('default', [
	'js',
	'css',
	'watch',
	'server'
]);