'use strict'
require('./check-versions')()

const ora = require('ora') // 在终端显示的旋转器插件
const rm = require('rimraf') // 用于删除文件夹
const path = require('path')
const chalk = require('chalk') // 终端文字颜色插件
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

var connect = require('connect')
var serveStatic = require('serve-static')

const spinner = ora(
    'building for ' + process.env.env_config + ' environment...'
  )
  spinner.start()

// 删除dist文件夹，之后webpack打包

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
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
            console.log(chalk.red(' Build failed with errors.\n'))
            process.exit(1)
        }

        console.log(chalk.cyan(' Build complete.\n'))
        console.log(chalk.yellow(
            ' Tip: built files are meant to be served over an HTTP server.\n' +
            ' Opening index.html over file:// won\'t work.\n'
        ))


        if (process.env.npm_config_preview) {
            const port = 9526
            const host = 'http://localhost:' + port
            const basePath = config.build.assetsPublicPath
            const app = connect()

            app.use(
                basePath,
                serveStatic('./dist', {
                    index: ['index.html', '/']
                })
            )

            app.listen(port, function () {
                console.log(
                    chalk.green(`> Listening at  http://localhost:${port}${basePath}`)
                )
            })
        }

    })

})