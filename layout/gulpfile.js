const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
const webp = require("gulp-webp");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const fileinclude = require('gulp-file-include');
const babel = require("gulp-babel");

gulp.task('babel', function(done) {
  gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('build/js'));

    browserSync.reload();
      done();
});


gulp.task('fileinclude', function(done) {
  gulp.src('src/index.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('build/'));

    browserSync.reload();

      done();
});


// less to css
gulp.task('less', function(done) {

    gulp.src("src/less/*.less")
        .pipe(less())
        .pipe(gulp.dest("build/css"))
        .pipe(browserSync.stream());

        browserSync.reload();

    done();
});

gulp.task('inline', function (done) {
    const plugins = [
        autoprefixer({overrideBrowserslist: ['last 1 version']}),
        cssnano()
    ];
      gulp.src('build/css/inline.css')
        .pipe(postcss(plugins))
        .pipe(rename("inline.min.css"))
        .pipe(gulp.dest('build/css-min'));

        done();
});

gulp.task('style', function (done) {
    const plugins = [
        autoprefixer({overrideBrowserslist: ['last 1 version']}),
        cssnano()
    ];
      gulp.src('build/css/style.css')
        .pipe(postcss(plugins))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('build/css-min'));

        done();
});

gulp.task('indexPage', function (done) {
    const plugins = [
        autoprefixer({overrideBrowserslist: ['last 1 version']}),
        cssnano()
    ];
      gulp.src('build/css/indexPage.css')
        .pipe(postcss(plugins))
        .pipe(rename("indexPage.min.css"))
        .pipe(gulp.dest('build/css-min'));

        done();
});

gulp.task('innerPage', function (done) {
    const plugins = [
        autoprefixer({overrideBrowserslist: ['last 1 version']}),
        cssnano()
    ];
      gulp.src('build/css/innerPage.css')
        .pipe(postcss(plugins))
        .pipe(rename("innerPage.min.css"))
        .pipe(gulp.dest('build/css-min'));

        done();
});



// css to min.css
gulp.task('css', function () {
    const plugins = [
        autoprefixer({overrideBrowserslist: ['last 1 version']}),
        cssnano()
    ];
    return gulp.src('build/css/style.css')
        .pipe(postcss(plugins))
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('build/css-min'));
});


// localhost
gulp.task('serve', function(done) {
    browserSync.init({
        server: "build/"
    });

    gulp.watch("src/*.html", gulp.series('fileinclude'));
    gulp.watch("src/blocks-html/*/*.html", gulp.series('fileinclude'));
    gulp.watch("src/blocks-html/*.html", gulp.series('fileinclude'));


    gulp.watch("src/blocks-less/*/*.less", gulp.series('less'));
    gulp.watch("src/less/style.less", gulp.series('less'));
    gulp.watch("build/css/style.css", gulp.series('style'));

    gulp.watch("src/less/inline.less", gulp.series('less'));
    gulp.watch("build/css/inline.css", gulp.series('inline'));

    gulp.watch("src/less/indexPage.less", gulp.series('less'));
    gulp.watch("build/css/indexPage.css", gulp.series('indexPage'));

    gulp.watch("src/less/innerPage.less", gulp.series('less'));
    gulp.watch("build/css/innerPage.css", gulp.series('innerPage'));

    gulp.watch("src/blocks-less/*.less", gulp.series('less'));

    gulp.watch("src/js/*.js", gulp.series('babel'));


    gulp.watch("build/css-min/*.css").on('change', () => {
      browserSync.reload();
      done();
    });

    // gulp.watch("src/blocks-html/*/*.html").on('change', () => {
    //   browserSync.reload();
    //   done();
    // });

    gulp.watch("src/*.html").on('change', () => {
      browserSync.reload();
      done();
    });

    done();
});

gulp.task('default', gulp.series('serve'));

// png or jpg to webp
gulp.task("webp", function () {
  return gulp.src("buildimages/*.{png,jpg,jpeg}")
  .pipe(webp({quality: 85}))
  .pipe(gulp.dest("buildimages/"));
});


// svg to sprite.svg
gulp.task("sprite", function () {
  return gulp.src("img/*.svg")
  .pipe(svgstore({
    inLineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("img"))
});
