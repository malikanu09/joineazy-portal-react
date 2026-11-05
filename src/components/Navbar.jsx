import React from 'react';

export default function Navbar({ currentUser, onLogout }) {
  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-bold tracking-tight">Joineazy Dashboard</span>
          <span className="text-[10px] bg-indigo-500/80 uppercase tracking-widest font-bold px-2 py-0.5 rounded border border-indigo-400/30">
            {currentUser.role}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium opacity-90">Welcome, {currentUser.name}</span>
          <button
            onClick={onLogout}
            className="bg-indigo-700 hover:bg-indigo-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-500 transition shadow-sm"
          >
            Switch User
          </button>
        </div>
      </div>
    </nav>
  );
}