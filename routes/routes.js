const express = require("express");
const router = express.Router();

const {
  newEvent,
  bookEvent,
  cancelEvent,
  getStatus,
} = require("../controller/tickets");

// router.route("/").get(getAllProducts);
router.route("/v1/events").post(newEvent);
router.route("/v1/:id/book").post(bookEvent);
router.route("/v1/:id/cancel").post(cancelEvent);
router.route("/status/:eventId").get(getStatus);

module.exports = router;
