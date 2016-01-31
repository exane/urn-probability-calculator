var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
/*var fs = require("fs");*/
var babelify = require("babelify");
var livereload = require("gulp-livereload");
/*var sass = require("gulp-sass");*/
livereload({start: true});

//fast install
//npm i --save-dev browserify vinyl-source-stream babelify gulp-livereload gulp gulp-sass


gulp.task('browserify', function(){
  browserify('./js/main.js', {standalone: "app", debug: true})
  .transform(babelify.configure({
    stage: 0
  }))
  .bundle().on("error", function(err){
    console.log(err);
  })
  .pipe(source('app.js').on("error", function(err){
    console.log(err);
  }))
  .pipe(gulp.dest('./build/').on("error", function(err){
    console.log(err);
  }));
});

gulp.task('css', function(){
  gulp.src('./main.css')
  .pipe(livereload().on("error", function(err){
    console.log(err);
  }));
});

gulp.task("watch", function(){
  gulp.watch("./js/*", ["browserify"]);
  gulp.watch("./components/*", ["browserify"]);
  gulp.watch("./*.css", ["css"]);
})

gulp.task("default", [/*"watch", */"browserify", "css"]);
