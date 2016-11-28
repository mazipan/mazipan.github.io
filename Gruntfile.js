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
                target4: ['concat'],
                target5: ['uglify']
            },

            clean: {
              build: {
                src: ['build', 'css', 'js/temp']
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
                        dest: 'build',
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
                         cwd: 'build',
                         src: ['**/*.css'],
                         dest: 'build/dist',
                         ext: '.min.css'
                    }]
                }
            },

            concat: {
                options: {
                    preserveComments : 'all',
                    stripBanners: {
                        block : 'all'
                    }
                },
                basic_and_extras: {
                    files: {      
                        'build/main.js':
                            [
                                "library/jquery.min.js",
                                "library/jquery.isotope.min.js",
                                "library/jquery.inview.min.js",
                                "library/responsiveslides.min.js",
                                "js/offcanvas.js",
                                "js/swiper.js",
                                "js/portofolio.js",
                                "js/skills.js"
                            ]
                    }
                },
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
                            'build/*.js',
                            '!build/*.min.js',
                        ],
                        'build',
                        {
                            rename: function(destBase, destPath) {
                                var result = destBase +'/'+ destPath
                                    .replace('build/', 'dist/')
                                    .replace('.js', '.min.js');

                                return result;
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
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default',
            [
                'concurrent:target1',
                'concurrent:target2',
                'concurrent:target3',
                'concurrent:target4',
                'concurrent:target5'
            ]);
};
