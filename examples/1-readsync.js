// ЧТЕНИЕ ФАЙЛА СИНХРОННОЕ

import fs from 'fs';


const data = fs.readFileSync('./access.log', 'utf-8');
console.log(data);