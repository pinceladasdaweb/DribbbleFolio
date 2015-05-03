module.exports = function (grunt) {
    "use strict";

    var pkg  = grunt.file.readJSON("package.json");
    var date = new Date();

    grunt.initConfig({
        meta: {
            banner: '/*! ' + pkg.name + ' ' + pkg.version + ' | (c) ' + date.getFullYear() + ' ' + pkg.author + ' | ' + pkg.licenses[0].type + ' License */'
        },
        cssmin: {
            target: {
                files: {
                    'assets/css/main.min.css': ['assets/css/main.css']
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>\n'
            },
            target: {
                files: {
                    'assets/js/dribbblefolio.min.js': ['assets/js/dribbblefolio.js']
                }
            }
        },
        watch: {
            css: {
                files: ['assets/css/main.css'],
                tasks: ['cssmin'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['assets/js/dribbblefolio.js'],
                tasks: ['uglify'],
                options: {
                    livereload: true,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [ 'cssmin', 'uglify' ]);
};
