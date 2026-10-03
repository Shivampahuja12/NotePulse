import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NoteCard from './components/NoteCard';
import EditorPage from './components/EditorPage';
import { Plus } from 'lucide-react';

const API_BASE = 'http://localhost:3000/api/v1';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor Page state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Status & Feedback States
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // Fetch Notes from API
  const fetchNotes = async (silent = false) => {
    if (!silent) setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/notes`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data.notes || []);
    } catch (err) {
      console.error(err);
      if (!silent) showToast('Unable to connect to backend API');
    } finally {
      if (!silent) setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create or Update Note
  const handleSaveNote = async ({ title, description }) => {
    setIsSaving(true);
    try {
      if (editingNote) {
        // Update description via PATCH
        const res = await fetch(`${API_BASE}/notes/${editingNote._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ description }),
        });
        if (!res.ok) throw new Error('Failed to update note');
        showToast('Note updated successfully');
      } else {
        // Create new Note via POST
        const res = await fetch(`${API_BASE}/notes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, description }),
        });
        if (!res.ok) throw new Error('Failed to create note');
        showToast('Note created successfully');
      }
      setIsEditorOpen(false);
      setEditingNote(null);
      await fetchNotes(true);
    } catch (err) {
      console.error(err);
      showToast('Error saving note');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Note
  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      const res = await fetch(`${API_BASE}/notes/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete note');
      showToast('Note deleted');
      await fetchNotes(true);
    } catch (err) {
      console.error(err);
      showToast('Could not delete note');
    }
  };

  // View note (opens editor for editing)
  const handleViewNote = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  // Filter notes by search query
  const filteredNotes = useMemo(() => {
    return notes.filter(
      (n) =>
        n.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [notes, searchQuery]);

  return (
    <div className="app-wrapper">
      {toastMessage && <div className="toast-bar">{toastMessage}</div>}

      <Header />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="notes-count-label">
        {isLoading
          ? 'Loading notes...'
          : `${filteredNotes.length} ${filteredNotes.length === 1 ? 'note' : 'notes'}`}
      </div>

      <main className="notes-container">
        {filteredNotes.length === 0 && !isLoading ? (
          <div style={{ textAlign: 'center', color: '#8E8E93', padding: '40px 20px', fontSize: '14px' }}>
            {searchQuery ? 'No matching notes found' : 'No notes yet. Tap "New note" to create one.'}
          </div>
        ) : (
          <div className="notes-list">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={(n) => {
                  setEditingNote(n);
                  setIsEditorOpen(true);
                }}
                onDelete={handleDeleteNote}
                onView={handleViewNote}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Action Button (FAB) with "New note" text matching Image 1 */}
      <div className="fab-container">
        <span className="fab-label">New note</span>
        <button
          className="fab-circle"
          onClick={() => {
            setEditingNote(null);
            setIsEditorOpen(true);
          }}
          title="Create New Note"
        >
          <Plus size={26} strokeWidth={2.5} />
        </button>
      </div>

      {/* Full Screen Editor Page matching Image 2 */}
      <EditorPage
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        editingNote={editingNote}
        isSaving={isSaving}
      />
    </div>
  );
}
