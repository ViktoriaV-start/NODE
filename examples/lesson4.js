import fs from 'fs';
import path from 'path';



const fileName = process.argv[2];
const __dirname = '/Users/user/Desktop/NODE_CODE';
// console.log(fileName);


fs.readFile(path.join(__dirname, fileName), 'utf-8', (err, data) => {

  if (!err) {
    console.log(data)
  }
});

//---------------------------------

// ЗАПУСК ПРОГРАММЫ НА ВЫПОЛНЕНИЕ И ЗАТЕМ ВВОД ИМЕНИ ФАЙЛА ДЛЯ ЧТЕНИЯ в ответ на вопрос

import readline from 'readline';

const __dirname = '/Users/user/Desktop/NODE_CODE';

// ИСПОЛЬЗУЮТСЯ ПОТОКИ И МОДУЛЬ readline
const rl = readline.createInterface({
  input: process.stdin, // ВВОД ДАННЫХ С КЛАВИАТУРЫ В КОНСОЛИ
  output: process.stdout // ВЫВОД В КОНСОЛЬ
});

rl.question('Please enter the path to the file:', (inPath) => {
//Задать вопрос, получить ответ с клавиатуры - это будет inPath

    console.log(inPath);

    // Можно вложить еще вопрос rl.question .....

    rl.close(); // это чтобы выйти из процесса, иначе останется работать
})

rl.on('close', () => process.exit(0)) 
//зарегистрировать событие аварийного выхода (0)

//---------------------------------

// ЗАПУСК ПРОГРАММЫ НА ВЫПОЛНЕНИЕ И ЗАТЕМ ВВОД ИМЕНИ ФАЙЛА ДЛЯ ЧТЕНИЯ в ответ на вопрос
// ИСПОЛЬЗУЮТСЯ ПОТОКИ И МОДУЛЬ readline
// ЧТЕНИЕ

import readline from 'readline';
import fs from 'fs';
import path from 'path';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const __dirname = '/Users/user/Desktop/NODE_CODE';

rl.question('Please enter the path to the file:', (inPath) => {

  // ПРОЧИТАТЬ УКАЗАННЫЙ ФАЙЛ - СОБРАТЬ ПОЛНЫЙ ПУТЬ ДО НЕГО
    fs.readFile(path.join(__dirname, inPath), 'utf-8', (err, data) => {
        console.log(data);
        rl.close();  // событие close вызвать после прочтения файла – то есть внутри
    })
});

rl.on('close', () => process.exit(0));

//---------------------------------


import inquirer from "inquirer";

inquirer
    .prompt({
        name: "fileName",
        type: 'list', // input, number, confirm, list, rawlist, expand, checkbox, password
        message: "Choose file",
        choices: ['file_a', 'file_b', 'file_c', 'file_d',]
    })
    .then(({ fileName }) => console.log(fileName));



//---------------------------------
// ПРОЧИТАТЬ ФАЙЛ, ИСПОЛЬЗУЯ МОДУЛЬ inquirer, который предлагает в консоли выборку из нескольких вариантов

import inquirer from "inquirer";
import fsp from 'fs/promises';
import path from 'path';

const __dirname = '/Users/user/Desktop/NODE_CODE';

fsp
    .readdir(path.join(__dirname))    // вернет список файлов в указанной директории
    
    // ЭТОТ КУСОК ДЛЯ ФИЛЬТРАЦИИ ДИРЕКТОРИЙ
    .then(async (indir) => {
        const list = [];

        for (const item of indir) {
            const src = await fsp.stat(path.join(__dirname, item));
            if (src.isFile()) list.push(item)
        }
        return list;
    })


    // сюда в choices попадает результат readdir, поэтому внутри inquirer 
    // уже нет необходимости в перечислении всех вариантов имен файлов
    .then((choices) => {
        return inquirer
        .prompt({
            name: "fileName",
            type: 'list', // input, number, confirm, list, rawlist, expand, checkbox, password
            message: "Choose file",
            choices
        })
    })
    .then(({ fileName }) => fsp.readFile(path.join(__dirname, fileName), 'utf-8')) // ЧИТАТЬ
    .then(console.log); // ВЫВЕСТИ В КОНСОЛЬ РЕЗУЛЬТАТ ПРЕДЫДУЩЕЙ СТРОКИ (ЧТО ПРОЧИТАЛОСЬ)



// ----------------------------  РИДЕР ДЛЯ ФАЙЛА

#!/usr/bin/env node

import inquirer from "inquirer";
import fsp from 'fs/promises';
import path from 'path';

const __dirname = process.cwd();  // получить путь к текущей директории

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
        return fsp.readFile(path.join(dir, fileName), 'utf-8');
      } else {
        readFile(`${dir}/${fileName}`);
      }

    })
    .then(console.log);
  };

  readFile(__dirname);