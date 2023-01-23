#!/usr/bin/env node

import { Transform } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import readline from 'readline/promises';
import inquirer from "inquirer";
import fsp from 'fs/promises';
import path from 'path';
import colors from 'colors';


const getLog = ((readFile, ip, writeFile) => {
  console.log(readFile, writeFile)
  // const readFile = read;
  // const writeFile = write;
  const rs = createReadStream(readFile);
  const ws = createWriteStream(writeFile);

  console.log(`\n *** Log file: ${colors.blue(readFile)},\n *** File for writing: ${colors.blue(writeFile)},\n *** IP: ${colors.red(ip)}`);

  const transformStream = new Transform({

    transform(chunk, encoding, callback) {

      const regexpSearch = new RegExp(`^(${ip}) (.)+`, 'gm');
      const regexpIp = new RegExp(`${ip}`, 'gm');
      const logs = chunk.toString().match(regexpSearch)?.toString().replace(regexpIp, `\n${ip}`);
      
      
      this.push(logs);

      callback();
    }
    
});

  rs.pipe(transformStream).pipe(ws);

});

// getLog('./dup.log', '89.123.1.41', './user_89.log');
// getLog('./dup.log', '34.48.240.111', './user_34.log');


const rl = readline.createInterface({
  input: process.stdin, // ВВОД ДАННЫХ С КЛАВИАТУРЫ В КОНСОЛИ
  output: process.stdout // ВЫВОД В КОНСОЛЬ
});

const __dirname = await rl.question('Path to directory: ');
const writeFile = await rl.question('Path to file for writing: ');
const ip = await rl.question('Ip: ');

rl.close();
rl.on('close', () => process.exit(0));

const readFile = (dir) => {

  fsp
    .readdir(path.join(dir))
    .then((choices) => {
        return inquirer
        .prompt({
            name: "fileName",
            type: 'list', // input, number, confirm, list, rawlist, expand, checkbox, password
            message: "Choose file",
            choices
        })
    })
    .then(async ({ fileName }) => {

      const needlePath = path.join(dir, fileName);
      const src = await fsp.stat(needlePath);

      if (src.isFile()) {
        getLog(needlePath, ip, writeFile);
      } else {
        readFile(needlePath);
      }
    })
  };

  readFile(__dirname);


// rl.question('Log file: ', (logFile) => {

//     rl.question('File for writing: ', (writeFile) => {
//       rl.question('Ip: ', (ip) => {
//         getLog('./dup.log', '89.123.1.41', './user_89.log');
        
//           rl.close();

//       });
//     });
// });
// rl.on('close', () => process.exit(0));