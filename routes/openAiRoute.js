const express = require("express");
const openAiController = require("../controllers/openAiController");

let router = express.Router();

router.route("/response/:prompt").get(openAiController.openAiResponse);

module.exports = router;