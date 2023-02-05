import os from 'os'
import http from 'http'
import cluster from 'cluster'
import path from 'path'
import fs from 'fs'

const numCPUs = os.cpus().length

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running...`)

    for (let i = 0; i < numCPUs; i++) {
        console.log(`Forking proccess number ${i}`)
        cluster.fork()
    }
} else {
    const host = 'localhost'
    const port = 3000

    const server = http.createServer((request, response) => {
        console.log(`Worker ${process.pid} handle this request....`)

        setTimeout(() => {
            const filePath = path.join(process.cwd(), './access.log')
            const readStream = fs.createReadStream(filePath, {encoding: 'utf-8'})

            readStream.on('data', (chunk) => {
                console.log(chunk)
                response.write(chunk)
            })

            readStream.on('end', () => {
                response.end()
            })
        }, 2000)
    })

    server.listen(port, host, () => console.log(`Server rinning at http://${host}:${port}`))
}