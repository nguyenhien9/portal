const express = require("express");
const staffController = require("../controllers/staffs.controller");
const validateStaff = require("../middlewares/validateStaff.middleware");
const router = express.Router();

router.get("/", staffController.get);
router.post("/", validateStaff, staffController.create);
router.put("/:id", validateStaff, staffController.update);
router.delete("/:id", staffController.remove);

module.exports = router;
