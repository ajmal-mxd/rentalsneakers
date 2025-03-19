const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const sneakerController = require("../controllers/sneakerController");

router.post("/add", upload.single("image"), sneakerController.addSneaker);
router.get("/", sneakerController.getSneakers);
router.delete("/:id", sneakerController.deleteSneaker);

module.exports = router;
