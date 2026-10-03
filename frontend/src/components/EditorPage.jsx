import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

export default function EditorPage({ isOpen, onClose, onSave, editingNote, isSaving }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || '');
      setDescription(editingNote.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSave({ title: title.trim(), description: description.trim() });
  };

  const getFormattedTime = () => {
    if (editingNote?.time) return editingNote.time;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `Today, ${timeStr}`;
  };

  const charCount = description.length;

  return (
    <div className="editor-page">
      {/* Top Navigation Bar matching screenshot 2 */}
      <div className="editor-header">
        <button className="back-btn" onClick={onClose}>
          <ChevronLeft size={20} />
          My Notes
        </button>

        <h2 className="editor-header-title">
          {editingNote ? 'Edit Note' : 'New Note'}
        </h2>

        <button 
          className="save-btn" 
          onClick={handleSubmit}
          disabled={isSaving || !title.trim() || !description.trim()}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Editor Content Area */}
      <div className="editor-body">
        <div className="editor-timestamp">
          {getFormattedTime()}
        </div>

        <input
          type="text"
          className="title-input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={Boolean(editingNote)} // Title is fixed when editing note per backend
          autoFocus={!editingNote}
        />

        <textarea
          className="content-textarea"
          placeholder="Write your note..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoFocus={Boolean(editingNote)}
        />
      </div>

      {/* Bottom Character Counter matching screenshot 2 */}
      <div className="editor-footer">
        <span>{charCount} / 500</span>
      </div>
    </div>
  );
}
