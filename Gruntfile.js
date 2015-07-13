/*!
* FireShell Gruntfile
* http://getfireshell.com
* @author Todd Motto
*/

'use strict';

/**
* Livereload and connect variables
*/
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
	port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

/**
* Grunt module
*/
module.exports = function (grunt) {

	/**
	* Dynamically load npm tasks
	*/
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	/**
	* FireShell Grunt config
	*/
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/**
		* Set project info
		*/
		project: {
			src: 'src',
			app: 'html',
			assets: '<%= project.app %>/assets',
			wp: '<%= project.app %>/wp-content/themes/portfolio',
			wpsp: '<%= project.app %>/wp-content/themes/portfolio_sp',
			css: [
				'<%= project.src %>/scss/style.scss'
			],
			sp: [
				'<%= project.src %>/scss/style_sp.scss'
			],
			js: [
				'<%= project.src %>/js/scripts.js'
			],
			jssp:  [
				'<%= project.src %>/js/scripts_sp.js'
			]
		},

		/**
		* Project banner
		* Dynamically appended to CSS/JS files
		* Inherits text from package.json
		*/
		tag: {
			banner: '/*!\n' +
			' * Theme Name: <%= pkg.name %>\n' +
			' * Theme URI: <%= pkg.url %>\n' +
			' * Theme Title: <%= pkg.title %>\n' +
			' * Author: <%= pkg.author %>\n' +
			' * Version: <%= pkg.version %>\n' +
			' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
			' */\n'
		},

		/**
		* Connect port/livereload
		* https://github.com/gruntjs/grunt-contrib-connect
		* Starts a local webserver and injects
		* livereload snippet
		*/
		connect: {
			options: {
				port: 8000,
				hostname: '*'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [lrSnippet, mountFolder(connect, 'html')];
					}
				}
			}
		},

		/**
		 * JSHint
		 * https://github.com/gruntjs/grunt-contrib-jshint
		 * Manage the options inside .jshintrc file
		 */
		
		jshint: {
			files: ['src/js/*.js'],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		/**
		* Concatenate JavaScript files
		* https://github.com/gruntjs/grunt-contrib-concat
		* Imports all .js files and appends project banner
		*/
		concat: {
			dev: {
				files: {
					'<%= project.wp %>/assets/js/scripts.min.js': '<%= project.js %>',
				}
			},
			options: {
				stripBanners: true,
				nonull: true,
				banner: '<%= tag.banner %>'
			}
		},

		/**
		* Uglify (minify) JavaScript files
		* https://github.com/gruntjs/grunt-contrib-uglify
		* Compresses and minifies all JavaScript files into one
		*/
		uglify: {
			options: {
				banner: '<%= tag.banner %>',
			},
			dist: {
				files: {
					'<%= project.wp %>/assets/js/scripts.min.js': '<%= project.js %>',
				}
			}
		},

		/**
		* Compile Sass/SCSS files
		* https://github.com/gruntjs/grunt-contrib-sass
		* Compiles all Sass/SCSS files and appends project banner
		*/
		sass: {
			dev: {
				options: {
				style: 'expanded',
				banner: '<%= tag.banner %>'
				},
				files: {
					'<%= project.wp %>/style.css': '<%= project.css %>',
				}
			},
			dist: {
				options: {
					style: 'compressed',
					banner: '<%= tag.banner %>'
				},
				files: {
					'<%= project.wp %>/style.css': '<%= project.css %>',
				}
			}
		},

		// cssmin: {
		// 	dist: {
		// 		options: {
		// 			banner: '<%= tag.banner %>'
		// 		},
		// 		files: {
		// 			'<%= project.wp %>/style.css': '<%= project.css %>',
		// 		}
		// 	}
		// },

		/**
		* Opens the web server in the browser
		* https://github.com/jsoverson/grunt-open
		*/

		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},

		serve: {
			options: {
				port: 9000,
				'client.js': {
					tasks: ['html2js', 'concat'],
					output: 'client.js'
				}
			}
		},

		/**
		* Runs tasks against changed watched files
		* https://github.com/gruntjs/grunt-contrib-watch
		* Watching development files and run concat/compile tasks
		* Livereload the browser once complete
		*/
		watch: {
			concat: {
				files: '<%= project.src %>/js/{,*/}*.js',
				tasks: ['concat:dev', 'jshint']
			},
			sass: {
				files: '<%= project.src %>/scss/{,*/}*.{scss,sass}',
				tasks: 'sass'
			},
			uglify: {
				files: '<%= project.src %>/js/{,*/}*.js',
				tasks: 'uglify'
			},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= project.app %>/{,*/}*.html',
					'<%= project.assets %>/css/*.css',
					'<%= project.assets %>/js/{,*/}*.js',
					'<%= project.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},
	});

	/**
	* Default task
	* Run `grunt` on the command line
	*/
	grunt.registerTask('default', [
		'sass:dev',
		'sass:dist',
		//'jshint',
		'concat:dev',
		'uglify',
		'connect:livereload',
		'open',
		'watch',
		'serve'
	]);

	/**
	* Build task
	* Run `grunt build` on the command line
	* Then compress all JS/CSS files
	*/
	grunt.registerTask('build', [
		'sass:dist',
		//'jshint',
		'uglify',
	]);

	grunt.loadNpmTasks('grunt-serve');

};
