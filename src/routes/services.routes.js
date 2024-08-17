const express = require("express");
const serviceController = require("../controllers/services.controller");
const validateService = require("../middlewares/validateService.middleware");
const router = express.Router();

router.get("/", serviceController.get);
router.post("/", validateService, serviceController.create);
router.put("/:id", validateService, serviceController.update);
router.delete("/:id", serviceController.remove);
module.exports = router;
