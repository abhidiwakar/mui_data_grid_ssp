const express = require('express')
const app = express()
const cors = require('cors')
const store = require('./placeholder')

app.use(cors())

app.get('/', (req, res) => {
    let { page, limit } = req.query
    if (!page) page = 1
    if (!limit) limit = 10
    page = parseInt(page)
    limit = parseInt(limit)
    return res.json({
        data: store.slice((page - 1) * limit, page * limit),
        total: store.length
    })
})

app.listen(4000, () => {
    console.log('App started on port 4000')
})