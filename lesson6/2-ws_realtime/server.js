import http from "http";
import { Server } from 'socket.io';  //ИМОПРТ СЕРВЕРА СОКЕТОВ
import { Handler } from "./handler.js";
import { MyEmitter } from "./mfc.js";
import fs from "fs";
import path from "path";

const host = "localhost";
const port = 3000;

 
const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), "./index.html");
    const rs = fs.createReadStream(filePath);

    rs.pipe(res);
  }
});

const io = new Server(server);  // СЕРВЕР ДЛЯ СОКЕТОВ, СОЗДАЕМ ЕГО ДО ТОГО
// КАК НАЧИНАЕМ СЛУШАТЬ НАЧАЛЬНЫЙ СЕРВЕР


// 1) СОБЫТИЕ В МОМЕНТ, КАК КЛИЕНТ НАПИСАЛ ЗАПРОС НА ПОДКЛЮЧЕНИЕ
io.on('connection', (client) => {
  console.log(`Websocket connetcted ${client.id}`);  // СЛУЖЕБНЫЕ ДАННЫЕ

  // ЗЕСЬ client - это от сервера
  MyEmitter.on("send", (payload) => {
    client.emit('server-msg', Handler.send(payload))
  });
  MyEmitter.on("receive", (payload) => {
    client.emit('server-msg', Handler.receive(payload))
  });
  MyEmitter.on("sign", (payload) => {
    client.emit('server-msg', Handler.sign(payload))
  });
})

server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
