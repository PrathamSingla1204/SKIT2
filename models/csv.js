const mongoose = require('mongoose');

const csvSchema = new mongoose.Schema({
    fileName: {
        type: String
    },
    filePath: {
        type: String
    },
    file: {
        type: String
    }
});

const CSV = mongoose.model('csv',csvSchema);
module.exports = CSV;