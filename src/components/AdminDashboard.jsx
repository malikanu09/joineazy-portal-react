import React, { useState } from 'react';
import { initialUsers } from '../data/mockData';

export default function AdminDashboard({ currentUser, assignments, submissions, onCreateAssignment, onDeleteAssignment }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [driveLink, setDriveLink] = useState('');
  const [selectedStudents, setSelectedStudents] = useState(
    initialUsers.filter(u => u.role === 'student').map(u => u.id)
  );

  const students = initialUsers.filter(u => u.role === 'student');
  const myAssignments = assignments.filter(asg => asg.createdBy === currentUser.id);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleStudentToggle = (id) => {
    if (selectedStudents.includes(id)) {
      setSelectedStudents(selectedStudents.filter(sId => sId !== id));
    } else {
      setSelectedStudents([...selectedStudents, id]);
    }
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    const newAsg = {
      id: `asg-${Date.now()}`,
      title,
      description,
      dueDate,
      driveLink,
      createdBy: currentUser.id,
      assignedTo: selectedStudents,
    };

    onCreateAssignment(newAsg);
    setTitle('');
    setDescription('');
    setDueDate('');
    setDriveLink('');
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Professor / Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage assignments and track student submissions.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow transition"
        >
          + Create New Assignment
        </button>
      </div>

      {/* Assignment List Created by Admin */}
      {myAssignments.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
          <p className="text-gray-500 text-sm">You haven't created any assignments yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {myAssignments.map((asg) => {
            const assignedList = students.filter(s => asg.assignedTo.includes(s.id));
            const totalAssignedCount = assignedList.length;
            const submittedCount = assignedList.filter(s => submissions[asg.id]?.[s.id] === 'submitted').length;
            const completionRate = totalAssignedCount > 0 ? Math.round((submittedCount / totalAssignedCount) * 100) : 0;

            return (
              <div key={asg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{asg.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{asg.description}</p>
                    <p className="text-xs text-gray-400 mt-2">Due: {new Date(asg.dueDate).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => onDeleteAssignment(asg.id)}
                    className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md font-medium transition"
                  >
                    Delete Assignment
                  </button>
                </div>

                {/* Class Completion Progress Bar */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>Class Completion Rate</span>
                    <span>{submittedCount} / {totalAssignedCount} Submitted ({completionRate}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                </div>

                {/* Student Status Table */}
                <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider mb-3">Student Status Breakdown</h4>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                      <tr>
                        <th className="px-4 py-2.5 font-semibold">Student Name</th>
                        <th className="px-4 py-2.5 font-semibold">Email</th>
                        <th className="px-4 py-2.5 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {assignedList.map((stu) => {
                        const status = submissions[asg.id]?.[stu.id] === 'submitted' ? 'submitted' : 'pending';
                        return (
                          <tr key={stu.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-800">{stu.name}</td>
                            <td className="px-4 py-3 text-gray-500 text-xs">{stu.email}</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                                status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {status === 'submitted' ? 'Submitted' : 'Pending'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Assignment</h3>
            <form onSubmit={handleSubmitNew} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Advanced React Project"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="Assignment details..."
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Due Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Drive Reference Link</label>
                <input
                  type="url"
                  value={driveLink}
                  onChange={(e) => setDriveLink(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold uppercase text-gray-600">Assign To Students</label>
                  <label className="text-xs text-indigo-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === students.length}
                      onChange={handleSelectAll}
                      className="mr-1"
                    /> Select All
                  </label>
                </div>
                <div className="border rounded-lg p-3 max-h-36 overflow-y-auto space-y-2">
                  {students.map((stu) => (
                    <label key={stu.id} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(stu.id)}
                        onChange={() => handleStudentToggle(stu.id)}
                      />
                      <span>{stu.name} ({stu.email})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium shadow"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}