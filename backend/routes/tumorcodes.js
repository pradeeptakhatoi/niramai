const express = require("express");

const TumorCodeController = require("../controllers/tumorcodes");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const router = express.Router();

router.get("", TumorCodeController.getTumorCodes);

router.get("/:id", TumorCodeController.getTumorCode);

router.delete("/:id", checkAuth, TumorCodeController.deleteTumorCode);

router.post("/populate", TumorCodeController.populateData);

module.exports = router;
