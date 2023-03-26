const { json } = require("express");
const Notes = require("../models/noteModel");
const projectModel = require("../models/projectModel");
const noteCtrl = {
  getNotes_dev: async (req, res) => {
    try {
      const notes = await Notes.find({
        service_id: req.user.id,
        project_name: req.query.project_name,
        environment_type: req.query.environment_type,
      });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createProject: async (req, res) => {
    try {
      const { project_name } = req.body;
      const newNote = new projectModel({
        project_name,
      });
      await newNote.save();
      res.json({ msg: "Created a Project" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProject: async (req, res) => {
    try {
      const notes = await projectModel.find({});
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createNote: async (req, res) => {
    const notesqwerty = await projectModel.find({
      project_name: req.body.project_name,
    });

    try {
      const {
        project_name,
        environment_type,
        servicename,
        Type,
        Port,
        Command,
        environment,
      } = req.body;
      const newNote = new Notes({
        project_name,
        environment_type,
        servicename,
        Type,
        Port,
        Command,
        environment,
        project_id: notesqwerty[0]._id.valueOf(),
        service_id: req.user.id,
        name: req.user.name,
      });
      await newNote.save();
      res.json({ msg: "Created a Note" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteNote: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Note" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateNote: async (req, res) => {
    try {
      const {
        project_name,
        environment_type,
        servicename,
        Type,
        Port,
        Command,
        environment,
      } = req.body;
      await Notes.findOneAndUpdate(
        { _id: req.params.id },
        {
          project_name,
          environment_type,
          servicename,
          Type,
          Port,
          Command,
          environment,
        }
      );
      res.json({ msg: "Updated a Note" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = noteCtrl;
