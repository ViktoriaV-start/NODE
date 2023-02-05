import http from 'http';
import url from 'url';
import { findRoute } from '../routing.js';


const host = 'localhost';
const port = 3000;

const users = [
    { name: 'Anton', age: 25, id: 1 },
    { name: 'Sergei', age: 34, id: 2 },
    { name: 'Elena', age: 30, id: 3 },
];

const routes = {
    "/": () => '<h1>Hello world!</h1>',
    "/users": (params) => users,
    "/users/:id": (params) => {
        return users.find(item => item.id === +params.id);
    },
    "/users/:id/age": (params) => {
        const user = users.find(item => item.id === +params.id);
        if (user) {
            return { age: user.age }
        }
        return {status: 'User not found'};
    },
};

const server = http.createServer((req, res) => {
    let result = '';
    if (req.method === 'GET') {
        const queryParams = url.parse(req.url, true);

        const routeParams = findRoute(req.url.split('?')[0], routes);
        // найти роут(из урла вида /user?param1=11&param2=22 взять часть до ?  - это будет в полученном массиве нулевой элемент, 
        // второй параметр - это все имеющиеся роуты)
       // console.log(routeParams); // вернет массив из двух параметров [ routeCallback, params ]
        const [ routeCallback, params ] = routeParams;
        console.log(routeParams); // вернет [ [Function: /users/:id], { id: '2' } ]
        if (typeof routeCallback === 'function') {
            result = routeCallback(params)
        }
        if (routeCallback === null) {
            res.statusCode = 404;
            result = { error: 'Not found' };
        }
        result = JSON.stringify(result);
    }

    res.end(result); // отобразит на странице {"name":"Sergei","age":34,"id":2}
})

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`));