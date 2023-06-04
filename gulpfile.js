const { src, dest } = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssbeatify = require('gulp-cssbeautify');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync');
const panini = require('panini');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const removeComments = require('gulp-strip-css-comments');
const uglify = require('gulp-uglify');
const rigger = require('gulp-rigger');
const del = require("del");
const { stream } = require('globby');
const notify = require("gulp-notify");


const srcPath = "./app/Src",
distPath = "./app/Dist"

const path = {
    build: {
        html: distPath,
        css: `${distPath}/assets/css/`,
        js: `${distPath}/assets/js/`,
        images: `${distPath}/assets/images/`,
        fonts: `${distPath}/assets/fonts/`,
    },
    src: {
        html: `${srcPath}/*.html`,
        css: `${srcPath}/assets/scss&sass/*.s?ss`,
        js: `${srcPath}/assets/js/*.js`,
        images: `${srcPath}/assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
        fonts: `${srcPath}/assets/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
    },
    watch: {
        html: `${srcPath}/**/*.html`,
        css: `${srcPath}/assets/scss&sass/*.s?ss`,
        js: `${srcPath}/assets/js/*.js`,
        images: `${srcPath}/assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}`,
        fonts: `${srcPath}/assets/fonts/**/*.{eot,woff,woff2,ttf,svg}`,
    },
    clean: distPath
}
function css() {
    return src(path.src.css, {base: `${srcPath}/assets/scss&sass/`})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title: "SCSS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                (this.emit('end'));
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssbeatify())
        .pipe(dest(path.build.css))
        .pipe(cssnano({
            zindex: false,
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(rename({
            suffix: ".min",
            extname: ".css"
        }))
        .pipe(removeComments())
        .pipe(dest(path.build.css))
        .pipe(browserSync.reload({stream: true}))
}
function serve() {
    browserSync.init({
        server: {
            baseDir: distPath
        }
    })
}

function html() {
    return src(path.src.html, {base:srcPath})
        .pipe(plumber())
        .pipe(panini({
            root: srcPath,
            layouts: `${srcPath}/tpl/layouts/`,
            partials: `${srcPath}/tpl/partials/`,
            data: `${srcPath}/tpl/data/`,
        }))
        .pipe(dest(path.build.html))
        .pipe(browserSync.reload({stream: true}))
}



function js() {
    return src(path.src.js, {base: `${srcPath}/assets/js/`})
        .pipe(plumber({
            errorHandler : function(err) {
                notify.onError({
                    title: "JS Error",
                    message: "Error: <%= error.message %>"
                })(err);
                (this.emit('end'));
            }
        }))
        .pipe(rigger())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min",
            extname: ".js"
        }))
        .pipe(dest(path.build.js))
        .pipe(browserSync.reload({stream: true}))
}

function images() {
    return src(path.src.images, {base: `${srcPath}/assets/images/`})
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 80, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(path.build.images ))
        .pipe(browserSync.reload({stream: true}))
}

function fonts() {
    return src(path.src.fonts, {base: `${srcPath}/assets/fonts/`})
        .pipe(browserSync.reload({stream: true}))
}

function clean() {
    return del(path.clean)
}

function watchFiles() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
    gulp.watch([path.watch.images], images)
    gulp.watch([path.watch.fonts], fonts)
}


exports.html = html;
exports.css = css;
exports.js = js;
exports.img = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
exports.default = gulp.series(exports.build, gulp.parallel(watchFiles, serve));