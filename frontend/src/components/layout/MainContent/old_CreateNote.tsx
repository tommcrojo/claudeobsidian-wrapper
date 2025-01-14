"use client";
import React, { useState } from 'react';
import { useNotes } from '../../../hooks/useNotes';
import toast from 'react-hot-toast';

export const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { createNote } = useNotes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNote(title, content);
      setTitle('');
      setContent('');
      toast.success('Note created successfully!');
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note content"
        className="w-full p-2 mb-4 border rounded h-32"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Note
      </button>
    </form>
  );
};