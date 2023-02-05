import http from 'http';


const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html'); // В респонсе есть метод setHeader("ключ", "значение"),
    // то есть здесь задаем заголовки, указали, что данные пердаем в формате text/html
    res.setHeader('SomeCustomerHeader', 'TEST value'); // Создадим собственный заголовок
    res.writeHead(300, { // задать код статуса и заголовок
        'Some': 'value test'
    });

   

    res.end('<h1>Hello world!</h1>'); // Так как указали, что данные передаются в формате text/html,
    //поэтому передаем html
});

server.listen(port, host, () => console.log(`Server running at http://${host}:${port}`));