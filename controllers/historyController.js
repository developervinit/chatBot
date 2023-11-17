const HistoryModel = require("../model/historySchema");


exports.savingPromptAndResponseToDatabase = async (req, res) => {
    try{
        const payload = new HistoryModel({
            prompt: req.body.prompt,
            response: req.body.response
        });
        const savePayload = await payload.save();
        res.status(200).send("success");
    }catch(err){
        res.status(400).send("failed");
    }
}

