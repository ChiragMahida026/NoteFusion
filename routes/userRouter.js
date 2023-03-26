const express = require("express");
const router = express.Router();
const { registerUser, getMe, loginUser } = require("../controllers/userCtrl");
const { protect } = require("../middleware/auth");


//get api for verify 
router.get("/verify", protect, getMe);

router.post("/", registerUser);
router.post('/login', loginUser);



module.exports = router;
