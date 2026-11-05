import React from 'react';
import { initialUsers } from '../data/mockData';

export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-8 border border-slate-100">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-indigo-50 rounded-xl mb-3">
            <span className="text-2xl">🎓</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Joineazy Portal</h2>
          <p className="text-sm text-slate-500 mt-1">Select a mock user profile to test Student or Admin roles.</p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Available Profiles</h3>
          {initialUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => onLogin(user)}
              className="flex items-center justify-between p-3.5 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50/50 cursor-pointer transition group"
            >
              <div>
                <p className="font-semibold text-slate-900 text-sm group-hover:text-indigo-600 transition">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role} • {user.email}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-md font-semibold uppercase ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-indigo-100 text-indigo-700'
              }`}>
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}