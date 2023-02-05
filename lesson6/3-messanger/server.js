import http from "http"; 
import { Server } from 'socket.io';
import fs from "fs";
import path from "path";
//import uuid from "uuid";


const generateIntInRange = (max) => {
  return Math.floor(Math.random() * max);
};

const animals = ['tiger', 'lion', 'deer', 'cat', 'boa', 'panther', 'beaver', 'elk', 'elephant'];
//console.log(animals[generateIntInRange(animals.length)] + Date.now());

let usersList = [];

const host = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), "./index.html");
    const rs = fs.createReadStream(filePath);

    rs.pipe(res);
  }
});

const io = new Server(server);

io.on('connection', (client) => {  // СЛУШАТЬ СОБЫТИЕ НА СЕРВЕРЕ connection
  // РЕГИСТРАЦИЯ СОБЫТИЯ НА СЕРВЕРНОМ СОКЕТЕ connection 
  // (client приходит параметром) - то есть при наступлении этого события сделать следующее:
  console.log(`Websocket connetcted ${client.id}`);
  
  
    const getCookie = (client) => {
      const allCookies = client.handshake.headers.cookie;
      let cookie = null;
      
      console.log(allCookies)

      //Если куки есть - проверить наличие нашей куки и сохранить в переменную
      if (allCookies?.match(/usercookie/)) {
        if (allCookies.match(/;/)) {
          const search = allCookies.match(/\busercookie.+;/);
          cookie = search[0].slice(11, -1);
        } else {
          cookie = allCookies.slice(11);
        }
      }

      // Если нет нашей куки - установить
      if (!cookie) {
        console.log("Устанавливается кука")
        cookie = animals[generateIntInRange(animals.length)] + Date.now();
        io.engine.on("headers", (headers, req) => {
         // headers["test"] = "123";
          headers["set-cookie"] = "usercookie="+cookie;
        });
      }

// Записать куку в лист
      if (!usersList.includes(cookie)) {
        usersList.push(cookie);
      }

      console.log("Подключенные пользватели: " + usersList)

      return cookie;

    };


    //Получить/создать куки клиента и добавить/проверить наличие в листе подключенных пользователей
  console.log("Кука клиента ", getCookie(client));

  client.emit('users-arr', { usersArr: usersList });
  client.broadcast.emit('users-arr', { usersArr: usersList });

  client.on("disconnect", (reason) => {
    console.log("Disconnected");
    const count = io.engine.clientsCount;
    let cookie = getCookie(client);
    console.log('Куки удаленного ', cookie)
    usersList = usersList.filter((el) => el !== cookie);
    console.log('disconnect - ' + usersList)
    client.broadcast.emit('users-quantity', { quantity: count });
    client.broadcast.emit('users-arr', { usersArr: usersList });;
  });

  // Получить/передать информацию о количестве аодключенных пользователей
  const count = io.engine.clientsCount;
  client.emit('users-quantity', { quantity: count });
  client.broadcast.emit('users-quantity', { quantity: count });
  
  


  client.on('client-msg', (data) => { // СЛУШАТЬ СОБЫТИЕ ОТ КЛИЕНТА client-msg
    // РЕГИСТРАЦИЯ СОБЫТИЯ client-msg от клиента,
    // то есть, как наступает событие на клиенте cient-msg - сделать следующее
    const cookie = getCookie(client);
    client.broadcast.emit('server-msg', { msg: data.msg, user: cookie }); // СОЗДАТЬ на клиенте событие server-msg
    client.emit('server-msg', { msg: data.msg, user: cookie }); // СОЗДАТЬ на клиенте событие server-msg
 //   console.log(client.handshake.headers) //- заголовки
  })

})



server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
