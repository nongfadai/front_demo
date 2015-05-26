process.on('uncaughtException', function(e) {
  console.log("server on error");　　
  console.log(e);
});


module.exports = function(grunt) {

  //grunt.task.loadTasks("grunt_tasks/tpl");

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      compileTpl: {
        // We watch and compile sass files as normal but don't live reload here 
        files: ['src/app/js/tpl/**/*.tpl'],
        tasks: ['compile'],
        options: {
          spawn: false,
        },
      },
      concatCss: {
        // We watch and compile sass files as normal but don't live reload here 
        files: ['/css/*.css','!/css/*.all.css'],
        tasks: ['concat:css'],
        options: {
          spawn: false,
        },
      },
      // requirejs: {
      //   // We watch and compile sass files as normal but don't live reload here 
      //   files: ['src/app/js/**/*.js','!src/app/js/*.all.js'],
      //   tasks: ['requirejs'],
      //   options: {
      //     spawn: false,
      //   },
      // }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          '/css/style.all.css': ['src/app/css/*.css']
        }
      }
    },
    concat: {
      css: {
        files: {
          'web/m_nfd/css/style.all.css': ['web/m_nfd/css/m*.css', '!web/m_nfd/css/*.all.css']
        }
      }
    },
    requirejs: {

      compile: {
        options: {
          baseUrl: "src/app/js/",
          name: "main",
          optimize: "none",
          mainConfigFile: "src/app/js/main.js",
          //name: "r.js", // assumes a production build using almond 
          include:[
            //'../lib/zepto/zepto.js',
            //'../lib/iscroll/iscroll.js',
            '../lib/requirejs/almond.js',
          ],
          out: "src/app/js/spa.all.js"
        }
      }
    }
  });



  //grunt.task.loadTasks("grunt_tasks/test2");

  // 加载所有grunt任务的插件。
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat']);

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    if (/\.tpl$/.test(filepath) && !/deleted/.test(action)) {
      //如果是tpl文件 且不是删除动作
      grunt.config('compile.src', filepath);
    }
  });

  grunt.registerTask('hello', 'A sample task that just say hello.', function(arg1, arg2) {
    console.log("hello");
  });

};