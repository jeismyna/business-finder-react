const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://' + process.env.REACT_APP_DB_USER + ':' + process.env.REACT_APP_DB_PASS + '@cluster0.th6igvx.mongodb.net/business-finder?retryWrites=true&w=majority')
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db