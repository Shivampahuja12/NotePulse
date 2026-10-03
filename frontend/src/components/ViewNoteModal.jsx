import React from 'react';
import { X, Clock, Edit3, Trash2 } from 'lucide-react';

export default function ViewNoteModal({ note, onClose, onEdit, onDelete }) {
  if (!note) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="bottom-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-handle"></div>

        <div className="drawer-header">
          <h2 className="drawer-title">{note.title}</h2>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="note-time" style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
          <Clock size={14} />
          <span>Created: {note.time || 'Recently'}</span>
        </div>

        <div className="full-note-body">
          {note.description}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button 
            className="btn-primary" 
            style={{ flex: 1, background: 'rgba(255, 255, 255, 0.08)', border: '1px solid var(--border-glass)' }}
            onClick={() => { onClose(); onEdit(note); }}
          >
            <Edit3 size={16} /> Edit
          </button>
          <button 
            className="btn-primary" 
            style={{ flex: 1, background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#f87171' }}
            onClick={() => { onClose(); onDelete(note._id); }}
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
