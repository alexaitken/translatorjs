/*global module:true*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-jasmine-runner');
  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },

    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },

    'jasmine' : {
      src : [
        'libs/jquery/jquery.js',
        'libs/jquery.i18n.js',
        'src/**/*.js'
      ],
      specs : 'specs/**/*.spec.js',
      helpers : [
        'specs/helpers/*.js'
      ],
      timeout : 10000,
      junit : {
        output : 'junit/'
      },
      phantomjs : {
        'ignore-ssl-errors' : true
      }
    },

    'jasmine-server' : {
      browser : false
    },

    lint: {
      files: ['grunt.js', 'src/**/*.js', 'spec/**/*.js']
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'lint jasmine'
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },

    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min');

};
