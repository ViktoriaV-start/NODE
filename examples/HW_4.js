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




// РЕШЕНИЕС УРОКА

// import readline from "readline";
// import colors from "colors";
// import path from "path";
// import inquirer from "inquirer";
// import fsp from "fs/promises";

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// const root = process.cwd();

// const findFilesInDir = (dirName) => {
//   return fsp
//     .readdir(dirName)
//     .then((choices) => {
//       return inquirer.prompt([
//         {
//           name: "fileName",
//           type: "list", // input, number, confirm, list, rawlist, expand, checkbox, password
//           message: "Choose file",
//           choices,
//         },
//         {
//           name: "findString",
//           type: "input",
//           message: "Enter something for search",
//           async when({ fileName }) {
//             const fullPath = path.join(dirName, fileName);
//             const stat = await fsp.stat(fullPath);

//             return stat.isFile();
//           },
//         },
//       ]);
//     })
//     .then(async ({ fileName, findString }) => {
//       const fullPath = path.join(dirName, fileName);
//       if (findString === undefined) return findFilesInDir(fullPath);

//       return Promise.all([
//         fsp.readFile(fullPath, "utf-8"),
//         Promise.resolve(findString),
//       ]);
//     })
//     .then((result) => {
//       if (result) {
//         const [text, findString] = result;
//         const pattern = new RegExp(findString, "g");
//         let count = 0;
//         const out = text.replace(pattern, () => {
//           count++;
//           return colors.red(findString);
//         });

//         console.log(out, "\n", colors.green(`Found ${count} values`));
//       }
//     });
// };

// rl.question(
//   `You are in: ${root} \n Please enter the path to the directory: `,
//   (dirPath) => {
//     const dirName = path.join(root, dirPath);

//     findFilesInDir(dirName);
//   }
// );

// rl.on("close", () => process.exit(0));


// МОЕ ВТОРОЕ РЕШЕНИЕ


//-------------------------
#!/usr/bin/env node

import { Transform } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
// import readline from 'readline/promises';
import readline from 'readline';
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


const quest = (readFile) => {

  new Promise((resolve, reject) => {

   const rl = readline.createInterface({
    input: process.stdin, // ВВОД ДАННЫХ С КЛАВИАТУРЫ В КОНСОЛИ
    output: process.stdout // ВЫВОД В КОНСОЛЬ
  });

    rl.question('File for writing: ', (file) => {
      rl.question('IP: ', (ip) => {
        resolve([rl, file, ip]);
      });
    });

    rl.on('close', () => process.exit(0));
})
  .then(async (value) => {
    const dir = process.cwd();
    await readFile(dir, value[1], value[2])

 //value[0].close()

})
  .then(() => console.log(111));

};


const readFile = (dir, writeFile, ip) => {

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
        readFile(needlePath, writeFile, ip);
      }
    })
  };

  quest(readFile);
  