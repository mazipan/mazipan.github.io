/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({        
        pkg: grunt.file.readJSON('package.json'),
            
            concurrent: {
                target1: ['clean'],
                target2: ['sass'],
                target3: ['cssmin'],
                target4: ['uglify']
            },

            clean: {
              build: {
                src: ['css']
              }
            },

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
            },

            watch: {
                css: {
                    files: '**/*.scss',
                    tasks: ['sass']
                }
            }
    });

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default',
            [
                'concurrent:target1',
                'concurrent:target2',
                'concurrent:target3',
                'concurrent:target4'
            ]);
};
