import http from "http";
import { Handler } from "./handler.js";
import { MyEmitter } from "./mfc.js";
import fs from "fs";
import path from "path";


// ЭТО ПРИМЕР ЭЛЕКТРОННОЙ ОЧЕРЕДИ В МФЦ С РЕАЛИЗАЦИЕЙ ЧЕРЕЗ СЕРВЕР
// И ВЫВОДОМ РЕЗУЛЬТАТОВ В БРАУЗЕРЕ, СКРИПТ, КОТОРЫЙ В  index.js,
// РАЗ В СЕКУНДУ ШЛЕТ ЗАПРОС НА СЕРВЕР НА СТРАНИЦУ 'http://localhost:3000/api'
// И ПОЛУЧАЕТ ОТВЕТ С РЕЗУЛЬТАТОМ,
// А САМ РЕЗУЛЬТАТ ГЕНЕРИРУЕТСЯ В ФАЙЛЕ mfc, КОТОРЫЙ ПУШИТСЯ
// В const list.



const host = "localhost";
const port = 3000;

const list = [];

MyEmitter.on("send", (payload) => list.push(Handler.send(payload)));
MyEmitter.on("receive", (payload) => list.push(Handler.receive(payload)));
MyEmitter.on("sign", (payload) => list.push(Handler.sign(payload)));

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === "/api") {
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify(list));
    }
    const filePath = path.join(process.cwd(), "./index.html");
    const rs = fs.createReadStream(filePath);

    rs.pipe(res);
  }
});

server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
 