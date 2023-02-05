import http from 'http';



const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {

    if (req.method === 'POST') {
        res.setHeader('SomeCustomerHeader', 'TEST value');
        res.writeHead(200, {"Content-Type": "application/json"})
       
        let data = '';

        req.on('data', (chunk) => {
            data += chunk;
        });


        // ПОЛУЧЕНИЕ ДАННЫХ
        req.on('end', () => {
            try {
                const body = JSON.parse(data)
                console.log(body)

                res.end(data);
            } catch(e) {
                console.error(e.message);
            }
        })
       // res.end(data);
    };
});

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`));