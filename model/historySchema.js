const mongoose = require("mongoose");


let historySchema = new mongoose.Schema({
    date: {
        type: Date,
        default : Date.now
    },
    prompt: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    }
});

const HistoryModel = mongoose.model("HistoryModel", historySchema);

module.exports = HistoryModel;
