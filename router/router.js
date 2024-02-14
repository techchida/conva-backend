const express = require("express");
const router = express.Router();

router.use("/users", require("../controllers/users/.routes"));
router.use("/campaigns", require("../controllers/campaigns/.routes"));
router.use("/leads", require("../controllers/leads/.routes"));
router.use("/widget", require("../controllers/widget/widget"));

module.exports = router;
