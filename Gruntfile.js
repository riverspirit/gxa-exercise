module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["dist", '.tmp'],

    copy: {
      main: {
        expand: true,
        cwd: 'app/',
        src: ['**'],
        dest: 'dist/'
      },
      glyphicons: {
        expand: true,
        cwd: 'app/bower_components/bootstrap/fonts',
        src: ['**'],
        dest: 'dist/fonts'
      }
    },

    rev: {
      files: {
        src: ['dist/js/**/*.js', 'dist/css/**/*.css']
      }
    },

    useminPrepare: {
      html: 'app/index.html'
    },

    usemin: {
      html: ['dist/index.html']
    },

    uglify: {
      options: {
        report: 'min',
        mangle: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('default', [
    'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin'
  ]);
};
