import fs from 'fs'

const utf8 = 'utf8'

const  getJson = (path) => {
    const file = fs.readFileSync(path, utf8)
    if (file) 
        return JSON.parse(file)

    return null
    }

export default getJson