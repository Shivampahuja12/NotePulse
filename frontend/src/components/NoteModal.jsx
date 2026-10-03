import React, { useState, useEffect } from 'react';
import { X, Check, Loader2 } from 'lucide-react';

export default function NoteModal({ isOpen, onClose, onSave, editingNote, isSaving }) {
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
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onSave({ title: title.trim(), description: description.trim() });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-handle"></div>

        <div className="drawer-header">
          <h2 className="drawer-title">{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {!editingNote && (
            <div className="form-group">
              <label className="form-label">Note Title</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>
          )}

          {editingNote && (
            <div className="form-group">
              <label className="form-label">Editing Title</label>
              <input
                type="text"
                className="form-input"
                value={title}
                disabled
                style={{ opacity: 0.6 }}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Note Description</label>
            <textarea
              className="form-textarea"
              placeholder="Write your thoughts here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check size={18} />
                {editingNote ? 'Update Note' : 'Save Note'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
