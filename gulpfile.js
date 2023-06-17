const { series } = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const stripJs = require('gulp-strip-comments')
const stripCss = require('gulp-strip-css-comments')
const babel = require('gulp-babel')
const sass = require('gulp-sass') (require('node-sass'))
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

async function tarefasImagem() {
        const { default: imagemin } = await import('gulp-imagemin');
      
        return gulp
        .src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
    }
      
function tarefasJS(cb){
        gulp.src([
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './vendor/owl/js/owl.js',
            './vendor/jquery-mask/jquery.mask.js',
            './vendor/jquery-ui/js/jquery-ui.js',
            './src/js/custom.js'
        ])
                .pipe(babel({
                        comments: false, 
                        presets: ['@babel/env']
                }))
                .pipe(concat('scripts.js'))
                .pipe(stripJs())
                .pipe(uglify())
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest('./dist/js'))
        cb();
}

function tarefasCSS(cb){
        gulp.src('./vendor/**/*.css')
                .pipe(concat('libs.css'))
                .pipe(stripCss())
                .pipe(cssmin())
                .pipe(rename({ suffix : '.min'}))
                .pipe(gulp.dest('./dist'))
        cb();
}

function tarefasSASS(cb) {
	gulp.src('./src/scss/**/*.scss')
	        .pipe(sass()) // converte scss para css
                .pipe(gulp.dest('./dist/css'))
        cb();
}

function tarefasHTML(cb){
        gulp.src('./src/**/*.html')
                .pipe(htmlmin({ collapseWhitespace: true}))
                .pipe(gulp.dest('./dist'))
        cb();
}

gulp.task('serve', function(){

        browserSync.init({
            server: {
                browser: "chrome",
                baseDir: "./dist"
            }
        })
        gulp.watch('./src/**/*').on('change', process) // repete o processo quando alterar algo em src
        gulp.watch('./src/**/*').on('change', reload)
    
    })
    
    // series x parallel
    const process = series( tarefasHTML, tarefasJS, tarefasCSS, tarefasSASS )
    
    exports.styles = tarefasCSS
    exports.sass = tarefasSASS
    exports.scripts = tarefasJS
    exports.images = tarefasImagem

    exports.default = process