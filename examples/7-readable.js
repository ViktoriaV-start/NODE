import fs from 'fs'

const readStream = fs.createReadStream('./access.log', {
    encoding: 'utf-8',
    highWaterMark: 20
})
let i = 1
readStream.on('data', (chunk) => {
    console.log(`${i})`, chunk)
    i++
})

readStream.on('end', () => console.log('File reading is finished!'))
readStream.on('error', err => console.error(err.message))