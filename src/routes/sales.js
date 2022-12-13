const express = require("express");
const { challen } = require("../controller/sale");
const { requiredsignin } = require("../common-middleware/index");
const router = express.Router();

router.post("/challen", requiredsignin, challen);
// router.get("/sales", requiredsignin, getAllsale);
// router.get("/sale", requiredsignin, getByIdsale);
// router.delete("/sale", requiredsignin, deleteByIdsale);

module.exports = router;
