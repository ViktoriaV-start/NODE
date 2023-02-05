import { Worker } from 'worker_threads'
import os from 'os'

const numCPUs = os.cpus().length

let i = 0;
while (i < numCPUs) {
    const workerData = { portOffset: i }
    const worker = new Worker('./server.js', { workerData })
    worker.on('message', console.log)
    worker.on('error', console.error)
    i++
}