var fs = require('fs');
var path = require('path') 
var newPath =  path.resolve('./schema')    //  将一个路径或路径片段解析成一个绝对路径，返回解析后的路径字符串
console.log(newPath)
fileDisplay(newPath)

function fileDisplay(filePath){
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath,function(err,files){
      if(err){
          console.warn(err)
      }else{
          //遍历读取到的文件列表
          files.forEach(function(filename){
              //获取当前文件的绝对路径
              var filedir = path.join(filePath,filename);
              //根据文件路径获取文件信息，返回一个fs.Stats对象
              fs.stat(filedir,function(eror,stats){
                  if(eror){
                      console.warn('获取文件stats失败');
                  }else{
                      var isFile = stats.isFile();//是文件
                      var isDir = stats.isDirectory();//是文件夹
                      if(isFile){
                        if (/\/config.json$/.test(filedir)) {
                          console.log(filedir)
                        }
                      }
                      if(isDir){
                          fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                      }
                  }
              })
          });
      }
  });
}

console.log('hello node world')
// var fileDirectory = "./schema";

// if(fs.existsSync(fileDirectory)){
// fs.readdir(fileDirectory, function (err, files) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   var count = files.length;
//   var results = {};
//   files.forEach(function (filename) {
//     fs.readFile(filename, function (data) {
//       results[filename] = data;
//       count--;
//       if (count <= 0) {
//         // 对所有文件进行处理
//       }
//     });
//   });
// });
// }
// else {
//     console.log(fileDirectory + "  Not Found!");
// }