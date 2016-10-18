/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({        
        pkg: grunt.file.readJSON('package.json'),
            // SASS for compile scss into css
            sass: {
                dist: {
                    options:{
                        sourcemap: 'auto',
                        style: 'compact',
                        update: true
                    },
                    files: [{
                        expand: true,
                        cwd:  '_sass',
                        src:  ['**/*.scss'],
                        dest: 'css',
                        ext:  '.css'
                    }]                            

                }
            },
            watch: {
                css: {
                    files: '**/*.scss',
                    tasks: ['sass']
                }
            },

            cssmin: {                
                options:{
                    sourcemap: true,
                    shorthandCompacting: true,
                    keepSpecialComments: 0,    
                    removeDuplicates: false,   
                    restructure: true,        
                    mergeAdjacent: true,
                    mergeMediaQueries: true
                },
                target: {
                    files: [{
                         expand: true,
                         cwd: 'css',
                         src: ['**/*.css'],
                         dest: 'css',
                         ext: '.min.css'
                    }]
                }
            },

            uglify: {  
                compress: {
                    sourcemap: true,
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                    preserveComments : 'all'
                },
                target: {
                    files:  grunt.file.
                        expandMapping(
                        [
                            'js/*.js',
                            '!js/*.min.js',
                        ],
                        'js/temp',
                        {
                            rename: function(destBase, destPath) {
                                return destBase +'/'+ destPath
                                        .replace('js/', '/')
                                        .replace('.js', '.min.js');
                            }
                        })
                }
            }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['sass', 'cssmin', 'uglify']);
};
