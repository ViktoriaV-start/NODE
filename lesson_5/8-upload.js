import http from 'http';
import formidable from 'formidable'; // СТОРОННИЙ МОДУЛЬ УСТАНОВИТЬ
import path from 'path';
import fsp from 'fs/promises';

const host = 'localhost';
const port = 3000;


const server = http.createServer((request, response) => {

    if (request.method === 'POST') {

        const mfd = request.headers['content-type'].split(';')[0];
        if (mfd === 'multipart/form-data') {  // Выяснить, какой заголовок
            const form = formidable({ multiples: true });
            form.parse(request, async (err, fields, files) => {

                for (const fileId in files) {
                    const blob = files[fileId]
                    const {filepath, originalFilename} = blob;

                    const rawData = await fsp.readFile(filepath)

                    await fsp.writeFile(path.join(process.cwd(), originalFilename), rawData);
                }
            })
        }
    }

    response.end('')
})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`))