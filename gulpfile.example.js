const previewThemeid = '78001635389';
const themeUrl = 'https://www.tempestdesigns.co.uk';
const previewThemeUrl = themeUrl + '/?preview_theme_id=' + previewThemeid;
const defaultBrowser = ['C:\\Program Files \\Firefox Developer Edition\\firefox.exe', 'Chrome'];

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
//const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync').create();
const pipeline = require('readable-stream').pipeline;
const terser = require('gulp-terser');
//const svgstore = require('gulp-svgstore');
//const svgmin = require('gulp-svgmin');
//const rename = require('gulp-rename');

/*
 SOURCE FILES
 */
let jsScripts;
const jsPath = 'src/scripts/ac/';
const jsNpmPath = 'node_modules/';
const jsCustomScripts = [
    'ac_shopify.js',
    // 'custom.js',
];

const jsNpmScripts = [
    // All ready deprecated with browserify
    'jquery/dist/jquery.js',
    'fitvids/dist/fitvids.js',
    'remodal/dist/remodal.js',
    'flickity/dist/flickity.pkgd.js',
    'flickity-imagesloaded/flickity-imagesloaded.js',
    'js-cookie/src/js.cookie.js',
];

const cssNpmScripts = [
    //Add any vendor css scripts here that you want to include
    'flickity/dist/flickity.css',
    'remodal/dist/remodal.css',
    'remodal/dist/remodal-default-theme.css',
];

for (let i = 0; i < jsCustomScripts.length; i++) {
    // Add the default path
    jsCustomScripts[i] = jsPath + jsCustomScripts[i];
}
for (let i = 0; i < jsNpmScripts.length; i++) {
    // Add the default path
    jsNpmScripts[i] = jsNpmPath + jsNpmScripts[i];
}

for (let i = 0; i < cssNpmScripts.length; i++) {
    // Add the default path
    cssNpmScripts[i] = jsNpmPath + cssNpmScripts[i];
}

// Concat the vendor scripts with the custom scripts
jsScripts = jsNpmScripts.concat(jsCustomScripts);

/*
 GULP TASKS
 */

// TASK: scripts - Concat and uglify all the vendor and custom javascript
function scripts() {
    return gulp.src(jsScripts)
    // .pipe(concat('ac_shopify.js'))
      .pipe(concat('ac.js.liquid'))
      .pipe(terser())
      .pipe(gulp.dest('src/assets/'));
}

function vendorStyles(){
    return gulp.src(cssNpmScripts)
      .pipe(concat('_vendor.scss'))
      .pipe(gulp.dest('src/styles/ac/'));

    //console.log("testing vendorStyles")

}

// compile scss into css
function styles() {
    return gulp.src('src/styles/ac/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error',sass.logError))
      // .pipe(postcss([ autoprefixer(), cssnano() ]))
      //.pipe(concat('ac.css'))
      .pipe(sourcemaps.write('src/styles/'))
      .pipe(gulp.dest('src/styles/'))
      .pipe(browserSync.stream());
}

function svgdefs() {
    return gulp
      .src('assets/images/svg/*.svg')
      .pipe(svgmin())
      .pipe(rename({prefix: 'icon-'}))
      .pipe(svgstore())
      .pipe(rename("defs.svg"))
      .pipe(gulp.dest('templates/inc/'));
}

function serve() {
    browserSync.init({
        proxy: previewThemeUrl,
        browser: defaultBrowser,
        snippetOptions: {
            rule: {
                match: /<\/body>/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        }
    });

    gulp.watch("assets/scss/**/*.scss",  styles);
    gulp.watch("assets/images/svg/**/*.svg", svgdefs).on('change', browserSync.reload);
    gulp.watch("templates/**/*.twig").on('change', browserSync.reload);
    gulp.watch("assets/js/**/*.js", scripts ).on('change', browserSync.reload);

}

function watch() {
    gulp.watch('src/styles/ac/**/*.scss',  styles);
    gulp.watch('src/scripts/ac/**/*.js', scripts );
}

exports.serve = serve;
exports.styles = styles;
exports.scripts = scripts;
exports.svgdefs = svgdefs;
exports.vendorStyles = vendorStyles;

exports.watch = watch;
