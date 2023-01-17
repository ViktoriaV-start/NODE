
import { Transform } from 'stream'
import { createReadStream, createWriteStream } from 'fs'
 
const getLog = (readFile, ip, writeFile) => {
  const rs = createReadStream(readFile);
  const ws = createWriteStream(writeFile);

  const transformStream = new Transform({

    transform(chunk, encoding, callback) {

      const regexpSearch = new RegExp(`^(${ip}) (.)+`, 'gm');
      const regexpIp = new RegExp(`${ip}`, 'gm');
      const logs = chunk.toString().match(regexpSearch).toString().replace(regexpIp, `\n${ip}`);

      this.push(logs);
      console.log('done');
      callback();
    }
  })

  rs.pipe(transformStream).pipe(ws);
}

getLog('./dup.log', '89.123.1.41', './user_89.log');
getLog('./dup.log', '34.48.240.111', './user_34.log');