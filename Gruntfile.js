module.exports = function(grunt) {
	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("package.json"),

		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author %>\n" +
				" *  Under <%= pkg.license %> License\n" +
				" */\n"
		},

		// Lint definitions
		jshint: {
			files: ["src/jquery.parallaxr.js"]
		},

		// Concat definitions
		concat: {
			js: {
				src: [
					'src/jquery.parallaxr.js'
				],
				dest: 'dist/jquery.parallaxr.js',
				nonull: true
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Minify JS definitions
		uglify: {
			scripts: {
				src: ["dist/jquery.parallaxr.js"],
				dest: "dist/jquery.parallaxr.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["jshint","concat","uglify"]);
}