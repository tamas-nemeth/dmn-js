'use strict';

var coverage = process.env.COVERAGE;

var singleStart = process.env.SINGLE_START;

// use puppeteer provided Chrome for testing
process.env.CHROME_BIN = require('puppeteer').executablePath();

// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox', 'IE' ]
var browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(/\s*,\s*/g);

const testFile = coverage ? 'test/coverageBundle.js' : 'test/testBundle.js';

module.exports = function(path) {

  return function(karma) {

    const config = {

      basePath: path,

      frameworks: [
        'webpack',
        'mocha',
        'sinon-chai'
      ],

      files: [
        testFile
      ],

      preprocessors: {
        [testFile]: [ 'webpack', 'env' ]
      },

      reporters: [ 'progress' ].concat(coverage ? 'coverage' : []),

      coverageReporter: {
        reporters: [
          { type: 'lcov', subdir: '.' },
        ]
      },

      browsers: browsers,

      browserNoActivityTimeout: 30000,

      singleRun: true,
      autoWatch: false,

      webpack: {
        mode: 'development',
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  plugins: coverage ? [
                    [ 'istanbul', {
                      include: [
                        'src/**'
                      ]
                    } ]
                  ] : [],
                  presets: [
                    [ '@babel/preset-env', {
                      modules: false,
                      targets: {
                        chrome: '91'
                      }
                    } ]
                  ]
                }
              }
            },
            {
              test: /\.css|\.dmn$/,
              type: 'asset/source'
            }
          ]
        },
        resolve: {
          mainFields: [
            'dev:module',
            'module',
            'main'
          ],
          modules: [
            'node_modules',
            path
          ]
        },
        devtool: 'eval-source-map'
      }
    };

    if (singleStart) {
      config.browsers = [].concat(config.browsers, 'Debug');
      config.envPreprocessor = [].concat(config.envPreprocessor || [], 'SINGLE_START');
    }

    karma.set(config);
  };

};
