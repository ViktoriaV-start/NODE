import fsp from 'fs/promises';

fsp.readFile('./access.log', 'utf-8')
    .then((data) => console.log(data), console.error);

