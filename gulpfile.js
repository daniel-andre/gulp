// adiciona os modulos instalados
const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

// funcao para compilar o SASS e adicionar os prefixos
function compilaSass(){
  return gulp
  .src("css/scss/*.scss")
  .pipe(sass({outputStyle: "compressed"}))
  .pipe(autoprefixer({
    browsers: ["last 2 versions"],
    cascade: false
  }))
  .pipe(gulp.dest("css/"))
  .pipe(browserSync.stream())
}

// tarefa de gulp para a função de SASS
// gulp.task("sass", function(done){
//   compilaSass();
//   done();
// });
exports.compilaSass = compilaSass;


// funcao para juntar o js
function gulpJS(){
  return gulp
  .src("js/main/*.js")
  .pipe(concat("main.js"))
  .pipe(babel({
    presets: ["@babel/env"]
  }))
  .pipe(uglify())
  .pipe(gulp.dest("js/"))
  .pipe(browserSync.stream())
}

// gulp.task("mainjs", gulpJS);
exports.gulpJS = gulpJS;

// js plugins
function pluginJS(){
  return gulp
  .src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/moment/min/moment.min.js"
  ])
  .pipe(concat("plugins.js"))
  .pipe(uglify())
  .pipe(gulp.dest("js/"))
  .pipe(browserSync.stream())
}

// gulp.task("pluginjs", pluginJS);
exports.pluginJS = pluginJS;

// funcao para iniciar o browser
function browser(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

// tarefa para iniciar o browser-sync
// gulp.task("browser-sync", browser);
exports.browser = browser;

// funcao de watch do gulp
function watch(){
  gulp.watch("css/scss/*.scss", compilaSass);
  gulp.watch("js/main/*.js", gulpJS);
  gulp.watch("js/plugins/*.js", pluginJS);
  gulp.watch("*.html").on("change", browserSync.reload)
}

// inicia a tarefa de watch
// gulp.task("watch", watch);
exports.watch = watch;

// tarefa padrao do gulp, que inicia o watch e o browser-sync
// gulp.task("default", gulp.parallel("watch", "browser-sync", compilaSass, "mainjs", "pluginjs"));
exports.default = gulp.parallel(watch, browser, compilaSass, gulpJS, pluginJS);