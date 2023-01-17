import fs from 'fs'

fs.readFile('./access.log', 'utf-8', (err, data) => {

    if (!err) {
        console.log(data)
    }
})
