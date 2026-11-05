import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import { initialAssignments, initialSubmissions } from './data/mockData';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('joineazy_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('joineazy_assignments');
    return saved ? JSON.parse(saved) : initialAssignments;
  });

  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('joineazy_submissions');
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('joineazy_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('joineazy_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('joineazy_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('joineazy_submissions', JSON.stringify(submissions));
  }, [submissions]);

  const handleUpdateSubmission = (assignmentId, studentId, status) => {
    setSubmissions(prev => ({
      ...prev,
      [assignmentId]: {
        ...(prev[assignmentId] || {}),
        [studentId]: status
      }
    }));
  };

  const handleCreateAssignment = (newAsg) => {
    setAssignments(prev => [newAsg, ...prev]);
    // Initialize empty submissions for this assignment
    setSubmissions(prev => ({
      ...prev,
      [newAsg.id]: {}
    }));
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  if (!currentUser) {
    return <Login onLogin={setCurrentUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
      
      <main className="flex-grow">
        {currentUser.role === 'student' ? (
          <StudentDashboard
            currentUser={currentUser}
            assignments={assignments}
            submissions={submissions}
            onUpdateSubmission={handleUpdateSubmission}
          />
        ) : (
          <AdminDashboard
            currentUser={currentUser}
            assignments={assignments}
            submissions={submissions}
            onCreateAssignment={handleCreateAssignment}
            onDeleteAssignment={handleDeleteAssignment}
          />
        )}
      </main>
    </div>
  );
}