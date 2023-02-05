import http from 'http'; // ИМПОРТ МОДУЛЯ HTTP


const host = 'localhost'; // МОЖНО 127.0.0.1 ИЛИ ТАК, КАК ЗДЕСЬ - ЭТО ТО, ЧТО УКАЗАНО В /etc/hosts
const port = 3000;


// ЗАДАТЬ ОПИСАНИЕ И ПОДНЯТЬ СЕРВЕР 
const server = http.createServer((req, res) => {

    res.end('Hello world!')
});

// ЗАПУСК СЕРВЕРА, ТРЕТИЙ ПАРАМЕТР (ФУНКЦИЯ) - НЕОБЯЗАТЕЛЬНЫЙ ПАРАМЕТР
server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`));