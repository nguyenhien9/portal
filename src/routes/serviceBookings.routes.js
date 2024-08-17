const express = require("express");
const bookingController = require("../controllers/serviceBooking.controller");
const validateBooking = require("../middlewares/validateBooking.middleware");
const router = express.Router();

router.get("/", bookingController.get);
router.post("/", validateBooking, bookingController.create);
router.put("/:id", validateBooking, bookingController.update);
router.delete("/:id", bookingController.remove);

module.exports = router;
