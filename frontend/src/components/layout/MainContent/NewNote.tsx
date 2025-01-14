import React from 'react';
import { MessageSquarePlus, Zap } from 'lucide-react';

interface NewNoteProps {
  newNoteContent: string;
  onContentChange: (content: string) => void;
  onCreateNote: () => void;
  themeClasses: {
    input: string;
    border: string;
    card: string;
  };
}

const NewNote = ({ newNoteContent, onContentChange, onCreateNote, themeClasses }: NewNoteProps) => {
  return (
    <div className="h-[40vh] flex items-center justify-center mb-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a New Note</h1>
        <div className="relative mb-6">
          <textarea
            value={newNoteContent}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="What's on your mind?"
            className={`w-full pl-4 pr-4 py-3.5 text-lg ${themeClasses.input} rounded-xl border ${themeClasses.border} focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none h-32`}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onCreateNote}
            className={`flex items-center justify-center gap-3 p-4 ${themeClasses.card} rounded-xl border ${themeClasses.border} transition-all hover:bg-purple-500 hover:text-white hover:border-purple-500 group`}
          >
            <MessageSquarePlus className="h-6 w-6 text-purple-500 group-hover:text-white" />
            <span className="text-lg">Create Note</span>
          </button>
          <button className={`flex items-center justify-center gap-3 p-4 ${themeClasses.card} rounded-xl border ${themeClasses.border} transition-all hover:bg-blue-500 hover:text-white hover:border-blue-500 group`}>
            <Zap className="h-6 w-6 text-blue-500 group-hover:text-white" />
            <span className="text-lg">Quick Capture</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewNote;