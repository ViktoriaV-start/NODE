import { workerData, parentPort } from 'worker_threads'
import http from "http";
import { Server } from 'socket.io';
import fs from "fs";
import path from "path";

const host = "localhost";
const { portOffset } = workerData;
const port = 3000 + portOffset;


const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), "./index.html");
    const rs = fs.createReadStream(filePath);

    rs.pipe(res);
  }
});
const io = new Server(server);

io.on('connection', (client) => {
  console.log(`Websocket connetcted ${client.id}`);

  client.on('client-msg', (data) => {
    client.broadcast.emit('server-msg', { msg: data.msg })
    client.emit('server-msg', { msg: data.msg })
  })
})

server.listen(port, host, () =>
  console.log(`Server running at http://${host}:${port}`)
);
