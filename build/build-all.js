const exec = require('child_process').exec
const projectFile = require('fs').readdirSync('./src/project/')

projectFile.forEach(name => {
  console.log(name + ' 项目开始构建......')
  exec('node build/build.js ' + name, function(err, stdout, stderr){
    if(err) {
      return console.log(stderr)
    }
    console.log(stdout)
    console.log(name + '项目构建完成......')
    console.log('------------------------------------------------')
  })
})
