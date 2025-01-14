import React from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string | null;
}

interface RecentActivityProps {
  notes: Note[];
  loading: boolean;
  error: string | null;
  themeClasses: {
    card: string;
    border: string;
    cardHover: string;
    secondaryText: string;
  };
}

const RecentActivity = ({ notes, loading, error, themeClasses }: RecentActivityProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Notes</h2>
      {loading ? (
        <div className={`p-4 ${themeClasses.card} border ${themeClasses.border} rounded-xl`}>
          Loading...
        </div>
      ) : error ? (
        <div className={`p-4 ${themeClasses.card} border ${themeClasses.border} rounded-xl text-red-500`}>
          {error}
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map(note => (
            <div 
              key={note.id}
              className={`p-4 ${themeClasses.card} border ${themeClasses.border} rounded-xl ${themeClasses.cardHover} cursor-pointer transition-colors`}
            >
              <div className="text-sm font-medium">{note.title}</div>
              <div className={`text-xs ${themeClasses.secondaryText} mt-1`}>
                Updated {new Date(note.updated_at || note.created_at).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivity;