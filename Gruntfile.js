module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('mergeTemplates', 'Log some stuff.', function () {

        /*

        var templates = {},
            templatesString = 'define([], function () { return ';

        grunt.file.recurse('app/templates', function (abspath, rootdir, subdir, filename) {
            if (~filename.indexOf('.html')) {
                templates[filename.substring(0, filename.lastIndexOf('.'))] = grunt.file.read(abspath);
            }
        });

        templatesString += JSON.stringify(templates);

        templatesString += '; });';

        grunt.file.write('app/templates/Templates.js', templatesString);

        grunt.log.write('Logging some stuff...').ok();

        */
    });

    grunt.registerTask('mergeScripts', 'merging scripts', function () {

        var scripts = '';

        grunt.file.recurse('public/javascripts/app/modules', function (abspath, rootdir, subdir, filename) {
            if (~filename.indexOf('.js') && !~filename.indexOf('starter.js')) {
                scripts += grunt.file.read(abspath);
            }
        });

        grunt.file.write('public/javascripts/app/app.js', scripts);

        grunt.log.write('merged scripts...').ok();
    });

    grunt.initConfig({
        uglify: {
            app: {
                files: {
                    'public/javascripts/app/app.min.js': ['public/javascripts/app/app.js']
                }
            }
        },
        watch: {
            scripts: {
                files: ['public/javascripts/app/modules/**/*.js'],
                tasks: ['mergeScripts'] //, 'uglify']
            },/*
            templates: {
                files: ['public/javascripts/app/*.js'],
                tasks: ['mergeTemplates']
            },*/
            options: {
                livereload: true
            }
        }
    });

};