const child = require('child_process')
const projectFile = require('fs').readdirSync('./src/project/')

const build = function (name) {
  console.log(name + ' 项目开始构建......')
  console.log('------------------------------------------------')
  console.log('                                                ')
  return new Promise((resolve, reject) => {
    const out = child.exec('node build/build.js ' + name, function(err, stdout, stderr){
      if(err) {
        console.log(stderr)
        reject()
      } else {
        console.log(stdout)
        console.log('------------------------------------------------')
        console.log(name + ' 项目构建完成......')
        console.log('                                                ')
        resolve()
      }
    })
  })
}

const buildAll = async function () {
  for (let i = 0; i < projectFile.length; i++) {
    try {
      await build(projectFile[i])
    } catch (e) {
      console.log(e)
    }
  }
}

buildAll()

