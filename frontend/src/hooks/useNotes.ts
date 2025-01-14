import { useState, useEffect } from 'react';
import api from '../utils/api';

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string | null;
}

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/notes');
      setNotes(response.data);
    } catch (err) {
      setError('Error fetching notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (title: string, content: string) => {
    try {
      const response = await api.post('/notes', { title, content });
      setNotes(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError('Error creating note');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, loading, error, createNote, fetchNotes };
};