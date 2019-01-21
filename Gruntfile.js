'use strict';

module.exports = function (grunt) {

    const sass = require('node-sass');

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    var config = require('./Gruntconfig.js');

    grunt.initConfig({

        config: config,

        newer: {
            options: {
                override: function (details, include) {
                    include(true);
                }
            }
        },

        clean: [
            '<%= config.assets %>/css',
            '.sass-cache',
            '.tmp'
        ],

        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '<%= config.assets%>/css/frontend.min.css': [
                        '<%= config.assets%>/css/main.css'
                    ]
                }
            }
        },

        sass: {
            options: {
                implementation: sass,
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= config.assets%>/css/main.css': '<%= config.source%>/sass/main.scss'
                }
            }
        },

        sass_globbing: {
            main: {
                files: {
                    //Globbing all the SCSS files -- Just create new files inside these folders and let Grunt do the hard work :)
                    '<%= config.source%>/sass/_libs.scss': '<%= config.source%>/sass/libs/**/*.scss',
                    '<%= config.source%>/sass/_modules.scss': '<%= config.source%>/sass/modules/**/*.scss',
                    '<%= config.source%>/sass/_components.scss': '<%= config.source%>/sass/components/**/*.scss',
                    '<%= config.source%>/sass/_views.scss': '<%= config.source%>/sass/views/**/*.scss'
                },
                options: {
                    useSingleQuotes: false
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            sass: {
                files: ['<%= config.source%>/sass/**/*.scss'],
                tasks: ['newer:sass', 'cssmin'],
                options: {
                    spawn: false
                }
            },

            html: {
                files: ['./**/*.{html,php}'],
                tasks: [],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'sass_globbing:main',
        'sass',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'build',
        'watch'
    ]);
};