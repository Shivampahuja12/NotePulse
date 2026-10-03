const noteModel = require("../models/note.model");

async function createNote(req, res) {
    try {
        const data = req.body;
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const timeFormatted = `Today, ${timeStr}`;

        const newNote = await noteModel.create({
            title: data.title,
            description: data.description,
            time: timeFormatted,
        });

        res.status(201).json({
            message: "note created successfully",
            note: newNote
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create note", error: error.message });
    }
}

async function getAllNotes(req, res) {
    try {
        const notes = await noteModel.find();
        res.status(200).json({
            message: "notes fetched successfully",
            notes
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notes", error: error.message });
    }
}

async function getNoteById(req, res) {
    try {
        const id = req.params.id;
        const noteById = await noteModel.findOne({ _id: id });
        if (!noteById) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({
            message: "note fetched by id successfully",
            noteById
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching note by id", error: error.message });
    }
}

async function updateDescriptionById(req, res) {
    try {
        const id = req.params.id;
        const description = req.body.description;
        const updated = await noteModel.findOneAndUpdate(
            { _id: id }, 
            { description: description },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Note not found to update" });
        }
        res.status(200).json({
            message: "note successfully updated",
            note: updated
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update note", error: error.message });
    }
}

async function deleteNoteById(req, res) {
    try {
        const id = req.params.id;
        const deleted = await noteModel.findOneAndDelete({ _id: id });
        if (!deleted) {
            return res.status(404).json({ message: "Note not found to delete" });
        }
        res.status(200).json({
            message: "note successfully deleted"
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete note", error: error.message });
    }
}

module.exports = { getAllNotes, createNote, getNoteById, updateDescriptionById, deleteNoteById };
