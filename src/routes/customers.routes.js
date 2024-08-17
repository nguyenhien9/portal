const express = require("express");
const customerController = require("../controllers/customers.controller");
const validateCustomer = require("../middlewares/validateCustomer.middleware");

const router = express.Router();

router.get("/", customerController.get);
router.post("/", validateCustomer, customerController.create);
router.put("/:id", validateCustomer, customerController.update);
router.delete("/:id", customerController.remove);

module.exports = router;
