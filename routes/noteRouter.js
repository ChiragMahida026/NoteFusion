const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const noteCtrl = require("../controllers/noteCtrl");

router
  .route("/")
  .get(protect, noteCtrl.getNotes_dev)
  .post(protect, noteCtrl.createNote);
// .put(protect, noteCtrl.updateNote);
// .post(protect, noteCtrl.createProject);

router
  .route("/project")
  // .get(protect, noteCtrl.getNotes)
  // .get(protect, noteCtrl.getNotes_dev)
  // .post(protect, noteCtrl.createNote)
  .get(protect, noteCtrl.getProject)
  .post(protect, noteCtrl.createProject);
router
  .route("/:id")
  .get(protect, noteCtrl.getNote)
  .put(protect, noteCtrl.updateNote)
  .delete(protect, noteCtrl.deleteNote);

module.exports = router;
