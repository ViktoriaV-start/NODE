import http from 'http';
import fs from 'fs';
import inquirer from "inquirer";
import fsp from 'fs/promises';
import path from 'path';


const host = 'localhost';
const port = 3000;


const __dirname = process.cwd();

const server = http.createServer((request, response) => {

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

      const src = await fsp.stat(path.join(dir, fileName));

      if (src.isFile()) {
        const readStream = fs.createReadStream(path.join(dir, fileName), {encoding: 'utf-8'});

        readStream.on('data', (chunk) => {  // читаем файл и сразу пишем в ответ
          response.write(chunk);
        });

        readStream.on('end', () => {  // вывести респонс
          response.end();
        });

      } else {
        const path = `${dir}/${fileName}`;
        readFile(`${dir}/${fileName}`);
      }
    })
  };

  readFile(__dirname);
});

  server.listen(port, host, () => console.log(`Server rinning at http://${host}:${port}`));