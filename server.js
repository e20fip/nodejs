const express = require('express')
const cors = require('cors')
const PORT = 5500

const server = express()

server.use(express.json())
server.use(cors())
server.use('/', express.static('./public'))
server.use('/api', require('./routes/apiRoutes'))

server.listen(PORT, () => {
  console.log('server running on port ' + PORT)
})
