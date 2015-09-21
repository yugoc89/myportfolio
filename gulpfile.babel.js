// generated on 2015-09-10 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins(),
	reload = browserSync.reload,
	autoprefixer = require('autoprefixer'),
	center = require('postcss-center'),
	clearfix = require('postcss-clearfix'),
	colorshort = require('postcss-color-short'),
	cssmqpacker = require('css-mqpacker'),
	cssnano = require('cssnano'),
	cssnext = require("cssnext"),
	focus = require('postcss-focus'),
	postcss = require('gulp-postcss'),
	precss = require('precss'),
	pxtorem = require('postcss-pxtorem'),
	short = require('postcss-short'),
	size = require('postcss-size'),
	assets = require('postcss-assets'),
	rucksack = require('rucksack-css'),
	baseAssets = 'html//wp-content/themes/portfolio';

gulp.task('styles', () => {
	return gulp.src('src/scss/*.scss')
	.pipe($.plumber())
	.pipe($.sourcemaps.init())
	.pipe($.sass.sync({
		outputStyle: 'expanded',
		precision: 10,
		includePaths: ['.']
	}).on('error', $.sass.logError))
	.pipe($.autoprefixer({browsers: ['last 2 version']}))
	.pipe($.sourcemaps.write())
	.pipe(gulp.dest('.tmp/scss'))
	.pipe(reload({stream: true}));
});

gulp.task('postcss', () => {
	var processors = [
		//colorshort,
		//focus,
		precss,
		rucksack,
		center,
		//short,
		size,
		//clearfix,
		pxtorem,
		cssnext,
		cssmqpacker,
		autoprefixer({ browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'] }),
		cssnano
	];
	return gulp.src('src/css/*.css')
	.pipe($.plumber())
	.pipe($.sourcemaps.init())
	.pipe(postcss(processors))
	.pipe($.sourcemaps.write('.'))
	.pipe(gulp.dest(baseAssets))
	.pipe(reload({stream: true}));
	//.pipe(connect.reload());
});

function lint(files, options) {
	return () => {
		return gulp.src(files)
		.pipe(reload({stream: true, once: true}))
		.pipe($.eslint(options))
		.pipe($.eslint.format())
		.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
	};
}
const testLintOptions = {
	env: {
		mocha: true
	}
};

//gulp.task('lint', lint('src/js/**/*.js'));
//gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

//gulp.task('html', ['postcss'], () => {
//	const assets = $.useref.assets({searchPath: ['.tmp', 'src', '.']});
//
//	return gulp.src('src/html/**/*.html')
//	.pipe(assets)
//	.pipe($.if('*.js', $.uglify()))
//	.pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
//	.pipe(assets.restore())
//	.pipe($.useref())
//	.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
//	.pipe(gulp.dest('app'));
//});

gulp.task('ect', () => {
	const assets = $.useref.assets({searchPath: ['.tmp', 'src', '.']});

	return gulp.src('src/template/**/*.html.ect')
	.pipe(require('gulp-ect')({
		options: {
			ext: 'html'
		}
	}))
	.pipe(require("gulp-rename")(function(path){
		path.extname = ''
	}))
	.pipe(assets)
	.pipe($.if('*.js', $.uglify()))
	.pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
	.pipe(assets.restore())
	.pipe($.useref())
	.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
	.pipe(gulp.dest('app'));
});

gulp.task('images', () => {
	return gulp.src('src/images/**/*')
	.pipe($.if($.if.isFile, $.cache($.imagemin({
		progressive: true,
		interlaced: true,
		// don't remove IDs from SVGs, they are often used
		// as hooks for embedding and styling
		svgoPlugins: [{cleanupIDs: false}]
	}))
	.on('error', function (err) {
		console.log(err);
		this.end();
	})))
	.pipe(gulp.dest(baseAssets + '/assets/images'));
});

gulp.task('fonts', () => {
	return gulp.src(require('main-bower-files')({
		filter: '**/*.{eot,svg,ttf,woff,woff2}'
	}).concat('src/fonts/**/*'))
	.pipe(gulp.dest('.tmp/fonts'))
	.pipe(gulp.dest(baseAssets + '/assets/fonts'));
});

gulp.task('js', () => {
	return gulp.src('src/js/*')
	.pipe(require('gulp-uglify')())
	.pipe(require("gulp-rename")('scripts.min.js'))
	.pipe(gulp.dest(baseAssets + '/assets/js'))
	//.pipe(connect.reload());
});


gulp.task('extras', () => {
	return gulp.src([
		'src/*.*',
		'!src/*.html'
	], {
		dot: true
	}).pipe(gulp.dest(baseAssets));
});

//gulp.task('clean', del.bind(null, ['.tmp', 'app']));

gulp.task('serve', ['postcss', 'fonts'], () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['app']
		}
});

gulp.watch([
	'src/template/**/*.ect',
	'src/js/**/*.js',
	'src/images/**/*',
	'.tmp/fonts/**/*'
]).on('change', reload);

//gulp.watch('src/scss/**/*.scss', ['styles']);
gulp.watch('src/css/**/*.css', ['postcss']);
gulp.watch('src/fonts/**/*', ['fonts']);
gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: ['app']
		}
	});
});

gulp.task('serve:test', () => {
	browserSync({
		notify: false,
		port: 9000,
		ui: false,
		server: {
			baseDir: 'test',
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	});

	gulp.watch('test/spec/**/*.js').on('change', reload);
	gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components

gulp.task('build', ['postcss', 'js', 'images', 'ect', 'fonts', 'extras'], () => {
	return gulp.src('src/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', () => {
	gulp.start('build');
	gulp.start('serve');
});
