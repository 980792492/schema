const fs = require('fs')
const path = require('path')

const { readFileSync, readdirSync, writeFileSync } = fs
const DIR = path.resolve(__dirname, './schema')
const OUT = path.resolve(__dirname, './result.json')
const LIST = path.resolve(__dirname, '../src/utils/API.js')

let result = {name: 'schema'}
let API = []
function read (dir) {
  let out = {}
  let files = readdirSync(dir)
  files.map(item => {
    let cur = path.resolve(dir, item)
    if (item.indexOf('config') > -1) {
      let obj = readFileSync(cur, 'utf8')
      obj = JSON.parse(obj)
      out.name = obj.name
      out.version = obj.version
      out.author = obj.author
      out.value = obj.value
    } else if (fs.statSync(cur).isDirectory()) {
      if (out.apis) {
        out.apis.push(read(cur))
      } else {
        out.apis = [read(cur)]
      }
    }
  })
  return out
}

let list = []
function addApi (dir) {
  let files = readdirSync(dir)
  files.map((item, index) => {
    let cur = path.resolve(dir, item)
    if (fs.statSync(cur).isDirectory()) {
      addApi(cur)
    } else {
      if (cur.indexOf('config') > -1) {
        var content = fs.readFileSync(cur, 'utf-8')
        if (JSON.parse(content).value) {
          let newDir = path.resolve(cur, '..')
          // console.log(newDir)
          let newfile = readdirSync(newDir)
          let argument = {}
          argument.value = {}
          newfile.map((file, index) => {
            // console.log(file)
            if (file === 'config.json') {
              let cur = path.resolve(dir, file)
              argument.key = JSON.parse(fs.readFileSync(cur, 'utf-8')).value
            } else if (file === 'request.json') {
              let cur = path.resolve(dir, file)
              let newCur = cur.split('public')[1]
              argument.value.request = newCur
            } else {
              let cur = path.resolve(dir, file)
              let newCur = cur.split('public')[1]
              argument.value.response = newCur
            }
          })
          list.push(argument)
        }
      }
    }
  })
}

result.api = read(DIR)
addApi(DIR)

writeFileSync(OUT, JSON.stringify(result, null, 2))
writeFileSync(LIST, 'let API =' + JSON.stringify(list, null, 2) + '\nexport default API')
