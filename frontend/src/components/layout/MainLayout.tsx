import React, { useState, useEffect } from 'react';
import { Brain, Sun, Moon, User } from 'lucide-react';
import { quickAccessItems } from '../../constants/navigation';
import api from '../../utils/api';
import toast from 'react-hot-toast';

// Components
import SearchBar from "./Sidebar/Searchbar";
import QuickAccess from './Sidebar/QuickAccess';
import NewNote from './MainContent/NewNote';
import RecentActivity from './MainContent/RecentActivity';

// Types
interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string | null;
}

const MainLayout = () => {
  // Layout state
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isDragging, setIsDragging] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Data state
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');

  // Theme configuration
  const themeClasses = isDarkMode ? {
    layout: 'bg-zinc-950',
    sidebar: 'bg-zinc-900',
    text: 'text-zinc-100',
    secondaryText: 'text-zinc-400',
    card: 'bg-zinc-800/50',
    cardHover: 'hover:bg-zinc-800',
    border: 'border-zinc-800',
    input: 'bg-zinc-800/50',
    buttonHover: 'hover:bg-zinc-800'
  } : {
    layout: 'bg-white',
    sidebar: 'bg-gray-50',
    text: 'text-gray-900',
    secondaryText: 'text-gray-500',
    card: 'bg-white',
    cardHover: 'hover:bg-gray-50',
    border: 'border-gray-200',
    input: 'bg-white',
    buttonHover: 'hover:bg-gray-100'
  };

  // Data fetching
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await api.get('/notes');
        setNotes(response.data);
        setFilteredNotes(response.data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error fetching notes';
        setError(errorMessage);
        toast.error('Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes(notes);
    }
  }, [searchQuery, notes]);

  // Note creation
  const handleCreateNote = async () => {
    if (!newNoteContent.trim()) return;

    try {
      const response = await api.post('/notes', {
        title: newNoteContent.split('\n')[0] || 'Untitled Note',
        content: newNoteContent
      });
      
      setNotes(prev => [response.data, ...prev]);
      setNewNoteContent('');
      toast.success('Note created successfully!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating note';
      toast.error(`Failed to create note: ${errorMessage}`);
    }
  };

  // Layout event handlers
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newWidth = e.clientX;
      if (newWidth >= 200 && newWidth <= 400) {
        setSidebarWidth(newWidth);
      }
    }
  };
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div 
      className={`flex h-screen ${themeClasses.layout} ${themeClasses.text}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Sidebar */}
      <div 
        style={{ width: `${sidebarWidth}px` }} 
        className={`flex-shrink-0 ${themeClasses.sidebar} border-r ${themeClasses.border} flex flex-col px-4`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-2">
          <Brain className="h-6 w-6 text-purple-500" />
          <span className="text-lg font-semibold">Second Brain</span>
        </div>

        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          themeClasses={themeClasses}
        />

        <QuickAccess sidebarWidth={sidebarWidth} />

        {/* Navigation */}
        <div className="flex-1 py-4">
          <div className="space-y-0.5">
            {quickAccessItems?.map((item, index) => (
              <button
                key={index}
                className={`flex items-center gap-3 w-full px-4 py-2 ${themeClasses.buttonHover} rounded-lg ${themeClasses.secondaryText} hover:text-current transition-colors`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="p-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`flex items-center gap-2 w-full p-2 ${themeClasses.buttonHover} rounded-lg ${themeClasses.secondaryText} hover:text-current transition-colors`}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      {/* Resize handle */}
      <div
        className="w-1 cursor-col-resize hover:bg-purple-500 transition-colors"
        onMouseDown={handleMouseDown}
      />

      {/* Main content */}
      <div className="flex-1 flex">
        <div className="flex-1 p-6">
          <NewNote 
            newNoteContent={newNoteContent}
            onContentChange={setNewNoteContent}
            onCreateNote={handleCreateNote}
            themeClasses={themeClasses}
          />

          <RecentActivity 
            notes={filteredNotes}
            loading={loading}
            error={error}
            themeClasses={themeClasses}
          />
        </div>

        {/* Profile bar */}
        <div className={`w-16 ${themeClasses.sidebar} border-l ${themeClasses.border} flex flex-col items-center py-4`}>
          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;