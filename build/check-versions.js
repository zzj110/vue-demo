'use strict'
const chalk = require('chalk') //修改控制台中字符串的样式
const semver = require('semver') // 引入的是一个语义化版本文件的npm包，其实它就是用来控制版本的
const packageConfig = require('../package.json') // 引入package.json，用来获取版本。

const shell = require('shelljs') //用来执行lunix命令的包


//这块儿不太熟，大致意思是用js代码同步执行一个cmd的命令，并且对返回的结果执行toString（）和trim()方法

function exec(cmd) {
    return require('child_process')
        .execSync(cmd)
        .toString()
        .trim()
}

const versionRequirements = [{
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
}]


if (shell.which('npm')) {
    versionRequirements.push({
      name: 'npm',
      currentVersion: exec('npm --version'),
      versionRequirement: packageConfig.engines.npm
    })
  }

module.exports = function() {
    const warnings = []
  
    for (let i = 0; i < versionRequirements.length; i++) {
      const mod = versionRequirements[i]
  
      if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
        warnings.push(
          mod.name +
            ': ' +
            chalk.red(mod.currentVersion) +
            ' should be ' +
            chalk.green(mod.versionRequirement)
        )
      }
    }
  
    if (warnings.length) {
      console.log('')
      console.log(
        chalk.yellow(
          'To use this template, you must update following to modules:'
        )
      )
      console.log()
  
      for (let i = 0; i < warnings.length; i++) {
        const warning = warnings[i]
        console.log('  ' + warning)
      }
  
      console.log()
      process.exit(1)
    }
  }
  