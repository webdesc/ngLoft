module.exports = function(config) {
	config.set({
		basePath: './',
		files: [
			'bower_components/angular/angular.js',
			'bower_components/angular-route/angular-route.js',
			'bower_components/angular-mocks/angular-mocks.js',
			'builds/dev/app/**/*.js'
		],
		autoWatch: true,
		framework: ['jasmine'],
		browser: ['Chrome'],
		reportest: ['progress', 'junit'],
		junitReporter: {
			outputDir: 'test_out',
			outputFile: 'unit.xml',
			suite: ''
		}
	});
}