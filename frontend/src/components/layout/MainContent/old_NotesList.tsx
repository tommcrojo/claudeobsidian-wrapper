"use client";
import React from 'react';
import { useNotes } from '../../../hooks/useNotes';

export const NotesList = () => {
  const { notes, loading, error } = useNotes();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid gap-4 p-4">
      {notes.map((note) => (
        <div 
          key={note.id} 
          className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold">{note.title}</h3>
          <p className="text-gray-600 mt-2">{note.content}</p>
          <div className="text-sm text-gray-400 mt-2">
            Created: {new Date(note.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};