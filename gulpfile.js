var gulp = require('gulp'),
	del = require('del'),
	ts = require('gulp-typescript'),
    tscConfig = require('./tsconfig.json'),
    nodemon = require('gulp-nodemon'),
    PATHS = {
		src: {
			html: 'src/app/**/*.html',
			app: 'src/app/**/*.ts',
			server: 'src/server/**/*.ts'
		},
		dist: {
			app: 'dist/app',
			server: 'dist/server'
		}
	};

gulp.task('clean',function(done) {
	return del(['dist'], done);
});

gulp.task('watch:server', function() {
	gulp.watch(PATHS.src.server, ['clean', 'ts2js:server']);
});

gulp.task('watch:app', function() {
	gulp.watch(PATHS.src.app, ['clean', 'html','ts2js:app']);
});

gulp.task('ts2js:app', function () {
	return gulp
		.src([PATHS.src.app, 'node_modules/angular2/typings/browser.d.ts'])
		.pipe(ts(tscConfig.compilerOptions))
		.pipe(gulp.dest(PATHS.dist.app));
});

gulp.task('html', function () {
	return gulp
		.src(PATHS.src.html)
		.pipe(gulp.dest(PATHS.dist.app));
});

gulp.task('ts2js:server', function () {
	return gulp
		.src([PATHS.src.server])
		.pipe(ts(tscConfig.compilerOptions))
		.pipe(gulp.dest(PATHS.dist.server));
});

gulp.task('play', ['html', 'ts2js:app'], function () {
    var express = require('express');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app = express();

    gulp.watch(PATHS.src.app, ['ts2js:app']);
    app.use(serveStatic(__dirname));

    app.listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('develop', ['html', 'ts2js:app'], function () {
	nodemon({
		script: 'dist/app/server.js',
		ext: 'html js',
		ignore: ['ignored.js']
	})
	.on('restart', function () {
		console.log('restarted!')
	})
})

gulp.task('server', ['clean', 'ts2js:server', 'watch:server'])
gulp.task('app', ['clean', 'play', 'watch:app'])
gulp.task('default', ['server,app']);