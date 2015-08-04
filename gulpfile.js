var gulp = require('gulp');
var shell = require('gulp-shell');
gulp.task('docs', shell.task([
    'node_modules/jsdoc/jsdoc.js '+
    '-c node_modules/angular-jsdoc/conf.json '+   // config file
    '-t node_modules/angular-jsdoc/template '+    // template file
    '-d docs '+                             // output directory
    '-r app/js'                              // source code directory
]));
gulp.task('default', function() {
});