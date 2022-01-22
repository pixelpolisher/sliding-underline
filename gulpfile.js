const { src, dest, parallel } = require('gulp');
const watch       = require('gulp-watch');
const sass        = require('gulp-sass')(require('sass'));
const sourcemaps  = require('gulp-sourcemaps');
const sassGlob 		= require('gulp-sass-glob');
const clean       = require('gulp-clean');
const plumber     = require('gulp-plumber');
const notify      = require('gulp-notify');
const browserSync = require('browser-sync').create();

const basePath = './includes/';

const paths = {
	scss 	    : basePath + 'scss/',
  js        : basePath + 'js/',
  img       : basePath + 'img/',
  build     : basePath + 'build/'
};

function compileCss () {
	return src(`${paths.scss}/*.scss`)
    .pipe(plumber({ errorHandler: function(err) {
      notify.onError({
        title: `Gulp error in ${err.plugin}`
      })(err);
    }}))
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
		.pipe(browserSync.stream())
    .pipe(dest(paths.build))
    .pipe(notify('compiled css'));
}

function watchCss() {
  return compileCss()
    .pipe(watch(`${paths.scss}**/*.scss`, compileCss));
}

function serve () {
	browserSync.init({
		server: {
			baseDir: './',
		}
	});

	watchCss();
}

exports.compileCss    = compileCss;
exports.watchCss      = watchCss;
exports.serve 				= serve;
exports.watch         = parallel(watchCss);
exports.default       = parallel(compileCss);
