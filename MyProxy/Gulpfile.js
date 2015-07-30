/// <vs BeforeBuild='validate' />
/// <binding BeforeBuild='validate' />
'use strict';

var appConfig = require('./config/app.json');
  
var gulp = require('gulp')
  , $ = require('gulp-load-plugins')({
    pattern: [
      'gulp-*'
    ],
    rename: {
        'gulp-less-sourcemap': 'less'
    }
  })
  , sourceFile ={
        sass:[appConfig.rootPath + '/styles/{,*/}*.scss'],
        js:[appConfig.rootPath + '/scripts/{,*/}*.js']
      
    };
 
gulp.task('less', function () {
    gulp.src(appConfig.css.less.files)
    .pipe($.less({
        sourceMap: {
            sourceMapRootpath: appConfig.css.less.rootPathLess // Optional absolute or relative path to your LESS files 
        }
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass', function () {
    gulp.src(appConfig.sass.files)
    .pipe($.sourcemaps.init())
    .pipe($.sass())
    .pipe($.sourcemaps.write('.', {
        includeContent: false,
        sourceRoot: appConfig.sass.rootPathSass
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('concat-js', function () {
    gulp.src(appConfig.js.concat.files)
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.concat(appConfig.js.concat.outFileName))
        .pipe($.sourcemaps.write('.',
        {
            includeContent: false,
            sourceRoot: ''
        }))
        .pipe(gulp.dest(appConfig.js.concat.outPath));
});

gulp.task('minify-image', function () {
    gulp.src(appConfig.rootPath + '/images/*')
        .pipe($.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(appConfig.dist + '/images'));
});

gulp.task('minify-html', function () {
    gulp.src('static/**/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'))
});

gulp.task('minify-css', function () {
    var sassFilter = $.filter('**/*.scss');
    var cssFilter = $.filter('**/*.css');
    gulp.src([appConfig.rootPath + '/styles/{,*/}*.scss', appConfig.rootPath + '/styles/**/*.css'])
        .pipe(sassFilter)
        .pipe($.sass())
        .pipe(gulp.dest(appConfig.rootPath + '/styles'))
        .pipe(sassFilter.restore())
        .pipe(cssFilter)
        .pipe($.concatCss("myapp.css"))
        .pipe($.cssmin())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(appConfig.dist + '/styles'));
});

gulp.task('minify-js', function () {
    gulp.src(appConfig.js.minify.files)
        .pipe($.uglifyjs(appConfig.js.minify.outFileName, {
            outSourceMap: appConfig.js.minify.outSourceMap,
            compress: appConfig.js.compressRules
        }))
        .pipe(gulp.dest(appConfig.js.minify.outPath));
});

gulp.task('requirejsBuild', function(cb) {

  rjs.optimize({
    baseUrl: '.',
    mainConfigFile: appConfig.js.requirejs.configFile,
	preserveLicenseComments: false,
	generateSourceMaps: appConfig.js.requirejs.outSourceMap,
	optimize: 'uglify2',
	name: appConfig.js.requirejs.configFile,
	uglify2: {
	    compress: appConfig.js.compressRules
	},
	out: appConfig.js.requirejs.outRequirejs
    },
    function(buildResponse){
      cb();
    },
    cb);
});
 
gulp.task('clean-dist', function () {
  return gulp.src('public', {read: false})
    .pipe($.clean());
});

gulp.task('copy-to-dist', function () {
  return gulp.src(appConfig.rootPath + '/{,*/}*.*')
        .pipe($.copy(appConfig.dist));
});

gulp.task('copy-images', function () {
    return gulp.src('static/**/*.{png,ico}')
          .pipe(gulp.dest('public'));
});
 
gulp.task('watch', function() {
    gulp.src(sourceFile.sass)
        .pipe($.watch(sourceFile.sass))
        .pipe($.sass())
        .pipe(gulp.dest(appConfig.dist + '/styles'))
        .pipe($.filter(appConfig.dist + '/styles/*.css'))
        .pipe($.cssmin())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(appConfig.dist + '/styles'));
});

gulp.task('validate', function() {
    gulp.src(appConfig.validate.files)
        .pipe($.jshint('config/.jshintrc'))
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'));
});

//gulp.task('build',['clean-dist', 'sass', 'css-minify']);
gulp.task('build', function(callback) {
    $.runSequence(
                    'clean-dist',
                    'copy-images',
                    'minify-html',
             //   'sass',
               // 'minify-css',
                //'validate',
               // 'concat-js',
               // 'requirejsBuild',
               // 'minify-image',
                callback);
});

//gulp.task('test-local',['build', 'validate', 'watch']);
gulp.task('test-local', function(callback) {
  $.runSequence('validate',
                'build',
                'watch',
                callback);
});

gulp.task('test',['validate', 'build']);
