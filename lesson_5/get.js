import http from 'http';
import url from 'url'; // модуль для парсинга урла


const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {

    if (req.method === 'GET') { // проверить, что запрос получен методом GET
        const queryParams = url.parse(req.url, true)
        // в модуле url есть метод parse, передаем параметры: req.url - так у реквеста получаем строку урла, 
        // true, the first token after the literal string // and preceding the next / will be interpreted as the host. 
        //For instance, given //foo/bar, the result would be {host: 'foo', pathname: '/bar'} 
        //rather than {pathname: '//foo/bar'}. Default: false.
        
        console.log(queryParams);
        res.end(JSON.stringify(queryParams)); // перевести обратно в формат JSON
    } else {
        res.statusCode = 405;
        res.end('Method not allowed');
    }
});

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`));