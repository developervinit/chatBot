const express = require("express");
const historyController = require("../controllers/historyController");


let router = express.Router();

router.route("/makeHistory").post(historyController.savingPromptAndResponseToDatabase);

module.exports = router;