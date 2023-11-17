const express = require("express");
const historyController = require("../controllers/historyController");


let router = express.Router();

router.route("/makeHistory").post(historyController.savingPromptAndResponseToDatabase);
router.route("/getHistory").get(historyController.getData);

module.exports = router;