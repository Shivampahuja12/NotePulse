const express = require('express');
const controller = require('../controllers/note.controller');

const router = express.Router();

router.post('/notes', controller.createNote);
router.get('/notes', controller.getAllNotes);
router.get('/notes/:id', controller.getNoteById);
router.patch('/notes/:id', controller.updateDescriptionById);
router.delete('/notes/:id', controller.deleteNoteById);

module.exports = router;
