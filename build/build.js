'use strict'
require('./check-versions')()

const project = process.argv[2]

process.env.NODE_ENV = 'production'
process.env.PROJECT_ENV = project

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

const projectBasePath = './src/project/'

const projectFile = require('fs').readdirSync(projectBasePath)

if (projectFile.indexOf(project) === -1) {
  console.error('project ' + process.env.PROJECT_ENV + ' not found')
  return false
}

webpackConfig.entry = ['babel-polyfill', './src/project/' + project + '/main.js']

rm(path.join(config.build.assetsRoot), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})


