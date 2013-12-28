module.exports = function(grunt) {
    
    grunt.registerTask('mergeTemplates', 'Log some stuff.', function() {

        var templates = {},
            templatesString = 'define([], function () { return ';

        grunt.file.recurse('templates', function (abspath, rootdir, subdir, filename) {
            if (~filename.indexOf('.html')) {
                templates[filename.substring(0, filename.lastIndexOf('.'))] = grunt.file.read(abspath);
            }
        });

        templatesString += JSON.stringify(templates);

        templatesString += '; });';

        grunt.file.write('templates/Templates.js', templatesString);
        
        grunt.log.write('Logging some stuff...').ok();
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        watch: {
            scripts: {
                files: ['templates/*.html'],
                tasks: ['mergeTemplates']        
            },
            options: {
                livereload: true
            }
        }
    });


};