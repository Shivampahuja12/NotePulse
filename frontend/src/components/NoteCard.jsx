import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';

export default function NoteCard({ note, onEdit, onDelete, onView }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close context menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    onEdit(note);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    onDelete(note._id);
  };

  return (
    <div className="note-card" onClick={() => onView(note)}>
      <div className="card-top">
        <h3 className="card-title">{note.title}</h3>
        <div className="card-top-right">
          <span className="orange-dot"></span>
          <button className="more-btn" onClick={handleMoreClick} title="Options">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <p className="card-body-text">{note.description}</p>

      <div className="card-timestamp">
        {note.time || 'Today, 10:42 AM'}
      </div>

      {showMenu && (
        <div className="context-menu" ref={menuRef}>
          <button className="menu-item" onClick={handleEditClick}>
            <Edit2 size={14} /> Edit
          </button>
          <button className="menu-item delete" onClick={handleDeleteClick}>
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
